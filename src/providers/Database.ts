/**
 * Define Database connection
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

const { Pool } = require('pg')


import Locals from './Locals';

class Database {
    private DbPool;

    constructor() {
        this.DbPool = new Pool(Locals.config().pg);
    }

    /* 
    * Single Query to Postgres
    * @param sql: the query for store data
    * @return result
    */
    public async sqlToDB(sql) {
        //logger.debug(`sqlToDB() sql: ${sql} | data: ${data}`);
        try {
            let result = await this.DbPool.query(sql);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /* 
    * Single Query to Postgres
    * @param sql: the query for store data
    * @param data: the data to be stored
    * @return result
    */
    public async sqlToDBWithParams(sql, data) {
        //logger.debug(`sqlToDB() sql: ${sql} | data: ${data}`);
        try {
            let result = await this.DbPool.query(sql, data);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /*
    * Retrieve a SQL client with transaction from connection pool. If the client is valid, either
    * COMMMIT or ROALLBACK needs to be called at the end before releasing the connection back to pool.
    */
    public async getTransaction() {
        //logger.debug(`getTransaction()`);
        const client = await this.DbPool.connect();
        try {
            await client.query('BEGIN');
            return client;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /* 
    * Execute a sql statment with a single row of data
    * @param sql: the query for store data
    * @param data: the data to be stored
    * @return result
    */
    public async sqlExecSingleRow(client, sql, data) {
        //logger.debug(`sqlExecSingleRow() sql: ${sql} | data: ${data}`);
        try {
            let result = await client.query(sql, data);
            //logger.debug(`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`);
            return result
        } catch (error) {
            //logger.error(`sqlExecSingleRow() error: ${error.message} | sql: ${sql} | data: ${data}`);
            throw new Error(error.message);
        }
    }

    /*
    * Execute a sql statement with multiple rows of parameter data.
    * @param sql: the query for store data
    * @param data: the data to be stored
    * @return result
    */
    public async sqlExecMultipleRows(client, sql, data) {
        //logger.debug(`inside sqlExecMultipleRows()`);
        if (data.length !== 0) {
            for (let item of data) {
                try {
                    //logger.debug(`sqlExecMultipleRows() item: ${item}`);
                    //logger.debug(`sqlExecMultipleRows() sql: ${sql}`);
                    await client.query(sql, item);
                } catch (error) {
                    //logger.error(`sqlExecMultipleRows() error: ${error}`);
                    throw new Error(error.message);
                }
            }
        } else {
            //logger.error(`sqlExecMultipleRows(): No data available`);
            throw new Error('sqlExecMultipleRows(): No data available');
        }
    }

    /*
    * Rollback transaction
    */
    public async rollback(client) {
        if (typeof client !== 'undefined' && client) {
            try {
                //logger.info(`sql transaction rollback`);
                await client.query('ROLLBACK');
            } catch (error) {
                throw new Error(error.message);
            } finally {
                client.release();
            }
        } else {
            //logger.warn(`rollback() not excuted. client is not set`);
        }
    }

    /*
    * Commit transaction
    */
    public async commit(client) {
        try {
            await client.query('COMMIT');
        } catch (error) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    }

}

export default new Database;
