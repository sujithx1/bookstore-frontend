# React + TypeScript + Vite





# 📚 Shakespeare Bookstore – Backend

This is the **backend** service of the **Shakespeare Bookstore Application**, responsible for managing authentication, books, purchases, author revenue tracking, and admin controls.

Built using **Node.js**, **TypeScript**, **Express**, **MongoDB**, and **Clean Architecture**.

---

## 🚀 Features

- 🔐 User authentication with JWT (Retail, Author, Admin)
- 📖 Book publishing, editing, soft delete (draft/published)
- 💰 Revenue tracking for authors
- 🛍️ Purchase handling with unique purchase IDs
- 🧾 Sales history per user/author/admin
- 📬 Email notifications (rate-limited to 100/minute)
- 🎯 Admin dashboard with full user and book control
- 🔌 WebSocket (Socket.IO) setup for real-time features

---

## 🛠️ Tech Stack

- **Runtime:** Node.js + Express
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Architecture:** Clean Architecture (Domain, Application, Infrastructure, Presentation)
- **Authentication:** JWT, Cookies
- **Email Service:** Nodemailer (Queued)
- **Utilities:** Morgan, CORS, Socket.IO

---

## 🧱 Folder Structure (Clean Architecture)



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
