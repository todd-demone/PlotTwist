# Routes

## Twists
| Description | HTTP request | 
| ----- | ----- |
| get accepted twists for a single story  | GET /api/twists/story/:story_id/accepted |
| get unaccepted twists for a single story  | GET /api/twists/story/:story_id/unaccepted |
| get author's twists | GET /api/twists/author/:author_id |
| post twist  | POST /api/twists |
| accept a twist | PUT /api/twists/:id/accept |
| delete twist (wipe text) | PUT /api/twists/:id/delete | 
<!-- | edit a twist | PUT /api/twists/:id | -->

## Stories
| Description | HTTP request |
| ----- | ----- |
| get all stories | GET /api/stories |
| get a story | GET /api/stories/:id |
| get author's stories | GET /api/stories/author/:author_id |
| post a story  | POST /api/twists/toplevel |
| mark story completed | PUT /api/stories/:id/completed |
| delete a story | PUT /api/stories/:id/delete |
| edit a story| PUT /api/stories/:id |

## Votes
| Description | HTTP request |
| ----- | ----- |
| vote for twist | POST /api/votes/ |
| delete a vote | DELETE /api/votes/:id |

## Login
| Description | HTTP request | 
| ----- | ----- |
| login to account | GET /login/:id |