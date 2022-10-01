/**
 * Define interface for User Service
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import IUser from "./models/User";

export interface IUserService {

    validateUser(email: string, password: string): Promise<any>;

    getUserById(id: number): Promise<any>;

    getUserByEmail(email: string): Promise<any>;

    verifyIfEmailExist(email: string): Promise<any>;

    verifyIfPhoneNumberExist(phoneNumber: string): Promise<any>;

    verifyIfUserNameExist(userName: string): Promise<any>;

    createNewUser(email: string, phoneNumber: string, userPassword: string, fullname: string, gender: string, userName: string, profile: number): Promise<any>;

    createNewUserFromGoogle(user: IUser, profileId: number): Promise<any | ErrorConstructor>;

    getUserByGoogle(google: string): Promise<any | ErrorConstructor>;

    createNewUserProfileImage(image_url: string, user_id: number): Promise<any | ErrorConstructor>;

    createNewFederatedAuthProfiles(kind: string, profile_id: string): Promise<any | ErrorConstructor>;
}

export default IUserService;