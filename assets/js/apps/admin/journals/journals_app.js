define(["app_admin", "tpl!apps/admin/journals/show/templates/lightbox.tpl"], function(LightningAbstracts, lightboxTpl){
  LightningAbstracts.module('JournalsApp', function(JournalsApp, LightningAbstracts, Backbone, Marionette, $, _){

    JournalsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "journals" : "showJournals",
        "categories" : "showCategories",
      }
    });

    var lightboxLayout = Backbone.Marionette.Layout.extend({
      template: lightboxTpl,

      regions: {
        lightbox: ".lightbox"
      }
    });

    var lightboxLayout = new lightboxLayout();

    var API = {
      showJournals: function(){
        require(["apps/admin/journals/show/show_controller"], function(ShowController){
          ShowController.showJournals(lightboxLayout);
          LightningAbstracts.execute("set:active:header", "journals");
        });
      },

      showCategories: function(){
        require(["apps/admin/journals/show/show_controller"], function(ShowController){
          ShowController.showCategories(lightboxLayout);
          LightningAbstracts.execute("set:active:header", "journals");
        });
      }
    };

    LightningAbstracts.on("journals:show", function(){
      LightningAbstracts.navigate("journals");
      API.showJournals();
    });

    LightningAbstracts.on("categories:show", function(){
      LightningAbstracts.navigate("categories");
      API.showCategories();
    });

    LightningAbstracts.addInitializer(function(){
      new JournalsApp.Router({
        controller: API
      });
    });
  });

  return LightningAbstracts.JournalsApp;
});
