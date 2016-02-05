/**
 * a store (similar to the flux model)
 * @type {{list: Array, register: Function, update: Function}}
 */
module.exports = {
    list: [],
    register: function (o) {
        console.log("register " + o);
        this.list.push(o);
    },
    /**
     *
     * @param data the data to be updated
     */
    update: function (data) {
        var i;
        for (i in this.list) {
            this.list[i].change(data);
        }
    },
    has: function (object) {
        var i;
        for (i in this.list) {
            if (this.list[i] == object) return true;
        }
        return false;
    }

};
