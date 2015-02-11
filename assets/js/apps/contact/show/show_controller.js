define(["app", "apps/contact/show/show_view"], function(RealEstate, View){
  RealEstate.module('ContactApp.Show', function(Show, RealEstate, Backbone, Marionette, $, _){
    Show.Controller = {
      showContact: function(){
        var view = new View.ContactPage();
        RealEstate.mainRegion.show(view);
        view.on('csubmit', function(data) {
            $.post('/presentation/contact/index.php', data, function(userData) {
                if (userData == 1) {
                	view.triggerMethod("form:clear");
                };
            });
        })
      }
    };
  });

  return RealEstate.ContactApp.Show.Controller;
});
