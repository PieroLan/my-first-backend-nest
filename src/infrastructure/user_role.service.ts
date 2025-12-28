import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRoleEntity } from "src/domain/entity";
import { IUserRole, IUserRoleCreateDto, IUserRoleUpdateDto } from "src/domain/interfaces/user_role";
import { EntityManager } from 'typeorm';
import { UserRoleRepositoryImpl } from "src/domain/repository/impl/user_role.repository.impl";
import { EntityFormatter } from "src/helpers/format/entity-format.service";

@Injectable()
export class UserRoleService {
    constructor(
        private readonly userRoleRepository: UserRoleRepositoryImpl
    ) { }

    async findAll(): Promise<IUserRole[]> {
        return await this.userRoleRepository.findAll();
    }

    async findOne(id: number): Promise<IUserRole> {
        const user_role = await this.userRoleRepository.findOne(id);
        if (!user_role) {
            throw new HttpException('Registro de user_role no encontrado', HttpStatus.NOT_FOUND);
        }
        return user_role;
    }

    async findRolesByUserId(id: number){
        const user_roles = await this.userRoleRepository.findRolesByUserId(id);
        if(user_roles.length === 0)
            throw new HttpException('Roles del usuario no encontrados', HttpStatus.NOT_FOUND);
        return user_roles.map(ur => ur.role);
    }

    async create(data: IUserRoleCreateDto, manager?: EntityManager): Promise<IUserRole> {
        const user_roleFormatted = EntityFormatter.format(data, UserRoleEntity, {
            role_id: 'role',
            user_id: 'user'
        })
        const userRoleSaved = manager ? await manager.save(UserRoleEntity, user_roleFormatted) : await this.userRoleRepository.save(user_roleFormatted)
        return userRoleSaved;
    }

    async update(data: IUserRoleUpdateDto): Promise<IUserRole> {
        const existingUserRole = await this.findOne(data.id);
        const user_roleFormatted = EntityFormatter.format(data, UserRoleEntity)
        const updatedData = { ...existingUserRole, ...user_roleFormatted }
        return await this.userRoleRepository.save(updatedData);
    }

    async changeState(id: number): Promise<IUserRole> {
        const role_user = await this.userRoleRepository.findOne(id);
        role_user.state = !role_user.state;
        const user_roleFormatted = EntityFormatter.format(role_user, UserRoleEntity)
        return await this.userRoleRepository.save(user_roleFormatted);
    }
}