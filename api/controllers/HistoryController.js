/**
 * HistoryController
 *
 * @description :: Server-side logic for managing history
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getAllMessage: function (req, res) {

        var room = req.param('roomName');
        Message.find({roomName: room}).exec(function findCB(err, data) {
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