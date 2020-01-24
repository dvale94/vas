import express from 'express';
import account from './account';

const router = new express.Router();

router.use('/account', account.router);

router.all('*', (req, res) => {
	res.status(400).json({
		Error: 'Invalid resource',
	});
});

export default router;