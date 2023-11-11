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
- Then launch the command "npm run test" to see the Cypress control interface

# Este proyecto tiene un frontend, un backend y un entorno de prueba. También requiere una conexión a una base de datos Mongo.

Para ejecutarlo correctamente, debe seguir los siguientes pasos:

- Crear una base de datos con MongoDB. Puede utilizar Atlas y obtener la uri de conexión para mongo db.
- Cree y configure los archivos .env dentro de la raíz del proyecto y dentro de la carpeta backend:
  - En el proyecto raíz, cree un archivo .env.local siguiendo el archivo .env_local_example.
  - También en el proyecto raíz cree un archivo .env.test siguiendo el archivo .env_test_example.
  - En la carpeta backend, cree un archivo .env.local siguiendo el archivo .env_local_example.
  - En la carpeta backend, cree un archivo .env.test siguiendo el archivo .env_test_example.
- Instale todas las dependencias en la carpeta raíz con "npm install".
- Instale todas las dependencias dentro de la carpeta backend con "npm install".
- Después de eso, navegue a la carpeta raíz e inicie el frontend y el backend con el comando "npm start".
- Si abres una pestaña en un navegador con la URL http://localhost: (el puerto que pusiste en .env.local), deberías ver el proyecto.
- Después de eso, abre otra terminal y navega hasta la carpeta raíz.
- Luego ejecute el comando "npm run test" para ver la interfaz de control de Cypress