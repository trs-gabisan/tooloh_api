/**
* Task.js
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
      projectId: {
          type: 'string'
      },
      assignTo: {
          type: 'string'
      },
      addedBy: {
          type: 'string'
      },
      status: {
          type: 'string',
          enum: ['pending','approved','rejected'],
          defaultsTo: 'pending'
      },
      status2: {
          type: 'string',
          enum: ['pending','approved','rejected'],
          defaultsTo: 'pending'
      }
  }
};

