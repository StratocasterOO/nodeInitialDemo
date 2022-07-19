const express = require('express')
const router = express.Router()

// POST /players: crea un jugador/a.
router.post( '/', createUser )

// PUT /players/{id}: modifica el nom del jugador/a.
router.put( '/:id', modifyUser )

// GET /players: retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.
router.get( '/', listAllPlayers )

// POST /games/{id}: un jugador/a específic realitza una tirada.
router.post( '/:id/games', playGame )

// DELETE /games/{id}: elimina les tirades del jugador/a.
router.delete( '/:id/games', deleteGame )

// GET /games/{id}: retorna el llistat de jugades per un jugador/a.
router.get( '/:id/games', listGamesPlayer)

// GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits
router.get( '/ranking', rankingPlayers )

// GET el percentatge d’èxits mig del conjunt de tots els jugadors/es.
router.get( '/', avgSuccessRatePlayers )

// GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
router.get( '/ranking/loser', looser )

// GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.
router.get( '/ranking/winner', winner )

module.exports = router