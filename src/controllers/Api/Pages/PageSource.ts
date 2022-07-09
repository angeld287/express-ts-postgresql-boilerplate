/**
 * Get the html body of a web page
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { InternalErrorResponse, SuccessResponse } from '../../../core/ApiResponse';
import { IRequest, IResponse } from '../../../interfaces/vendors';
import Log from '../../../middlewares/Log';
import ExpressValidator from '../../../providers/ExpressValidation';
var request = require('request');

class PageSource {
    public static async getPageSource(req: IRequest, res: IResponse): Promise<any> {
        try {
            const errors = new ExpressValidator().validator(req);

            if (!errors.isEmpty()) {
                return new SuccessResponse('Success', {
                    errors: errors.array()
                }).send(res);
            }

            request(req.body.url, function (error, response, body) {
                if (error !== null) {
                    return new SuccessResponse('Success', {
                        success: false,
                        url: req.body.url,
                        response: null,
                        error: error
                    }).send(res);
                }
                return new SuccessResponse('Success', {
                    success: true,
                    url: req.body.url,
                    response: response,
                    error: null
                }).send(res);
            });
        } catch (error) {
            Log.error(`Internal Server Error ` + error);
            return new InternalErrorResponse('Page Source Error', {
                error: 'Internal Server Error',
            }).send(res);
        }
    }
}

export default PageSource;