define(["app_admin", "apps/admin/footer/show/show_controller"], function(LightningAbstracts, ShowController){
  LightningAbstracts.module('FooterApp', function(Footer, LightningAbstracts, Backbone, Marionette, $, _){
    var API = {
      showFooter: function(){
        ShowController.showFooter();
      }
    };

    LightningAbstracts.on("footer:start", function(){
      //alert("trigga");
      API.showFooter();
    });
  });

  return LightningAbstracts.FooterApp;
});