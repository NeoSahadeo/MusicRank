import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { setSearch } from "@/stores/search";

export default function SearchBar() {
  const [localSearch, setLocalSearch] = useState("");
  const [value] = useDebounce(localSearch, 1000);

  useMemo(async () => {
    if (value) {
      setSearch(localSearch);
    } else {
      setSearch("");
    }
  }, [value]);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        defaultValue={""}
        onChange={(e) => {
          setLocalSearch(e.target.value);
        }}
      />
    </>
  );
}
