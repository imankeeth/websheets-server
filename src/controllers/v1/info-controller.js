/**
 * Keep Alive controller
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
const keepAlive = (request, reply) => {
    reply.code(200).send('Staying Alive!!');
};

module.exports = { keepAlive };
