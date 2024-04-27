const CookieToken = (user, res, token) => {

    const options = {
        expiresIn : new Date(
            Date.now() + parseInt(process.env.COOKIE_TIME) * 1000
            ),
        httpOnly : true
    }

    user.password = undefined;

    res.status(200).cookie('token', token, options).json(
        {
            success : true,
            token,
            user
        }
    )
}

export { CookieToken }