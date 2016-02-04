/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    viewProfile: function(req, res) {

        if(req.session.user) {

            User.findOne({id: req.session.user.id})
                .populate('projects')
                .exec(function findOneCB(err, data) {

                if(err) {
                    return res.json({
                        code: 500,
                        message: 'Something broke'
                    });
                }
                else {
                    return res.json({
                        code: 200,
                        messsage: 'Success',
                        data: data
                    });
                }
            });

        }
        else {
            return res.json({
                code: 401,
                message: 'Unauthorized',
                data: 'Please Login'
            });
        }
    },

    myProjects: function(req, res) {

        Project.find({company: req.param('company')}).populate('items').exec(function findCB(err, data) {
            if (err) {
                return res.json({
                    code: 500,
                    message: 'Something broke'
                });
            }
            else {
                return res.json({
                    code: 200,
                    message: 'Success',
                    data: data
                });
            }

        });
    },

    me: function(req, res) {

        if(req.session.user) {
            return res.json({
                code: 200,
                message: 'Success',
                data: req.session.user
            });
        }
        else {
            return res.json({
                code: 401,
                message: 'Unauthorized',
                data: 'Please Login'
            });
        }
    },

    invitedUsers: function(req, res) {

        User.find({userRole:'member', company: {'!': req.session.user.company}, hasInvitation: 'none'}).exec(function findCB(err, data) {
            if(err) {
                return res.json({
                    code: 500,
                    message: 'Something broke'
                });
            }
            else {
                return res.json({
                    code:200,
                    message: 'Success',
                    data: data
                });
            }
        });
    }
};

