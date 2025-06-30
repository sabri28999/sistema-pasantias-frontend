import { Container, Typography, Box, Button, Paper, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { School, Business, TrendingUp, Group, Psychology, WorkOutline } from '@mui/icons-material';

const Home = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #ffffff 100%)',
      py: 4,
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: '#1976d2', 
              fontWeight: 800,
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Pasantías Universitarias
          </Typography>
          
          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3,
            mb: 4,
            flexWrap: 'wrap'
          }}>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/register/student"
              startIcon={<School />}
              sx={{ 
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                boxShadow: '0 4px 15px rgba(25, 118, 210, 0.4)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.6)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Soy Estudiante
            </Button>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/register/company"
              startIcon={<Business />}
              sx={{ 
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                boxShadow: '0 4px 15px rgba(46, 125, 50, 0.4)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(46, 125, 50, 0.6)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Soy Empresa
            </Button>
          </Box>
        </Box>

        {/* What are University Internships Section */}
        <Paper 
          elevation={8} 
          sx={{ 
            p: 3, 
            borderRadius: 4, 
            mb: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(25, 118, 210, 0.1)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              color: '#1976d2', 
              fontWeight: 700,
              mb: 2.5,
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '2.4rem' }
            }}
          >
            ¿Qué son las Pasantías Universitarias?
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
            sx={{ 
              textAlign: 'center',
              color: '#424242',
              lineHeight: 1.5,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            Son experiencias prácticas rentadas, las cuales tienen afinidad con las carreras dictadas en UTN.
          </Typography>
        </Paper>

        {/* Objectives Section */}
        <Paper 
          elevation={8} 
          sx={{ 
            p: 3, 
            borderRadius: 4, 
            mb: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(25, 118, 210, 0.1)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              color: '#1976d2', 
              fontWeight: 700,
              mb: 3.5,
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '2.4rem' }
            }}
          >
            Objetivos
          </Typography>
          <Grid container spacing={2.5} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ 
                height: '180px', 
                textAlign: 'center',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
                }
              }}>
                <CardContent sx={{ p: 2.5, width: '100%' }}>
                  <TrendingUp sx={{ fontSize: 42, color: '#1976d2', mb: 2 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#424242', fontSize: '1.05rem', lineHeight: 1.3 }}>
                    Profundizar la valorización del trabajo
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ 
                height: '180px', 
                textAlign: 'center',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
                }
              }}>
                <CardContent sx={{ p: 2.5, width: '100%' }}>
                  <Psychology sx={{ fontSize: 42, color: '#1976d2', mb: 2 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#424242', fontSize: '1.05rem', lineHeight: 1.3 }}>
                    Incorporar saberes, habilidades y aptitudes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Card sx={{ 
                height: '180px', 
                textAlign: 'center',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
                }
              }}>
                <CardContent sx={{ p: 2.5, width: '100%' }}>
                  <Group sx={{ fontSize: 42, color: '#1976d2', mb: 2 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#424242', fontSize: '1.05rem', lineHeight: 1.3 }}>
                    Vínculo entre la institución educativa y organismos o empresas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Benefits Section */}
        <Paper 
          elevation={8} 
          sx={{ 
            p: 3, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(25, 118, 210, 0.1)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              color: '#1976d2', 
              fontWeight: 700,
              mb: 3.5,
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}
          >
            ¿Qué beneficios tiene participar del Programa de Pasantías Universitarias?
          </Typography>
          <Grid container spacing={2.5} sx={{ maxWidth: '950px', margin: '0 auto' }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                p: 2.5,
                borderRadius: 2,
                background: 'rgba(25, 118, 210, 0.05)',
                transition: 'all 0.3s ease',
                minHeight: '80px',
                '&:hover': {
                  background: 'rgba(25, 118, 210, 0.1)',
                  transform: 'translateX(3px)'
                }
              }}>
                <WorkOutline sx={{ color: '#1976d2', mr: 2.5, fontSize: 32, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#424242', lineHeight: 1.4, fontSize: '1.05rem' }}>
                  Aplicación práctica de competencias
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                p: 2.5,
                borderRadius: 2,
                background: 'rgba(25, 118, 210, 0.05)',
                transition: 'all 0.3s ease',
                minHeight: '80px',
                '&:hover': {
                  background: 'rgba(25, 118, 210, 0.1)',
                  transform: 'translateX(3px)'
                }
              }}>
                <School sx={{ color: '#1976d2', mr: 2.5, fontSize: 32, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#424242', lineHeight: 1.4, fontSize: '1.05rem' }}>
                  Conocer el campo específico que le interesa al estudiante
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                p: 2.5,
                borderRadius: 2,
                background: 'rgba(25, 118, 210, 0.05)',
                transition: 'all 0.3s ease',
                minHeight: '80px',
                '&:hover': {
                  background: 'rgba(25, 118, 210, 0.1)',
                  transform: 'translateX(3px)'
                }
              }}>
                <TrendingUp sx={{ color: '#1976d2', mr: 2.5, fontSize: 32, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#424242', lineHeight: 1.4, fontSize: '1.05rem' }}>
                  Facilitar la transición entre la etapa universitaria y laboral
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                p: 2.5,
                borderRadius: 2,
                background: 'rgba(25, 118, 210, 0.05)',
                transition: 'all 0.3s ease',
                minHeight: '80px',
                '&:hover': {
                  background: 'rgba(25, 118, 210, 0.1)',
                  transform: 'translateX(3px)'
                }
              }}>
                <Group sx={{ color: '#1976d2', mr: 2.5, fontSize: 32, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#424242', lineHeight: 1.4, fontSize: '1.05rem' }}>
                  Integración en grupos laborales
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                p: 2.5,
                borderRadius: 2,
                background: 'rgba(25, 118, 210, 0.05)',
                transition: 'all 0.3s ease',
                minHeight: '80px',
                maxWidth: '500px',
                margin: '0 auto',
                '&:hover': {
                  background: 'rgba(25, 118, 210, 0.1)',
                  transform: 'scale(1.02)'
                }
              }}>
                <Psychology sx={{ color: '#1976d2', mr: 2.5, fontSize: 32, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#424242', lineHeight: 1.4, fontSize: '1.05rem' }}>
                  Concientizar sobre los derechos laborales
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;