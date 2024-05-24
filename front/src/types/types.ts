// types.ts

// Interface for user information properties
export interface UserInfosProps {
	firstName: string; // User's first name
	lastName: string; // User's last name
	age: number; // User's age
}

// Interface for key data properties
export interface KeyDataProps {
	calorieCount: number; // Calorie count
	proteinCount: number; // Protein count
	carbohydrateCount: number; // Carbohydrate count
	lipidCount: number; // Lipid count
}

// Interface for user properties
export interface UserProps {
	id: number; // User ID
	userInfos: UserInfosProps; // User information
	todayScore?: number; // Today's score (optional)
	score?: number; // Overall score (optional)
	keyData: KeyDataProps; // Key data
}

// Interface for session properties
export interface SessionProps {
	day: number; // Day of the session
	kilogram: number; // Kilograms recorded
	calories: number; // Calories burned
}

// Interface for user activity properties
export interface UserActivityProps {
	userId: number; // User ID
	sessions: SessionProps[]; // Array of sessions
}

// Interface for average session properties
export interface AverageSessionProps {
	day: number; // Day of the session
	sessionLength: number; // Length of the session
}

// Interface for user average sessions properties
export interface UserAverageSessionsProps {
	userId: number; // User ID
	sessions: AverageSessionProps[]; // Array of average sessions
}

// Interface for performance data properties
export interface PerformanceDataProps {
	kind: number; // Type of performance metric
	value: number; // Value of the performance metric
}

// Interface for user performance properties
export interface UserPerformanceProps {
	userId: number; // User ID
	kind: Record<number, string>; // Mapping of performance metric types
	data: PerformanceDataProps[]; // Array of performance data
}

// Union type for all possible data types
export type DataType =
	| UserProps
	| UserActivityProps
	| UserAverageSessionsProps
	| UserPerformanceProps;
