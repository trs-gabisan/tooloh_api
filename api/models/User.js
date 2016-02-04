/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
      userRole: {
          type: 'string',
          enum: ['admin','member'],
          defaultsTo: 'member'
      },
      company: {
        type: 'string'
      },
      hasInvitation: {
          enum: ['none','pending', 'accepted', 'declined'],
          defaultsTo: 'none'
      },
  	  firstName:{
        type:"string", 
        required:true
      },
      lastName:{
        type:"string",
        required:true
      },
      email:{
        type:"email",
        required:true,
        unique: true
      },
      username:{
      	type:"string",
      	required:true,
        unique:true
      },
      password:{
      	type:"string",
      	required:true
      },
      projects: {
        collection: 'project',
        via: 'userId'
      },
      toJSON: function() {
          var obj = this.toObject();
          delete obj.password;
          return obj;
      }
  }
};

