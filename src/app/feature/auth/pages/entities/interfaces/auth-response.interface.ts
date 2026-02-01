import { IUser } from "../../../../../core/entities/interfaces/user.interface";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}