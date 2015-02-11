define(["app", "apps/header/list/list_controller"], function(RealEstate, ListController){
  RealEstate.module('HeaderApp', function(Header, RealEstate, Backbone, Marionette, $, _){
    var API = {
      listHeader: function(){
        ListController.listHeader();
      }
    };

    RealEstate.commands.setHandler("set:active:header", function(name){
      ListController.setActiveHeader(name);
    });

    Header.on("start", function(){
      API.listHeader();
    });
  });

  return RealEstate.HeaderApp;
});