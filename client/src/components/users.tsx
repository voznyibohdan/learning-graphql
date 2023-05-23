import React from 'react';

import {gql, NetworkStatus, useLazyQuery, useQuery} from '@apollo/client';
import {Post, User} from '../__generated__/graphql.ts';

const GET_USERS = gql( `
	query {
		users {
			id
			name
		}
	}
`);

const GET_POSTS  = gql(`
	query {
		posts {
			id
			title
		}
	}
`);

const Users:React.FC = () => {
	const {
		loading,
		error,
		data,
		refetch,
		networkStatus
	} = useQuery<{users:User[]}>(GET_USERS, {
		pollInterval: 10000,
	});

	const [getPosts, postsQuery] = useLazyQuery<{posts:Post[]}>(GET_POSTS);

	if (networkStatus === NetworkStatus.refetch) return <h1>Refetching...</h1>;
	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Error...</h1>;

	return (
		<div>
			{data?.users.map((user) => (
				<h1 key={user.id}>{user.name}</h1>
			))}

			<button onClick={() => refetch()}>Refetch users</button>

			<br/>
			<br/>

			<button onClick={() => getPosts()}>Get lazy posts</button>

			{postsQuery.data?.posts.map((post) => (
				<h2 key={post.id}>{post.title}</h2>
			))}
		</div>
	);
};

export default Users;