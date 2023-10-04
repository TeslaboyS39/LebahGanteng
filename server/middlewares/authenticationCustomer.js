const { verifyToken } = require("../helpers/jwt");
const { Customer } = require('../models');

async function authenticationCustomer(req, res, next) {
    try {
        console.log(req.headers);
        // proses pengecekan apakah client mengirimkan headers access_token
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: 'unauthenticated' }
        }

        // proses decoding access_token
        const payload = verifyToken(access_token);
        // console.log(payload, '<<<<THIS IS PAYLOAD');

        // proses pengecekan apakah user ada di db atau tidak
        const findCustomer = await Customer.findByPk(payload.id)
        if (!findCustomer) {
            throw { name: 'unauthenticated' }
        }

        // proses penyimpanan data ke req (sementara)
        // console.log(findUser, '<<< INI USER')
        req.customer = {
            id: findCustomer.id,
            role: findCustomer.role,
            email: findCustomer.email
        }

        next();        
    } catch (error) {
        console.log(error, '<<<<< ini bre');
        next(error);
    }
}

module.exports = authenticationCustomer;