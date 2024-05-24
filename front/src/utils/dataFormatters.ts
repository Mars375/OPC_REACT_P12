import { ApiService } from "../services/apiService";
import {
	UserProps,
	UserActivityProps,
	UserAverageSessionsProps,
	UserPerformanceProps,
	DataType,
} from "../types/types";

// Mapping of day numbers to day initials
const dayMapping = {
	1: "L",
	2: "M",
	3: "Me",
	4: "J",
	5: "V",
	6: "S",
	7: "D",
};

// Mapping of performance kind numbers to kind names
const kindMapping = {
	1: "Cardio",
	2: "Energie",
	3: "Endurance",
	4: "Force",
	5: "Vitesse",
	6: "Intensité",
};

// Class to format user main data
class UserMainData {
	userInfos: {
		firstName: string;
		lastName: string;
		age: number;
	};
	score: number;
	keyData: {
		calorieCount: number;
		proteinCount: number;
		carbohydrateCount: number;
		lipidCount: number;
	};

	constructor(data: UserProps) {
		this.userInfos = {
			firstName: data.userInfos.firstName,
			lastName: data.userInfos.lastName,
			age: data.userInfos.age,
		};
		this.score = data.todayScore || data.score || 0;
		this.keyData = {
			calorieCount: data.keyData.calorieCount,
			proteinCount: data.keyData.proteinCount,
			carbohydrateCount: data.keyData.carbohydrateCount,
			lipidCount: data.keyData.lipidCount,
		};
	}
}

// Class to format user activity data
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

// Class to format user average sessions data
class UserAverageSessions {
	sessions: Array<{ day: string; sessionLength: number }>;

	constructor(data: UserAverageSessionsProps) {
		this.sessions = data.sessions.map((session) => ({
			day: dayMapping[session.day as keyof typeof dayMapping],
			sessionLength: session.sessionLength,
		}));
	}
}

// Class to format user performance data
class UserPerformance {
	data: Array<{ kind: string; value: number }>;

	constructor(data: UserPerformanceProps) {
		this.data = data.data.map((performance) => ({
			kind: kindMapping[performance.kind as keyof typeof kindMapping],
			value: performance.value,
		}));
	}
}

// Function to format data based on the service type
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
