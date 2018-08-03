### Deploy your production application to heroku

```
$ heroku login
$ heroku create -a name-of-your-app

# each time you need to deploy

$ npm run build
$ git add build
$ git commit -m "release"
$ git push heroku master
$ heroku open
```

NOTE: You can also add npm run build to heroku prebuild npm script
