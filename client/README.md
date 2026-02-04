# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


The Main Branch - Backend API

Base URL: http://localhost:3000 (Local)
Auth Token: fake-jwt-token (Required for Admin actions)

🟢 Public Routes (No Login Required)

1. Get All Articles

Fetch list of articles. Use query params to filter.

URL: GET /articles

Query Params:

?type=Event (Filter by Event/Project/Highlight)

?search=react (Search title)

Example: http://localhost:3000/articles?type=Event

2. Get Single Article

URL: GET /articles/:id

Example: http://localhost:3000/articles/5

3. Get Members

URL: GET /members

🔴 Admin Routes (Login Required)

Header Required: Authorization: fake-jwt-token

1. Admin Login

URL: POST /login

Body: { "email": "...", "password": "..." }

2. Create Article

URL: POST /articles

Body:

{
  "title": "New Event",
  "type": "Event",
  "author": "Admin",
  "content": "Description here...",
  "image_url": "http://...",
  "tags": ["Tag1", "Tag2"]
}


3. Update Article

URL: PUT /articles/:id

Body: Same as Create Article.

4. Delete Article

URL: DELETE /articles/:id


