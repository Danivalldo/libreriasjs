# This project has a frontend, a backend and a test environtment. It also requires a connection to a Mongo database

To launch it correctly, you need to follow the next steps:

- Create a database with MongoDB. You can use Atlas and get the mongo db uri connection.
- Create and set the env files inside the root of the project and inside the backend folder:
  - In the root project create a .env.local file following the .env_local_example file.
  - Also in the root project create a .env.test file following the .env_test_example file.
  - In the backend folder create a .env.local file following the .env_local_example file.
  - In the backend folder create a .env.test file following the .env_test_example file.
- Install all the dependencies in the root folder with "npm install".  
- Install all the dependencies inside the backend folder with "npm install".
- After that navigate to the root folder and launch the frontend and the backend with the command "npm start".
- If you open a tab in a browser with the url http://localhost:(the port that you put in .env.local), you should see the project
- After that, open another terminal and navigate to the root folder.
- Then launch the following command "npm run test" to see the Cypress control interface
