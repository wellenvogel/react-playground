/**
 * Created by andreas on 18.02.16.
 */

class Settings{
    constructor(){
        /**
         * the base for fonts
         * @type {number}
         */
        this.fontBase=16;
        this.getFontBase.bind(this);
    }
    getFontBase() { return this.fontBase;}

}

var settings=new Settings();
module.exports=settings;
