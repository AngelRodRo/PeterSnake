$(document).on('ready', function() {
	//Vamos a crear un contexto 2d de nuestro canvas.
	var canvas = $("#snake")[0];
	var context = canvas.getContext("2d");
	var finestraModal = document.getElementById("finestra-modal"),
			finestraModalObrir = document.getElementById("finestra-modal-obrir"),
			finestraModalTancar = document.getElementById("finestra-modal-tancar");

	var finestraModal2 = document.getElementById("finestra-modal2"),
			finestraModalObrir2 = document.getElementById("finestra-modal-obrir2"),
			finestraModalTancar2 = document.getElementById("finestra-modal-tancar2");

	var finestraModal3 = document.getElementById("finestra-modal3"),
			finestraModalObrir3 = document.getElementById("finestra-modal-obrir3"),
			finestraModalTancar3 = document.getElementById("finestra-modal-tancar3");

	//Obtenemos el ancho y alto de nuestro canvas.
	var width = $("#snake").width();
	var height = $("#snake").height();
	document.getElementById('color1').style.background='#000000';
	document.getElementById('finestra-modal-obrir').style.display = 'none';
	document.getElementById('noSonido').style.display = 'none';		
	var arrayWall=[{x:1,y:5},{x:2,y:6},{x:3,y:7},{x:4,y:7},{x:5,y:7},{x:6,y:6},{x:5,y:5},{x:5,y:5},{x:4,y:5},{x:3,y:4}];

	//Definimos algunas variables para configurar nuestro juego
	var cellWidth = 50;

	var d;

	var food;
	//var stop;
	var score;
	var level = 1; //1 El nivel más lento, 10 el nivel más rápido.
	var background = '#27ae60';
	var border = 'black';
	var snakeColor = 'black';
	var array;
	var iBody = new Image();
	var iFood = new Image();
	var iHead = new Image();
	var iHead2 = new Image();
	var iHead3 = new Image();
	var iHead4 = new Image();
	var aEat = new Audio();
	var aDie = new Audio();
	var salto = new Audio();
	var iBackground = new Image();

	//Creamos nuestra víbora
	var snake;

	//El juego tiene la dirección "right" por defecto y se ejecuta la función paint
	//dependiendo el nivel que hayas configurado arriba

	finestraModal3.classList.add("js-mostrar3");
	function init()
	{
		//return;
		d = "down";
		createSnake();
		createFood();
		score = 0;


		/*if(typeof gameLoop != "undefined") {
			clearInterval(gameLoop);
		}*/

		/*agregacion de imagenes*/
		iBody.src = 'assets/body.png';
		iFood.src = 'assets/appleRed.png';
		iHead.src = 'assets/abajo_snake.png';
		iHead2.src = 'assets/arriba_snake.png';
		iHead3.src = 'assets/izq_snake.png';
		iHead4.src = 'assets/der_snake.png';
		aEat.src = 'assets/come.oga';
		aDie.src = 'assets/muere.oga';
		iBackground.src = 'assets/fondoSecuencial.png';
		salto.src= 'assets/salto.wav';



		//iBrick.src = 'assets/brick.png';


	// gameLoop = setInterval(paint, 1000 / level);

	}

	//init();

	iBackground.onload = function(){

	context.drawImage( iBackground, 0, 0, width, height );

	setTimeout(paint,1000,"left");
	setTimeout(paint,2000,"left");
	setTimeout(paint,3000,"down");
	setTimeout(paint,4000,"down");

	}

	//Creamos la víbora
	function createSnake()
	{
		var length = 6;
		snake = [];

		for(var i = length - 1; i >= 0; i--)
		{
			snake.push({ x: 4, y: i-2 });
		}
	}


	//Creamos la comida de la víbora de manera aleatoria
	function createFood()
	{
		food = {
			x: Math.round(0.6 * (width - cellWidth) / cellWidth),
			y: Math.round(0.7 * (height - cellWidth) / cellWidth),

		};

	}

	//Dibujamos la víbora
	function paint(direccion)

	{
		context.drawImage( iBackground, 0, 0, width, height );

		console.log(direccion);
		var dir=direccion;
		d=dir;
		console.log(dir);



		var nx = snake[0].x;
		var ny = snake[0].y;

		if (dir == "right") {
			nx++;

		}
		else if (dir == "left") {
			nx--;

		}
		else if (dir == "up") {
			ny--;
		}
		else if (dir == "down") {
			ny++;
		}

		if (nx == -1 || nx == width / cellWidth || ny == -1 ||

			ny == height / cellWidth || checkCollision(nx, ny, snake) || checkCollision(nx,ny,arrayWall )) {

			emptyContainer();
			finestraModal2.classList.add("js-mostrar2");

			aDie.play();
			return;


		}

		if(nx == food.x && ny == food.y) {

			var tail = {
				x: nx,
				y: ny
			};


			score++;
			aEat.play();

			emptyContainer();
			finestraModal.classList.add("js-mostrar");
			document.getElementById('finestra-modal-obrir').style.display = 'block';
			return;



		} else {

			salto.play();
			var tail = snake.pop();

			tail.x = nx;
			tail.y = ny;

		}

		typeCell='food';
		paintCell(food.x, food.y,typeCell);

		snake.unshift(tail);
		//Pintar cabeza
		var typeCell="head";
		var c = snake[0];
		paintCell(c.x, c.y, typeCell);

		//Pintar Cuerpo
		typeCell='body';
		for(var i = 1; i < snake.length; i++) {

			c = snake[i];
			paintCell(c.x, c.y, typeCell);
		}


		var scoreText = "Score: " + score;

		context.fillText(scoreText, 5, height - 5);

	}

	function paintCell(x, y, type)
	{
		var t=type;
		if (t=="food") {
			context.drawImage(iFood, x * cellWidth, y * cellWidth, cellWidth, cellWidth);

		}
		else if (t=="head"){
			if(d=="down"){
			context.drawImage(iHead, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			}
			else if (d=="right"){
			context.drawImage(iHead4, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			}
			else if (d=="up"){
			context.drawImage(iHead2, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			}
			else if (d=="left"){
			context.drawImage(iHead3, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
			}
		}
		else if (t=="body"){
			context.drawImage(iBody, x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		}
	}


	//Verificiamos si hubo alguna colisión (si la hubo el juego se reinicia)

	function checkCollision(x, y,array)
	{
		//console.log(arrayWall);
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y) {
				return true;

			}
		}

		return false;
	}

	function down(){
		d="down";
		paint();
	}
	function up(){
		d="up";
		paint();
	}
	function left(){
		d="left";
		paint();
	}

	function right(){
		d="right";
		paint();
	}


	var btnRepetir=$('#repetir');
	btnRepetir.click(repetirDenuevo);

	function repetirDenuevo(){
		finestraModal.classList.remove("js-mostrar");
		init();
		return;
	}

	var btnRepetir_pierde=$('#repetir2');
	btnRepetir_pierde.click(repetirDenuevo2);

	function repetirDenuevo2(){
		finestraModal2.classList.remove("js-mostrar2");

		location.reload();	


	}

	var btnaspa=$('#finestra-modal-tancar');
	btnaspa.click(Aspa);

	function Aspa(){
		finestraModal.classList.remove("js-mostrar");
		init();
	}

	var btnaspa2=$('#finestra-modal-tancar2');
	btnaspa2.click(Aspa2);

	function Aspa2(){
		finestraModal2.classList.remove("js-mostrar2");

		location.reload();			

	}

	var btnaspa3=$('#finestra-modal-tancar3');
	btnaspa3.click(Aspa3);

	function Aspa3(){
		finestraModal3.classList.remove("js-mostrar3");
		init();
		document.getElementById("fondo").play();
	}

	var btnmostrarCodigo=$('#finestra-modal-obrir');
	btnmostrarCodigo.click(MostrarCodigo);

	function MostrarCodigo(){
		finestraModal.classList.add("js-mostrar");
	}

	var btn_nosonido=$('#noSonido');
	btn_nosonido.click(noSonido);

	function noSonido(){

		document.getElementById('noSonido').style.display = 'none';
		document.getElementById('fondo').play();		
		document.getElementById('Sonido').style.display = 'block';			
		
	}

	var btnsonido=$('#Sonido');
	btnsonido.click(Sonido);

	function Sonido(){

		document.getElementById('Sonido').style.display = 'none';
		document.getElementById("fondo").pause();
		document.getElementById('noSonido').style.display = 'block';			

	}

	var btnCompile=$('#compile');
	btnCompile.click(recyclerPiece1);

	function recyclerPiece1(){
		//document.getElementById('compile').style.display = 'none';

		var pieceBox=document.getElementsByClassName('piece-box');
		var pieces=document.getElementById('piece-box').getElementsByClassName('piece');
		var piece;
		var instruction;
		var length=pieces.length;
		var i=0;
		var array=[];
		console.log(length);

		for(var i = 0; i < length; i++)
		{
				console.log(pieces);
				instruction=pieces[i].dataset.instruction;

				console.log(instruction);
				setTimeout(paint,i*1000,instruction);
				array[i]=instruction;
				console.log(array);

		}
		setTimeout(mostrarModalsiperdio,i*1000,0);

	}

	function mostrarModalsiperdio(nada){
		if (score==0) {
			aDie.play();
			finestraModal2.classList.add("js-mostrar2");
			console.log(score);
			emptyContainer();
			return;
		}
	}

	function execInstruction(instruction ){
		if (instruction == "left" && d != "right") {
			left();

		} else if (instruction == "up" && d != "down") {
			up();

		} else if (instruction == "right" && d != "left") {
			right();


		} else if (instruction == "down" && d != "up") {
			down();
		}
	}


	var btnEmpty=$('#empty');
	btnEmpty.click(emptyContainer);

	function emptyContainer(){
		document.getElementById('piece-box').innerHTML= "";

	}
/*
	window.onload = function() {
	visor=document.getElementById("reloj"); //localizar pantalla del reloj
	//asociar eventos a botones: al pulsar el botón se activa su función.

	document.cron.boton1.onclick = activo;
	document.cron.boton2.onclick = pausa;
	document.cron.boton1.disabled=false;
	document.cron.boton2.disabled=true;

	//variables de inicio:
	var marcha=0; //control del temporizador
	var cro=0; //estado inicial del cronómetro.

	}
<<<<<<< HEAD
=======

	//botón Empezar / Reiniciar
	window.onload = function activo (){
		visor=document.getElementById("reloj");
		document.cron.boton2.onclick = pausa;
	     if (document.cron.boton1.value=="Empezar") { //botón en "Empezar"
	        empezar() //ir  la función empezar
	        }
	     else {  //Botón en "Reiniciar"
	        reiniciar()  //ir a la función reiniciar
	        }
	     }
	//botón pausa / continuar
	function pausa (){
	     if (marcha==0) { //con el boton en "continuar"
	        continuar() //ir a la función continuar
	        }
	     else {  //con el botón en "parar"
	        parar() //ir a la funcion parar
	        }
	     }
	//Botón 1: Estado empezar: Poner en marcha el crono

	function empezar() {
	      emp=new Date() //fecha inicial (en el momento de pulsar)
	      elcrono=setInterval(tiempo,10); //función del temporizador.
	      marcha=1 //indicamos que se ha puesto en marcha.
	      document.cron.boton1.value="Reiniciar"; //Cambiar estado del botón
	      document.cron.boton2.disabled=false; //activar botón de pausa
	      }
	//función del temporizador
	function tiempo() {
	     actual=new Date(); //fecha a cada instante
	        //tiempo del crono (cro) = fecha instante (actual) - fecha inicial (emp)
	     cro=actual-emp; //milisegundos transcurridos.
	     cr=new Date(); //pasamos el num. de milisegundos a objeto fecha.
	     cr.setTime(cro);
	        //obtener los distintos formatos de la fecha:
	     cs=cr.getMilliseconds(); //milisegundos
	     cs=cs/10; //paso a centésimas de segundo.
	     cs=Math.round(cs); //redondear las centésimas
	     sg=cr.getSeconds(); //segundos
	     mn=cr.getMinutes(); //minutos
	     ho=cr.getHours()-19; //horas

	        //poner siempre 2 cifras en los números
	     if (cs<10) {cs="0"+cs;}
	     if (sg<10) {sg="0"+sg;}
	     if (mn<10) {mn="0"+mn;}
	        //llevar resultado al visor.
	     visor.innerHTML=ho+" "+mn+" "+sg+" "+cs;

	     }
	//parar el cronómetro
	function parar() {
	     clearInterval(elcrono); //parar el crono
	     marcha=0; //indicar que está parado.
	     document.cron.boton2.value="Continuar"; //cambiar el estado del botón
	     }
	//Continuar una cuenta empezada y parada.
	function continuar() {
	     emp2=new Date(); //fecha actual
	     emp2=emp2.getTime(); //pasar a tiempo Unix
	     emp3=emp2-cro; //restar tiempo anterior
	     emp=new Date(); //nueva fecha inicial para pasar al temporizador
	     emp.setTime(emp3); //datos para nueva fecha inicial.
	     elcrono=setInterval(tiempo,10); //activar temporizador
	     marcha=1; //indicar que esta en marcha
	     document.cron.boton2.value="parar"; //Cambiar estado del botón
	     document.cron.boton1.disabled=true; //activar boton 1 si estuviera desactivado
	     }
	//Volver al estado inicial
	function reiniciar() {
	     if (marcha==1) {  //si el cronómetro está en marcha:
	         clearInterval(elcrono); //parar el crono
	         marcha=0;	//indicar que está parado
	         }
			     //en cualquier caso volvemos a los valores iniciales
	     cro=0; //tiempo transcurrido a cero
	     visor.innerHTML = "0 00 00 00"; //visor a cero
	     document.cron.boton1.value="Empezar"; //estado inicial primer botón
	     document.cron.boton2.value="Parar"; //estado inicial segundo botón
	     document.cron.boton2.disabled=true;  //segundo botón desactivado
	     }

>>>>>>> 40205c2f96953bc8966947a477d25b04cc0726ab

	//botón Empezar / Reiniciar
	window.onload = function activo (){
		visor=document.getElementById("reloj");
		document.cron.boton2.onclick = pausa;
	     if (document.cron.boton1.value=="Empezar") { //botón en "Empezar"
	        empezar() //ir  la función empezar
	        }
	     else {  //Botón en "Reiniciar"
	        reiniciar()  //ir a la función reiniciar
	        }
	     }
	//botón pausa / continuar
	function pausa (){
	     if (marcha==0) { //con el boton en "continuar"
	        continuar() //ir a la función continuar
	        }
	     else {  //con el botón en "parar"
	        parar() //ir a la funcion parar
	        }
	     }
	//Botón 1: Estado empezar: Poner en marcha el crono

	function empezar() {
	      emp=new Date() //fecha inicial (en el momento de pulsar)
	      elcrono=setInterval(tiempo,10); //función del temporizador.
	      marcha=1 //indicamos que se ha puesto en marcha.
	      document.cron.boton1.value="Reiniciar"; //Cambiar estado del botón
	      document.cron.boton2.disabled=false; //activar botón de pausa
	      }
	//función del temporizador
	function tiempo() {
	     actual=new Date(); //fecha a cada instante
	        //tiempo del crono (cro) = fecha instante (actual) - fecha inicial (emp)
	     cro=actual-emp; //milisegundos transcurridos.
	     cr=new Date(); //pasamos el num. de milisegundos a objeto fecha.
	     cr.setTime(cro);
	        //obtener los distintos formatos de la fecha:
	     cs=cr.getMilliseconds(); //milisegundos
	     cs=cs/10; //paso a centésimas de segundo.
	     cs=Math.round(cs); //redondear las centésimas
	     sg=cr.getSeconds(); //segundos
	     mn=cr.getMinutes(); //minutos
	     ho=cr.getHours()-19; //horas

	        //poner siempre 2 cifras en los números
	     if (cs<10) {cs="0"+cs;}
	     if (sg<10) {sg="0"+sg;}
	     if (mn<10) {mn="0"+mn;}
	        //llevar resultado al visor.
	     visor.innerHTML=ho+" "+mn+" "+sg+" "+cs;

	     }
	//parar el cronómetro
	function parar() {
	     clearInterval(elcrono); //parar el crono
	     marcha=0; //indicar que está parado.
	     document.cron.boton2.value="Continuar"; //cambiar el estado del botón
	     }
	//Continuar una cuenta empezada y parada.
	function continuar() {
	     emp2=new Date(); //fecha actual
	     emp2=emp2.getTime(); //pasar a tiempo Unix
	     emp3=emp2-cro; //restar tiempo anterior
	     emp=new Date(); //nueva fecha inicial para pasar al temporizador
	     emp.setTime(emp3); //datos para nueva fecha inicial.
	     elcrono=setInterval(tiempo,10); //activar temporizador
	     marcha=1; //indicar que esta en marcha
	     document.cron.boton2.value="parar"; //Cambiar estado del botón
	     document.cron.boton1.disabled=true; //activar boton 1 si estuviera desactivado
	     }
	//Volver al estado inicial
	function reiniciar() {
	     if (marcha==1) {  //si el cronómetro está en marcha:
	         clearInterval(elcrono); //parar el crono
	         marcha=0;	//indicar que está parado
	         }
			     //en cualquier caso volvemos a los valores iniciales
	     cro=0; //tiempo transcurrido a cero
	     visor.innerHTML = "0 00 00 00"; //visor a cero
	     document.cron.boton1.value="Empezar"; //estado inicial primer botón
	     document.cron.boton2.value="Parar"; //estado inicial segundo botón
	     document.cron.boton2.disabled=true;  //segundo botón desactivado
	     }

*/
});
