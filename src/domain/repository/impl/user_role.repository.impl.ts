import { UserRoleEntity } from "src/domain/entity";
import { UserRoleRepository } from "../user_role.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class UserRoleRepositoryImpl implements UserRoleRepository {
    constructor(
        @InjectRepository(UserRoleEntity)
        private readonly userRoleRepository: Repository<UserRoleEntity>
    ) { }

    async findAll(): Promise<UserRoleEntity[]> {
        return this.userRoleRepository.find({ where: { state: true } });
    }
    async findOne(id: number): Promise<UserRoleEntity> {
        return this.userRoleRepository.findOne({ where: { id } });
    }

    async findRolesByUserId(id: number): Promise<UserRoleEntity[]> {
        return this.userRoleRepository.find({
            where: {
                user: { id },
                state: true,
            },
            relations: ['role'],
        });
    }
    async save(user_role: UserRoleEntity): Promise<UserRoleEntity> {
        return this.userRoleRepository.save(user_role);
    }

}