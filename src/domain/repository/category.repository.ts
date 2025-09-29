import { CategoryEntity } from "../entity";

export interface ICategoryRepository { 
    findAll(): Promise<CategoryEntity[]>;
    findOne(id: number): Promise<CategoryEntity>;
    save(category: CategoryEntity): Promise<CategoryEntity>;
}