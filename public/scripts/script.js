var myApp = angular.module('myApp', []);

myApp.controller('WhereMyPeeps', function($http) {
  console.log('angulaaar');

  var vm = this;

  vm.allTheRecords = [];

  vm.addRecord = function() {
    console.log('inside add record');
    var objectToSend = {
      name: vm.nameIn,
      location: vm.locationIn,
    };
    console.log('inside add records:', objectToSend);

    $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
    }).then(function(response) {
      console.log('back from server:', response);
      vm.getRecords();
    });
    vm.nameIn = '';
    vm.locationIn = '';
  };

  vm.getRecords = function() {
    console.log('inside getRecords');
    $http({
      method: 'GET',
      url: '/getRecords',
    }).then(function(response) {
      vm.allTheRecords = response.data;
      console.log(vm.allTheRecords);
    });//end then function
  };//end function

  vm.deleteRecords = function(id) {
    console.log('in delete ' + id);
    $http({
      method: 'DELETE',
      url: '/deleteRecords/' + id,
    }).then(function(response) {
      vm.getRecords();
    });//end then function
  };//end function
});//end controller
