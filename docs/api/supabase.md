# Overview

This is the API for Supabase interactions, such as read/write/delete/put/update/patch

The user must be authenticated before querying the endpoints otherwise the
will return an empty array.


## Rankings

`GET api/supabase/rankings`

Returns the rankings from the rankings table


**Query Params:**

- page: int
