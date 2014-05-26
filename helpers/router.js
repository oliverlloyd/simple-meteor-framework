/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Filters

// var filters = {

//   myFilter: function () {
//     // do something
//   },

//   isLoggedIn: function() {
//     if (!(Meteor.loggingIn() || Meteor.user())) {
//       alert('Please Log In First.')
//       this.stop(); 
//     }
//   }

// }

// Router.before(filters.myFilter, {only: ['items', 'item']});

// Routes

Router.map(function() {

  // Projects

  this.route('projects', {
    waitOn: function () {
      return Meteor.subscribe('allProjects');
    },
    data: function () {
      return {
        projects: Projects.find()
      }
    }
  });

  this.route('project', {
    path: '/projects/:_id',
    waitOn: function () {
      return Meteor.subscribe('aProject', this.params._id);
    },
    data: function () {
      return {
        project: Projects.findOne(this.params._id)
      }
    }
  });

  this.route('homepage', {
    path: '/'
  });

  this.route('content');
  this.route('about');
});
