# Routes

* follow REST convention.
* create our routes from our resources.
* BREAD: browse, read, edit, add, delete
* CRUD: create, read, update, delete

## Users
R  GET     /users/:id

* For login, use the following code:

```javascript
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});
```

## Stories
B  GET     /stories
R  GET     /stories/:id
E  PATCH   /stories/:id
A  POST    /stories
D  DELETE  /stories/:id

## Contributions

## Votes