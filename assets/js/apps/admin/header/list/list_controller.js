define(["app_admin", "apps/admin/header/list/list_view"], function(LightningAbstracts, View){
  LightningAbstracts.module('HeaderApp.List', function(List, LightningAbstracts, Backbone, Marionette, $, _){
    List.Controller = {
      listHeader: function(model){
        //require(["apps/admin/entities/header"], function(){
          //var links = LightningAbstracts.request("header:entities");
          var header = new View.HeaderView({ model: model });
          var nav = new View.Nav();

          header.on("logout", function(){
            data = {};
            data['operation'] = 'logout';              
            $.post('/lightning/presentation/users/index.php', data, function(result) {
              window.location.replace('http://lightningabstract.com/admin');
            });
          });

          LightningAbstracts.navRegion.show(nav);
          LightningAbstracts.headerRegion.show(header);
        //});
      },

      setActiveHeader: function(headerUrl){
        require(["apps/admin/entities/header"], function(){
          var links = LightningAbstracts.request("header:entities");
          var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
          headerToSelect.select();
          links.trigger("reset");
        });
      }
    };
  });

  return LightningAbstracts.HeaderApp.List.Controller;
});
