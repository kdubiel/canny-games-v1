# Tic Tac Toe

## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm)
- [PNPM](https://pnpm.io/)

## Setup

### 1. Set NodeJS version

```bash
nvm install
nvm use
```

### 2. Install Dependencies

#### Root directory

```bash
pnpm install
```

### 3. Initialize MongoDB replica sets and .env file

```bash
pnpm initialize
```

### 4. Build the app

#### Root directory

```bash
pnpm build
```

### 5. Start the app

#### Root directory

```bash
pnpm start:docker:prod
```

### 6. Access the Application

Visit [http://localhost:3000](http://localhost:3000) to access the React frontend and [http://localhost:4000/api](http://localhost:4000/api) to access the NestJS API Docs.

## Testing

```bash
pnpm test:unit
```

## Additional Notes

- Make sure that Docker is running on your machine to support any additional services or dependencies specified in the project.
- Always use the specified Node.js version for consistency. You can switch to the required version using NVM:

  ```bash
  nvm use
  ```
