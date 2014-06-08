/* ---------------------------------------------------- +/

## Models ##

Our datasets or tables

Uses collection-hooks - https://github.com/matb33/meteor-collection-hooks/

/+ ---------------------------------------------------- */

Projects = new Meteor.Collection('projects');


Projects.before.insert(function (userId, doc) {
  doc.createdOn = Date.now();
});

Projects.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set.modifiedOn = Date.now();
});