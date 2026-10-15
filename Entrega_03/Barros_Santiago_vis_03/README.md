# Bitácora y Proceso de Investigación: Entrega 03

## 📝 ¿De qué trata este trabajo?
En esta puntual entrega, por mi parte al analizar los datos de los 974 comentarios de instragram de los distintos partidos vistos en la entrega pasada, pude darme cuenta que en el fútbol moderno, existe una doble calificación a los jugadores (Delantero o 9) según sean o no jugadores promesas (recién llegados y jovenes) en comparación con jugadores más veteranos. Mientras a los juveniles o "promesas" se les perdonan los errores bajo la consigna de la ilusión, a los jugadores "consagrados" se les juzga con una lupa implacable. Para demostrarlo, tomé como muestra los comentarios de Instagram de cuentas oficiales de la Premier League (Liverpool, Manchester City y Manchester United). Está fue una variante que la verdad no esperabamos porque recalca como pesa fuera de la jugabilidad y las estadísticas, también la sensación de la ilusión por confiar en un nuevo jugador que tenga la potencialidad de cambiar al equipo, y en esta flexibilidad con los nuevos es una forma que podríamos ver como existen jugadores que son calificados como mejores o influyentes por situaciones e ideas externas al juego en si mismo, es un ejemplo clarificador de eso.

---

## 🛠️ El Paso a Paso: ¿Cómo construí esta entrega?

1. **La bajada de datos y la limpieza (El inicio):**
   Partí extrayendo y filtrando los comentarios recopilados en las entregas anteriores. En lugar de quedarme solo con la masa de textos, organicé todo en una base de datos limpia (`base_delanteros_vis.csv`), asegurándome de clasificar a los jugadores por su rol ("Promesa" vs. "Consagrado") y midiendo sus porcentajes de aprobación de forma estructurada.

2. **El procesamiento técnico en Python:**
   Me pasé a Visual Studio Code y Google Colab para trabajar con la base de datos. Mediante scripts en Python y el uso de librerías, estructuré las variables de sentimiento y las métricas de aprobación que luego me servirían para graficar. Todo ese código quedó respaldado en la carpeta `scripts/codigo_para_visualizar_1.ipynb`.

3. **La visualización de datos:**
   Buscando la mejor forma de representar esa asimetría en la exigencia, diseñé un gráfico interactivo (`vis_01.html`) que también exporté de forma estática (`vis_01.jpg`). La idea era que a simple vista se notara la brecha de aprobación entre ambos mundos.

4. **La construcción de la crónica:**
   Con los datos sobre la mesa, escribí `cronica.md` dentro de la carpeta `visualizacion/`, dándole un tono más personal, periodístico y directo, conectando las cifras recopiladas con lo que puedo apreciar yo al buscar un indice comparativo, y creo que en este caso se pudo marcar aquella diferencia de la que antes jamás se me hubiera ocurrido. Todo esto al analizar lo que realmente dicen los hinchas en el calor de los partidos.

---

## 📂 Organización del Repositorio
* **`base_delanteros_vis.csv`**: La base de datos cruda y procesada.
* **`Ficha_Técnica.md`**: El desglose técnico y diccionario de las variables utilizadas.
* **`visualizacion/`**: Contiene la crónica periodística y el gráfico interactivo/estático.
* **`scripts/`**: El cuaderno con el código ejecutable del análisis.
