# Overview

This is the API for Supabase interactions, such as read/write/delete/put/update/patch

The user must be authenticated before querying the endpoints otherwise the
will return an empty array.


## Fetch Rankings

### Get

Returns the rankings from the rankings table

`api/supabase/rankings`

#### Query Params

- page: int
