let i = 1;
let count = 0;
let set = ['Домашний театр','Гардероб официантов','Шубохранилище','Аквадискотека','Компьютерный клуб'];
$('.button_1').on('click',function(){
	let a = document.getElementById('text').innerHTML;
	if (a == 'Домашний театр'){
		count += 1;
	} else if (a == 'Гардероб официантов'){
		count += 1;
	} else if (a == 'Шубохранилище'){
		count += 0;		
	} else if (a == 'Аквадискотека'){
		count += 1;	
	} else if (a == 'Компьютерный клуб'){
		count += 0;		
	};
	document.getElementById('text').innerHTML = set[i]
	document.getElementById('count').innerHTML = count
	i += 1
	if (i == 6){
	document.getElementById('text').innerHTML = ''
	$('.block_in').css({'opacity': 1,'z-index': 2});
	document.getElementById('num').innerHTML = `${count} из 5`;
	}
});
$('.button_2').on('click',function(){
	let a = document.getElementById('text').innerHTML;
	if (a == 'Домашний театр'){
		count += 0;
	} else if (a == 'Гардероб официантов'){
		count += 0;
	} else if (a == 'Шубохранилище'){
		count += 1;		
	} else if (a == 'Аквадискотека'){
		count += 0;	
	} else if (a == 'Компьютерный клуб'){
		count += 1;		
	};
	document.getElementById('text').innerHTML = set[i]
	document.getElementById('count').innerHTML = count
	i += 1
	if (i == 6){
		if (count < 3){
		document.getElementById('phrase').innerHTML = 'Мне удалось заблудиться во «дворце Путина». Ищите меня на складе грязи!';
		} else {
			document.getElementById('phrase').innerHTML = 'Я знаю, как устроен «дворец Путина». Ищите меня в spa-капсуле';
		}
	document.getElementById('text').innerHTML = ''
	$('.block_in').css({'opacity': 1,'z-index': 2});
	document.getElementById('num').innerHTML = `${count} из 5`;
	}
});
$('.once_more').on('click',function(){
	document.getElementById('text').innerHTML = 'Домашний театр';
	i = 1;
	count = 0;
	document.getElementById('count').innerHTML = 0
	$('.block_in').css({'opacity': 0,'z-index': -1});
});

