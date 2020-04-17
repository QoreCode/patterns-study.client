import {RequestCriteria} from '@/buisness/tools/request/request-criteria';
import {Request} from '@/buisness/tools/request/request';
import {Collection} from '@/buisness/core/collection';
import {DefaultRequestHandler} from '@/buisness/tools/request/handlers/default-request-handler';

export abstract class Mapper<Model> {
    protected abstract entity: string;
    protected request: Request;

    constructor() {
        this.request = Request.getInstance(new DefaultRequestHandler());
    }

    public async getAll(criteria?: RequestCriteria): Promise<Collection<Model>> {
        const props = criteria ? criteria.getProps() : {};
        const data = await this.request.get(this.entity, props);

        return this.createCollection(data);
    }

    public async create(payload: object = {}): Promise<Model> {
        const data = await this.request.post(this.entity, payload);

        return this.createModel(data);
    }

    public async update(id: number, payload: object): Promise<Model> {
        const data = await this.request.put(`${this.entity}/${id}`, payload);

        return this.createModel(data);
    }

    public async deleteById(id: number): Promise<void> {
        return this.request.delete(`${this.entity}/${id}`);
    }

    public async deleteByAttributes(criteria: RequestCriteria): Promise<void> {
        return this.request.delete(this.entity, criteria.getProps());
    }

    public async findById(id: number): Promise<Model> {
        const data = await this.request.get(`${this.entity}/${id}`);

        return this.createModel(data);
    }

    public async findByAttributes(criteria: RequestCriteria): Promise<Collection<Model>> {
        const data = await this.request.get(this.entity, criteria.getProps());

        return this.createCollection(data);
    }

    protected abstract createModel(data: any): Model;

    protected abstract createCollection(data: any): Collection<Model>;
}
