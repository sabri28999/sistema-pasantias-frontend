import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, Alert, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
      anioIngreso: '',
      dni: '',
      cuil: '',
      celular: '',
      localidad: '',
      provincia: '',
      tituloSecundario: '',
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
      anioIngreso: Yup.number().min(1900, 'Año inválido').max(new Date().getFullYear(), 'Año inválido').required('Año de ingreso es requerido'),
      dni: Yup.string().required('DNI es requerido'),
      cuil: Yup.string().required('CUIL es requerido'),
      celular: Yup.string().required('Celular es requerido'),
      localidad: Yup.string().required('Localidad es requerida'),
      provincia: Yup.string().required('Provincia es requerida'),
      tituloSecundario: Yup.string().required('Título secundario es requerido'),
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
          anioIngreso: values.anioIngreso,
          dni: values.dni,
          cuil: values.cuil,
          celular: values.celular,
          localidad: values.localidad,
          provincia: values.provincia,
          tituloSecundario: values.tituloSecundario,
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
              <FormControl fullWidth margin="normal">
                <InputLabel id="carrera-label">Carrera</InputLabel>
                <Select
                  labelId="carrera-label"
                  id="carrera"
                  name="carrera"
                  value={formik.values.carrera}
                  label="Carrera"
                  onChange={formik.handleChange}
                  error={formik.touched.carrera && Boolean(formik.errors.carrera)}
                >
                  <MenuItem value="Ing. en Sistemas de Información">Ing. en Sistemas de Información</MenuItem>
                  <MenuItem value="Ing. Electromecánica">Ing. Electromecánica</MenuItem>
                  <MenuItem value="Ing. Electrónica">Ing. Electrónica</MenuItem>
                  <MenuItem value="Ing. Química">Ing. Química</MenuItem>
                  <MenuItem value="Ing. Industrial">Ing. Industrial</MenuItem>
                  <MenuItem value="Tec. en Programación">Tec. en Programación</MenuItem>
                  <MenuItem value="Lic. en Administración Rural">Lic. en Administración Rural</MenuItem>
                </Select>
                {formik.touched.carrera && formik.errors.carrera && (
                  <Typography color="error" variant="caption">{formik.errors.carrera}</Typography>
                )}
              </FormControl>
              <TextField
                fullWidth
                id="anioCursada"
                name="anioCursada"
                label="Año de cursada"
                type="number"
                value={formik.values.anioCursada}
                onChange={e => {
                  const value = Math.max(1, Number(e.target.value));
                  formik.setFieldValue('anioCursada', value);
                }}
                error={formik.touched.anioCursada && Boolean(formik.errors.anioCursada)}
                helperText={formik.touched.anioCursada && formik.errors.anioCursada}
                margin="normal"
                variant="outlined"
                inputProps={{ min: 1, max: 6 }}
              />
              <TextField
                fullWidth
                id="anioIngreso"
                name="anioIngreso"
                label="Año de ingreso"
                type="number"
                value={formik.values.anioIngreso}
                onChange={formik.handleChange}
                error={formik.touched.anioIngreso && Boolean(formik.errors.anioIngreso)}
                helperText={formik.touched.anioIngreso && formik.errors.anioIngreso}
                margin="normal"
                variant="outlined"
                inputProps={{ min: 1900, max: new Date().getFullYear() }}
              />
              <TextField
                fullWidth
                id="dni"
                name="dni"
                label="DNI"
                value={formik.values.dni}
                onChange={formik.handleChange}
                error={formik.touched.dni && Boolean(formik.errors.dni)}
                helperText={formik.touched.dni && formik.errors.dni}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="cuil"
                name="cuil"
                label="CUIL"
                value={formik.values.cuil}
                onChange={formik.handleChange}
                error={formik.touched.cuil && Boolean(formik.errors.cuil)}
                helperText={formik.touched.cuil && formik.errors.cuil}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="celular"
                name="celular"
                label="Celular"
                value={formik.values.celular}
                onChange={formik.handleChange}
                error={formik.touched.celular && Boolean(formik.errors.celular)}
                helperText={formik.touched.celular && formik.errors.celular}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="localidad"
                name="localidad"
                label="Localidad"
                value={formik.values.localidad}
                onChange={formik.handleChange}
                error={formik.touched.localidad && Boolean(formik.errors.localidad)}
                helperText={formik.touched.localidad && formik.errors.localidad}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="provincia"
                name="provincia"
                label="Provincia"
                value={formik.values.provincia}
                onChange={formik.handleChange}
                error={formik.touched.provincia && Boolean(formik.errors.provincia)}
                helperText={formik.touched.provincia && formik.errors.provincia}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="tituloSecundario"
                name="tituloSecundario"
                label="Título secundario"
                value={formik.values.tituloSecundario}
                onChange={formik.handleChange}
                error={formik.touched.tituloSecundario && Boolean(formik.errors.tituloSecundario)}
                helperText={formik.touched.tituloSecundario && formik.errors.tituloSecundario}
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