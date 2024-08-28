import pg from "pg";


let client;

export const connectToDB = async () => {
    try {
        if (!client) {
           
           
        client = new pg.Pool({
            user: "job_banker_user_app",
            password: "123456",
            host: "localhost",
            port: "5432",
            database: "Job-banker",
            idleTimeoutMillis: 30000,
        });
    }
        await client.connect();
       
        return client;
    } catch (error) {
        console.log(error);
    }       
}