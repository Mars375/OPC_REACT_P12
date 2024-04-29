// types.ts

export interface UserInfosProps {
	firstName: string;
	lastName: string;
	age: number;
}

export interface KeyDataProps {
	calorieCount: number;
	proteinCount: number;
	carbohydrateCount: number;
	lipidCount: number;
}

export interface UserProps {
	id: number;
	userInfos: UserInfosProps;
	todayScore?: number;
	score?: number;
	keyData: KeyDataProps;
}

export interface SessionProps {
	day: string;
	kilogram: number;
	calories: number;
}

export interface UserActivityProps {
	userId: number;
	sessions: SessionProps[];
}

export interface AverageSessionProps {
	day: number;
	sessionLength: number;
}

export interface UserAverageSessionsProps {
	userId: number;
	sessions: AverageSessionProps[];
}

export interface PerformanceDataProps {
	kind: number;
	value: number;
}

export interface UserPerformanceProps {
	userId: number;
	kind: Record<number, string>;
	data: PerformanceDataProps[];
}

export type DataType =
	| UserProps
	| UserActivityProps
	| UserAverageSessionsProps
	| UserPerformanceProps;
