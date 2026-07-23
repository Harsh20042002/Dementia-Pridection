# Dementia Prediction Web Application

## Project Overview

The Dementia Prediction Web Application is designed to assist users in the early detection and classification of dementia through the analysis of X-ray reports. This fully secured web application allows users to register and log in using their email and password. Once logged in, users can upload, update, and delete their X-ray reports. The application utilizes a Convolutional Neural Network (CNN) model to classify the X-ray images into different types of dementia.

## Features

- **User Authentication**: Secure user registration and login functionality using email and password.
- **X-ray Report Management**: Users can upload, update, and delete their X-ray reports.
- **Dementia Classification**: The application classifies X-ray reports into different types of dementia using a CNN model.

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - ReactJS

- **Backend**:
  - NodeJS
  - ExpressJS
  - Flask

- **Machine Learning**:
  - Convolutional Neural Network (CNN)
  - TensorFlow
  - Pandas

- **Database**:
  - MongoDB

## Installation and Setup

1. **Clone the repository**:
   ```sh
   git clone [https://github.com//dementia-prediction-app.git](https://github.com/Harsh20042002/Dementia-Pridection.git
   cd dementia-prediction-app
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```sh
     cd backend
     ```
   - Install the necessary packages:
     ```sh
     npm install
     ```
   - Start the backend server:
     ```sh
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```sh
     cd frontend
     ```
   - Install the necessary packages:
     ```sh
     npm install
     ```
   - Start the frontend server:
     ```sh
     npm start
     ```

4. **Machine Learning Model Setup**:
   - Ensure you have Python installed.
   - Navigate to the model directory:
     ```sh
     cd model
     ```
   - Install the necessary packages:
     ```sh
     pip install -r requirements.txt
     ```
   - Run the Flask server:
     ```sh
     flask run
     ```

## Usage

1. **Register and Login**: Users can register using their email and password. Once registered, they can log in to access their account.
2. **Upload X-ray Report**: Users can upload their X-ray reports for analysis.
3. **Update and Delete Reports**: Users have the option to update or delete their X-ray reports as needed.
4. **Dementia Classification**: The uploaded X-ray report is analyzed by the CNN model, and the application provides the classification result.

## Contributors

- [Harshvardhan Faldu](https://github.com/Harsh20042002) - Initial work


## Acknowledgments

- Thanks to all the developers and contributors who made this project possible.
- Special thanks to the open-source community for providing valuable resources and tools.

---

Feel free to contribute to this project by opening issues, submitting pull requests, or providing feedback. Together, we can improve early detection and classification of dementia through technology.
