define(["app", "backbone.picky"], function(RealEstate){
  RealEstate.module('Entities', function(Entities, RealEstate, Backbone, Marionette, $, _){
    Entities.Header = Backbone.Model.extend({
      initialize: function(){
        var selectable = new Backbone.Picky.Selectable(this);
        _.extend(this, selectable);
      }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
      model: Entities.Header,

      initialize: function(){
        var singleSelect = new Backbone.Picky.SingleSelect(this);
        _.extend(this, singleSelect);
      }
    });

    var initializeHeaders = function(){
      Entities.headers = new Entities.HeaderCollection([
        { name: "HOME", url: "home" },
        { name: "MEN", url: "properties" },
        { name: "WOMEN", url: "properties" }     
      ]);
    };

    var API = {
      getHeaders: function(){
        if(Entities.headers === undefined){
          initializeHeaders();
        }
        return Entities.headers;
      }
    };

    RealEstate.reqres.setHandler("header:entities", function(){
      return API.getHeaders();
    });
  });

  return ;
});
