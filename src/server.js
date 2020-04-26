const { createUser } = require('./resources/users/user.db.repository');

const { PORT } = require('./common/config');
const { connectDB } = require('./db/db.client');

const app = require('./app');

connectDB(async () => {
  await createUser({
    name: 'admin',
    login: 'admin',
    password: 'admin'
  });
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
