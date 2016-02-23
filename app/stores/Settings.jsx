/**
 * Created by andreas on 18.02.16.
 */

const ButtonFontFactor=2.33;
const FactorToolbarHeight=56/14;
class Settings{
    constructor(){
        /**
         * the base for fonts
         * @type {number}
         */
        this.fontBase=14;
        /**
         * the button size
         * currently the buttons are 2.33 * their font size
         * @type {number}
         */
        this.buttonSize=60;
        this.getFontBase.bind(this);
        this.getButtonSize.bind(this);
    }
    getFontBase() { return this.fontBase;}
    getButtonSize() { return this.buttonSize;}
    getButtonListWidth() { return this.buttonSize + 0.2 * this.getButtonFontSize();} //we have 0.1em margin
    getButtonFontSize() { return this.buttonSize/ButtonFontFactor;}
    getBottomPanelHeight() { return this.fontBase * 4}
    getToolBarHeight(){ return this.fontBase *FactorToolbarHeight;}
    getToolBarColor(){return "bg-indigo-500";}


    addThemeColorClass(cn){
        return cn+ " "
    }

}

var settings=new Settings();
module.exports=settings;
