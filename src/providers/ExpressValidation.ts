/**
 * Class to format the validation error results
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

import { ResultFactory, ValidationError, validationResult } from 'express-validator';
import { IValidationError } from '../interfaces/response/IValidationError';

class ExpressValidator {
    public validator: ResultFactory<IValidationError>;
    constructor() {
        this.validator = validationResult.withDefaults({
            formatter: error => {
                const { msg, ...formatedError } = error;
                return {
                    message: error.msg,
                    ...formatedError
                };
            },
        })
    }
}

export default ExpressValidator;