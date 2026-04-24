import React, { createContext, useState, useContext } from 'react';

const CropContext = createContext();

export const CropProvider = ({ children }) => {
    const [recommendationData, setRecommendationData] = useState({
        recommendations: [],
        values: {
            N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: ""
        },
        city: ""
    });

    const updateRecommendationData = (newData) => {
        setRecommendationData(prev => ({
            ...prev,
            ...newData
        }));
    };

    return (
        <CropContext.Provider value={{ recommendationData, updateRecommendationData }}>
            {children}
        </CropContext.Provider>
    );
};

export const useCrop = () => {
    const context = useContext(CropContext);
    if (!context) {
        throw new Error('useCrop must be used within a CropProvider');
    }
    return context;
};
