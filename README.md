# Valoraciones 1.2 #

![JQUERY 1.11.3][jquery] ![FONT-AWESOME 4.5.0][font-awesome]

Valoraciones es un plugin de jQuery, que nos permite puntuar o valorar de forma gráfica por medio de estrellas coloreadas, los contenidos o artículos de nuestra web.

Es completamente gratuita, redistribuible y reconfigurable por cualquier usuario bajo licencia MIT.

Básicamente consta de un conjunto de marcadores con 15 posibles formas sobre los que podemos actuar haciendo click sobre un icono o moviendo el ratón por encima de los iconos para calificar o puntuar.

Para los marcadores hace uso de las famosas font-Awesome que nos proporcionan iconos vectoriales.

La puntuación asignada se basa en la parte proporcional de la estrella seleccionada con respecto a la cantidad de estrellas que se muestran sobre una puntuación máxima que establecemos a la hora de crear el plugin.

## Archivos necesarios ##

1.  JQuery *

    ``<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script> ``

2.  font-Awesome *

    ``<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">``

3.  El archivo valoraciones.min.js

    ``<script src="js/valoraciones.min.js"></script>``

`*` Si decides almacenar los archivos en tu web los encontrarás en los directorios dist/jquery y dist/font-awesome.

## Funcionamiento básico de la herramienta ##

Si ya tenemos incorporados los archivos necesarios en nuestra sección de cabecera, lo más sencillo consiste en seleccionar un contenedor para nuestros marcadores (mediante un selector de JQuery) e invocar la función .valoraciones() para que automáticamente se muestren el conjunto de marcadores con los que realizar nuestra valoración.

`<div id="puntos"></div>`  
`<script>`  
`$(function() {$('#puntos').valoraciones();});`  
`</script>`  


Este ejemplo nos creará un marcador con 5 estrellas para puntuar de 0 a 25, donde sólo tendremos que ir pulsando sobre las estrellas para ir dando más o menos puntuación. 1 estrella marcada -> 5 puntos, 2 estrellas marcadas -> 10, ... 5 estrellas marcadas -> 25 puntos.

Para modificar las características del marcador, podemos invocar a la función pasándole un conjunto de propiedades con sus valores.

En este ejemplo crearemos un marcador de 8 iconos de tipo 'pila/batería' que puntúe de 0 a 90 y que en lugar de utilizar el evento click del ratón utilice el evento hover (deslizarse sobre las estrellas).

`<div id="puntos"></div>`  
`<script>`  
`$(function() {$('#puntos').valoraciones({star_tot:8, star_max:90, evento:'hover', star_ico:7});});`  
`</script>`

En este caso 1 estrella marcada -> 11 puntos, 2 estrellas marcadas -> 22, 4 estrellas marcadas -> 45 puntos, ... 8 estrellas marcadas -> 90.

La configuración de la herramienta se puede realizar también asignando las propiedades colocándolas como atributos del div contenedor.

Veamos el mismo ejemplo anterior, pero inicializando la herramienta por medio de su contenedor.

`<div id="puntos" star_tot:8 star_max:90 evento:'click' star_ico:7></div>`  
`<script>`  
`$(function() {$('#puntos').valoraciones();});`  
`</script>`

## Crear múltiples marcadores ##

Creamos un conjunto de 4 marcadores de 5 estrellas, utilizando el evento hover del ratón, que representen una puntuación máxima de 100 y con un tamaño de marcador grande.

`<div class="puntuaciones"></div>`  
`<div class="puntuaciones"></div>`  
`<div class="puntuaciones"></div>`  
`<div class="puntuaciones"></div>`

`<script>`  
`$(function() {$('div.puntuaciones').valoraciones({evento:'hover', star_max:100, star_size:1});});`  
`</script>`

## Obtener el valor de la puntuación ##

Para recuperar el valor representado por la valoración, se puede realizar en cualquier momento consultando el método .valor() ó de una forma más eficiente por medio de una función de retorno definida por el usuario, que se le pasará a la función .valoraciones() por medio de la propiedad 'callback' en el momento de crear la herramienta. A esta función se le pasarán los valores actuales de las propiedades de la herramienta cada vez que el usuario realice un cambio en los marcadores.

Veamos un ejemplo:

`<div id="puntos"></div>`  
`<p>Puntuación: <span></span></p>`  
`<script>`  
`var puntuaciones = function(datos) {`  
`	$parrafo=datos.selector.next('p');`  
`	$parrafo.children('span').text(datos.valor);`  
`};`  
`$(function() {$('#puntos').valoraciones({star_tot:8, star_max:90, evento:'hover', callback:puntuaciones});});`  
`</script>`

## Asignar 0 puntos ##

Para asignar 0 puntos en una valoración tendremos que ejecutar un **doble click** sobre el primer marcador de estrella.

* * *

# Propiedades #

### star_tot ###

**tipo**: *numérico*  
**predeterminado**: 5  
**máximo permitido**: 25

*Establece el total de marcadores (estrellas) del control de valoración.*

### star_ini ###

**tipo**: *numérico*  
**predeterminado**: 0  
**mínimo**: 0

*Establece el valor inicial que tiene que representar el control.*

### star_max ###

**tipo**: *numérico*  
**predeterminado**: 25

*Establece el valor máximo que se puede representar.*

### star_valor ###

**tipo**: *numérico*  
**predeterminado**: 0

*Almacena el valor actual del control.*

### star_color ###

**tipo**: *hexadecimal*  
**predeterminado**: *#FC3*

*Establece el color de relleno de los marcadores (estrellas).*

### star_size ###

**tipo**: *numérico*  
**predeterminado**: 0  
**valores permitidos**: 0 (*pequeño*), 1 (*mediano*) , 2 (*grande*), 3 (*gigante*)

*Establece el tamaño de los marcadores (estrellas).*

### star_ico ###

**tipo**: *numérico*  
**predeterminado**: 0  
**máximo permitido**: 15

*Establece el icono que se utilizará de marcador.*

Podemos elegir entre 15 posibles iconos:

> 0 -> **estrella**  
> 1 -> **círculo**  
> 2 -> **cuadrado**  
> 3 -> **campana**  
> 4 -> **comentario**  
> 5 -> **sobre correos**  
> 6 -> **bandera**  
> 7 -> **pila/batería**  
> 8 -> **corazón**  
> 9 -> **carpeta**  
> 10 -> **reloj de arena**  
> 11 -> **avión de papel**  
> 12 -> **mano ok**  
> 13 -> **candado**  
> 14 -> **orden asc/desc**  

### evento ###

**tipo**: *texto*  
**predeterminado**: *'click'*

*Indica el evento por el que se controla el cambio de los marcadores.*

### star_enable ###

**tipo**: *booleando*  
**predterminado**: *true*

*Indica el estado del control (activado/desactivado).*

### callback ###

**tipo**: *function*

*Función de usuario que será invocada cada vez que el control realice una actualización por medio de los eventos del ratón.*
Se envíará un objeto con las siguientes propiedades:

> **valor** `->` valor actual del marcador (`star_valor`)  
> **marcadores** `->` total de marcadores (`star_tot`)  
> **máximo** `->` valor máximo que se puede representar (`star_max`)  
> **estado** `->` estado actual (`star_enable`)  
> **selector** `->` selector sobre el que se está trabajando (útil cuando se crean múltiples selectores)


*Si star_enable esta en false callback no será invocado.*

* * *


# Métodos #

Para poder acceder a los métodos del control, primero tendremos que asignar a una variable el .data('objeto') del control jquery que hemos creado.


``$('#puntos').valoraciones();                // Creamos objeto de tipo valoraciones``  
``var instancia=$('#puntos').data('objeto');  // Obtenemos acceso a la instancia del objeto``  
``instancia.Valor(100);                       // Accedemos a los métodos del objeto``  


### Valor([nuevo_valor]) ###
**nuevo_valor**: *numérico*

*Obtiene/Establece el valor actual que se está representado en el marcador.*

Establece nuevo_valor como el valor actual que se tiene que representar. Si se invoca sin argumentos devuelve al valor actual. Actualiza el valor de star_valor.

### Activar(estado) ###
**estado**: *booleano*

*Activa/Desactiva el estado del marcador, permitiendo o impidendo que el ratón interactue con el control. Actualiza el valor de star_enable.*

### Marcadores(items) ###
**ítems**: *numérico*

*Repinta el control usando items en total. Actualiza el valor de star_tot.*

### Maximo(valor) ###
**valor**: *numérico*

*Establece el nuevo valor máximo que se tiene que representar con los marcadores actuales. Actualiza el valor de star_max.*

[jquery]: https://img.shields.io/badge/jquery-1.11.3-green.svg
[font-awesome]: https://img.shields.io/badge/font--awesome-4.5.0-green.svg
