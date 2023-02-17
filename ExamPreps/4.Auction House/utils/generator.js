function generateCategory (currCategory) {
    const categories = [
        { key: "Vehicles", label: "Vehicles", selected: false },
        { key: "Real Estate", label: "Real Estate", selected: false },
        { key: "Electronics", label: "Electronics", selected: false },
        { key: "Furniture", label: "Furniture", selected: false },
        { key: "Other", label: "Other", selected: false },
    ];

    const result = categories.map(c => c.key === currCategory ? { ...c, selected: true} : c);
    return result;
}

module.exports = generateCategory;