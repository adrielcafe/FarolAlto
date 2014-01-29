$(function(){
	// IMPORTANTE:
	// Altere o token para funcionar com seu Kit de Desenvolvimento IoT
	var token = '9kzn3ptesm46';

	var endpoint = 'http://dca.telefonicabeta.com/m2m/v2/services/{0}'.format(token);
	var timer = null;
	var lastValue = 0;
	var limitValue = 400;

	$('#monitor').click(function(e){
		e.preventDefault();

		if($(this).hasClass('btn-success')){
			timer = setInterval(function(){ startMonitor(); }, 1000);
			$(this).html('Parar Monitoramento');
		} else {
			clearInterval(timer);
			$(this).html('Iniciar Monitoramento');
		}

		$(this).toggleClass('btn-success');
		$(this).toggleClass('btn-danger');
	});

	function startMonitor(){
		$.ajax({ 
			url: endpoint + '/assets/' + token + '/', 
			dataType:"json" 
		})
      	.done(function(r) {
			if(lastValue >= limitValue && r.data.sensorData[4].ms.v >= limitValue){
				if($('#detected .alert-danger').css('visibility') == 'hidden'){
					$('#detected .alert-danger').css('visibility', 'visible');
					$('#detected .circle').css('background-color', '#FCFC0A');
					setTimeout(function(){ 
						$('#detected .alert-danger').css('visibility', 'hidden');
						$('#detected .circle').css('background-color', '#BBB');
					}, 5000);
				}
				console.log(r.data.sensorData[4].ms.v);
			}
			lastValue = r.data.sensorData[4].ms.v;
      	})
      	.fail(function (response) {
        	
     	}); 
	}
});

String.prototype.format = function () {
	var args = arguments;
  	return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
    	if (m == "{{") return "{";
    	if (m == "}}") return "}";
    	return args[n];
  	});
};