import express from 'express';

const router = new express.Router();

router.all('*', (req, res) => {
	res.status(400).json({
		error: 'invalid resource',
	});
});

export default router;