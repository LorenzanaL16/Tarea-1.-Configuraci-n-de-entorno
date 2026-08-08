# Tarea 04 — Reflexión

¿Cuál principio es más importante y por qué?

- **Principio elegido: Fiabilidad de las pruebas (estabilidad / robustez)**

  Justificación:
  - Las pruebas automatizadas son valiosas cuando sus resultados son confiables. Si un test falla de forma intermitente por condiciones de sincronización o dependencias externas, su valor como herramienta de retroalimentación disminuye.
  - Priorizar la fiabilidad implica usar esperas inteligentes (auto-wait de Playwright, `expect` con timeouts apropiados, selectores robustos) en vez de `sleep()` o `waitForTimeout()` inútiles. Esto reduce falsos positivos/negativos y hace que la suite sea mantenible.
  - Una suite fiable permite detectar regresiones reales con rapidez, mejora la confianza del equipo y facilita la integración continua.

Breve recomendación práctica:
- Evitar `waitForTimeout` salvo para amortiguar flujos inevitables; preferir `expect(...).toBeVisible()`/`page.waitForSelector()` y selectores semánticos.
- Mantener tests independientes y limpias: preparar y limpiar estado cuando sea posible.
- Ejecutar tests en entornos reproducibles (CI) y añadir retries razonables solo cuando el problema esté identificado.

Fecha: 2026-08-07
