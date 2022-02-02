# Routes

[Note to draft: the following is subject to discussion between Nico and Todd and possibly a mentor.]

## Guidelines
* follow REST convention.
* create our routes from our resources.
* BREAD: browse, read, edit, add, delete
* CRUD: create, read, update, delete

## Stories
| Person  | Description | HTTP request | Comments |
| ----- | ----- | ----- | ----- |
| User | get all stories  | GET /api/stories | Can be filtered by keywords in story title |
| User | get a story | GET /api/stories/:id | 
| OP  | post a story  | POST /api/stories |
| OP | delete a story | PUT /stories/:id/delete | Replaces value in `contributions.text` with string 'deleted', change `stories.is_complete` to `true`|
| OP | change story title | PUT /api/stories/:id/changetitle |
| OP | mark story complete | PUT /api/stories/:id/markcomplete |
## Contributions
| Person  | Description | HTTP request | Comments |
| ----- | ----- | ----- | ----- |
|User | get user's contributions | GET /api/contributions/user/:user_id | |
| User | post a contribution  | POST /api/contributions |
| User | delete a contribution | PUT /api/contributions/:id/delete | Replaces value in `text` field with string 'deleted'|
| User | edit a contribution | PUT /api/contributions/:id |
| OP | accept a contribution | PUT /api/contributions/:id/markaccepted | |

## Votes
| Person  | Description | HTTP request | Comments |
| ----- | ----- | ----- | ----- |
| User | get the total number of votes for a contribution | GET /api/votes/contribution/:contribution_id | |
| User | vote for contribution | POST /api/votes ||
| User | delete a vote | PUT /api/votes/:id | sets `active` field to false |

## Login
| Person  | Description | HTTP request | Comments |
| ----- | ----- | ----- | ----- |
| User | login to account | GET /login/:id | |