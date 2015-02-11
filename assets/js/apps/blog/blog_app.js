define(["app"], function(RealEstate){
  RealEstate.module('BlogApp', function(BlogApp, RealEstate, Backbone, Marionette, $, _){

    BlogApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "blog" : "showBlog"
      }
    });

    var API = {
      showBlog: function(){
        require(["apps/blog/show/show_controller"], function(ShowController){
          ShowController.showBlog();
          //ShowController.showBlogContents(2);
          RealEstate.execute("set:active:header", "blog");
        });
      }
    };

    RealEstate.on("blog:show", function(){
      RealEstate.navigate("blog");
      API.showBlog();
    });

    RealEstate.addInitializer(function(){
      new BlogApp.Router({
        controller: API
      });
    });
  });

  return RealEstate.BlogApp;
});
