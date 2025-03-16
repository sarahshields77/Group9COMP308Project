## COMP 308 Emerging Technologies - Section 402 Group 9
## Group Project – Community Engagement Platform

## Project Overview

This is an AI-driven web app that fosters community engagement by connecting people within a local neighborhood. It consists of multiple micro-frontends and microservices, including:

Auth-App → Handles user authentication (JWT-based login/registration).
Community-App → Manages local news, discussions, and help requests.
Business-App → Allows local businesses to list services and interact.
Events-App → Handles community events and volunteer matching.
Shell-App → The main container that loads different micro-frontends dynamically.

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository.
```bash
git clone https://github.com/sarahshields77/Group9COMP308Project.git
cd Group9COMP308Project
```

2. Install dependencies for Backend.   
   In the `server/auth-service` directory, install the required dependencies:
```bash
npm install
```
    the auth-service will run at http://localhost:4001/graphql

3. In the `server` directory, run the following command to start the Authentication Microservice:
```bash
npx nodemon index.js
```
> [!IMPORTANT]
> Ensure MongoDB is running and create a database called `auth-service-db`

4. Install and Start Authentication Microfrontend:
    In the `client/auth-app` directory, install the required dependencies and start the app:
```bash
npm install
npm run dev
```
    the auth-app will run at http://localhost:3001/

5. Install and Start the Shell App
   In the `client/shell-app` directory, install the required dependencies and start the app:
```bash
npm install
npm run dev
```
    the shell-app will run at http://localhost:3000/

6. Coming Soon! Additional modules (Community, Business, Events)

## Project Structure

Group9COMP308Project/
│── server/  (Backend services)
│   ├── auth-service/  (Handles authentication)
│   ├── community-service/  (Handles discussions, news, help requests)
│   ├── business-service/  (Handles business listings)
│   ├── events-service/  (Handles event management)
│
│── client/ (Frontend Micro Frontends)
│   ├── shell-app/  (Main app that loads micro frontends)
│   ├── auth-app/  (Handles login & registration)
│   ├── community-app/  (Community engagement features)
│   ├── business-app/  (Business listings & promotions)
│   ├── events-app/  (Event creation & volunteer matching)
│
│── .gitignore
│── package.json
│── README.md
