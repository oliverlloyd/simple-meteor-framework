/* ---------------------------------------------------- +/

## Projects ##

Code related to the projects template

/+ ---------------------------------------------------- */

Session.setDefault('projectFilter', '');
Session.setDefault('tableLimit', 2);
Session.setDefault('paginationCount', 1);
Session.setDefault('selectedPagination', 0);
Session.setDefault('skipCount', 0);


Router.map(function() {
  this.route('projects', {
    waitOn: function () {
      return Meteor.subscribe('allProjects');
    },
    data: function () {
      var projectsCount = Projects.find({name: { $regex: Session.get('projectFilter'), $options: 'i' }}).count();
      Session.set('paginationCount', Math.floor((projectsCount - 1) / Session.get('tableLimit')) + 1);
      return {
        projects: Projects.find(
          {name: { $regex: Session.get('projectFilter'), $options: 'i' }},
          {
            limit: Session.get('tableLimit'),
            skip: Session.get('skipCount'),
            sort: {_id: -1}
          }
        )
      };
    }
  });
});


Template.projects.created = function () {
  //
};

Template.projects.helpers({
  isIncomplete : function(complete) {
    if ( complete ) return false;
    else return true;
  },
  paginationItems: function(){
    var paginationArray = [];
    for (var i = 0; i < Session.get('paginationCount'); i++) {
      paginationArray[i] = {
        index: i
      };
    }
    if ( paginationArray.length > 1 ){
      return paginationArray;
    } else {
      return [];
    }
  },
  isTenActive: function(){
    if(Session.get('tableLimit') === 2){
      return "active";
    }
  },
  isTwentyActive: function(){
    if(Session.get('tableLimit') === 4){
      return "active";
    }
  },
  isFiftyActive: function(){
    if(Session.get('tableLimit') === 6){
      return "active";
    }
  },
  isHundredActive: function(){
    if(Session.get('tableLimit') === 12){
      return "active";
    }
  },
  countOfProjects: function(){
    var count = Projects.find().count();
    var msg = 'You have access to ' + count;
    if ( count == 1 )
      msg += ' project';
    else
      msg += ' projects';
    return msg;
  }  
});

Template.projects.rendered = function () {
  //
};

Template.projects.events({
  'click .goto-createproject': function (event, template) {
    var self = this;
    Router.go('createproject');
  },  

  'click .project.remove': function (event, template) {
    var project = this;
    Meteor.call('removeProject', project, function(error, result){
      // alert('Project deleted.');
    });
    return false;
  },
  'keyup #projectFilter':function(){
    Session.set('projectFilter', $('#projectFilter').val());
    Session.set('skipCount', 0);
    Session.set('selectedPagination', 0);
  },
  'click .tableLimit':function(){
    // The value of the item clicked upon
    var thisLimit = $(event.target).text();
    // We only need to reset when the limit has actiually changed
    if ( Session.get('tableLimit') != thisLimit ) { // Note. Don't use !== here as the types are different. string vs. number
      Session.set('skipCount', 0);
      Session.set('selectedPagination', 0);
    }
  },
  'click #tenButton':function(){
    Session.set('tableLimit', 2);
  },
  'click #twentyButton':function(){
    Session.set('tableLimit', 4);
  },
  'click #fiftyButton': function(){
    Session.set('tableLimit', 6);
  },
  'click #hundredButton': function(){
    Session.set('tableLimit', 12);
  },
  'click .pagination.item':function(){
    // alert(JSON.stringify(this.index));
    Session.set('selectedPagination', this.index);
    Session.set('skipCount', this.index * Session.get('tableLimit'));
  },
});

Template.paginationItem.helpers({
  pageActive: function(){
    if(this.index === Session.get('selectedPagination')){
      return "active";
    }
  },
  getPage: function(){
    return this.index + 1;
  }
});