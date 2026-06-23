# Live Demo : https://recipe-finder-with-suhail.netlify.app

# Recipe Finder Web Application

## Overview

The Recipe Finder Web Application is a responsive and interactive web-based application developed using HTML, CSS, and JavaScript. The application enables users to search for recipes, filter recipes according to dietary preferences and meal categories, view detailed recipe information, and access related cooking videos. The system integrates external APIs to provide dynamic content and employs a local JSON dataset as a fallback mechanism to ensure uninterrupted functionality.

---

## Objectives

* To develop a user-friendly recipe search application.
* To implement real-time data retrieval using external APIs.
* To provide filtering mechanisms based on dietary preferences and meal categories.
* To integrate multimedia content for enhancing user experience.
* To ensure system reliability through local data fallback techniques.

---

## Key Features

* Recipe search functionality
* Vegetarian and non-vegetarian filtering
* Meal type categorization
* Dynamic recipe card generation
* Recipe detail visualization
* YouTube video integration
* API fallback using local JSON data
* Responsive user interface design

---

## Technologies Used

| Technology       | Purpose                             |
| ---------------- | ----------------------------------- |
| HTML5            | Structure of the application        |
| CSS3             | User interface styling              |
| JavaScript (ES6) | Application logic and interactivity |
| Fetch API        | Data retrieval from APIs            |
| JSON             | Local data storage                  |
| YouTube Data API | Video integration                   |
| DummyJSON API    | Recipe data source                  |

---

## Project Structure

```text
recipe-finder/
│
├── images/
├── about.html
├── about.css
├── index.html
├── recipe-detail.html
├── script.js
├── detail.js
├── style.css
└── data1.json
```

---

## System Functionality

### Recipe Search

The application allows users to search recipes by entering keywords in the search field. The system retrieves matching recipes from the external API.

### Dietary Filtering

Users can filter recipes based on dietary preferences such as vegetarian and non-vegetarian categories.

### Meal Type Filtering

Recipes can be filtered according to meal categories including breakfast, lunch, dinner, and snacks.

### Recipe Information

Each recipe card displays important information including:

* Recipe name
* Difficulty level
* Calories per serving
* Cooking time
* User rating

### Video Integration

The application utilizes the YouTube Data API to retrieve relevant cooking videos associated with the selected recipe.

### Fallback Mechanism

In situations where the external API is unavailable, the application automatically loads recipe data from a local JSON file to maintain uninterrupted service.

---

## Working Procedure

1. The user enters a recipe name.
2. The application sends a request to the recipe API.
3. Retrieved data is processed and filtered.
4. Matching recipes are displayed dynamically.
5. Users can access recipe videos.
6. Detailed information is displayed on the recipe detail page.
7. Local data is used if the API request fails.

---

## Advantages

* Simple and intuitive user interface
* Dynamic content loading
* Efficient filtering mechanism
* Responsive design
* Reliable fallback system
* Enhanced user experience through video integration

---

## Future Enhancements

* User authentication system
* Favorite recipe management
* Dark mode implementation
* Recipe rating and review system
* Database integration
* Personalized recommendations
* Pagination support

---

## Conclusion

The Recipe Finder Web Application demonstrates the practical implementation of modern web development concepts including API integration, asynchronous programming, dynamic content rendering, and responsive user interface design. The project provides an effective platform for users to discover recipes based on their preferences while maintaining reliability through local data support.

---

Developer: Mohammad Suhail
Technology Stack:* HTML, CSS, JavaScript, REST API
Project Type: Frontend Web Application
