import express from 'express';
import user from './signup';

const router = new express.Router();

router.use('/account', user.router);

router.all('*', (req, res) => {
	res.status(400).json({
		error: 'invalid resource',
	});
});

export default router;