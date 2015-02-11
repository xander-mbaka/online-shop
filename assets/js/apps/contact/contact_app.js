define(["app"], function(RealEstate){
  RealEstate.module('ContactApp', function(ContactApp, RealEstate, Backbone, Marionette, $, _){

    ContactApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "contact" : "showContact"
      }
    });

    var API = {
      showContact: function(){
        require(["apps/contact/show/show_controller"], function(ShowController){
          ShowController.showContact();
          RealEstate.execute("set:active:header", "contact");
        });
      }
    };

    RealEstate.on("contact:show", function(){
      RealEstate.navigate("contact");
      API.showContact();
    });

    RealEstate.addInitializer(function(){
      new ContactApp.Router({
        controller: API
      });
    });
  });

  return RealEstate.ContactApp;
});
