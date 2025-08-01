# Testing Guide

This project uses **Mocha** as the testing framework with **Chai** for assertions and **Supertest** for API testing.

## Test Structure

```
test/
├── test-helper.js           # Database setup and teardown
├── controllers/             # Unit tests for controllers
│   └── notesController.test.js
├── routes/                  # API route tests
│   └── notesRouter.test.js
└── integration.test.js      # End-to-end integration tests
```

## Running Tests

### Install Dependencies
First, install the testing dependencies:
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Specific Test Files
```bash
# Run only controller tests
npx mocha test/controllers/*.test.js

# Run only route tests  
npx mocha test/routes/*.test.js

# Run only integration tests
npx mocha test/integration.test.js
```

## Test Types

### 1. Unit Tests (`test/controllers/`)
- Test individual controller functions in isolation
- Mock external dependencies
- Fast execution
- Focus on business logic

### 2. API Tests (`test/routes/`)
- Test HTTP endpoints
- Test request/response handling
- Test status codes and response format
- Use in-memory database

### 3. Integration Tests (`test/integration.test.js`)
- Test complete user workflows
- Test multiple components working together
- End-to-end scenarios

## Test Database

Tests use **MongoDB Memory Server** which:
- Creates an in-memory MongoDB instance
- Isolated from your development database
- Automatically cleaned up after tests
- Fast and reliable

## Writing New Tests

### Example Unit Test
```javascript
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('My Function', function() {
  it('should do something', function() {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).to.equal('expected');
  });
});
```

### Example API Test
```javascript
import request from 'supertest';
import app from '../app.js';

describe('GET /api/notes', function() {
  it('should return notes', async function() {
    const response = await request(app)
      .get('/api/notes')
      .expect(200);
      
    expect(response.body).to.be.an('array');
  });
});
```

## Test Coverage

To check test coverage, you can add nyc (Istanbul):
```bash
npm install --save-dev nyc
```

Then add to package.json:
```json
{
  "scripts": {
    "test:coverage": "nyc mocha --recursive --timeout 10000"
  }
}
```

## Best Practices

1. **Arrange, Act, Assert**: Structure your tests clearly
2. **Descriptive Names**: Use clear, descriptive test names
3. **Independent Tests**: Each test should be independent
4. **Clean Database**: Database is cleaned before each test
5. **Mock External Services**: Don't depend on external APIs
6. **Test Edge Cases**: Test both success and error scenarios

## Common Commands

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npx mocha test/routes/notesRouter.test.js

# Run tests matching pattern
npx mocha test/**/*controller* 

# Debug tests
npx mocha --inspect-brk test/integration.test.js
```
