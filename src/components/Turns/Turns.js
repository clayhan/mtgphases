import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Player from '../Player/Player';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const turnsMap = {
  enterMainOne: {
    key: 'enterMainOne',
    label: 'Enter Main Phase 1',
    text: 'Untap, Upkeep, Draw',
    playerTwoButtons: ['enterMainOne'],
  },
  enterCombat: {
    key: 'enterCombat',
    label: 'Enter Combat Phase',
    playerTwoButtons: ['enterCombatPhase'],
  },
  endCombat: {
    key: 'endCombat',
    label: 'End Combat',
    text: 'Declare Attackers, Declare Blockers',
    playerTwoButtons: ['endCombat'],
  },
  endTurn: {
    key: 'endTurn',
    label: 'End Turn',
    playerTwoButtons: ['passTurn'],
  },
  passTurn: {
    key: 'passTurn',
    label: 'passTurn',
    // action: () => props.setPlayerTurn(!playerTurn),
  },
};

const Turns = props => {
  const { playerTurn } = props;
  const [currentPhase, setCurrentPhase] = useState(turnsMap.enterMainOne);
  // This helps with if the player ends their turn early
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // Array to keep track of the order of turns
  const turnsOrder = [
    turnsMap.enterMainOne,
    turnsMap.enterCombat,
    turnsMap.endCombat,
    turnsMap.endTurn,
    turnsMap.passTurn,
  ];

  const nextTurn = () => {
    setCurrentPhase(turnsMap[currentPhaseIndex + 1]);
    setCurrentPhaseIndex(currentPhaseIndex + 1);
  };

  const endTurn = () => {
    const passTurnStr = turnsMap.passTurn.key;
    for (let i = 0; i < turnsOrder.length; i += 1) {
      if (turnsOrder[i] === passTurnStr) {
        setCurrentPhaseIndex(i);
        setCurrentPhase(passTurnStr);
        break;
      }
    }
  };

  const isActivePlayer = playerTurn === 'player1';
  // We want to put the active player's button(s) in an array in case there are more options
  const activePlayerBtns = [currentPhase];

  return (
    <Wrapper>
      <Player
        activePlayer={isActivePlayer}
        turnsMap={turnsMap}
        btnsToDisplay={
          isActivePlayer ? activePlayerBtns : currentPhase.playerTwoButtons
        }
      />
      <Player
        activePlayer={!isActivePlayer}
        turnsMap={turnsMap}
        btnsToDisplay={
          !isActivePlayer ? activePlayerBtns : currentPhase.playerTwoButtons
        }
      />
    </Wrapper>
  );
};

Turns.propTypes = {
  playerTurn: PropTypes.string,
  // setPlayerTurn: PropTypes.func,
};

export default Turns;
