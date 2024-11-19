module.exports = {
  apps: [
    {
      name: 'todo-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      watch: false,
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'todo-backend',
      script: 'npm',
      args: 'run dev',
      cwd: './server',
      watch: false,
      env: {
        PORT: 3001,
        NODE_ENV: 'production'
      }
    }
  ]
};
