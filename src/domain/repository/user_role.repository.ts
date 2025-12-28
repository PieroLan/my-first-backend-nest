import { UserRoleEntity } from "../entity";

export interface UserRoleRepository {
    findAll(): Promise<UserRoleEntity[]>;
    findOne(id: number): Promise<UserRoleEntity>;
    findRolesByUserId(id: number): Promise<UserRoleEntity[]>
    save(user_role: UserRoleEntity): Promise<UserRoleEntity>;
}