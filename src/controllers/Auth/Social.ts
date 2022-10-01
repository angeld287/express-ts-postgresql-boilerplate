/**
 * Handle all your social auth routesß
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

class Social {
	public static googleCallback(req, res): any {
		return res.redirect('/account');
	}
}

export default Social;
