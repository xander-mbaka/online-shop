define(["app_admin", "apps/admin/dashboard/show/show_view"], function(LightningAbstracts, View){
  LightningAbstracts.module('DashApp.Show', function(Show, LightningAbstracts, Backbone, Marionette, $, _){
    Show.Controller = {
      showDashboard: function(model){
        var dash = new View.Dashboard({model: model});
        LightningAbstracts.mainRegion.show(dash);
      }
    };
  });

  return LightningAbstracts.DashApp.Show.Controller;
});
