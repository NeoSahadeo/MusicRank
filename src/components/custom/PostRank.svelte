<script lang="ts">
  import { actions } from "astro:actions";
  import { navigate } from "astro:transitions/client";

  let form = $state<HTMLFormElement>();
  let _type = $state<string>();

  async function submit(e: Event) {
    e.preventDefault();
    const form = document.querySelector("form");
    const formData = new FormData(form!);
    switch (_type) {
      case "POST":
        await actions.rankactions.postRank(formData);
        break;
      case "UPDATE":
        await actions.rankactions.updateRank(formData);
        break;
      case "DELETE":
        await actions.rankactions.deleteRank(formData);
        break;
    }
    // if (!error) navigate("/confirmation");
  }
</script>

<div
  style="border-width: 10px; border-color: black; display: flex; background-color: gray; padding: 1em; margin: 1em;"
>
  <form onsubmit={submit} bind:this={form}>
    <select bind:value={_type}>
      <option value="POST"> POST </option>
      <option value="UPDATE"> UPDATE </option>
      <option value="DELETE"> DELETE </option>
    </select>
    <fieldset>
      <legend>Rating:</legend>
      <input name="rating" type="number" min="0" max="5" step="0.5" />
    </fieldset>
    <fieldset>
      <legend>Review:</legend>
      <input name="review" type="text" />
    </fieldset>
    <fieldset>
      <legend>SongID:</legend>
      <input name="songId" type="text" />
    </fieldset>
    <input type="submit" />
  </form>
</div>
