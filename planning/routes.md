# Routes

[Note to draft: the following is subject to discussion between Nico and Todd and possibly a mentor.]

## Guidelines
* follow REST convention.
* create our routes from our resources.
* BREAD: browse, read, edit, add, delete
* CRUD: create, read, update, delete

## Stories
| Person  | Description | HTTP request | 
| ----- | ----- | ----- |
| User | get all stories  | GET /api/stories |
| User | get story | GET /api/stories/:id |
|User | get user's stories | GET /api/stories/user/:user_id |
| OP  | post story  | POST /api/stories |
| OP | "delete" story (wipe text) | PUT /stories/:id/delete | 
| OP | edit story | PUT /api/stories/:id/edit |
| OP | mark story completed | PUT /api/stories/:id/completed |
## Contributions
| Person  | Description | HTTP request | 
| ----- | ----- | ----- |
| User | get all contributions for a story | GET /api/contributions/story/:story_id |
|User | get user's contributions | GET /api/contributions/user/:user_id |
| User | post contribution  | POST /api/contributions |
| User | delete contribution (wipe text) | PUT /api/contributions/:id/delete | 
| User | edit a contribution | PUT /api/contributions/:id |
| OP | accept a contribution | PUT /api/contributions/:id/markaccepted |

## Votes
| Person  | Description | HTTP request | 
| ----- | ----- | ----- |
| User | get the total number of votes for a contribution | GET /api/votes/contribution/:contribution_id |
| User | vote for contribution | POST /api/votes |
| User | delete a vote | PUT /api/votes/:id | sets `active` field to false |

## Login
| Person  | Description | HTTP request | 
| ----- | ----- | ----- |
| User | login to account | GET /login/:id |