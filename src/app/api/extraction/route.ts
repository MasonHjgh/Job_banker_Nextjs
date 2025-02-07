import { NextResponse, NextRequest } from "next/server.js"
import * as cheerio from "cheerio"
import axios from "axios"
import { URL } from "url"
import type { Job } from "@prisma/client"

type urlTypes = {
  id: number
  name: string
  url: string
  path: string
}

const urlLists: urlTypes[] = [
  { id: 1, name: "Linkedin", url: "www.linkedin.com", path: "/jobs/view/" },
  { id: 2, name: "Indeed", url: "www.indeed.com", path: "/job" },
  { id: 3, name: "Glassdoor", url: "www.glassdoor.com", path: "/job" },
]
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json() // Use `unknown` for stricter type checking

    if (typeof body !== "string") {
      return NextResponse.json(
        { message: "Invalid input: URL must be a string" },
        { status: 400 }
      )
    }

    // Validate the URL before using it
    if (!isValidUrl(body)) {
      return NextResponse.json(
        { message: "Invalid URL format" },
        { status: 400 }
      )
    }

    const url = new URL(body)
    const matchingSite: urlTypes | null = getMatchingSite(url)

    // Check if the URL is supported
    if (matchingSite === null) {
      return NextResponse.json(
        { message: "URL is not supported" },
        { status: 400 }
      )
    }

    // Parse the URL and add the path if it is missing
    const newJobUrl: URL | null = parsePath(url, matchingSite)

    if (newJobUrl === null) {
      return NextResponse.json(
        { message: "Invalid URL format" },
        { status: 400 }
      )
    }

    const { data: html } = await axios.get<string>(newJobUrl.href)

    const results: Partial<Job> | null = extractData(
      html,
      matchingSite,
      newJobUrl.href
    )

    return NextResponse.json(results, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 400 }
    )
  }
}

// Helper function to check if a string is a valid URL
function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString)
    return true
  } catch {
    return false
  }
}

function extractData(html: string, matchingSite: urlTypes, jobUrl: string) {
  switch (matchingSite.id) {
    case 1: //Linkedin
      return extractDataLinkedin(html, jobUrl)

    case 2: //Indeed
    // return extractDataIndeed(html, jobUrl)

    case 3: //Glassdoor
    // return extractDataGlassdoor(html, jobUrl)
    default:
      return null
  }
}

// Function to parse the URL and add the path if it is missing
function parsePath(inputUrl: URL, site: urlTypes) {
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
function getMatchingSite(inputUrl: URL) {
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
function extractDataLinkedin(html: string, jobUrl: string) {
  const $ = cheerio.load(html)
  const position_name = $(".topcard__title").text().trim() 
  const company_name = $(".topcard__org-name-link").text().trim() 
  const salary = $(".salary").text().trim() || "Not Provided"
  const contact =
    $(".message-the-recruiter a").attr("href") || "No Contact Info"
  return {
    position_name: position_name,
    company_name: company_name,
    salary: salary,
    contact: contact,
    job_link: jobUrl,
  }
}

// Function to extract data from the Indeed HTML
// function extractDataIndeed(html) {}

// Function to extract data from the Glassdoor HTML
// function extractDataGlassdoor() {}
