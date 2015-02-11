define(["app_admin", "apps/admin/header/list/list_controller"], function(LightningAbstracts, ListController){
  LightningAbstracts.module('HeaderApp', function(Header, LightningAbstracts, Backbone, Marionette, $, _){
    var API = {
      listHeader: function(admin){
        ListController.listHeader(admin);
      }
    };

    LightningAbstracts.commands.setHandler("set:active:header", function(name){
      ListController.setActiveHeader(name);
    });

    LightningAbstracts.on("header:start", function(data){
      var model = Backbone.Model.extend({
        urlRoot: "lightning/presentation/admin",
      });
      var admin = new model(data);
      API.listHeader(admin);
    });
  });

  return LightningAbstracts.HeaderApp;
});