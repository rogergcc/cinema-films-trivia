const playerLeaderboardService = require('../service/playerLeaderboardService');
const constants = require('../constants');

module.exports.createPlayer = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {

    const playerExisting = await playerLeaderboardService.checkPlayerAlreadyExisting(req.body.playerId);
    
    //if PLAYER ID name already exists
    if(playerExisting){

      const responseFromService = await playerLeaderboardService.updatePlayer({
        id: playerExisting._id,
        updateInfo: req.body
      });
      
      response.status = 200;
      response.message = 'Points updated';
      response.body = responseFromService;

      return res.status(response.status).send(response);
    }
    //IF is a new product
    const responseFromService = await playerLeaderboardService.createPlayer(req.body);
    response.status = 200;
    response.message = 'Points Created';
    response.body = responseFromService;

  } catch (error) {
    console.log('Something went wrong: Controller: createPlayer', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.getAllPlayers = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await playerLeaderboardService.getAllPlayers(req.query);

    response.body = responseFromService;

    if (responseFromService.docs.length==0) {
      response.message='No Content';
      response.status=200;
    }else{
      response.message=constants.playerMessage.PLAYER_FETCHED;
      response.status=200;
    }
    response.totalDocsCurrentPage=responseFromService.docs.length;


  } catch (error) {
    console.log('Something went wrong: Controller: getAllPlayers', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.getPlayerById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await playerLeaderboardService.getPlayerById(req.params);
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: getPlayerById', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.updatePlayer = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await playerLeaderboardService.updatePlayer({
      id: req.params.id,
      updateInfo: req.body
    });
    response.status = 200;
    response.message = constants.playerMessage.PLAYER_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: updatePlayer', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}


