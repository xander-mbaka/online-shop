define(["app", "tpl!apps/services/show/templates/services.tpl"], function(RealEstate, servicesTpl){
  RealEstate.module('ServicesApp.Show.View', function(View, RealEstate, Backbone, Marionette, $, _){
    View.Services = Marionette.ItemView.extend({
      template: servicesTpl 
    });
  });

  return RealEstate.ServicesApp.Show.View;
});
