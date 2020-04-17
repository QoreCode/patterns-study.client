import {Mapper} from '@/buisness/core/mapper';
import {Collection} from '@/buisness/core/collection';
import {IUserModel, UserModel} from '@/buisness/entities/user/user-model';
import {UserCollection} from '@/buisness/entities/user/user-collection';

export class UserMapper extends Mapper<UserModel> {
    protected entity: string = 'users';

    public async auth(email: string, password: string) {
        const data = await this.request.post(this.entity, {email, password});

        return this.createModel(data);
    }

    // public async login() {
    //     const data = await this.request.post(this.entity, payload);
    //
    //     return this.createModel(data);
    // }

    protected createCollection(data: IUserModel[]): Collection<UserModel> {
        const collection = new UserCollection();
        collection.setEntities(data);

        return collection;
    }

    protected createModel(data: IUserModel): UserModel {
        return new UserModel(data);
    }
}
