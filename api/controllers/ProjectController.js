/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    createProject: function(req, res) {

        if(req.session.user) {
            var params = req.validator([
                'name',
                '?description'
            ], false);

            if (!params) {
                return res.json({
                    code: 400,
                    message: 'name is a required field'
                });
            }
            else {
                Project.create({
                    name: params.name,
                    description: params.description ? params.description : '',
                    role: 'admin',
                    userId: req.session.user.id,
                    company: req.session.user.company
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

    removeProject: function(req, res) {

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
            Project.destroy({
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

    updateProject: function(req, res) {

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
            Project.update({id: params.id}, req.body).exec(function afterwards(err, data){

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

    viewProjects: function(req, res) {

        Project.find({}).exec(function findCB(err, data) {
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

    viewSingleProject: function(req, res) {

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
            Project.findOne({id: params.id}).exec(function findOneCB(err, data){

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

