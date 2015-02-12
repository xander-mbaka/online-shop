define(["app_admin", "tpl!apps/admin/header/list/templates/list.tpl", "tpl!apps/admin/header/list/templates/list_item.tpl", 
  "tpl!apps/admin/header/list/templates/nav2.tpl", "tpl!apps/admin/header/list/templates/top.tpl",  "modnav", "dlmenu"],
        function(LightningAbstracts, listTpl, listItemTpl, navTpl, topTpl){
  LightningAbstracts.module('HeaderApp.List.View', function(View, LightningAbstracts, Backbone, Marionette, $, _){
    View.Header = Marionette.ItemView.extend({
      template: listItemTpl,
      tagName: "li",

      events: {
        "click a": "navigate"
      },

      navigate: function(e){
        e.preventDefault();
        this.trigger("navigate", this.model);
      },

      onRender: function(){
        if(this.model.selected){
          // add class so Bootstrap will highlight the active entry in the navbar
          this.$el.addClass("active");
        };
      }
    });

    View.HeaderView = Marionette.ItemView.extend({
      template: topTpl,
      tagName: "div",

      className: "header-region",

      events: {
        "click .js-logout": "logout"
      },

      logout: function(e){
        e.preventDefault();
        this.trigger("logout");
      }
    });

    View.Headers = Marionette.CompositeView.extend({
      template: listTpl,
      className: "navbar navbar-fixed-top",
      itemView: View.Header,
      itemViewContainer: "ul",

      events: {
        "click a.brand": "brandClicked"
      },

      brandClicked: function(e){
        e.preventDefault();
        this.trigger("brand:clicked");
      }
    });

    View.Nav = Marionette.ItemView.extend({
      template: navTpl,
      className: "navcolumn demo-3",

      events: {
        "click a.brand": "brandClicked"
      },

      onRender: function(){

      },

      onShow: function(){
        $( '#dl-menu' ).dlmenu({
          animationClasses : { classin : 'dl-animate-in-5', classout : 'dl-animate-out-5' }
        });
      },

      brandClicked: function(e){
        e.preventDefault();
        this.trigger("brand:clicked");
      }
    });
  });

  return LightningAbstracts.HeaderApp.List.View;
});
