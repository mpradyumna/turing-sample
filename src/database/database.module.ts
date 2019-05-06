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

import { Module, DynamicModule } from '@nestjs/common';
import { ConnectionConfig, createPool } from 'mysql';

@Module({
})
export class DataBaseModule {
  static forRoot(options: ConnectionConfig): DynamicModule {
    const databaseProviders = [
      {
        provide: 'CONNECTION_PROVIDER',
        useFactory: (): any => {
          let pool = createPool(Object.assign({ connectionLimit: 10 }, options));
          return pool;
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