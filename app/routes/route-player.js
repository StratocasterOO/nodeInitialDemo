const express = require('express');
const { controllersENV } = require('../config/config');
const controllers = require( controllersENV );
const { JWTAuthentication } = require( '../middlewares/JWT-Authentication')
const routerPlayer = express.Router();

// POST /players: crea un jugador/a.
routerPlayer.post( '/players', JWTAuthentication, controllers.createUser )

// PUT /players/{id}: modifica el nom del jugador/a.
routerPlayer.put( '/players/:id', JWTAuthentication, controllers.modifyUser )

// GET /players: retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.
routerPlayer.get( '/players', JWTAuthentication, controllers.listAllPlayers )

// POST /games/{id}: un jugador/a específic realitza una tirada.
routerPlayer.post( '/games/:id', JWTAuthentication, controllers.playGame )

// DELETE /games/{id}: elimina les tirades del jugador/a.
routerPlayer.delete( '/games/:id', JWTAuthentication, controllers.deleteGame )

// GET /games/{id}: retorna el llistat de jugades per un jugador/a.
routerPlayer.get( '/games/:id', JWTAuthentication, controllers.listGamesPlayer)

// GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits
// i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
routerPlayer.get( '/ranking', JWTAuthentication, controllers.rankingPlayersAndAverage )

// GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
routerPlayer.get( '/ranking/loser', JWTAuthentication, controllers.looser )

// GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.
routerPlayer.get( '/ranking/winner', JWTAuthentication, controllers.winner )

module.exports = routerPlayer