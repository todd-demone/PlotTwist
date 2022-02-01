# Routes

## Guidelines
* follow REST convention.
* create our routes from our resources.
* BREAD: browse, read, edit, add, delete
* CRUD: create, read, update, delete

### Users
* Read - get a user's profile page, which will include a list of contributions)
  * `GET /users/:id`

### Contributions
* Read - get a contribution (NOTE: not sure when we will need to get an individual contribution)
  * `GET /contributions/:id`

* Edit - edit a contribution
  * `PATCH /contributions/:id`

* Add - add a contribution through the 'Contribute' button below a particular contribution on a story page 
  * `POST /contributions`

* Delete - delete a contribution
  * `DELETE  /contributions/:id`

### Votes
* Edit - change a vote's `active` field
  * Alternative - Delete - delete a vote

* Add - add a vote

### Stories
* Browse - get the landing page (which will have a list of recent/top stories) or search results page (which will have a filtered list of stories based on the search query)
  * `GET /stories`

* Read - get a story, which will include: 
  * a "parent" contribution, which has a `parent_id` of NULL; and 
  * all of the parent contribution's children (i.e., all contributions with a `parent_id` equal to the parent contribution's `id`)
  * `GET /stories/:id`

### Login
* For login, use the following code:
```javascript
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});
```