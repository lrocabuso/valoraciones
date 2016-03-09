(function($){
    //Clase Valoraciones
    var Valoraciones = function(elemento,opciones){
        //almacenaremos el this para poder manipularlo después (por llamar a métodos públicos de la clase
		//dentro de funciones de JQUERY donde se utilice también el objeto $(this).
        var clase = this;
		// almacenamos el elemento DOM sobre el que vamos a trabajar
        var $div_valoraciones = $(elemento);
		// Nombre de la propiedad que identifica a cada marcador y prefijo para crear nombres de atributos
		var atributo="star";
		// Filtro para seleccionar un marcador de la lista de marcadores
		var filtro="["+atributo+"='valor']";
		// Elemento con el que se crea cada marcador
		var estrella_vacia='<i class="fa fa-star-o estrella"></i>';
		// Clase que representa un marcador activado
		var class_llena="fa-star activa";
		// Clase que representa un marcador desactivado		
		var class_vacia="fa-star-o";
		// selector del marcador
		var selector="i.estrella";
		// selector del marcador activado (utilizado para contar el total de marcadores activados)
		var selector_activo=selector+".activa";
		// Nombre de las propiedades que se buscarán en el div contenedor
		var att_tot=atributo+"_tot";
		var att_ini=atributo+"_ini";
		var att_max=atributo+"_max";
		var att_eve=atributo+"_eve";
		var att_enb=atributo+"_enb";	
		var att_color=atributo+"_color";								
		// Valores por defecto para las propiedades de la herramienta
		var max_stars=25;
		var ini_stars=5;
		var ini_max=25;
		var ini_val=0;
		var color_stars='#FC3';
         // Incorporamos las opciones definidas por el usuario
        var cfg = $.extend({
				star_tot:ini_stars,
				star_max:ini_max,
				star_ini:ini_val,
				star_color:color_stars,
				star_valor:ini_val,
				star_enable:true,
				evento:'click',
				callback:null				
        }, opciones || {});
		//-------------------------------------------------------------------------------
		var isnumber = function(valor) {
			return (typeof(parseInt(valor))==='number');
		};
		var isboolean = function(valor) {
			return (typeof(valor)==='boolean');
		};
		var isfunction = function(valor) {
			return (typeof(valor)==='function');
		};	
		var iscolor = function(valor) {
			var color;
			if(valor.substr(0,1)!='#') color=valor.substr(0);
			else color=valor.substr(1);
			return (typeof(parseInt('0x'+color))==='number');
		};				
		// Comprueba si los valores de las propiedades son correctos
		var valida_propiedades = function() {
			if(!iscolor(cfg.star_color)) cfg.star_color=color_stars;	
			if(cfg.star_color.substr(0,1)!='#') cfg.star_color='#'+cfg.star_color;
			if(cfg.star_tot>max_stars) cfg.star_tot=max_stars;
			if(cfg.star_max<cfg.star_ini) cfg.star_max=ini_max;
			if(cfg.star_ini<0 || cfg.star_ini>cfg.star_max) cfg.star_ini=ini_val;
			if(!isboolean(cfg.star_enable)) cfg.star_enable=false;				
		};		
		// Activa un indicador de valoración
		var fact = function(x) {
			$(filtro.replace('valor',x),$div_valoraciones).removeClass(class_vacia).addClass(class_llena).css('color',cfg.star_color);
		};
		// Desactiva un indicador de valoración		
		var fdes = function(x) {
			$(filtro.replace('valor',x),$div_valoraciones).removeClass(class_llena).addClass(class_vacia).css('color','');
		};
		// Devuelve un objeto con los valores actuales de las propìedades
		var datos = function() {
			var datos_valoracion = {valor: cfg.star_valor, 
									marcadores:cfg.star_tot, 
									maximo:cfg.star_max, 
									estado:cfg.star_enable,
									selector:$div_valoraciones};
			return datos_valoracion;
		};
		// Activa/Desactiva los indicadores según la estrella sobre la que actua el ratón
		var poner_activas = function(pos,valorar) {
			for(x=0;x<=pos;x++) fact(x);
			for(;x<cfg.star_tot;x++) fdes(x);
			if(valorar) clase.Valor();
		};
		// Pinta el total de marcadores de la herramienta
		var pinta_marcadores = function() {
			// Limpiamos el contenedor
			$div_valoraciones.empty();
			// Pintamos los marcadores (estrellas)
			for(x=0;x<cfg.star_tot;x++) $div_valoraciones.append(estrella_vacia);
			// Asigamos a cada marcador su nº de orden
			$(selector,$div_valoraciones).each(function(index, element) {
					$ele=$(this);
					$ele.attr(atributo,index);
			});					
		};
		// Asigna los eventos de ratón a cada marcador
		var asigna_eventos = function() {			
			if(cfg.evento!='click' && cfg.evento != 'hover') cfg.evento='click';
			$(selector,$div_valoraciones).each(function(index, element) {
				var disable_hover=false;
				$ele=$(this);
				// Si es el primer marcador
				if (index==0) {
					// Configuramos su evento doble click para poner a cero todos los marcadores
					$ele.dblclick(function(event) {
						// si el estado del marcador es activo
						if(cfg.star_enable) {
							// Impedimos que se ejecute el evento click del elemento
							event.stopPropagation();							
							// Desactivamos todos los marcadores							
							poner_activas(-1,true);
							// Llamamos a la función callback del usuario
							if(isfunction(cfg.callback)) {cfg.callback(datos());}
							// Desactivamos temporalmete el evento hover del elemento
							disable_hover=true;
						}
					});
				};
				switch(cfg.evento) {
					case 'click': 
					$ele.click(function(e) {
						if(cfg.star_enable) {
							poner_activas($(this).attr(atributo),true);
							if(isfunction(cfg.callback)) {cfg.callback(datos());}
						}
					});
					break;
					case 'hover':					
					$ele.hover(function(e) {
						if(cfg.star_enable) {
							if(disable_hover) {
								disable_hover=false; 
							} else {
								poner_activas($(this).attr(atributo),true);							
								if(isfunction(cfg.callback)) {cfg.callback(datos());}
							}
						}						
					});
					break;
				};
			});
		};
		// Establece el valor inicial que se tiene que representar
		var valor_inicial = function(valor) {
			if(isnumber(valor) && valor >=0 && valor<=cfg.star_max) cfg.star_ini=valor;
			clase.Valor(cfg.star_ini);
		};
// PROPIEDADES PUBLICAS ACCESIBLES EN TIEMPO DE EJECUCIÓN		
// -------------------------------------------------------------------------
		// Devuelve o establece el valor de la valoración actual
		this.Valor = function(valor) {
			var puntos=0;
			if(valor && isnumber(valor)) {
				puntos = Math.floor(cfg.star_tot*valor/cfg.star_max);
				poner_activas(puntos-1,false);	
			} else {
				puntos=$(selector_activo,$div_valoraciones).length;
			}
			cfg.star_valor=Math.floor(cfg.star_max/cfg.star_tot*puntos);
			return cfg.star_valor;
		};
		// Activa/Desactiva las acciones del ratón	
		this.Activar = function(estado) {
			if(!isboolean(estado)) return;
			cfg.star_enable=estado;
		};
		// Establece la cantidad de marcadores
		this.Marcadores = function(total) {
		    if(isnumber(total) && total <= max_stars) cfg.star_tot=total;
			pinta_marcadores();
			if(cfg.star_valor>0) valor_inicial(cfg.star_valor);
			else valor_inicial(cfg.star_ini);
			asigna_eventos();
		};
		// Establece el valor máximo que puede representar
		this.Maximo = function(total) {
		    if(isnumber(total) && total >= cfg.star_ini) cfg.star_max=total;
			clase.Valor(cfg.star_valor);
		};		

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//	Después de definir los métodos de trabajo, realizamos realmente el proceso de agregar los iconos y
//	controlar los cambios de los campos para realizar las valoraciones realizando una llamada al método
//  marcadores de la clase		
			
			if($div_valoraciones.attr(att_ini)) {
				cfg.star_ini=$div_valoraciones.attr(att_ini);
			} 
			if($div_valoraciones.attr(att_max)) {
				cfg.star_max=$div_valoraciones.attr(att_max);
			} 			
			if($div_valoraciones.attr(att_tot)) {
				cfg.star_tot=$div_valoraciones.attr(att_tot);
			}
			if($div_valoraciones.attr(att_eve)) {
				cfg.evento=$div_valoraciones.attr(att_eve);
			} 
			if($div_valoraciones.attr(att_color)) {
				cfg.star_color=$div_valoraciones.attr(att_color);
			} 			
			if($div_valoraciones.attr(att_enb)) {
				cfg.star_enable=!($div_valoraciones.attr(att_enb)==="false");
			}
			valida_propiedades();
			clase.Marcadores(cfg.star_tot);
		
//---------------------------------
// FINAL DE LA CLASE			
//---------------------------------
    	}; 
 //*************************************************************************************************
    //Esta función genera la instancia de nuestra Clase
    $.fn.valoraciones = function(opciones){
        return this.each(function(){
            var oElemento = $(this);
             
            //Si ya se cuenta con una instancia del objeto
            //hacemos un return para evitar generarla nuevamente
            if(oElemento.data('objeto')) return;
             
            //aquí generamos el objeto donde ingresamos el parametro
            // "this" que sera nuestro elemento
            var oValoraciones = new Valoraciones(this,opciones);
             
            //Ahora guardamos la instancia del objeto en el elemento
            oElemento.data('objeto', oValoraciones);
        });
    };
})(jQuery);