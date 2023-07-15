import React, { createContext, useState, useEffect } from 'react';

export const SampleContext = createContext();

export const SampleProvider = ({ children }) => {
    const [sampleList, setSampleList] = useState([]);
    
    return (
        <SampleContext.Provider value={{ sampleList, setSampleList }}>
            {children}
        </SampleContext.Provider>
    )
}