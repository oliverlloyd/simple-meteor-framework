/* ---------------------------------------------------- +/

## Create New Project ##

Code related to the createproject template

/+ ---------------------------------------------------- */

Router.map(function() {
  this.route('createproject');
});

Template.createproject.created = function () {
  //
};

Template.createproject.helpers({
  //
});

Template.createproject.rendered = function () {
  // Form validation - http://semantic-ui.com/modules/form.html
  $('.ui.form.createproject').form({
    projectName: {
      identifier  : 'project-name', // matches the name attribute
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter a name'
        },
        {
          type   : 'length[3]',
          prompt : 'The name needs to be at least 3 characters'
        }
      ]
    },
    desciption: {
      identifier  : 'project-description', // matches the name attribute
      rules: [
        {
          type   : 'empty',
          prompt : 'Please enter a description'
        }
      ]
    }
  });
};

Template.createproject.events({
  'click .create.project': function (event, template) {
    var self = this;
    
    // Create a project object to submit
    var project = {
      name: template.find("input[name=project-name]").value,
      description: template.find("input[name=project-description]").value,
      complete: false,
      num: 123
    };

    $('.ui.form.createproject').form('setting', { // http://semantic-ui.com/modules/form.html
      onFailure    : function(){
        return false;
      },
      onSuccess    : function(){
        Meteor.call('createProject', project, function(error, id){
          // at this point we should move on to creating services, not route to the project page
          Router.go('project',{_id: id});
        });      
        return false;
      }
    });

    $('.ui.form.createproject').form('validate form'); // http://semantic-ui.com/modules/form.html

    return false;
  }
});