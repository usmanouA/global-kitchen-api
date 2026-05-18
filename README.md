# The Global Kitchen API

A professional Node.js RESTful API for managing global recipes with MongoDB, built with a 3-tier architecture following best practices for scalability and maintainability.

## Features

- ✅ **CRUD Operations** — Create, read, update, and delete recipes
- ✅ **Category Filtering** — Filter recipes by category (Breakfast, Lunch, Dinner, Dessert, Snack, Beverage)
- ✅ **Data Validation** — Required fields, trimming, enum values, and minimum values
- ✅ **Timestamps** — Automatic `createdAt` and `updatedAt` tracking
- ✅ **Database Indexing** — Optimized queries with category indexing
- ✅ **Async/Await** — Modern JavaScript with proper error handling
- ✅ **Global Error Handling** — Consistent error responses with proper HTTP status codes
- ✅ **404 Handling** — Proper responses for undefined routes

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (local or remote)
- **ODM**: Mongoose
- **Environment**: dotenv

## Project Structure

```
global-kitchen/
├── config/
│   └── db.js              # MongoDB connection helper
├── controllers/
│   └── recipe.controller.js # Request handlers
├── models/
│   └── recipe.model.js    # Mongoose schema definition
├── routes/
│   └── recipe.routes.js   # API endpoints
├── services/
│   └── recipe.service.js  # Business logic layer
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── app.js                # Express application entry point
└── package.json          # Project dependencies
```

### Architecture

- **Routes** — Define API endpoints and HTTP methods
- **Controllers** — Handle requests, delegate to services, format responses
- **Services** — Contain business logic and data operations
- **Models** — Define schemas and data validation

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or access to MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/usmanouA/global-kitchen-api.git
   cd global-kitchen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/globalKitchenDB
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:5000`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/globalKitchenDB` |

## API Endpoints

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Get All Recipes
```http
GET /recipes
```

**Query Parameters:**
- `category` (optional) — Filter by category

**Example:**
```http
GET /recipes?category=Breakfast
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Pancakes",
      "category": "Breakfast",
      "ingredients": ["flour", "eggs", "milk"],
      "prepTime": 30,
      "instructions": "Mix ingredients and cook on griddle",
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    }
  ]
}
```

#### 2. Get Recipe by ID
```http
GET /recipes/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Pancakes",
    "category": "Breakfast",
    "ingredients": ["flour", "eggs", "milk"],
    "prepTime": 30,
    "instructions": "Mix ingredients and cook on griddle",
    "createdAt": "2026-05-18T10:00:00.000Z",
    "updatedAt": "2026-05-18T10:00:00.000Z"
  }
}
```

#### 3. Create Recipe
```http
POST /recipes
```

**Request Body:**
```json
{
  "name": "Spaghetti Carbonara",
  "category": "Lunch",
  "ingredients": ["pasta", "eggs", "bacon", "parmesan"],
  "prepTime": 25,
  "instructions": "Cook pasta, fry bacon, mix with eggs and cheese"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Spaghetti Carbonara",
    "category": "Lunch",
    "ingredients": ["pasta", "eggs", "bacon", "parmesan"],
    "prepTime": 25,
    "instructions": "Cook pasta, fry bacon, mix with eggs and cheese",
    "createdAt": "2026-05-18T10:30:00.000Z",
    "updatedAt": "2026-05-18T10:30:00.000Z"
  }
}
```

#### 4. Update Recipe
```http
PATCH /recipes/:id
```

**Request Body (partial update):**
```json
{
  "prepTime": 20,
  "instructions": "Updated instructions"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Spaghetti Carbonara",
    "category": "Lunch",
    "ingredients": ["pasta", "eggs", "bacon", "parmesan"],
    "prepTime": 20,
    "instructions": "Updated instructions",
    "createdAt": "2026-05-18T10:30:00.000Z",
    "updatedAt": "2026-05-18T11:00:00.000Z"
  }
}
```

#### 5. Delete Recipe
```http
DELETE /recipes/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Recipe deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Spaghetti Carbonara"
  }
}
```

## Recipe Schema

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `name` | String | Yes | Trimmed |
| `category` | String | Yes | Enum: Breakfast, Lunch, Dinner, Dessert, Snack, Beverage |
| `ingredients` | Array | Yes | Non-empty array of strings |
| `prepTime` | Number | Yes | Minimum 1 minute |
| `instructions` | String | Yes | Trimmed |
| `createdAt` | Date | Auto | Created automatically |
| `updatedAt` | Date | Auto | Updated automatically |

## Error Handling

All errors follow a consistent response format:

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

### Common Error Responses

**400 - Validation Error:**
```json
{
  "success": false,
  "error": "Validation failed",
  "statusCode": 400,
  "details": ["Recipe name is required", "Category is required"]
}
```

**404 - Not Found:**
```json
{
  "success": false,
  "error": "Recipe not found",
  "statusCode": 404
}
```

**500 - Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal Server Error",
  "statusCode": 500
}
```

## MongoDB Setup with MongoDB Compass

1. Ensure MongoDB is running locally
2. Open MongoDB Compass
3. Connect to: `mongodb://localhost:27017`
4. Create database: `globalKitchenDB`
5. Create collection: `recipes`
6. The app will use this database automatically

## Testing the API

### Using cURL

```bash
# Get all recipes
curl http://localhost:5000/recipes

# Get recipes by category
curl "http://localhost:5000/recipes?category=Breakfast"

# Create a recipe
curl -X POST http://localhost:5000/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Scrambled Eggs",
    "category": "Breakfast",
    "ingredients": ["eggs", "butter", "salt"],
    "prepTime": 10,
    "instructions": "Beat eggs and cook in butter"
  }'

# Update a recipe
curl -X PATCH http://localhost:5000/recipes/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"prepTime": 15}'

# Delete a recipe
curl -X DELETE http://localhost:5000/recipes/507f1f77bcf86cd799439011
```

## Development Notes

- All endpoints use async/await for clean, readable code
- Validation happens at the Mongoose schema level
- Errors are caught at the controller level and passed to global middleware
- Database queries are optimized with indexing on frequently filtered fields
- Environment variables are securely managed via `.env`

## License

This project is created for educational purposes as part of a school continuous assessment.

## Author

Usman

---

**Project Start Date:** May 18, 2026
