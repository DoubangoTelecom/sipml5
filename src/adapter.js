/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *  Copyright (c) 2014-2016 Doubango Telecom. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
var RTCPeerConnection = null;
var getUserMedia = null;
var attachMediaStream = null;
var drawImage = null;
var reattachMediaStream = null;
var webrtcDetectedBrowser = null;
var webrtcDetectedVersion = null;

window.performance = window.performance || {} ;
window.performance.now = window.performance.now || (function () { var now = Date.now(); return function () { return Date.now() - now; } })();
window.URL = window.URL || window.webkitURL;

function trace(text) {
  // This function is used for logging.
  if (text[text.length - 1] == '\n') {
    text = text.substring(0, text.length - 1);
  }
  console.log((performance.now() / 1000).toFixed(3) + ": " + text);
}
function maybeFixConfiguration(pcConfig) {
  if (!pcConfig) {
    return;
  }
  for (var i = 0; i < pcConfig.iceServers.length; i++) {
    if (pcConfig.iceServers[i].hasOwnProperty('urls')){
      pcConfig.iceServers[i]['url'] = pcConfig.iceServers[i]['urls'];
      delete pcConfig.iceServers[i]['urls'];
    }
  }
}
drawImage = function (context, video, x, y, width, height) {
    context.drawImage(video, x, y, width, height);
}
attachEventListener = function (video, type, listener, useCapture) {
    video.addEventListener(type, listener, useCapture);
}

if (navigator.mozGetUserMedia) {
  console.log("This appears to be Firefox");

  webrtcDetectedBrowser = "firefox";

  webrtcDetectedVersion =
           parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);

  // The RTCPeerConnection object.
  var RTCPeerConnection = function(pcConfig, pcConstraints) {
    // .urls is not supported in FF yet.
    maybeFixConfiguration(pcConfig);
    return new mozRTCPeerConnection(pcConfig, pcConstraints);
  }

  // The RTCSessionDescription object.
  RTCSessionDescription = mozRTCSessionDescription;

  // The RTCIceCandidate object.
  RTCIceCandidate = mozRTCIceCandidate;

  // Get UserMedia (only difference is the prefix).
  // Code from Adam Barth.
  getUserMedia = navigator.mozGetUserMedia.bind(navigator);
  navigator.getUserMedia = getUserMedia;

  // Creates iceServer from the url for FF.
  createIceServer = function(url, username, password) {
    var iceServer = null;
    var url_parts = url.split(':');
    if (url_parts[0].indexOf('stun') === 0) {
      // Create iceServer with stun url.
      iceServer = { 'url': url };
    } else if (url_parts[0].indexOf('turn') === 0) {
      if (webrtcDetectedVersion < 27) {
        // Create iceServer with turn url.
        // Ignore the transport parameter from TURN url for FF version <=27.
        var turn_url_parts = url.split("?");
        // Return null for createIceServer if transport=tcp.
        if (turn_url_parts.length === 1 ||
            turn_url_parts[1].indexOf('transport=udp') === 0) {
          iceServer = {'url': turn_url_parts[0],
                       'credential': password,
                       'username': username};
        }
      } else {
        // FF 27 and above supports transport parameters in TURN url,
        // So passing in the full url to create iceServer.
        iceServer = {'url': url,
                     'credential': password,
                     'username': username};
      }
    }
    return iceServer;
  };

  createIceServers = function(urls, username, password) {
    var iceServers = [];
    // Use .url for FireFox.
    for (i = 0; i < urls.length; i++) {
      var iceServer = createIceServer(urls[i],
                                      username,
                                      password);
      if (iceServer !== null) {
        iceServers.push(iceServer);
      }
    }
    return iceServers;
  }

  // Attach a media stream to an element.
  attachMediaStream = function(element, stream) {
    console.log("Attaching media stream");
    if (typeof element.srcObject !== 'undefined') {
        element.srcObject = stream;
    }
    else {
        element.mozSrcObject = stream;
    }
    element.play();
    return element;
  };

  reattachMediaStream = function(to, from) {
    console.log("Reattaching media stream");
    if (typeof to.srcObject !== 'undefined') {
        to.srcObject = from.srcObject;
    }
    else {
        to.mozSrcObject = from.mozSrcObject;
    }
    to.play();
  };

} else if (navigator.webkitGetUserMedia) {
  console.log("This appears to be Chrome");

  webrtcDetectedBrowser = "chrome";
  // Temporary fix until crbug/374263 is fixed.
  // Setting Chrome version to 999, if version is unavailable.
  var result = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
  if (result !== null) {
    webrtcDetectedVersion = parseInt(result[2], 10);
  } else {
    webrtcDetectedVersion = 999;
  }

  // Creates iceServer from the url for Chrome M33 and earlier.
  createIceServer = function(url, username, password) {
    var iceServer = null;
    var url_parts = url.split(':');
    if (url_parts[0].indexOf('stun') === 0) {
      // Create iceServer with stun url.
      iceServer = { 'url': url };
    } else if (url_parts[0].indexOf('turn') === 0) {
      // Chrome M28 & above uses below TURN format.
      iceServer = {'url': url,
                   'credential': password,
                   'username': username};
    }
    return iceServer;
  };

  // Creates iceServers from the urls for Chrome M34 and above.
  createIceServers = function(urls, username, password) {
    var iceServers = [];
    if (webrtcDetectedVersion >= 34) {
      // .urls is supported since Chrome M34.
      iceServers = {'urls': urls,
                    'credential': password,
                    'username': username };
    } else {
      for (i = 0; i < urls.length; i++) {
        var iceServer = createIceServer(urls[i],
                                        username,
                                        password);
        if (iceServer !== null) {
          iceServers.push(iceServer);
        }
      }
    }
    return iceServers;
  };

  // The RTCPeerConnection object.
  var RTCPeerConnection = function(pcConfig, pcConstraints) {
    // .urls is supported since Chrome M34.
    if (webrtcDetectedVersion < 34) {
      maybeFixConfiguration(pcConfig);
    }
    return new webkitRTCPeerConnection(pcConfig, pcConstraints);
  }

  // Get UserMedia (only difference is the prefix).
  // Code from Adam Barth.
  getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
  navigator.getUserMedia = getUserMedia;

  // Attach a media stream to an element.
  attachMediaStream = function(element, stream) {
    if (typeof element.srcObject !== 'undefined') {
      element.srcObject = stream;
    } else if (typeof element.mozSrcObject !== 'undefined') {
      element.mozSrcObject = stream;
    } else if (typeof element.src !== 'undefined') {
        if (stream) {
            element.src = URL.createObjectURL(stream);
        }
        else if (element.src && typeof URL.revokeObjectURL !== 'undefined') {
            // createObjectURL(null) -> Failed to execute 'createObjectURL' on 'URL': No function was found that matched the signature provided.
            URL.revokeObjectURL(element.src);
            element.src = null;
        }
    } else {
      console.log('Error attaching stream to element.');
    }
    return element;
  };

  reattachMediaStream = function(to, from) {
    to.src = from.src;
  };
} else {
    var console = console || {
        "log": function(msg) {}
    };
    var createIceServer = function (url, username, password) {
        var url_parts = url.split(':');
        if (url_parts[0].indexOf('stun') === 0) {
            return { 'url': url };
        } else if (url_parts[0].indexOf('turn') === 0) {
            return {
                'url': url,
                'credential': password,
                'username': username
            };
        }
        return null;
    };
    var extractPluginObj = function (elt) {
        return elt.isWebRtcPlugin ? elt : elt.pluginObj;
    }
    var attachEventListener = function (elt, type, listener, useCapture) {
        var _pluginObj = extractPluginObj(elt);
        if (_pluginObj) {
            _pluginObj.bindEventListener(type, listener, useCapture);
        }
        else {
            if (typeof elt.addEventListener !== "undefined") {
                elt.addEventListener(type, listener, useCapture);
            }
            else if (typeof elt.addEvent !== "undefined") {
                elt.addEventListener("on" + type, listener, useCapture);
            }
        }
    }
    function getPlugin() {
        return document.getElementById('WebrtcEverywherePluginId');
    }
    
    var installPlugin = function () {
        if (document.getElementById("WebrtcEverywherePluginId")) {
            return;
        }
        console.log("installPlugin() called");
        var isInternetExplorer = !!((Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) || ("ActiveXObject" in window));
        var isSafari = !!navigator.userAgent.indexOf('Safari');

        var pluginObj = document.createElement('object');
        if (isInternetExplorer) {
            pluginObj.setAttribute('classid', 'CLSID:7FD49E23-C8D7-4C4F-93A1-F7EACFA1EC53');
            isInternetExplorer = true;
        } else {
            pluginObj.setAttribute('type', 'application/webrtc-everywhere');
        }
        pluginObj.setAttribute('id', 'WebrtcEverywherePluginId');
        document.body.appendChild(pluginObj);
        pluginObj.setAttribute('width', '0');
        pluginObj.setAttribute('height', '0');

        if (pluginObj.isWebRtcPlugin || (typeof navigator.plugins !== "undefined" && (!!navigator.plugins["WebRTC Everywhere"] || navigator.plugins["WebRTC Everywhere Plug-in for Safari"]))) {
            console.log("Plugin version: " + pluginObj.versionName + ", adapter version: 1.3.1");
            if (isInternetExplorer) {
                console.log("This appears to be Internet Explorer");
                webrtcDetectedBrowser = "Internet Explorer";
            }
            else if (isSafari) {
                console.log("This appears to be Safari");
                webrtcDetectedBrowser = "Safari";
            }
            else; // any other NAPAPI-capable browser comes here
        }
        else {
            console.log("Browser does not appear to be WebRTC-capable");
        }
    } // end-of-installPlugin()

    if (document.body) {
        installPlugin();
    }
    else {
        attachEventListener(window, "load", function () {
            console.log("onload");
            installPlugin();
        });
        attachEventListener(document, "readystatechange", function () {
            console.log("onreadystatechange:" + document.readyState);
            if (document.readyState == "complete") {
                installPlugin();
            }
        });
    }

    var getUserMediaDelayed;
    getUserMedia = navigator.getUserMedia = function (constraints, successCallback, errorCallback) {
        if (document.readyState !== "complete") {
            console.log("readyState = " + document.readyState + ", delaying getUserMedia...");
            if (!getUserMediaDelayed) {
                getUserMediaDelayed = true;
                attachEventListener(document, "readystatechange", function () {
                    if (getUserMediaDelayed && document.readyState == "complete") {
                        getUserMediaDelayed = false;
                        getPlugin().getUserMedia(constraints, successCallback, errorCallback);
                    }
                });
            }
        }
        else {
            getPlugin().getUserMedia(constraints, successCallback, errorCallback);
        }
    }

    attachMediaStream = function(element, stream) {
        console.log("Attaching media stream");
        if (!element) {
            return null;
        }
        if (element.isWebRtcPlugin) {
            element.src = stream;
            return element;
        }
        else if (element.nodeName.toLowerCase() === 'video') {
            if (!element.pluginObj && stream) {
                var _pluginObj = document.createElement('object');
                var _isIE = (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) || ("ActiveXObject" in window);
                if (_isIE) {
                    // windowless
                    var windowlessParam = document.createElement("param");
                    windowlessParam.setAttribute('name', 'windowless');
                    windowlessParam.setAttribute('value', true);
                    _pluginObj.appendChild(windowlessParam);
                    _pluginObj.setAttribute('classid', 'CLSID:7FD49E23-C8D7-4C4F-93A1-F7EACFA1EC53');
                } else {
                    _pluginObj.setAttribute('type', 'application/webrtc-everywhere');
                }
                element.pluginObj = _pluginObj;

                _pluginObj.setAttribute('className', element.className);
                _pluginObj.setAttribute('innerHTML', element.innerHTML);
                var width = element.getAttribute("width");
                var height = element.getAttribute("height");
                var bounds = element.getBoundingClientRect();
                if (!width) width = bounds.right - bounds.left;
                if (!height) height = bounds.bottom - bounds.top;

                if ("getComputedStyle" in window) {
                    var computedStyle = window.getComputedStyle(element, null);
                    if (!width && computedStyle.width != 'auto' && computedStyle.width != '0px') {
                        width = computedStyle.width;
                    }
                    if (!height && computedStyle.height != 'auto' && computedStyle.height != '0px') {
                        height = computedStyle.height;
                    }
                }
                if (width) _pluginObj.setAttribute('width', width);
                else _pluginObj.setAttribute('autowidth', true);
                if (height) _pluginObj.setAttribute('height', height);
                else _pluginObj.setAttribute('autoheight', true);

                document.body.appendChild(_pluginObj);
                if (element.parentNode) {
                    element.parentNode.replaceChild(_pluginObj, element); // replace (and remove) element
                    // add element again to be sure any query() will succeed
                    document.body.appendChild(element);
                    element.style.visibility = "hidden";
                }
            }

            if (element.pluginObj) {
                element.pluginObj.bindEventListener('play', function(objvid) {
                    if (element.pluginObj) {
                        if (element.pluginObj.getAttribute("autowidth") && objvid.videoWidth) {
                            element.pluginObj.setAttribute('width', objvid.videoWidth/* + "px"*/);
                        }
                        if (element.pluginObj.getAttribute("autoheight") && objvid.videoHeight) {
                            element.pluginObj.setAttribute('height', objvid.videoHeight/* + "px"*/);
                        }
                    }
                });
                element.pluginObj.src = stream;
            }

            return element.pluginObj;
        }
        else if (element.nodeName.toLowerCase() === 'audio') {
            return element;
        }
    };

    //TODO: not implemented yet beacuse "src" property is readonly
    //reattachMediaStream = function(to, from) {
    //    var pluginObjTo = extractPluginObj(to);
    //    var pluginObjFrom = extractPluginObj(from);
    //    if (pluginObjTo && pluginObjFrom) {
    //        pluginObjTo.src = pluginObjFrom.src;
    //    }
    //  };

    drawImage = function (context, video, x, y, width, height) {
        var pluginObj = extractPluginObj(video);
        if (pluginObj && pluginObj.isWebRtcPlugin && pluginObj.videoWidth > 0 && pluginObj.videoHeight > 0) {
            if (typeof pluginObj.getScreenShot !== "undefined") {
                var bmpBase64 = pluginObj.getScreenShot();
                if (bmpBase64) {
                    var image = new Image();
                    image.onload = function () {
                        context.drawImage(image, 0, 0, width, height);
                    };
                    image.src = "data:image/png;base64," + bmpBase64;
                }
            }
            else {
                var imageData = context.createImageData(pluginObj.videoWidth, pluginObj.videoHeight);
                if (imageData) {
                    pluginObj.fillImageData(imageData);
                    context.putImageData(imageData, x, y/*, width, height*/);
                }
            }
        }
    }

    // http://www.w3.org/TR/mediacapture-streams/#idl-def-MediaStreamTrack
    MediaStreamTrack = {};
    var getSourcesDelayed;
    MediaStreamTrack.getSources = function (gotSources) { // not part of the standard (at least, haven't found it)
        if (document.readyState !== "complete") {
            console.log("readyState = " + document.readyState + ", delaying getSources...");
            if (!getSourcesDelayed) {
                getSourcesDelayed = true;
                attachEventListener(document, "readystatechange", function () {
                    if (getSourcesDelayed && document.readyState == "complete") {
                        getSourcesDelayed = false;
                        getPlugin().getSources(gotSources);
                    }
                });
            }
        }
        else {
            getPlugin().getSources(gotSources);
        }
    }

    // http://www.w3.org/TR/webrtc/#interface-definition
    // http://www.w3.org/TR/webrtc/#rtcpeerconnection-interface-extensions-2
    RTCPeerConnection = function (configuration, constraints) {
        return getPlugin().createPeerConnection(configuration, constraints);
    }

    // http://www.w3.org/TR/webrtc/#rtcicecandidate-type
    RTCIceCandidate = function (RTCIceCandidateInit) {
        return getPlugin().createIceCandidate(RTCIceCandidateInit);
    }

    // http://www.w3.org/TR/webrtc/#session-description-model
    RTCSessionDescription = function (RTCSessionDescriptionInit) {
        return getPlugin().createSessionDescription(RTCSessionDescriptionInit);
    }
}
