requirejs.config({
  baseUrl: "assets/js",
  paths: {
    backbone: "vendor/backbone",
    "backbone.picky": "vendor/backbone.picky",
    "backbone.syphon": "vendor/backbone.syphon",    
    "backbone.modelBinder": "vendor/backbone.modelbinder",
    jquery: "vendor/jquery",
    json2: "vendor/json2",
    localstorage: "vendor/backbone.localstorage",
    marionette: "vendor/backbone.marionette",
    bcollapse: "additions/bootstrap-collapse",
    spin: "vendor/spin",
    "spin.jquery": "vendor/spin.jquery",
    tpl: "vendor/tpl",
    rslides: "additions/responsiveslides",
    underscore: "vendor/underscore"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    "backbone.picky": ["backbone"],
    "backbone.syphon": ["backbone"],
    "backbone.modelBinder": ["backbone"],
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    bcollapse: ["jquery"],
    localstorage: ["backbone"],
    "spin.jquery": ["spin", "jquery"]
  }
});

require(["app", "apps/header/header_app", "apps/footer/footer_app"], function(RealEstate){
  RealEstate.start();
});
