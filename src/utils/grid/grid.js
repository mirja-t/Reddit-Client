
const cardConfig = {}

const getCols = (el, obj) => {
    return Math.round(el.offsetWidth / obj[0].width); 
}

const getCardAmount = obj => Object.keys(obj).length;

const getRowHeights = (el, obj) => {
    const cols = getCols(el, obj);
    const cardsAmount = getCardAmount(obj);
    const rows = Math.ceil(cardsAmount / cols );
    let cardsArr = [];
    
    for(let row = 0; row < rows; row++) {
        cardsArr[row] = [];
    }
    for(let card = 0; card < cardsAmount; card++) {
        cardsArr[Math.floor(card / cols)].push(obj[card].height);
    }

    cardsArr = cardsArr.map(arr => Math.max(...arr));
    return cardsArr;
}
const setOffsets = (el, obj) => {
    const offsets = [];
    const cols = getCols(el, obj);
    const rowHeights = getRowHeights(el, obj)
    const cardsAmount = getCardAmount(obj);
    
    for(let i = 0; i < cardsAmount; i++){
        const rowHeight = rowHeights[Math.floor(i / cols)];
        const prevEl = i - cols;
        const offset = rowHeight - obj[i].height;
        offsets.push(offset);
        if( prevEl >= 0 ) offsets[i] += offsets[prevEl];
    }
    for(let col = 0; col < cols; col++){
        offsets.unshift(0);
    }
    return offsets
}

const setTranslationValues = (el, obj) => {
    const offsets = setOffsets(el, obj);
    offsets.forEach((offset, index) => {
        cardConfig[index] = { translateY: offset };
    })
}
export const setHeight = (el, obj) => {
    const offsets = setOffsets(el, obj);
    const cols = getCols(el, obj);
    const colheights = [];
    offsets.forEach((offset, index) => {
        const prevOffset = index - cols >=0 ? offsets[index-cols] : 0;
        colheights[index % cols] = offset + prevOffset;
    });
    return Math.max(...colheights);
}
export const initGrid = (el, obj) => {
    /* Set card translation for masonry layout */
    setTranslationValues(el, obj);
    console.log(cardConfig[3]);
    return cardConfig;
}