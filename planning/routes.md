# Routes

[Note to draft: the following is subject to discussion with Nico and a mentor]

## Guidelines
* follow REST convention.
* create our routes from our resources.
* BREAD: browse, read, edit, add, delete
* CRUD: create, read, update, delete

## Routes
| Person  | Description of action | Route |
| ------------- | ------------- | ------------- |
| User | get all stories (can be filtered by keyword in title) | `GET /stories` |
| User | get a single story | `GET /stories/:id` |
| OP | mark a story completed | `PATCH /stories/:id` |
| OP  | submit a story  | `POST /stories` |
| OP | delete a story | `DELETE /stories/:id` |
||||
| User | get all contributions (can be filtered by keyword in text) | `GET /contributions/`|
| User, OP | (user) edits a contribution, (OP) accepts a contribution | `PATCH /contributions/:id` |
| User | submit a contribution  | `POST /contributions` |
| User | delete a contribution | `DELETE /contributions/:id` |
||||
| User | vote for a contribution | `POST /votes` |
| User | change my vote for a contribution | `PATCH votes/:id` |
||||
| User | view a user's profile | `GET /users/:id` |
||||
| User | login | `GET /login/:id` |

## Login
For login, use the following code:
```javascript
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});
```