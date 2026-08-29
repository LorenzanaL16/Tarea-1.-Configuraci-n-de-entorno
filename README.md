# QA Playwright - Demoblaze

## Estudiante
- Nombre: Jaquelin Natalia Lorenzana León
- Carné: 1790-22-13193

## Entorno
- Node.js: v24.15.0

## Descripción
Este proyecto contiene pruebas automatizadas con Playwright para la página de demostración Demoblaze.

## Ejecución
Esta sección explica cómo ejecutar el proyecto y verificar los tests.

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar la suite de Playwright:
   ```bash
   npm test
   ```
3. Ejecutar solo los tests de Clase 03 (incluye los 6 tests de clase y los 3 tests de la Tarea 03):
   ```bash
   npx playwright test tests/clase03.spec.ts
   ```
4. Ver el reporte interactivo de Playwright:
   ```bash
   npx playwright show-report
   ```

> Nota: el `README.md` sirve como el documento de ejecución para la entrega de la tarea.

## Clase 06 - Extender POM a Nuevas Áreas

### Descripción
En esta clase se extendió el Page Object Model (POM) a nuevas áreas de la aplicación, creando tres nuevos Page Objects y ocho tests (5 base + 3 reto).

### Page Objects Creados
- ✅ `pages/CheckoutPage.ts` - Gestiona el flujo de checkout (formulario + finish)
- ✅ `pages/MenuPage.ts` - Gestiona el menú hamburguesa y logout
- ✅ `pages/InventoryPage.ts` - Extendido con método `removeProductByName()`
- ✅ `pages/CartPage.ts` - Gestiona la página del carrito
- ✅ `pages/LoginPage.ts` - Page Object de login (reparado)

### Tests Clase 06 (8 Tests - Todos en Verde ✅)

**5 Tests Base:**
1. ✅ Base 1: Verificar que el inventario se carga correctamente
2. ✅ Base 2: Agregar producto al carrito
3. ✅ Base 3: Ir al carrito y verificar producto
4. ✅ Base 4: Agregar múltiples productos al carrito
5. ✅ Base 5: Ordenar productos por precio (bajo a alto)

**3 Tests Reto:**
6. ✅ Reto 1: Completar compra de principio a fin con CheckoutPage
7. ✅ Reto 2: Probar flujo de logout con MenuPage
8. ✅ Reto 3: Quitar producto y verificar que badge desaparece

### Ejecutar tests de Clase 06
```bash
npx playwright test tests/clase06.spec.ts
```

### Resultado de Pruebas Clase 06
- ✅ 8 tests pasando
- Última ejecución: 8 passed (4.0s)
- Fecha: 28/8/2026
- Total time: 4.0s

![Reporte de Tests Clase 06](./assets/clase06-test-report.png)

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

### Captura del reporte real
![Playwright Test Report - example](assets/test-report.png)

**Reporte actual (clase 02):**
![Playwright Test Report - clase 02](assets/test-report-clase02.png)

**Reporte actual (clase 03):**
![Playwright Test Report - clase 03](assets/test-report-clase03.png)

## Reporte de tests — Clase 04

El resultado de la ejecución de los tests de la Clase 04 y los retos se muestra en el reporte interactivo dentro de `playwright-report/`.

- Imagen representativa del reporte (captura):

![Playwright Test Report - clase 04](assets/test-report-clase04.png)


- Abrir reporte interactivo:

```bash
npx playwright show-report
```

## Reflexión: auto-wait vs sleep
En Playwright es mejor usar el auto-wait incorporado y los selectores inteligentes en lugar de `page.waitForTimeout()` o `sleep()`.
- `expect(...)`, `page.waitForSelector()` y `page.goto(..., { waitUntil: ... })` esperan dinámicamente a que la página o el elemento esté listo.
- `sleep()` bloquea el test y hace la suite más lenta, además de poder ocultar problemas reales de sincronización.
- El auto-wait hace las pruebas más estables y reduce el riesgo de falsos negativos.

## Tarea 05 — Instrucciones de entrega

Archivos entregables en esta tarea:
- [tests/clase05.spec.ts](tests/clase05.spec.ts) — suite con 10 tests base + 3 tests reto (toHaveValue, toBeFocused, toHaveCSS).
- [casos-de-prueba/tabla-decision-checkout.md](casos-de-prueba/tabla-decision-checkout.md) — tabla de decisión con condiciones y reglas.

Ejecutar solo los tests de la tarea:
```bash
npx playwright test tests/clase05.spec.ts
```

Generar y abrir el reporte HTML (tras ejecutar los tests):
```bash
npx playwright show-report
```

Sugerencia de commit y push (crear branch `tarea05`):
```bash
git checkout -b tarea05
git add tests/clase05.spec.ts casos-de-prueba/tabla-decision-checkout.md README.md
git commit -m "Tarea05: añadir 3 retos y tabla de decision"
git push origin tarea05
```
**Reporte actual (clase 05):**
![Playwright Test Report - clase 05](assets/test-report-clase05.png)



