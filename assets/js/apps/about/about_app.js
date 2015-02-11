define(["app"], function(RealEstate){
  RealEstate.module('AboutApp', function(AboutApp, RealEstate, Backbone, Marionette, $, _){

    AboutApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "about" : "showAbout"
      }
    });

    var API = {
      showAbout: function(){
        require(["apps/about/show/show_controller"], function(ShowController){
          ShowController.showAbout();
          RealEstate.execute("set:active:header", "about");
        });
      }
    };

    RealEstate.on("about:show", function(){
      RealEstate.navigate("about");
      API.showAbout();
    });

    RealEstate.addInitializer(function(){
      new AboutApp.Router({
        controller: API
      });
    });
  });

  return RealEstate.AboutApp;
});
