function encodeUrlStr(string){
    // replace spaces and apostrophes with url-safe strings
    return string.replace(/\s/g, '%20').replace(/'/g, '%27');
}

export default encodeUrlStr;

