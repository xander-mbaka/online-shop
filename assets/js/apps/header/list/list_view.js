define(["app", "tpl!apps/header/list/templates/list.tpl", "tpl!apps/header/list/templates/list_item.tpl"],
        function(RealEstate, listTpl, listItemTpl){
  RealEstate.module('HeaderApp.List.View', function(View, RealEstate, Backbone, Marionette, $, _){
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

    View.Headers = Marionette.CompositeView.extend({
      template: listTpl,
      className: "navbar navbar-fixed-top",
      itemView: View.Header,
      itemViewContainer: "ul",

      events: {
        "click .company-logo": "brandClicked"
      },

      brandClicked: function(e){
        e.preventDefault();
        this.trigger("brand:clicked");
      }
    });
  });

  return RealEstate.HeaderApp.List.View;
});
