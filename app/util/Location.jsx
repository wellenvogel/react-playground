/**
 * Created by andreas on 09.02.16.
 * adapted from https://github.com/kriasoft/react-starter-kit/blob/master/src/core/Location.js
 */

import createHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';
import assign from 'object-assign'

var location = assign({},useQueries(createHistory)());
/**
 *
 * @param page {string}
 * @param options {object}
 */
location.pushPage=function(page,options){
    this.push({
        pathname: window.location.pathname,
        search: "?"+page,
        state: { page: page , options:options}
    });
};
/**
 *
 * @param page {string}
 * @param options {object}
 */
location.setPage=function(page,options){
    this.replace({
        pathname: window.location.pathname,
        search: "?"+page,
        state: { page: page, options: options }
    });
};


module.exports=location;