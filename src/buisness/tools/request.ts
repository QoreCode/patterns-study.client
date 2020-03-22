import config from '@/buisness/config/request';
import Axios from 'axios';
import store from '@/buisness/store/index';
import * as _ from 'lodash';
import {objectToFormData} from 'object-to-formdata';

class Request {
    public static readonly OK = 200;
    public static readonly CREATED = 201;
    public static readonly DELETED = 204;
    public static readonly BAD_REQUEST = 400;
    public static readonly UNAUTHORIZED = 401;
    public static readonly FORBIDDEN = 403;
    public static readonly NOT_FOUND = 404;
    public static readonly VALIDATION_FAILED = 422;
    public static readonly INTERNAL_SERVER_ERROR = 500;
    public static readonly SERVICE_UNAVAILABLE = 503;

    public static readonly POST_METHOD = 'POST';
    public static readonly GET_METHOD = 'GET';
    public static readonly PUT_METHOD = 'PUT';
    public static readonly DELETE_METHOD = 'DELETE';

    public post(
        url: string,
        params: any = null,
        crossDomain = true,
    ): Promise<any> {
        // @ts-ignore
        const data = objectToFormData(params);

        return this.send(url, Request.POST_METHOD, {data}, crossDomain);
    }

    public get(
        url: string,
        params: any = null,
        crossDomain = true,
    ): Promise<any> {
        return this.send(url, Request.GET_METHOD, {params}, crossDomain);
    }

    public put(
        url: string,
        params: any = null,
        crossDomain = true,
    ): Promise<any> {
        return this.send(url, Request.PUT_METHOD, {data: params}, crossDomain);
    }

    public delete(
        url: string,
        params: any = null,
        crossDomain = true,
    ): Promise<any> {
        return this.send(url, Request.DELETE_METHOD, {data: params}, crossDomain);
    }

    private send(
        url: string,
        method: string,
        params: Record<string, any> | null,
        crossDomain: boolean,
    ): Promise<any> {
        return new Promise<void>((result, reject?) => {
            const path = crossDomain
                ? `${config.protocol}://${config.domain}/v${config.version}/${url}`
                : `${config.protocol}://${config.site}/${url}`;

            let requestConfig = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Authorization',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${store.getters.getClientToken}`,
                },
                url: path,
                responseType: 'json',
                method,
            };

            if (params) {
                requestConfig = _.merge(requestConfig, params);
            }

            // @ts-ignore
            Axios(requestConfig)
                .then((response: any) => {
                    const successStatus = [Request.OK, Request.CREATED, Request.DELETED];

                    if (successStatus.some((code) => response.status === code)) {
                        result(response.data);
                        return;
                    }

                    reject(response.data);
                })
                .then((response: any) => {
                    reject(response.data);
                })
                .catch((response: any) => {
                    const status = _.get(response, 'response.status');
                    if (status && status === Request.UNAUTHORIZED) {
                        reject({
                            code: status,
                            message: 'Авторизуйся і спробуйте ще раз.',
                        });
                    }

                    let message = _.get(response, 'response.message');

                    if (_.isUndefined(message)) {
                        message = _.get(response, 'response.data.message');
                    }

                    if (_.isUndefined(message)) {
                        message = _.get(response, 'response.data[0].message');
                    }

                    if (_.isUndefined(message)) {
                        message = 'Виникла помилка. Повторіть спробу пізніше.';
                    }

                    reject({code: status, message});
                });
        });
    }
}

export default new Request();
