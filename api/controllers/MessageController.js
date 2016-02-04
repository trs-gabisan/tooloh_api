/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    addMessage:function (req,res) {

        var data_from_client = req.params.all();

        if(req.isSocket && req.method === 'POST'){

            // This is the message from connected client
            // So add new conversation
            Message.create(data_from_client)
                .exec(function(error,data_from_client){
                    console.log(req.param('roomName'));
                    Message.message(req.param('roomName'), {id: data_from_client.id, message : data_from_client.message , user:data_from_client.user});
                });
        }
        else if(req.isSocket){

            console.log(req.param('roomName'));
            // subscribe client to model changes

            Message.subscribe(req, [req.param('roomName')], ['message']);
            console.log( 'User subscribed to ' + req.socket.id );
        }
    }
};

