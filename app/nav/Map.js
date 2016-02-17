/**
 * Created by andreas on 16.02.16.
 */
'use strict';

var ol=require('openlayers');

/**
 *
 * @param options
 * @returns {{olmap: null, defaultDiv: null, isVisbible: boolean, init: init, renderTo: renderTo, render: render,zoom: zoom}}
 * @constructor
 */
class Map {
    constructor() {
        var def = document.createElement("div");
        /**
         *
         * @private
         * @type {ol.Map}
         */
        this.olmap = null;
        /**
         * @private
         * @type {Node}
         */
        this.defaultDiv = def;
        /**
         * type {boolean}
         */
        this.isVisbible = false;
    }

    init() {
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
    }

    /**
     * render the map to this dom
     * @param target {Element}
     */
    renderTo(target) {
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
    }

    /**
     * trigger a map render
     */
    render() {
        if (!this.olmap) return;
        this.olmap.render();
    }

    /**
     * zoom in (value > 0) or out (value < 0) levels
     * @param value
     */
    zoom(value) {
        if (!this.olmap) return;
        this.olmap.getView().setZoom(this.olmap.getView().getZoom() + value);
    }

}
/**
 *
 * @type {Map}
 */
var mapInstance=new Map();

module.exports=mapInstance;
