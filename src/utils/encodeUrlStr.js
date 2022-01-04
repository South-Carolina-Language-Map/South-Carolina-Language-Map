function encodeUrlStr(obj){
    // take an obj and encode it as a url-safe querystring
    // ex: '?region=upstate&category=native%20american'
    let string = '?'

    for(let key in obj){
        if(string.length > 1){
            string += '&'
        }
        let value = obj[key];
        string += `${key}=${value}`;
    }
    // replace spaces and apostrophes with url-safe strings
    return string.replace(/\s/g, '%20').replace(/'/g, '%27');
}

export default encodeUrlStr;

