define(["app_admin", "apps/admin/admin/show/show_view"], function(LightningAbstracts, View){
  LightningAbstracts.module('AdminApp.Show', function(Show, LightningAbstracts, Backbone, Marionette, $, _){
    Show.Controller = {
      showAdmin: function(lightboxLayout, content, key){
        var x = Backbone.Model.extend({
          urlRoot: "lightning/presentation/blog",
        });
        var model = new x;
        model.set('filterkey', key);

        var admins = new View.Admins({ collection: content, model: model });
        LightningAbstracts.mainRegion.show(admins);

        admins.on("itemview:edit", function(arg, model){
          var admin = new View.Admin({ model: model });
          LightningAbstracts.modalRegion.show(lightboxLayout);
          lightboxLayout.lightbox.show(admin);

          admin.on('close', function() {
            LightningAbstracts.trigger("admin:show");
          });

          admin.on('update', function(data) {
            data['operation'] = 'updateAdmin';
            $.post('/lightning/presentation/admin/index.php', data, function(result) {
              if (result == 1) {
                alert('Success: Admin profile updated');
                admin.triggerMethod("form:done");
              };
            });
          });
        });

        admins.on("itemview:delete", function(arg, id){
          var data = {};
          data['operation'] = 'deleteAdmin';
          data['adminId'] = id;
          $.post('/lightning/presentation/admin/index.php', data, function(result) {
            if (result == 1) {
              alert('Success: Admin profile deleted');
              LightningAbstracts.trigger("admins:show");
            };
          });
        });

        admins.on('add', function() {
          var admin = new View.NewAdmin();
          LightningAbstracts.modalRegion.show(lightboxLayout);
          lightboxLayout.lightbox.show(admin);

          admin.on('close', function() {
            LightningAbstracts.trigger("admin:show");
          });

          admin.on('create', function(data) {
            data['operation'] = 'createAdmin';
            $.post('/lightning/presentation/admin/index.php', data, function(result) {
              if (result == 1) {
                alert('Success: Admin profile created');
                admin.triggerMethod("form:done");
              };
            });
          });
        });

        admins.on('search', function(name) {
          $.when(LightningAbstracts.request("admins:search", name)).done(function(content){
            if(content !== undefined){
              LightningAbstracts.trigger("admin:list:show", content);
            }
          });
        });

        admins.on('filter', function(key) {
          $.when(LightningAbstracts.request("admins:filter", key)).done(function(content){
            if(content !== undefined){
              LightningAbstracts.trigger("admin:list:show", content, key);
            }
          });
        });
      },

      showAccount: function(content){
        var aview = new View.Account({ model: content });           
        LightningAbstracts.mainRegion.show(aview);
        aview.on('changePassword', function(data) {                  
          data['operation'] = 'changePassword';
          //alert(JSON.stringify(data));
          $.post('/lightning/presentation/admin/index.php', data, function(result) {
            if (result == 1) {
              alert('Success: Password changed');
              aview.triggerMethod("creation:done");
            }else{
              alert('Error: Password NOT changed');
              aview.triggerMethod("creation:error");
            }
          });
        });
      }
    };
  });

  return LightningAbstracts.AdminApp.Show.Controller;
});