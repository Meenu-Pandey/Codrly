# Codrly Backend

This is the backend server for the Codrly code editor application.

## Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with your Google AI API key:
   ```
   PORT=3000
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /ai/fix-code` - Fix code using AI
  - Body: `{ "code": "your code here", "language": "javascript" }`
  - Response: `{ "success": true, "fixedCode": "fixed code here" }`

- `POST /ai/review-code` - Review code using AI
  - Body: `{ "code": "your code here", "language": "javascript" }`
  - Response: `{ "success": true, "review": "detailed review here" }`

## Architecture

- **Routes**: Define API endpoints (`src/routes/ai.routes.js`)
- **Controllers**: Handle request/response logic (`src/controllers/ai.controller.js`)
- **Services**: Business logic and external API calls (`src/services/ai.service.js`)

The server runs on port 3000 by default and is configured to accept requests from the frontend running on port 5173.
