/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

    index: function(req, res) {
        return res.json({
            code: 200,
            message: 'Successfully connected to API'
        });
    },

    register: function(req, res) {

        var params = req.validator([
            'userRole',
            '?company',
            'username',
            'password',
            { email: 'email' },
            'firstName',
            'lastName'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Invalid Parameter'
            });
        }
        else {
            User.find({
                or: [
                    {username: params.username},
                    {email: params.email}
                ]
            }).exec(function findCB(err, data) {

                if(data.length > 0) {
                    return res.json({
                        code: 400,
                        message: 'Username or Email is already taken'
                    });
                }
                else {

                    if(params.userRole == 'admin') {

                        if(params.company) {
                            User.find({
                                company: params.company
                            }).exec(function findCB(errCompany, data) {
                                if(data.length > 0) {
                                    return res.json({
                                        code: 400,
                                        message: 'Company is already taken'
                                    });
                                }
                                else {
                                    bcrypt.genSalt(10, function (err, salt) {

                                        bcrypt.hash(params.password, salt, function (errHash, hash) {

                                            if (errHash) {
                                                return res.json({
                                                    code: 500,
                                                    message: 'Registration Failed'
                                                });
                                            }
                                            else {
                                                User.create({
                                                    userRole: params.userRole,
                                                    company: params.company,
                                                    username: params.username,
                                                    firstName: params.firstName,
                                                    lastName: params.lastName,
                                                    email: params.email,
                                                    password: hash
                                                }).exec(function createCB(err, data) {

                                                    if (err) {
                                                        return res.json({
                                                            code: 500,
                                                            message: 'Registration Failed'
                                                        });
                                                    }
                                                    else {
                                                        var userData = {
                                                            id: data.id,
                                                            userRole: data.userRole,
                                                            company: data.company,
                                                            username: data.username,
                                                            firstName: data.firstName,
                                                            lastName: data.lastName,
                                                            email: data.email
                                                        };

                                                        req.session.user = userData;

                                                        return res.json({
                                                            code: 200,
                                                            message: 'Successfully Registered',
                                                            data: userData
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }
                            });
                        }
                        else {
                            return res.json({
                                code: 400,
                                message: 'Company Field is Required'
                            });
                        }
                    }
                    else {
                        bcrypt.genSalt(10, function (err, salt) {

                            bcrypt.hash(params.password, salt, function (errHash, hash) {

                                if (errHash) {
                                    return res.json({
                                        code: 500,
                                        message: 'Registration Failed'
                                    });
                                }
                                else {
                                    User.create({
                                        userRole: params.userRole,
                                        company: 'DEFAULT#101',
                                        username: params.username,
                                        firstName: params.firstName,
                                        lastName: params.lastName,
                                        email: params.email,
                                        password: hash
                                    }).exec(function createCB(err, data) {

                                        if (err) {
                                            return res.json({
                                                code: 500,
                                                message: 'Registration Failed'
                                            });
                                        }
                                        else {
                                            var userData = {
                                                id: data.id,
                                                userRole: data.userRole,
                                                company: data.company,
                                                username: data.username,
                                                firstName: data.firstName,
                                                lastName: data.lastName,
                                                email: data.email
                                            };

                                            req.session.user = userData;

                                            return res.json({
                                                code: 200,
                                                message: 'Successfully Registered',
                                                data: userData
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    }
                }
            });
        }
    },

    login: function(req, res) {

        var params = req.validator([
            'username',
            'password'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Invalid Parameter'
            });
        }
        else {
            User.findOne({username: params.username}).exec(function findOneCB(err, data) {

                if(err) {
                    return res.json({
                        code: 400,
                        message: 'Invalid Username'
                    });
                }
                else {
                    if(data) {
                        bcrypt.compare(params.password, data.password, function (err, status) {
                            if (err) {
                                return res.json({
                                    code: 500,
                                    message: 'Login Failed'
                                });
                            }
                            else {
                                if (status == true) {

                                    var userData = {
                                        id: data.id,
                                        userRole: data.userRole,
                                        company: data.company,
                                        username: data.username,
                                        firstName: data.firstName,
                                        lastName: data.lastName,
                                        email: data.email
                                    };

                                    req.session.user = userData;

                                    return res.json({
                                        code: 200,
                                        message: 'Login Successfully',
                                        data: userData
                                    });
                                }
                                else {
                                    return res.json({
                                        code: 400,
                                        message: 'Invalid Password'
                                    });
                                }
                            }
                        });
                    }
                    else {
                        return res.json({
                            code: 400,
                            message: 'Invalid Username'
                        });
                    }
                }
            });
        }

    },

    logout: function(req, res) {
        req.session.destroy(function(err) {
            if(err) {
                return res.json({
                    code: 500,
                    message: "Logout Failed"
                });
            }
            return res.json({
                code: 200,
                message: "Logout Successfully"
            });
        });
    }
};

