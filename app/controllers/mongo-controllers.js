const Users = require( '../models/model-mongo' );
const rollDice = require( '../helpers/rollDice' )

const createUser = async (req, res) => {
    const { name } = req.body; 
    
    try {

        const userExistsYet = await Users.find({ name })
        if ( ! userExistsYet.length == 0 ) {
            return res.status( 409 ).json( { message: "User already exists" } );
        }
        
        const user = new Users( { name, } );
        await user.save();
        res.status( 201 ).json({ user: user });

    } catch (err) { res.status( 500 ).json( { error: "Error saving user" } ); }
}

// ---

const modifyUser = async (req, res) => {
    const userId = req.params.id;
    const { name } = req.body;

    try {

        const userExistsYet = await Users.find({ name })
        if ( ! userExistsYet.length == 0 ) {
            return res.status( 409 ).json( { message: "User already exists" } );
        }
        
        const updateUser = await Users.findByIdAndUpdate( userId, { name: name}, { new: true } );
        if( updateUser == null ){
            return res.status( 404 ).json( { message: "User id not found" } );
        }
        res.status( 201 ).json({ user: updateUser });

    } catch (err) { res.status( 500 ).json( { error: "Error updating user" } ); }
}

// ---

const listAllPlayers = async (req, res) => {
    
    try {
        
        const allUsers = await Users.find({},{ name: 1, successRate: 1 });
        res.status( 201 ).json({ users: allUsers });

    } catch (err) { res.status( 500 ).json( { error: "Error showing user" } ); }
}

// ---

const playGame = async (req, res) => {
    const userId = req.params.id;
    const result = rollDice();

    try {

        const userFound = await Users.findbyId( userId )
        if ( ! userFound ) {
            return res.status( 404 ).json( { message: "User not found" } );
        }
        
        userFound.gamesPlayed.push( result );
        userFound.successRate = userFound.successRateResult();
        await userFound.save();
        res.status( 201 ).json({ result });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

const deleteGame = async (req, res) => {
    const userId = req.params.id;

    try {

        const userFound = await Users.findbyId( userId )
        if ( ! userFound ) {
            return res.status( 404 ).json( { message: "User not found" } );
        }
        
        userFound.gamesPlayed = [];
        userFound.successRate = 0;
        await userFound.save();
        res.status( 201 ).json({ message: "Games delete" });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

const listGamesPlayer = async (req, res) => {
    const userId = req.params.id;

    try {

        const userFound = await Users.findbyId( userId )
        if ( ! userFound ) {
            return res.status( 404 ).json( { message: "User not found" } );
        }
        
        res.status( 201 ).json({ gamesPlayed: userFound.gamesPlayed });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

const rankingPlayersAndAverage = async (req, res) => {

    try {

        const userRanking = await Users.find({},{ name: 1, successRate: 1 }.sort({ successRate: -1 }));
        const avgGlobal = await Users.aggregate([{ $group: { _id: '_id', $avg: { $successRate }}}]);
        userRanking.avgGlobal = avgGlobal;
        res.status( 201 ).json({ rankingPlayersAndGlobalAverage: userRanking });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

const looser = async (req, res) => {

    try {

        const userLooser = await Users.find({},{ name: 1, successRate: 1 }.sort({ successRate: 1 }).limit(1));
        
        res.status( 201 ).json({ looser: userLooser });

    } catch (err) { res.status( 500 ).json( { error: err } ); }
}

// ---

const winner = async (req, res) => {

    try {

        const userWinner = await Users.find({},{ name: 1, successRate: 1 }.sort({ successRate: -1 }).limit(1));
        
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