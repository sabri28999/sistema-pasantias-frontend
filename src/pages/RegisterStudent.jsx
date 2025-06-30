import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, Alert, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterStudent = () => {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      fechaNacimiento: '',
      legajo: '',
      carrera: '',
      anioCursada: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('Nombre es requerido'),
      apellido: Yup.string().required('Apellido es requerido'),
      email: Yup.string().email('Email inválido').required('Email es requerido'),
      fechaNacimiento: Yup.date().required('Fecha de nacimiento es requerida'),
      legajo: Yup.string().required('Legajo es requerido'),
      carrera: Yup.string().required('Carrera es requerida'),
      anioCursada: Yup.number().min(1, 'Año debe ser al menos 1').required('Año de cursada es requerido'),
      password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Confirmar contraseña es requerido')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/register/student', {
          nombre: values.nombre,
          apellido: values.apellido,
          email: values.email,
          fechaNacimiento: values.fechaNacimiento,
          legajo: values.legajo,
          carrera: values.carrera,
          anioCursada: values.anioCursada,
          password: values.password
        });
        
        setVerificationCode(response.data.verificationCode);
        setSuccess('Registro exitoso. Por favor verifica tu email.');
        setStep(2);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al registrar estudiante');
      }
    }
  });

  const handleVerification = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/verify/student', {
        email: formik.values.email,
        verificationCode: verificationCode
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al verificar código');
    }
  };

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
            Registro de Estudiante
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {step === 1 ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="nombre"
                name="nombre"
                label="Nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="apellido"
                name="apellido"
                label="Apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                helperText={formik.touched.apellido && formik.errors.apellido}
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
                id="fechaNacimiento"
                name="fechaNacimiento"
                label="Fecha de nacimiento"
                type="date"
                value={formik.values.fechaNacimiento}
                onChange={formik.handleChange}
                error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                id="legajo"
                name="legajo"
                label="Legajo"
                value={formik.values.legajo}
                onChange={formik.handleChange}
                error={formik.touched.legajo && Boolean(formik.errors.legajo)}
                helperText={formik.touched.legajo && formik.errors.legajo}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="carrera"
                name="carrera"
                label="Carrera"
                value={formik.values.carrera}
                onChange={formik.handleChange}
                error={formik.touched.carrera && Boolean(formik.errors.carrera)}
                helperText={formik.touched.carrera && formik.errors.carrera}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="anioCursada"
                name="anioCursada"
                label="Año de cursada"
                type="number"
                value={formik.values.anioCursada}
                onChange={formik.handleChange}
                error={formik.touched.anioCursada && Boolean(formik.errors.anioCursada)}
                helperText={formik.touched.anioCursada && formik.errors.anioCursada}
                margin="normal"
                variant="outlined"
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
              />
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
          ) : (
            <Box>
              <Typography variant="body1" gutterBottom>
                Ingresa el código de verificación que fue enviado a tu email.
              </Typography>
              <TextField
                fullWidth
                label="Código de verificación"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 600, fontSize: '1.1rem' }}
                onClick={handleVerification}
              >
                Verificar
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterStudent;