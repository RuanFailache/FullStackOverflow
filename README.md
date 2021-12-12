# Full Stack Overflow
API to post and answer questions.

<br/>

There some scripts to use while using the api, like:
- ```npm run start``` use the API with the database in heroku;
- ```npm run dev``` use the API with the local database;
- ```npm run test``` test with jest if the unit test are working.

## Routes

- ```POST /questions``` send your question with this body format:
  ```
  {
    "question": string,
    "student": string,
    "grade": "T" + number,
    "tags": string
  }
  ```
- ```GET /questions/:id``` see a specific question by id
  
- ```POST /question/:id``` answer a specific question by id, to do that send a body in this format (to send a question is necessary create an user account and get the token to use as authorization header)
  ```
  {
    "answer": string 
  }
  ```
  
- ```GET /questions/``` list all not answered questions
  
- ```POST /users``` create an user account
  ```
  {
    "name": string,
    "grade": "T" + number
  }
  ```
