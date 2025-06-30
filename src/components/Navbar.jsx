import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-utn.png';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #1976d2 60%, #1565c0 100%)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <img src={logo} alt="Logo UTN" style={{ height: 48, marginRight: 16 }} />
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>
            Sistema de Pasantías
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/register/student">
                Registrarse como Estudiante
              </Button>
              <Button color="inherit" component={Link} to="/register/company">
                Registrarse como Empresa
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Iniciar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Mi Perfil
              </Button>
              <Button 
                color="inherit" 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
              >
                Cerrar Sesión
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;