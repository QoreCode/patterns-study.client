import {UserModel} from '@/buisness/entities/user/user-model';
import {ActionContext} from 'vuex';
import {UserMapper} from '@/buisness/entities/user/user-mapper';

export interface IClientModuleState {
    client?: UserModel,
    token?: string
}

export const CLIENT_MODULE_ACTIONS = {
    login: 'login'
};

export const CLIENT_MODULE_GETTERS = {
    getClient: 'getClient',
    getToken: 'getToken'
};

export const CLIENT_MODULE_MUTATIONS = {};

const state: IClientModuleState = {};

export default {
    state,
    mutations: {},
    getters: {
        [CLIENT_MODULE_GETTERS.getClient](clientModuleState: IClientModuleState): UserModel | undefined {
            return clientModuleState.client;
        },
        [CLIENT_MODULE_GETTERS.getToken](clientModuleState: IClientModuleState): string | undefined {
            return clientModuleState.token;
        }
    },
    actions: {
        [CLIENT_MODULE_ACTIONS.login](context: ActionContext<IClientModuleState, any>): UserModel | undefined {
          const mapper = new UserMapper();
          mapper.
        }
    }
};
