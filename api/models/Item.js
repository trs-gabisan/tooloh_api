/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      name: {
          type: 'string'
      },
      projectId: {
          model: 'project'
      },
      addedBy: {
          type: 'string'
      },
      description: {
          type: 'string'
      },
      status: {
          type: 'string',
          enum: ['pending','approved','rejected'],
          defaultsTo: 'pending'
      },
      adminApproval: {
          type: 'string',
          enum: ['pending','approved','rejected'],
          defaultsTo: 'pending'
      }
  }
};

