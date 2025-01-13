import { NextResponse, NextRequest } from "next/server.js";
import { PrismaClient } from "@prisma/client";
import {Job } from "@prisma/client";
import * as cheerio from "cheerio";
import axios from "axios";
const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const jobUrl = await request.json();
        const { data: html } =await axios.get(jobUrl)
        const results = extractData(html)

      return NextResponse.json(results);
    } catch (error) {
      console.log(error);
      return NextResponse.json(error);
    }
  }


  function extractData(html) {
 
    const $ = cheerio.load(html);
    const position_name= $('.topcard__title').text().trim();
    const company_name= $('.topcard__org-name-link').text().trim();
    const salary= $('.salary').text().trim();
    return {"position_name":position_name,"company_name":company_name,"salary":salary};
   
  }

