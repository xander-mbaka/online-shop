define(["app", "tpl!apps/about/show/templates/about.tpl"], function(RealEstate, aboutTpl){
  RealEstate.module('AboutApp.Show.View', function(View, RealEstate, Backbone, Marionette, $, _){
    View.About = Marionette.ItemView.extend({
      template: aboutTpl 
    });
  });

  return RealEstate.AboutApp.Show.View;
});
