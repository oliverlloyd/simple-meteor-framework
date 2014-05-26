/* ---------------------------------------------------- +/

## Server Methods ##

These are called by the client using Meteor.call()

They are where the crud work is done

/+ ---------------------------------------------------- */


Meteor.methods({
  createProject: function(project) {
    if( allowedTo.createProject(Meteor.user(), project) && isAcceptable(project) ){
      project.owner = this.userId;
      var id = Projects.insert(project);
      return id;
    } else {
      throw new Meteor.Error(403, 'You do not have the rights to create this project.');
    }
  },
  removeProject: function(project) {
    check(arguments, [Match.Any])
    if( allowedTo.removeProject(Meteor.user(), project) ){
      Projects.remove({_id: project._id});
    } else {
      throw new Meteor.Error(403, 'You do not have the rights to delete this project.');
    }
  },
  updateProject: function(project, fields) {
    if ( fields.hasOwnProperty('name') ) check(fields.name, nonEmptyString);
    if ( fields.hasOwnProperty('public') ) check(fields.public, Boolean);
    if ( fields.hasOwnProperty('_id') ) delete fields._id; // This property should never be present

    if( allowedTo.updateProject(Meteor.user(), project) ){
      Projects.update(project, {$set: fields});
    } else {
      throw new Meteor.Error(403, 'You do not have the rights to update this project.');
    }
  }
});

// Validates the project object
var isAcceptable = function(project){
  check(project, {
    name: nonEmptyString,
    public: Match.Optional(Boolean),
    _id: Match.Optional(nonEmptyString)
  });

  if (project.name.length > 3)
    throw new Meteor.Error(413, "Name too long");
  if (! Meteor.user())
    throw new Meteor.Error(403, "You must be logged in");
  else 
    return true;
};

var nonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length !== 0;
});
