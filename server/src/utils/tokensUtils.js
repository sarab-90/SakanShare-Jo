import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
export const generateTokens = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        ACCESS_SECRET,
        { expiresIn: '1d'},
    );
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_SECRET);
}
export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
        },
        REFRESH_SECRET,
        { expiresIn: '7d'},
    );
}
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);   
}
