/**
 * a store (similar to the flux model)
 * @type {{list: Array, register: Function, update: Function}}
 */
module.exports={
        list: [],
        register: function(o){
            console.log("register "+o);
            this.list.push(o);
        },
        update: function(data){
            var i;
            for( i in this.list){
                this.list[i].setState(data);
            }
        }
};
