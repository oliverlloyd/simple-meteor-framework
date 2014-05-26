/* ---------------------------------------------------- +/

## Handlebars Helpers ##

Custom Handlebars helpers.

Not restricted to a single template

/+ ---------------------------------------------------- */

Handlebars.registerHelper('sayHelloTo', function(myArgument){
  return "Hello, " + myArgument;
});
