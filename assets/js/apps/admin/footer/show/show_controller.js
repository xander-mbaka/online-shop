define(["app_admin", "apps/admin/footer/show/show_view"], function(LightningAbstracts, View){
  LightningAbstracts.module('FooterApp.Show', function(Show, LightningAbstracts, Backbone, Marionette, $, _){
    Show.Controller = {
      showFooter: function(){
        var view = new View.Footer();
        LightningAbstracts.footerRegion.show(view);
      }
    };
  });

  return LightningAbstracts.FooterApp.Show.Controller;
});