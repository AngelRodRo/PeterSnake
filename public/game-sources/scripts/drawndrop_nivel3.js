$(document).on('ready',function (){
    var box=document.querySelector('.piece-box');
    var pieces=document.getElementsByClassName('piece');
    var pieceFor=document.querySelector('.piece-for');

    console.log(pieceFor);
    box.addEventListener('drop', recogerpieza,false);
    box.addEventListener('dragover', piezasobre,false);
    box.addEventListener('dragenter', piezaingresa,false);
    box.addEventListener('dragleave', piezasale,false);
    console.log(box);
    for(i in pieces){
      var piece=pieces[i];
      if(typeof piece.style != 'undefined')
      {
        piece.addEventListener('dragstart', alzarpieza, false);
        piece.addEventListener('dragend', soltarpieza, false);
      }

    }

    function alzarpieza(e){
      box.addEventListener('drop', recogerpieza,false);
      console.log(e);
      this.style.backgroundColor='#e74c3c';
      //Creamos un padre
      var padre=document.createElement('div');
      //creamos un clon de la pieza
      var clon=this.cloneNode(true);
      //Agregamos como el clon como hijo del contenedor que hemos creado
      padre.appendChild(clon);
      //se puede agregar informacion al evento mediante su elemento dataTransfer
      //Nosotros agregaremos el codigo html que tiene el padre en su interior
      //osea le agregaremos el clon
      e.dataTransfer.setData('text',padre.innerHTML);
      console.log(padre);
      padre.appendChild(clon);
      document.getElementById("teclea2").play();
    }

    function recogerpieza(e){
      e.preventDefault();
      var datoclon=e.dataTransfer.getData('text');
      console.log(datoclon);
      this.innerHTML += datoclon;
      droppablePieceFor();
    }
    function soltarpieza(e){
        e.preventDefault();
      this.style.backgroundColor='#3498db';
      //this.style.height='#3498db';
      document.getElementById("teclea1").play();
    }

    function piezasobre(e){
      e.preventDefault();
      this.style.backgroundColor='';
    }
    function piezaingresa(e){
      // console.log(e.target.id);
      // console.log(e.target.parentNode);
      if (e.target.id == 'piece-for' || e.target.id == 'piece-if') {
        console.log(e.target.parentNode);
        e.target.parentNode.removeEventListener('drop',recogerpieza,false);

      }

    }
    function piezasale(e){
      console.log(e.target.parentNode);
      // if (e.target.id == 'piece-for' || e.target.id == 'piece-if') {
      //   e.target.parentNode.addEventListener('drop',recogerpieza,false);
      // }
    }
    function droppablePieceFor(){
      piecesFor=document.querySelectorAll('.piece-box .piece-for');
      console.log(piecesFor);
      for(i in piecesFor){
        var pieceFor=piecesFor[i];
        if(typeof pieceFor.style != 'undefined' )
        {
          console.log(pieceFor);
          pieceFor.addEventListener('drop', recogerpieza,false);
          pieceFor.addEventListener('dragover', piezasobre,false);
        }
      }
    }

})
