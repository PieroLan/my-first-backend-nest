import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { IRole } from "./role";
import { IUser } from "./user";

export interface IUserRole {
    id: number;
    role: IRole;
    user: IUser;
    state: boolean;
    created_at: Date;
    updated_at: Date;
}

export class IUserRoleCreateDto {

    @IsNotEmpty({ message: "El role id es obligario" })
    @IsNumber()
    role_id: number;

    @IsNotEmpty({ message: "El user id es obligatorio" })
    @IsNumber()
    user_id: number;
}


export class IUserRoleUpdateDto {
    id: number;

    @IsOptional()
    @IsNumber()
    role_id?: number;

    @IsOptional()
    @IsNumber()
    user_id?: number;
}