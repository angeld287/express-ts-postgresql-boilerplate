/**
 * Handles the logout request
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { IRequest, IResponse } from '../../../interfaces/vendors';
import Log from '../../../middlewares/Log';

class Logout {
	public static async perform(req: IRequest, res: IResponse): Promise<any> {

		req.session.destroy((err) => {
			if (err) {
				Log.error(`Error : Failed to destroy the session during logout ` + err);
			}

			return res.status(200).json({
				msg: 'The session has been closed successfully',
				session: req.session
			});
		});
	}
}

export default Logout;