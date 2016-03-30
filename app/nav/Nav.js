/**
 * Created by andreas on 29.03.2016.
 */
var NavAction=require("../actions/NavAction");

var Nav=function() {
    this.interval = 0;
    var self = this;
    this.start = function () {
        if (this.interval != 0) return;
        this.interval = window.setInterval(function () {
            self.startQuery();
        }, 1000);
    };
    this.stop = function () {
        if (this.interval) window.clearInterval(this.interval);
        this.interval = 0;
    };
    this.startQuery = function () {
        var url = "/viewer/avnav_navi.php";
        var timeout = 900;
        var self = this;
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data, status) {
                if (data['class'] != null && data['class'] == "TPV" &&
                    data.tag != null && data.lon != null && data.lat != null &&
                    data['mode'] != null && data['mode'] >= 1) {
                    self.handleGpsResponse(data, true);
                    console.log("gpsdata: ");
                }
            },
            error: function (status, data, error) {
                console.log("query position error");
            },
            timeout: timeout
        });

    };
    this.handleGpsResponse = function (data) {
        NavAction.fire(data);
    };

};

module.exports=new Nav();

