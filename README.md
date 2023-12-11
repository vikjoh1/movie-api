# Movie API

For this application to work you will need:
  - [OMDb api key](https://www.omdbapi.com/)
  - [MongoDB database URI](https://www.mongodb.com/atlas/database)
#

1. Create a ```.env``` file in root and add:
     - PORT
     - API_KEY
     - MONGODB_URI
     - JWT_SECRET
2. Start the app using ```npm run dev```

3. Try the different endpoints using ```curl``` or ```Postman```
     - For example: ```curl localhost:PORT/movies/search/killers of the flower moon```
     - You should get a JSON response with information about the movie

#
This is a work in progress application.