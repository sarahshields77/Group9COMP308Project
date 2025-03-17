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
npm run deploy
```

the auth-app will run at http://localhost:3001/

5. Install and Start the Shell App
   In the `client/shell-app` directory, install the required dependencies and start the app:
```bash
npm install
npm run dev
```
  
the shell-app will run at http://localhost:3000/  

6. Install and Start the Community App
   In the `client/community-app` directory, install the required dependencies and start the app:
```bash
npm install
npm run deploy
```
  
the community-app will run at http://localhost:3002/    

7. Install and Start the Community Service  
   In the `server/community-service` directory, install the required dependencies and start the app:
```bash
npm install
npm run dev
```

the community-service will run at http://localhost:4002/graphql  

> [!IMPORTANT]
> Ensure MongoDB is running and create a database called `community-service-db`

8. Coming Soon! Additional modules (Community, Business, Events)  
9. Coming Soon! AI Integrations:  
   AI Summarization: Auto-generate summaries for long discussions.  
   Sentiment Analysis: AI analyzes user posts and reviews.  
   Note - The Gemini API can be used for both summarization and sentiment analysis


### 📁 Project Structure  
```plaintext
Group9COMP308Project/
│── server/  (Backend services)
│   ├── auth-service/  (User Authentication Service - handles login, registration)
│   ├── community-service/  (Community Engagement Service - news, discussions, help requests)
│   ├── business-service/  (Business & Events Service - listings, events, deals)
│   ├── personalization-service/  (AI Personalization Service - recommendations, trend detection)
│
│── client/ (Frontend Micro Frontends)
│   ├── shell-app/  (Main app that loads micro frontends)
│   ├── auth-app/  (Authentication & User Management micro frontend)
│   ├── community-app/  (Community & Business Engagement micro frontend)
│   ├── events-app/  (Events & Administration micro frontend)
│
│── .gitignore
│── package.json
│── README.md
```
