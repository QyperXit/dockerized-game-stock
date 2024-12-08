# Game Store Frontend

This repository is primarily dedicated to testing Docker containers with a Game Store application's frontend built using React, TypeScript, and Vite. The application offers a simple user interface for adding and removing items, ensuring seamless updates and interactions. Features

- Modern React application using Hooks and Functional components
- TypeScript for enhanced code quality and maintainability
- Vite for fast development experience and build process
- ESLint configured for React and TypeScript

## Prerequisites

- [Node.js](https://nodejs.org/) (for local development)
- [npm](https://www.npmjs.com/) (or yarn)
- [Docker](https://www.docker.com/) (for containerized deployment)

## Getting Started

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/gamestore-frontend.git
   cd gamestore-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   This will start the application in development mode with hot module reloading enabled.

### Docker Deployment

For deploying the application using Docker, follow the steps below:

1. **Build the Docker image:**

   Ensure Docker is running, then build the image with the following command:

   ```bash
   docker build -t gamestore-frontend .
   ```

2. **Run the Docker container:**

   Use the following command to run the Docker container:

   ```bash
   docker run -p 3000:3000 gamestore-frontend
   ```

   The application will be accessible at [http://localhost:3000](http://localhost:3000).

## ESLint Configuration

For production applications, it is recommended to expand the default ESLint configuration to enable type-aware lint rules.

1. **Update `parserOptions`:**

   ```js
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   })
   ```

2. **Adjust ESLint packages:**

   Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.

3. **Install and configure `eslint-plugin-react`:**

   ```js
   // eslint.config.js
   import react from 'eslint-plugin-react'

   export default tseslint.config({
     settings: { react: { version: '18.3' } },
     plugins: {
       react,
     },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   })
   ```

For more details on advanced usage and configurations, please refer to the official documentation for React, Vite, and TypeScript.

## License

This project is licensed under the MIT License.