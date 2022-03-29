module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c14d60cd2994ce519aa6a9e62a0ed05e'),
  },
});
