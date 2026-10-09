# Personal Portfolio Website

A responsive four-page portfolio built with plain HTML, CSS and JavaScript (no build step).

## Pages
- `index.html` Home: intro, skills summary, recent projects
- `about.html` About: bio, skills, education and experience
- `projects.html` Projects: showcase with category filter
- `contact.html` Contact: details and a validated contact form (opens the visitor's email app, no backend)

## Folder structure
```
portfolio/
  index.html
  about.html
  projects.html
  contact.html
  css/style.css
  js/main.js
```

## Before you submit: replace the placeholders
Search the project for these and put in your own details.
- `Your Name` (page titles, header, footer, headings) and the `YN` / `Y` initials
- `you@example.com` (also the `data-email` attribute on the form), phone, city in `contact.html`
- `your-username` in the GitHub and LinkedIn links (every page footer + project links)
- Text inside square brackets, like `[Your University]`, in `about.html`
- Sample projects in `index.html` and `projects.html` (keep the chat app, it is your real project)
- Optional: add `images/me.jpg` and swap the `about-photo` div for an `<img>`

## Run locally
Open `index.html` in a browser, or use the VS Code "Live Server" extension.

## Deploy on Netlify
1. Push the folder to a GitHub repository.
2. Netlify: Add new site, Import an existing project, pick the repo.
3. Build command: leave empty. Publish directory: `.` (the repo root). Deploy.

Quick alternative: drag and drop the folder at https://app.netlify.com/drop

## Features
- Dark / light theme toggle (remembers the choice)
- Project filter on the Projects page
- Contact form with validation; on submit it opens your email app using the address in `data-email` on the form in `contact.html`
- All content is static HTML, no database or API

## Responsive behaviour
Mobile first. The menu collapses into a toggle below 860px, grids switch from
one column to two or three at 700px and 1000px.
