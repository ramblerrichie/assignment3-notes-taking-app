# 📝 Notes Taking App - API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
This API uses session-based authentication. You need to login first to access protected routes.

---

## 🔐 Authentication Endpoints

### Login
**POST** `/login`
- **Description**: Authenticate user and create session
- **Content-Type**: `application/x-www-form-urlencoded`
- **Body**:
  ```
  email=user@example.com
  password=userpassword
  ```
- **Success Response**: Redirects to `/` (302)
- **Error Response**: Redirects to `/login` (302)

### Register
**POST** `/register`
- **Description**: Create new user account
- **Content-Type**: `application/x-www-form-urlencoded`
- **Body**:
  ```
  username=johndoe
  email=john@example.com
  password=securepassword
  ```
- **Success Response**: Redirects to `/login` (302)
- **Error Response**: Redirects to `/register` (302)

### Logout
**DELETE** `/logout?_method=DELETE`
- **Description**: Logout user and destroy session
- **Success Response**: Redirects to `/login` (302)

---

## 📋 Notes API Endpoints

### Get All Notes
**GET** `/api`
- **Description**: Retrieve all notes
- **Authentication**: Required (session-based)
- **Success Response (200)**:
  ```json
  [
    {
      "_id": "507f1f77bcf86cd799439011",
      "id": "1640995200000",
      "title": "My First Note",
      "content": "This is the content of my note",
      "createdAt": "2023-12-31T12:00:00.000Z",
      "updatedAt": "2023-12-31T12:00:00.000Z"
    }
  ]
  ```
- **Error Response (500)**:
  ```json
  {
    "message": "Error fetching notes"
  }
  ```

### Create New Note
**POST** `/api`
- **Description**: Create a new note
- **Authentication**: Required (session-based)
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "title": "My New Note",
    "content": "This is the content of my new note"
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439011",
    "id": "1640995200000",
    "title": "My New Note",
    "content": "This is the content of my new note",
    "createdAt": "2023-12-31T12:00:00.000Z",
    "updatedAt": "2023-12-31T12:00:00.000Z"
  }
  ```
- **Error Response (500)**:
  ```json
  {
    "message": "Error creating note"
  }
  ```

### Update Note
**PUT** `/api/:id`
- **Description**: Update an existing note
- **Authentication**: Required (session-based)
- **URL Parameters**: `id` - The note ID
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "title": "Updated Note Title",
    "content": "Updated note content"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439011",
    "id": "1640995200000",
    "title": "Updated Note Title",
    "content": "Updated note content",
    "createdAt": "2023-12-31T12:00:00.000Z",
    "updatedAt": "2023-12-31T13:00:00.000Z"
  }
  ```
- **Error Response (404)**:
  ```json
  {
    "message": "Note not found"
  }
  ```
- **Error Response (500)**:
  ```json
  {
    "message": "Error updating note"
  }
  ```

### Delete Note
**DELETE** `/api/:id`
- **Description**: Delete a note
- **Authentication**: Required (session-based)
- **URL Parameters**: `id` - The note ID
- **Success Response (204)**: No content
- **Error Response (404)**:
  ```json
  {
    "message": "Note not found"
  }
  ```
- **Error Response (500)**:
  ```json
  {
    "message": "Error deleting note"
  }
  ```

---

## 🔧 Postman Setup Instructions

### 1. Import Collection
1. Open Postman
2. Click "Import" button
3. Choose "Raw text" and paste the collection JSON below
4. Or save the collection JSON to a file and import it

### 2. Set Up Environment
Create a new environment in Postman with these variables:
- `baseUrl`: `http://localhost:3000`
- `sessionCookie`: (will be set automatically after login)

### 3. Authentication Flow
1. **First**: Call the Register endpoint to create a user
2. **Then**: Call the Login endpoint to authenticate
3. **Postman will automatically**: Handle session cookies for subsequent requests
4. **Now you can**: Test all the Notes API endpoints

### 4. Testing Notes API
After authentication, you can test:
- GET `/api` - View all notes
- POST `/api` - Create a new note
- PUT `/api/{noteId}` - Update a specific note
- DELETE `/api/{noteId}` - Delete a specific note

---

## 📊 Sample Data

### Sample Note Creation
```json
{
  "title": "Shopping List",
  "content": "1. Milk\n2. Bread\n3. Eggs\n4. Butter"
}
```

### Sample Note Update
```json
{
  "title": "Updated Shopping List",
  "content": "1. Milk\n2. Bread\n3. Eggs\n4. Butter\n5. Cheese"
}
```

---

## 🐛 Common Issues & Solutions

### 1. 401 Unauthorized
- **Problem**: Not authenticated
- **Solution**: Login first using POST `/login`

### 2. 404 Note Not Found
- **Problem**: Invalid note ID
- **Solution**: Use GET `/api` to see available note IDs

### 3. 500 Server Error
- **Problem**: Server or database issue
- **Solution**: Check server logs and MongoDB connection

---

## 📝 Notes

- All dates are in ISO 8601 format
- The `id` field is a custom timestamp-based ID
- The `_id` field is MongoDB's ObjectId
- Session cookies are used for authentication
- Content-Type for notes API should be `application/json`
- Content-Type for auth should be `application/x-www-form-urlencoded`

---

## 🔄 Postman Collection JSON

Save this as a `.json` file and import into Postman:

```json
{
  "info": {
    "name": "Notes Taking App API",
    "description": "API for Notes Taking App with MongoDB and Authentication",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/x-www-form-urlencoded"
              }
            ],
            "body": {
              "mode": "urlencoded",
              "urlencoded": [
                {
                  "key": "username",
                  "value": "testuser"
                },
                {
                  "key": "email",
                  "value": "test@example.com"
                },
                {
                  "key": "password",
                  "value": "password123"
                }
              ]
            },
            "url": {
              "raw": "{{baseUrl}}/register",
              "host": ["{{baseUrl}}"],
              "path": ["register"]
            }
          }
        },
        {
          "name": "Login User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/x-www-form-urlencoded"
              }
            ],
            "body": {
              "mode": "urlencoded",
              "urlencoded": [
                {
                  "key": "email",
                  "value": "test@example.com"
                },
                {
                  "key": "password",
                  "value": "password123"
                }
              ]
            },
            "url": {
              "raw": "{{baseUrl}}/login",
              "host": ["{{baseUrl}}"],
              "path": ["login"]
            }
          }
        },
        {
          "name": "Logout User",
          "request": {
            "method": "DELETE",
            "url": {
              "raw": "{{baseUrl}}/logout?_method=DELETE",
              "host": ["{{baseUrl}}"],
              "path": ["logout"],
              "query": [
                {
                  "key": "_method",
                  "value": "DELETE"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Notes API",
      "item": [
        {
          "name": "Get All Notes",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api",
              "host": ["{{baseUrl}}"],
              "path": ["api"]
            }
          }
        },
        {
          "name": "Create Note",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Sample Note\",\n  \"content\": \"This is a sample note created via Postman\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api",
              "host": ["{{baseUrl}}"],
              "path": ["api"]
            }
          }
        },
        {
          "name": "Update Note",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Note\",\n  \"content\": \"This note has been updated via Postman\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/:noteId",
              "host": ["{{baseUrl}}"],
              "path": ["api", ":noteId"],
              "variable": [
                {
                  "key": "noteId",
                  "value": "1640995200000"
                }
              ]
            }
          }
        },
        {
          "name": "Delete Note",
          "request": {
            "method": "DELETE",
            "url": {
              "raw": "{{baseUrl}}/api/:noteId",
              "host": ["{{baseUrl}}"],
              "path": ["api", ":noteId"],
              "variable": [
                {
                  "key": "noteId",
                  "value": "1640995200000"
                }
              ]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ]
}
```

This collection includes all endpoints with proper authentication flow and sample data! 🚀
