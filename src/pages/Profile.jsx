import { Container, Typography, Box, Card, CardContent, Button, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para obtener el usuario del localStorage
  const getUserFromStorage = () => {
    try {
      const rawUser = localStorage.getItem('user');
      
      if (!rawUser) {
        console.log('No hay datos de usuario en localStorage');
        return null;
      }
      
      const user = JSON.parse(rawUser);
      console.log('Usuario obtenido del localStorage:', user);
      
      // Verificar que tenga al menos email y role
      if (!user.email || !user.role) {
        console.error('Datos de usuario incompletos:', user);
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Si hay error al parsear, limpia el localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    }
  };

  useEffect(() => {
    // Verificar autenticación al montar el componente
    const userData = getUserFromStorage();
    
    if (!userData) {
      navigate('/login', { replace: true });
      return;
    }
    
    setUser(userData);
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    // Escuchar cambios en localStorage (para múltiples pestañas)
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'token') {
        const userData = getUserFromStorage();
        if (!userData) {
          navigate('/login', { replace: true });
        } else {
          setUser(userData);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Si no hay usuario después del loading, no mostrar nada (se redirigirá)
  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, color: '#1976d2' }}>
            Mi Perfil
          </Typography>
          
          <Card sx={{ mt: 3 }}>
            <CardContent>
              {user.role === 'student' ? (
                <>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {user.nombre} {user.apellido}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Estudiante
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Carrera:</strong> {user.carrera || 'No especificado'}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Año de cursada:</strong> {user.anioCursada || 'No especificado'}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {user.nombre}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Empresa
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Dirección:</strong> {user.direccion || 'No especificado'}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Teléfono:</strong> {user.telefono || 'No especificado'}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Descripción:</strong> {user.descripcion || 'No especificado'}
                  </Typography>
                </>
              )}
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate(user.role === 'student' ? '/edit-profile/student' : '/edit-profile/company')}
                >
                  Editar Perfil
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;