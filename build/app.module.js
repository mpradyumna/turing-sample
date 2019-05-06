"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationModule = void 0;

var _common = require("@nestjs/common");

var _typeorm = require("@nestjs/typeorm");

var _path = require("path");

var _dec, _class;

let ApplicationModule = (_dec = (0, _common.Module)({
  imports: [_typeorm.TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [(0, _path.join)(__dirname, '**/**.entity{.ts,.js}')],
    synchronize: true
  })]
}), _dec(_class = class ApplicationModule {}) || _class);
exports.ApplicationModule = ApplicationModule;