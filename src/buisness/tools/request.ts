import config from '@/buisness/config/request';
import axios, {AxiosResponse} from 'axios';
import {IRequestCriteriaProps} from '@/buisness/tools/request-criteria';

enum REQUEST_METHODS {
    GET_METHOD = 'get',
    PUT_METHOD = 'put',
    POST_METHOD = 'post',
    PATCH_METHOD = 'patch',
    DELETE_METHOD = 'delete'
}

enum REQUEST_CODES {
    OK = 200,
    CREATED = 201,
    DELETED = 204,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    VALIDATION_FAILED = 422,
    SERVICE_UNAVAILABLE = 503,
    INTERNAL_SERVER_ERROR = 500
}

export class Request {
    public static getInstance(): Request {
        if (Request.instance == null) {
            Request.instance = new Request();
        }

        return Request.instance;
    }

    private static instance: Request;

    private constructor() {
    }

    public post(url: string, params?: IRequestCriteriaProps, crossDomain: boolean = true): Promise<any> {
        return this.send(url, REQUEST_METHODS.POST_METHOD, crossDomain, params);
    }

    public get(url: string, params?: IRequestCriteriaProps, crossDomain: boolean = true): Promise<any> {
        return this.send(url, REQUEST_METHODS.GET_METHOD, crossDomain, params);
    }

    public put(url: string, params?: IRequestCriteriaProps, crossDomain: boolean = true): Promise<any> {
        return this.send(url, REQUEST_METHODS.PUT_METHOD, crossDomain, params);
    }

    public patch(url: string, params?: IRequestCriteriaProps, crossDomain: boolean = true): Promise<any> {
        return this.send(url, REQUEST_METHODS.PATCH_METHOD, crossDomain, params);
    }

    public delete(url: string, params?: IRequestCriteriaProps, crossDomain: boolean = true): Promise<any> {
        return this.send(url, REQUEST_METHODS.DELETE_METHOD, crossDomain, params);
    }

    private async send(url: string, method: REQUEST_METHODS, crossDomain: boolean, params?: IRequestCriteriaProps): Promise<any> {
        const path = `${config.protocol}://${config.domain}/${url}`;

        const response: AxiosResponse = await axios({
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: path,
            responseType: 'json',
            method,
            data: params
        });

        const successStatus = [REQUEST_CODES.OK, REQUEST_CODES.CREATED, REQUEST_CODES.DELETED];

        if (successStatus.some((code: REQUEST_CODES) => response.status === code)) {
            return response.data;
        }

        if (response.status === REQUEST_CODES.UNAUTHORIZED) {
            throw new Error('Для выполнения данной операции необходимо авторизоваться');
        }

        throw new Error('Сервер недоступен, повторите попытку позже');
    }
}
