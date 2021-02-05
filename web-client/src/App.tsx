import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import '@fontsource/roboto/400.css';

const App: FunctionComponent = () => {
  return (
    <div>
      <h1>Unsocial App</h1>
      <h2>We are in {process.env.NODE_ENV}</h2>
      <Button>My button</Button>
    </div>
  );
};

export default App;
