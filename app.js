'use strict'

const 
	path 		= require('path'),
	koa 		= require('koa'),
	serve 		= require('koa-static'),
	app 		= module.exports = koa(),
	port 		= process.env.PORT || 3000;

app.use(serve('.'));

if (!module.parent) {
	app.listen(port);
	console.log(`Bouncing balls listening on ${port}`);
}

app.on('error', (err, ctx) => log.error('Server error', err, ctx));
