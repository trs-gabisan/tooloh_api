/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    createItem: function(req, res) {

        if(req.session.user) {
            var params = req.validator([
                'name',
                'projectId',
                'description'
            ], false);

            if (!params) {
                return res.json({
                    code: 400,
                    message: 'Invalid Parameter'
                });
            }
            else {
                Item.create({
                    name: params.name,
                    projectId: params.projectId,
                    addedBy: req.session.user.id,
                    description: params.description
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

    removeItem: function(req, res) {

        var params = req.validator([
            'id'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Project id is a required field'
            });
        }
        else {
            Item.destroy({
                id: params.id
            }).exec(function destroyCB(err) {
                if (err) {
                    return res.json({
                        code: 500,
                        message: 'Something broke'
                    });
                }
                else {
                    return res.json({
                        code: 200,
                        message: 'Deleted Successfully'
                    });
                }
            });
        }
    },

    updateItem: function(req, res) {

        var params = req.validator([
            'id'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Project id is a required field'
            });
        }
        else {
            Item.update({id: params.id}, req.body).exec(function afterwards(err, data){

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

    viewItemsByProject: function(req, res) {

        var params = req.validator([
            'projectId'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Project id is a required field'
            });
        }
        else {
            Item.find({projectId: params.projectId}).exec(function findCB(err, data) {
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

    viewSingleItem: function(req, res) {

        var params = req.validator([
            'id'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Project id is a required field'
            });
        }
        else {
            Item.findOne({id: params.id}).exec(function findOneCB(err, data){

                if (err) {
                    return res.json({
                        code: 500,
                        message: 'Something broke'
                    });
                }
                else {
                    if(data) {
                        return res.json({
                            code: 200,
                            message: 'Success',
                            data: data
                        });
                    }
                    else {
                        return res.json({
                            code: 404,
                            message: 'Not Found'
                        });
                    }
                }

            });
        }

    }
};

