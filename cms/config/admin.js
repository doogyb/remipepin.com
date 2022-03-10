module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'bbe0a12c8fa7d0f95e9281740c31495d'),
  },
});
