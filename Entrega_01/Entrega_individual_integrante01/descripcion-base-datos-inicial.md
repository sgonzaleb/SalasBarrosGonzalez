# Descripción y Contexto de Bases de Datos Iniciales

**Proyecto:** Rendimiento de Delanteros de la Premier League y Percepción Pública en Redes Sociales  
**Curso:** Narración Gráfica de No Ficción (COM-208)  
**Fecha:** 27 de agosto de 2026  

---

## Introducción y Plan General
Para comprobar nuestra hipótesis de investigación, utilizaremos una combinación de **fuentes deportivas estadísticas existentes** y la **construcción de un dataset propio** de sentimiento en redes sociales. 

Dado que el proyecto exige al menos una base de datos por cada integrante del grupo, hemos definido dos conjuntos de datos principales que permitirán cruzar el rendimiento numérico en cancha con la reacción digital de los hinchas.

---

## Ficha 1: Base de Datos de Rendimiento Deportivo (Existente)

* **Autor y publicación de los datos:**
  * **Propietarios / Autores:** FBref (en alianza con StatsBomb) y Understat.
  * **Ubicación / Links:** [FBref Premier League Stats](https://fbref.com/en/comps/9/Premier-League-Stats) y [Understat Premier League](https://understat.com/league/EPL).
* **Contenido:**
  * Contiene métricas individuales por partido de los delanteros centro ("9") principales de la Premier League (ej: Erling Haaland, Nicolas Jackson, Rasmus Højlund, Darwin Núñez).
  * **Tipo de datos:** Cuantitativos (numéricos continuos y discretos).
  * **Variables principales:** Goles (`goals`), Asistencias (`assists`), Goles Esperados (`xG`), Remates a puerta (`shots_on_target`), Pases clave (`key_passes`), Minutos jugados (`minutes`).
  * **Periodo de levantamiento:** Temporada actual de la Premier League (partido a partido).
* **Pertinencia:**
  * Representa la evidencia objetiva del rendimiento futbolístico. Nos permite establecer una línea base cuantitativa e incontestable sobre el aporte real del jugador en cancha durante cada fecha.
* **Metodología:**
  * Descarga directa en formato CSV a través de las opciones de exportación del sitio FBref o extracción automatizada mediante scripts de lectura en Python (`BeautifulSoup` / `pandas`).

---

## Ficha 2: Base de Datos de Sentimiento y Percepción en Redes Sociales (A Construir)

* **Plan de Construcción y Método de Recolección:**
  * **Método:** Extracción automatizada (Web Scraping) de publicaciones y comentarios públicos tras los partidos utilizando librerías de Python (como `twikit` para X/Twitter o lectores de API pública de Instagram).
  * **Propietarios:** Base de datos original elaborada por el equipo a partir de opiniones públicas generadas por usuarios.
  * **Ventana de recolección:** Muestreo dentro de las 24 a 48 horas posteriores al pitazo final de partidos seleccionados de la Premier League.

* **Estructura de Columnas y Variables:**
  * `id_post` (Entero): Identificador único de la mención o comentario.
  * `fecha_partido` (Fecha - YYYY-MM-DD): Día en que se disputó el encuentro.
  * `delantero_nombre` (Texto): Nombre del delantero evaluado.
  * `club` (Texto): Equipo al que pertenece.
  * `rival` (Texto): Equipo rival en el encuentro.
  * `minutos_jugados` (Entero): Tiempo en cancha del delantero.
  * `goles_partido` (Entero): Cantidad de goles marcados en la fecha.
  * `xg_partido` (Decimal): Goles esperados acumulados en el partido.
  * `texto_comentario` (Texto largo): Contenido textual del comentario en redes.
  * `plataforma` (Texto): Red social de origen (X o Instagram).
  * `me_gusta_comentario` (Entero): Interacciones/likes del comentario (para medir alcance).
  * `clasificacion_sentimiento` (Categoría): Calificación asignada tras procesamiento (`Positivo`, `Neutro`, `Negativo`).

* **Pertinencia:**
  * Captura la variable subjetiva y la "temperatura digital" de la hinchada. Es indispensable para cruzarla con los datos deportivos y determinar si existe una brecha entre el rendimiento real y la opinión popular.
* **Metodología de Procesamiento:**
  * Se filtrarán menciones clave (ej: `"[Nombre Jugador]"` + `"[Nombre Club]"`). Posteriormente, los textos serán procesados mediante un algoritmo de Análisis de Sentimiento (usando librerías de Python como NLTK / TextBlob) para catalogar cada entrada y calcular un índice de aprobación promedio por partido.
