/**
 * InviteController
 *
 * @description :: Server-side logic for managing invites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    invite: function(req, res) {
        var params = req.validator([
            'to'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Invalid Parameter'
            });
        }
        else {
            Invite.find()
                .where({from: req.session.user.id})
                .where({to: params.to})
                .exec( function findCB(err, data) {
                    if(data.length > 0) {
                        return res.json({
                            code: 400,
                            message: 'Already Invited'
                        });
                    }
                    else {
                        Invite.create({
                            from: req.session.user.id,
                            to: params.to,
                            status: 'pending',
                            company: req.session.user.company
                        }).exec(function createCB(err, data) {


                            User.update({id: params.to}, {hasInvitation:'pending'}).exec(function afterwards(usererr, userdata) {

                                if (err) {
                                    return res.json({
                                        code: 500,
                                        message: 'Invitation Failed'
                                    });
                                }
                                else {
                                    return res.json({
                                        code: 200,
                                        message: 'Successfully Invited',
                                        data: data
                                    });
                                }
                            });

                        });
                    }
                });
        }
    },

    accept: function(req, res) {

        Invite.update({to: req.session.user.id}, {status: 'accepted'}).exec(function afterwards(err, data){

            User.update({id: req.session.user.id}, {hasInvitation:'accepted', company: req.param('company')}).exec(function afterwards(usererr, userdata) {
                if (err) {
                    return res.json({
                        code: 500,
                        message: 'Something broke'
                    });
                }
                else {
                    req.session.user = userdata;

                    return res.json({
                        code: 200,
                        message: 'Success',
                        data: userdata
                    });
                }
            });

        });
    },

    decline: function(req, res) {

        //Invite.update({to: req.session.user.id}, {status: 'declined'}).exec(function afterwards(err, data){

            //User.update({id: req.session.user.id}, {hasInvitation:'none'}).exec(function afterwards(usererr, userdata){
            //    if (err) {
            //        return res.json({
            //            code: 500,
            //            message: 'Something broke'
            //        });
            //    }
            //    else {
            //        return res.json({
            //            code: 200,
            //            message: 'Success',
            //            data: data
            //        });
            //    }
            //});

        //});
    },

    invitations: function(req, res) {

        Invite.find({to: req.session.user.id, status: 'pending'}).exec(function findCB(err, data) {
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
    }
};

