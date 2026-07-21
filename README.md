# Project Dashboard

At my first tech job, I wanted to move laterally within the company from "Data Engineer" to "Software Engineer". I had to convince upper management I was qualified for the change. Given I had related work on my GitHub, I saw an opportunity to strengthen my argument by summarizing my GitHub content.

The main point I wanted to make was that my experience and skill-set aligned more with the role of Software Engineer than that of Data Engineer. To that end, this dashboard was originally designed to compare quantities of work related to each role. For example, the dashboard displays the number of projects relating to web development or the number of projects using JavaScript, etc.

```
NOTE: This project queries the GitHub API to automatically update the dashboard with content.
None of the dashboard's GitHub data is hardcoded.
```

The resulting dashboard is similar to that of a portfolio in that it puts my project work on display, the distinction being that this application was designed to supplement a live conversation with management as opposed to being something that could effectively standalone. The dashboard aims to make a point of comparing skill-sets and relaying a breadth of experience first and foremost. Little effort was made to emphasize projects of particular quality or share professional details.

_NOTE: The terms "project" and "repository" are used interchangeably throughout this document._

<img src="/presentation/thumbnail.webp" width="700">

[View the application](https://project-dashboard.theodoremoreland.dev/)

## Table of contents

- [Technologies Used](#technologies-used)
- [Features](#features)
  - [Filter](#filter)
  - [Preview](#preview)
    - [README](#readme)
  - [Search](#search)
  - [Recent commits](#recent-commits)
  - [Analyze](#analyze)
- [Known bugs](#known-bugs)
- [Screenshots](#screenshots)
  - [Desktop](#desktop)
  - [Mobile](#mobile)

## Technologies Used

- React
- TypeScript
- JavaScript
- HTML
- CSS
- Tanstack React Query
- MUI X Charts
- GitHub API
- Vite
- Axios

## Features

### Filter

Technologies listed on the left panel can be clicked to filter projects by corresponding technology. The numbers displayed next to each technology represent the number of projects that utilize that technology.

Multiple filters can be applied simultaneously. Any project that does not feature any of the selected technologies will be hidden.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/6.png" width="700">

### Preview

Each project is displayed as a thumbnail. Upon hovering over a thumbnail, a thumbnail overlay appears featuring the project's name and a list of icons representing the programming languages used.

Additionally, each thumbnail overlay features an `Explore` button, that when clicked, will display additional information about the project.

Conditionally, a `Live Demo` button appears if the project is actively hosted on a live server. Clicking the button will open a new tab featuring the web application.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/12.png" width="700">

#### README

GitHub READMEs are parsed for their images and are displayed upon clicking "Explore". The images automatically cycle, but can be cycled manually as well.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/14.png" width="700">

### Search

The search bar can be used to search for projects by name or GitHub topic.

Some examples include: `dashboard` `responsive` `mui-x` `tanstack-react-query` `jupyter-notebook` `rest-api`

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/15.png" width="700">

### Recent commits

Clicking on "Recent commits" will open a modal that previews the 10 most recent commits on my GitHub profile.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/20.png" width="700">

### Analyze

Clicking on the analytics icon in the navbar will display aggregate statistics about the projects featured.

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/23.png" width="700">

## Known bugs

- CSS properties like `backdrop-filter` and `filter` cause visual artifacts and visual glitches on Firefox. In laymen's terms that means shadows or random edges appear in random places on the app. It may be possible to circumvent by toggling off Hardware Acceleration in the Firefox settings.
- Blur effects don't render properly when taking screenshots via Firefox screenshot feature.

## Screenshots

### Desktop

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/1.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/2.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/3.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/4.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/5.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/6.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/7.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/8.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/9.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/10.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/11.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/12.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/13.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/14.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/15.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/16.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/17.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/18.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/19.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/20.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/21.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/22.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/23.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/24.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/25.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/26.png" width="650">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/27.png" width="650">

### Mobile

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/28.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/29.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/30.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/31.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/32.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/33.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/34.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/35.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/36.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/37.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/38.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/39.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/40.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/41.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/42.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/43.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/44.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/45.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/46.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/47.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/48.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/49.png" width="250">

<img src="https://dj8eg5xs13hf6.cloudfront.net/project-dashboard/50.png" width="250">
