export enum REQUEST_CODES {
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

export abstract class RequestHandler {
    public abstract resolve(status: REQUEST_CODES, data: any): Error;
}
