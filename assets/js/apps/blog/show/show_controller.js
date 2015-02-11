define(["app", "apps/blog/show/show_view"], function(RealEstate, View){
  RealEstate.module('BlogApp.Show', function(Show, RealEstate, Backbone, Marionette, $, _){
    Show.Controller = {
      showBlog: function(){
        require(["entities/myner"], function(){
          $.when(RealEstate.request("blog:entities")).done(function(content){
            if(content !== undefined){
              var blogview = new View.BlogRoll({ collection: content });
              RealEstate.mainRegion.show(blogview);

              blogview.on("itemview:navigate", function(arg, model){
                $.when(RealEstate.request("blog:entity", model)).done(function(content){
                  if(content !== undefined){
                    var blogfull = new View.BlogFull({ model: content });
                    RealEstate.mainRegion.show(blogfull);

                    blogfull.on('navblog', function() {
                      RealEstate.mainRegion.show(blogview);
                    });

                    blogfull.on('rpost', function(data, blogId) {
                      data['comblogid'] = blogId;
                      $.post('/myner/presentation/blogs/index.php', data, function(result) {
                          if (result == 1) {
                            blogfull.triggerMethod("form:clear");
                          };
                      });
                    });
                  }
                });
              });
            }
          });
      	});
      }
    };
  });

  return RealEstate.BlogApp.Show.Controller;
});
 