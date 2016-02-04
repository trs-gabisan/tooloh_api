/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');

module.exports = {

    getCompanies: function(req, res) {
        User.find({}).exec(function findCB(err, found){
            if(err) {
                return res.json([]);
            }
            else {
                return res.json(_.uniq(_.pluck(found, 'company')));
            }
        });
    }
};

