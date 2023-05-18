interface IUserBasicFields {
    name: string;
    age: number;
}

export interface IUserInput extends IUserBasicFields{
    post?: IPost
}

export interface IUser extends IUserBasicFields{
    id: string;
    posts?: IPost[];
}

export interface IPostInput {
    userId: string;
    title: string;
    post: string;
}

export interface IPost extends IPostInput{
    id: string;
}