# Getting Started with Base-Project-Python-React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Project Overview

This project serves as a foundational base for web applications, providing essential features such as email verification, OAuth2 authentication, a basic front end built with React, and a sample connection to a database. Whether you're starting a new project or looking to integrate these fundamental functionalities into an existing one, this base project can significantly accelerate your development process.


## Interactive API documentation

<img width="1428" alt="Screenshot 2024-01-18 at 20 59 18" src="https://github.com/tihomir-a51/Base-Project-Pyhont-React/assets/138571393/f4a55fe7-7259-434c-8804-858c94ad4bfb">


## Features

Here are some of the features of Base-Project-Python-React but not limited to:

* #### OAuth2 Authentication - Integrates OAuth2 authentication for seamless user authentication through popular social media platforms. Users can sign in using their existing accounts on supported OAuth2 providers.

  <img width="1417" alt="Screenshot 2024-01-18 at 21 13 55" src="https://github.com/tihomir-a51/Base-Project-Pyhont-React/assets/138571393/6923cb0a-cc48-4d23-aada-1bc37af7d25c">

* #### JSON Web Tokens (JWT) - Utilizes JWT for secure and stateless user authentication. JWT tokens are issued upon successful authentication and used to authorize access to protected resources.

* #### Create Users - Allows the creation of new user profiles with required details. After successful registration, Users will receive verification email. To verify the account, Users should go to their email and follow the instructions. Usega sample

  <img width="1434" alt="Screenshot 2024-01-18 at 21 04 47" src="https://github.com/tihomir-a51/Base-Project-Pyhont-React/assets/138571393/ba3dc0e5-8a46-468c-98e7-ace1857f886a">

* #### Retrieve all verified users - Retrieves a list of all users stored in the database. Currently, there is no admin restrictions who can access this information. It depends of the project future logic. Usage sample
  
<img width="1426" alt="Screenshot 2024-01-18 at 21 05 42" src="https://github.com/tihomir-a51/Base-Project-Pyhont-React/assets/138571393/646285bd-65da-4312-b4a2-41221bda5835">

* #### Delete User - Enables the removal of user profiles from the system. In fact, it is implemented via soft deletion - there is a flag in the database that flags user as deleted but it is not removed from database. This will prevent any information lost of security breach. User flagged as deleted in database will no longer shown in any searches and the account will be blocked. Usage sample:

  <img width="1417" alt="Screenshot 2024-01-18 at 21 06 11" src="https://github.com/tihomir-a51/Base-Project-Pyhont-React/assets/138571393/160de18b-cfd3-4980-a5c8-806455709878">

* #### Upload User Image - Users can upload and associate a photo or logo with their profiles. Currently, there is no restrictions on picture size but this can be easily implemented depending of the project. Usage sample:

<img width="1417" alt="Screenshot 2024-01-18 at 21 07 15" src="https://github.com/tihomir-a51/Base-Project-Pyhont-React/assets/138571393/81f3eb62-d0d8-416b-8cb5-fbcf34a6c3cc">

* #### Retrieve User Image - Retrieves the photo or logo associated with a specific user. Usage Sample
  
<img width="1417" alt="Screenshot 2024-01-18 at 21 07 31" src="https://github.com/tihomir-a51/Base-Project-Pyhont-React/assets/138571393/e3a1f244-7a21-4d22-b1c9-2dac105c093b">


## Database

As this is a Base Project, currently there is only one table in the relational database. Keep in mind that picture / logo of the user should be kept in database as BLOB (if you are using MariaDB) but this may vary depending on the database (PostgreSQL, SQLLite, MySQL etc.)

<img width="259" alt="Screenshot 2024-01-18 at 20 52 46" src="https://github.com/tihomir-a51/Base-Project-Pyhont-React/assets/138571393/b9a9e19b-c16d-41bb-8524-3d6f13a1ddac">


## Installation

1. Clone the repository to your local machine

    git clone https://github.com/tihomir-a51/Base-Project-Pyhont-React.git

2. Create virtual environment and install the dependencies for the project (requirements.txt)

    * Create virtual environment:

    ```bash
    python -m venv venv
    ```
    * Activate virtual environment for Windows:

    ```bash
    .\venv\Scripts\activate 
    ```
    * Activate virtual environment for MacOS / Linux:

    ```bash
    source venv/bin/activate
    ```
    * Installing dependencies:

    ```bash
    pip install -r requirements.txt
    ```
    * Display all dependencies:

    ```bash
    pip list
    ```
 
 
3. Configure environment variables for email, OAuth2, JWT, and database settings

<img width="863" alt="Screenshot 2024-01-18 at 21 25 54" src="https://github.com/tihomir-a51/Base-Project-Python-React/assets/138571393/7bf83b8f-9044-4482-9f83-2815e2ef4ebf">
    
4. Set up preferred database connection

    The link to the proffered database should be written in .env_example file (see above). In config.py file is established "dummy" connection for security reason, all the information will be provided from dotenv.env file and retrieved via SettingsConfigDict class from pydantic_settings

5. Start the application server

    Simply run the file run_server.py

6. Start the React Front End - keep in mind that this part of the Base-Project-Python-React is still under construction 

    npm start BaseProject_PythonReact


## Usage Examples 

<img width="1434" alt="Screenshot 2024-01-18 at 21 04 47" src="https://github.com/tihomir-a51/Base-Project-Pyhont-React/assets/138571393/ba3dc0e5-8a46-468c-98e7-ace1857f886a">


## Backend testing

Testing framework is pytest. Soon as the whole backend logic is implemented, the test will be provided with usage instructions 


## COntributing

Contributions are welcome! 


## License

This project is licensed under the MIT License.
