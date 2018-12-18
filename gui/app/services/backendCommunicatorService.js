"use strict";

(function() {

    /*
        This service is the new way to communicate to the backend.
        It ensures we do not cause a memory leak by registering the same listener for an event on ipcRenderer
    */

    angular
        .module("firebotApp")
        .factory("backendCommunicatorService", function($rootScope, listenerService, logger, $q) {

            const uuidv1 = require("uuid/v1");

            let service = {};

            const knownEvents = new Set();

            let listeners = {};

            function registerEventWithElectron(eventName) {
                knownEvents.add(eventName);

                return (function(name) {
                    ipcRenderer.on(name, function(_, data) {
                        let eventListeners = listeners[name];
                        for (let listener of eventListeners) {
                            $q.resolve(true, () => listener.callback(data));
                        }
                    });
                }(eventName));
            }

            service.on = function(eventName, callback) {

                if (typeof callback !== "function") {
                    throw new Error("Can't register an event without a callback.");
                }

                let id = uuidv1(),
                    event = {
                        id: id,
                        callback: callback
                    };


                if (listeners.hasOwnProperty(eventName)) {
                    listeners[eventName].push(event);
                } else {
                    listeners[eventName] = [event];
                    registerEventWithElectron(eventName);
                }

                return id;
            };

            service.fireEventAsync = function(request) {
                return new Promise(resolve => {
                    ipcRenderer.send(request.type, request.data);
                    ipcRenderer.once(request.type + ":reply", (_, data) => {
                        resolve(data);
                    });
                });
            };

            service.fireEventSync = function(type, data) {
                console.log("firing sync event " + type);
                return ipcRenderer.sendSync(type, data);
            };

            service.fireEvent = function(type, data) {
                console.log("sending event " + type);
                ipcRenderer.send(type, data);
            };

            return service;
        });
}());
