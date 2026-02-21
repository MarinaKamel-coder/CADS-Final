import app from './app.js';

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ CADS Backend opérationnel sur le port ${PORT}`);
  });
}

export default app;