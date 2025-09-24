<script lang="ts">
  import { createClient } from "@supabase/supabase-js";
  const { apiKey, superbaseURL } = $props();

  const supabase = createClient(superbaseURL, apiKey, {});

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.PROD
          ? ""
          : "http://localhost:4321/auth/callback",
      },
    });
    if (error) console.error(error);
    else console.log(data);
  }
</script>

<button onclick={signIn}>Sign In with Google</button>
