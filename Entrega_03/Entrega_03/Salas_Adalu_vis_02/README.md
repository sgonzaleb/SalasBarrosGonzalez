# Documentación del Proceso de Visualización — Entrega 03

**Estudiante:** Adalú Salas 
**Curso:** Narración Gráfica de No Ficción (COM-208)  
**Fecha:** 15 de octubre de 2026  

---

## 1. Proceso de Visualización y Decisiones de Diseño

Para explorar y comunicar la brecha entre el rendimiento deportivo de los delanteros centro ("9") de la Premier League y la percepción en redes sociales, diseñamos un gráfico de dispersión (*scatter plot*) interactivo en Python utilizando la librería **Altair**.

### Decisiones de Diseño Visual:
* **Eje X (Eficiencia xG):** Mide la diferencia entre los goles anotados y los goles esperados ($Goles - xG$). Permite ubicar en el lado positivo a los delanteros hiper-eficientes y en el negativo a quienes desperdiciaron ocasiones claras.
* **Eje Y (% Aprobación):** Mide el porcentaje de comentarios positivos en redes sociales tras el partido (de $0\%$ a $100\%$).
* **Codificación de Color:** Se utilizó un esquema cromático semántico claro: verde (`#2ecc71`) para sentimiento predominantemente positivo, amarillo (`#f39c12`) para neutro y rojo (`#e74c3c`) para negativo.
* **Tamaño del Punto:** Proporcional al volumen total de comentarios/menciones generadas tras el partido, permitiendo dimensionar el *hype* o impacto medático del jugador.
* **Interactividad (Tooltips):** Al pasar el cursor por cada observación, el usuario puede inspeccionar los datos exactos del jugador, goles, $xG$ y porcentaje de aprobación.

---

## 2. Preguntas Respondibles con la Visualización

1. **¿Un saldo negativo de $xG$ desencadena inmediatamente una ola de críticas destructivas en redes?**
   * *Respuesta:* Sí, jugadores como Nicolas Jackson o Rasmus Højlund en fechas con $xG$ desperdiciado se ubican en el cuadrante inferior izquierdo, con aprobaciones inferiores al $35\%$.
2. **¿Sanciona el hincha al delantero que marca goles pero que registra baja efectividad general?**
   * *Respuesta:* No del todo. El "efecto gol" amortigua la crítica: marcar al menos un gol (ej. Darwin Núñez) eleva la aprobación por encima del $60\%$ incluso si la eficiencia respecto a sus oportunidades generadas fue neutra o negativa.
3. **¿Quiénes son los jugadores más inmunes al escrutinio negativo?**
   * *Respuesta:* Erling Haaland y Viktor Gyökeres exhiben niveles de aprobación por encima del $88\%$ cuando registran eficiencias positivas de $xG$, consolidándose en el cuadrante superior derecho ("Los Héroes").
