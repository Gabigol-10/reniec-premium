# 🏛️ RENIEC - Sistema de Gestión de Usuarios Premium

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.40-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)

**Sistema de administración de usuarios enterprise con diseño moderno inspirado en Stripe, Linear y Vercel**

[Demo en Vivo](#) • [Documentación](#características) • [Reporte de Issues](#)

</div>

---

## 🌟 Características Premium

### 🎨 Diseño y UX
- ✨ **Microanimaciones** con Framer Motion
- 🌓 **Modo oscuro/claro** con transiciones suaves
- 💎 **Efectos glassmorphism** y degradados premium
- 🎭 **Skeleton loading states** profesionales
- 📭 **Empty states** elegantes y contextuales
- 🚫 **Página 404** personalizada con animaciones
- 📊 **Dashboard ejecutivo** con métricas en tiempo real

### 🛠️ Funcionalidades
- 👥 **Gestión completa de usuarios** (CRUD)
- 📈 **Gráficos interactivos** con Chart.js
- 🔍 **Búsqueda y filtrado** en tiempo real
- 📄 **Exportación** a Excel y PDF
- 🔐 **Autenticación** con persistencia de sesión
- 📱 **Diseño responsive** mobile-first
- ⚡ **Performance optimizado** con lazy loading
- 🎯 **Contador animado** en métricas

### 🏗️ Arquitectura
- 📦 **Context API** para gestión de estado global
- 🎣 **Custom hooks** reutilizables
- 🧩 **Componentes modulares** y documentados
- 🎯 **Código limpio** y mantenible
- 🔄 **Protected routes** con guards
- 🎪 **Notificaciones toast** en tiempo real

---

## 🚀 Inicio Rápido

### Prerequisitos
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/reniec-management.git

# Entrar al directorio
cd reniec-management

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Credenciales de Demo
```
Email: admin@reniec.pe
Contraseña: admin123
```

---

## 📸 Capturas de Pantalla

### Dashboard Ejecutivo
![Dashboard](screenshots/dashboard.png)
*Métricas en tiempo real con contadores animados y gráficos interactivos*

### Gestión de Usuarios
![Users Table](screenshots/users.png)
*Tabla avanzada con búsqueda, filtros y exportación*

### Modo Oscuro
![Dark Mode](screenshots/dark-mode.png)
*Transición suave entre temas con glassmorphism*

---

## 🏛️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AnimatedCounter.jsx
│   ├── AdvancedChart.jsx
│   ├── EmptyState.jsx
│   ├── FloatingActionButton.jsx
│   ├── LoadingScreen.jsx
│   ├── MetricCard.jsx
│   ├── SkeletonLoader.jsx
│   ├── Tooltip.jsx
│   └── ...
├── context/            # Context API providers
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   ├── UserContext.jsx
│   └── NotificationContext.jsx
├── pages/              # Páginas principales
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── UserManagement.jsx
│   └── UserProfile.jsx
├── layouts/            # Layouts de la aplicación
│   └── MainLayout.jsx
├── utils/              # Utilidades y helpers
│   └── exportUtils.js
└── App.jsx             # Configuración de rutas
```

---

## 🎨 Stack Tecnológico

| Tecnología | Uso |
|-----------|-----|
| **React 19** | Framework UI principal |
| **Vite 8** | Build tool y dev server |
| **Framer Motion** | Animaciones y transiciones |
| **Chart.js** | Visualización de datos |
| **React Router** | Enrutamiento SPA |
| **Bootstrap 5** | Sistema de grid y utilidades |
| **React Icons** | Iconografía moderna |
| **jsPDF** | Exportación a PDF |
| **XLSX** | Exportación a Excel |
| **SweetAlert2** | Modales elegantes |

---

## 🎯 Casos de Uso

Este proyecto es ideal para:
- 📂 **Portafolio profesional** de desarrolladores frontend
- 🎓 **Proyecto de entrevistas** técnicas
- 🏢 **Base para aplicaciones enterprise**
- 📚 **Recurso educativo** para React avanzado
- 🚀 **Startup MVP** de gestión de usuarios

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Genera build optimizado
npm run preview      # Preview del build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

---

## 🎨 Personalización

### Cambiar Colores del Tema

Edita las variables CSS en `src/index.css`:

```css
:root {
  --accent-color: #3B82F6;    /* Color principal */
  --bg-primary: #F8FAFC;       /* Fondo claro */
  --text-primary: #0F172A;     /* Texto principal */
}
```

### Añadir Nuevas Páginas

1. Crea el componente en `src/pages/`
2. Importa en `src/App.jsx`
3. Añade la ruta en el router

```jsx
<Route path="/nueva-pagina" element={<NuevaPagina />} />
```

---

## 🌐 Despliegue

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Arrastra la carpeta 'dist' a Netlify
```

### GitHub Pages
```bash
npm run build
# Sube la carpeta 'dist' a la rama gh-pages
```

---

## 📈 Roadmap

- [ ] Integración con backend real (Node.js/Express)
- [ ] Testing con Jest y React Testing Library
- [ ] Autenticación OAuth (Google, GitHub)
- [ ] WebSocket para actualizaciones en tiempo real
- [ ] PWA con service workers
- [ ] Internacionalización (i18n)
- [ ] Dashboards personalizables
- [ ] Sistema de roles y permisos

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@ejemplo.com

---

## 🙏 Agradecimientos

- Diseño inspirado en [Stripe](https://stripe.com), [Linear](https://linear.app) y [Vercel](https://vercel.com)
- Iconos de [React Icons](https://react-icons.github.io/react-icons/)
- Fuente tipográfica: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

---

<div align="center">

**Si este proyecto te fue útil, considera darle una ⭐**

Made with ❤️ and React

</div>
