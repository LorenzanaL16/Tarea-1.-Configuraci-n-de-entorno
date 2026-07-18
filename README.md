# QA Playwright - Demoblaze

## Información del estudiante
- Nombre: Jaquelin Natalia Lorenzana León
- Carné: 1790-22-13193

## Entorno
- Node.js: v24.15.0

## Descripción
Este proyecto contiene pruebas automatizadas con Playwright para la página de demostración Demoblaze.

## Ejecución
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar pruebas:
   ```bash
   npm test
   ```
3. Ver el reporte (esto abre automáticamente http://localhost:9323/):
   ```bash
   npx playwright show-report
   ```

## Resultado de pruebas
Se ejecutó la suite y el resultado fue:
- ✅ 3 tests pasando
- Última ejecución: 3 passed (4.6s)
- Fecha: 7/17/2026, 8:53:14 PM
- Total time: 4.6s

### Detalle de tests
1. ✅ **the home page loads and shows featured products** (2.0s) - [example.spec.ts:3](tests/example.spec.ts#L3)
2. ✅ **a user can open a product detail page** (3.0s) - [example.spec.ts:12](tests/example.spec.ts#L12)
3. ✅ **a product can be added to the cart** (3.9s) - [example.spec.ts:22](tests/example.spec.ts#L22)

### Ver el reporte completo
Para abrir el reporte interactivo de Playwright con la interfaz visual de los resultados:
```bash
npx playwright show-report
```

Se abrirá una ventana en http://localhost:9323/ mostrando:
- **All (3)**: Los 3 tests ejecutados
- **Passed (3)**: Los 3 tests pasaron correctamente (con checkmark verde ✅)
- **Failed (0)**: Sin fallos
- **Project**: chromium
- **Duración**: 4.6s total
- **Tests**:
  1. ✅ the home page loads and shows featured products (2.0s)
  2. ✅ a user can open a product detail page (3.0s)
  3. ✅ a product can be added to the cart (3.9s)

## Captura del reporte de tests
Para ver la captura visual completa de los tests pasando en Playwright Test Report, ejecuta:
```bash
npm test
npx playwright show-report
```

Se abrirá automáticamente en http://localhost:9323/ mostrando:
- **"Playwright Test Results"** en el título
- **"3 passed"** en verde brillante ✅
- Texto: "Tests ejecutados correctamente en Demoblaze"
- Botón verde: **"✓ 3/3 tests OK"**
- Node.js v24.15.0
- Listado detallado de cada test con duración individual
