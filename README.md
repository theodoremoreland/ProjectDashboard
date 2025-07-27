# Project Dashboard

<img src="/presentation/thumbnail.webp" width="700">

[View the application](https://project-dashboard.theodoremoreland.dev/)

## Table of contents

- [Technologies Used](#technologies-used)
- [Overview](#overview)
- [Context for design](#context-for-design)
- [Screenshots](#screenshots)
  - [Desktop](#desktop)
  - [Mobile](#mobile)
  - [Older versions](#older-versions)

## Technologies Used

- React
- TypeScript
- JavaScript
- HTML
- CSS
- Tanstack React Query
- MUI X Charts
- react-intersection-observer
- GitHub API
- Vite
- Axios

## Overview

A dashboard for quantifying and previewing my GitHub projects. This web application dynamically renders a list of my GitHub repositories. Repositories are queried in real-time from the GitHub API.

_NOTE: The terms "project" and "repository" are used interchangeably throughout this document._

### Preview

Each project is displayed as a thumbnail. Upon hovering over a thumbnail, a thumbnail overlay appears featuring the project's name and a list of icons representing the programming languages used.

Additionally, each thumbnail overlay features a `Learn More` button, that when clicked, will display additional information about the project.

Conditionally, a `Live Demo` button appears if the project is actively hosted on a live server. Clicking the button will open a new tab featuring the web application.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/5.png" width="700">

### Filter

Technologies listed on the left panel can be clicked to filter projects by corresponding technology. The numbers displayed next to each technology represent the number of projects that utilize that technology.

Multiple filters can be applied simultaneously. Any project that does not feature any of the selected technologies will be hidden.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/7.png" width="700">

### Search

The search bar can be used to search for projects by name or GitHub topic.

Some examples include: `dashboard` `responsive` `mui-x` `tanstack-react-query` `jupyter-notebook` `rest-api`

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/9.png" width="700">

### Analyze

Clicking on the analytics icon in the navbar will display aggregate statistics about the projects featured.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/13.png" width="700">

## Context for design

At my first tech job, I wanted to move laterally within the company from "Data Engineer" to "Software Engineer". I had to convince upper management I was qualified for the change. Given I had related work on my GitHub, I saw an opportunity to strengthen my argument by summarizing my GitHub content.

The main point I wanted to make was that my experience and skill-set aligned more with the role of Software Engineer than that of Data Engineer. To that end, this dashboard was originally designed to compare quantities of work related to each role. For example, the dashboard displays the number of projects relating to web development or the number of projects using JavaScript, etc.

Originally, the design featured a word cloud based filtering interface wherein the user could click on a term to filter projects while incidentally comparing my experience with the term's corresponding skill-set. For example, a filter for "Competency" might show the terms "Web Development" and "Data Engineering" as filtering options, but the term "Web Development" might be visibly larger than the term "Data Engineering". Hovering over a term would then display the exact count of projects corresponding to the term. Said interface was eventually removed in place of a simple list (see [screenshots](#screenshots) below).

The resulting dashboard is similar to that of a portfolio in that it puts my project work on display, but there is a key distinction in that this application was designed to supplement a live conversation with management as opposed to being something that could effectively standalone. The dashboard aims to make a point of comparing skill-sets and relaying a breadth of experience first and foremost, with the option to do a deep dive into whatever project(s) pique the interest of the parties involved. Antithetical to a portfolio, little effort was made to emphasize projects of particular quality (among other things, such as no information about work experience, education, resume, etc).

## Screenshots

### Desktop

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/1.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/2.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/3.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/4.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/5.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/6.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/7.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/8.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/9.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/10.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/11.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/12.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/13.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/14.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/15.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/16.png" width="650">

### Mobile

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/17.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/18.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/22.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/23.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/24.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/25.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/26.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/27.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/28.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/29.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/30.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/31.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/32.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/33.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/34.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/35.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/36.png" width="250">

### Older versions

#### Version 3 (Desktop - Ultra wide)

All previous versions arranged the projects horizontally. The horizontal alignment didn't turn out as I intended, the result was an unideal user experience. By version #3, I tried to compensate by syncing the user's vertical scroll to the app's horizontal scroll. This was ultimately not enough as said functionality wasn't intuitive to the user.

Previous versions also used word clouds as filter interfaces. While I still like the concept, this was difficult to implement in a mobile friendly way. Previous versions also featured a "View README" button for each project that would render the corresponding project README upon being clicked.

Version #3, in comparison to version #2, made some improvements to streamline the layout by improving layout symmetry and using less text. Version #3 also displayed names in the word clouds using their standard casing (e.g. JavaScript as opposed to javascript etc...) and added a Reset button for the filter.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/41.png" width="950">

#### Version 3 (Mobile)

The mobile version didn't feature the word cloud filter interface, which made it feel inferior to the desktop version as the filtering interface was the app's core idea.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/42.png" width="250">
