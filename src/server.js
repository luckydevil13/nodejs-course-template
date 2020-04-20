const { PORT } = require('./common/config');
const { connectDB } = require('./db/db.client');

const app = require('./app');

connectDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
