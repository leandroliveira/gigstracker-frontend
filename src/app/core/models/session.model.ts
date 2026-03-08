export interface Session {
    accessToken: string;
    refreshToken: string;
    expiresAt: number | undefined;
    userId: string;
    email: string | undefined;
}
