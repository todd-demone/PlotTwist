# Routes

* follow REST convention.
* create our routes from our resources.
* BREAD: browse, read, edit, add, delete
* CRUD: create, read, update, delete

## Users
R ->      GET     /users/:id

* For login, use the following code:

```javascript
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});
```

## Stories
* B ->    GET     /stories
* R ->    GET     /stories/:id
* E ->    PATCH   /stories/:id
* A ->    POST    /stories
* D ->    DELETE  /stories/:id

## Contributions
* B ->    GET     /contributions --SAME AS STORIES?
* R ->    GET     /contributions/:id --SAME AS STORIES?
* A ->    POST    /contributions
* D ->    DELETE  /contributions/:id

## Votes
* R ->    GET     /votes/:id
* A ->    POST    /votes
* D ->    DELETE  /votes/:id
