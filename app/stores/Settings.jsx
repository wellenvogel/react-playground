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
        /**
         * the button size
         * @type {number}
         */
        this.buttonSize=55;
        this.getFontBase.bind(this);
        this.getButtonSize.bind(this);
    }
    getFontBase() { return this.fontBase;}
    getButtonSize() { return this.buttonSize;}

    addThemeColorClass(cn){
        return cn+ " "
    }

}

var settings=new Settings();
module.exports=settings;
