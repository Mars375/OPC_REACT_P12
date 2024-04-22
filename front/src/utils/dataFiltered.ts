import { DataType } from "../types/types";

export const filterData = (
	data: DataType[],
	userId: number
): DataType | undefined => {
	return data.find((item) =>
		"userId" in item ? item.userId === userId : item.id === userId
	);
};
