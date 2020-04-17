import {Collection} from '@/buisness/core/collection';
import {IUserModel, UserModel} from '@/buisness/entities/user/user-model';

export class UserCollection extends Collection<UserModel> {
    protected createModel(data: IUserModel): UserModel {
        return new UserModel(data);
    }
}
