export interface IRecaptchaResponse {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    score: number;
    action: string;
}


export interface IRevalidateRecaptchaResponse {
    success: boolean;
    message: string;
}
