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