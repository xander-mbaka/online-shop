define(["app", "apps/properties/show/show_controller", "tpl!apps/properties/show/templates/properties.tpl"], 
  function(RealEstate, ShowController, propertiesTpl){
  RealEstate.module('PropertiesApp', function(PropertiesApp, RealEstate, Backbone, Marionette, $, _){

    PropertiesApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "properties" : "showProperties",
        "properties/:id" : "showProperty"
      }
    });

    var propertiesLayout = Backbone.Marionette.Layout.extend({
      template: propertiesTpl,

      regions: {
        propertiesSearchRegion: "#properties-header-region",
        resultHeaderRegion: "#search-region-title",
        resultsRegion: "#search-results"
      }

    });

    var layout = new propertiesLayout();

    var API = {
      showDesign: function(){
        ShowController.showDesign();
        RealEstate.execute("set:active:header", "properties");
      },

      showProperties: function(){
        RealEstate.mainRegion.show(layout);
        ShowController.showProperties(layout);
        RealEstate.execute("set:active:header", "properties");
      },

      showProperty: function(id){
        ShowController.showProperty(id);
        RealEstate.execute("set:active:header", "properties");
      },

      searchProperties: function(data){
        RealEstate.mainRegion.show(layout);
        ShowController.searchProperties(layout, data);
        RealEstate.execute("set:active:header", "properties");
      }
    };

    RealEstate.on("properties:show", function(){
      RealEstate.navigate("properties");
      API.showProperties();
      //API.showDesign();
    });

    RealEstate.on("properties:search", function(data){
      RealEstate.navigate("properties");
      API.searchProperties(data);
    });

    RealEstate.addInitializer(function(){
      new PropertiesApp.Router({
        controller: API
      });
    });
  });

  return RealEstate.PropertiesApp;
});
