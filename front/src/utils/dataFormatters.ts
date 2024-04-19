import { ApiService } from "../services/apiService";
import {
	UserProps,
	UserActivityProps,
	UserAverageSessionsProps,
	UserPerformanceProps,
	DataType,
} from "../types/types";

class UserMainData {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	score: number;
	keyData: {
		calorieCount: number;
		proteinCount: number;
		carbohydrateCount: number;
		lipidCount: number;
	};

	constructor(data: UserProps) {
		this.id = data.id;
		this.firstName = data.userInfos.firstName;
		this.lastName = data.userInfos.lastName;
		this.age = data.userInfos.age;
		this.score = data.todayScore || data.score || 0;
		this.keyData = data.keyData;
	}
}

class UserActivity {
	userId: number;
	sessions: Array<{ day: string; kilogram: number; calories: number }>;

	constructor(data: UserActivityProps) {
		this.userId = data.userId;
		this.sessions = data.sessions;
	}
}

class UserAverageSessions {
	userId: number;
	sessions: Array<{ day: number; sessionLength: number }>;

	constructor(data: UserAverageSessionsProps) {
		this.userId = data.userId;
		this.sessions = data.sessions;
	}
}

class UserPerformance {
	userId: number;
	kind: Record<number, string>;
	data: Array<{ kind: number; value: number }>;

	constructor(data: UserPerformanceProps) {
		this.userId = data.userId;
		this.kind = data.kind;
		this.data = data.data;
	}
}

export function formatData(service: keyof ApiService, data: DataType[]) {
	switch (service) {
		case "getUserData":
			return new UserMainData(data[0] as UserProps);
		case "getUserActivity":
			return new UserActivity(data[0] as UserActivityProps);
		case "getUserAverageSessions":
			return new UserAverageSessions(data[0] as UserAverageSessionsProps);
		case "getUserPerformance":
			return new UserPerformance(data[0] as UserPerformanceProps);
		default:
			return data;
	}
}
