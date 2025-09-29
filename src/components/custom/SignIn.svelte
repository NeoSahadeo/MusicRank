<script lang="ts">
  import { actions } from "astro:actions";
  import { navigate } from "astro:transitions/client";
</script>

<button
  onclick={async () =>
    navigate(((await actions.creds.googleSignIn()) as any).data)}
  >Sign In with Google</button
>
