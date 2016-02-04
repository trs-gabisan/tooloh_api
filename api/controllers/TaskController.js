/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    createTask: function(req, res) {

        if(req.session.user) {
            var params = req.validator([
                'name',
                'projectId',
                'description',
                'assignTo'
            ], false);

            if (!params) {
                return res.json({
                    code: 400,
                    message: 'Invalid Parameter'
                });
            }
            else {
                Task.create({
                    name: params.name,
                    projectId: params.projectId,
                    addedBy: req.session.user.id,
                    assignTo: params.userId,
                    description: params.description,
                    status: 'pending',
                    status2: 'pending'
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

    removeTask: function(req, res) {

        var params = req.validator([
            'id'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Task id is a required field'
            });
        }
        else {
            Task.destroy({
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

    updateTask: function(req, res) {

        var params = req.validator([
            'id'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Task id is a required field'
            });
        }
        else {
            Task.update({id: params.id}, req.body).exec(function afterwards(err, data){

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

    viewTasksByProject: function(req, res) {

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
            Task.find({projectId: params.projectId}).exec(function findCB(err, data) {
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

    viewSingleTask: function(req, res) {

        var params = req.validator([
            'id'
        ], false);

        if(!params) {
            return res.json({
                code: 400,
                message: 'Task id is a required field'
            });
        }
        else {
            Task.findOne({id: params.id}).exec(function findOneCB(err, data){

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

