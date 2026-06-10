# 🚀 Guía de Despliegue

Esta guía te ayudará a desplegar tu aplicación RENIEC en diferentes plataformas.

---

## 📋 Pre-requisitos

Antes de desplegar, asegúrate de:
- ✅ Todos los tests pasan (cuando los implementes)
- ✅ Build local funciona: `npm run build`
- ✅ No hay errores de ESLint: `npm run lint`
- ✅ Todas las variables de entorno están configuradas

---

## 🌐 Vercel (Recomendado)

### Opción 1: Deploy desde GitHub

1. **Conecta tu repositorio:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente Vite

2. **Configuración automática:**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Variables de entorno (si las tienes):**
   - Agrega en Settings → Environment Variables
   ```
   VITE_API_URL=https://tu-api.com
   ```

4. **Deploy:**
   - Click en "Deploy"
   - Vercel asignará una URL automáticamente

### Opción 2: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Configuración Avanzada

Crea un archivo `vercel.json` en la raíz:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔷 Netlify

### Opción 1: Deploy desde Git

1. **Conecta tu repositorio:**
   - Ve a [netlify.com](https://netlify.com)
   - Click en "Add new site" → "Import an existing project"
   - Conecta con GitHub

2. **Configuración de build:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Redirect rules:**
   Crea un archivo `netlify.toml` en la raíz:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Opción 2: Deploy Manual

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build y deploy
npm run build
netlify deploy --prod --dir=dist
```

---

## 🔺 GitHub Pages

### Setup

1. **Instala gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Actualiza vite.config.js:**
   ```js
   export default defineConfig({
     base: '/nombre-repositorio/', // Nombre de tu repo
     plugins: [react()],
   })
   ```

3. **Agrega scripts en package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Configurar GitHub:**
   - Ve a Settings → Pages
   - Source: gh-pages branch
   - Guarda cambios

Tu sitio estará en: `https://tu-usuario.github.io/nombre-repositorio/`

---

## 🐳 Docker

### Dockerfile

Crea un `Dockerfile` en la raíz:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Crea `nginx.conf` en la raíz:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Comandos Docker

```bash
# Build
docker build -t reniec-app .

# Run
docker run -p 8080:80 reniec-app

# Acceder en: http://localhost:8080
```

### Docker Compose

Crea `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
docker-compose up -d
```

---

## ☁️ AWS S3 + CloudFront

### 1. Build la aplicación

```bash
npm run build
```

### 2. Crear Bucket S3

```bash
aws s3 mb s3://reniec-app
aws s3 sync dist/ s3://reniec-app
```

### 3. Configurar Static Website

```bash
aws s3 website s3://reniec-app \
  --index-document index.html \
  --error-document index.html
```

### 4. Configurar CloudFront

- Crear distribución de CloudFront
- Origen: Tu bucket S3
- Default Root Object: index.html
- Error Pages: 404 → /index.html (200)

---

## 🔧 Variables de Entorno

### Desarrollo (.env.local)

```env
VITE_APP_NAME=RENIEC
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_ANALYTICS=false
```

### Producción (.env.production)

```env
VITE_APP_NAME=RENIEC
VITE_API_URL=https://api.reniec.com
VITE_ENABLE_ANALYTICS=true
```

**Nota:** Todas las variables deben empezar con `VITE_` para ser accesibles en el código.

### Uso en código

```js
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🔒 Configuración de Seguridad

### Headers de Seguridad

Para Netlify, agrega a `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

Para Vercel, agrega a `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 📊 Analytics y Monitoreo

### Google Analytics (opcional)

1. **Instalar:**
   ```bash
   npm install react-ga4
   ```

2. **Configurar en src/main.jsx:**
   ```jsx
   import ReactGA from 'react-ga4';
   
   if (import.meta.env.PROD) {
     ReactGA.initialize('G-XXXXXXXXXX');
   }
   ```

### Sentry (opcional)

1. **Instalar:**
   ```bash
   npm install @sentry/react
   ```

2. **Configurar:**
   ```jsx
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "your-dsn-here",
     environment: import.meta.env.MODE
   });
   ```

---

## ⚡ Optimizaciones de Performance

### 1. Code Splitting

Ya implementado con React Router:
```jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

### 2. Análisis de Bundle

```bash
npm install --save-dev vite-plugin-visualizer
```

En `vite.config.js`:
```js
import { visualizer } from 'vite-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});
```

### 3. Compresión

Vercel y Netlify comprimen automáticamente.

Para otros:
```bash
npm install --save-dev vite-plugin-compression
```

---

## 🧪 Testing Pre-Deploy

### Checklist

- [ ] `npm run build` completa sin errores
- [ ] `npm run preview` muestra la app correctamente
- [ ] Todas las rutas funcionan
- [ ] Página 404 se muestra correctamente
- [ ] Modo oscuro/claro funciona
- [ ] Responsive en mobile/tablet/desktop
- [ ] Exportación a PDF/Excel funciona
- [ ] No hay warnings en consola
- [ ] Imágenes y assets cargan correctamente

### Preview Local

```bash
npm run build
npm run preview
# Abre http://localhost:4173
```

---

## 🔄 CI/CD

### GitHub Actions

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🐛 Troubleshooting

### Rutas no funcionan después del deploy

**Problema:** Navegación directa a rutas da 404

**Solución:** Configura redirects/rewrites para SPA:
- Vercel: Automático
- Netlify: `_redirects` o `netlify.toml`
- Nginx: `try_files $uri /index.html`

### Assets no cargan

**Problema:** CSS/JS/imágenes no se cargan

**Solución:** Verifica el `base` en `vite.config.js`:
```js
base: '/' // Para dominio propio
base: '/repo-name/' // Para GitHub Pages
```

### Variables de entorno no funcionan

**Problema:** `import.meta.env.VITE_X` es undefined

**Solución:**
- Usa prefijo `VITE_`
- Reconstruye: `npm run build`
- Verifica que esté en el archivo `.env`

---

## 📚 Recursos Adicionales

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages with Vite](https://vitejs.dev/guide/static-deploy.html#github-pages)

---

## 🎉 ¡Listo!

Tu aplicación RENIEC ahora está lista para ser desplegada en producción. Elige la plataforma que mejor se adapte a tus necesidades y sigue los pasos correspondientes.

**Recomendación:** Para proyectos de portafolio, Vercel es la opción más sencilla y profesional.
