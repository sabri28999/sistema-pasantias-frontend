import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, Alert, Paper, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterCompany = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      descripcion: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('Nombre es requerido'),
      email: Yup.string().email('Email inválido').required('Email es requerido'),
      telefono: Yup.string().required('Teléfono es requerido'),
      direccion: Yup.string().required('Dirección es requerida'),
      descripcion: Yup.string().required('Descripción es requerida')
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:3001/api/auth/register/company', values);
        setSuccess('Registro enviado. La secretaría revisará tu solicitud y te notificará por email cuando sea aprobada.');
        setError('');
        setTimeout(() => navigate('/'), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al registrar empresa');
        setSuccess('');
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
            Registro de Empresa
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {!success && (
            <>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="nombre"
                  name="nombre"
                  label="Nombre de la empresa"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText={formik.touched.nombre && formik.errors.nombre}
                  margin="normal"
                  variant="outlined"
                />
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
                />
                <TextField
                  fullWidth
                  id="direccion"
                  name="direccion"
                  label="Dirección"
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                  helperText={formik.touched.direccion && formik.errors.direccion}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  id="telefono"
                  name="telefono"
                  label="Teléfono"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                  helperText={formik.touched.telefono && formik.errors.telefono}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  id="descripcion"
                  name="descripcion"
                  label="Descripción de la empresa"
                  multiline
                  rows={4}
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                  helperText={formik.touched.descripcion && formik.errors.descripcion}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 600, fontSize: '1.1rem' }}
                >
                  Registrarse
                </Button>
              </form>
              
              <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
                Para completar el registro, también debe llenar el siguiente formulario:
              </Typography>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfmTkzbbJkinozjiAvSP69jp2Pulk8Q00CGdRNwniUurOYX3g/viewform" 
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-block',
                    px: 3,
                    py: 1,
                    backgroundColor: '#4285F4',
                    color: 'white',
                    borderRadius: 2,
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: '#3367D6',
                    }
                  }}
                >
                  Formulario Adicional de Pasantías
                </Link>
              </Box>
              
              <Typography variant="caption" display="block" align="center" sx={{ mt: 1, color: 'text.secondary' }}>
                * Ambos pasos (este formulario y el de Google) son obligatorios para completar el registro.
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterCompany;