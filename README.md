SILOAM REST API with ExpressJS, Typescript

This repository provide restapi to provide product list and authantication (registerUser, createSession, refreshSession ) .

Technology Stack : Nodejs, Express JS, Typescript, PostgreSQL , JWT Auth.

Development Environment : Nodemon, Eslint & Prettier, PreCommit Husky , LoggerPino.

Caching : Node cache in productlist 

Coverage : Product Controller

Locally setup guideline : 
::First Step 
1. Initati with clone github repository 
2. Database initalize : `CREATE DATABASE siloam;`
3. Make sure double check in .env and config.json file , use correct credential
4. Run Migation and seeding database with :
`npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`
Make sure your sequelize-cli and sequelize packages are installed, and your configuration files (e.g., .sequelizerc or config/config.js) are properly set up.
5. Run npm install `npm install`
6. Check package json for available script . 


