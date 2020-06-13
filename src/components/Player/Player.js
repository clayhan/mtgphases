import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Wrapper = styled.div``;

const Player = props => {
  const { activePlayer, btnsToDisplay, turnsMap } = props;
  const [totalLife, setTotalLife] = useState(20);

  return (
    <Wrapper>
      {btnsToDisplay.map(btn => (
        <Button>{activePlayer ? btn.label : turnsMap[btn].label}</Button>
      ))}
    </Wrapper>
  );
};

Player.propTypes = {
  activePlayer: PropTypes.bool,
  btnsToDisplay: PropTypes.array,
  turnsMap: PropTypes.object,
};

export default Player;
