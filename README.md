This boilerplate is an extension of the project [express-typescript](https://github.com/GeekyAnts/express-typescript) adapted for postgresql (without ORM), passport and with TDD implementation. The services provided by this application are:

- Login User: '/auth/login'
- Register User: '/auth/register'
- Verify User Session: '/auth/getsession'

# Run Application with Docker

In this session is explained how to up and down the containers of this application.

```bash
# In the root folder execute:

docker-compose up

# to delete the containers execute:

docker-compose down

```

# Run Application Local without Docker

Below mentioned are the steps to run the application locally.

```bash
#To the server application, in the root folder, execute:

npm run start

```

# Run Test

Below mentioned are the steps to execute the test for the project.

```bash
# In the root folder execute
npm run test 

# or 

npm run test-watch 

```