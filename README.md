# Project List

<img src="/presentation/thumbnail.webp" width="650">

[View the application](https://main.d2wyze0voo0sc5.amplifyapp.com/)

## Table of contents

- [Overview](#overview)
- [Context for design](#context-for-design)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
  - [Desktop](#desktop)
  - [Mobile](#mobile)
  - [Older versions](#older-versions)

## Overview

This web application dynamically renders a list of my GitHub repositories. Repositories are queried in real-time from the GitHub API and are displayed in semi-random order.

NOTE: The terms "project" and "repository" are used interchangeably throughout this document.

### Preview

Each project is displayed as a thumbnail. Upon hovering over a thumbnail, a thumbnail overlay appears featuring the project's name and a list of icons representing the programming languages used.

Additionally, each thumbnail overlay features a `Learn More` button, that when clicked, will display additional information about the project.

Conditionally, a `Live Demo` button appears if the project is actively hosted on a live server. Clicking the button will open a new tab featuring the web application.

### Filter

Technologies listed on the left panel can be clicked to filter projects by corresponding technology. The numbers displayed next to each technology represent the number of projects that utilize that technology.

Multiple filters can be applied simultaneously. Any project that does not feature any of the selected technologies will be hidden.

### Search

The search bar can be used to search for projects by name or GitHub topic.

### Analyze

Clicking on the analytics icon in the navbar will display aggregate statistics about the projects featured.

## Context for design

At my first tech job, I wanted to move laterally within the company from "Data Engineer" to "Software Engineer" (an internal position). I had to convince upper management I was qualified for the change. Given I had related work on my GitHub, I saw an opportunity to strengthen my argument by summarizing my GitHub content.

Relaying a breadth of experience with various technologies was my goal. The result is similar to that of a portfolio in that it puts my project work on display, but there is a key distinction in that this application was designed to supplement a live conversation with management as opposed to being something that could effectively standalone. To that end, presenting projects in semi-random order with little effort to highlight select projects (the vast majority of which are enhanced homework assignments) was by design.

This application has undergone numerous design updates (see [screenshots](#screenshots) below).

### Technologies Used

- React
- TypeScript
- JavaScript
- HTML
- CSS
- Tanstack React Query
- MUI X Charts
- react-intersection-observer
- GitHub API
- AWS
- Vite

## Screenshots

### Desktop

<img src="/presentation/thumbnail.webp" width="650">

### Mobile

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/11.png" width="250">

### Older versions

#### Version 3 (Desktop - Ultra wide)

All previous versions arranged the projects horizontally. The horizontal alignment didn't turn out as I intended, the result was an unideal user experience. By version #3, I tried to compensate by syncing the user's vertical scroll to the app's horizontal scroll. This was ultimately not enough as said functionality wasn't intuitive to the user.

Previous versions also used word clouds as filter interfaces. While I still like the concept, this was difficult to implement in a mobile friendly way. Previous versions also featured a "View README" button for each project that would render the corresponding project README upon being clicked.

Version #3, in comparison to version #2, made some improvements to streamline the layout by improving layout symmetry and using less text. Version #3 also displayed names in the word clouds using their standard casing (e.g. JavaScript as opposed to Javascript etc...) and added a Reset button for the filter.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/41.png" width="950">

#### Version 3 (Mobile)

The mobile version didn't feature the word cloud filter interface, which made it feel inferior to the desktop version as the filtering interface was the app's core idea.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-list/42.png" width="250">
