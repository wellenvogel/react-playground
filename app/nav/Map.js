/**
 * Created by andreas on 16.02.16.
 */


var ol=require('openlayers');
var Map={
    /**
     */
    olmap: null,
    /**
     * type {boolean}
     */
    isVisbible: false,
    init: function(){
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
    renderTo: function(target){
        if (! this.olmap) return;
        this.isVisbible=target!=null?true:false;
        this.olmap.setTarget(target);
        if (target == null) return;
        this.olmap.updateSize();
    },
    render: function(){
        if (! this.olmap) return;
        this.olmap.render();
    }
};

module.exports=Map;
