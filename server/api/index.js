import express from 'express';
import account from './account';
import volunteers from './volunteers';

const router = new express.Router();

router.use('/account', account.router);
router.use('/volunteers', volunteers.router);

router.all('*', (req, res) => {
	res.status(400).json({
		Error: 'Invalid resource',
	});
});

export default router;