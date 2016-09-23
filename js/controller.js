var app = angular.module("timeline", []);

app.service("timelineServ", function($http, $q){
	var depois = $q.defer();
	$http.get('js/timeline.json').then(function(dados){
		depois.resolve(dados);
	});
	
	this.getPostagem = function(){
		return depois.promise;
	}
})

app.controller("timelineCtrl", function($scope, timelineServ){
	
	var postagens = timelineServ.getPostagem();
	postagens.then(function(dados){
		$scope.listaPostagens = dados.data;
	});
	
});