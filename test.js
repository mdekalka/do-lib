
var $do = (function(window, document, undefined) {
    'use strict';

    var mainModule;
    var _eventCounter = 0;
    var _eventListeners = {};
    var _elements = {};

    mainModule = {
        _version: '1.0.0',

        // get the DOM elements through the querySelectorAll
        el: function(selector) {
            _elements['selector'] =  document.querySelectorAll(selector);
            return this;
        },
        // add event listener to the element
        on: function(eventType, callback, capture) {
            var array = Array.prototype.slice.call(_elements['selector']);
            var self = this;
            capture = capture || false;

            Array.prototype.forEach.call(array, function(index, value) {
                index.addEventListener(eventType, callback, capture);
            });

            _eventListeners[_eventCounter] = {
                    el: array,
                    event: eventType,
                    callback: callback,
                    capture: capture,
                };
            _eventCounter++;
            return this;
        },
        // remove event listener to the element
        off: function(eventType) {
            for (var key in _eventListeners) {
                if (_eventListeners[key].event = eventType) {
                    var handler = _eventListeners[key];

                    Array.prototype.forEach.call(handler.el, function(index, value) {
                        index.removeEventListener(handler.event, handler.callback, handler.capture);
                    });
                    return this;

                };
            };
        },
        // named-callback listener
        listen: {
            state: {
                watingState: false,
                readyState: true,
            },

            events: {},

            getEvents: function() {
                return this.events
            },

            on: function(event, callback) {
                if ( this.isUnique(event) ) {
                    this.registerEvent(event, callback);
                };
            },

            off: function(event) {
                delete this.events[event];
            },

            fire: function(event) {
                this.events[event + 'event'].state = this.state.readyState;
                this.events[event + 'event'].callback();
            },

            registerEvent: function(event, callback) {
                var self = this;
                var newEvent = {
                    name: event,
                    state: self.state.watingState,
                    callback: callback || function() {}
                };
                this.events[event + 'event'] = newEvent;
            },

            isUnique: function(event) {
                if (Object.keys(this.events).length) {
                    for (var key in this.events) {
                        if (this.events[key][name] === event) {
                            return false;
                        };
                        return true;
                    }
                } else {
                    return true;
                };
                
            }
        }

    };
    return Object.create(mainModule);

})(window, document);


// usage example:
$do.listen.on('initErrorMessage', function() {
    console.log('error message called')
})

$do.listen.on('callSomeFunc', function() {
    console.log('some function was called')
})


$do.el('.container').on('click', function() {
    console.log('clicked');
    $do.listen.fire('initErrorMessage')
}, false)

$do.el('.wrapper').on('click', function() {
    console.log('clicked')
    $do.listen.fire('callSomeFunc')
}, false)

$do.el('.container').off('click')








