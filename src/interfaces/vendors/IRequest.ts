/**
 * Defines Custom method types over Express's Request
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { Request } from 'express';
import * as sessions from 'express-session';
import IUser from '../models/User';

export interface IRequest extends Request {
	flash(message: string, callback: any): any;

	session: Session;
	logIn(user: any, callback: any): any;
	user(): any;
	logout(): void;
}

interface Session extends sessions.Session {
	passport: Passport;
}

interface Passport {
	user: IUser;
	token: string;
}