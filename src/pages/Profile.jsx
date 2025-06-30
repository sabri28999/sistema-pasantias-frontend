import { Container, Typography, Box, Card, CardContent, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
                  <Typography variant="h5" component="h2">
                    {user.nombre} {user.apellido}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Estudiante
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography>
                    <strong>Carrera:</strong> {user.carrera || 'No especificado'}
                  </Typography>
                  <Typography>
                    <strong>Año de cursada:</strong> {user.anioCursada || 'No especificado'}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h5" component="h2">
                    {user.nombre}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Empresa
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography>
                    <strong>Dirección:</strong> {user.direccion || 'No especificado'}
                  </Typography>
                  <Typography>
                    <strong>Teléfono:</strong> {user.telefono || 'No especificado'}
                  </Typography>
                  <Typography>
                    <strong>Descripción:</strong> {user.descripcion || 'No especificado'}
                  </Typography>
                </>
              )}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate(user.role === 'student' ? '/edit-profile/student' : '/edit-profile/company')}
                >
                  Editar Perfil
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