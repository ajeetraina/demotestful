const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to DemoTestFul API! 🚀',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      ides: '/api/ides',
      architecture: '/api/architecture'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'DemoTestFul API'
  });
});

// API endpoint for IDE information
app.get('/api/ides', (req, res) => {
  const ides = [
    {
      name: 'Visual Studio Code',
      languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go'],
      platform: ['Windows', 'macOS', 'Linux'],
      price: 'Free',
      features: ['Extensions', 'IntelliSense', 'Git integration', 'Debugging'],
      rating: 5
    },
    {
      name: 'JetBrains WebStorm',
      languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js'],
      platform: ['Windows', 'macOS', 'Linux'],
      price: '$129/year',
      features: ['Advanced refactoring', 'Smart code completion', 'Built-in tools'],
      rating: 5
    },
    {
      name: 'Sublime Text',
      languages: ['Multiple languages via packages'],
      platform: ['Windows', 'macOS', 'Linux'],
      price: '$99 (one-time)',
      features: ['Fast performance', 'Multiple cursors', 'Command palette'],
      rating: 4
    },
    {
      name: 'Atom',
      languages: ['JavaScript', 'HTML', 'CSS', 'Python'],
      platform: ['Windows', 'macOS', 'Linux'],
      price: 'Free',
      features: ['GitHub integration', 'Package ecosystem', 'Customizable'],
      rating: 3
    },
    {
      name: 'IntelliJ IDEA',
      languages: ['Java', 'Kotlin', 'Scala', 'JavaScript', 'Python'],
      platform: ['Windows', 'macOS', 'Linux'],
      price: '$499/year',
      features: ['Enterprise features', 'Smart coding assistance', 'Framework support'],
      rating: 5
    }
  ];

  res.json({
    success: true,
    data: ides,
    total: ides.length
  });
});

// API endpoint for architecture information
app.get('/api/architecture', (req, res) => {
  res.json({
    success: true,
    data: {
      frontend: {
        framework: 'React',
        stateManagement: 'Redux',
        styling: 'Tailwind CSS'
      },
      backend: {
        runtime: 'Node.js',
        framework: 'Express.js',
        database: 'PostgreSQL',
        cache: 'Redis'
      },
      deployment: {
        containerization: 'Docker',
        orchestration: 'Kubernetes',
        cicd: 'GitHub Actions',
        monitoring: 'Prometheus + Grafana'
      },
      security: {
        authentication: 'JWT',
        authorization: 'RBAC',
        dataEncryption: 'AES-256',
        apiSecurity: 'Rate limiting + CORS'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DemoTestFul server is running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;