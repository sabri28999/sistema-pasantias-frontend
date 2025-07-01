import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, Alert, Link, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'student'
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Email es requerido'),
      password: Yup.string().required('Contraseña es requerida'),
      role: Yup.string().oneOf(['student', 'company'], 'Rol inválido').required('Rol es requerido')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.post('http://localhost:3001/api/auth/login', {
          email: values.email,
          password: values.password,
          role: values.role
        });

        // Debug: Ver qué está devolviendo el servidor
        console.log('Respuesta completa del servidor:', response);
        console.log('response.data:', response.data);
        console.log('response.status:', response.status);

        // Verificar diferentes estructuras posibles de respuesta
        if (response.data) {
          // Caso 1: Estructura esperada { token, user }
          if (response.data.token && response.data.user) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log('Token guardado:', response.data.token);
            console.log('Usuario guardado:', response.data.user);
            navigate('/profile', { replace: true });
            return;
          }
          
          // Caso 2: Usuario directamente en response.data (sin token separado)
          if (response.data.email) {
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log('Usuario guardado (sin token):', response.data);
            navigate('/profile', { replace: true });
            return;
          }
          
          // Caso 3: Success con datos anidados
          if (response.data.success && response.data.data) {
            if (response.data.data.token && response.data.data.user) {
              localStorage.setItem('token', response.data.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.data.user));
              navigate('/profile', { replace: true });
              return;
            }
          }
          
          // Si llegamos aquí, la estructura no es la esperada
          console.error('Estructura de respuesta inesperada:', response.data);
          throw new Error(`Respuesta del servidor inválida. Estructura recibida: ${JSON.stringify(response.data)}`);
        } else {
          throw new Error('No se recibieron datos del servidor');
        }
      } catch (err) {
        console.error('Error de login:', err);
        setError(err.response?.data?.message || 'Error al iniciar sesión');
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    }
  });

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
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, color: '#1976d2' }}>
            Iniciar Sesión
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formik.values.role}
                label="Rol"
                onChange={formik.handleChange}
                disabled={loading}
              >
                <MenuItem value="student">Estudiante</MenuItem>
                <MenuItem value="company">Empresa</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              variant="outlined"
              disabled={loading}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              variant="outlined"
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || formik.isSubmitting}
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 600, fontSize: '1.1rem' }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link href="#" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;