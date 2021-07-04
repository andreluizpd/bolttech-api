# bolttech-api
This is an API for creating projects and tasks it uses Node, Express and Typescript amongst other tools

## Requirements for the API
- One user may have several projects [OK]
- One user can access his projects only [OK]
- Each project may include multiple tasks [OK]
- Each task must have a description, creation date and finish date [OK]
- The user needs to have a simple option to mark the tasks as completed when accessing the task list [OK]
- Each task should have its termination date visible as a tooltip, if available, and some visual way of identifying
its status [OK]
- A task that was defined as finished should not be edited nor removed [OK]
- The application should be written in Javascript. [OK]
- The application backend should be written in Node.js or GoLang. [OK]
- The authentication and registration layers should be coded and not based on pre-existing modules (such as
Passport). [OK]

## Installation
To install you may run the following commands after cloning:
```
yarn install
cp config/default.example.ts config/default.ts
```

You are going to need a instance of a mongoDB server to set in the config file (config/default.ts) and a private key, you can use ssh-keygen or a online tool, I recommend [this one](https://travistidwell.com/jsencrypt/demo/)

## Routes And Usage
You can use the api with the Postman [Collection](https://raw.githubusercontent.com/andreluizpd/bolttech-api/main/ProjectsAPI.json)

