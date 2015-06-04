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