import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Paper, CircularProgress, Grid, Button } from '@mui/material';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/internships');
        setInternships(res.data);
      } catch (err) {
        setInternships([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

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
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, color: '#1976d2' }}>
            Puestos de Pasantía Disponibles
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : internships.length === 0 ? (
            <Typography align="center" sx={{ mt: 4 }}>
              No hay puestos disponibles en este momento.
            </Typography>
          ) : (
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {internships.map((internship) => (
                <Grid item xs={12} md={6} key={internship.id}>
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ color: '#1565c0', fontWeight: 600 }}>
                      {internship.titulo || internship.tituloPuesto || 'Puesto sin título'}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Empresa:</strong> {internship.empresaNombre || internship.nombreEmpresa || 'No especificado'}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Descripción:</strong> {internship.descripcion || 'Sin descripción'}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Ubicación:</strong> {internship.ubicacion || 'No especificada'}
                    </Typography>
                    {/* Puedes agregar más campos según tu modelo */}
                    <Button
                      variant="outlined"
                      sx={{ mt: 2 }}
                      // onClick={() => ...} // Aquí puedes navegar al detalle o postularte
                      disabled
                    >
                      Ver Detalle
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Internships;