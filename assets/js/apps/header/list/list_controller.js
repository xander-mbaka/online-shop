define(["app", "apps/header/list/list_view"], function(RealEstate, View){
  RealEstate.module('HeaderApp.List', function(List, RealEstate, Backbone, Marionette, $, _){
    List.Controller = {
      listHeader: function(){
        require(["entities/header"], function(){
          var links = RealEstate.request("header:entities");
          var headers = new View.Headers({collection: links});

          headers.on("brand:clicked", function(){
            RealEstate.trigger("home:show");
          });

          headers.on("itemview:navigate", function(childView, model){
            var url = model.get('url');
            if(url){
              RealEstate.trigger(url + ":show");
            }else{
              throw "No such sub-application: " + url;
            }
            $(".btn-navbar").click();
          });

          RealEstate.headerRegion.show(headers);
        });
      },

      setActiveHeader: function(headerUrl){
        var links = RealEstate.request("header:entities");
        var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
        headerToSelect.select();
        links.trigger("reset");
      }
    };
  });

  return RealEstate.HeaderApp.List.Controller;
});
