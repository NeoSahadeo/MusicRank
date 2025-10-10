import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { $searchState, setSearch } from "@/stores/search";
import { SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";

export default function SearchBar() {
  const [localSearch, setLocalSearch] = useState("");
  const [value] = useDebounce(localSearch, 1000);
  const searchState = useStore($searchState);

  useMemo(async () => {
    if (value) {
      setSearch(localSearch);
    } else {
      setSearch("");
    }
  }, [value]);

  return (
    <>
      <div className="flex flex-row">
        <div className="relative flex-1 flex flex-row">
          <Input
            className="peer h-8 w-full max-w-xs ps-8 pe-2"
            placeholder={"Search"}
            type="search"
            defaultValue={""}
            value={localSearch}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                setLocalSearch(localSearch);
              }
            }}
            onChange={(e) => {
              setLocalSearch(e.target.value);
            }}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          {localSearch.length > 0 && (
            <div className="relative">
              <button
                onClick={() => {
                  setLocalSearch("");
                  setSearch("");
                }}
                className="outline-2 rounded hover:cursor-pointer top-1/2 absolute -translate-1/2 right-0"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
        <Button
          className="ml-2 h-8 hover:cursor-pointer"
          type="button"
          disabled={searchState}
        >
          Search
        </Button>
      </div>
    </>
  );
}
