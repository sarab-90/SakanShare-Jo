import cookieParser from 'cookie-parser';
export const setAccessTokenCookie = (res, token) => {
    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000, 
    });
}
export const setRefreshTokenCookie = (res, token) => {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}
export const clearAuthCookies = (res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
}