define(["app", "apps/services/show/show_view"], function(RealEstate, View){
  RealEstate.module('ServicesApp.Show', function(Show, RealEstate, Backbone, Marionette, $, _){
    Show.Controller = {

      showServices: function(){
        var view = new View.Services();
        RealEstate.mainRegion.show(view);
      }
    };
  });

  return RealEstate.ServicesApp.Show.Controller;
});
