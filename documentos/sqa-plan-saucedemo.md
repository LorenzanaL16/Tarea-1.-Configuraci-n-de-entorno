# SQA Plan - SauceDemo

## 1. Objetivo

Verificar que los flujos principales de SauceDemo funcionen de forma estable y que los defectos críticos sean detectados antes de una entrega.

## 2. Alcance

- Inicio de sesión con credenciales válidas, inválidas y usuario bloqueado.
- Carga y ordenamiento del inventario.
- Agregar y quitar productos del carrito.
- Checkout y confirmación de compra.
- Logout y regresión de la sesión.

## 3. Fuera de alcance

- Pruebas de rendimiento formales o carga concurrente.
- Integraciones externas y servicios de pago reales.
- Compatibilidad con navegadores distintos de Chromium en esta entrega.

## 4. Estrategia

Se ejecutarán pruebas automatizadas end-to-end con Playwright y Page Object Model. Las pruebas se organizarán por clase y por riesgo; los flujos críticos tendrán aserciones de URL, visibilidad, cantidad de elementos y resultado de negocio.

## 5. Datos de prueba

| Dato | Valor |
|---|---|
| Usuario válido | `standard_user` |
| Usuario lento | `performance_glitch_user` |
| Contraseña | `secret_sauce` |
| Producto principal | `Sauce Labs Backpack` |

## 6. Criterios

### Entrada

- La aplicación debe estar disponible en `https://www.saucedemo.com`.
- Las dependencias de Node.js deben estar instaladas.
- El navegador Chromium debe estar disponible.

### Salida

- Todos los casos críticos deben pasar.
- Los fallos deben contar con trazas o evidencia suficiente para reproducirse.
- No deben existir defectos críticos abiertos para entregar.

## 7. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Variación en tiempos de respuesta | Usar auto-wait de Playwright y marcar como lento el caso de `performance_glitch_user`. |
| Estado residual del carrito | Crear contextos aislados o limpiar el estado entre escenarios independientes. |
| Cambio de selectores | Preferir selectores `data-test` y Page Objects centralizados. |

## 8. Ejecución

```bash
npm install
npx playwright test tests/clase08.spec.ts
```

Para comprobar el `test.skip()` dinámico:

```powershell
$env:SKIP_DYNAMIC_TEST = 'true'; npx playwright test tests/clase08.spec.ts
```

## 9. Reporte

El resultado se consulta con:

```bash
npx playwright show-report
```