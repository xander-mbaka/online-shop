define(["app", "apps/properties/show/show_view"], function(RealEstate, View){
  RealEstate.module('PropertiesApp.Show', function(Show, RealEstate, Backbone, Marionette, $, _){
    Show.Controller = {
      showProperties: function(layout){
        var searchForm = new View.SearchForm();
        layout.propertiesSearchRegion.show(searchForm);

        searchForm.on('search', function(data) {
          data['operation'] = 'search';
          require(["entities/myner"], function(){
            $.when(RealEstate.request("properties:search", data)).done(function(content){
              if(content !== undefined){
                
                var properties = new View.Properties({ collection: content });
                layout.resultsRegion.show(properties, {forceShow: true});

                var num = content.length;
                var count = Backbone.Model.extend({
                  urlRoot: "myner/presentation/property",
                });

                var model = new count;

                model.set('count', num);
                var title = new View.ResultTitle({ model: model });
                layout.resultHeaderRegion.show(title);
              }
            });
          });
        });

        require(["entities/myner"], function(){
          $.when(RealEstate.request("total:properties")).done(function(content){
            if(content !== undefined){
              var title = new View.ResultTitle({ model: content });
              layout.resultHeaderRegion.show(title);
            }
          });

          $.when(RealEstate.request("property:entities", 1)).done(function(content){
            if(content !== undefined){
              var properties = new View.Properties({ collection: content });
              layout.resultsRegion.show(properties);
            }
          });
        });
      },

      showProperty: function(id){
        require(["entities/myner"], function(){
          $.when(RealEstate.request("property:entitiy", id)).done(function(content){
            if(content !== undefined){
              var propertyView = new View.Property({ model: content });
              RealEstate.mainRegion.show(propertyView);
            }
          });
        });
      },

      searchProperties: function(layout, data){
        var searchForm = new View.SearchForm();
        layout.propertiesSearchRegion.show(searchForm);

        require(["entities/myner"], function(){
          $.when(RealEstate.request("properties:search", data)).done(function(content){
            if(content !== undefined){
                
              var properties = new View.Properties({ collection: content });
              layout.resultsRegion.show(properties, {forceShow: true});

              var num = content.length;
              var count = Backbone.Model.extend({
                urlRoot: "myner/presentation/property",
              });

              var model = new count;

              model.set('count', num);
              var title = new View.ResultTitle({ model: model });
              layout.resultHeaderRegion.show(title);
            }
          });
        });
      }
    };
  });

  return RealEstate.PropertiesApp.Show.Controller;
}); 
