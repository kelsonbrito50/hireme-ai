# Testing Guide

## Overview

This project uses Jest for unit and integration testing.

## Setup

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/__tests__/utils.test.ts
```

## Test Structure

```
src/
└── __tests__/
    ├── analyze.test.ts      # AI analysis functions
    ├── utils.test.ts        # Utility functions
    └── components.test.tsx  # Component tests
```

## Writing Tests

Follow the AAA pattern:
1. **Arrange** — Set up test data
2. **Act** — Call the function/component
3. **Assert** — Verify the result

```typescript
describe('myFunction', () => {
  it('should return expected value', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

## Code Coverage

We aim for >80% coverage on utility functions and API handlers.
