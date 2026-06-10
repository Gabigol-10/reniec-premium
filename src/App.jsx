import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import NotificationSystem from './components/NotificationSystem';

// Layouts & Pages
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import NotFound from './pages/NotFound';
import LoadingScreen from './components/LoadingScreen';

// Protected Route Guard Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Guard (Redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Access */}
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } 
                />

                {/* Protected Enterprise Dashboard & Management */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<UserManagement />} />
                </Route>

                {/* 404 Page - Outside protected routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Active notifications container overlay */}
              <NotificationSystem />
            </BrowserRouter>
          </UserProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
