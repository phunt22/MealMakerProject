import { createContext } from 'react';

const RestrictionsContext = createContext({
    restrictions: [],
    setRestrictions: () => { }
});

export default RestrictionsContext;