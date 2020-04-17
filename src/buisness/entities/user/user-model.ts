import {Model} from '@/buisness/core/model';

export interface IUserModel {
    id: string;
    email: string;
    username: string;
    roles: [];
}

export enum Roles {
    user = 'ROLE_USER',
    admin = 'ROLE_ADMIN'
}

export class UserModel extends Model implements IUserModel {
    public id: string;
    public email: string;
    public username: string;
    public roles: [];

    constructor(data: IUserModel) {
        super();

        this.id = data.id;
        this.email = data.email;
        this.username = data.username;
        this.roles = data.roles;
    }
}
