import {
	User as UserType,
	UserActivity as UserActivityType,
	UserAverageSessions as UserAverageSessionType,
	UserPerformance as UserPerformanceType,
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

	constructor(data: UserType) {
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

	constructor(data: UserActivityType) {
		this.userId = data.userId;
		this.sessions = data.sessions;
	}
}

class UserAverageSessions {
	userId: number;
	sessions: Array<{ day: number; sessionLength: number }>;

	constructor(data: UserAverageSessionType) {
		this.userId = data.userId;
		this.sessions = data.sessions;
	}
}

class UserPerformance {
	userId: number;
	kind: { [key: number]: string };
	data: Array<{ kind: number; value: number }>;

	constructor(data: UserPerformanceType) {
		this.userId = data.userId;
		this.kind = data.kind;
		this.data = data.data;
	}
}

type DataType =
	| UserType
	| UserActivityType
	| UserAverageSessionType
	| UserPerformanceType;

type ServiceType =
	| "getUserData"
	| "getUserActivity"
	| "getUserAverageSessions"
	| "getUserPerformance";

export const formatData = (service: ServiceType, data: DataType[]) => {
	switch (service) {
		case "getUserData":
			return data.map((item: DataType) => new UserMainData(item as UserType));
		case "getUserActivity":
			return data.map(
				(item: DataType) => new UserActivity(item as UserActivityType)
			);
		case "getUserAverageSessions":
			return data.map(
				(item: DataType) =>
					new UserAverageSessions(item as UserAverageSessionType)
			);
		case "getUserPerformance":
			return data.map(
				(item: DataType) => new UserPerformance(item as UserPerformanceType)
			);
		default:
			return data;
	}
};
