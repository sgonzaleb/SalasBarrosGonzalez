# Historial de Procesos y Decisiones
## Explicación del Proceso de Limpieza de Datos
Paso 1: Extracción y recolección inicial de los datos
El objetivo primordial del proyecto consistió en recolectar comentarios reales de usuarios en Instagram para analizar el sentimiento público sobre partidos de fútbol de la Premier League. En una primera instancia, intenté utilizar extensiones web y herramientas automatizadas de scraping para descargar directamente los comentarios de las publicaciones seleccionadas. Sin embargo, me enfrenté a barreras técnicas y mecanismos anti-scraping Instagram.
Ante estas restricciones técnicas, tomé la decisión metodológica de realizar una extracción manual mediante volcado directo de texto desde la interfaz web hacia un libro de Microsoft Excel (guardado en el archivo Libro3.xlsx). Este paso garantizó contar con la totalidad de la muestra deseada de 905 comentarios distribuidos en seis partidos clave de tres equipos principales: Chelsea (contra Hull City y Brentford), Arsenal (contra Brighton e Ipswich) y Tottenham Hotspur (contra Villa y Everton).
Paso 2: Limpieza programática del ruido de la interfaz
Al pegar el contenido web bruto directamente en Excel, los datos venían acompañados de abundante "ruido de interfaz de usuario" inherente a la maquetación de Instagram. Entre estos elementos no analíticos se encontraban botones de interacción ("Responder", "Me gusta"), marcas temporales de publicación ("1 h", "2 sem", "10 h", "17 h"), nombres de usuarios aislados, hipervínculos hacia perfiles y saltos de línea desalineados.
Para limpiar esto, utilicé scripts de procesamiento en Python. Definí filtros de texto para identificar y eliminar automáticamente todas las filas o fragmentos redundantes que no constituían opiniones de usuarios. Con esta limpieza, los datos pasaron de ser una estructura desalineada a un listado filtrado exclusivamente por las interacciones reales de los fanáticos.
Paso 3: Reestructuración
En el archivo original Libro3.xlsx, organicé los comentarios como columnas y sin información adicional, lo que imposibilitaba la búsqueda de datos. Es por esto que mediante un codigo de Python dado por la IA de Google, pude ordenar la base de datos con las cinco variables que le solicité a Gemini. 
2. Fuentes de Datos Utilizadas y Justificación
Lista de Fuentes
Publicaciones Oficiales en Instagram del Chelsea FC: Secciones de comentarios en las publicaciones de los partidos Chelsea V Hull city y Chelsea V Brentford.
Publicaciones Oficiales en Instagram del Arsenal FC: Secciones de comentarios en las publicaciones de los partidos Arsenal V Brighton y Arsenal V Ipswich.
Publicaciones Oficiales en Instagram de Tottenham Hotspur: Secciones de comentarios en las publicaciones de los partidos Spurs V Villa y Spurs V Everton.
Respaldo Crudo Original (Libro3.xlsx): Archivo maestro que almacena el volcado bruto de la extracción sin procesar para auditoría de transparencia.
## Justificación Periodística y Metodológica
Elegí Instagram como principal fuente debido a que es la plataforma que más se usa para comentar los partidos por los hinchas, lo que es un indicador fiel al sentimiento del hincha en mi opinión, ya que aquí escriben sin censura lo que piensan. Elegí estos 3 clubes porque son parte del denominado “Big Six”, además, estos viven presentes muy distintos, con los Spurs peleando el descenso y con el Arsenal peleando para generar una dinastía en la premier (El Chelsea es un punto medio).
## Ejemplos de Preguntas Respondibles con la Base de Datos Limpia
A partir de la base de datos limpia y mediante la construcción de tablas dinámicas (pivot tables), es posible responder múltiples interrogantes periodísticos y analíticos:
Pregunta 1: ¿Cuáles son los jugadores o directores técnicos que concentran la mayor cantidad de menciones (y posibles "chivos expiatorios") en partidos con resultados adversos o apretados?
Análisis con Tabla Dinámica: Cruzando la variable Partido en filas y Entidad_Mencionada en columnas, contando la cantidad de ID_Comentario.
Hallazgo periodístico: En el partido Chelsea V Hull city, de las menciones identificadas, más del 35% se concentran en Xabi Alonso (30 menciones) y Malo Gusto (25 menciones), revelando cómo la frustración de la hinchada se focaliza fuertemente en la figura del DT y la línea defensiva tras desatenciones tácticas.
Pregunta 2: ¿Existe una exigencia constante por parte de la afición hacia la titularidad o recambio de ciertos jugadores jóvenes/refuerzos según el partido?
Análisis con Tabla Dinámica: Filtrando por la entidad Estêvão y Pedro Neto en la columna Comentario_Limpio y agrupando por Partido.
Hallazgo periodístico: Se evidencian 39 menciones combinadas disputando minutos entre Estêvão (24) y Pedro Neto (15) en Chelsea, reflejando cómo la afición utiliza los comentarios para presionar las decisiones de alineación del entrenador ("bench Estevao for Neto", "give Estevao more time").
Pregunta 3: ¿Cómo influye la racha de rendimiento ofensivo de un equipo en las campañas individuales dirigidas a sus delanteros?
Análisis con Tabla Dinámica: Agrupando Equipo (Tottenham Hotspur) y Partido (Spurs V Everton), contabilizando menciones para Richarlison.
Hallazgo periodístico: En Spurs V Everton surgen 6 menciones directas a Richarlison acompañadas del hashtag #free richarlison y cuestionamientos a la falta de efectividad del equipo ("0 Goal in 4 games.."), demostrando la correlación directa entre la sequía goleadora reflejada en las estadísticas del partido y la narrativa de apoyo o crítica en redes sociales.
