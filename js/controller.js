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
		alteraData($scope.listaPostagens);
	});
	
});

// Responsável por transformar a data do formato ISO 8601 presente na lista de objetos do JSON para um formato mais agradável ao usuário
function alteraData(lista){
	var meses = ["jan", "fev", "mar","abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
	for (var i = 0; i < lista.length; i++){
		var data = lista[i].date
		var dia = data.slice(8,10);
		var mes = parseInt(data.slice(5,7));
		var ano = data.slice(0,4);
		lista[i].date = dia+" de "+meses[mes - 1]+" - "+ano; 
	}
}