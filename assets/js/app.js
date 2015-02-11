define(["marionette", "bcollapse"], function(Marionette){
  var RealEstate = new Marionette.Application();

  RealEstate.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    authRegion: "#auth-region",
    //dialogRegion: Marionette.Region.Dialog.extend({
      //el: "#dialog-region"
    //}),
    footerRegion: "#footer-region"
  });

  RealEstate.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  RealEstate.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  RealEstate.on("initialize:after", function(){
    if(Backbone.history){
      require(["apps/home/home_app", 
        "apps/properties/properties_app", 
        "apps/services/services_app", 
        "apps/blog/blog_app", 
        "apps/about/about_app", 
        "apps/contact/contact_app"
        ], function () {
        Backbone.history.start();

        if(RealEstate.getCurrentRoute() === ""){
          RealEstate.trigger("home:show");
        }
      });
    }
  });

  return RealEstate;
});
