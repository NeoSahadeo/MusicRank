# Overview

This is the API for Supabase interactions, such as read/write/delete/put/update/patch

The user must be authenticated before querying the endpoints otherwise it
will return an empty array.


## Rankings

`GET api/supabase/rankings`

Returns the rankings from the rankings table


**Query Params:**

- page: int

`POST`

POST requests are used to create, update, and delete
items from the rankings table. These will use [Astro Actions](https://docs.astro.build/en/guides/actions/)
so you should import the actions and use its'
methods.

If you would like to view an example please see [commit 0755046](https://github.com/NeoSahadeo/MusicRank/blob/0755046/src/components/custom/PostRank.svelte)

```typescript
// Create
// Requires, a songId(text), rating(number), and review(text)
// Will return a duplication error if the songId collides

actions.rankactions.postRank(formData);

// Update
// Requires, a songId(text), rating(number), and review(text)
// Will return a missing error if no songId exists
actions.rankactions.updateRank(formData);

// Delete
// Requires, a songId(text)
actions.rankactions.deleteRank(formData);
```
