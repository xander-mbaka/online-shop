define(["app_admin", "tpl!apps/admin/journals/show/templates/lightbox.tpl"], function(LightningAbstracts, lightboxTpl){
  LightningAbstracts.module('SubscribersApp', function(SubscribersApp, LightningAbstracts, Backbone, Marionette, $, _){

    SubscribersApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "subscribers" : "showSubscribers"
      }
    });

    var lightboxLayout = Backbone.Marionette.Layout.extend({
      template: lightboxTpl,

      regions: {
        lightbox: ".lightbox"
      }
    });

    var lightbox = new lightboxLayout();

    var API = {
      showSubscribers: function(){
        require(["apps/admin/entities/lightning"], function(){
          $.when(LightningAbstracts.request("subscriber:entities")).done(function(content){
            if(content !== undefined){
              API.listSubscribers(content, 0);
            }
          });
        });
      },

      listSubscribers: function(content, key){
        require(["apps/admin/subscribers/show/show_controller"], function(ShowController){
          ShowController.showSubscribers(lightbox, content, key);
          //ShowController.showSubscribersContents(2);
          LightningAbstracts.execute("set:active:header", "subscribers");
        });
      }
    };

    LightningAbstracts.on("subscribers:show", function(){
      LightningAbstracts.navigate("subscribers");
      API.showSubscribers();
    });

    LightningAbstracts.on("subscribers:list:show", function(content, key){
      LightningAbstracts.navigate("subscribers");
      API.listSubscribers(content, key);
    });

    LightningAbstracts.addInitializer(function(){
      new SubscribersApp.Router({
        controller: API
      });
    });
  });

  return LightningAbstracts.SubscribersApp;
});
