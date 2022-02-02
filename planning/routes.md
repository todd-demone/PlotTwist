# Routes

[Note to draft: the following is subject to discussion between Nico and Todd and possibly a mentor.]

## Guidelines
* follow REST convention.
* create our routes from our resources.
* BREAD: browse, read, edit, add, delete
* CRUD: create, read, update, delete

## Routes
| Person  | Description of action | Route |
| ------------- | ------------- | ------------- |
| User | get all stories - can be filtered by keyword (search story titles) | GET /stories |
| User | get a single story (returns all contributions that have story_id === req.params.id) | GET /stories/:id |
| OP | mark a story completed | PATCH /stories/:id |
| OP  | submit a story  | POST /stories |
| OP | delete a story | DELETE /stories/:id |
||||
| User | get all contributions - filtered by keyword (search text of contributions) | GET /contributions|
| User, OP | (user) edit a contribution, (OP) accept a contribution | PATCH /contributions/:id |
| User | submit a contribution  | POST /contributions |
| User | delete a contribution | DELETE /contributions/:id |
||||
| User | vote for a contribution | POST /votes |
| User | delete a vote for a contribution | DELETE votes/:id |
||||
| User | view a user's profile | GET /users/:id |
||||
| User | login | GET /login/:id |

## Login
For login, use the following code:
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
