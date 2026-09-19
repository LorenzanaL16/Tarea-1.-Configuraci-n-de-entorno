# Evidencia de pruebas - Clase 08

## Resultado de la ejecución

Comando ejecutado:

```bash
npx playwright test tests/clase08.spec.ts
```

Resultado: **3 tests pasaron correctamente**.

## Resultado del skip dinámico

Comando ejecutado con `SKIP_DYNAMIC_TEST=true`:

```powershell
$env:SKIP_DYNAMIC_TEST = 'true'; npx playwright test tests/clase08.spec.ts
```

Resultado: **2 tests pasaron y 1 test fue omitido dinámicamente**.

## Entregables

- [Helper de autenticación](../helpers/auth.ts)
- [Pruebas de Clase 08](../tests/clase08.spec.ts)
- [SQA Plan de SauceDemo](../documentos/sqa-plan-saucedemo.md)
