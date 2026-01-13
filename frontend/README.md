# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
"# H2T_Shopp"

**Thư viện cần cài đặt (Frontend)**

- **Runtime dependencies:** React và các thư viện hỗ trợ giao diện/điều hướng/hiệu ứng.
	- Thư viện: `react`, `react-dom`, `react-router-dom`, `react-icons`, `framer-motion`, `recharts`, `swiper`, `tailwindcss`, `@tailwindcss/vite`.
	- Cài đặt (một lệnh): `npm install react react-dom react-router-dom react-icons framer-motion recharts swiper tailwindcss @tailwindcss/vite`

- **Dev dependencies:** Công cụ build, plugin và ESLint/typing.
	- Thư viện: `vite`, `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`, `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`.
	- Cài đặt (một lệnh): `npm install -D vite @vitejs/plugin-react @types/react @types/react-dom eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals`

- **Khởi tạo Tailwind (nếu chưa có):** `npx tailwindcss init -p`

- **Chạy dự án (dev):** `npm run dev`

Thêm các lệnh trên vào console trong thư mục `frontend` để cài đặt các phụ thuộc cần thiết.
