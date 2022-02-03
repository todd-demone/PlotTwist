# Routes

[Note to draft: the following is subject to discussion between Nico and Todd and possibly a mentor.]

## Guidelines
* follow REST convention.
* create our routes from our resources.
* BREAD: browse, read, edit, add, delete
* CRUD: create, read, update, delete

## Contributions
| Description | HTTP request | Comments
| ----- | ----- | ----- |
| get top-level contributions  | GET /api/contributions/alltoplevel | for home page|
| get top-level contrib plus accepted contribs for a single story  | GET /api/contributions/story/:story_id/accepted | the merged portion of a story
| get unaccepted contribs for a single story  | GET /api/contributions/story/:story_id/unaccepted | the non-merged portion of a story
| post contribution  | POST /api/contributions |
| accept a contribution | PUT /api/contributions/:id/markaccepted |
| edit a contribution | PUT /api/contributions/:id |
| delete contribution (wipe text) | PUT /api/contributions/:id/delete | 
| get user's contributions | GET /api/contributions/user/:user_id |
<!-- | User | get all contributions for a story | GET /api/contributions/story/:story_id | -->

## Stories
| Description | HTTP request | Comments |
| ----- | ----- | ----- |
| post a story  | POST /api/contributions/toplevel | on frontend, after this call, grab the returned story.story_id and use it to call POST /api/contributions (to add it to contribs table) 
| mark story completed | PUT /api/stories/:id/completed |
| get total contributions to a story| GET /api/stories/:id/totalcontributions|

## Votes
| Person  | Description | HTTP request | Comments |
| ----- | ----- | ----- | ----- |
| User | get the total number of votes for a contribution | GET /api/votes/contribution/:contribution_id |
| User | vote for contribution | POST /api/votes |
| User | delete a vote | PUT /api/votes/:id | sets `active` field to false |

## Login
| Person  | Description | HTTP request | 
| ----- | ----- | ----- |
| User | login to account | GET /login/:id |