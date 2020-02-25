import express from 'express';
import account from './account';
import volunteers from './volunteers';
import admin from './admin';
import schoolPersonnels from './school-personnels';
import school from './school';
import teams from './teams';

const router = new express.Router();

router.use('/account', account.router);
router.use('/volunteers', volunteers.router);
router.use('/admin', admin.router);
router.use('/school-personnels', schoolPersonnels.router);
router.use('/school', school.router);
router.use('/team', teams.router);

router.all('*', (req, res) => {
	res.status(400).json({
		Error: 'Invalid resource',
	});
});

export default router;