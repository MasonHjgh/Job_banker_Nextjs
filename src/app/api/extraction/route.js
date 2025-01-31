import { NextResponse, NextRequest } from "next/server.js"
import { PrismaClient } from "@prisma/client"
import { Job } from "@prisma/client"
import * as cheerio from "cheerio"
import axios from "axios"
const prisma = new PrismaClient()
import { URL } from "url"

const urlLists = [
  { id: 1, name: "Linkedin", url: "www.linkedin.com", path: "/jobs/view/" },
  { id: 2, name: "Indeed", url: "www.indeed.com", path: "/job" },
  { id: 3, name: "Glassdoor", url: "www.glassdoor.com", path: "/job" },
]

export async function POST(request) {
  try {
    const jobUrl = await request.json()
    const url = new URL(jobUrl)
    const matchingSite = getMatchingSite(url)

    // Check if the URL is supported
    if (!matchingSite) {
      return Promise.reject(new Error("UR not supported"))
    }
    // Parse the URL and add the path if it is missing
    const newJobUrl = parsePath(url, matchingSite)

    const { data: html } = await axios.get(newJobUrl.href)

    const results = extractData(html, matchingSite, newJobUrl.href)

    return NextResponse.json(results)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}

function extractData(html, matchingSite, jobUrl) {
  switch (matchingSite.id) {
    case 1: //Linkedin
      return extractDataLinkedin(html, jobUrl)

    case 2: //Indeed
      return extractDataIndeed(html, jobUrl)

    case 3: //Glassdoor
      return extractDataGlassdoor(html, jobUrl)
  }
}

// Function to parse the URL and add the path if it is missing
function parsePath(inputUrl, site) {
  try {
    switch (site.id) {
      case 1: //Linkedin
        if (!inputUrl.pathname.includes(site.path)) {
          inputUrl.pathname =
            site.path + inputUrl.searchParams.get("currentJobId")
        }
      case 2: //Indeed
      case 3: //Glassdoor
    }
    return inputUrl
  } catch (error) {
    return null // Invalid URL format
  }
}

// Function to get the matching site from the URL
function getMatchingSite(inputUrl) {
  try {
    return (
      urlLists.find(
        (site) => site.url.toLowerCase() === inputUrl.host.toLowerCase()
      ) || null
    )
  } catch (error) {
    return null // Invalid URL format
  }
}

// Function to extract data from the Linkedin HTML
function extractDataLinkedin(html, jobUrl) {
  const $ = cheerio.load(html)
  const position_name = $(".topcard__title").text().trim()
  const company_name = $(".topcard__org-name-link").text().trim()
  const salary = $(".salary").text().trim()
  const contact = $(".message-the-recruiter a ").attr("href")
  return {
    position_name: position_name,
    company_name: company_name,
    salary: salary,
    contact: contact,
    job_link: jobUrl,
  }
}

// Function to extract data from the Indeed HTML
function extractDataIndeed(html) {}

// Function to extract data from the Glassdoor HTML
function extractDataGlassdoor() {}
