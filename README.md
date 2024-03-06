# Netflix Clone

## Overview
This project is a Netflix clone built using React, Tailwind CSS, and Firebase. It aims to replicate some of the core features of the popular streaming platform, including user authentication and a basic frontend interface.

## Features
- **User Authentication:** Users can sign up, log in, and log out using Firebase Authentication.
- **Frontend Interface:** Basic frontend interface with a hero section and movie rows.
- **Responsive Design:** Designed to be responsive and work well on various screen sizes.
- **Dynamic Content:** Movie data is fetched from the TMDB API to display popular movies.

## Technologies Used
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Firebase:** Backend-as-a-Service platform for authentication and data storage.
- **TMDB API:** API for fetching movie data.

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/netflix-clone.git
   ```

2. **Install dependencies:**
   ```bash
   cd netflix-clone
   npm install
   ```

3. **Create a Firebase project and set up Firebase Authentication.**

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```

6. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Contributing
Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or create a pull request.

