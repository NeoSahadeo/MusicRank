import { createContext, useState, useContext } from "react";

export const RankingDataContext = createContext(null);

export const useRankingContext = () => {
	const context = useContext(RankingDataContext);
	if (context === null) {
		throw new Error(
			"useRankingContext must be used within RankingDataContext.Provider",
		);
	}
	return context;
};

type Props = React.PropsWithChildren<{
	data: any;
}>;

export default function RankingDataProvider(props: Props) {
	const [rankingData, setRankingData] = useState(props.data);
	return (
		<RankingDataContext.Provider value={rankingData}>
			{props.children}
		</RankingDataContext.Provider>
	);
}
