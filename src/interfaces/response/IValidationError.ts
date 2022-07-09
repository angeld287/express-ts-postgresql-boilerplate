export interface IValidationError {
    value?: string;
    message: string;
    param?: string;
    location?: string;
    error?: boolean
}
