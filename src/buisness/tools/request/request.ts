import config from '@/buisness/config/request';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {IRequestCriteriaProps} from '@/buisness/tools/request/request-criteria';
import {REQUEST_CODES, RequestHandler} from '@/buisness/tools/request/handlers/request-handler';

enum REQUEST_METHODS {
    GET_METHOD = 'get',
    PUT_METHOD = 'put',
    POST_METHOD = 'post',
    PATCH_METHOD = 'patch',
    DELETE_METHOD = 'delete'
}

export class Request {
    public static getInstance(errorHandler: RequestHandler): Request {
        if (Request.instance === undefined) {
            Request.instance = new Request(errorHandler);
        }

        return Request.instance;
    }

    private static instance: Request;

    private errorHandler: RequestHandler;

    private constructor(errorHandler: RequestHandler) {
        this.errorHandler = errorHandler;
    }

    public post(url: string, params?: IRequestCriteriaProps): Promise<any> {
        return this.send(url, REQUEST_METHODS.POST_METHOD, params);
    }

    public get(url: string, params?: IRequestCriteriaProps): Promise<any> {
        return this.send(url, REQUEST_METHODS.GET_METHOD, params);
    }

    public put(url: string, params?: IRequestCriteriaProps): Promise<any> {
        return this.send(url, REQUEST_METHODS.PUT_METHOD, params);
    }

    public patch(url: string, params?: IRequestCriteriaProps): Promise<any> {
        return this.send(url, REQUEST_METHODS.PATCH_METHOD, params);
    }

    public delete(url: string, params?: IRequestCriteriaProps): Promise<any> {
        return this.send(url, REQUEST_METHODS.DELETE_METHOD, params);
    }

    private async send(url: string, method: REQUEST_METHODS, params?: IRequestCriteriaProps): Promise<any> {
        const path = `${config.protocol}://${config.domain}/api/${url}`;

        const axiosRequestConfig: AxiosRequestConfig = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Authorization',
                'X-Requested-With': 'XMLHttpRequest',
                // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODY2MTcxNTcsImV4cCI6MTU4NjYyMDc1Nywicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImQuZGV2QHVrci5uZXQifQ.LjhjLqXQCNDsXKaYDtaDlaS6EcKX1X3AGxoUMgvOVpwfYowZtJmnM5sdyFWx7tNo1YvKqEAuDIaIMGSKzafaoOXtiS60MKEysPffkjsiY2y8ePXMQWTesdeO61koOspQ0htSADDc_m59UiCNG5PK_9h2xgcKZCePa-jWAZeTcDBuKi5vAxljog_ynYqRu3Y_o6M_KqyVr9ZP9oAN69KnrR8ywKyISYHxDy2H15qGQlmCTZH5ly9n2NCn3Fnrf0zvpxfxkdkvNlntq1RHTzSI9VpiNd7Hsd-NljQ7qe_r9r9yMh4IJDXCwIIyP0vUPMuAa2gqLVVsjIVdysrC9arE-zUNYdXxBKjMRPeJT04M3afytp1CMIShD4Jk9k7WCmd_mAo6LRc2MLEqW3pV2YKGgg_h8Y0qv61ConcADGXCmzY84VXMzgbdTNEOCGO4IaQ4qeAvEgiKwKOGJLBQMgMQhZsN3l2ZUc7Hv9XR9CzEZMh6F74qaRW6jjCEKdt3ONSD2uH_ETqJhJweV4tBi0BqE3a1h9eYYN3Vg6119FDYUnTtT3IBLOXH_aJHgKDZMdYXJ7MsZTq2WxGosLNHTxEf52Kx4r5DBZpTMJdiSpWb-x2ExmtP8jOCC3SvzLyyoDdyjBwzrhlbZ1KyTTeJiFz5FR5EX8a4nLs5cW1v_1FrJkQ',
            },
            url: path,
            responseType: 'json',
            method,
            data: params
        };

        try {
            const response: AxiosResponse = await axios(axiosRequestConfig);
            const successStatus = [REQUEST_CODES.OK, REQUEST_CODES.CREATED, REQUEST_CODES.DELETED];

            if (successStatus.some((code: REQUEST_CODES) => response.status === code)) {
                return response.data;
            }

            this.errorHandler.resolve(response.status, response.data);
        } catch (e) {
            console.log(e);
        }
    }
}
