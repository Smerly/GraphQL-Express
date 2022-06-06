// imports

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

// Create a schema

// The getAbout is a query method
const schema = buildSchema(`
enum MealTime {
	breakfast
	lunch
	dinner
}
type About {
    message: String!
}

type Pet {
	name: String!
	species: String!
}

type Meal {
	description: String!
}

type Query {
	getAbout: About
	getMeal(time: MealTime!): Meal
	getPet(id: Int!): Pet
	allPets: [Pet!]!
}

`);

const petList = [
	{ name: 'Fluffy', species: 'Dog' },
	{ name: 'Sassy', species: 'Cat' },
	{ name: 'Goldberg', species: 'Frog' },
];

// This should return what you want the query method to return
// Create a resolver
const root = {
	getAbout: () => {
		return { message: 'Hello World' };
	},
	getMeal: ({ time }) => {
		const allMealTimes = {
			breakfast: 'toast',
			lunch: 'donburi',
			dinner: 'noodle soup',
		};
		const meal = allMealTimes[time];
		return { description: meal };
	},

	getPet: ({ id }) => {
		return petList[id];
	},
	allPets: () => {
		return petList;
	},
};

// Define a route for GraphQL

const gameList = [
	{
		name: 'Genshin Impact',
		gameType: ['Gacha', 'Adventure', 'Story'],
		developer: 'Hoyoverse',
	},
	{
		name: 'League of Legends',
		gameType: ['MOBA', 'Strategy'],
		developer: 'Riot Games',
	},
	{
		name: 'Counter Strike Global Offensive',
		gameType: ['FPS'],
		developer: 'Valve',
	},
];

// Start the app

const port = 3000;
app.listen(port, () => {
	console.log(`Running on port ${port}`);
	console.log(gameList.slice(0, 2));
});

// Problems

// Challenge 1

// Challenge 2 + 3 + 6 + 9 + 10 + 11 + 12 + 13

const schemaGames = buildSchema(`
enum GameType {
	Gacha
	MOBA
	FPS
	Strategy
	Party
	Adventure
	Story
}

type Time {
	hour: Int!
	minute: Int!
	second: Int!
}

type RandomNum {
	number: Int!
}

type Game {
	name: String!
	gameType: [GameType!]!
	developer: String!
}

type Roll {
	total: Int!
	sides: Int!
	roll: [Int!]
}

type Query {
	getFirstGame: Game
	getLastGame: Game
	getGame(id: Int!): Game
	allGames: [Game!]!
	getTime: Time
	getRandom: RandomNum
	getRoll(sides: Int!, rolls: Int!): Roll
	getAmountGames: Int!
	gamesInRange(start: Int!, end: Int!): [Game!]!
}

`);

// Challenge 4 + 7 + 9 + 10 + 11 + 12 + 13

const rootGames = {
	getGame: ({ id }) => {
		return gameList[id];
	},
	allGames: () => {
		return gameList;
	},
	getFirstGame: () => {
		return gameList[0];
	},
	getLastGame: () => {
		return gameList[gameList.length - 1];
	},
	getTime: () => {
		const date = new Date();
		return {
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds(),
		};
	},

	getRandom: () => {
		return { number: Math.floor(Math.random() * (100 - 1) + 1) };
	},

	getRoll: ({ sides, rolls }) => {
		const arr = [];
		let totalCount = 0;
		for (let i = 0; i < rolls; i++) {
			const random = Math.floor(Math.random() * (sides - 1) + 1);
			arr.push(random);
			totalCount += random;
		}

		return { total: totalCount, roll: arr };
		// return { total: 1, rolls: [1] };
	},

	getAmountGames: () => {
		return gameList.length;
	},
	gamesInRange: ({ start, end }) => {
		return gameList.slice(start, end);
		// return { };
	},
};

// Ch

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schemaGames,
		rootValue: rootGames,
		graphiql: true,
	})
);
