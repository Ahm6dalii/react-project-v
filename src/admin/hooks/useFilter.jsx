import { useState } from 'react';

const useFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedFreeOrPaid, setSelectedFreeOrPaid] = useState('');

    const handleCategoryChange = (e) => {
        console.log('Category Change:', e.target.value);
        setSelectedCategory(e.target.value);
    };

    const handleSortChange = (e) => {
        console.log('Sort Change:', e.target.value);
        setSelectedSort(e.target.value);
    };

    const handleFreeOrPaidChange = (e) => {
        console.log('FreeOrPaid Change:', e.target.value);
        setSelectedFreeOrPaid(e.target.value);
    };


    return {
        handleFreeOrPaidChange,
        handleSortChange,
        handleCategoryChange,
        selectedFreeOrPaid,
        selectedSort,
        selectedCategory
    };
};

export default useFilter;
