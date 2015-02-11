define(["app", "config/storage/localstorage"], function(RealEstate){
  RealEstate.module('Entities', function(Entities, RealEstate, Backbone, Marionette, $, _){

    Backbone.emulateJSON = true;

    Entities.Property = Backbone.Model.extend({
      urlRoot: "myner/presentation/property",
    });

    Entities.PropertyCollection = Backbone.Collection.extend({
      url: "/myner/presentation/properties",
      model: Entities.Property
    });

    Entities.Blog = Backbone.Model.extend({
      urlRoot: "myner/presentation/blog",
    });

    Entities.BlogCollection = Backbone.Collection.extend({
      url: "/myner/presentation/blogs",
      model: Entities.Blog
    });

    Entities.BlogComment = Backbone.Model.extend({
      urlRoot: "myner/presentation/blog",
    });

    Entities.BlogCommentCollection = Backbone.Collection.extend({
      url: "/myner/presentation/blogs",
      model: Entities.BlogComment
    });

    //Entities.configureStorage(Entities.Journal);

    //Entities.configureStorage(Entities.JournalCollection);

    var initializeProperties = function(val){
      var properties = new Entities.PropertyCollection(val);
      var ind = 0;
      properties.forEach(function(model){
        model.set('ind', ind++);
      });
      return properties.models;
    };



    var initializeBlogs = function(val){
      var blogs = new Entities.BlogCollection(val);
      //blogs.forEach(function(blog){
        //blog.save();
      //});
      return blogs.models;
    };

    var initializeBlogComments = function(val){
      var blogcomments = new Entities.BlogCommentCollection(val);
      //blogcommentss.forEach(function(blog){
        //blog.save();
      //});
      return blogcomments.models;
    };

    var blogs, currentBlog;

    var API = {


      getBlogEntities: function(){
        blogs = new Entities.BlogCollection();
        var defer = $.Deferred();

        $.when(

          $.get("/myner/presentation/blogs", function(val){
            var models = initializeBlogs(JSON.parse(val));
            blogs.reset(models);       
          })

        ).done(function() {
          defer.resolve(blogs);
        });
        return defer.promise();
        
      },

      getPropertyEntities: function(page){
        properties = new Entities.PropertyCollection();
        var defer = $.Deferred();

        $.when(

          $.get("/myner/presentation/properties/?properties=1&page=" + page, function(val){
            var models = initializeProperties(JSON.parse(val));
            properties.reset(models);       
          })

        ).done(function() {
          defer.resolve(properties);
        });
        return defer.promise();
        
      },

      getTotalEntities: function(){
        total = new Entities.Property();
        var defer = $.Deferred();

        $.when(

          $.get("/myner/presentation/properties/?allcount", function(val){
            total.set('count', val.valueOf());      
          })

        ).done(function() {
          defer.resolve(total);
        });
        return defer.promise();
        
      },

      getFeaturedEntities: function(){
        properties = new Entities.PropertyCollection();
        var defer = $.Deferred();
        var data = {};

        data['operation'] = 'featured';

        $.when(

          $.post("/myner/presentation/properties/index.php", data, function(val){
            var models = initializeProperties(JSON.parse(val));
            properties.reset(models);       
          })

        ).done(function() {
          defer.resolve(properties);
        });
        return defer.promise();
        
      },

      getPropertySearch: function(data){
        properties = new Entities.PropertyCollection();
        var defer = $.Deferred();

        $.when(

          $.post("/myner/presentation/properties/index.php", data, function(val){
            var models = initializeProperties(JSON.parse(val));
            properties.reset(models);       
          })

        ).done(function() {
          defer.resolve(properties);
        });
        return defer.promise();
        
      },
      
      getLatestEntities: function(){
        properties = new Entities.PropertyCollection();
        var defer = $.Deferred();
        var data = {};

        data['operation'] = 'latest';
        data['home'] = true;

        $.when(

          $.post("/myner/presentation/properties/index.php", data, function(val){
            var models = initializeProperties(JSON.parse(val));
            properties.reset(models);       
          })

        ).done(function() {
          defer.resolve(properties);
        });
        return defer.promise();
        
      },

      getBlog: function(model){
        var blogcomments = new Entities.BlogCommentCollection();
        var blogId = model.get('blog_id');
        var defer = $.Deferred();
        var fullBlog;

        $.when(

          $.get("/myner/presentation/blogs/?blogId=" + blogId, function(full){
            fullBlog = full;       
          }),

          $.get("/myner/presentation/blogs/?comments=" + blogId, function(res){
            var models = initializeBlogComments(JSON.parse(res));
            blogcomments.reset(models);          
          })

        ).done(function() {
          model.set('full', fullBlog);
          model.set('comments', blogcomments);
          defer.resolve(model);
        });
        return defer.promise();
      }
    };

    RealEstate.reqres.setHandler("load:entities", function(){
      API.loadEntities();
      return;
    });

    RealEstate.reqres.setHandler("property:entities", function(page){
      return API.getPropertyEntities(page);
    });

    RealEstate.reqres.setHandler("total:properties", function(){
      return API.getTotalEntities();
    });

    RealEstate.reqres.setHandler("properties:search", function(data){
      return API.getPropertySearch(data);
    });

    RealEstate.reqres.setHandler("featured:entities", function(){
      return API.getFeaturedEntities();
    });

    RealEstate.reqres.setHandler("latest:entities", function(){
      return API.getLatestEntities();
    });

    RealEstate.reqres.setHandler("blog:entities", function(){
      return API.getBlogEntities();
    });

    RealEstate.reqres.setHandler("blog:entity", function(model){
      return API.getBlog(model);
    });

    RealEstate.reqres.setHandler("journal:entity:new", function(id){
      return new Entities.Journal();
    });
  });

  return ;
});