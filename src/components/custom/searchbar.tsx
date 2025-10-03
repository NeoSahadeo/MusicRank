import { useMemo } from "react";
import { useDebounce } from "use-debounce";
import { resetTracks, addTracks } from "@/stores/tracks";
import { $search, setSearch } from "@/stores/search";
import { useStore } from "@nanostores/react";

export default function SearchBar() {
	const search = useStore($search);
	const [value] = useDebounce(search, 1000);

	useMemo(async () => {
		if (value) {
			const res = await fetch(
				`${import.meta.env.BASE_URL}api/proxy?url=https://api.deezer.com/search?q=${value}`,
			);
			if (res.ok) {
				resetTracks();
				const json = await res.json();
				console.log(json.data);
				addTracks(json.data);
			}
		} else {
			// TODO: Load back default state
		}
	}, [value]);

	return (
		<>
			<input
				type="text"
				placeholder="Search"
				defaultValue={""}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
		</>
	);
}
