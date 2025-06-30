import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
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
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 700 }}>
            Bienvenido al Sistema de Pasantías
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Conectamos estudiantes con oportunidades de pasantías en empresas líderes
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/register/student"
              sx={{ fontWeight: 600 }}
            >
              Soy Estudiante
            </Button>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/register/company"
              sx={{ fontWeight: 600 }}
            >
              Soy Empresa
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;