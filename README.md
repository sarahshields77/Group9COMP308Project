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

2. Install dependencies and start Backend Services.     
   In the `server/auth-service` , `server/community-service`, and `server/business-service` directories, install the required dependencies:
```bash
npm install
```
> [!IMPORTANT]
> ## 🌐 MongoDB Atlas Setup (Updated April 2025)
>
>All microservices now use MongoDB Atlas instead of local MongoDB.

### 🚀 What you need to do:
1. **Add your `.env` file** to each microservice root (env-files discord channel)

   Install dependencies and start the services:  
   in server/auth-service, server/community-service, server/business-service, and server/personalization-service run:  
```bash
npm run dev
```

the auth-service will run at http://localhost:4001/graphql  
the community-service will run at http://localhost:4002/graphql
the business-service will run at http://localhost:4003/graphql  
the personalization-service will run at http://localhost:4004/graphql

1. Install dependencies and Start the Microfrontends:  
    In the `client/auth-app` directory, install the required dependencies and start the Authentication app:
```bash
npm install
npm run deploy
```
the auth-app will run at http://localhost:3001/  

   In the `client/shell-app` directory, install the required dependencies and start the Shell app:
```bash
npm install
npm run dev
```  
the shell-app will run at http://localhost:3000/  

   In the `client/community-app` directory, install the required dependencies and start the app:
```bash
npm install
npm run deploy
```  
the community-app will run at http://localhost:3002/    
 
1. Coming Soon/TODO - AI Integrations:  
   AI Summarization: Auto-generate summaries for long discussions.  
   Sentiment Analysis: AI analyzes user posts and reviews.  
   Note - The Gemini API can be used for both summarization and sentiment analysis  


### 📁 Project Structure  
```plaintext
Group9COMP308Project/
│── server/  (Backend services)
│   ├── auth-service/  (User Authentication Service - handles login, registration)
│   ├── community-service/  (Community Engagement Service - news, discussions, help requests)
│   ├── business-service/  (Business & Events Service - listings, events, deals) [TODO]
│   ├── personalization-service/  (AI Personalization Service - recommendations, trend detection) [TODO]
│
│── client/ (Frontend Micro Frontends)
│   ├── shell-app/  (Main app that loads micro frontends)
│   ├── auth-app/  (Authentication & User Management micro frontend)
│   ├── community-app/  (Community & Business Engagement micro frontend)
│   ├── events-app/  (Events & Administration micro frontend) [TODO]
│
│── .gitignore
│── package.json
│── README.md
```
