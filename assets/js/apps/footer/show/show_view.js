define(["app", "tpl!apps/footer/show/templates/footer.tpl"], function(RealEstate, footerTpl){
  RealEstate.module('FooterApp.Show.View', function(View, RealEstate, Backbone, Marionette, $, _){
    View.Footer = Marionette.ItemView.extend({
      template: footerTpl 
    });
  });

  return RealEstate.FooterApp.Show.View;
});
