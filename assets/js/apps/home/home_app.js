define(["app", "apps/home/show/show_controller", "tpl!apps/home/show/templates/homeHolder.tpl"], 
  function(RealEstate, showController, homeTpl){
  RealEstate.module('HomeApp', function(HomeApp, RealEstate, Backbone, Marionette, $, _){

    HomeApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "home" : "showHome"
      }
    });

    var homeLayout = Backbone.Marionette.Layout.extend({
      template: homeTpl,

      regions: {
        homeSearchRegion: "#home-search-region",
        latestListingsRegion: "#latest-listings"
      }

    });

    var layout = new homeLayout();

    var API = {
      showHome: function(){
        RealEstate.mainRegion.show(layout);
        showController.showHomes(layout);
        //showController.showHome();
        RealEstate.execute("set:active:header", "home");
      }
    };

    RealEstate.on("home:show", function(){
      RealEstate.navigate("home");
      API.showHome();
    });

    RealEstate.addInitializer(function(){
      new HomeApp.Router({
        controller: API
      });
    });
  });

  return RealEstate.HomeApp;
});
