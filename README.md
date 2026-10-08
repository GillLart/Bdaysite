## Credits

This project's UI is built using components from
[Pixelact UI](https://www.pixelactui.com/), a pixel-art styled
component library built on top of [shadcn/ui](https://ui.shadcn.com/).
Pixelact UI is licensed under the MIT License.

It also uses:
- [Radix UI](https://www.radix-ui.com/) — accessible component primitives
- [class-variance-authority](https://cva.style/) — variant styling utility
- The [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)
  font by CodeMan38, via Google Fonts, licensed under the
  [SIL Open Font License 1.1](https://scripts.sil.org/OFL)
  
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performance. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

For future development of the production version of the application, could use TypeScript with type-aware lint rules enabled but I would need to do a fair amount of refactoring. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
