# easy-business-contact

A simple way to keep your business contacts under control

## Description

The app is the first prototype that supports all basic CRUD operations (Create, Read, Update, Delete) for contacts. Users can store contacts details and detailed notes from meetings and interactions. For example, users can record when a contact was made, what was discussed, and any agreed-upon next steps.

The primary use case for this application is to assist self-employed consultants or freelancers in managing their business contacts and networking conversations.

## Current Functionality

Currently, the application allows users to:

- Add new contacts.
- Save contacts to a MongoDB database.
- Search for contacts by name.
- Update contact information.
- Delete contacts.
- Add Notes and read created Notes

## Steps to Run This Application

1.  **Clone the project:**

    ```bash
    git clone git@github.com:Xuyen21/easy-business-contact.git
    ```

2.  **Set up the Frontend:**

    To install the frontend, please use node version 22

    - Navigate to the frontend directory:
      ```bash
      cd contact-management-nosql/frontend
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

    - Create a copy of the `.env.template` file named `.env`:
      ```bash
      cp .env.template .env
      ```
    - Open the `.env` file and replace the placeholder values with your actual credentials (e.g., database connection details, API keys).

4.  **Start the Database:**

    - From the project's root directory, use Docker Compose to start the MongoDB database:
      ```bash
      docker-compose up -d
      ```

5.  **Set up the Backend:**

    - Navigate to the backend directory:
      ```Powershell
      cd contact-management-nosql/backend
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
      python -m uvicorn backend.main:app --reload
      ```
      The backend server will be running at `http://127.0.0.1:8000`.

6.  **Using the demo data:**

    - The Dump was created with Powershell using the following command:

      ```Powershell
      $Env:mongo_user = "your-mongo-user-from-env-file"
      $Env:mongo_password = "your-mongo-password-from-env-file"
      $uri = "mongodb://$($Env:mongo_user):$($Env:mongo_password)@localhost:27017/"
      docker-compose exec -i mongodb /usr/bin/mongodump --uri "$uri" --gzip --archive > ./mongodb.dump.gz
      ```

    - You can restore the sample data with the following command:

      ```Powershell
      $Env:mongo_user = "your-mongo-user-from-env-file"
      $Env:mongo_password = "your-mongo-password-from-env-file"
      $uri = "mongodb://$($Env:mongo_user):$($Env:mongo_password)@localhost:27017/"
      docker-compose cp ./mongodb.dump.gz mongodb:/data/mongodb.dump.gz
      docker-compose exec -i mongodb /usr/bin/mongorestore --uri "$uri" --gzip --archive /data/mongodb.dump.gz
      ```

## REST API Documentation

Once the Uvicorn server is running, you can find the complete API documentation at:
[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Next Steps

The backend currently provides full CRUD (Create, Read, Update, Delete) API endpoints for the following entities, with data validation:

- **Person:** ID, Name, Email Address, LinkedIn Contact, Phone Number, Company, Role
- **Notes:** ID, Date, Content
- **Task:** ID, Date, Description, Due Date

The next development phase will focus on implementing the frontend functionalities to enable user interaction with the Notes and Task entities. Additionally, a calendar feature will be implemented to display scheduled meetings and maybe contact birthdays.
