export const generateToken = async (user, message, statusCode, res) => {
    const token = await user.generateJsonWebToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'production',
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
};
