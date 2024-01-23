# Keycloak + React Router 6 data apis

This is the source code that's referenced in my [blog post](https://andresrodriguez.dev/posts/keycloak-react-router-6)

## Getting started

Dependencies are installed with Bun, but you can use any package manager you want -- just delete the `bun.lockb` file.

You will also need access to a Keycloak instance. I set up a docker-compose file and a script to set up something quick for local development. If you already have a local Keycloak instance, you can skip this step and start [setting up the app](#setting-up-the-environment).

### Set up Keycloak

In order to set up a local Keycloak instance for development, you will need to have Docker installed. The setup is fairly simple:

```bash
bun setup
```

This just calls `docker compose up -d`. You can check the `docker-compose.yml` file and update the environment variables if you want to.

Once the innstance is up and running, you can access it at `http://localhost:8080`. The admin credentials are `admin`/`admin` or whatever combination you may have set up in `docker-compose.yml`. You will need to do the following:

1. Create a new realm
2. Set up a new client
> [!NOTE]
> Set the redirect URI to `http://localhost:5173/*`, or wherever your app is running.
3. Create a new user

### Setting up the environment

Copy the `.env.template` file and fill up the values for `VITE_KEYCLOAK_REALM` and `VITE_KEYCLOAK_CLIENT_ID` with the values you set up in Keycloak. If you have set up Keycloak using the script in this repo, the `VITE_KEYCLOAK_URL` should be `http://localhost:8080`.

> [!TIP]
> You do not have to use the local Keycloak instance. If you already have a Keycloak instance set up, you can use that one. If you are using the local Keycloak instance and update the `ports` entry in the `docker-compose.yml` file, make sure that the URL in the `VITE_KEYCLOAK_URL` variable is updated accordingly.

### Running the app

1. Install dependencies
   ```bash
   bun install
   # or yarn
   # or npm install
   # or pnpm install
   ```
2. Run the app
   ```bash
   bun dev
   # or yarn dev
   # or npm run dev
   # or pnpm dev
   ```
