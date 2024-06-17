import {IUser} from "../interface";

export enum UserActionTypes {
    created = 'CREATED',
    updated = 'UPDATED',
}

export const ROUTING_KEY = "USER_ACTION_INFO"


export type TUserCreateOne = {// todo add dto
    firstName: string,
    lastName: string,
    email: string,
}

export type TUserUpdateOne = Partial<TUserCreateOne> & {
    id: string
}

export type TPaginationData = {
    page: number,
    take: number
}

export type TUserMany = {
    users: IUser[],
    total: number,
    page: number,
    take: number
}