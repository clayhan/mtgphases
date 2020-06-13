import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const Wrapper = styled.div`
  width: 50%;
  border: 1px solid black;
  @media (max-width: 768px) {
    transform: ${props => (props.rotate ? 'rotate(180deg)' : 'none')};
  }
`;

const Player = props => {
  const {
    activePlayer,
    btnsToDisplay,
    turnsMap,
    displayPlayerTwoBtns,
    passPriority,
    nextPhase,
    phaseActions,
    rotate,
  } = props;

  const [totalLife, setTotalLife] = useState(20);
  const updateLife = direction => {
    if (direction === 'up') {
      setTotalLife(totalLife + 1);
    } else if (direction === 'down') {
      setTotalLife(totalLife - 1);
    }
  };

  const buttonToDisplay = (btnText, action) => (
    <Button onClick={action}>{btnText}</Button>
  );

  return (
    <Wrapper rotate={rotate}>
      {btnsToDisplay.map(btn => {
        let action = null;
        const isSecondaryPlayer = !activePlayer && displayPlayerTwoBtns;
        const mappedBtn = isSecondaryPlayer ? turnsMap[btn] : btn;

        if (phaseActions[mappedBtn.key]) {
          action = phaseActions[mappedBtn.key].action;
        }
        if (!action) {
          action = activePlayer ? passPriority : nextPhase;
        }

        return (
          <div>
            <div>
              <Button onClick={() => updateLife('down')}>
                <ArrowDownwardIcon />
              </Button>
              {totalLife}
              <Button onClick={() => updateLife('up')}>
                <ArrowUpwardIcon />
              </Button>
            </div>
            {/* Button */}
            {activePlayer && !displayPlayerTwoBtns
              ? buttonToDisplay(btn.label, action)
              : null}
            {!activePlayer && displayPlayerTwoBtns
              ? buttonToDisplay(turnsMap[btn].label, action)
              : null}
            {/* End of Button */}
            <div>Text</div>
            <div>{activePlayer ? mappedBtn.text : null}</div>
          </div>
        );
      })}
    </Wrapper>
  );
};

Player.propTypes = {
  activePlayer: PropTypes.bool,
  btnsToDisplay: PropTypes.array,
  turnsMap: PropTypes.object,
  displayPlayerTwoBtns: PropTypes.bool,
  passPriority: PropTypes.func,
  nextPhase: PropTypes.func,
  phaseActions: PropTypes.func,
  rotate: PropTypes.bool,
};

export default Player;
