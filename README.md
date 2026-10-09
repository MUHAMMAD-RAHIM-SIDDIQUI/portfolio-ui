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
## Features
- Dark / light theme toggle (remembers the choice)
- Project filter on the Projects page
- Contact form with validation; on submit it opens your email app using the address in `data-email` on the form in `contact.html`
- All content is static HTML, no database or API

## Responsive behaviour
Mobile first. The menu collapses into a toggle below 860px, grids switch from
one column to two or three at 700px and 1000px.
