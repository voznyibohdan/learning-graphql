const { buildSchema } = require('graphql');

export const schema = buildSchema(`
    type User {
        id: ID
        name: String
        age: Int
        posts: [Post]
    }
    
    type Post {
        id: ID
        title: String
        post: String
    }
    
    input UserInput {
        id: ID
        name: String!
        age: Int!
    }
    
    input PostInput {
        id: ID
        userId: String!
        title: String!
        post: String!
    }
    
    type Query {
        getAllUsers: [User]
        getUserById(id: ID): User 
        getPosts: [Post]
    }
    
    type Mutation {
        createUser(input: UserInput): User
        createPost(input: PostInput): Post
    }
`);
