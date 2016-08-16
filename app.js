'use strict'

const 
	path 		= require('path'),
	koa 		= require('koa'),
	app 		= module.exports = koa(),
	serve 	= require('koa-static');

app.use(serve('.'));

if (!module.parent) app.listen(3000);

app.on('error', (err, ctx) => log.error('Server error', err, ctx));
