# Getting Started with Base-Project-Python-React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Project description

This project serves as a foundational base for web applications, providing essential features such as email verification, OAuth2 authentication, a basic front end built with React, and a sample connection to a database. Whether you're starting a new project or looking to integrate these fundamental functionalities into an existing one, this base project can significantly accelerate your development process.


## Features

Here are some of the features of Base-Project-Python-React but not limited to:

* #### OAuth2 Authentication - Integrates OAuth2 authentication for seamless user authentication through popular social media platforms. Users can sign in using their existing accounts on supported OAuth2 providers.

* #### JSON Web Tokens (JWT) - Utilizes JWT for secure and stateless user authentication. JWT tokens are issued upon successful authentication and used to authorize access to protected resources.

* #### Create Users - Allows the creation of new user profiles with required details. After successful registration, Users will receive verification email. To verify the account, Users should go to their email and follow the instructions.

* #### Retrieve all verified users - Retrieves a list of all users stored in the database. Currently, there is no admin restrictions who can access this information. It depends of the project future logic.

* #### Delete User - Enables the removal of user profiles from the system. In fact, it is implemented via soft deletion - there is a flag in the database that flags user as deleted but it is not removed from database. This will prevent any information lost of security breach. User flagged as deleted in database will no longer shown in any searches and the account will be blocked. 

* #### Upload User Image - Users can upload and associate a photo or logo with their profiles. Currently, there is no restrictions on picture size but this can be easily implemented depending of the project.

* #### Retrieve User Image - Retrieves the photo or logo associated with a specific user.


## Installation

1. Clone the repository to your local machine

2. Create virtual environment and install the dependencies for the project (requirements.txt)

3. Configure environment variables for email, OAuth2, JWT, and database settings

4. Set up preferred database connection

5. Start the application server

6. Start the React Front End 