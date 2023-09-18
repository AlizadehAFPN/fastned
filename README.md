# Car Charging App

This React Native mobile application provides information about different cars, their details, and simulates the charging process of a car's battery.

# Features

Three Screens: The app consists of three main screens:

Car List: Displays a list of cars fetched from an API.

Car Detail: Shows detailed information about a selected car. Car details are handled via Redux, eliminating the need to pass data between screens.

Car Charging: Simulates the charging process of a car's battery. While this screen doesn't rely on backend data, it can be easily integrated with backend data storage in the future.

Data Management: Data, including the list of cars and car details, is fetched from the API and efficiently managed using Redux, ensuring a seamless and responsive user experience.

Charge Simulation: The Car Charging screen uses a timer system to simulate the charging process. Future updates can integrate this screen with backend data for more accurate charging simulations.

Charge Percentage Calculation: The app calculates the charge percentage based on the current step and the total number of steps in the charging process. The formula for calculating the percentage is implemented, but it can be further refined based on specific requirements.

Unit Tests: Unit tests are written for various components to ensure code quality and reliability.

# Usage

Clone the repository to your local machine.
Navigate to the project directory and run yarn to install dependencies.
Use yarn android or yarn ios to launch the app in your development environment.

# Tests

Unit tests for components are available to verify the functionality and behavior of various parts of the application. Unfortunately, integration tests with tools like Masterno have not been configured yet.

# Future Enhancements

While the app provides core functionality, here are some potential areas for improvement:

Integration Testing: Set up integration tests to ensure the smooth interaction of different parts of the app.

Backend Integration: Connect the app to a backend API to fetch and manage car data.
Enhanced Charge Simulation: Implement a more sophisticated charging simulation based on real-world data.

User Authentication: Add user authentication and profiles to personalize the experience.

UI/UX Improvements: Enhance the app's visual design and user interface for a more polished look.

Error Handling: Implement robust error handling and error messages to improve user feedback.

Feel free to contribute and make this app even better!

This README provides an overview of your React Native project, its features, and potential future enhancements. I can customize it further to include specific installation and usage instructions, code examples, and any other relevant information for your assesment.