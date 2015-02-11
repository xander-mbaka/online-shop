define(["app_admin", "apps/admin/dashboard/show/show_controller"], 
  function(LightningAbstracts, showController, dashboardTpl){
  LightningAbstracts.module('DashApp', function(DashApp, LightningAbstracts, Backbone, Marionette, $, _){

    DashApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "dashboard" : "showDash"
      }
    });

    var API = {
      showDash: function(){
        require(["apps/admin/entities/lightning"], function(){
          $.when(LightningAbstracts.request("dashboard:entities")).done(function(content){
            if(content !== undefined){
              LightningAbstracts.execute("set:active:header", "dashboard");
              showController.showDashboard(content);
            }
          });
        });
      }
    };

    LightningAbstracts.on("dash:show", function(){
      LightningAbstracts.navigate("dashboard");
      API.showDash();
    });

    LightningAbstracts.addInitializer(function(){
      new DashApp.Router({
        controller: API
      });
    });
  });

  return LightningAbstracts.DashApp;
});
