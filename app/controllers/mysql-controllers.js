const { Sequelize } = require('sequelize');
const Users = require( '../models/model-users-mysql' );
const Games = require( '../models/model-games-mysql' );
const rollDice = require( '../helpers/rollDice' )

const createUser = async (req, res) => {
    const { name } = req.body; 
    
    try {

        const userExistsYet = await Users.findAll({ where: { name } })
        if ( !userExistsYet.length == 0 ) {
            return res.status( 409 ).json( { message: "User already exists" } );
        }
        
        const user = await Users.create( { name, } );
        
        res.status( 201 ).json({ user: user });

    } catch (err) { res.status( 500 ).json( { error: "Error saving user" } ); }
}

// ---

const modifyUser = async (req, res) => {
    const userId = req.params.id;
    const { name } = req.body;

    try {

        const userExistsYet = await Users.findAll({ where: { name } });
        if ( !userExistsYet.length == 0 ) {
            return res.status( 409 ).json( { message: "User already exists" } );
        }
        
        const updateUser = await Users.findByPk( userId );
        if( !updateUser ){
            return res.status( 404 ).json( { message: "User id not found" } );
        }
        
        updateUser.name = name;
        await updateUser.save();
        
        res.status( 201 ).json({ user: updateUser });

    } catch (err) { res.status( 500 ).json( { error: "Error updating user" } ); }
}

// ---

const listAllPlayers = async (req, res) => {
    
    try {
        
        const allUsers = await Users.findAll({ attributes: [ 'id', 'name', 'successRate' ] });
        res.status( 201 ).json({ users: allUsers });

    } catch (err) { res.status( 500 ).json( { error: "Error showing user" } ); }
}

// ---

const playGame = async (req, res) => {
    const userId = req.params.id;
    const { dice1, dice2, gameWon } = rollDice();

    try {

        const userFound = await Users.findByPk( userId )
        if ( ! userFound ) {
            return res.status( 404 ).json( { message: "User not found" } );
        }
        
        const gamesPlayed = await Games.create( { dice1, dice2, gameWon, userId } );
        successRateResult( userFound );
        res.status( 201 ).json({ gamesPlayed });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

const successRateResult = async( player ) => {

    const totalGames = await Games.count({ where: { userId: player.id }});
    const wonGames = await Games.count({ where: { gameWon: true, userId: player.id }});
    player.successRate = Math.floor ((( wonGames / totalGames ) * 100) * 100 ) / 100;
    await player.save();
    
}

// ---

const deleteGame = async (req, res) => {
    const userId = req.params.id;

    try {

        const userFound = await Users.findByPk( userId )
        if ( ! userFound ) {
            return res.status( 404 ).json( { message: "User not found" } );
        }
        
        await Games.destroy({ where: { userId }})
        userFound.successRate = 0;
        await userFound.save();
        res.status( 201 ).json({ message: "Games delete" });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

const listGamesPlayer = async (req, res) => {
    const userId = req.params.id;

    try {

        const userFound = await Users.findByPk( userId )
        if ( ! userFound ) {
            return res.status( 404 ).json( { message: "User not found" } );
        }
        
        const gamesPlayed = await Games.findAll({ where: { userId } });

        res.status( 201 ).json({ gamesPlayed: gamesPlayed });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

const rankingPlayersAndAverage = async (req, res) => {

    try {

        const userRanking = await Users.findAll({ attributes: [ 'name', 'successRate' ], order: [['successRate', 'DESC']] });
        const avgGlobal = await Users.findAll({ attributes: [[ Sequelize.fn('AVG', Sequelize.col('successRate')), 'avgSuccessRate' ]] });
        
        res.status( 201 ).json({ RankingPlayers: userRanking, GlobalAverage: avgGlobal });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

const looser = async (req, res) => {

    try {

        const userLooser = await Users.findOne({ attributes: [ 'name', 'successRate' ], order: [['successRate', 'ASC']] });
        
        res.status( 201 ).json({ looser: userLooser });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

const winner = async (req, res) => {

    try {

        const userWinner = await Users.findOne({ attributes: [ 'name', 'successRate' ], order: [['successRate', 'DESC']] });
        
        res.status( 201 ).json({ winner: userWinner });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

module.exports = { 
                    createUser, 
                    modifyUser, 
                    listAllPlayers, 
                    playGame, 
                    deleteGame,
                    listGamesPlayer,
                    rankingPlayersAndAverage, 
                    looser,
                    winner
                }