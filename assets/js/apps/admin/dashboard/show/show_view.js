define(["app_admin", "tpl!apps/admin/dashboard/show/templates/dashboard.tpl"], 
 function(LightningAbstracts, dashboardTpl){
  LightningAbstracts.module('DashApp.Show.View', function(View, LightningAbstracts, Backbone, Marionette, $, _){
    View.Dashboard = Marionette.ItemView.extend({
      	template: dashboardTpl
    });
  });

  return LightningAbstracts.DashApp.Show.View;
});
