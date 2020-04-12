require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
const { v1 } = require('./routes');
const fastify = require('fastify')(config.fastify);
const oauthPlugin = require('fastify-oauth2');
const { CovidSheetData } = require('./spreadsheet/covid');

// Export fastify for testing purpose
module.exports = fastify;

(async function() {
    try {
        const dev = process.env.NODE_ENV !== 'production';
        // Connect to DB
        //if (process.env.NODE_ENV !== 'test') {
        //    await mongoose.connect(config.mongodb.url, config.mongodb.options);
        //    fastify.log.info('Mongodb Connected');
        //}

        // Middlewares
        fastify.use(cors());

        // Plugins
        fastify.register(require('fastify-boom'));
        fastify.register(require('fastify-swagger'), config.documentation);
        fastify
            .register(require('fastify-compress'), { threshold: 0 })
            .register(require('fastify-static'), { root: path.join(__dirname, '/public') });

        fastify.register(v1, { prefix: '/v1' });

        // /oauth2callback
        fastify.register(oauthPlugin, {
            name: 'googleOAuth2',
            scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
            credentials: {
                client: {
                    id: process.env.CLIENT_ID,
                    secret: process.env.CLIENT_SECRET,
                },
                auth: oauthPlugin.GOOGLE_CONFIGURATION,
            },
            // register a fastify url to start the redirect flow
            startRedirectPath: '/login/google',
            // facebook redirect here after the user login
            callbackUri: dev ? 'http://localhost:3000/login/google/callback' : 'https://www.websheets.app/login/google/callback',
        });

        // Server
        fastify.get('/login/google/callback', async function(request, reply) {
            const token = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
            // if later you need to refresh the token you can use
            // const newToken = await this.getNewAccessTokenUsingRefreshToken(token.refresh_token)
            CovidSheetData(token);
            reply.redirect('/');
        });

        fastify
            .register(require('fastify-nextjs'), { dev })
            .after(() => {
                fastify.next('/');
                fastify.next('/user/:id', (app, req, reply) => {
                    const userId = req.params.id;
                    // `app` is the Next instance
                    app.render(req.raw, reply.res, `/user/${userId}`, req.query, {})
                });
            });

        await fastify.listen(config.port, '0.0.0.0');
        fastify.swagger();
        fastify.log.info('%s listening in %s environment', config.name, process.env.NODE_ENV);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})();

process.on('unhandledRejection', errorHandler);
process.on('uncaughtException', errorHandler);

function errorHandler(err) {
    fastify.log.error(err);
}
