# QA Playwright - Demoblaze

## Estudiante
- Nombre: Jaquelin Natalia Lorenzana León
- Carné: 1790-22-13193

## Entorno
- Node.js: v24.15.0

## Descripción
Este proyecto contiene pruebas automatizadas con Playwright para la página de demostración Demoblaze.

## Ejecución General
Esta sección explica cómo ejecutar el proyecto y verificar los tests.

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar la suite de Playwright completa:
   ```bash
   npm test
   ```
3. Ver el reporte interactivo de Playwright:
   ```bash
   npx playwright show-report
   ```

---

## Clase 05 - Casos Base y Retos

### Descripción
En esta clase se implementaron múltiples casos de prueba incluyendo casos válidos, inválidos, valores en frontera y retos con nuevos matchers de Playwright.

### Tests Clase 05 (10 Tests Base + 3 Tests Reto = 13 Tests Total)

**10 Tests Base:**
1. ✅ CE válida: login exitoso
2. ✅ CE inválida: usuario no existe
3. ✅ CE inválida: usuario bloqueado
4. ✅ Valor en frontera: campos vacíos
5. ✅ Verificar que el inventario tiene exactamente 6 productos
6. ✅ Verificar el precio con una expresión regular
7. ✅ Agregar y quitar producto del carrito
8. ✅ Navegar a detalle del producto
9. ✅ Filtrar por nombre (A to Z) cambia el primer producto
10. ✅ Base 10 test

**3 Tests Reto:**
- ✅ Reto 1 - toHaveValue(): Ordenar por precio y verificar value y primer precio
- ✅ Reto 2 - toBeFocused(): El campo de usuario recibe el foco
- ✅ Reto 3 - toHaveCSS(): Verificar estilos CSS

### Archivos Entregables Clase 05
- [tests/clase05.spec.ts](tests/clase05.spec.ts) — Suite con 13 tests (base + retos)
- [casos-de-prueba/tabla-decision-checkout.md](casos-de-prueba/tabla-decision-checkout.md) — Tabla de decisión

### Ejecutar tests de Clase 05
```bash
npx playwright test tests/clase05.spec.ts
```

### Resultado de Pruebas Clase 05
- ✅ Tests pasando
- Fecha: 28/8/2026
- [Reporte de Tests Clase 05](./assets/test-report-clase05.png)

![Playwright Test Report - clase 05](assets/test-report-clase05.png)

---

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

### Archivos Entregables Clase 06
- [pages/CheckoutPage.ts](pages/CheckoutPage.ts) — Page Object para checkout
- [pages/MenuPage.ts](pages/MenuPage.ts) — Page Object para menú y logout
- [pages/InventoryPage.ts](pages/InventoryPage.ts) — Extendido con removeProductByName()
- [pages/CartPage.ts](pages/CartPage.ts) — Page Object para carrito
- [tests/clase06.spec.ts](tests/clase06.spec.ts) — Suite con 8 tests

### Ejecutar tests de Clase 06
```bash
npx playwright test tests/clase06.spec.ts
```

### Resultado de Pruebas Clase 06
- ✅ 8 tests pasando
- Última ejecución: 8 passed (4.0s)
- Fecha: 28/8/2026
- Total time: 4.0s

![Reporte de Tests Clase 06](./assets/test-report-clase06.png)

---

## Reflexión: auto-wait vs sleep
En Playwright es mejor usar el auto-wait incorporado y los selectores inteligentes en lugar de `page.waitForTimeout()` o `sleep()`.
- `expect(...)`, `page.waitForSelector()` y `page.goto(..., { waitUntil: ... })` esperan dinámicamente a que la página o el elemento esté listo.
- `sleep()` bloquea el test y hace la suite más lenta, además de poder ocultar problemas reales de sincronización.
- El auto-wait hace las pruebas más estables y reduce el riesgo de falsos negativos.

> Nota: el `README.md` sirve como el documento de ejecución para la entrega de las tareas.



