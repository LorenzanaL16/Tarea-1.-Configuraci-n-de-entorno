# Tabla de decisión — Checkout

Objetivo: Definir reglas para el proceso de checkout y determinar si se permite completar la compra o mostrar mensajes/acciones alternativas.

Condiciones (mínimo 4):
- C1: Usuario autenticado (Sí / No)
- C2: Carrito con artículos (Sí / No)
- C3: Dirección de envío válida (Sí / No)
- C4: Método de pago válido (Sí / No)
- C5: Cupón aplicado (Opcional) (Sí / No)

Resultado posible:
- R: Permitir finalizar compra (Checkout OK)
- A1: Redirigir a login
- A2: Mostrar error "Carrito vacío"
- A3: Solicitar dirección de envío
- A4: Solicitar método de pago
- A5: Aplicar descuento (si cupón válido)

Reglas (mínimo 6):

| Regla | C1 (auth) | C2 (items) | C3 (dir) | C4 (pay) | C5 (cupón) | Acción / Resultado |
|-------|-----------|------------|----------|----------|-----------|--------------------|
| 1     | No        | No         | -        | -        | -         | A1 (redirigir a login) + A2 (carrito vacío)
| 2     | No        | Sí         | -        | -        | -         | A1 (redirigir a login)
| 3     | Sí        | No         | -        | -        | -         | A2 (mostrar "Carrito vacío")
| 4     | Sí        | Sí         | No       | -        | -         | A3 (solicitar dirección de envío)
| 5     | Sí        | Sí         | Sí       | No       | -         | A4 (solicitar método de pago)
| 6     | Sí        | Sí         | Sí       | Sí       | No        | R (Permitir checkout)
| 7     | Sí        | Sí         | Sí       | Sí       | Sí        | R + A5 (Permitir checkout y aplicar descuento si cupón válido)

Notas y supuestos:
- "Dirección de envío válida" implica que todos los campos obligatorios están presentes y la validación básica (código postal, país) pasa.
- "Método de pago válido" implica que la pasarela devuelve autorización o que la tarjeta está en formato válido; la confirmación final puede ser asíncrona.
- Si el usuario no está autenticado pero el sitio permite checkout como invitado, la regla 2 debería modificarse para pedir datos de contacto antes de procesar el pago.
- Reglas adicionales pueden cubrir inventario insuficiente, limitaciones por país, o autenticación de dos factores.

Fecha: 2026-08-14
Autor: Entregable Tarea05
