# Ficha Técnica y Diccionario de Datos

## Ficha Técnica de la Base de Datos Limpia

* **Nombre del dataset:** `delanteros_premier_sentimiento_limpio.csv`
* **Fuente de los datos:** Integración de FBref/StatsBomb (Rendimiento) y API de Muestreo de Redes Sociales X/Instagram (Sentimiento).
* **Metodología de construcción:**
  1. Extracción de métricas individuales por partido de atacantes del *Big Six*.
  2. Scraping de comentarios y reacciones públicas post-partido.
  3. Limpieza, homologación de nombres y categorización de sentimiento mediante NLP (NLTK/TextBlob).
  4. Fusión de datasets mediante llaves primarias compuestas (`delantero_nombre` + `fecha_partido`).
* **Alcance de los datos:** Temporada actual de la Premier League. Muestra de 18 registros consolidados representativos de atacantes del *Big Six* (Arsenal, Chelsea, Liverpool, Manchester City, Manchester United, Tottenham Hotspur).
* **Características de los datos:** Dataset estructurado relacional plano, exportado en UTF-8 con separador por coma.

---

## Diccionario de Datos

| Variable | Descripción | Tipo de Dato | Valores Posibles | Observaciones Editoriales |
|---|---|---|---|---|
| `id_registro` | Identificador único del registro | Entero (`INTEGER`) | 1, 2, 3... | Clave primaria |
| `fecha_partido` | Fecha en que se jugó el encuentro | Fecha (`DATE`) | `YYYY-MM-DD` | Formato ISO estandarizado |
| `delantero_nombre` | Nombre completo del jugador | Texto (`STRING`) | Ej: Erling Haaland, Nicolas Jackson | Nombre oficial homologado |
| `club_nombre` | Club perteneciente al *Big Six* | Texto (`STRING`) | Arsenal, Chelsea, Liverpool, Man City, Man United, Tottenham | Normalizado sin siglas complejas |
| `minutos_jugados` | Minutos disputados en el partido | Entero (`INTEGER`) | `0` a `90` | Excluye tiempo de descuento |
| `goles` | Goles anotados en el partido | Entero (`INTEGER`) | `0`, `1`, `2`, `3+` | Dato oficial Premier League |
| `xg_partido` | Goles esperados acumulados | Decimal (`FLOAT`) | `0.00` a `5.00` | Métrica oficial StatsBomb |
| `eficiencia_xg` | Diferencia entre goles y xG | Decimal (`FLOAT`) | Valores +/- | Variable calculada (`goles - xg_partido`) |
| `total_comentarios` | Volumen de comentarios analizados | Entero (`INTEGER`) | $> 0$ | Muestra post-partido |
| `clasificacion_sentimiento` | Tono dominante de la hinchada | Categórico (`STRING`) | `Positivo`, `Neutro`, `Negativo` | Procesado vía análisis de texto |
| `porcentaje_aprobacion` | % de comentarios positivos | Decimal (`FLOAT`) | `0.0` a `100.0` | Indicador sintético de popularidad |
