# Ficha Técnica de la Base de Datos de Visualización

## Características del Dataset
* **Nombre del archivo:** `delanteros_premier_sentimiento.csv`
* **Muestra:** 18 observaciones de partidos clave disputados por delanteros del *Big Six* de la Premier League.
* **Formato:** CSV estandarizado en UTF-8.

---

## Diccionario de Variables

| Variable | Descripción | Tipo de Dato |
|---|---|---|
| `id_registro` | Identificador único del partido | Entero (`INTEGER`) |
| `fecha_partido` | Fecha del juego (`YYYY-MM-DD`) | Fecha (`DATE`) |
| `delantero_nombre` | Nombre completo del jugador | Texto (`STRING`) |
| `club_nombre` | Club perteneciente al *Big Six* | Texto (`STRING`) |
| `minutos_jugados` | Minutos disputados | Entero (`INTEGER`) |
| `goles` | Goles anotados en el partido | Entero (`INTEGER`) |
| `xg_partido` | Goles esperados acumulados | Decimal (`FLOAT`) |
| `eficiencia_xg` | Diferencia entre Goles y xG | Decimal (`FLOAT`) |
| `total_comentarios` | Volumen total de menciones procesadas | Entero (`INTEGER`) |
| `clasificacion_sentimiento` | Categoría dominante (`Positivo`, `Neutro`, `Negativo`) | Texto (`STRING`) |
| `porcentaje_aprobacion` | Porcentaje de menciones positivas | Decimal (`FLOAT`) |
