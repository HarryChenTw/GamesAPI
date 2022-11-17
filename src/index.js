const config = require('./config/config');
const app = require('./config/express');

if (!module.parent) {
    app.listen(config.port, () => {
        console.log(`server started on port http://127.0.0.1:${config.port} (${config.env})`);
    });
}
