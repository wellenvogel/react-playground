/**
 * Created by andreas on 16.02.16.
 */


var ol=require('openlayers');

/**
 *
 * @param options
 * @returns {{olmap: null, defaultDiv: null, isVisbible: boolean, init: init, renderTo: renderTo, render: render,zoom: zoom}}
 * @constructor
 */
var Map=function(options){
    var def=document.createElement("div");
    var rt={
        /**
         *
         * @private
         * @type {ol.Map}
         */
        olmap: null,
        /**
         * @private
         * @type {Node}
         */
        defaultDiv: def,
        /**
         * type {boolean}
         */
        isVisbible: false,
        init: function () {
            this.olmap = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    }),
                    //placeLayer
                ],
                view: new ol.View({
                    center: [949282, 6002552],
                    zoom: 4
                })
            });
        },
        /**
         * render the map to this dom
         * @param target {Element}
         */
        renderTo: function (target) {
            if (!this.olmap) return;
            this.isVisbible = target != null ? true : false;
            if (target != null) {
                this.olmap.setTarget(target);
                this.olmap.updateSize();
            }
            else {
                this.olmap.setTarget(this.defaultDiv);
                this.olmap.updateSize();
            }
        },
        /**
         * trigger a map render
         */
        render: function () {
            if (!this.olmap) return;
            this.olmap.render();
        },
        /**
         * zoom in (value > 0) or out (value < 0) levels
         * @param value
         */
        zoom: function(value){
            if (! this.olmap) return;
            this.olmap.getView().setZoom(this.olmap.getView().getZoom()+value);
        }
    };
    return rt;
};
/**
 *
 * @type {Map}
 */
var mapInstance=new Map();

module.exports=mapInstance;
