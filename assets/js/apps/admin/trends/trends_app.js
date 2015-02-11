define(["app_admin"], function(LightningAbstracts){
  LightningAbstracts.module('TrendsApp', function(TrendsApp, LightningAbstracts, Backbone, Marionette, $, _){

    TrendsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "trends" : "showTrends"
      }
    });

    var API = {
      showTrends: function(){
        require(["apps/admin/trends/show/show_controller"], function(ShowController){
          ShowController.showTrends();
          LightningAbstracts.execute("set:active:header", "trends");
        });
      }
    };

    LightningAbstracts.on("trends:show", function(){
      LightningAbstracts.navigate("trends");
      API.showTrends();
    });

    LightningAbstracts.addInitializer(function(){
      new TrendsApp.Router({
        controller: API
      });
    });
  });

  return LightningAbstracts.TrendsApp;
});
