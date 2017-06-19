
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('app.html');
    }
};
