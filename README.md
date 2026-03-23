# SoundShelf

Aplicación móvil de catálogo de instrumentos musicales desarrollada con React Native + Expo como parte de una prueba técnica.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Expo SDK 54 (managed workflow) |
| Lenguaje | TypeScript (strict) |
| Navegación | React Navigation 6 (Native Stack) |
| Estado de autenticación | Context API + useReducer |
| Estilos | StyleSheet + design tokens |
| Datos | JSON local + servicio asíncrono simulado |
| Infinite scroll | Hook propio useInfiniteInstruments |

---

## Cómo ejecutar

Requiere Node.js >= 18

npm install  
npm run start -- --web  

La aplicación se abrirá en http://localhost:8081

Credenciales:

Email: demo@soundshelf.app  
Password: 1234  

Nota: La aplicación se ha validado principalmente en Expo Web para garantizar consistencia durante la evaluación. El código es React Native estándar y compatible con ejecución en dispositivo físico o emulador con el SDK correspondiente.

---

## Estructura del proyecto

src/
  context/
    AuthContext.tsx
  navigation/
    RootNavigator.tsx
  screens/
    LoginScreen.tsx
    InstrumentsListScreen.tsx
    InstrumentDetailScreen.tsx
  components/
    common/
      EmptyState.tsx
      LoadingFooter.tsx
    instruments/
      InstrumentCard.tsx
  services/
    instruments.service.ts
  data/
    instruments.json
  hooks/
    useInfiniteInstruments.ts
  theme/
    tokens.ts
  types/
    auth.ts
    instrument.ts
  utils/
    delay.ts
    validators.ts

---

## Decisiones técnicas

JSON local en lugar de API externa  
Se evita depender de servicios externos durante la evaluación.  
Se simula latencia mediante delay() para reproducir comportamiento real.

Infinite scroll sin librerías externas  
Se implementa un hook propio para mantener control total del flujo y evitar dependencias innecesarias.

Context API para autenticación  
El estado es simple (login/logout), por lo que no se justifica introducir librerías adicionales.

Separación por capas  
services → datos  
hooks → lógica  
screens → vistas  
components → UI reutilizable  

Esto mejora mantenibilidad y escalabilidad.

Design tokens  
Centralización de estilos en tokens.ts para coherencia visual y facilidad de cambios.

---

## Flujo de la app

App
  AuthProvider
    RootNavigator
      Login
      Listado
        Detalle

---

## Posibles mejoras

- Testing (Jest + RN Testing Library)
- Persistencia de sesión
- Búsqueda y filtros
- Accesibilidad
- i18n
- Animaciones
- CI/CD

---

## Lo que no se implementó

- Testing → priorización de arquitectura
- Animaciones → priorización de funcionalidad
- iOS físico → validación en web para estabilidad

---


