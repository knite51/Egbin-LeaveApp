const orm = require('../orm'); 

const Employee = orm.Model.extend({
    tableName: 'employees',
    hasTimestamps: true,
    organization: function() {
        return this.belongsTo('Organization');
    }
});

module.exports = orm.model('Employee', Employee);