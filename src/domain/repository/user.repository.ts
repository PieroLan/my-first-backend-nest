import { UserEntity } from "../entity";

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  findOne(id: number): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
}
