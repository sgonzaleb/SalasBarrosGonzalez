## Ficha 3: Base de Datos de Interés de Búsqueda en Google Trends (A Construir)

* **Autor y publicación de los datos:**
  * **Propietario / Autor:** Google LLC, a través de la plataforma Google Trends.
  * **Ubicación / Link:** [Google Trends](https://trends.google.com/).

* **Contenido:**
  * La base registrará la evolución del interés de búsqueda que genera cada delantero analizado durante la temporada de la Premier League. Google Trends entrega un índice relativo de interés normalizado en una escala de 0 a 100 para un periodo y una ubicación determinados; por lo tanto, el valor no representa un número absoluto de búsquedas, sino la popularidad relativa del término dentro de la comparación realizada.
  * **Tipo de datos:** Cuantitativos (índice de interés relativo) y categóricos (jugador, club, geografía, categoría y tipo de búsqueda).
  * **Variables principales:** Fecha de inicio y término del periodo, nombre del delantero, club, temporada, índice de interés de Google Trends (`indice_interes_google`), geografía utilizada, categoría de búsqueda, tipo de búsqueda y término o tema consultado.
  * **Periodo de levantamiento:** Temporada actual de la Premier League, utilizando intervalos temporales equivalentes para todos los jugadores con el objetivo de mantener comparables los resultados.

* **Pertinencia:**
  * Esta base permite incorporar una segunda dimensión cuantitativa de la percepción pública. Mientras la base de redes sociales permitirá determinar si los comentarios hacia un jugador son positivos, neutros o negativos, Google Trends permitirá observar cuánto interés genera ese delantero en un periodo determinado. De esta manera, podremos diferenciar entre **sentimiento y nivel de atención**, evitando asumir que un jugador muy mencionado necesariamente es un jugador muy apreciado.
  * Al cruzar este índice con las estadísticas deportivas será posible analizar si aumentos o disminuciones en el rendimiento de un delantero se relacionan también con cambios en el interés que despierta entre los aficionados.

* **Metodología:**
  * Se buscará a cada delantero seleccionado en Google Trends utilizando, cuando esté disponible, el tema correspondiente al futbolista para evitar confusiones con términos de nombre similar. Se mantendrán constantes el periodo, la geografía y los filtros de búsqueda para todos los jugadores.
  * Como criterio inicial se utilizará **Reino Unido** como geografía de análisis, debido a que la investigación se centra en la Premier League. Los datos de “Interés a lo largo del tiempo” serán descargados en formato CSV y posteriormente integrados en una base única elaborada por el equipo.
  * Google Trends normaliza los resultados entre 0 y 100 dentro de cada comparación. Por este motivo, los jugadores deberán ser comparados utilizando exactamente el mismo periodo y ubicación. Si fuera necesario realizar más de una comparación por la cantidad de delanteros seleccionados, se repetirá un mismo jugador como referencia entre los distintos grupos para poder homologar posteriormente las escalas.
  * Finalmente, la base será cruzada con las bases de rendimiento deportivo y sentimiento en redes sociales utilizando como variables comunes el delantero y el periodo temporal correspondiente.
