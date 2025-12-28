import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { UserEntity } from "./user.entity";

@Entity('user_role')
export class UserRoleEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'state', type: 'boolean', default: true})
    state: boolean;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;

    //foraneas con role y user
    @ManyToOne(()=> RoleEntity, (role)=> role.user_roles, {eager: true, nullable: false}, )
    @JoinColumn({name: "role_id"})
    role: RoleEntity

    @ManyToOne(()=> UserEntity, (user)=> user.user_roles, {eager:true, nullable: false})
    @JoinColumn({name: "user_id"})
    user: UserEntity
}