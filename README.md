# AI Image Classifier

An image classification app built with React, TensorFlow.js, and an Express API. The frontend is deployed to Vercel, and the API can be deployed as a separate Node.js web service (for example, on Render).

## Run locally

Install the frontend dependencies and start the React app:

```bash
npm install
npm start
```

In a second terminal, install and start the API:

```bash
cd backend
npm install
npm start
```

Set `MONGO_URI` and `JWT_SECRET` in `backend/.env` for authentication and persistent history. The frontend uses `http://localhost:5000` as its local API by default. To use another API URL, set `REACT_APP_API_URL` in a root `.env` file.

## Deploy the frontend to Vercel

Import the repository into Vercel with the repository root as the project root. Vercel uses the included `vercel.json` to run `npm run build`, publish the `build` directory, and route client-side paths to the React app.

Set this environment variable in the Vercel project before deploying:

| Variable | Value |
| --- | --- |
| `REACT_APP_API_URL` | The public base URL of the deployed backend, for example `https://your-api.example.com` |

The backend must be deployed separately; it is not included in the static Vercel deployment. Redeploy the frontend after changing its environment variables.

## Deploy the backend

Deploy `backend/` as a Node.js web service. Use `npm install` as the build command and `npm start` as the start command. Configure these environment variables on the backend service:

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | A long, random secret used to sign authentication tokens |

The API writes uploaded images to its local `uploads/` directory. Use a persistent disk or external object storage if uploaded images must survive backend restarts or redeployments.
