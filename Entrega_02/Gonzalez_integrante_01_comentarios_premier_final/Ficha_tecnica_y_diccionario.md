#FICHA TÉCNICA Y DICCIONARIO DE DATOS
##FICHA TÉCNICA
Fuente de los datos:
Secciones de comentarios públicas en publicaciones oficiales de Instagram correspondientes a seis partidos de la Premier League.
Metodología de la construcción de la base:
Extracción: Recopilación manual de comentarios de publicaciones seleccionadas tras evaluar mecanismos de restricción de scraping automático de Instagram.
Limpieza: Filtrado programático en Python de ruido de interfaz de usuario (marcas temporales como "1 h", "2 sem", botones "Responder", "Me gusta" e hipervínculos).
Estructuración y Etiquetado: Transformación de la matriz desordenada a un formato Tidy Data (tabla plana de registros únicos por fila). Se aplicó detección basada en expresiones regulares para identificar menciones a jugadores y directores técnicos principales, asignando cadenas vacías a comentarios de carácter general.
Alcance de los datos:
Muestra de 905 comentarios distribuidos en 6 encuentros deportivos de tres clubes de la Premier League (Chelsea, Arsenal y Tottenham Hotspur).
Característica de los datos:
Datos cualitativos en lenguaje natural (comentarios multilingües, mayoritariamente en inglés, con uso frecuente de emoticonos, jerga futbolística y menciones a cuentas de usuarios).
Otras observaciones sobre la base:
Se conserva la integridad original del texto del usuario en la variable Comentario_Limpio (incluyendo emojis y símbolos) para evitar pérdida de contexto sintáctico durante un posterior análisis de sentimientos.
Los datos crudos sin filtrar se encuentran disponibles en el archivo de respaldo Libro3.xlsx dentro del repositorio para garantizar la transparencia y replicabilidad del proceso.
##DICCIONARIO DE DATOS
Hay 4 tipos de variables en la base de datos dada, la primea es: ID_Comentario, que es un Identificador único secuencial para cada registro de comentario que va en los valores de 1 a 905. Luego la variable 2 es el Equipo de Premier que se analizó su publicación, las cuales están divididos con la variable 3, que son los partidos respectivos. Por último, está la variable 4 que es el comentario en sí, tal como se puso en la publicación. Además, la variable 5, pone si es que se alude a algún jugador o otro.
