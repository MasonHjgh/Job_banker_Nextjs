This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
This project is using PostgreSQL, DaisyUI, Tailwind css and React.
Its an application for keeping records of the job application sent. The user is resposible for entering the required data or use auto importer for Linkedin.
I plan on adding Indeed and Glassdoor to the auto importer so that the users can extract the main data automaticaly with just the URL of the job application.


## Getting Started

First install the packages:

```bash
npm i
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


# Demo
https://job-banker-nextjs.vercel.app/

# Requirements
you will need a PostgreSQL database. The migration code is already implemented using Prisma.
