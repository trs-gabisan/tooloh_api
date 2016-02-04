/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    createTeam: function(req, res) {

        if(req.session.user) {
            var params = req.validator([
                'name'
            ], false);

            if (!params) {
                return res.json({
                    code: 400,
                    message: 'name is a required field'
                });
            }
            else {
                Team.create({
                    name: params.name,
                    owner: req.session.user.id
                }).exec(function createCB(err, data) {
                    if (err) {
                        return res.json({
                            code: 500,
                            message: 'Something broke'
                        });
                    }
                    else {
                        return res.json({
                            code: 200,
                            message: 'Created Successfully',
                            data: data
                        });
                    }
                });
            }

        }
        else {
            return res.json({
                code: 401,
                message: 'Unauthorized',
                data: 'Please Login'
            });
        }
    },

    viewTeams: function(req, res) {

        Team.find({owner: req.session.user.id}).exec(function findCB(err, data) {
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

