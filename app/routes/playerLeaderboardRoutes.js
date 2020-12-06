const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerLeaderboardController');

router.post('/',

 
  playerController.createPlayer
);

router.get('/:id',

  playerController.getPlayerById
);

router.put('/:id',

  
  playerController.updatePlayer
);

router.get('/',
  
  
  playerController.getAllPlayers
);


module.exports = router;