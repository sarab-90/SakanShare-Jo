import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
export const generateTokens = (user) => {
    const accessToken = jwt.sign(
        {
            id: user.userid,
            role: user.role,
        },
        ACCESS_SECRET,
        { expiresIn: '1d' },
    );
    const refreshToken = jwt.sign(
        {
            id: user.userid,
        },
        REFRESH_SECRET,
        { expiresIn: '7d' },
    );
    return { accessToken, refreshToken };
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_SECRET);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);   
};
