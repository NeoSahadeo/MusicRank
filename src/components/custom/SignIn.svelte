<script lang="ts">
  import { actions } from "astro:actions";
  import { navigate } from "astro:transitions/client";
</script>

<button onclick={async () => navigate((await actions.googleSignIn()).data)}
  >Sign In with Google</button
>
