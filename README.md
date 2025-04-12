# the-bugfest-club

OpenAI Integration

Generate AI-powered travel plans using OpenAI's GPT 3.5. It runs alongside our main Java backend. Created a separate program with Express to make it more simple and streamlined. Note that each team member needs their own API Key

Setup Instructions:

1. First

- An OpenAI key (https://platform.openai.com/)
- Front-end and Backend running

2. Installation

Copy paste the whole below into terminal from pwd: the-bugfest-club

- cd frontend-travel-vibes
- npm install react-share
- npm install react-toastify
- cd ../openai-server
- npm install
- npm install express
- npm install cors
- npm install openai
- npm install axios

3.  OpenAI API Key Setup

- Login to (https://platform.openai.com/)
- Add payment information (required for access, can set small limit and require approval to add more)
- Get API key and save somewhere secure - OpenAI only shows it one time
- Replace the API key in server.js
- SOMETIMES OpenAI requires a project name. Go to settings -> General -> Project. There you will find the project name. It will start with pr. It will not change even if you change your API key. Store with API Key and update at the same time.
- ** BEFORE PUSHING TO GITHUB MAKE SURE TO ERASE KEY AND ADD BACK 'YOUR-API-KEY-HHERE' **

4.  Running the Express Server

- In the terminal: node server.js
- You should see "Server running on port 3001"

5.  Generating Trips

- In a separate terminal run the front-end in Vite and input the trip info. The generated trip will show the JSON output in the node.js terminal

6.  Next Steps:

- Frontend Display: Show loading; display travel plan
  - Update From submission: point form to Spring backend instead of OpenAI server
  - Display travel plan: include info from wireframe
- Backend:
  - POST /api/trips to:
    - check if trip exists (simple)
    - call OpenAI, if needed
    - save to database, if needed
    - return trip
