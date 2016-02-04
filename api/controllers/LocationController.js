/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    setLocation:function (req,res) {

        var params = req.validator([
            'longitude',
            'latitude'
        ], false);

        if (!params) {
            return res.json({
                code: 400,
                message: 'Invalid Parameter'
            });
        }
        else {
            Location.destroy({
                user: req.session.user.id
            }).exec(function destroyCB(err) {

                Location.create({
                    longitude: params.longitude,
                    latitude: params.latitude,
                    user: req.session.user.id
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

            });

        }
    },

    updateLocation: function (req, res) {

        var params = req.validator([
            'user'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'User id is a required field'
            });
        }
        else {
            Location.update({user: params.user}, req.body).exec(function afterwards(err, data){

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
    },

    getAllLocation: function (req, res) {

        Location.find({}).exec(function findCB(err, data) {
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

