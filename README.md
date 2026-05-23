# Bookmark Manager App

A responsive Bookmark Manager web application built using **HTML, CSS, and Vanilla JavaScript**.  
This project is part of my frontend preparation journey, focused on improving UI development, JavaScript fundamentals, dynamic rendering, and product-level thinking.

## Overview

The Bookmark Manager App allows users to view and manage bookmarks in a clean dashboard-style interface.  
The content is loaded from a local `data.json` file and rendered dynamically using JavaScript.

This project helped me understand how static UI can be converted into a data-driven frontend application.

## Features Implemented

- Responsive dashboard layout
- Sidebar navigation
- Bookmark card UI design
- Dynamic rendering of bookmark cards from `data.json`
- Fetching local JSON data using Fetch API
- Rendering favicon, title, URL, description, tags, visit count, created date, and last visited date
- Footer alignment handling for dynamic card content
- Clean HTML and CSS structure
- Scrollable bookmark section
- Basic card styling and layout refinement

## Upcoming Features

- Dynamic sidebar tags from bookmark data
- Search bookmarks by title
- Filter bookmarks by one or multiple tags
- Reset selected tag filters
- View archived bookmarks
- Archive bookmarks
- Pin and unpin bookmarks
- Edit bookmark details
- Copy bookmark URL to clipboard
- Visit bookmarked website directly
- Sort bookmarks by:
  - Recently added
  - Recently visited
  - Most visited
- Light and dark theme toggle
- Fully responsive layout for all screen sizes
- Hover and focus states for interactive elements

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
- Local JSON data

## What I Learned

Through this project, I practiced and improved the following concepts:

- Structuring a real-world frontend layout
- Creating reusable card UI structure
- Using `data.json` as a local data source
- Fetching local JSON data using `fetch()`
- Understanding JSON text vs JavaScript object
- Using `async` and `await`
- Dynamically generating HTML using JavaScript
- Using template literals and string interpolation
- Rendering arrays of objects into UI
- Handling dynamic content inside card layouts
- Understanding scrollable sections in flex layouts
- Improving spacing, typography, and UI consistency

## Current Progress

The project currently supports dynamic rendering of bookmark cards using the normal JavaScript approach.

Current completed flow:

```text
data.json
↓
fetch data
↓
convert JSON response into JavaScript object
↓
get bookmarks array
↓
loop through bookmarks
↓
generate card HTML
↓
insert cards into bookmark container