!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.localPubSub=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*jslint nomen: true*/
/*global module,require,localStorage,window */

var pubSub = _dereq_('./pub-sub').create();
var storageKeyPrefix = 'LocalPubSub-';
var storageKeyPrefixLength = storageKeyPrefix.length;

function convertToStorageKey(topic) {
    return storageKeyPrefix + topic;
}

function convertToTopic(storageKey) {
    if (!storageKey) {
        return '';
    }
    return storageKey.slice(storageKeyPrefixLength);
}

function bind(el, eventType, handler) {
    if (el.addEventListener) {
        el.addEventListener(eventType, handler, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + eventType, handler);
    }
}

bind(window, 'storage', function (event) {
    var key = event.key;
    var newValue = event.newValue;
    var topic = convertToTopic(key);

    if (topic !== '' && newValue !== null) {
        pubSub.publish(topic, JSON.parse(localStorage.getItem(key)));
        localStorage.removeItem(key);
    }
});

module.exports = {
    subscribe: function (topic, listener) {
        pubSub.subscribe(topic, listener);
    },
    unsubscribe: function (topic) {
        pubSub.unsubscribe(topic);
    },
    publish: function (topic, info) {
        localStorage.setItem(convertToStorageKey(topic), JSON.stringify(info));
    }
};
},{"./pub-sub":2}],2:[function(_dereq_,module,exports){
/*jslint nomen: true*/
/*global module */
// Modified from David Walsh's pubsub. http://davidwalsh.name/pubsub-javascript

var PubSub = function () {
    this.topics = {};
};

PubSub.prototype.subscribe = function(topic, listener) {
    var me = this;

    // Create the topic's object if not yet created
    if(!me.topics.hasOwnProperty(topic)){
        me.topics[topic] = [];
    }

    // Add the listener to queue
    me.topics[topic].push(listener);
};

PubSub.prototype.unsubscribe = function(topic) {
    delete this.topics[topic];
};

PubSub.prototype.publish = function(topic, info) {
    var me = this;

    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if(!me.topics.hasOwnProperty(topic)){
        return;
    }

    // Cycle through topics queue, fire!
    me.topics[topic].forEach(function(listener) {
        listener(info != undefined ? info : {});
    });
};

module.exports = {
    create: function() {
        return new PubSub();
    }
};
},{}]},{},[1])
(1)
});