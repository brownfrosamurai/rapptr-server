## Project Title

Rapptr Labs. Assessment Test

## Description

A resful API server for a TODO application.

The endpoints available include:

Register User, Login User, Create Todo, Update Todo, Delete Todo, Get All Todos, Get a Todo, Get User

## Development Environment
### Setup

Ensure you have the following softwares installed:

-   [Node](https://nodejs.org)
-   [Git](https://www.atlassian.com/git/tutorials/install-git)

Download code repo on your machine.

Rename [`.example.env` to `.env`] and fill in the required variables
## RUN
```
npm start
```
.

## Server Folder Structure

The root folder is the src and it is structured following an MVC architecture pattern.

Model: This folder contains the logic for accessing and manipulating the data. It defines the structure of the data.

Controller: This folder acts as an intermediary between the Model and View. It takes input from the user through the request body, and performs some data logic on it.

Routes: This folder contains the routing logic for the application, defining the mapping between URLs and the corresponding controllers that should be called.

Logging: This folder contains a Logging class and its methods for logging route information and responses appropriately.

Middleware: This folder contains a middleware function that validates the object properties for User and Todo.

Config: This folder contains configuration files and settings for the mongoDB and server port application.

## Approach

Backend Framework - Express.

Data Persistence - MongoDB
