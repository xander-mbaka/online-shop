define(["app_admin", "tpl!apps/admin/journals/show/templates/lightbox.tpl"], function(LightningAbstracts, lightboxTpl){
  LightningAbstracts.module('AdminApp', function(AdminApp, LightningAbstracts, Backbone, Marionette, $, _){

    AdminApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "admin" : "showAdmin",
        "account" : "showAccount"
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
      showAdmin: function(){
        require(["apps/admin/entities/lightning"], function(){
          $.when(LightningAbstracts.request("admin:entities")).done(function(content){
            if(content !== undefined){
              API.listAdministrators(content, 0);
            }
          });
        });
      },

      showAccount: function(){
        require(["apps/admin/admin/show/show_controller", "apps/admin/entities/lightning"], function(ShowController){
          $.when(LightningAbstracts.request("account:entities")).done(function(content){
            if(content !== undefined){
              ShowController.showAccount(content);
              //ShowController.showSubscribersContents(2);
              LightningAbstracts.execute("set:active:header", "admin");
            }
          });
        });
      },

      listAdministrators: function(content, key){
        require(["apps/admin/admin/show/show_controller"], function(ShowController){
          ShowController.showAdmin(lightbox, content, key);
          //ShowController.showSubscribersContents(2);
          LightningAbstracts.execute("set:active:header", "admin");
        });
      }
    };

    LightningAbstracts.on("account:show", function(){
      LightningAbstracts.navigate("account");
      API.showAdmin();
    });

    LightningAbstracts.on("admin:show", function(){
      LightningAbstracts.navigate("admin");
      API.showAdmin();
    });

    LightningAbstracts.on("admin:list:show", function(content, key){
      LightningAbstracts.navigate("admin");
      API.listAdministrators(content, key);
    });

    LightningAbstracts.addInitializer(function(){
      new AdminApp.Router({
        controller: API
      });
    });
  }); 

  return LightningAbstracts.AdminApp;
});
