# contact-list-manager

This is a full stack challenge and should be completed in < 4 hours. We are testing your understanding of both frontend and backend code. Screenshots have been attached below. The application should be a single page application. You should build and consume your own API. 

You should implement the following views of a contact list manager:

- Create Contact 
- Edit Contact
- List Contacts
- Delete Contact

We prioritize functionality over styling for this assignment but welcome those that want to showcase more of their frontend chops. 

## Important note for Horizonites on approaching this problem

Complete 1 feature "vertically" before moving to the next. This means getting the frontend and backend built for a single feature (ex. Create Contact) before moving on to the next feature. 

Do not built you entire API layer and then frontend or vice versa. 

## Instructions

```
$ npx create-react-app myproject
$ cd myproject
$ npm install express body-parser --save
$ npm install --save-dev nodemon
```

Create a file server.js

```javascript
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json())

app.get('/ping', function (req, res) {
 return res.send('pong');
});

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
```

Add to package.json `"proxy": "http://localhost:1337"` and edit `"start": "react-scripts start",` to 

```
"start": "node server.js",
"server": "nodemon server.js",
"react": "react-scripts start",
"dev": "npm run server | react-scripts start",
```

i.e.

```json
{
  "name": "myproject",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:1337",
  "dependencies": {
    "body-parser": "^1.18.3",
    "express": "^4.16.3",
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-scripts": "1.1.4"
  },
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "react": "react-scripts start",
    "dev": "react-scripts start | npm run server",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "nodemon": "^1.17.5"
  }
}
```

NOTE: please make sure you have disabled `Disable cache` is checked in your DevTool Network tab

### Start your development environment
```
$ npm run dev
```

or

```
$ npm run react
$ npm run server
```

# Using fetch to send data from the browser to the server

We can use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) to make ajax calls

```javascript
fetch('/contact/create', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name,
    phone,
    birthday
  })
}).then((res)=> {
  if(res.status === 200) {
    // worked
  } else {
    // error
  }
}).catch((err) => {
  // network error
})
```

```javascript
fetch('/contact/'+id, {
  method: 'GET',
  credentials: 'same-origin'
}).then(res => res.json())
.then(json => console.log(json))
.catch((err) => {
  console.log(err)
})
```


## Mocks

![alt text](https://github.com/horizons-school-of-technology/contact-list-manager/raw/master/screenshots/create-contact.png)
![alt text](https://github.com/horizons-school-of-technology/contact-list-manager/raw/master/screenshots/list-contacts.png)
![alt text](https://github.com/horizons-school-of-technology/contact-list-manager/raw/master/screenshots/edit-contact.png)
![alt text](https://github.com/horizons-school-of-technology/contact-list-manager/raw/master/screenshots/list-contacts-edit.png)
