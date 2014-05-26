/* ---------------------------------------------------- +/

## Items ##

Code related to the projects template

/+ ---------------------------------------------------- */

Template.projects.created = function () {
  //
};

Template.projects.helpers({
  //
});

Template.projects.rendered = function () {
  //
};

Template.projects.events({
  'click .create': function (event, template) {
    var self = this;
    var project = {
      name: template.find(".name").value
    };
    Meteor.call('createProject', project, function(error, result){
      // Router.go('/projects');
    });
    return false;
  },

  'click .remove': function (event, template) {
    var project = this;
    Meteor.call('removeProject', project, function(error, result){
      // alert('Project deleted.');
    });
    return false;
  },
});