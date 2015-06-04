/*jslint nomen: true*/
/*global module,require,localStorage,window */

var pubSub = require('./pub-sub').create();
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

window.localPubSub = module.exports;