define(["app", "apps/home/show/show_view"], function(RealEstate, View){
  RealEstate.module('HomeApp.Show', function(Show, RealEstate, Backbone, Marionette, $, _){
    Show.Controller = {
      showHome: function(){
        var view = new View.Message();
        RealEstate.mainRegion.show(view);
      },

      showHomes: function(layout){
      	var searchForm = new View.SearchForm();
	      layout.homeSearchRegion.show(searchForm);

        searchForm.on('search', function(data) {
          data['operation'] = 'search';
          RealEstate.trigger("properties:search", data);
	      });

      	require(["entities/myner"], function(){
          $.when(RealEstate.request("latest:entities")).done(function(content){
            if(content !== undefined){
              var latestListings = new View.LatestListings({ collection: content });
              layout.latestListingsRegion.show(latestListings);
            }
          });
      	});

        /*var newsletter = new View.Newsletter();
        layout.newsletterRegion.show(newsletter);

        newsletter.on('subscribe', function(data) {
          data['operation'] = 'newsletter';
          $.post('/myner/presentation/users/index.php', data, function(res) {
            if (res == 1) {
                newsletter.triggerMethod("form:clear");
            }else{
                newsletter.triggerMethod("subscribe:error");
            }
          });
        });*/
      }
    };
  });

  return RealEstate.HomeApp.Show.Controller;
});
 