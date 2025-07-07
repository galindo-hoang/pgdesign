export declare class BaseModel {
    protected tableName: string;
    constructor(tableName: string);
    findAll(): Promise<any[]>;
    findById(id: number): Promise<any | null>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any | null>;
    delete(id: number): Promise<boolean>;
    hardDelete(id: number): Promise<boolean>;
    findByCondition(condition: any): Promise<any[]>;
    findOneByCondition(condition: any): Promise<any | null>;
    count(condition?: any): Promise<number>;
    paginate(page?: number, limit?: number, condition?: any): Promise<{
        data: any[];
        pagination: any;
    }>;
}
//# sourceMappingURL=BaseModel.d.ts.map