# La web de La Salchichería, explicada

**Demo para verla:** https://yeiner99sd.github.io/la-salchicheria-demo/

Es una propuesta, todavía no es la web oficial. Está hecha para verse sobre todo en el móvil, que es desde donde llega casi todo el mundo: desde Google Maps o desde Instagram.

## La idea

Una sola página que se recorre bajando con el dedo, como quien entra al bar: primero la puerta, luego la carta, la barra, la plaza, lo que dice la gente y, al final, cómo llegar.

El guía es **Salchi**. Se presenta en la portada («Soy Salchi. Tú baja, que yo me estiro.») y cumple: según bajas, se estira por el lado derecho de la pantalla hasta llegar al final.

Los colores, las letras y el tono son los de vuestro Instagram: rojo y blanco, frases cortas y de colega.

## El recorrido, parte por parte

### Portada
- Salchi, la frase «Hambre no vais a pasar · Sed tampoco» y un aviso que dice **si estáis abiertos en ese momento** y hasta qué hora. Se calcula solo con vuestro horario.
- Dos botones: **Ver carta**, que es el principal, y **Cómo llegar**, que abre Google Maps con la ruta.

### Capítulo 1 · Comer bien
- Vuestra carta, que se recorre sección a sección mientras se baja: se acerca a los pintxos, la huerta, los clásicos, los perritos, los molletes, las carnes y los postres, cada uno con su frase («Pintxos. Para ir abriendo boca.», «Postres. Siempre queda un hueco.»…).
- **«Como Dios manda»**: una fila de platos destacados que elegís vosotros (ver más abajo «Lo que podéis cambiar vosotros»).
- Un botón a la **carta completa**.

### Capítulo 2 · Beber mejor
- Una caña que se va llenando al bajar.
- Cañas, vinos y sangría.

### Capítulo 3 · Pasear lo justo
- Dónde estáis, con la dirección, el botón de cómo llegar y un mapa que se abre al pulsarlo.

### Capítulo 4 · Catadores
- Cinco opiniones reales de vuestra ficha de Google, copiadas tal cual, con el nombre de quien las escribió.
- Un botón para que quien haya ido deje la suya.

### Capítulo 5 · Y ya está
- «¿Hacéis reservas? No, solo tienes que venir. Según llegas te hacemos hueco.»
- Un **ticket** con el horario, si estáis abiertos, el teléfono, Instagram y el botón de cómo llegar.

### Pie de página
- Dirección con enlace a Google Maps, Instagram, teléfono y horario.

## Las otras páginas

| Página | Qué es | Dirección |
|---|---|---|
| **Carta completa** | Todos los platos y bebidas con su precio, por secciones: perritos, pintxos, clásicos, huerta, para beber y vinos. Sin fotos: solo productos y precios, rápida de leer en el móvil. | [/carta](https://yeiner99sd.github.io/la-salchicheria-demo/carta/) |
| **Panel de la casa** | Donde elegís los platos destacados y editáis la carta completa. Es de prueba (ver abajo). | [/admin](https://yeiner99sd.github.io/la-salchicheria-demo/admin/) |
| **Propuesta de galería** | Una idea de página de fotos, pendiente de que la aprobéis. | [/propuesta-galeria](https://yeiner99sd.github.io/la-salchicheria-demo/propuesta-galeria/) |

El panel y la galería no están enlazados desde la web: solo se llega a ellos con su dirección.

## Lo que podéis cambiar vosotros

El **Panel de la casa** tiene dos partes.

**1. Destacados**, lo que sale en «Como Dios manda»:

- Añadir un plato de la carta o uno nuevo.
- Cambiarle el nombre, el precio y la descripción.
- Ponerle una etiqueta: **Top**, **Promo** o **Nuevo**.
- Elegirle una foto, ocultarlo sin borrarlo y cambiar el orden.

**2. Carta completa**, lo que sale en la página de la carta:

- Cambiar el nombre, la descripción y el precio de cualquier plato o bebida.
- Añadir y quitar platos, y cambiarlos de orden.
- Añadir, renombrar, quitar y reordenar secciones (por ejemplo, crear una de «Postres»), con una nota opcional como «Para compartir».
- Volver a la carta de partida con un botón.

Los platos que añadáis a la carta aparecen también para elegirlos como destacados.

**Ahora mismo es una demostración.** Tres cosas a tener en cuenta:

- Los cambios solo se ven en el móvil u ordenador donde se hacen. Sirve para probar cómo funcionaría, no para cambiar la web de verdad.
- No tiene contraseña ni se pueden subir fotos nuevas: se elige entre las que ya están cargadas.
- Los precios que salen dentro del recorrido (por ejemplo, el de la caña en el capítulo 2) todavía no se cambian desde el panel; los de la página de la carta, sí.

En la versión definitiva el panel tendrá contraseña, los cambios los verá todo el mundo y se podrán subir fotos.

## Lo que la web hace sola

- Dice si estáis abiertos o cerrados en cada momento, según el horario.
- Se adapta al móvil, a la tableta y al ordenador.
- Para quien tiene desactivadas las animaciones en su móvil, se muestra todo igual pero sin movimiento.
- Está preparada para que Google entienda que sois un bar, dónde estáis y a qué hora abrís.

## Lo que todavía es provisional

Algunos datos aparecen entre corchetes, como `[PRECIO]` o `[TELÉFONO]`, y hay recuadros de color donde irá una foto. Es lo que falta por recibir:

| Qué falta | Dónde se ve |
|---|---|
| Precio de la caña y la sangría (la carta nueva no trae bebidas) | Capítulo 2 y carta |
| La carta de vinos completa (ahora solo salen dos blancos, de la carta antigua) | Capítulo 2 y carta |
| Los alérgenos de cada plato en la página de la carta (están en la carta impresa, falta pasarlos) | Carta |
| Teléfono | Ticket final y pie |
| Fotos de la fachada, la barra y la terraza | Capítulo 3 |
| Fotos de croquetas, bravas, huevos rotos y demás platos | «Como Dios manda» |
| Foto de la sangría | Capítulo 2 |
| El enlace directo para dejar una reseña en Google | Capítulo 4 |
| El logotipo con letras («la Salchi chería») en formato vectorial | Portada |
| Salchi dibujado en tres piezas (cabeza, cuerpo y patas) | Para que se estire con el mejor acabado |

Sobre el último punto: ahora Salchi se estira a partir de vuestro dibujo, cortándolo por la mitad del cuerpo. Funciona, pero con las tres piezas hechas por quien lo diseñó quedará perfecto.

## Para publicarla de verdad

1. Los datos y las fotos de la tabla anterior.
2. Un dominio propio, por ejemplo `lasalchicheria.es`.
3. Decidir si queréis el panel con contraseña y la página de galería.
