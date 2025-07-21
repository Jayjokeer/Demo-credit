import { Knex } from 'knex';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config: Knex.Config = {  
    client: 'mysql2',  
    connection: {    host: process.env.DATABASE_HOST,    
        user: process.env.DATABASE_USER,    
        password: process.env.DATABASE_PASSWORD,    
        database: process.env.DATABASE_NAME,  
    },  migrations: {   
         directory: './src/migrations',  
            extension: 'ts',
            },
        };
export default config;
module.exports = config;