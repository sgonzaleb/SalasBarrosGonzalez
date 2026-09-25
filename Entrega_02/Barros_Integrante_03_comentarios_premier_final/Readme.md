# Historial de Procesos y Decisiones

## Explicación del Proceso de Limpieza de Datos

### Paso 1: Extracción y recolección inicial de los datos
Para esta segunda etapa del trabajo me tocó levantar los comentarios de los otros tres equipos que completan el Big Six: Liverpool, Manchester City y Manchester United. Con mi compañero decidimos seguir usando Instagram como fuente principal para que todo el proyecto tuviera la misma línea y fueran así comparables.

Como las herramientas automáticas de scraping fallan o te bloquean por los filtros de Instagram, opté por hacer la extracción manual. Fui copiando los comentarios directo de las publicaciones web y los pasé a una planilla en Excel (base_comentarios_premier_sach.xlsx). Junté 974 comentarios en total, repartidos en seis partidos:
* Liverpool frente a Bournemouth y Tottenham Hotspur.
* Manchester City frente a Norwich y Sunderland.
* Manchester United frente a Brentford y Fulham.

### Paso 2: Limpieza del texto y ruido de la página
Al copiar y pegar directo desde la pantalla de Instagram, el archivo se llenó de elementos que no eran comentarios de la gente, por ejmplo: botones como "Responder" o "Me gusta", las horas de publicación ("1 h", "4 d"), textos automáticos de traducción y saltos de línea desordenados. Para no borrar fila por fila a mano en Excel, armé un script en Python con filtros de texto para eliminar de una pasada todo ese contenido de la interfaz y dejar solo los mensajes reales de los hinchas.

### Paso 3: Ordenar la base y detectar nombres clave
En mi Excel original tenía los comentarios puestos en columnas separadas por cada partido, lo que no servía para armar gráficos ni tablas dinámicas. Con la librería Pandas en Python pasé todo a una sola tabla ordenada con cinco datos: el ID del comentario, el equipo, el partido, el comentario limpio y los personajes claves. En esa última columna programé una búsqueda automática de los nombres y apodos de los jugadores y técnicos principales (como Szoboszlai, Gakpo, Haaland, Pep Guardiola o Ten Hag). El resultado final quedó guardado en el archivo comentarios_premier_final.csv.

---

## 2. Fuentes de Datos Utilizadas y Justificación

### Lista de Fuentes
* **Instagram oficial de Liverpool FC:** Comentarios en los post de Liverpool V Bourmouth y Liverpool V Spurs.
* **Instagram oficial de Manchester City:** Comentarios en City V Norwich y City V Sunderland.
* **Instagram oficial de Manchester United:** Comentarios en United V Brentford y United V Fulham.
* **El Excel original (base_comentarios_premier_sach.xlsx):** Es la planilla tal cual la armé al inicio pegando los comentarios a mano, guardada en la carpeta Datos_originales para que se pueda revisar cómo estaban los datos antes de pasarles el código.

### Justificación Metodológica y Periodística
Seguir con Instagram no fue solo para mantener la misma estructura de mi grupo, sino porque es la red donde los hinchas reaccionan con más rapidez y sin tanto filtro apenas termina el partido. Mientras en los medios o foros hay análisis más fríos, en los comentarios oficiales se nota de inmediato el estado de ánimo, la euforia tras ganar, los pedidos de refuerzos o la búsqueda rápida de culpables cuando el equipo pierde puntos.

La elección de estos tres clubes responde a completar el Big Six analizando cómo varía el foco del hincha según la historia y la masa de seguidores de cada institución:

* En Manchester City, el público evalúa el funcionamiento colectivo y la aparición de nuevos proyectos juveniles, usando el rendimiento previo como estándar indiscutido.
* En Liverpool, la conversación gira en torno a rendimientos individuales específicos y la rotación en puestos clave tras un recambio importante de nombres en el plantel.
* En Manchester United, las reacciones se centran casi por completo en la molestia hacia las decisiones del técnico y en comparar el nivel del primer equipo con la entrega de las divisiones menores.

---

## Ejemplos de Preguntas que se Pueden Responder con la Base Limpia

En función del foco investigativo grupal sobre el desempeño y calificación a los delanteros y referentes de ataque ("los 9") del Big Six, la base de datos permite responder interrogantes clave:

### Pregunta 1: ¿Cómo reacciona la afición cuando un atacante en punta revierte las críticas previas?
* **Cómo se analiza:** Filtrando por comentarios dirigidos a **Cody Gakpo** en los partidos de Liverpool.
* **Hallazgo:** En los duelos ante Bournemouth y Tottenham se observa un giro drástico de opinión hacia Gakpo, los hinchas publican repetidamente mensajes de disculpa ("we owe Gakpo an apology", "Gakpo deserves an apology, what a baller"), evidenciando cómo la efectividad frente al arco desarma la resistencia inicial de la hinchada hacia su rol protagónico en ofensiva.

### Pregunta 2: ¿Qué nivel de respaldo genera el delantero centro suplente frente a la sequía ofensiva del primer equipo?
* **Cómo se analiza:** Agrupando por Manchester United y buscando las menciones hacia alternativas en ataque como **Joshua Zirkzee**.
* **Hallazgo:** En el empate ante Fulham y tras el triunfo de la filial contra Brentford, las menciones hacia Zirkzee reflejan desconfianza e ironía por parte de la afición ("Really our sup sub is Zirkzee", "Sell Zirkzee we have future players"), evidenciando que el hincha no lo percibe como una solución goleadora confiable y prefiere apostar por atacantes de las divisiones menores.

### Pregunta 3: Ante la rotación del "9" titular, ¿cómo evalúa la hinchada a las alternativas jóvenes en ataque?
* **Cómo se analiza:** En Manchester City (partido ante Norwich), contabilizando las menciones al delantero juvenil **Floyd Samba** frente al descanso de **Erling Haaland**.
* **Hallazgo:** Con Haaland fuera de la convocatoria en la copa, el juvenil Samba concentró 11 menciones directas de respaldo unánime ("Samba is the future", "Floyd Samba remember the name"). La afición utilizó su rendimiento para argumentar que el club no requiere fichar un centrodelantero suplente costoso en el mercado ("we genuinely do not need to sign a backup striker, Samba is who we need").
