/**
 * Define Database connection
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

const { Pool } = require('pg')
import { Query } from '../interfaces/Query';
import Log from '../middlewares/Log';

import Locals from './Locals';

class Database {
    private DbPool;

    constructor() {
        this.DbPool = new Pool({
            max: 10,
            connectionString: Locals.config().dbUrl
        });
    }

    /* 
    * Single Query to Postgres
    * @param sql: the query for store data
    * @return result
    */
    public async sqlToDB(inputObject: Query): Promise<any> {
        Log.info(`sqlToDB() name: ${inputObject.name} | sql: ${inputObject.text} | data: ${inputObject.data}`);
        try {
            let result = await this.DbPool.query(inputObject);
            Log.info(`sqlToDB(): ${result.command} | ${result.rowCount}`);
            return result;
        } catch (error) {
            Log.error(`sqlToDB() error: ${error.message} | sql: ${inputObject.text} | data: ${inputObject.data}`);
            throw new Error(error.message);
        }
    }

    /*
    * Retrieve a SQL client with transaction from connection pool. If the client is valid, either
    * COMMMIT or ROALLBACK needs to be called at the end before releasing the connection back to pool.
    */
    public async getTransaction() {
        Log.info(`getTransaction()`);
        const client = await this.DbPool.connect();
        try {
            await client.query('BEGIN');
            return client;
        } catch (error) {
            Log.error(`getTransaction() error: ${error.message}`);
            throw new Error(error.message);
        }
    }

    /* 
    * Execute a sql statment with a single row of data
    * @param sql: the query for store data
    * @param data: the data to be stored
    * @return result
    */
    public async sqlExecSingleRow(client, inputObject: Query): Promise<any> {
        Log.info(`sqlExecSingleRow() name: ${inputObject.name} | sql: ${inputObject.text} | data: ${inputObject.data}`);
        Log.info(`sqlExecSingleRow()`);
        try {
            let result = await client.query(inputObject);
            Log.info(`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`);
            return result
        } catch (error) {
            Log.error(`sqlExecSingleRow() error: ${error.message} | sql: ${inputObject.text} | data: ${inputObject.data}`);
            throw new Error(error.message);
        }
    }

    /*
    * Execute a sql statement with multiple rows of parameter data.
    * @param sql: the query for store data
    * @param data: the data to be stored
    * @return result
    */
    public async sqlExecMultipleRows(client, inputObject: Query) {
        Log.info(`sqlExecMultipleRows() name: ${inputObject.name} | sql: ${inputObject.text} | data: ${inputObject.data}`);
        if (inputObject.listData.length > 0) {
            for (let item of inputObject.listData) {
                try {
                    Log.info(`sqlExecMultipleRows() item: ${item}`);
                    Log.info(`sqlExecMultipleRows() sql: ${inputObject.text}`);
                    await client.query(inputObject.text, item);
                } catch (error) {
                    Log.error(`sqlExecMultipleRows() error: ${error.message}`);
                    throw new Error(error.message);
                }
            }
        } else {
            throw new Error('sqlExecMultipleRows(): No data available');
        }
    }

    /*
    * Rollback transaction
    */
    public async rollback(client): Promise<void> {
        if (typeof client !== 'undefined' && client) {
            try {
                Log.info(`sql transaction rollback`);
                await client.query('ROLLBACK');
            } catch (error) {
                throw new Error(error.message);
            } finally {
                client.release();
                Log.info(`ROLLBACK: Transaction Released`);
            }
        } else {
            Log.warn(`rollback() not excuted. client is not set`);
        }
    }

    /*
    * Commit transaction
    */
    public async commit(client): Promise<void> {
        try {
            await client.query('COMMIT');
        } catch (error) {
            Log.error(`COMMIT error: ${error.message}`);
            throw new Error(error.message);
        } finally {
            client.release();
            Log.info(`COMMIT: Transaction Released`);
        }
    }

}

export default new Database;
