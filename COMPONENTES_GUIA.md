# 📚 Guía de Componentes Premium

Esta guía muestra cómo usar todos los componentes premium implementados en la aplicación.

---

## 🎯 Componentes de UI

### 1. MetricCard

Tarjeta de métrica animada con contador y tendencia.

```jsx
import MetricCard from './components/MetricCard';
import { FiUsers } from 'react-icons/fi';

<MetricCard
  icon={FiUsers}
  title="Total Usuarios"
  value={1234}
  change={12.5}
  changeLabel="vs mes anterior"
  trend="up"
  color="#3B82F6"
  delay={0}
/>
```

**Props:**
- `icon` - Componente de icono de react-icons
- `title` - Título de la métrica
- `value` - Valor numérico (se anima automáticamente)
- `change` - Porcentaje de cambio (opcional)
- `changeLabel` - Label del cambio (opcional)
- `trend` - 'up' o 'down'
- `color` - Color hexadecimal
- `delay` - Delay de animación en segundos

---

### 2. AnimatedCounter

Contador animado con spring physics.

```jsx
import AnimatedCounter from './components/AnimatedCounter';

<h2>
  <AnimatedCounter value={1234} duration={1} />
</h2>
```

**Props:**
- `value` - Número a mostrar
- `duration` - Duración de la animación en segundos (default: 1)

---

### 3. EmptyState

Estado vacío elegante con iconografía.

```jsx
import EmptyState from './components/EmptyState';

<EmptyState
  icon="users"
  title="No hay usuarios"
  description="Aún no hay usuarios registrados en el sistema."
  action={() => console.log('Crear')}
  actionLabel="Crear nuevo usuario"
  compact={false}
/>
```

**Props:**
- `icon` - 'inbox', 'users', 'search', 'alert', 'file', 'database'
- `title` - Título del estado vacío
- `description` - Descripción detallada
- `action` - Función callback (opcional)
- `actionLabel` - Label del botón de acción (opcional)
- `compact` - Versión compacta (default: false)

---

### 4. SkeletonLoader

Estados de carga con animación shimmer.

```jsx
import { SkeletonCard, SkeletonTable, SkeletonChart } from './components/SkeletonLoader';

// Skeleton para card
<SkeletonCard height="120px" />

// Skeleton para tabla
<SkeletonTable rows={5} />

// Skeleton para gráfico
<SkeletonChart />
```

**Componentes disponibles:**
- `SkeletonCard` - Card con altura personalizable
- `SkeletonTable` - Tabla con número de filas configurable
- `SkeletonChart` - Gráfico con barras animadas
- `SkeletonText` - Líneas de texto

---

### 5. Badge

Badge con variantes de color y efectos.

```jsx
import Badge from './components/Badge';

<Badge variant="success" dot pulse size="md">
  Activo
</Badge>
```

**Props:**
- `variant` - 'primary', 'success', 'danger', 'warning', 'info'
- `dot` - Muestra punto indicador (default: false)
- `pulse` - Animación de pulsación (default: false)
- `size` - 'sm', 'md', 'lg' (default: 'md')

---

### 6. Tooltip

Tooltip personalizado con animaciones.

```jsx
import Tooltip from './components/Tooltip';

<Tooltip content="Información adicional" placement="top">
  <button className="btn btn-primary">Hover me</button>
</Tooltip>
```

**Props:**
- `content` - Contenido del tooltip
- `placement` - 'top', 'bottom', 'left', 'right' (default: 'top')

---

### 7. ProgressBar

Barra de progreso animada con efecto shimmer.

```jsx
import ProgressBar from './components/ProgressBar';

<ProgressBar
  value={75}
  max={100}
  color="#3B82F6"
  height="8px"
  showLabel
  label="Progreso del proyecto"
  animated
/>
```

**Props:**
- `value` - Valor actual
- `max` - Valor máximo (default: 100)
- `color` - Color de la barra (default: '#3B82F6')
- `height` - Altura de la barra (default: '8px')
- `showLabel` - Mostrar label y porcentaje (default: false)
- `label` - Texto del label (opcional)
- `animated` - Efecto shimmer (default: true)

---

### 8. LoadingScreen

Pantalla de carga profesional.

```jsx
import LoadingScreen from './components/LoadingScreen';

{isLoading && <LoadingScreen />}
```

Sin props. Se usa como componente standalone.

---

### 9. FloatingActionButton

Botón flotante con menú expandible.

```jsx
import FloatingActionButton from './components/FloatingActionButton';
import { FiUser, FiFileText } from 'react-icons/fi';

<FloatingActionButton
  actions={[
    { 
      icon: FiUser, 
      label: 'Nuevo Usuario', 
      action: () => console.log('Usuario') 
    },
    { 
      icon: FiFileText, 
      label: 'Generar Reporte', 
      action: () => console.log('Reporte') 
    }
  ]}
/>
```

**Props:**
- `actions` - Array de objetos con { icon, label, action }

---

### 10. PageTransition

Wrapper para transiciones entre páginas.

```jsx
import PageTransition from './components/PageTransition';

<PageTransition>
  <YourPageContent />
</PageTransition>
```

---

### 11. StatsGrid

Grid de estadísticas con animaciones staggered.

```jsx
import StatsGrid from './components/StatsGrid';
import { FiUsers, FiActivity } from 'react-icons/fi';

<StatsGrid
  stats={[
    {
      icon: FiUsers,
      label: 'Total Usuarios',
      value: '1,234',
      change: '+12%',
      trend: 'up'
    },
    {
      icon: FiActivity,
      label: 'Actividad',
      value: '456',
      change: '-5%',
      trend: 'down'
    }
  ]}
/>
```

**Props:**
- `stats` - Array de objetos con { icon, label, value, change, trend }

---

### 12. AdvancedChart

Gráfico interactivo con selector de tipo.

```jsx
import AdvancedChart from './components/AdvancedChart';

<AdvancedChart
  type="line"
  title="Tendencia Mensual"
  subtitle="Registros por mes"
  data={chartData}
  options={chartOptions}
/>
```

**Props:**
- `type` - 'line', 'bar', 'doughnut' (default: 'line')
- `title` - Título del gráfico
- `subtitle` - Subtítulo (opcional)
- `data` - Objeto de datos de Chart.js
- `options` - Objeto de opciones de Chart.js

---

## 🎨 Utilidades de Animación

### Importar variantes

```jsx
import {
  fadeIn,
  slideUp,
  scaleIn,
  staggerContainer,
  hoverScale,
  tapScale
} from './utils/animations';
```

### Uso con motion

```jsx
import { motion } from 'framer-motion';
import { fadeIn, hoverScale } from './utils/animations';

<motion.div
  {...fadeIn}
  whileHover={hoverScale}
>
  Contenido
</motion.div>
```

### Variantes disponibles

**Entrada/Salida:**
- `fadeIn` - Fade simple
- `slideUp` - Desliza desde abajo
- `slideDown` - Desliza desde arriba
- `scaleIn` - Escala desde pequeño

**Interacciones:**
- `hoverScale` - Escala al hover
- `tapScale` - Escala al tap/click
- `hoverLift` - Eleva al hover

**Listas:**
- `staggerContainer` - Contenedor con stagger
- `staggerItem` - Item hijo con animación

**Loops:**
- `float` - Flotación continua
- `rotate` - Rotación continua
- `pulse` - Pulsación continua

---

## 🎯 Constantes

### Importar constantes

```jsx
import {
  APP_NAME,
  USER_STATUS,
  STATUS_COLORS,
  VALIDATION_RULES
} from './utils/constants';
```

### Usar constantes

```jsx
// Estados de usuario
if (user.status === USER_STATUS.ACTIVE) {
  // ...
}

// Colores de estado
const color = STATUS_COLORS[user.status];

// Validaciones
if (dni.length !== VALIDATION_RULES.DNI_LENGTH) {
  // ...
}
```

---

## 🎨 Clases CSS Útiles

### Hover Effects

```jsx
<div className="hover-lift">
  Se eleva al hover
</div>

<div className="hover-glow">
  Brilla al hover
</div>
```

### Animaciones

```jsx
<div className="fade-in">
  Fade in animation
</div>

<div className="slide-in-right">
  Slide from right
</div>

<div className="pulse">
  Pulsing element
</div>
```

### Gradientes

```jsx
<h1 className="gradient-text">
  Texto con gradiente
</h1>

<div className="gradient-border">
  Borde con gradiente
</div>
```

---

## 💡 Ejemplos Completos

### Página con Loading State

```jsx
import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import EmptyState from './components/EmptyState';

function MyPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;

  if (data.length === 0) {
    return (
      <EmptyState
        icon="database"
        title="No hay datos"
        description="No se encontraron registros."
        action={handleCreate}
        actionLabel="Crear nuevo"
      />
    );
  }

  return <div>{/* Render data */}</div>;
}
```

### Card con Métricas

```jsx
import MetricCard from './components/MetricCard';
import { FiUsers, FiActivity } from 'react-icons/fi';

function Dashboard() {
  return (
    <div className="row g-4">
      <div className="col-md-6 col-lg-3">
        <MetricCard
          icon={FiUsers}
          title="Total Usuarios"
          value={1234}
          change={12.5}
          trend="up"
          color="#3B82F6"
          delay={0}
        />
      </div>
      <div className="col-md-6 col-lg-3">
        <MetricCard
          icon={FiActivity}
          title="Actividad"
          value={456}
          change={5.2}
          trend="down"
          color="#EF4444"
          delay={0.1}
        />
      </div>
    </div>
  );
}
```

### Tabla con Skeleton

```jsx
import { SkeletonTable } from './components/SkeletonLoader';

function UserList() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  if (loading) {
    return <SkeletonTable rows={5} />;
  }

  return <table>{/* Render users */}</table>;
}
```

---

## 🚀 Tips de Performance

1. **Lazy Loading de Componentes**
```jsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

2. **Memoización**
```jsx
const MemoizedCard = memo(MetricCard);
```

3. **useMemo para cálculos pesados**
```jsx
const processedData = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

4. **Reducir re-renders**
```jsx
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

---

## 🎨 Personalización de Tema

### Cambiar colores en `src/index.css`:

```css
:root {
  --accent-color: #3B82F6;
  --bg-primary: #F8FAFC;
  --text-primary: #0F172A;
  /* ... más variables */
}
```

### Modo oscuro automático:

```css
[data-theme='dark'] {
  --bg-primary: #090D16;
  --text-primary: #F8FAFC;
  /* ... más variables */
}
```

---

Esta guía cubre todos los componentes premium implementados. Úsala como referencia para mantener consistencia en el desarrollo.
