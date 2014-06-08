/* ---------------------------------------------------- +/

## Example template js ##

The events() are where you declare the form handling for your "page". Be sure to include "return false" if 
you're handling the click event on a button or the click will actually go through to the button and your page 
will mysteriously refresh. Note also that a jQuery selector is used for the second part of the specifier; 
this means that if you have two buttons with the class "someclass" on them, the event will be assigned to 
both of them (this is usually used for the cancel event of a dialog).

The helpers() are where you declare variables you want to use on the templates. E.g., in the example above, 
if you put "{{somevariable}}" on your template, the returned string from that function will be placed on the 
template.

/+ ---------------------------------------------------- */

// Template.mytemplate.events = ({
//   'click .someclass' : function(event, template) { return false; }
// });

// Template.header.helpers({

// });

// Template.mytemplate.rendered = function() {
//   // Called once the template is rendered - once and only once.
//   // https://github.com/meteor/meteor/wiki/Using-Blaze#rendered-callback-only-fires-once

// };

