
  # DAO Proposal Management Platform

  This repository contains the source for the DAO Proposal Management Platform. The original design is available at https://www.figma.com/design/j2WjHBdlHGh3j3Oxke4IIt/DAO-Proposal-Management-Platform.

  ## Stack principal (resumen sencillo)

  - Lenguaje: TypeScript
  - UI: React 18
  - Bundler / dev server: Vite (con @vitejs/plugin-react-swc)
  - Estilos: Tailwind CSS
  - Otras librerías destacadas: Radix UI, lucide-react (iconos), recharts (gráficos), embla-carousel-react

  ## Comandos rápidos

  En la raíz del proyecto (donde está `package.json`):

  ```bash
  npm install      # instala dependencias
  npm run dev      # arranca el servidor de desarrollo (Vite)
  npm run build    # construye la versión de producción
  ```

  Nota: se recomienda Node 16+ (Node 18 recomendado). Si preferís `pnpm` o `yarn`, podés usarlos en lugar de `npm`.

  Más detalles (dependencias y configuración) están en `package.json` y `vite.config.ts`.
  