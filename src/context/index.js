import React from 'react';

const context = React.createContext({
    useApi: false,
    setUseApi: (useApi) => {}
});

export default context;
