const db = require('./db/index');

db.sync()
.then(() => require('./server/index'));
