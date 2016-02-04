/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
      controller: 'app',
      action: 'index'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  // APP
  'post /register': {
      controller: 'app',
      action: 'register'
  },

  'post /login': {
      controller: 'app',
      action: 'login'
  },

  'post /logout': {
      controller: 'app',
      action: 'logout'
  },


  // PROJECT
  'post /project/create': {
      controller: 'project',
      action: 'createProject'
  },

  'delete /project/remove': {
      controller: 'project',
      action: 'removeProject'
  },

  'get /project/all': {
      controller: 'project',
      action: 'viewProjects'
  },

  'get /project/find': {
      controller: 'project',
      action: 'viewSingleProject'
  },

  'put /project/update': {
      controller: 'project',
      action: 'updateProject'
  },


  // USER
  'get /user/profile': {
      controller: 'user',
      action: 'viewProfile'
  },

  'get /project/me': {
      controller: 'user',
      action: 'myProjects'
  },

  'get /user/me': {
      controller: 'user',
      action: 'me'
  },


  // INVITE
  'post /invite': {
      controller: 'invite',
      action: 'invite'
  },

  'post /invite/accept': {
      controller: 'invite',
      action: 'accept'
  },

  'post /invite/decline': {
      controller: 'invite',
      action: 'decline'
  },


  // TEAM
  'post /team/create': {
      controller: 'team',
      action: 'createTeam'
  },

  'post /team/view': {
      controller: 'team',
      action: 'viewTeams'
  },


  // ITEM
    'post /item/create': {
        controller: 'item',
        action: 'createItem'
    },

    'delete /item/remove': {
        controller: 'item',
        action: 'removeItem'
    },

    'get /item/all': {
        controller: 'item',
        action: 'viewItemsByProject'
    },

    'get /item/find': {
        controller: 'item',
        action: 'viewSingleItem'
    },

    'put /item/update': {
        controller: 'item',
        action: 'updateItem'
    },


    // TASKS
    'post /task/create': {
        controller: 'task',
        action: 'createTask'
    },

    'delete /task/remove': {
        controller: 'task',
        action: 'removeTask'
    },

    'get /task/all': {
        controller: 'task',
        action: 'viewTasksByProject'
    },

    'get /task/find': {
        controller: 'task',
        action: 'viewSingleTask'
    },

    'put /task/update': {
        controller: 'task',
        action: 'updateTask'
    },


    // MESSAGE Websockets
    'post /message': {
        controller: 'message',
        action: 'addMessage'
    },

    'get /message/:roomName': {
        controller: 'message',
        action: 'addMessage'
    },


    // History
    'get /history/messages/:roomName': {
        controller: 'history',
        action: 'getAllMessage'
    },



    // LOCATION
    'post /location': {
        controller: 'location',
        action: 'setLocation'
    },

    'put /location': {
        controller: 'location',
        action: 'updateLocation'
    },

    'get /location/all': {
        controller: 'location',
        action: 'getAllLocation'
    },

    // Companies
    'get /companies': {
        controller: 'company',
        action: 'getCompanies'
    },

    // Companies
    'get /invite/users': {
        controller: 'user',
        action: 'invitedUsers'
    },

    //Invitations
    'get /invitations': {
        controller: 'invite',
        action: 'invitations'
    }
};
