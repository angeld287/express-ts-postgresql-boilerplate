/**
 * Define interface for User Model
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

export interface IUser {
    id: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;

    tokens?: Tokens[];
    profile?: FederatedAuthProfiles;
    pictures?: UserPictures[];

    fullname: string;
    gender: string;
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

export default IUser;