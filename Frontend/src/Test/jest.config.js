module.exports = {
    // Patrones de archivos que Jest debe considerar para las pruebas
    testMatch: ['**/__tests__/**/*.test.js'],
  
    // Directorios que Jest debe ignorar al buscar pruebas
    testPathIgnorePatterns: ['/node_modules/'],
  
    // Transformadores que Jest debe utilizar para transpilar los archivos
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };
  