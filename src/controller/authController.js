import {generateToken} from '../services/userService.js'

export const userAuth = (req, res) => {

    //token generate to authentication
    const token = generateToken(req.user.email)

    const user = [
        {token},
        req.user
    ]

    res.status(200).send(user)
}
