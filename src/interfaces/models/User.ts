/**
 * Define interface for User Model
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { Express } from 'express';

export interface IUser extends Express.User {
    id: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;

    tokens?: Tokens[];
    profile?: FederatedAuthProfiles;
    pictures?: UserPictures[];
    roles: Array<UserRole>;

    fullname: string;
    gender?: string;
    userName: string;
}

export interface Tokens {
    id: string;
    kind: string;
    accessToken: string;
    tokenSecret?: string;
}

export interface FederatedAuthProfiles {
    id: string;
    kind: string;
    profileId: string;
}

export interface UserPictures {
    id: string;
    imageUrl: string;
}

export interface UserRole {
    id: number;
    userId: number;
    roleId: number;
    roleName: string;
}

export default IUser;