import {User} from "../../../database/entity/User.entity";
import {IUser} from "../interface";
import {TPaginationData} from "../types";

export const userDto = (user: User): IUser => {
    const {id, firstName, lastName, email, createdAt, updatedAt} = user;
    return {
        id,
        firstName,
        lastName,
        email,
        createdAt,
        updatedAt
    }
}

export function getPaginationData(query: any): TPaginationData {
    const validPage = query?.page ? Number(query.page) : 1;
    const validTake = query?.take ? Number(query.take) : 10;

    return {
        page: validPage,
        take: validTake,
    };
}