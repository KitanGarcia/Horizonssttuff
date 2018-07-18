# Pair Programming Exercises: Steal This App

## Part 1: Hack

1. Go to [http://steal-this-app-horizons.herokuapp.com/](http://steal-this-app-horizons.herokuapp.com/)
1. Follow the instructions to exploit security bugs and make your way through the insecure app.

## Part 2: Fix

Now that we've learned how to break in, let's fix these security bugs.

Make sure you are in your `horizons` folder by running:

```bash
pwd
```

Clone this repository and create your own branch:

```bash
git clone git@github.com:horizons-school-of-technology/steal-this-app.git
cd steal-this-app
git checkout -b YOUR GIT USERNAME
```

Now we have our own version of [steal-this-app](http://steal-this-app-horizons.herokuapp.com/) that will run on a local server. Make sure to use localhost:3000 to test any changes you make!

### Stage 1: Client-side login

Right now we're using client-side validation, which let us easily bypass the login. Let's replace it with a server-side validation, so we always check the password on our endpoint, not just on the browser.

1. Create a `POST /` endpoint to check that the password is equal to `gingerbread`. If it is, redirect to `/stage2`, and if not, redirect back to `/stage1`.
1. Make the form on `stage1.hbs` `POST` (method) to `/` (action) so we can use our new endpoint.
1. Don't forget to delete the client-side jQuery validation at the bottom of the page.

### Stage 2: Insecure cookies

Look in the `POST` `/stage2` endpoint. When we log in as Bob, we're setting a cookie with the key `user` and the value `bob`.  In the `GET` `/stage2` endpoint, we check the cookie (which would be equal to `bob`) and set the user to the value of the `user` cookie. 

By changing the cookie, we can log in as someone else, and our cookies right now are too easy to guess. We can guess the admin cookie based off Bob's cookie. Let's use the Express library [`cookie-session`](https://www.npmjs.com/package/cookie-session) to create cookies that cannot be guessed. 

Use npm to install and save `cookie-session`, and add it to your app as a middleware function. Check the documentation to see how to implement it!

Now you can use `req.session` to store secure cookies. It works just like `req.cookie`.

Hints:
<details>
  <summary>Setting up cookie-session middleware</summary>
  <pre>var cookieSession = require('cookie session');
app.use(cookieSession({
  name: 'session',
  keys: ['this can be any string you want it to be', 'check the docs for more details on keys']
}))</pre>
</details>

<details>
  <summary>Setting cookies</summary>
    <pre>req.session.cookieName = 'cookie value';</pre>
</details>

<details>
  <summary>Getting the value of the set cookies</summary>
  <pre>var cookieVal = req.session.cookieName;</pre>
</details>
<br>

Now our user cookies aren't `bob` or `admin`, they're complicated strings. You won't be able to guess them to log in as the admin anymore!

### Stage 3: MongoDB injection

We were able to use MongoDB query selectors to trick our endpoint into giving up the secret. Let's fix this.

Ensure that in our `POST` endpoint for stage3, the `req.body.secret` we check is a string (and not an object or array).
If not, set the status to `400` and respond with an error message instead of looking it up in the database. This will keep anyone from messing with our MongoDB request and returning anything we don't want them to see.

Test this by trying to get it to return the secret by putting in the same object we used in the earlier exercises. If it throws an error, you succeeded!

## Done!

Congrats! You're done with Exercise 1, now go to [Exercise 2](exercise2.md).
