import { IBaseResponse } from "./IBaseResponse";


export interface IUserLoginResponse {

}

export interface IUserLoginErrorResponse {

}

export interface IUserExistenceVerificationResponse extends IBaseResponse {
    exist?: boolean,
}

export interface ISessionResponse extends IBaseResponse {
    session: null | any
}