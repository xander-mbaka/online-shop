define(["app", "apps/footer/show/show_view"], function(RealEstate, View){
  RealEstate.module('FooterApp.Show', function(Show, RealEstate, Backbone, Marionette, $, _){
    Show.Controller = {
      showFooter: function(){
        var view = new View.Footer();
        RealEstate.footerRegion.show(view);
      }
    };
  });

  return RealEstate.FooterApp.Show.Controller;
});