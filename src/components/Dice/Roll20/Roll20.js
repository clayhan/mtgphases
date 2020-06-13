import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const Roll20 = () => {
  const [roll, setRoll] = useState(null);

  const rollDie = () => {
    setRoll(Math.floor(Math.random() * 20) + 1);
  };

  return (
    <div>
      <Button variant="contained" onClick={rollDie}>
        Roll 20
      </Button>
      <div>{roll}</div>
    </div>
  );
};

export default Roll20;
