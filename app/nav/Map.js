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

        this.factor=2;
        this.layer=undefined;
    }
    getLayer(){
        var self=this;
        return new ol.layer.Tile({
            //source: new ol.source.OSM()

            source: new ol.source.XYZ({
                tileUrlFunction: function (coord) {
                    if (!coord) return undefined;
                    var zxy = coord;
                    var z = zxy[0];
                    var x = zxy[1];
                    var y = zxy[2];
                    var inversy = false;
                    y=-y-1;
                    var layerurl="https://c.tile.openstreetmap.org";
                    if (inversy) {
                        y = (1 << z) - y - 1
                    }

                    return layerurl + '/' + z + '/' + x + '/' + y + ".png?f="+self.factor;
                },
                tileSize: 256*self.factor,
                tilePixelRatio: 1/self.factor,



            })
        });
    }
    init() {
        this.layer=this.getLayer();
        var self=this;
        this.olmap = new ol.Map({
            layers: [
                    self.layer
                ],
            view: new ol.View({
                center: [949282, 6002552],
                zoom: 4
            })
        });
    }
    changeScale(scale){
        if (scale <= 0.0001) return;
        this.factor=scale;
        this.olmap.removeLayer(this.layer);
        this.layer=this.getLayer()
        this.olmap.addLayer(this.layer);
        this.olmap.render();
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
