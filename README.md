# easy-business-contact

A simple way to keep your business contacts under control.

Built with **React Vite** for the frontend, **Python FastAPI** for the backend, and **MongoDB** for the database.

## Description

The app is the first prototype that supports all search and CRUD operations (Create, Read, Update, Delete) for contacts. Users can store contacts details and detailed notes from meetings and interactions. For example, users can record when a contact was made, what was discussed, and any agreed-upon next steps.

The primary use case for this application is to assist self-employed consultants or freelancers in managing their business contacts and networking conversations.

## Current Functionality

Currently, the application allows users to:

- Add new contacts.
- Save contacts to a MongoDB database.
- Search for contacts by name.
- Update contact information.
- Delete contacts.
- Add Notes, read created Notes, delete and edit.

## Steps to Run This Application

1.  **Clone the project:**

    ```bash
    git clone https://github.com/Xuyen21/easy-business-contact.git
    ```

2.  **Set up the Frontend:**

    To install the frontend, please use Node with a recent version. The author uses version 22.14.0.

    - Navigate to the frontend directory:
      ```bash
      cd frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Run the development server:
      ```bash
      npm run dev
      ```
      The frontend application will typically be accessible at `http://localhost:5173/`.

3.  **Configure Environment Variables:**

    - Create a copy of the `.env.template` file with name `.env`. You can use this command in the console:

      ```bash
      cp .env.template .env
      ```

    - Open the `.env` file and replace the placeholder values with your own credentials.

4.  **Start the Database:**

    - From the project's root directory, use Docker Compose to start the MongoDB database:
      ```bash
      docker-compose up -d
      ```

5.  **Set up the Backend:**

    - Navigate to the backend directory:
      ```Powershell
      cd backend
      ```
    - Enable virtual environment:
      ```Powershell
      python -m venv venv
      .\venv\Scripts\Activate.ps1
      ```
    - Install Python dependencies:
      ```Powershell
      pip install -r requirements.txt
      ```
    - Run the backend server using Uvicorn from project root:
      ```Powershell
      cd .. # make sure to be in the project root folder
      python -m uvicorn backend.main:app --reload
      ```
      The backend server will be running at `http://127.0.0.1:8000`.

6.  **Using the demo data:**

    - The Dump was created with Powershell using the following command:

      ```Powershell
      $Env:mongo_user = "your-mongo-user-from-env-file"
      $Env:mongo_password = "your-mongo-password-from-env-file"
      $uri = "mongodb://$($Env:mongo_user):$($Env:mongo_password)@localhost:27017/"
      docker-compose exec -i mongodb /usr/bin/mongodump --uri "$uri" --gzip --archive=/data/mongo.dump.gz
      docker-compose cp mongodb:/data/mongo.dump.gz ./mongo.dump.gz
      ```

    - You can restore the sample data with the following command:

      ```Powershell
      $Env:mongo_user = "your-mongo-user-from-env-file"
      $Env:mongo_password = "your-mongo-password-from-env-file"
      $uri = "mongodb://$($Env:mongo_user):$($Env:mongo_password)@localhost:27017/"
      docker-compose cp ./mongo.dump.gz mongodb:/data/mongo.dump.gz
      docker-compose exec -i mongodb /usr/bin/mongorestore --uri "$uri" --gzip --archive=/data/mongo.dump.gz
      ```

## REST API Endpoints Documentation

A complete documentation of each endpoint, including request parameters, request body schemas, and response body examples, is provided in the OpenAPI documentation at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) \*(Uvicorn server must be up and running). 

With the database connected and backend endpoints established and the FastAPI configured, the OpenAPI will be automatically generated, offering a user-friendly interface for exploring and testing its functionalities.

**Frontend Implementation Status for Tasks:**

The API endpoints for managing tasks are already defined and validated in the backend. The next step is to implement the user interface in the frontend to allow users to:

- **Create Tasks:** Provide UI elements for inputting task details (description, due date) and triggering the `POST /tasks/` endpoint. After creating, this schedule should be displayed in the calendar. (The calendar UI is already emplemented)
- **Delete Tasks:** Implement functionality (e.g., a "Delete" button) that calls the `DELETE /tasks/{task_id}` endpoint for a specific task.
- **Edit (Schedule) Tasks:** Create UI components to modify existing task details (description, due date) and interact with the `PUT /tasks/{task_id}` endpoint.
