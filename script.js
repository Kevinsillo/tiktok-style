/*
// CONTADORES
https://api.countapi.xyz/create?namespace=kevinsillo&enable_reset=-1&key=1596
https://api.countapi.xyz/set/kevinsillo/1596?value=0
https://api.countapi.xyz/info/kevinsillo/1596

// ENLACE DE JSDELIVR QUE APUNTA A GITHUB
https://cdn.jsdelivr.net/gh/Kevinsillo/tiktok-style/mod.js
https://cdn.jsdelivr.net/gh/Kevinsillo/tiktok-style/script.js
https://cdn.jsdelivr.net/gh/[USER]/[REPOSITORIO]/[FICHERO]

$.getScript('https://cdn.jsdelivr.net/gh/Kevinsillo/tiktok-style/script.js')
*/

var initApplication = undefined
initApplication = async function () {
	clearInterval(interval)

	// IMPORTACION DE LIBRERIAS
	// --------------------------------------------------------------------------------------
	$('head').append( $('<link rel="stylesheet" type="text/css"/>').attr('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css'));
	$('head').append( $('<link rel="stylesheet" type="text/css"/>').attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css'));
	$.getScript('https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js')
	$.getScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js')
	$.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery.countdown/2.2.0/jquery.countdown.min.js')
	$.getScript('https://momentjs.com/downloads/moment.js')

	// DECLARACION DE VARIABLES GLOBALES
	// --------------------------------------------------------------------------------------
	var sonidos = {
		join: false,
		like: true,
		follow: false,
		share: false,
		gift: true,
		command: true
	}
	var contador = await $.ajax('https://api.countapi.xyz/info/kevinsillo/1596').then((r)=> {return r.value})
	var sumatorio = 0
	var total = 0
	var valorMoneda = 0.019
	var joinChat = ''
	var likes = 0
	var likeNick = ''
	var followers = 0
	var followerMessage = ''
	var followerMessageSplit = []
	var sharers = 0
	var sharerMessage = ''
	var sharerMessageSplit = []
	var gifts = 0
	var giftNumber = 0
	var giftMessage = ''
	var giftImage = ''
	var giftNick = ''
	var messages = 0
	var messageText = ''
	var fechaCooldown = {}

	// CARGA DE CSS
	// --------------------------------------------------------------------------------------
	$('body').append(`
		<style>
			@import url('https://fonts.googleapis.com/css?family=Pacifico&display=swap');
			@import url('https://fonts.googleapis.com/css?family=Lobster&display=swap');

			::-webkit-scrollbar {
				width: 10px;
			}

			::-webkit-scrollbar-track {
				background: #f1f1f1; 
			}

			::-webkit-scrollbar-thumb {
				background: #888; 
			}

			::-webkit-scrollbar-thumb:hover {
				background: #555; 
			}

			body {
				width: 100%;
				height: 100%;
				margin: 0;
			}

			.boxtool {
				background-color: #fdfdfd;
				position: absolute;
				top: 150px;
				right: 0px;
				width: 75px;
				padding: 5px;
				border-radius: 0.5em 0em 0em 0.5em;
				-webkit-box-shadow: 0px 2px 15px 7px rgba(0,0,0,0.25);
				-moz-box-shadow: 0px 2px 15px 7px rgba(0,0,0,0.25);
				box-shadow: 0px 2px 15px 7px rgba(0,0,0,0.25);
				z-index: 100;
			}

			.row.bigback {
				background: linear-gradient(rgba(138, 43, 226,0.8), rgba(138, 43, 226,0.8)), url('https://static.vecteezy.com/system/resources/previews/002/072/005/non_2x/modern-gradient-purple-blue-background-free-vector.jpg');
				background-repeat: no-repeat;
				background-size: cover;
			}

			.buttontool {
				font-size: 30px;
				margin: 15px;
				cursor: pointer;
			}

			.disable-button {
				color: grey;
			}

			.subir {
				animation-name: parpadeo-verde;
				animation-duration: 1s;
				animation-timing-function: linear;
				animation-iteration-count: 2;

				-webkit-animation-name:parpadeo-verde;
				-webkit-animation-duration: 1s;
				-webkit-animation-timing-function: linear;
				-webkit-animation-iteration-count: 2;
			}

			@-moz-keyframes parpadeo-verde {  
				0% { opacity: 1.0; color: #32a87d; }
				50% { opacity: 1.0; color: white; }
				100% { opacity: 1.0; color: #32a87d; }
			}

			@-webkit-keyframes parpadeo-verde {  
				0% { opacity: 1.0; color: #32a87d; }
				50% { opacity: 1.0; color: white; }
				100% { opacity: 1.0; color: #32a87d; }
			}

			@keyframes parpadeo-verde {  
				0% { opacity: 1.0; color: #32a87d; }
				50% { opacity: 1.0; color: white; }
				100% { opacity: 1.0; color: #32a87d; }
			}

			.bajar {
				animation-name: parpadeo-rojo;
				animation-duration: 1s;
				animation-timing-function: linear;
				animation-iteration-count: 2;

				-webkit-animation-name:parpadeo-rojo;
				-webkit-animation-duration: 1s;
				-webkit-animation-timing-function: linear;
				-webkit-animation-iteration-count: 2;
			}

			@-moz-keyframes parpadeo-rojo {  
				0% { opacity: 1.0; color: #f44336; }
				50% { opacity: 1.0; color: white; }
				100% { opacity: 1.0; color: #f44336; }
			}

			@-webkit-keyframes parpadeo-rojo {  
				0% { opacity: 1.0; color: #f44336; }
				50% { opacity: 1.0; color: white; }
				100% { opacity: 1.0; color: #f44336; }
			}

			@keyframes parpadeo-rojo {  
				0% { opacity: 1.0; color: #f44336; }
				50% { opacity: 1.0; color: white; }
				100% { opacity: 1.0; color: #f44336; }
			}

			.positivo {
				color: white;
				font-weight: bold;
			}

			.negativo {
				color: white;
				font-weight: bold;
			}

			.col-tip {
				width: 100px;
				background-color: rgba(0, 0, 0, 0.4);
				border-radius: 0.5em;
				padding: 2px 6px;
				font-weight: bold;
			}

			.title {
				font-weight: bold;
				text-align: center;
				font-size: 45px;
				color: #32a87d;
				font-family: "Pacifico";
				text-shadow: 4px 3px 0 rgba(0,0,0,0.4)
			}

			.interfaz-movil {
				width: 100%;
				height: calc(100vh - 60px);
			}

			.title-notis {
				font-weight: bold;
				z-index: 10;
				font-size: 30px;
				color: #32a87d;
				font-family: "Pacifico";
				text-shadow: 4px 3px 0 rgba(0,0,0,0.4)
			}

			.notificaciones {
				margin-top: -10px;
				padding: 10px;
				background-color: rgba(255, 255, 255, 0.4);
				border-radius: 0.5em;
				width: 100%;
				height: 200px;
				overflow: auto;
			}

			.burbuja {
				font-size: 16px;
				font-family: Arial;
				background-color: rgba(255, 255, 255, 0.4);
				border-radius: 0.2em;
				margin-bottom: 4px;
				padding: 2px 6px;
			}

			.burbuja span {
				background-color: rgba(255, 255, 255, 0.4);
				border-radius: 0.2em;
				height: 28px;
				padding: 2px 6px;
				font-weight: bold;
			}

			.info-tips {
				margin-top: -15px;
				padding: 10px;
				background-color: rgba(255, 255, 255, 0.4);
				border-radius: 0.5em;
				width: 100%;
				height: 190px;
				font-weight: bold;
			}

			.info-warning {
				margin-top: 20px;
				padding: 10px;
				background-color: rgba(255, 255, 255, 0.4);
				border-radius: 0.5em;
				width: 100%;
				height: 45px;
				font-weight: bold;
				font-size: 14px;
				margin-bottom: 10px;
			}

			.info-symbol {
				font-family: "Lobster";
				border-radius: 9999px;
				background-color: #f44336;
				padding: 1px 10px;
				color: white;
				font-weight: regular;
			}

			.fondo-contador {
				padding: 5px 10px 10px 10px;
				background-color: rgba(255, 255, 255, 0.4);
				border-radius: 0.5em;
				margin-bottom: 10px;
			}

			#countdown {
				font-size: 28px;
			  color: white;
			  font-family: "Pacifico";
				text-shadow: 4px 3px 0 rgba(0,0,0,0.4)
			}

			.contador {
			  font-size: 48px;
			  color: white;
			  font-family: "Pacifico";
				text-shadow: 4px 3px 0 rgba(0,0,0,0.4)
			}
		</style>
	`)

	// CARGA DE HMTL MODIFICADO
	// --------------------------------------------------------------------------------------
	$('.boxtool').remove()
	var div = document.createElement('div');
	div.setAttribute('class', 'boxtool');
	div.innerHTML = `
		<div id="join" class="buttontool"><i class="fas fa-sign-in-alt"></i></div>
		<div id="like" class="buttontool"><i class="fas fa-heart"></i></div>
		<div id="follow" class="buttontool"><i class="fas fa-user-plus"></i></div>
		<div id="share" class="buttontool"><i class="fas fa-share"></i></div>
		<div id="gift" class="buttontool"><i class="fas fa-gift"></i></div>
	`
	document.body.insertBefore(div,document.body.firstChild);
	$('#join').bind('click', function() {silenciar('join')})
	$('#like').bind('click', function() {silenciar('like')})
	$('#follow').bind('click', function() {silenciar('follow')})
	$('#share').bind('click', function() {silenciar('share')})
	$('#gift').bind('click', function() {silenciar('gift')})

	var confirmar = confirm("¿Cargar contador?");
	if (confirmar) {
		$('.container').remove()
		var div = document.createElement('div');
		div.setAttribute('class', 'container');
		div.innerHTML = `
		<div class="row bigback justify-content-center">
		  <div class="col-6">
		    <div class="interfaz-movil d-flex flex-column justify-content-center align-items-center">
		    	<div class="title">SuperCounter</div>
		    	<div class="info-warning"><span class="info-symbol">i</span> Atención: Este live está en BETA y podrían ocurrir errores</div>
		    	<div class="fondo-contador w-100"><div id="countdown" class="text-center"></div></div>
					<div class="fondo-contador w-100"><div class="contador text-center">${contador}</div></div>
					<div class="row text-center mb-1">
	    			<div class="col">
	    				<div class="col-tip">
		    				<img width="32px" src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png">
		    				<span class="positivo">+1</span>
	    				</div>
	    			</div>
	    			<div class="col">
	    				<div class="col-tip">
		    				<img width="32px" src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/a4c4dc437fd3a6632aba149769491f49.png~tplv-obj.png">
		    				<span class="positivo">+5</span>
	    				</div>
	    			</div>
	    			<div class="col">
	    				<div class="col-tip">
		    				<img width="32px" src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/7d055532898d2060101306de62b89882~tplv-obj.png">
		    				<span class="positivo">+10</span>
	    				</div>
	    			</div>
	    		</div>
	    		<div class="row text-center">
	    			<div class="col">
	    				<div class="col-tip">
		    				<img width="32px" src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/c87cfa4c1073085814424d6bf9bec1f0~tplv-obj.png">
		    				<span class="negativo">-1</span>
	    				</div>
	    			</div>
	    			<div class="col">
	    				<div class="col-tip">
		    				<img width="32px" src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/8d4381b7d2272ffc14227c3705832e24~tplv-obj.png">
		    				<span class="negativo">-5</span>
	    				</div>
	    			</div>
	    			<div class="col">
	    				<div class="col-tip">
		    				<img width="32px" src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/2ac0b2b2d226d78b0f0994bf1bb078a4.png~tplv-obj.png">
		    				<span class="negativo">-10</span>
	    				</div>
	    			</div>
	    		</div>
		    	<div class="title-notis">Comandos Chat</div>
		    	<div class="info-tips">
		    		!sonidorand<br>!tts [text]<br>!hora<br>!hola<br>!adios
		    	</div>
		      <div class="title-notis text-start">Notificaciones</div>
		      <div class="notificaciones"></div>
		    </div>
		  </div>
		</div>
		`
		$('.chat').after(div);
		
		$("#countdown").countdown("2021/10/11 22:00:00", function(event) {
			$(this).html(
				event.strftime('%H:%M:%S')
			);
		});
	}


	// SONIDOS PARA LAS NOTIFICACIONES
	// --------------------------------------------------------------------------------------
	var joinChatSound = 'https://www.myinstants.com/media/sounds/note_mixdown.mp3'
	var likeSound = 'https://www.myinstants.com/media/sounds/kiss-tarkan.mp3'
	var followerSound = 'https://www.myinstants.com/media/sounds/neues-projekt_ZRG90O5.mp3'
	var sharerSound = 'https://www.myinstants.com/media/sounds/el-pepe_hGUhiaM.mp3'
	var giftSound1 = 'https://www.myinstants.com/media/sounds/magic-coins_RXOks55.mp3'
	var giftSound2 = 'https://www.myinstants.com/media/sounds/horndon.mp3'
	var giftSound5 = 'https://www.myinstants.com/media/sounds/epic-saxophone.mp3'
	var giftSound10 = 'https://www.myinstants.com/media/sounds/untitled_515.mp3'
	var giftSound50 = 'https://www.myinstants.com/media/sounds/buzina-continua-a.mp3'
	var giftSound100 = 'https://www.myinstants.com/media/sounds/twitch-alerts.mp3'
	var sonidosRandom = [
		'https://www.myinstants.com/media/sounds/weeeee.mp3',
		'https://www.myinstants.com/media/sounds/que-buen-dato-te-aventaste-pero-nadie-te-pregunto.mp3',
		'https://www.myinstants.com/media/sounds/el-pepe_hGUhiaM.mp3',
		'https://www.myinstants.com/media/sounds/phasmophobia-sound-board-effects-10-sound-effects-ghost-2-damaged.mp3',
		'https://www.myinstants.com/media/sounds/01-the-screaming-sheep.mp3',
		'https://www.myinstants.com/media/sounds/denied.mp3',
		'https://www.myinstants.com/media/sounds/classic_hurt.mp3',
		'https://www.myinstants.com/media/sounds/ringtone_20.mp3',
		'https://www.myinstants.com/media/sounds/mira-mi-huevo.mp3',
		'https://www.myinstants.com/media/sounds/eso_mentira_marrana.mp3',
		'https://www.myinstants.com/media/sounds/movie_1.mp3',
		'https://www.myinstants.com/media/sounds/perfect-fart.mp3',
		'https://www.myinstants.com/media/sounds/cr_suuu.mp3',
		'https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3',
		'https://www.myinstants.com/media/sounds/chupapi-munyanyo-sound-effects.mp3',
		'https://www.myinstants.com/media/sounds/wilo-hola-juan-carlos.mp3',
		'https://www.myinstants.com/media/sounds/ehhh-para-emocion.mp3',
		'https://www.myinstants.com/media/sounds/boomheadshot.swf.mp3',
		'https://www.myinstants.com/media/sounds/risa-ibai-online-audio-converter.mp3',
	]

	var interval = setInterval(() => {
		// SONIDO LOS USUARIOS QUE SE UNEN
		// --------------------------------------------------------------------------------------
		if (sonidos['join']) {
			if (joinChat === $('.webcast-chatroom__member-message-container')[0].outerText) {}
			else {
				joinChat = $('.webcast-chatroom__member-message-container')[0].outerText
				console.log('Joins: ' + joinChat)
				var audio = new Audio();
				audio.src = joinChatSound
				audio.play();
			}
		}

		// SONIDO PARA LOS LIKES
		// --------------------------------------------------------------------------------------
		if (sonidos['like']) {
			if (likes === $('.webcast-chatroom__like-message').length) {}
			else {
				likes = $('.webcast-chatroom__like-message').length
				likeNick = $('.webcast-chatroom__like-message')[likes-1].outerText
				console.log('Like: ' + likeNick)
				var audio = new Audio();
				audio.src = likeSound
				//audio.src = sonidosLike[Math.floor(Math.random() * sonidosLike.length)]
				audio.play();
			}
		}

		// SONIDOS PARA LOS FOLLOWS
		// --------------------------------------------------------------------------------------
		if (sonidos['follow']) {
			if ($('.webcast-chatroom__social-message:contains("seguir")').length > 0) {
				if (followers === $('.webcast-chatroom__social-message:contains("seguir")').length) {}
				else {
					followers = $('.webcast-chatroom__social-message:contains("seguir")').length
					followerMessage = $('.webcast-chatroom__social-message:contains("seguir")')[followers-1].outerText
					console.log('Seguidor: ' + followerMessage)
					var audio = new Audio();
					audio.src = followerSound
					audio.play();
				}
			}
		}

		// SONIDOS PARA LOS SHARES
		// --------------------------------------------------------------------------------------
		if (sonidos['share']) {
			if ($('.webcast-chatroom__social-message:contains("compart")').length > 0) {
				if (sharers === $('.webcast-chatroom__social-message:contains("compart")').length) {}
				else {
					sharers = $('.webcast-chatroom__social-message:contains("compart")').length
					sharerMessage = $('.webcast-chatroom__social-message:contains("compart")')[sharers-1].outerText
					console.log('Share: ' + sharerMessage)
					var audio = new Audio();
					audio.src = sharerSound
					audio.play();
				}
			}
		}

		// SONIDO PARA LOS REGALOS
		// --------------------------------------------------------------------------------------
		if (sonidos['gift']) {
			if (gifts === $('.webcast-chatroom__gift-message').length) {}
			else {
				gifts = $('.webcast-chatroom__gift-message').length
				giftMessage = $('.webcast-chatroom__gift-message')[gifts-1].outerText
				giftImage = $('.webcast-chatroom__gift-message .chat-message-item .content img')[gifts-1].src
				giftMessage = giftMessage.split("\n")
				giftNick = giftMessage[0]
				giftNumber = giftMessage[2].replace('×','')
				giftNumber = parseFloat(giftNumber)
				transformarRegalosObjeto(giftImage)
				.then(async(object) => {
					//console.log(contador + ' + (' + giftNumber + ' * ' + object.price + ')')
					sumatorio = giftNumber * object.price
					total = contador + sumatorio
					animateValue(contador, total, 1000)
					await $.ajax(`https://api.countapi.xyz/set/kevinsillo/1596?value=${total}`)
					$('.notificaciones').prepend(`<div class="burbuja"><span>${giftNick}</span> sent ${giftNumber} <img src="${object.url}" width="28px"></div>`)
					var audio = new Audio();
					if (sumatorio == 0) {
						audio.src = ''
					} else if (sumatorio == 1) {
						audio.src = giftSound1
					} else if (sumatorio >= 2 && sumatorio <= 4) {
						audio.src = giftSound2
					} else if (sumatorio >= 5 && sumatorio <= 9) {
						audio.src = giftSound5
					} else if (sumatorio >= 10 && sumatorio <= 49) {
						audio.src = giftSound10
					} else if (sumatorio >= 50 && sumatorio <= 99) {
						audio.src = giftSound50
					} else {
						audio.src = giftSound100
					}
					audio.play();
					if (sumatorio>=1) {
						console.log(`Regalo: ${giftNick} envió ${giftNumber} ${object.name}(${object.price}) = +${sumatorio} (${(sumatorio*valorMoneda).toFixed(2)} €)`)
					}
				})
			}
		}

		// SONIDO PARA LOS COMANDOS
		// --------------------------------------------------------------------------------------
		if (sonidos['command']) {
			if (messages === $('.webcast-chatroom__chat-message').length) {}
			else {
				messages = $('.webcast-chatroom__chat-message').length
				messageNick = $('.webcast-chatroom__chat-message .chat-message-item .webcast-chatroom__profile_wrapper .nickname')[messages-1].outerText
				messageText = $('.webcast-chatroom__chat-message .chat-message-item .content')[messages-1].outerText
				if (messageText === '!test') {
					var check = cooldown(7200, 'test', messageNick)
					if (check) {
						sendMessageChat('Test de mensaje')
					}
				}
				if (messageText.includes('!tts')) {
					var check = cooldown(30, 'random')
					if (check) {
						messageText = messageText.replace('!tts ', '')
						console.log('prueba: ' + messageText)
						textToSpeech(messageText)
					}
				}
				if (messageText === '!sonidorand') {
					var check = cooldown(25, 'random')
					if (check) {
						var audio = new Audio();
						audio.src = sonidosRandom[Math.floor(Math.random() * sonidosRandom.length)]
						audio.play();
					}
				}
				if (messageText === '!hola') {
					var check = cooldown(7200, 'hola', messageNick)
					if (check) {
						$.ajax('http://localhost:3000/saludo')
						console.log('Audio: saludo')
					}
				}
				if (messageText === '!adios') {
					var check = cooldown(7200, 'adios', messageNick)
					if (check) {
						$.ajax('http://localhost:3000/despedida')
						console.log('Audio: despedida')
					}
				}
				if (messageText === '!redes') {
					var check = cooldown(30, 'redes')
					if (check) {
						sendMessageChat('Links de redes sociales en el perfil de Kevinsillo');
					}
				}
				if (messageText === '!apoyo') {
					var check = cooldown(30, 'apoyo')
					if (check) {
						sendMessageChat('Si quieres apoyar, comparte, dale muchos likes y sigue a Kevinsillo');
					}
				}
				if (messageText === '!hora') {
					var check = cooldown(60, 'hora')
					if (check) {
						var hora = `Son las ${moment().format('HH:mm')} en Canarias`;
						sendMessageChat(`${hora}`);
					}
				}
				if (messageText.includes('!suerte')) {
					var check = cooldown(30, 'suerte')
					if (check) {
						var respuestas = ['Si','No','Quizá','En un futuro']
						var prediccion = `La predicción es: ${respuestas[Math.floor(Math.random() * respuestas.length)]}`
						sendMessageChat(prediccion);
					}
				}
			}
		}
	}, 300);

	// FUNCIONES
	// --------------------------------------------------------------------------------------

	// FUNCION PARA ANIMAR EL CONTADOR
	function animateValue(start, end, duracion) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duracion / range));
    var timer = setInterval(function() {
			current += increment;
			contador = current
			$('.contador').text(contador)
			if (current == end) {
				$('.contador').css('color','white')
				clearInterval(timer);
			}
    }, stepTime);
    if (start>end) {
			$('.contador').css('color','#e44d4d')
			$('.contador').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200); 
		} else {
			$('.contador').css('color','#0fab67')
			$('.contador').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200)
		}
	}

	// FUNCION PARA TEXT TO SPEECH
	function textToSpeech(text) {
		var msg = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		msg.lang = 'es-ES';
		msg.text = text;
		speechSynthesis.speak(msg);
	}

	// FUNCION PARA SILENCIAR LAS NOTIFICACIONES
	function silenciar(boton) {
		if (document.getElementById(boton).classList.contains('disable-button')) {
			console.log('Activando notificación de: ' + boton)
			document.getElementById(boton).classList.remove('disable-button')
			sonidos[boton] = true
		} else {
			console.log('Desactivando notificación de: ' + boton)
			document.getElementById(boton).classList.add('disable-button')
			sonidos[boton] = false
		}
	}

	// FUNCION PARA EL COOLDOWN DE LOS COMANDOS
	function cooldown(segundos, name, nick) {
		nick === undefined ? nick = '' : nick
	  var horaActual = moment()
	  if (fechaCooldown && fechaCooldown[name+nick]) {
	    var horaGuardada = moment(fechaCooldown[name+nick])
	    var horaCooldown = moment(horaGuardada).add(segundos, 'seconds')
	    var tiempoRestante = moment(horaCooldown).subtract(horaActual).format('HH:mm:ss')
	  } else {
	    fechaCooldown[name+nick] = moment().format()
	    return true
	  }
	  if (horaActual<horaCooldown) {
	    console.log('Aun no puedes lanzar este comando. Faltan: '+tiempoRestante+' seg.');
	    return false
	  } else {
	  	return true
	  }
	}

	// FUNCION PARA ENVIAR MENSAJES AL CHAT
	function sendMessageChat(message) {
		function getCookie(cookiename) { 
			var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
			//var cookiestring = document.cookie.match(/[^;]+/g)[1]
			return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
		}

		var msToken = getCookie('msToken')
		var room_id = __RoomMessage._cacheENVConfig.auth.room_id
		var message = encodeURIComponent(message)

		fetch(`https://webcast.tiktok.com/webcast/room/chat/?channel=web&aid=1988&app_language=es&webcast_language=es&app_name=tiktok_web&device_platform=web&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=es&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F94.0.4606.71%20Safari%2F537.36%20Edg%2F94.0.992.38&browser_online=true&tz_name=Atlantic%2FCanary&msToken=${msToken}&X-Bogus=DFSzswVLxQHVgTHgSm7pxGXyYJWp&_signature=_02B4Z6wo00001r8Wj.gAAIDDnLehV9tCFQK.FotAAM6m27`, {
		"headers": {
			"accept": "application/json, text/plain, *",
			"accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			"response-format": "json",
			"sec-ch-ua": "\"Chromium\";v=\"94\", \"Microsoft Edge\";v=\"94\", \";Not A Brand\";v=\"99\"",
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": "\"Windows\"",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site",
			"x-secsdk-csrf-token": "0001000000015fdcc0c53751b5488432ff3c02aad4f72c05f91b7a2889559bd874baf7a0d70e16ab203ad441fe91"
		},
		"referrer": "https://www.tiktok.com/",
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": `room_id=${room_id}&content=${message}`,
		"method": "POST",
		"mode": "cors",
		"credentials": "include"
		})
		.then((response) => {
			console.log(response)
		})
		.catch(function(err) {
	    console.log('Fetch Error: '+err);
	  });
	}

	// FUNCION PARA CONVERTIR LAS URL STRING DE LAS IMAGENES EN OBJETOS CON EL DETALLE DE CADA PROPINA
	async function transformarRegalosObjeto(image) {
		switch (image) {
			// PUNTOS QUE SUMAN AL CONTADOR
			//--------------------------------------------------------------------------------------------------------------------
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png":
				return {name: 'rosa',	price: 1,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/a4c4dc437fd3a6632aba149769491f49.png~tplv-obj.png":
				return {name: 'k-heart',	price: 5,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/7d055532898d2060101306de62b89882~tplv-obj.png":
				return {name: 'piruleta',	price: 10,	url: image}
				break;
			/*
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/4e7ad6bdf0a1d860c538f38026d4e812~tplv-obj.png":
				return {name: 'rosquilla',	price: 30,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/6cd022271dc4669d182cad856384870f~tplv-obj.png":
				return {name: 'corazon-manos',	price: 100,	url: image}
				break;
			*/
			// PUNTOS QUE RESTAN AL CONTADOR
			//--------------------------------------------------------------------------------------------------------------------
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/802a21ae29f9fae5abe3693de9f874bd~tplv-obj.png":
				return {name: 'tiktok',	price: -1,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/8d4381b7d2272ffc14227c3705832e24~tplv-obj.png":
				return {name: 'microfono',	price: -5,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/2ac0b2b2d226d78b0f0994bf1bb078a4.png~tplv-obj.png":
				return {name: 'buenas-noches',	price: -10,	url: image}
				break;
			// LUNA
			// 
			// PUNTOS DESACTIVADOS
			//--------------------------------------------------------------------------------------------------------------------
			/*
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/c87cfa4c1073085814424d6bf9bec1f0~tplv-obj.png":
				return {name: 'galleta',	price: -1,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png":
				return {name: 'rosa',	price: 1,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/968820bc85e274713c795a6aef3f7c67~tplv-obj.png":
				return {name: 'helado',	price: 1,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/77259f70262b6632b9926a4a7ed12391~tplv-obj.png":
				return {name: 'panda',	price: 5,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/c923ea5e746827207b1c2d3ce8d75d76~tplv-obj.png":
				return {name: 'flores',	price: 7,	url: image}
				break;
			case "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/2b779641e95ace68709d583ac2295825~tplv-obj.png":
				return {name: 'radio',	price: 15,	url: image}
				break;
			*/
			//--------------------------------------------------------------------------------------------------------------------
			default:
				return {name: 'otro',	price: 0,	url: image}
		}
	}
}
initApplication()
