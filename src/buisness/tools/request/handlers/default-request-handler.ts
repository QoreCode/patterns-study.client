import {REQUEST_CODES, RequestHandler} from '@/buisness/tools/request/handlers/request-handler';

export class DefaultRequestHandler extends RequestHandler {
    public resolve(status: REQUEST_CODES, data: any): Error {
        if (status === REQUEST_CODES.UNAUTHORIZED) {
            console.error('lol2');
            throw new Error('Для выполнения данной операции необходимо авторизоваться');
        }

        console.error('lol3');
        throw new Error('Сервер недоступен, повторите попытку позже');
    }
}
