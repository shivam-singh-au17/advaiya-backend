# Advaiya Backend API Documentation

The Advaiya Backend API is a powerful backend solution designed for managing accounts with full CRUD capabilities. It features user authentication via Firebase using email and password, ensuring secure access. Role-based access control is implemented to manage permissions effectively.

## API Endpoints

### User Endpoints

- **POST /api/users/signup**: Create a new user account.
- **POST /api/users/login**: Authenticate a user and generate a JWT token.

### Account Endpoints

- **GET /api/accounts/:accountId**: Retrieve a specific account by ID. *[Requires role: "ADMIN", "USER"]*
- **GET /api/accounts**: Retrieve all accounts. *[Requires role: "ADMIN"]*
- **PUT /api/accounts/**: Update an existing account by ID. *[Requires role: "USER"]*
- **DELETE /api/accounts/:accountId**: Delete a account by ID. *[Requires role: "ADMIN"]*

## Schema

### User Schema

- **first_name**: String (required)
- **last_name**: String (required)
- **email**: String (required, unique, validated as email)
- **phone**: String (required)
- **password**: String (required)
- **birthday**: String (required)

## Postman Collection and Environment

To interact with the API using Postman, you can download & import the provided collection and environment file links.

- [Postman Collection File](https://github.com/shivam-singh-au17/advaiya-backend/blob/main/advaiya-backend.postman_collection.json)
- [Postman Environment File](https://github.com/shivam-singh-au17/advaiya-backend/blob/main/advaiya-backend.postman_environment.json)


## Error Logging and Email Notifications
- **Error Logging**: The API uses Winston for logging errors. Logs are stored and managed to facilitate troubleshooting and maintenance.
- **Email Notifications**: Whenever a new user registers, an email notification is sent using Nodemailer. This feature enhances user engagement and provides instant feedback.

## User Authentication

- **Registration**: Users can sign up with a unique email, and password. Passwords are securely hashed using bcrypt before storing in the database.
- **Login**: Users can log in with their email and password to receive a JWT token, which is required for accessing authenticated routes.

## Error Handling

- The API implements proper error handling for common scenarios such as invalid input and unauthorized access.
- Meaningful error messages are returned in the API responses to aid developers in debugging.

## Database Integration

- PostgreSQL is used for storing account data, integrated using Sequelize ORM, which provides a robust interface for interacting with the database.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine for server-side applications.
- **Express.js**: A minimalist web application framework for Node.js that simplifies building APIs and web applications.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and developer productivity.
- **JSON Web Tokens (JWT)**: A compact, URL-safe means of representing claims securely between two parties. Used for user authentication and authorization.
- **bcryptjs**: A library to hash passwords securely, ensuring sensitive user data remains protected even if the database is compromised.
- **Nodemailer**: A module for Node.js applications to send emails, facilitating communication features like user notifications and alerts.
- **PostgreSQL**: A powerful, open-source relational database system known for its reliability, robustness, and feature completeness.
- **Sequelize**: An ORM (Object-Relational Mapping) library for Node.js, which provides easy access to PostgreSQL databases by mapping database entries to objects and vice versa.

## GitHub Repository Link

The codebase for this API is available on GitHub.

**Repository URL**: [GitHub Repository](https://github.com/shivam-singh-au17/advaiya-backend)

You can clone the repository to your local machine to explore the codebase.

## How to Run the Project Locally

1. Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

2. Clone or download the repository to your local machine.
    ```bash
    git clone https://github.com/shivam-singh-au17/advaiya-backend
    ```

3. Open your terminal or command prompt and navigate to the directory where you have downloaded the files.

4. Run the following command to install dependencies:
    ```bash
    npm install
    ```

5. Once the dependencies are installed, run the following command to start the development server:
    ```bash
    npm run dev
    ```

5. Run the following command to start the production server:
    ```bash
    npm run build && npm start
    ```
    
6. Access the API at `http://localhost:7070`.


Feel free to explore the API and provide feedback or suggestions for improvement. Thank you for your attention!