/**
* Project.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    role: {
        type: 'string',
        enum: ['admin','member'],
        defaultsTo: 'member'
    },
    userId: {
        model: 'user'
    },
    company: {
        type: 'string'
    },
    items: {
        collection: 'item',
        via: 'projectId'
    }
  }
};

