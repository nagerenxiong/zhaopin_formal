var app = angular.module("app",['ui.bootstrap']);
app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('``');
  $interpolateProvider.endSymbol('``');
}]);



// app.controller('data_control', ['$scope','show_area',function($scope,show_area){
// 	console.log(show_area);
	
// }])
