# Demo-credit

Demo-credit is a backend service for a lending platform, built with TypeScript, Express, Knex.js, and MySQL. It provides a robust API for managing user accounts, wallet balances, and transactions, showcasing a scalable and maintainable Node.js application.

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Entity-Relationship Diagram](#entity-relationship-diagram)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About the Project

Demo-credit powers a lending platform, enabling users to create accounts, manage wallet balances, and perform transactions such as funding, transferring, and withdrawing funds. The project leverages TypeScript for type safety, Express for API routing, Knex.js for database operations, and MySQL as the database, providing a solid foundation for financial applications.

### Why Demo-credit?
- **Modular Architecture**: Designed for scalability and maintainability.
- **Type Safety**: Uses TypeScript to minimize runtime errors.
- **Database Flexibility**: Knex.js enables SQL query building for MySQL and other databases.
- **Open Source**: Welcomes contributions to enhance functionality.

## Features
- User account creation and retrieval.
- Wallet management with balance tracking.
- Transaction support for funding, transfers, and withdrawals.
- Mock authentication via `x-user-id` header.
- Database schema management via Knex.js migrations.
- Environment-based configuration with `.env` support.

## Prerequisites
- **Node.js**: Version 18.x or higher
- **MySQL**: Version 8.0 or higher
- **npm**: Version 6.x or higher
- **TypeScript**: Version 4.x or higher
- **dotenvx**: For environment variable management
- A running MySQL database instance (local or remote)
- **Jest**: For running tests


## Installation

### Step 1: Clone the Repository
Clone the project from GitHub and navigate to the project directory.

```bash
git clone https://github.com/Jayjokeer/Demo-credit.git
cd Demo-credit
```

### Step 2: Install Dependencies
Install the required Node.js packages using npm.

```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the project root and add the following configuration for the MySQL database and environment.

```env
DATABASE_HOST=localhost
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=lendsqr_db
NODE_ENV=development
ADJUTOR_API_KEY=your_api_key
PORT= your_port
```

Replace `your_username` and `your_password` with your MySQL credentials.

### Step 4: Apply Database Migrations
Ensure your MySQL database is running, then apply the schema migrations to create the necessary tables (`users`, `wallets`, `transactions`).

```bash
npm run migrate
```

### Step 5: Build the Project
Compile the TypeScript code to JavaScript, outputting to the `dist` directory.

```bash
npm run build
```

### Step 6: Start the Application
Launch the server in production mode. The application will be available at `http://localhost:3000` (or your configured port).

```bash
npm start
```

## Usage

### Running the Application

#### Development Mode
Run the application with live reloading for development using `ts-node-dev`.

```bash
npm run dev
```

#### Production Mode
Run the compiled JavaScript code for production.

```bash
npm start
```
#### Running Tests
Run unit and integration tests to validate functionality using Jest.
```bash
npm run test
```

### Example API Calls
Below are examples of API requests using `curl`. All authenticated endpoints require the `x-user-id` header for mock authentication.

- **Create a User**:
  Create a new user with email and name.

  ```bash
  curl -X POST http://localhost:3000/user/create-user \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "John Doe", "password": "your_password"}'
  ```

- **Get User**:
  Retrieve the authenticated user’s details.

  ```bash
  curl -X GET http://localhost:3000/user \
  -H "x-user-id: 1"
  ```

- **Fund Wallet**:
  Add funds to the authenticated user’s wallet.

  ```bash
  curl -X POST http://localhost:3000/transaction/fund \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d '{"amount": 100}'
  ```

- **Transfer Funds**:
  Transfer funds between two wallets.

  ```bash
  curl -X POST http://localhost:3000/transaction/transfer \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d '{"sender_wallet_id": 1, "receiver_wallet_id": 2, "amount": 50}'
  ```

- **Withdraw Funds**:
  Withdraw funds from the authenticated user’s wallet.

  ```bash
  curl -X POST http://localhost:3000/transaction/withdraw \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d '{"amount": 50}'
  ```

- **Welcome Message**:
  Access the welcome endpoint.

  ```bash
  curl http://localhost:3000/user/home
  ```

**Note**: The `x-user-id` header simulates authentication via the `fakeAuth` middleware. For production, replace with a secure authentication system (e.g., JWT).

### Project Structure
The project is organized as follows:

```
├── src
│   ├── config
│   │   └── database.ts               # Knex configuration and initialization
│   ├── controllers
│   │   ├── transaction.controller.ts # Transaction-related API logic
│   │   └── user.controller.ts        # User-related API logic
│   ├── enums
│   │   └── transaction.enum.ts       # Transaction type and status enums
│   ├── errors
│   │   └── error-handler.ts          # Custom error handling
│   ├── interfaces
│   │   └── user.interface.ts         # TypeScript interfaces for User
│   ├── middlewares
│   │   ├── auth.middleware.ts        # Mock authentication middleware
│   │   └── validate-request.middleware.ts # Request validation middleware
│   ├── migrations                    # Knex migration files
│   ├── models
│   │   └── users.model.ts            # User model with database operations
│   ├── validators
│   │   ├── transaction.validator.ts  # Transaction validation schemas
│   │   └── user.validator.ts         # User validation schemas
│   └── index.ts                     # Application entry point
├── .env                             # Environment variables
├── knexfile.js                      # Knex configuration for environments
├── package.json
└── README.md
```

## Entity-Relationship Diagram

The Entity-Relationship (ER) Diagram illustrates the database schema, created using [DB Designer](https://app.dbdesigner.net), a web-based tool for designing MySQL schemas.

### ER Diagram
[[<img width="998" height="324" alt="image" src="https://github.com/user-attachments/assets/ecbed141-6e68-41ae-9b5c-02d4307fd81c" />](https://res.cloudinary.com/dyhekxbxi/image/upload/v1753263221/demo-credit_1_wxsz6k.png)](https://res.cloudinary.com/dyhekxbxi/image/upload/v1753263221/demo-credit_1_wxsz6k.png)

**Entities and Fields**:
- **Users Table**:
  - `id`: Integer, Primary Key, Auto-increment
  - `email`: Varchar(255), Unique, Not Null
  - `name`: Varchar(255), Not Null
  - `created_at`: Timestamp, Not Null, Default CURRENT_TIMESTAMP
  - `updated_at`: Timestamp, Not Null, Default CURRENT_TIMESTAMP
  - **Description**: Stores user account information.

- **Wallets Table**:
  - `id`: Integer, Primary Key, Auto-increment
  - `user_id`: Integer, Foreign Key (references `users(id)`), Not Null, On Delete CASCADE
  - `balance`: Decimal(14,2), Not Null, Default 0.00
  - `created_at`: Timestamp, Not Null, Default CURRENT_TIMESTAMP
  - `updated_at`: Timestamp, Not Null, Default CURRENT_TIMESTAMP
  - **Description**: Manages user wallet balances.

- **Transactions Table**:
  - `id`: Integer, Primary Key, Auto-increment
  - `sender_wallet_id`: Integer, Foreign Key (references `wallets(id)`), Nullable, On Delete SET NULL
  - `receiver_wallet_id`: Integer, Foreign Key (references `wallets(id)`), Nullable, On Delete SET NULL
  - `type`: Enum('FUND', 'TRANSFER', 'WITHDRAW'), Not Null
  - `amount`: Decimal(14,2), Not Null
  - `status`: Enum('SUCCESS', 'PENDING', 'FAILED'), Not Null, Default 'SUCCESS'
  - `created_at`: Timestamp, Not Null, Default CURRENT_TIMESTAMP
  - `updated_at`: Timestamp, Not Null, Default CURRENT_TIMESTAMP
  - **Description**: Tracks wallet transactions (funding, transfers, withdrawals).

**Relationships**:
- **One-to-One**: Each `user` has one `wallet` (`wallets.user_id` → `users.id`).
- **One-to-Many**: A `wallet` can be involved in multiple `transactions` as `sender_wallet_id` or `receiver_wallet_id`.



## API Reference

The API supports user and transaction management with the following endpoints:

- **POST /user/create-user**:
  - **Description**: Creates a new user.
  - **Body**: `{ "email": string, "name": string }`
  - **Validation**: `createUserSchema`
  - **Example**:
    ```bash
    curl -X POST http://localhost:3000/user/create-user \
    -H "Content-Type: application/json" \
    -d '{"email": "user@example.com", "name": "John Doe", "password": "your_password"}'
    ```

- **GET /user**:
  - **Description**: Retrieves the authenticated user by ID.
  - **Headers**: `x-user-id: <user_id>`
  - **Example**:
    ```bash
    curl -X GET http://localhost:3000/user \
    -H "x-user-id: 1"
    ```

- **POST /transaction/fund**:
  - **Description**: Funds a user’s wallet.
  - **Headers**: `x-user-id: <user_id>`
  - **Body**: `{ "amount": number }`
  - **Validation**: `fundWalletSchema`
  - **Example**:
    ```bash
    curl -X POST http://localhost:3000/transaction/fund \
    -H "Content-Type: application/json" \
    -H "x-user-id: 1" \
    -d '{"amount": 100}'
    ```

- **POST /transaction/transfer**:
  - **Description**: Transfers funds between wallets.
  - **Headers**: `x-user-id: <user_id>`
  - **Body**: `{ "sender_wallet_id": number, "receiver_wallet_id": number, "amount": number }`
  - **Validation**: `transferFundsSchema`
  - **Example**:
    ```bash
    curl -X POST http://localhost:3000/transaction/transfer \
    -H "Content-Type: application/json" \
    -H "x-user-id: 1" \
    -d '{"sender_wallet_id": 1, "receiver_wallet_id": 2, "amount": 50}'
    ```

- **POST /transaction/withdraw**:
  - **Description**: Withdraws funds from a user’s wallet.
  - **Headers**: `x-user-id: <user_id>`
  - **Body**: `{ "amount": number }`
  - **Validation**: `withdrawFromWalletSchema`
  - **Example**:
    ```bash
    curl -X POST http://localhost:3000/transaction/withdraw \
    -H "Content-Type: application/json" \
    -H "x-user-id: 1" \
    -d '{"amount": 50}'
    ```

- **GET /user/home**:
  - **Description**: Returns a welcome message.
  - **Example**:
    ```bash
    curl http://localhost:3000/user/home
    ```

**Authentication**: Endpoints requiring authentication use the `fakeAuth` middleware, which expects an `x-user-id` header with the user’s ID. Replace with a production-ready authentication system (e.g., JWT) for real-world use.

## Postman

[Postman Link](https://www.postman.com/technical-operator-65307819/workspace/projects/request/27781003-43f96b42-176d-4427-9fe7-32bfcbc2f78c?action=share&creator=27781003&ctx=documentation)


## Contributing

Contributions are welcome! To contribute to Demo-credit:

1. **Fork the Repository**:
   Click the "Fork" button on GitHub.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Demo-credit.git
   ```

3. **Create a Feature Branch**:
   ```bash
   git checkout -b feat/YOUR_FEATURE_NAME
   ```

4. **Commit Changes**:
   ```bash
   git commit -m "Add YOUR_FEATURE_NAME"
   ```

5. **Push to Your Fork**:
   ```bash
   git push origin feat/YOUR_FEATURE_NAME
   ```

6. **Create a Pull Request**:
   Submit a pull request to the original repository, including:
   - A detailed description of changes.
   - Screenshots or GIFs for UI-related changes.
   - Tests (if applicable).


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Knex.js](https://knexjs.org/) for SQL query building.
- [Express](https://expressjs.com/) for the web framework.
- [TypeScript](https://www.typescriptlang.org/) for type safety.
- [MySQL](https://www.mysql.com/) for the database.
- [DB Designer](https://app.dbdesigner.net) for ER diagram creation.
- Open-source community for inspiration and support.
```

