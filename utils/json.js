

module.exports = {
    /* check if is json */
    isJson : function (str){
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}
