export interface TokenApiIfoodInterface {
    accessToken: string;
    type: string;
    expiresIn: number;
}

export interface TokenBdIfoodInterface extends TokenApiIfoodInterface  {
    createdAt: Date;
}

export interface ApiResponseInterface {
    success: boolean;
    createdAt: Date;
    from: String;
}


export interface TokenApiResponseIfoodInterface extends TokenApiIfoodInterface, ApiResponseInterface {
}