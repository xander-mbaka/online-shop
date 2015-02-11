define(["app", "apps/about/show/show_view"], function(RealEstate, View){
  RealEstate.module('AboutApp.Show', function(Show, RealEstate, Backbone, Marionette, $, _){
    Show.Controller = {
      showAbout: function(){
        var view = new View.About();
        RealEstate.mainRegion.show(view);
      }
    };
  });

  return RealEstate.AboutApp.Show.Controller;
});
