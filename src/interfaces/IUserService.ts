/**
 * Define interface for User Service
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

export interface IUserService {

    validateUser(email: string, password: string): Promise<any>;

    getUserById(id: number): Promise<any>;

    getUserByEmail(email: string): Promise<any>;

    verifyIfEmailExist(email: string): Promise<any>;

    verifyIfPhoneNumberExist(phoneNumber: string): Promise<any>;

    verifyIfUserNameExist(userName: string): Promise<any>;

    createNewUser(email: string, phoneNumber: string, userPassword: string, fullname: string, gender: string, userName: string, profile: number): Promise<any>;
}

export default IUserService;