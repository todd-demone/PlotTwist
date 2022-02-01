# Wireframes list

[Note to draft: the following is subject to discussion with Nico]

1. Landing page (does double duty as search results page)
    * for landing page - list of 10/20/30 most recent stories (or order by most popular?)
    * for search results page - filtered list of stories based on the search query)
    * NOTE: do we create a separate landing page for viewers who either don't have an account or aren't logged in?

2. Story page
    * This page includes:
      * a "parent" contribution, which has a `parent_id` of NULL; and 
      * all of the parent contribution's children (i.e., all contributions with a `parent_id` equal to the parent contribution's `id`)

3. User profile page
    * This is a list of the user's stories and contributions

4. Create new story (form)
    * This is a form that appears on its own page

5. Search page (form)
    * NOTE: we can remove this page and simply have a search field built in to the navbar, which would make the site even more SPA-like.