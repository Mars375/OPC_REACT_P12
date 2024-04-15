// types.ts

export interface UserInfos {
	firstName: string;
	lastName: string;
	age: number;
}

export interface KeyData {
	calorieCount: number;
	proteinCount: number;
	carbohydrateCount: number;
	lipidCount: number;
}

export interface User {
	id: number;
	userInfos: UserInfos;
	todayScore: number;
	keyData: KeyData;
}

export interface Session {
	day: string;
	kilogram: number;
	calories: number;
}

export interface UserActivity {
	userId: number;
	sessions: Session[];
}

export interface AverageSession {
	day: number;
	sessionLength: number;
}

export interface UserAverageSessions {
	userId: number;
	sessions: AverageSession[];
}

export interface PerformanceData {
	kind: number;
	value: number;
}

export interface UserPerformance {
	userId: number;
	kind: Record<number, string>;
	data: PerformanceData[];
}
