const express = require('express');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');
import { schema } from './schema';

import {IPost, IPostInput, IUser, IUserInput} from './types';

// emulation of an array of users / posts from the database :)
const users: IUser[] = [
	{id: 'qw876rq0w9e8r7', name: 'Bohdan', age: 21, posts: []},
	{id: 'qw876rq0w9e8r8', name: 'Petro', age: 21, posts: []},
	{id: 'qw876rq0w9e8r9', name: 'Stepan', age: 21, posts: []},
	{id: 'qw876rq0w9e8r0', name: 'Ivan', age: 21, posts: []},
	{id: 'qw876rq0w9e8r1', name: 'Sergiy', age: 21, posts: []},
	{id: 'qw876rq0w9e8r13', name: 'Oleh', age: 21, posts: []},
];
const posts: IPost[] = [
	{id: 'qwerqwe', userId: 'qw876rq0w9e8r7', post: 'lorem lorem lorem', title: '1 post tile'},
	{id: 'qwerqwe1', userId: 'qw876rq0w9e8r7', post: 'lorem lorem lorem', title: '2 post tile'},
	{id: 'qwerqwe2', userId: 'qw876rq0w9e8r7', post: 'lorem lorem lorem', title: '3 post tile'},
];

const root =  {
	users() {
		return users;
	},

	user(id: string): IUser | undefined {
		return users.find((user) => user.id === id);
	},

	posts(): IPost[] {
		return posts;
	},

	createPost({ input }: { input: IPostInput }): IPost {
		const post = {
			id: JSON.stringify(Math.random()),
			...input
		}

		posts.push(post);

		const user = this.user(input.userId);
		user?.posts?.push(post);

		return post;
	},

	createUser({ input }: { input:IUserInput }): IUser {
		const user = {
			id: JSON.stringify(Math.random()),
			...input
		}

		users.push(user);
		return user;
	}
}

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true,
	rootValue: root,
}));

app.listen(5000, () => console.log('server started on port 5000'));
