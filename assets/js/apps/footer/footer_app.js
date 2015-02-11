define(["app", "apps/footer/show/show_controller"], function(RealEstate, ShowController){
  RealEstate.module('FooterApp', function(Footer, RealEstate, Backbone, Marionette, $, _){
    var API = {
      showFooter: function(){
        ShowController.showFooter();
      }
    };

    Footer.on("start", function(){
      API.showFooter();
    });
  });

  return RealEstate.FooterApp;
});