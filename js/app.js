(function () {
'use strict';
angular.module("NarrowItDownApp" , [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('APIBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<'
    }
  };
  return ddo;
}

NarrowItDownController .$inject = ['MenuSearchService']
function NarrowItDownController (MenuSearchService) {
  var ctrl = this;
  ctrl.searchTerm = "";
  ctrl.found = [];
  ctrl.found = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
  console.log("ctrl.found: ", ctrl.found);
  ctrl.NarrowItDown = function () {
    ctrl.found = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
  };


    // promise.then(function (response) {
    //   ctrl.menuItems = response.data.menu_items;
    //   console.log("ctrl.menuItems: ", ctrl.menuItems);
    // })
    // .catch(function (error) {
    //   console.log("Something went wrong!");
    // });
}


MenuSearchService.$inject = ['$http', 'APIBasePath']
function MenuSearchService($http, APIBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var foundItems = [];
    var response = $http({
      method: "GET",
      url: (APIBasePath + "/menu_items.json")
    })
    .then (function (response) {
      var fullMenuItems = response.data.menu_items;
      for (var i = 0; i < fullMenuItems.length; i++) {
        var item = fullMenuItems[i];
        if (item.name.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(item);
        }
      };
    })
    .catch(function (response) {
      console.log("Something went wrong!");
    });
    return foundItems;
  };

}

})()
