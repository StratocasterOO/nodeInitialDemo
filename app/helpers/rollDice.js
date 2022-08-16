const rollDice = () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    
    const gameWon = ( ( dice1 + dice2 ) === 7 ) ? true : false;

    const result = { dice1, dice2, gameWon }

    return result; 
  };
  
  module.exports = rollDice;