var myApp = angular.module('myApp', []);

myApp.controller('WhereMyPeeps', '$http', function($http) {
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
    }).then( function( response ){
    console.log( 'back from server:', response );
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
        vm.allTheRecords = response.dat;
        console.log(vm.allTheRecords);
      });
  };
});
