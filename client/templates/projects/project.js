/* ---------------------------------------------------- +/

## Item ##

Code related to the project template

/+ ---------------------------------------------------- */

Template.project.created = function () {
  //
};

Template.project.helpers({
  
  myHelper: function () {
    //
  }

});

Template.project.rendered = function () {
  //
};

Template.project.events({

  'click .delete': function(e, instance){
    var project = this;
    e.preventDefault();
    Meteor.call('removeProject', project, function(error, result){
      alert('Project deleted.');
      Router.go('/projects');
    });
  }

});