import { ApiService } from "../services/apiService";
import {
	UserProps,
	UserActivityProps,
	UserAverageSessionsProps,
	UserPerformanceProps,
	DataType,
} from "../types/types";

const dayMapping = {
	1: "L",
	2: "M",
	3: "Me",
	4: "J",
	5: "V",
	6: "S",
	7: "D",
};

const kindMapping = {
	1: "Cardio",
	2: "Energie",
	3: "Endurance",
	4: "Force",
	5: "Vitesse",
	6: "Intensité",
};

class UserMainData {
	firstName: string;
	lastName: string;
	age: number;
	score: number;
	calorieCount: number;
	proteinCount: number;
	carbohydrateCount: number;
	lipidCount: number;

	constructor(data: UserProps) {
		this.firstName = data.userInfos.firstName;
		this.lastName = data.userInfos.lastName;
		this.age = data.userInfos.age;
		this.score = data.todayScore || data.score || 0;
		this.calorieCount = data.keyData.calorieCount;
		this.proteinCount = data.keyData.proteinCount;
		this.carbohydrateCount = data.keyData.carbohydrateCount;
		this.lipidCount = data.keyData.lipidCount;
	}
}

class UserActivity {
	sessions: Array<{ day: string; kilogram: number; calories: number }>;

	constructor(data: UserActivityProps) {
		this.sessions = data.sessions.map((session) => {
			return {
				day: session.day.toString().slice(-1),
				kilogram: session.kilogram,
				calories: session.calories,
			};
		});
	}
}

class UserAverageSessions {
	sessions: Array<{ day: string; sessionLength: number }>;

	constructor(data: UserAverageSessionsProps) {
		this.sessions = data.sessions.map((session) => ({
			day: dayMapping[session.day as keyof typeof dayMapping],
			sessionLength: session.sessionLength,
		}));
	}
}

class UserPerformance {
	data: Array<{ kind: string; value: number }>;

	constructor(data: UserPerformanceProps) {
		this.data = data.data.map((performance) => ({
			kind: kindMapping[performance.kind as keyof typeof kindMapping],
			value: performance.value,
		}));
	}
}

export function formatData(service: keyof ApiService, data: DataType) {
	switch (service) {
		case "getUserData":
			return new UserMainData(data as UserProps);
		case "getUserActivity":
			return new UserActivity(data as UserActivityProps);
		case "getUserAverageSessions":
			return new UserAverageSessions(data as UserAverageSessionsProps);
		case "getUserPerformance":
			return new UserPerformance(data as UserPerformanceProps);
		default:
			return data;
	}
}
