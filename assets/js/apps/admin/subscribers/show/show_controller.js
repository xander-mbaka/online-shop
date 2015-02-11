define(["app_admin", "apps/admin/subscribers/show/show_view"], function(LightningAbstracts, View){
  LightningAbstracts.module('Subscribers.Show', function(Show, LightningAbstracts, Backbone, Marionette, $, _){
    Show.Controller = {
      showSubscribers: function(lightboxLayout, content, key){
        require(["apps/admin/entities/lightning"], function(){
              var x = Backbone.Model.extend({
                urlRoot: "lightning/presentation/blog",
              });
              var model = new x;
              model.set('filterkey', key);

              var subscribers = new View.Subscribers({ collection: content, model: model });
              LightningAbstracts.mainRegion.show(subscribers);

              subscribers.on("itemview:edit", function(arg, model){
                var subscriber = new View.Subscriber({ model: model });
                LightningAbstracts.modalRegion.show(lightboxLayout);
                lightboxLayout.lightbox.show(subscriber);

                subscriber.on('close', function() {
                  LightningAbstracts.trigger("subscribers:show");
                });

                subscriber.on('update', function(data) {
                  data['operation'] = 'updateSubscriber';
                  $.post('/lightning/presentation/admin/index.php', data, function(result) {
                    if (result == 1) {
                      alert('Success: Subscriber profile updated');
                      subscriber.triggerMethod("form:done");
                    };
                  });
                });
              });

              subscribers.on("itemview:delete", function(arg, id){
                alert(arg + id);
                  var data = {};
                  data['operation'] = 'deleteSubscriber';
                  data['userId'] = id;
                  $.post('/lightning/presentation/admin/index.php', data, function(result) {
                    if (result == 1) {
                      alert('Success: Subscriber profile deleted');
                      LightningAbstracts.trigger("subscribers:show");
                    };
                  });
              });

              subscribers.on('search', function(name) {
                $.when(LightningAbstracts.request("subscribers:search", name)).done(function(content){
                  if(content !== undefined){
                    LightningAbstracts.trigger("subscribers:list:show", content);                    
                  }
                });
              });

              subscribers.on('filter', function(key) {
                $.when(LightningAbstracts.request("subscribers:filter", key)).done(function(content){
                  if(content !== undefined){
                    LightningAbstracts.trigger("subscribers:list:show", content, key);                    
                  }
                });
              });
            
      	});
      }
    };
  });

  return LightningAbstracts.Subscribers.Show.Controller;
});