// import { createPool, ConnectionConfig } from 'mysql';
// import { Module } from '@nestjs/common';

// class DatabaseModule {
//   options: ConnectionConfig;
//   constructor(options: ConnectionConfig, moduleRef) {
//     this.options = options;
//   }
//   static forRoot(options: ConnectionConfig) {
//     const databaseModuleOptions = {
//       provide: 'CONNECTION',
//       useValue: options,
//     };
//     const connectionProvider = {
//       provide: 'CONNECTION_PROVIDER',
//       useFactory: async (): Promise<any> => {
//         let pool = createPool(Object.assign({connectionLimit:10},options));
//         return pool;
//       }
//     }
//   }
// }

// @Module({

// })

// export class DbModule{}

import { Module, DynamicModule, Global, Injectable } from '@nestjs/common';
import { ConnectionConfig, createPool, Pool } from 'mysql';

@Injectable()
export class ConnectionProvider {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public connection<T>(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!

        connection.query(query, function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
          if (results) {
            resolve(results as T);
          }

          // Handle error after the release.
          if (error) {
            reject(error);
          }
          // Don't use the connection here, it has been returned to the pool.
        });
      })
      // Use the connection

    });
  }
}



@Global()
@Module({
})
export class DataBaseModule {
  static connProvider: ConnectionProvider;
  static forRoot(options: ConnectionConfig): DynamicModule {
    const databaseProviders = [
      {
        provide: ConnectionProvider,
        useFactory: (): any => {
          DataBaseModule.connProvider = new ConnectionProvider(createPool(Object.assign({ connectionLimit: 10 }, options)));
          return DataBaseModule.connProvider;
        }
      }
    ];

    return {
      module: DataBaseModule,
      providers: databaseProviders,
      exports: databaseProviders,
    };
  }

  static forFeature(): DynamicModule {
    const databaseProviders = [
      {
        provide: ConnectionProvider,
        useFactory: (): any => {
          return DataBaseModule.connProvider;
        }
      }
    ];

    return {
      module: DataBaseModule,
      providers: databaseProviders,
      exports: databaseProviders,
    };
  }
}