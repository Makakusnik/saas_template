# Project Readme (Incomplete)

---

## General

This application is designed for quick startup. Simply provide the necessary variables in `apps/backend/.env.development`, and you're ready to go.

### `apps/backend/.env.development` Setup:

1.  **Duplicate** `apps/backend/.env.development.example` and remove the `.example` extension.
2.  **`WEB_URL`**: Fill in your frontend server URL. For local development, use `http://localhost:3000` if you're following this readme.
3.  **`NODE_ENV`**: Set to `development`.
4.  **`PORT`**: Default is `3001`. If you change it, ensure the frontend is updated to reach the correct backend server.
5.  **`POSTGRES` variables**: Fill in your PostgreSQL database details.
6.  **`BETTER_AUTH_SECRET`**: For development, "secret" is sufficient. Use a strong, unique secret for production.
7.  **`BASE_URL`**: Defaults to `http://localhost:3001` if ports haven't been changed.
8.  **Google Secrets (Optional)**: If you want to use Google as a sign-in provider for `better-auth`, fill these in.

---

## Authentication

The NestJS application uses **better-auth** for authentication, which is **enabled by default on all routes**. To disable it for specific routes or controllers, use the `@Public()` or `@Optional()` decorators.

---

## Authorization

The NestJS application uses the **CASL library** for authorization. Authorization is enabled for all routes. By default, if no specific authorization is applied at the controller or service layer, everything is accessible.

Routes can use the following decorators for authorization:

- **No decorator**: Only **authenticated users** can access the route. No authorization checks are performed beyond authentication.
- **`@Public()`**: The route is accessible to **public and authenticated users**, providing the same resources for both. While authorization checks are technically possible within public routes at the service layer, it is **strongly discouraged**. Consider using `@Optional()` instead.
- **`@Optional()`**: The route is accessible to **public and authenticated users**, allowing for **different resources** to be provided based on authentication status. Authorization checks are possible at the service layer.
