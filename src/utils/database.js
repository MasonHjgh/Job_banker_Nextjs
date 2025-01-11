import pg from "pg";

import { PrismaClient } from "@prisma/client/extension";
let client;

export const connectToDB = async () => {
    try {
        if (!client) {
        client= new PrismaClient();
  
        
    }
        return client;
    } catch (error) {
        console.log(error);
    }       
}