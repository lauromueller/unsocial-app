import React, { FunctionComponent } from 'react';

const App: FunctionComponent = () => {
  return (
    <div>
      <h1>Unsocial App</h1>
      <h2>We are in {process.env.NODE_ENV}</h2>
    </div>
  );
};

export default App;
