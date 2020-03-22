import * as _ from 'lodash';

export enum ORDER_TYPES {
    DESC = 'desc',
    ASC = 'asc'
}

export interface IRequestCriteriaInterface {
    page?: number;
}

export interface IRequestCriteriaProps {
    page?: string;
}

export class RequestCriteria implements IRequestCriteriaInterface {
    public page?: number;

    constructor(data: IRequestCriteriaInterface) {
        if (data.page != null) {
            this.page = data.page;
        }
    }

    public getProps(): IRequestCriteriaProps {
        const props = {};

        if (this.page != null) {
            _.set(props, 'page', this.page);
        }

        return props;
    }
}
