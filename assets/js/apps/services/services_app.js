define(["app", "apps/services/show/show_controller"], function(RealEstate, showController){
  RealEstate.module('ServicesApp', function(ServicesApp, RealEstate, Backbone, Marionette, $, _){

    ServicesApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "services" : "showServices"
      }
    });

    var API = {
      showServices: function(){
        showController.showServices();
        RealEstate.execute("set:active:header", "services");
      }
    };

    RealEstate.on("services:show", function(){
      RealEstate.navigate("services");
      API.showServices();
    });

    RealEstate.addInitializer(function(){
      new ServicesApp.Router({
        controller: API
      });
    });
  });

  return RealEstate.ServicesApp;
});
