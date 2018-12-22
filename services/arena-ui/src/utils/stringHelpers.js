const getWordStartingAtIndex = (text, index) => {
    const spaceIndex = text.indexOf(' ', index);
    
    if (spaceIndex !== -1) {
        return text.slice(index, spaceIndex)
    }

    return text.slice(index)
}

export {
    getWordStartingAtIndex,
}