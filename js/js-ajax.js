/******************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Steven Jimenez
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *****************************************************************************/

jspyder.extend.fn("ajax", function (js) {
    /**************************************************************************
     * @class jspyder.ajax
     * @extends jspyder
     * 
     * Abstracts AJAX calls for simple use
     * 
     * @param {String} url
     *      The URL to send the command against
     * 
     * @param {Object} data
     *      A data object, if one is necessary, consisting of the information
     *      to send to the server.  If one doesn't exist, then 
     * 
     * @param {Function} fn
     *      The callback function to perform once the AJAX call has completed.
     *************************************************************************/
    function js_ajax(url, data, fn) {
        var ajax = Object.create(js_ajax.fn);
        
        ajax.data = (typeof data === "object" && data ? data : {});
        ajax.url = (typeof url === "string" ? url : ajax.url);
        ajax.fn = (typeof fn === "function" ? fn : ajax.fn);
        
        if (typeof fn === "function") {
            fn.apply(ajax);
        }
        return ajax;
    } 
    
    /**************************************************************************
     * @private
     * Internals for running the AJAX query.
     *************************************************************************/
    function __js_ajax_try(method, url, data, fn) {
        if (!url) { return this; }
             
        var xhttp = new XMLHttpRequest();
            
        xhttp.onreadystatechange = function xhttp_onreadystatechange() {
            if ((this.readyState === 4) && (typeof fn === "function")){
                fn.apply(js, [this]);
            }
            return null;
        };
        
        xhttp.open(method, url, true);
        
        if (!data) { data = {}; }
        if (data.contentType) {
            xhttp.setRequestHeader("Content-Type", data.contentType);
        }
        if (!data.cache) {
            xhttp.setRequestHeader("Cache-Control", "no-cache");
        }
        
        xhttp.send();
        return this;
    };
    
    /**************************************************************************
     * @class jspyder.ajax.fn
     * @extends jspyder.ajax
     * 
     * Prototype for created ajax objects.
     *************************************************************************/
    js_ajax.fn = {
        data: {},
        url: "",
        fn: function () { },
        "get": function (fn) {
            fn = (typeof fn === "function" ? fn : this.fn);
            __js_ajax_try("GET", this.url, this.data, fn || fn);
        },
        "head": function (fn) {
            fn = (typeof fn === "function" ? fn : this.fn);
            __js_ajax_try("HEAD", this.url, this.data, fn);
        },
        "post": function (fn) {
            fn = (typeof fn === "function" ? fn : this.fn);
            __js_ajax_try("POST", this.url, this.data, fn);
        }
    }
    
    return js_ajax;
}, jspyder);
