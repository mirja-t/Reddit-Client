const formatNumber = (num) => {
    return num > 1000 ? `${ Math.floor(num / 100) / 10 }k`: num
}
const formatDate = (utcSeconds) => {
    const minutes = Math.floor((new Date().getTime() - utcSeconds*1000) / 1000 / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    
    if(days >= 1){
        const str = days > 1 ? 'days' : 'day';
        return `${days} ${str}`;
    }else if (hours >= 1){
        const str = hours > 1 ? 'hours' : 'hour';
        return `${hours} ${str}`;
    }else{
        const str = minutes > 1 ? 'minutes' : 'minute';
        return `${minutes} ${str}`;
    }
}
const shortenTitle = (str, lngth) => {
    if(str.length < lngth) return str;
    
    let words = str.slice().split(' ');
    let strShortened = [];
    let letterCount = 0;
    
    words.forEach(word => {
        if(letterCount > lngth) return;
        letterCount += word.length;
        strShortened.push(word);
    })
    return `${strShortened.join(' ')} ...`;
}

export {
    formatNumber,
    formatDate,
    shortenTitle
}