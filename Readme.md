# LinkedIn Avatar Scraper

A Node.js script that uses Puppeteer to automatically log in to LinkedIn, retrieve the user's profile avatar, and save it locally. The script has an optional CLI argument to specify the filename.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Puppeteer](https://www.npmjs.com/package/puppeteer)

## Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:yurii2007/linkedin-avatar-scrapp.git
   cd linkedin-avatar-scrapp
   ```

2. Install dependencies
    ```bash
    npm i
    ```

## Usage

1. Set Up LinkedIn Credentials
    Add your LinkedIn credentials and 2Captcha token to a .env file in the project root:
    ```
    cp .template.env .env
    ```

2. Run the Script
    ```bash
    npm start <filename>
    ```