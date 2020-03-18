/* use this method for check json interity */

module.exports = {
    /* check if is json */
    isJson : function (str){
        try {
            JSON.parse(str);
        } catch (e) {
            //console.log(e)
            return false;
        }
        return true;
    }
}
