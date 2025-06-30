import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-utn.png';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #1976d2 60%, #1565c0 100%)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo UTN" style={{ height: 48, marginRight: 16, cursor: 'pointer' }} />
          </Link>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: 700,
              '&:hover': {
                color: 'white',
                textDecoration: 'none'
              }
            }}
          >
            Sistema de Pasantías
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              '&:hover': {
                color: '#90caf9',
                backgroundColor: 'transparent'
              }
            }}
          >
            Inicio
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/internships"
            sx={{
              '&:hover': {
                color: '#90caf9',
                backgroundColor: 'transparent'
              }
            }}
          >
            Puestos
          </Button>
          
          {!user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/register/student"
                sx={{
                  '&:hover': {
                    color: '#90caf9',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Registrarse como Estudiante
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register/company"
                sx={{
                  '&:hover': {
                    color: '#90caf9',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Registrarse como Empresa
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  '&:hover': {
                    color: '#90caf9',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Iniciar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                sx={{
                  '&:hover': {
                    color: '#90caf9',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Mi Perfil
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
                sx={{
                  '&:hover': {
                    color: '#90caf9',
                    backgroundColor: 'transparent'
                  }
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