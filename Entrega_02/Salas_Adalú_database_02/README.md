# Historial de Procesos, Decisiones y Limpieza de Datos

**Estudiante:** Adalú Salas 
**Curso:** Narración Gráfica de No Ficción (COM-208)  
**Entrega:** Entrega 02 - Preparar y limpiar los datos  
**Fecha:** 24 de septiembre de 2026  

---

## 1. Fuentes de Datos Utilizadas y Justificación

Para dar respuesta a nuestra hipótesis de investigación —que busca medir la brecha entre el rendimiento deportivo real de los delanteros centro ("9") del *Big Six* de la Premier League y la percepción/sentimiento del público en redes sociales— se seleccionaron e integraron dos fuentes principales de datos:

1. **Estadísticas Oficiales de Rendimiento Deportivo (FBref / StatsBomb):**
   * **¿Por qué se eligió?** FBref es el estándar de la industria periodística deportiva para métricas avanzadas. Proporciona datos consolidados e incontestables sobre goles, asistencias y la métrica clave del fútbol moderno: *Goles Esperados ($xG$)*.
   * **Alcance:** Partidos clave disputados por los delanteros centro principales de los equipos del *Big Six* (Arsenal, Chelsea, Liverpool, Manchester City, Manchester United y Tottenham Hotspur).

2. **Muestreo de Percepción Pública en Redes Sociales (X / Instagram):**
   * **¿Por qué se eligió?** X (antes Twitter) e Instagram son las plataformas principales donde la comunidad futbolera reacciona en tiempo real tras los partidos. Capturar comentarios posteriores al pitazo final nos permite medir el "clima emocional" del hincha.
   * **Alcance:** Muestreo de publicaciones oficiales y comentarios en el rango de 24 a 48 horas post-partido.

---

## 2. Documentación del Proceso de Limpieza y Decisiones

El proceso de conversión de datos brutos (*raw data*) a una base limpia e integrada involucró las siguientes fases y decisiones metodológicas:

### Fase 1: Estandarización de Identificadores y Nombres
* **Problema:** En las bases de datos originales, los nombres de los jugadores y equipos venían formateados de manera inconsistente (ej. "E. Haaland", "Erling Braut Haaland", "Manchester City FC", "Man City").
* **Decisión:** Se homologaron todos los nombres a una nomenclatura única (`delantero_nombre` y `club_nombre`). Esto permitió cruzar con precisión la tabla de rendimiento deportivo con la tabla de comentarios en redes sociales.

### Fase 2: Tratamiento de Datos Faltantes (Missing Values) y Formatos
* **Problema:** Había publicaciones en redes sin métricas de interacción (`likes`) o sin registro de $xG$ exacto en partidos muy antiguos.
* **Decisión:** Se imputó valor `0` a las interacciones nulas y se filtraron exclusivamente los partidos que contaban con la métrica oficial de $xG$ verificada por StatsBomb. Se convirtieron todas las fechas al formato estándar internacional `YYYY-MM-DD`.

### Fase 3: Homologación y Normalización del Sentimiento
* **Problema:** El análisis cualitativo inicial de los comentarios arrojaba valores numéricos de polaridad continuos entre `-1.0` y `1.0`.
* **Decisión:** Se categorizó la polaridad en una variable categórica discreta de tres niveles (`Positivo`, `Neutro`, `Negativo`) y se calculó un **Índice de Aprobación (%)** promedio por jugador para facilitar la visualización en gráficos interactivos.

### Fase 4: Creación de Variables Derivadas
* **Decisión:** Se creó la variable `eficiencia_xg`, calculada como la diferencia entre los goles anotados y los goles esperados ($\text{Goles} - xG$). Un valor positivo indica que el delantero fue hiper-eficiente en definir, mientras que un valor negativo muestra desperdicio de ocasiones claras.

---

## 3. Preguntas de Investigación Respondibles con la Base Limpia

Mediante el uso de tablas dinámicas (*pivot tables*) y cruces de variables en nuestra base limpia, podemos responder con precisión las siguientes tres preguntas:

1. **¿Existe una correlación directa entre la *eficiencia $xG$* y el porcentaje de sentimiento positivo en redes sociales?**
   * *Respuesta con la base:* Al cruzar `eficiencia_xg` con `porcentaje_sentimiento_positivo`, la base permite evidenciar si el hincha castiga la falta de gol objetiva o si el castigo es desproporcionado respecto a las ocasiones generadas.

2. **¿Cuál es el equipo del *Big Six* cuyo delantero sufre la mayor volatilidad de críticas negativas tras un mal partido?**
   * *Respuesta con la base:* Agrupando la base por `club_nombre` y filtrando partidos donde el delantero anotó `0` goles, podemos comparar el porcentaje promedio de comentarios `Negativo` recibidos por los atacantes de cada club.

3. **¿Afecta el volumen total de interacciones (`likes`/menciones) a la polaridad del sentimiento?**
   * *Respuesta con la base:* Analizando los posts con mayor cantidad de `me_gusta_comentario`, es posible responder si las publicaciones virales tienden a ser predominantemente destructivas (críticas/memes) o de celebración.

---

## 4. Herramientas Utilizadas
* **Python (Pandas / NumPy):** Para la manipulación de dataframes, limpieza de cadenas de texto e imputación de valores.
* **Google Colaboratory:** Entorno de ejecución en la nube para automatizar y documentar el script de carga.
* **OpenRefine / Excel:** Para la inspección visual inicial y validación de tipos de datos.
