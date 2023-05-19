import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { User } from '../__generated__/graphql.ts';

const GET_USERS = gql( `
	query {
		users {
			id
			name
		}
	}
`);

const Users:React.FC = () => {
	const { loading, error, data } = useQuery<{users:User[]}>(GET_USERS);

	console.log(loading, error);

	return (
		<div>
			{data?.users.map((user) => (
				<h1 key={user.id}>{user.name}</h1>
			))}
		</div>
	);
};

export default Users;