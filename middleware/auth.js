const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const checkAuth = async (req, res, next) => {
    // console.log("authcheck")
    const { token } = req.cookies
    // console.log(token)
    if (!token) {
        req.flash('error', 'Unauthorised user please login')
        res.redirect('/')
    } else {
        const verifyToken = jwt.verify(token, 'duhoehkj637484hfj')
        // console.log(verifyToken)
        const data = await UserModel.findOne({ _id: verifyToken.ID })
        // console.log(data)
        req.udata = data
        console.log(req.udata)
        next()
    }
}
module.exports = checkAuth