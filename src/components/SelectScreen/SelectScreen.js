import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Turns from '../Turns/Turns';
import Roll20 from '../Dice/Roll20/Roll20';

const SelectScreen = () => {
  const [playerTurn, setPlayerTurn] = useState(null);

  const selectPlayer = (
    <div>
      <div>Which player goes first?</div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPlayerTurn('player1')}
      >
        Player 1
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setPlayerTurn('player2')}
      >
        Player 2
      </Button>
      <div>Roll for start!</div>
      <Roll20 />
    </div>
  );

  return playerTurn ? (
    <Turns playerTurn={playerTurn} setPlayerTurn={setPlayerTurn} />
  ) : (
    selectPlayer
  );
};

export default SelectScreen;
