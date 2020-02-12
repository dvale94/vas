import express from 'express';
import account from './account';
import volunteers from './volunteers';
import admin from './admin';

const router = new express.Router();

router.use('/account', account.router);
router.use('/volunteers', volunteers.router);
router.use('/admin', admin.router);

router.all('*', (req, res) => {
	res.status(400).json({
		Error: 'Invalid resource',
	});
});

export default router;