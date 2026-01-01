import { IRole } from "src/domain/interfaces/role";

export interface IUserJwtReturn {
    id: number;
    email: string;
    isActive: boolean;
    roles: IRole[];
}