"use strict";
/**
 * Define Database connection
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const Log_1 = require("../middlewares/Log");
const Locals_1 = require("./Locals");
class Database {
    constructor() {
        this.DbPool = new Pool(Locals_1.default.config().pg);
    }
    /*
    * Single Query to Postgres
    * @param sql: the query for store data
    * @return result
    */
    sqlToDB(inputObject) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.default.info(`sqlToDB() name: ${inputObject.name} | sql: ${inputObject.text} | data: ${inputObject.data}`);
            try {
                let result = yield this.DbPool.query(inputObject);
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /*
    * Single Query to Postgres
    * @param sql: the query for store data
    * @param data: the data to be stored
    * @return result
    */
    sqlToDBWithParams(sql, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //logger.debug(`sqlToDB() sql: ${sql} | data: ${data}`);
            try {
                let result = yield this.DbPool.query(sql, data);
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /*
    * Retrieve a SQL client with transaction from connection pool. If the client is valid, either
    * COMMMIT or ROALLBACK needs to be called at the end before releasing the connection back to pool.
    */
    getTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            //logger.debug(`getTransaction()`);
            const client = yield this.DbPool.connect();
            try {
                yield client.query('BEGIN');
                return client;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /*
    * Execute a sql statment with a single row of data
    * @param sql: the query for store data
    * @param data: the data to be stored
    * @return result
    */
    sqlExecSingleRow(client, inputObject) {
        return __awaiter(this, void 0, void 0, function* () {
            //logger.debug(`sqlExecSingleRow() sql: ${sql} | data: ${data}`);
            try {
                let result = yield client.query(inputObject);
                //logger.debug(`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`);
                return result;
            }
            catch (error) {
                //logger.error(`sqlExecSingleRow() error: ${error.message} | sql: ${sql} | data: ${data}`);
                throw new Error(error.message);
            }
        });
    }
    /*
    * Execute a sql statement with multiple rows of parameter data.
    * @param sql: the query for store data
    * @param data: the data to be stored
    * @return result
    */
    sqlExecMultipleRows(client, sql, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //logger.debug(`inside sqlExecMultipleRows()`);
            if (data.length !== 0) {
                for (let item of data) {
                    try {
                        //logger.debug(`sqlExecMultipleRows() item: ${item}`);
                        //logger.debug(`sqlExecMultipleRows() sql: ${sql}`);
                        yield client.query(sql, item);
                    }
                    catch (error) {
                        //logger.error(`sqlExecMultipleRows() error: ${error}`);
                        throw new Error(error.message);
                    }
                }
            }
            else {
                //logger.error(`sqlExecMultipleRows(): No data available`);
                throw new Error('sqlExecMultipleRows(): No data available');
            }
        });
    }
    /*
    * Rollback transaction
    */
    rollback(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof client !== 'undefined' && client) {
                try {
                    //logger.info(`sql transaction rollback`);
                    yield client.query('ROLLBACK');
                }
                catch (error) {
                    throw new Error(error.message);
                }
                finally {
                    client.release();
                }
            }
            else {
                //logger.warn(`rollback() not excuted. client is not set`);
            }
        });
    }
    /*
    * Commit transaction
    */
    commit(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.query('COMMIT');
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                client.release();
            }
        });
    }
}
exports.default = new Database;
//# sourceMappingURL=Database.js.map