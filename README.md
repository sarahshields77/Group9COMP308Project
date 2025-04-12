## COMP 308 Emerging Technologies - Section 402 Group 9
## Group Project – Community Engagement Platform

## Project Overview

This is an AI-driven web app that fosters community engagement by connecting people within a local neighborhood. It consists of multiple micro-frontends and microservices, including:

Auth-App → Handles user authentication (JWT-based login/registration).
Community-App → Manages local news, discussions, and help requests.
Business-App → Allows local businesses to list services and interact.
Events-App → Handles community events and volunteer matching.
Shell-App → The main container that loads different micro-frontends dynamically.  
AI Integrations:  
   AI Summarization: Auto-generate summaries for long discussions.  
   Sentiment Analysis: AI analyzes user posts and reviews.  
   Neighbourhood Help Requests: AI matches volunteers based on their interests and location.

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository.
```bash
git clone https://github.com/sarahshields77/Group9COMP308Project.git
cd Group9COMP308Project
```

2. Install all dependencies at once using our npm script:
```bash
npm run install-all
```

This will install dependencies for:
- Root project (concurrently package)
- All backend services (auth, community, business, personalization)
- All frontend services (shell-app, auth-app, community-app)

> [!IMPORTANT]
> ## 🌐 MongoDB Atlas Setup (Updated April 2025)
>
> All microservices now use MongoDB Atlas instead of local MongoDB.

### 🚀 What you need to do:

1. **Add your `.env` file** to each microservice root (available in the env-files discord channel)

2. Start all services at once with a single command:
```bash
npm start
```

This will concurrently start all backend and frontend services:

**Backend Services:**
- Auth Service: http://localhost:4001/graphql
- Community Service: http://localhost:4002/graphql
- Business Service: http://localhost:4003/graphql
- Personalization Service: http://localhost:4004/graphql

**Frontend Services:**
- Shell App: http://localhost:3000/
- Auth App: http://localhost:3001/
- Community App: http://localhost:3002/

### 🛠️ Alternative Setup (Manual Method)

If you prefer to install and start services individually:

**For Backend Services:**
In each service directory (server/auth-service, server/community-service, etc.):
```bash
npm install
npm run dev
```

**For Frontend Services:**
In each app directory (client/auth-app, client/community-app, etc.):
```bash
npm install
npm run deploy  # For auth-app and community-app
npm run dev     # For shell-app
```
 
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
