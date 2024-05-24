# 🌟 Frontend Documentation

## 🚀 Project Setup

1. **Install Dependencies:**
2. ```bash
   yarn install

   ```

3.
4. **Run the Development Server:**

5. ```bash
   yarn dev

   ```

6.

## 📂 Project Structure

- `src/`
  - `components/`: Reusable UI components
  - `hooks/`: Custom React hooks
  - `pages/`: Page components
  - `services/`: API service classes
  - `types/`: TypeScript type definitions
  - `utils/`: Utility functions

## 📜 Available Scripts

- `yarn dev`: Runs the app in development mode.
- `yarn build`: Builds the app for production.

## 📚 Code Documentation

### 📝 JSDoc

Add JSDoc comments to your functions and classes for better understanding. Example:

```typescript
/
Fetch user data by userId
@param {number} userId - The ID of the user
@returns {Promise<Object>} The user data
/
public async getUserData(userId: number): Promise<Object> {
// function implementation
}
```

## 📖 Project Overview

You are working as a developer at SportSee, a startup dedicated to sports coaching. The company is launching a new version of the user profile page, which will allow users to track the number of sessions completed and calories burned.

### 🏃‍♂️ Project Goals

- Develop the user profile page using React.
- Integrate advanced graphical elements such as charts and diagrams to present sports analytics data.
- Use libraries like Recharts or D3 for data visualization.
- Manage HTTP calls using Fetch or Axios, and create a separate service for these calls.
- Standardize and format API data before use.
- Focus on desktop integration, ensuring readability on screens of at least 1024 by 780 pixels.
- Document the project using a README, JSDoc, and PropTypes.

### 📈 Learning Outcomes

- Develop a sports coaching analytics dashboard.
- Integrate complex data visualizations using React.
- Handle API interactions and data formatting.
- Create comprehensive documentation to facilitate team collaboration.

### 🎓 OpenClassrooms Project

This project is part of an OpenClassrooms training program.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.
