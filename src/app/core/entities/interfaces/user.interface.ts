import { UserRole } from "../enums/user-role.enum";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthdayDate: string;
    shortName: string;
    color: string;
    role: UserRole;
    avatarUrl: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}