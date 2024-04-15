export const USER_MAIN_DATA = [
	{
		id: 1,
		userInfos: {
			firstName: "Thomas",
			lastName: "Shelby",
			age: 33,
		},
		todayScore: 55,
		keyData: {
			calorieCount: 2000,
			proteinCount: 200,
			carbohydrateCount: 200,
			lipidCount: 200,
		},
	},
	{
		id: 2,
		userInfos: {
			firstName: "Arthur",
			lastName: "Shelby",
			age: 35,
		},
		todayScore: 55,
		keyData: {
			calorieCount: 2000,
			proteinCount: 200,
			carbohydrateCount: 200,
			lipidCount: 200,
		},
	},
];

export const USER_ACTIVITY = [
	{
		userId: 1,
		sessions: [
			{
				day: "2020-01-01",
				kilogram: 75,
				calories: 300,
			},
			{
				day: "2020-01-02",
				kilogram: 75,
				calories: 300,
			},
			{
				day: "2020-01-03",
				kilogram: 75,
				calories: 300,
			},
			{
				day: "2020-01-04",
				kilogram: 75,
				calories: 300,
			},
			{
				day: "2020-01-05",
				kilogram: 75,
				calories: 300,
			},
			{
				day: "2020-01-06",
				kilogram: 75,
				calories: 300,
			},
			{
				day: "2020-01-07",
				kilogram: 75,
				calories: 300,
			},
		],
	},
];

export const USER_AVERAGE_SESSIONS = [
	{
		userId: 1,
		sessions: [
			{
				day: 1,
				sessionLength: 30,
			},
			{
				day: 2,
				sessionLength: 45,
			},
			{
				day: 3,
				sessionLength: 30,
			},
			{
				day: 4,
				sessionLength: 45,
			},
			{
				day: 5,
				sessionLength: 30,
			},
			{
				day: 6,
				sessionLength: 45,
			},
			{
				day: 7,
				sessionLength: 30,
			},
		],
	},
];

export const USER_PERFORMANCE = [
	{
		userId: 1,
		kind: {
			1: "cardio",
			2: "energy",
			3: "endurance",
			4: "strength",
			5: "speed",
			6: "intensity",
		},
		data: [
			{
				kind: 1,
				value: 60,
			},
			{
				kind: 2,
				value: 80,
			},
			{
				kind: 3,
				value: 55,
			},
			{
				kind: 4,
				value: 90,
			},
			{
				kind: 5,
				value: 60,
			},
			{
				kind: 6,
				value: 70,
			},
		],
	},
];
