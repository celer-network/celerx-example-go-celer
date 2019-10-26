var bridge = {
    default: this,
    call: function (b, a, c) {
        var e = "";
        "function" == typeof a && (c = a, a = {});
        a = {
            data: void 0 === a ? null : a
        };
        if ("function" == typeof c) {
            var g = "dscb" + window.dscb++;
            window[g] = c;
            a._dscbstub = g
        }
        a = JSON.stringify(a);
        if (window._dsbridge) e = _dsbridge.call(b, a);
        else if (window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")) e = prompt("_dsbridge=" + b, a);
        return JSON.parse(e || "{}").data
    },
    register: function (b, a, c) {
        c = c ? window._dsaf : window._dsf;
        window._dsInit || (window._dsInit = !0, setTimeout(function () {
            bridge.call("_dsb.dsinit")
        },
            0));
        "object" == typeof a ? c._obs[b] = a : c[b] = a
    },
    registerAsyn: function (b, a) {
        this.register(b, a, !0)
    },
    hasNativeMethod: function (b, a) {
        return this.call("_dsb.hasNativeMethod", {
            name: b,
            type: a || "all"
        })
    },
    disableJavascriptDialogBlock: function (b) {
        this.call("_dsb.disableJavascriptDialogBlock", {
            disable: !1 !== b
        })
    }
};
! function () {
    if (!window._dsf) {
        var b = {
            _dsf: {
                _obs: {}
            },
            _dsaf: {
                _obs: {}
            },
            dscb: 0,
            celerx: bridge,
            close: function () {
                bridge.call("_dsb.closePage")
            },
            _handleMessageFromNative: function (a) {
                var e = JSON.parse(a.data),
                    b = {
                        id: a.callbackId,
                        complete: !0
                    },
                    c = this._dsf[a.method],
                    d = this._dsaf[a.method],
                    h = function (a, c) {
                        b.data = a.apply(c, e);
                        bridge.call("_dsb.returnValue", b)
                    },
                    k = function (a, c) {
                        e.push(function (a, c) {
                            b.data = a;
                            b.complete = !1 !== c;
                            bridge.call("_dsb.returnValue", b)
                        });
                        a.apply(c, e)
                    };
                if (c) h(c, this._dsf);
                else if (d) k(d, this._dsaf);
                else if (c = a.method.split("."), !(2 > c.length)) {
                    a = c.pop();
                    var c = c.join("."),
                        d = this._dsf._obs,
                        d = d[c] || {},
                        f = d[a];
                    f && "function" == typeof f ? h(f, d) : (d = this._dsaf._obs, d = d[c] || {}, (f = d[a]) && "function" == typeof f && k(f, d))
                }
            }
        },
            a;
        for (a in b) window[a] = b[a];
        bridge.register("_hasJavascriptMethod", function (a, b) {
            b = a.split(".");
            if (2 > b.length) return !(!_dsf[b] && !_dsaf[b]);
            a = b.pop();
            b = b.join(".");
            return (b = _dsf._obs[b] || _dsaf._obs[b]) && !!b[a]
        })
    }
}();

var base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
function binary_to_base64(arr) {
    var input = new Uint8Array(arr);
    var ret = new Array();
    var i = 0;
    var j = 0;
    var char_array_3 = new Array(3);
    var char_array_4 = new Array(4);
    var in_len = input.length;
    var pos = 0;

    while (in_len--) {
        char_array_3[i++] = input[pos++];
        if (i == 3) {
            char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
            char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
            char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
            char_array_4[3] = char_array_3[2] & 0x3f;

            for (i = 0; (i < 4); i++)
                ret += base64_chars.charAt(char_array_4[i]);
            i = 0;
        }
    }

    if (i) {
        for (j = i; j < 3; j++)
            char_array_3[j] = 0;

        char_array_4[0] = (char_array_3[0] & 0xfc) >> 2;
        char_array_4[1] = ((char_array_3[0] & 0x03) << 4) + ((char_array_3[1] & 0xf0) >> 4);
        char_array_4[2] = ((char_array_3[1] & 0x0f) << 2) + ((char_array_3[2] & 0xc0) >> 6);
        char_array_4[3] = char_array_3[2] & 0x3f;

        for (j = 0; (j < i + 1); j++)
            ret += base64_chars.charAt(char_array_4[j]);

        while ((i++ < 3))
            ret += '=';

    }

    return ret;
}

var hD = '0123456789ABCDEF';
function dec2hex(d) {
    var h = hD.substr(d & 15, 1);
    while (d > 15) {
        d >>= 4;
        h = hD.substr(d & 15, 1) + h;
    }
    return h;
}

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
function base64_decode(input) {
    var output = new Array();
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    var orig_input = input;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    if (orig_input != input)
        alert("Warning! Characters outside Base64 range in input string ignored.");
    if (input.length % 4) {
        alert("Error: Input length is not a multiple of 4 bytes.");
        return "";
    }

    var j = 0;
    while (i < input.length) {

        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output[j++] = chr1;
        if (enc3 != 64)
            output[j++] = chr2;
        if (enc4 != 64)
            output[j++] = chr3;

    }
    return output;
}

module.exports = {
    onStateReceived: function (callback) {
        return bridge.register("onStateReceived", function (base64) {
            var output = base64_decode(base64);
            return callback(new Uint8Array(output));
        });
    }, onCourtModeStarted: function (callback) {
        return bridge.register("onCourtModeStarted", callback);
    }, getMatch: function () {
        var result = bridge.call("getMatch", "123");
        try {
            result = JSON.parse(result);
        } catch (error) {
        }
        return result;
    }, showCourtModeDialog: function () {
        return bridge.call("showCourtModeDialog");
    }, start: function () {
        return bridge.call("start");
    }, sendState: function (arr) {
        return bridge.call("sendState", binary_to_base64(arr));
    }, draw: function (arr) {
        return bridge.call("draw", binary_to_base64(arr));
    }, win: function (arr) {
        return bridge.call("win", binary_to_base64(arr));
    }, lose: function (arr) {
        return bridge.call("lose", binary_to_base64(arr));
    }, surrender: function (arr) {
        return bridge.call("surrender", binary_to_base64(arr));
    }, applyAction: function (arr, callback) {
        return bridge.call("applyAction", binary_to_base64(arr), callback);
    }, getOnChainState: function (callback) {
        return bridge.call("getOnChainState", "123", function (base64) {
            var output = base64_decode(base64);
            return callback(new Uint8Array(output));
        });
    }, getOnChainActionDeadline: function (callback) {
        return bridge.call("getOnChainActionDeadline", "123", callback);
    }, getCurrentBlockNumber: function () {
        return bridge.call("getCurrentBlockNumber", "123");
    }, finalizeOnChainGame: function (callback) {
        return bridge.call("finalizeOnChainGame", "123", callback);
    }, submitScore: function (score) {
        return bridge.call('submitScore', score);
    }, ready: function () {
        return bridge.call("ready");
    }, onStart: function (callback) {
        return bridge.register("onStart", callback);
    }
}
