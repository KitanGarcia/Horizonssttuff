#### This is a simple web application using Twilio and MongoDB to send text messages to numbers from the computer. It uses Node.js, Express.js, Handlebars.js, Passport.js, and body-parser, among other middleware.

# Instructions
* Git clone the repository and ```cd``` into it
* In the terminal, run ```npm install```
* Create an env.sh file. Inside, include your MongoDB URI, Twilio account SID, Twilio Auth Token, and Twilio Phone number defining the variables ```MONGODB_URI```, ```TWILIO_SID```, ```TWILIO_AUTH_TOKEN```, and ```MY_TWILIO_NUMBER```. It should look like this: ```export MONGODB_URI="---insert MongoDB URI here---"```  
```export TWILIO_SID="---insert Twilio SID here---"```
```export TWILIO_AUTH_TOKEN="---insert Twilio auth token here---"```
```export MY_TWILIO_NUMBER="---insert Twilio phone number---"```
* In the terminal, run ```source env.sh```
* Run ```npm start```
* Once it has started, in the browser, go to http://localhost:3000/signup and create a user. Once submitted, the user will be persisted on a mongodb database.
* Next, navigate to http://localhost:3000/login. Login in with the credentials you just signed up with.
* After adding a contact, you will have the ability to send that contact a text message, view all messages sent to the contact, and edit the contact.
