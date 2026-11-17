# Task Management App

A simple task management application built with HTML, CSS, and Vanilla JavaScript. It supports the basic CRUD operations and saves tasks in the browser using Local Storage.

## Features

- Add new tasks with the current date.
- Display saved tasks.
- Edit task titles.
- Delete tasks after confirmation.
- Mark tasks as completed or pending.
- Persist tasks in browser Local Storage.
- Responsive layout for smaller screens.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage
- Google Material Symbols

## Getting Started

1. Clone this repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Open the project folder.
3. Open `index.html` in your browser.

No build tools or package installation are required.

## Project Structure

```text
Task-Management-App/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Data Storage

Tasks are saved in the browser's Local Storage under the key `tasks`. Each task contains:

- `title`: task title.
- `date`: date the task was created.
- `isdone`: whether the task is completed.

## Notes

- Tasks are stored locally in the browser, not in a remote database.
- Clearing the browser's site data may remove saved tasks.
- Google Material Symbols are loaded from Google Fonts, so an internet connection is needed for those icons.

## Author

Your Name Muhammed Shaaban
