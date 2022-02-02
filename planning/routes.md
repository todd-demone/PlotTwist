# Routes

[Note to draft: the following is subject to discussion between Nico and Todd and possibly a mentor.]

## Guidelines
* follow REST convention.
* create our routes from our resources.
* BREAD: browse, read, edit, add, delete
* CRUD: create, read, update, delete

## Routes
| Person  | Description | HTTP request | Comments |
| ----- | ----- | ----- | ----- |
| User | get all stories  | GET /stories | Can be filtered by keywords in story title |
| User | get a single story | GET /stories/:id | Gets 
| OP | change story title | PATCH /stories/:id |
| OP | mark story completed | PATCH /stories/:id |
| OP | remove a story | PATCH /stories/:id | Replaces contribution text with word 'deleted', change is_complete to true|
| OP  | submit a new story  | POST /stories |
||||
| User | get all contributions | GET /contributions | Can be filtered by keywords in text |
| User | edit a contribution | PATCH /contributions/:id |
| OP | accept a contribution | PATCH /contributions/:id |
| User | remove a contribution | PATCH /contributions/:id | Replaces contribution text with word 'deleted'|
| User | submit a contribution  | POST /contributions |
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