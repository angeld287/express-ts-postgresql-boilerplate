/**
 * Handles the logout request
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { SuccessResponse } from '../../../core/ApiResponse';
import { IRequest, IResponse } from '../../../interfaces/vendors';
import Log from '../../../middlewares/Log';

class Logout {
	public static async perform(req: IRequest, res: IResponse): Promise<any> {

		req.session.destroy((err) => {
			if (err) {
				Log.error(`Error : Failed to destroy the session during logout ` + err);
			}

			//req.logout();
			return new SuccessResponse('Success', {
				message: 'The session has been closed successfully',
				session: req.session
			}).send(res);
		});
	}
}

export default Logout;