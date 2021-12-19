/*! For license information please see trakteer-stream.js.LICENSE.txt */
(() => {
  var t = {
      742: (t, e) => {
        "use strict";
        e.byteLength = function (t) {
          var e = c(t),
            n = e[0],
            r = e[1];
          return 3 * (n + r) / 4 - r
        }, e.toByteArray = function (t) {
          var e, n, o = c(t),
            s = o[0],
            a = o[1],
            u = new i(function (t, e, n) {
              return 3 * (e + n) / 4 - n
            }(0, s, a)),
            h = 0,
            f = a > 0 ? s - 4 : s;
          for (n = 0; n < f; n += 4) e = r[t.charCodeAt(n)] << 18 | r[t.charCodeAt(n + 1)] << 12 | r[t.charCodeAt(n + 2)] << 6 | r[t.charCodeAt(n + 3)], u[h++] = e >> 16 & 255, u[h++] = e >> 8 & 255, u[h++] = 255 & e;
          2 === a && (e = r[t.charCodeAt(n)] << 2 | r[t.charCodeAt(n + 1)] >> 4, u[h++] = 255 & e);
          1 === a && (e = r[t.charCodeAt(n)] << 10 | r[t.charCodeAt(n + 1)] << 4 | r[t.charCodeAt(n + 2)] >> 2, u[h++] = e >> 8 & 255, u[h++] = 255 & e);
          return u
        }, e.fromByteArray = function (t) {
          for (var e, r = t.length, i = r % 3, o = [], s = 16383, a = 0, c = r - i; a < c; a += s) o.push(u(t, a, a + s > c ? c : a + s));
          1 === i ? (e = t[r - 1], o.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === i && (e = (t[r - 2] << 8) + t[r - 1], o.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "="));
          return o.join("")
        };
        for (var n = [], r = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, a = o.length; s < a; ++s) n[s] = o[s], r[o.charCodeAt(s)] = s;

        function c(t) {
          var e = t.length;
          if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
          var n = t.indexOf("=");
          return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4]
        }

        function u(t, e, r) {
          for (var i, o, s = [], a = e; a < r; a += 3) i = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), s.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
          return s.join("")
        }
        r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63
      },
      764: (t, e, n) => {
        "use strict";
        var r = n(742),
          i = n(645),
          o = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
        e.Buffer = c, e.SlowBuffer = function (t) {
          +t != t && (t = 0);
          return c.alloc(+t)
        }, e.INSPECT_MAX_BYTES = 50;
        var s = 2147483647;

        function a(t) {
          if (t > s) throw new RangeError('The value "' + t + '" is invalid for option "size"');
          var e = new Uint8Array(t);
          return Object.setPrototypeOf(e, c.prototype), e
        }

        function c(t, e, n) {
          if ("number" == typeof t) {
            if ("string" == typeof e) throw new TypeError('The "string" argument must be of type string. Received type number');
            return f(t)
          }
          return u(t, e, n)
        }

        function u(t, e, n) {
          if ("string" == typeof t) return function (t, e) {
            "string" == typeof e && "" !== e || (e = "utf8");
            if (!c.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
            var n = 0 | d(t, e),
              r = a(n),
              i = r.write(t, e);
            i !== n && (r = r.slice(0, i));
            return r
          }(t, e);
          if (ArrayBuffer.isView(t)) return function (t) {
            if (H(t, Uint8Array)) {
              var e = new Uint8Array(t);
              return l(e.buffer, e.byteOffset, e.byteLength)
            }
            return p(t)
          }(t);
          if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
          if (H(t, ArrayBuffer) || t && H(t.buffer, ArrayBuffer)) return l(t, e, n);
          if ("undefined" != typeof SharedArrayBuffer && (H(t, SharedArrayBuffer) || t && H(t.buffer, SharedArrayBuffer))) return l(t, e, n);
          if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
          var r = t.valueOf && t.valueOf();
          if (null != r && r !== t) return c.from(r, e, n);
          var i = function (t) {
            if (c.isBuffer(t)) {
              var e = 0 | y(t.length),
                n = a(e);
              return 0 === n.length || t.copy(n, 0, 0, e), n
            }
            if (void 0 !== t.length) return "number" != typeof t.length || q(t.length) ? a(0) : p(t);
            if ("Buffer" === t.type && Array.isArray(t.data)) return p(t.data)
          }(t);
          if (i) return i;
          if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return c.from(t[Symbol.toPrimitive]("string"), e, n);
          throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
        }

        function h(t) {
          if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
          if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
        }

        function f(t) {
          return h(t), a(t < 0 ? 0 : 0 | y(t))
        }

        function p(t) {
          for (var e = t.length < 0 ? 0 : 0 | y(t.length), n = a(e), r = 0; r < e; r += 1) n[r] = 255 & t[r];
          return n
        }

        function l(t, e, n) {
          if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
          if (t.byteLength < e + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
          var r;
          return r = void 0 === e && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, e) : new Uint8Array(t, e, n), Object.setPrototypeOf(r, c.prototype), r
        }

        function y(t) {
          if (t >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
          return 0 | t
        }

        function d(t, e) {
          if (c.isBuffer(t)) return t.length;
          if (ArrayBuffer.isView(t) || H(t, ArrayBuffer)) return t.byteLength;
          if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
          var n = t.length,
            r = arguments.length > 2 && !0 === arguments[2];
          if (!r && 0 === n) return 0;
          for (var i = !1;;) switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return n;
            case "utf8":
            case "utf-8":
              return N(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * n;
            case "hex":
              return n >>> 1;
            case "base64":
              return D(t).length;
            default:
              if (i) return r ? -1 : N(t).length;
              e = ("" + e).toLowerCase(), i = !0
          }
        }

        function v(t, e, n) {
          var r = !1;
          if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
          if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
          if ((n >>>= 0) <= (e >>>= 0)) return "";
          for (t || (t = "utf8");;) switch (t) {
            case "hex":
              return x(this, e, n);
            case "utf8":
            case "utf-8":
              return T(this, e, n);
            case "ascii":
              return C(this, e, n);
            case "latin1":
            case "binary":
              return P(this, e, n);
            case "base64":
              return A(this, e, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return L(this, e, n);
            default:
              if (r) throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), r = !0
          }
        }

        function g(t, e, n) {
          var r = t[e];
          t[e] = t[n], t[n] = r
        }

        function b(t, e, n, r, i) {
          if (0 === t.length) return -1;
          if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), q(n = +n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
            if (i) return -1;
            n = t.length - 1
          } else if (n < 0) {
            if (!i) return -1;
            n = 0
          }
          if ("string" == typeof e && (e = c.from(e, r)), c.isBuffer(e)) return 0 === e.length ? -1 : m(t, e, n, r, i);
          if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : m(t, [e], n, r, i);
          throw new TypeError("val must be string, number or Buffer")
        }

        function m(t, e, n, r, i) {
          var o, s = 1,
            a = t.length,
            c = e.length;
          if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
            if (t.length < 2 || e.length < 2) return -1;
            s = 2, a /= 2, c /= 2, n /= 2
          }

          function u(t, e) {
            return 1 === s ? t[e] : t.readUInt16BE(e * s)
          }
          if (i) {
            var h = -1;
            for (o = n; o < a; o++)
              if (u(t, o) === u(e, -1 === h ? 0 : o - h)) {
                if (-1 === h && (h = o), o - h + 1 === c) return h * s
              } else -1 !== h && (o -= o - h), h = -1
          } else
            for (n + c > a && (n = a - c), o = n; o >= 0; o--) {
              for (var f = !0, p = 0; p < c; p++)
                if (u(t, o + p) !== u(e, p)) {
                  f = !1;
                  break
                } if (f) return o
            }
          return -1
        }

        function w(t, e, n, r) {
          n = Number(n) || 0;
          var i = t.length - n;
          r ? (r = Number(r)) > i && (r = i) : r = i;
          var o = e.length;
          r > o / 2 && (r = o / 2);
          for (var s = 0; s < r; ++s) {
            var a = parseInt(e.substr(2 * s, 2), 16);
            if (q(a)) return s;
            t[n + s] = a
          }
          return s
        }

        function k(t, e, n, r) {
          return z(N(e, t.length - n), t, n, r)
        }

        function _(t, e, n, r) {
          return z(function (t) {
            for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
            return e
          }(e), t, n, r)
        }

        function S(t, e, n, r) {
          return z(D(e), t, n, r)
        }

        function E(t, e, n, r) {
          return z(function (t, e) {
            for (var n, r, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) r = (n = t.charCodeAt(s)) >> 8, i = n % 256, o.push(i), o.push(r);
            return o
          }(e, t.length - n), t, n, r)
        }

        function A(t, e, n) {
          return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
        }

        function T(t, e, n) {
          n = Math.min(t.length, n);
          for (var r = [], i = e; i < n;) {
            var o, s, a, c, u = t[i],
              h = null,
              f = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
            if (i + f <= n) switch (f) {
              case 1:
                u < 128 && (h = u);
                break;
              case 2:
                128 == (192 & (o = t[i + 1])) && (c = (31 & u) << 6 | 63 & o) > 127 && (h = c);
                break;
              case 3:
                o = t[i + 1], s = t[i + 2], 128 == (192 & o) && 128 == (192 & s) && (c = (15 & u) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (c < 55296 || c > 57343) && (h = c);
                break;
              case 4:
                o = t[i + 1], s = t[i + 2], a = t[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (c = (15 & u) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && c < 1114112 && (h = c)
            }
            null === h ? (h = 65533, f = 1) : h > 65535 && (h -= 65536, r.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), r.push(h), i += f
          }
          return function (t) {
            var e = t.length;
            if (e <= O) return String.fromCharCode.apply(String, t);
            var n = "",
              r = 0;
            for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += O));
            return n
          }(r)
        }
        e.kMaxLength = s, c.TYPED_ARRAY_SUPPORT = function () {
          try {
            var t = new Uint8Array(1),
              e = {
                foo: function () {
                  return 42
                }
              };
            return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
          } catch (t) {
            return !1
          }
        }(), c.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(c.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (c.isBuffer(this)) return this.buffer
          }
        }), Object.defineProperty(c.prototype, "offset", {
          enumerable: !0,
          get: function () {
            if (c.isBuffer(this)) return this.byteOffset
          }
        }), c.poolSize = 8192, c.from = function (t, e, n) {
          return u(t, e, n)
        }, Object.setPrototypeOf(c.prototype, Uint8Array.prototype), Object.setPrototypeOf(c, Uint8Array), c.alloc = function (t, e, n) {
          return function (t, e, n) {
            return h(t), t <= 0 ? a(t) : void 0 !== e ? "string" == typeof n ? a(t).fill(e, n) : a(t).fill(e) : a(t)
          }(t, e, n)
        }, c.allocUnsafe = function (t) {
          return f(t)
        }, c.allocUnsafeSlow = function (t) {
          return f(t)
        }, c.isBuffer = function (t) {
          return null != t && !0 === t._isBuffer && t !== c.prototype
        }, c.compare = function (t, e) {
          if (H(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)), H(e, Uint8Array) && (e = c.from(e, e.offset, e.byteLength)), !c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
          if (t === e) return 0;
          for (var n = t.length, r = e.length, i = 0, o = Math.min(n, r); i < o; ++i)
            if (t[i] !== e[i]) {
              n = t[i], r = e[i];
              break
            } return n < r ? -1 : r < n ? 1 : 0
        }, c.isEncoding = function (t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1
          }
        }, c.concat = function (t, e) {
          if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return c.alloc(0);
          var n;
          if (void 0 === e)
            for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
          var r = c.allocUnsafe(e),
            i = 0;
          for (n = 0; n < t.length; ++n) {
            var o = t[n];
            if (H(o, Uint8Array)) i + o.length > r.length ? c.from(o).copy(r, i) : Uint8Array.prototype.set.call(r, o, i);
            else {
              if (!c.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
              o.copy(r, i)
            }
            i += o.length
          }
          return r
        }, c.byteLength = d, c.prototype._isBuffer = !0, c.prototype.swap16 = function () {
          var t = this.length;
          if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var e = 0; e < t; e += 2) g(this, e, e + 1);
          return this
        }, c.prototype.swap32 = function () {
          var t = this.length;
          if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
          return this
        }, c.prototype.swap64 = function () {
          var t = this.length;
          if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var e = 0; e < t; e += 8) g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
          return this
        }, c.prototype.toString = function () {
          var t = this.length;
          return 0 === t ? "" : 0 === arguments.length ? T(this, 0, t) : v.apply(this, arguments)
        }, c.prototype.toLocaleString = c.prototype.toString, c.prototype.equals = function (t) {
          if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === c.compare(this, t)
        }, c.prototype.inspect = function () {
          var t = "",
            n = e.INSPECT_MAX_BYTES;
          return t = this.toString("hex", 0, n).replace(/(.{2})/g, "$1 ").trim(), this.length > n && (t += " ... "), "<Buffer " + t + ">"
        }, o && (c.prototype[o] = c.prototype.inspect), c.prototype.compare = function (t, e, n, r, i) {
          if (H(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)), !c.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
          if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
          if (r >= i && e >= n) return 0;
          if (r >= i) return -1;
          if (e >= n) return 1;
          if (this === t) return 0;
          for (var o = (i >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (e >>>= 0), a = Math.min(o, s), u = this.slice(r, i), h = t.slice(e, n), f = 0; f < a; ++f)
            if (u[f] !== h[f]) {
              o = u[f], s = h[f];
              break
            } return o < s ? -1 : s < o ? 1 : 0
        }, c.prototype.includes = function (t, e, n) {
          return -1 !== this.indexOf(t, e, n)
        }, c.prototype.indexOf = function (t, e, n) {
          return b(this, t, e, n, !0)
        }, c.prototype.lastIndexOf = function (t, e, n) {
          return b(this, t, e, n, !1)
        }, c.prototype.write = function (t, e, n, r) {
          if (void 0 === e) r = "utf8", n = this.length, e = 0;
          else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
          else {
            if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            e >>>= 0, isFinite(n) ? (n >>>= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
          }
          var i = this.length - e;
          if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
          r || (r = "utf8");
          for (var o = !1;;) switch (r) {
            case "hex":
              return w(this, t, e, n);
            case "utf8":
            case "utf-8":
              return k(this, t, e, n);
            case "ascii":
            case "latin1":
            case "binary":
              return _(this, t, e, n);
            case "base64":
              return S(this, t, e, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return E(this, t, e, n);
            default:
              if (o) throw new TypeError("Unknown encoding: " + r);
              r = ("" + r).toLowerCase(), o = !0
          }
        }, c.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          }
        };
        var O = 4096;

        function C(t, e, n) {
          var r = "";
          n = Math.min(t.length, n);
          for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
          return r
        }

        function P(t, e, n) {
          var r = "";
          n = Math.min(t.length, n);
          for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
          return r
        }

        function x(t, e, n) {
          var r = t.length;
          (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
          for (var i = "", o = e; o < n; ++o) i += F[t[o]];
          return i
        }

        function L(t, e, n) {
          for (var r = t.slice(e, n), i = "", o = 0; o < r.length - 1; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
          return i
        }

        function U(t, e, n) {
          if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
          if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
        }

        function R(t, e, n, r, i, o) {
          if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
          if (n + r > t.length) throw new RangeError("Index out of range")
        }

        function B(t, e, n, r, i, o) {
          if (n + r > t.length) throw new RangeError("Index out of range");
          if (n < 0) throw new RangeError("Index out of range")
        }

        function I(t, e, n, r, o) {
          return e = +e, n >>>= 0, o || B(t, 0, n, 4), i.write(t, e, n, r, 23, 4), n + 4
        }

        function j(t, e, n, r, o) {
          return e = +e, n >>>= 0, o || B(t, 0, n, 8), i.write(t, e, n, r, 52, 8), n + 8
        }
        c.prototype.slice = function (t, e) {
          var n = this.length;
          (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
          var r = this.subarray(t, e);
          return Object.setPrototypeOf(r, c.prototype), r
        }, c.prototype.readUintLE = c.prototype.readUIntLE = function (t, e, n) {
          t >>>= 0, e >>>= 0, n || U(t, e, this.length);
          for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
          return r
        }, c.prototype.readUintBE = c.prototype.readUIntBE = function (t, e, n) {
          t >>>= 0, e >>>= 0, n || U(t, e, this.length);
          for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
          return r
        }, c.prototype.readUint8 = c.prototype.readUInt8 = function (t, e) {
          return t >>>= 0, e || U(t, 1, this.length), this[t]
        }, c.prototype.readUint16LE = c.prototype.readUInt16LE = function (t, e) {
          return t >>>= 0, e || U(t, 2, this.length), this[t] | this[t + 1] << 8
        }, c.prototype.readUint16BE = c.prototype.readUInt16BE = function (t, e) {
          return t >>>= 0, e || U(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, c.prototype.readUint32LE = c.prototype.readUInt32LE = function (t, e) {
          return t >>>= 0, e || U(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, c.prototype.readUint32BE = c.prototype.readUInt32BE = function (t, e) {
          return t >>>= 0, e || U(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, c.prototype.readIntLE = function (t, e, n) {
          t >>>= 0, e >>>= 0, n || U(t, e, this.length);
          for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
          return r >= (i *= 128) && (r -= Math.pow(2, 8 * e)), r
        }, c.prototype.readIntBE = function (t, e, n) {
          t >>>= 0, e >>>= 0, n || U(t, e, this.length);
          for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
          return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o
        }, c.prototype.readInt8 = function (t, e) {
          return t >>>= 0, e || U(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, c.prototype.readInt16LE = function (t, e) {
          t >>>= 0, e || U(t, 2, this.length);
          var n = this[t] | this[t + 1] << 8;
          return 32768 & n ? 4294901760 | n : n
        }, c.prototype.readInt16BE = function (t, e) {
          t >>>= 0, e || U(t, 2, this.length);
          var n = this[t + 1] | this[t] << 8;
          return 32768 & n ? 4294901760 | n : n
        }, c.prototype.readInt32LE = function (t, e) {
          return t >>>= 0, e || U(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, c.prototype.readInt32BE = function (t, e) {
          return t >>>= 0, e || U(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, c.prototype.readFloatLE = function (t, e) {
          return t >>>= 0, e || U(t, 4, this.length), i.read(this, t, !0, 23, 4)
        }, c.prototype.readFloatBE = function (t, e) {
          return t >>>= 0, e || U(t, 4, this.length), i.read(this, t, !1, 23, 4)
        }, c.prototype.readDoubleLE = function (t, e) {
          return t >>>= 0, e || U(t, 8, this.length), i.read(this, t, !0, 52, 8)
        }, c.prototype.readDoubleBE = function (t, e) {
          return t >>>= 0, e || U(t, 8, this.length), i.read(this, t, !1, 52, 8)
        }, c.prototype.writeUintLE = c.prototype.writeUIntLE = function (t, e, n, r) {
          (t = +t, e >>>= 0, n >>>= 0, r) || R(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
          var i = 1,
            o = 0;
          for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
          return e + n
        }, c.prototype.writeUintBE = c.prototype.writeUIntBE = function (t, e, n, r) {
          (t = +t, e >>>= 0, n >>>= 0, r) || R(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
          var i = n - 1,
            o = 1;
          for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
          return e + n
        }, c.prototype.writeUint8 = c.prototype.writeUInt8 = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
        }, c.prototype.writeUint16LE = c.prototype.writeUInt16LE = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
        }, c.prototype.writeUint16BE = c.prototype.writeUInt16BE = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
        }, c.prototype.writeUint32LE = c.prototype.writeUInt32LE = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
        }, c.prototype.writeUint32BE = c.prototype.writeUInt32BE = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
        }, c.prototype.writeIntLE = function (t, e, n, r) {
          if (t = +t, e >>>= 0, !r) {
            var i = Math.pow(2, 8 * n - 1);
            R(this, t, e, n, i - 1, -i)
          }
          var o = 0,
            s = 1,
            a = 0;
          for (this[e] = 255 & t; ++o < n && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
          return e + n
        }, c.prototype.writeIntBE = function (t, e, n, r) {
          if (t = +t, e >>>= 0, !r) {
            var i = Math.pow(2, 8 * n - 1);
            R(this, t, e, n, i - 1, -i)
          }
          var o = n - 1,
            s = 1,
            a = 0;
          for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
          return e + n
        }, c.prototype.writeInt8 = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
        }, c.prototype.writeInt16LE = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
        }, c.prototype.writeInt16BE = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
        }, c.prototype.writeInt32LE = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
        }, c.prototype.writeInt32BE = function (t, e, n) {
          return t = +t, e >>>= 0, n || R(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
        }, c.prototype.writeFloatLE = function (t, e, n) {
          return I(this, t, e, !0, n)
        }, c.prototype.writeFloatBE = function (t, e, n) {
          return I(this, t, e, !1, n)
        }, c.prototype.writeDoubleLE = function (t, e, n) {
          return j(this, t, e, !0, n)
        }, c.prototype.writeDoubleBE = function (t, e, n) {
          return j(this, t, e, !1, n)
        }, c.prototype.copy = function (t, e, n, r) {
          if (!c.isBuffer(t)) throw new TypeError("argument should be a Buffer");
          if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (e < 0) throw new RangeError("targetStart out of bounds");
          if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
          if (r < 0) throw new RangeError("sourceEnd out of bounds");
          r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
          var i = r - n;
          return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, n, r) : Uint8Array.prototype.set.call(t, this.subarray(n, r), e), i
        }, c.prototype.fill = function (t, e, n, r) {
          if ("string" == typeof t) {
            if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
            if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
            if (1 === t.length) {
              var i = t.charCodeAt(0);
              ("utf8" === r && i < 128 || "latin1" === r) && (t = i)
            }
          } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
          if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
          if (n <= e) return this;
          var o;
          if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
            for (o = e; o < n; ++o) this[o] = t;
          else {
            var s = c.isBuffer(t) ? t : c.from(t, r),
              a = s.length;
            if (0 === a) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
            for (o = 0; o < n - e; ++o) this[o + e] = s[o % a]
          }
          return this
        };
        var M = /[^+/0-9A-Za-z-_]/g;

        function N(t, e) {
          var n;
          e = e || 1 / 0;
          for (var r = t.length, i = null, o = [], s = 0; s < r; ++s) {
            if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
              if (!i) {
                if (n > 56319) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue
                }
                if (s + 1 === r) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue
                }
                i = n;
                continue
              }
              if (n < 56320) {
                (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                continue
              }
              n = 65536 + (i - 55296 << 10 | n - 56320)
            } else i && (e -= 3) > -1 && o.push(239, 191, 189);
            if (i = null, n < 128) {
              if ((e -= 1) < 0) break;
              o.push(n)
            } else if (n < 2048) {
              if ((e -= 2) < 0) break;
              o.push(n >> 6 | 192, 63 & n | 128)
            } else if (n < 65536) {
              if ((e -= 3) < 0) break;
              o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
            } else {
              if (!(n < 1114112)) throw new Error("Invalid code point");
              if ((e -= 4) < 0) break;
              o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
            }
          }
          return o
        }

        function D(t) {
          return r.toByteArray(function (t) {
            if ((t = (t = t.split("=")[0]).trim().replace(M, "")).length < 2) return "";
            for (; t.length % 4 != 0;) t += "=";
            return t
          }(t))
        }

        function z(t, e, n, r) {
          for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
          return i
        }

        function H(t, e) {
          return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
        }

        function q(t) {
          return t != t
        }
        var F = function () {
          for (var t = "0123456789abcdef", e = new Array(256), n = 0; n < 16; ++n)
            for (var r = 16 * n, i = 0; i < 16; ++i) e[r + i] = t[n] + t[i];
          return e
        }()
      },
      645: (t, e) => {
        e.read = function (t, e, n, r, i) {
          var o, s, a = 8 * i - r - 1,
            c = (1 << a) - 1,
            u = c >> 1,
            h = -7,
            f = n ? i - 1 : 0,
            p = n ? -1 : 1,
            l = t[e + f];
          for (f += p, o = l & (1 << -h) - 1, l >>= -h, h += a; h > 0; o = 256 * o + t[e + f], f += p, h -= 8);
          for (s = o & (1 << -h) - 1, o >>= -h, h += r; h > 0; s = 256 * s + t[e + f], f += p, h -= 8);
          if (0 === o) o = 1 - u;
          else {
            if (o === c) return s ? NaN : 1 / 0 * (l ? -1 : 1);
            s += Math.pow(2, r), o -= u
          }
          return (l ? -1 : 1) * s * Math.pow(2, o - r)
        }, e.write = function (t, e, n, r, i, o) {
          var s, a, c, u = 8 * o - i - 1,
            h = (1 << u) - 1,
            f = h >> 1,
            p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            l = r ? 0 : o - 1,
            y = r ? 1 : -1,
            d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
          for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), (e += s + f >= 1 ? p / c : p * Math.pow(2, 1 - f)) * c >= 2 && (s++, c /= 2), s + f >= h ? (a = 0, s = h) : s + f >= 1 ? (a = (e * c - 1) * Math.pow(2, i), s += f) : (a = e * Math.pow(2, f - 1) * Math.pow(2, i), s = 0)); i >= 8; t[n + l] = 255 & a, l += y, a /= 256, i -= 8);
          for (s = s << i | a, u += i; u > 0; t[n + l] = 255 & s, l += y, s /= 256, u -= 8);
          t[n + l - y] |= 128 * d
        }
      },
      606: (t, e, n) => {
        var r, i = n(764).Buffer;
        window, r = function () {
          return function (t) {
            var e = {};

            function n(r) {
              if (e[r]) return e[r].exports;
              var i = e[r] = {
                i: r,
                l: !1,
                exports: {}
              };
              return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
            }
            return n.m = t, n.c = e, n.d = function (t, e, r) {
              n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: r
              })
            }, n.r = function (t) {
              "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
              }), Object.defineProperty(t, "__esModule", {
                value: !0
              })
            }, n.t = function (t, e) {
              if (1 & e && (t = n(t)), 8 & e) return t;
              if (4 & e && "object" == typeof t && t && t.__esModule) return t;
              var r = Object.create(null);
              if (n.r(r), Object.defineProperty(r, "default", {
                  enumerable: !0,
                  value: t
                }), 2 & e && "string" != typeof t)
                for (var i in t) n.d(r, i, function (e) {
                  return t[e]
                }.bind(null, i));
              return r
            }, n.n = function (t) {
              var e = t && t.__esModule ? function () {
                return t.default
              } : function () {
                return t
              };
              return n.d(e, "a", e), e
            }, n.o = function (t, e) {
              return Object.prototype.hasOwnProperty.call(t, e)
            }, n.p = "", n(n.s = 2)
          }([function (t, e, n) {
            ! function (t) {
              "use strict";
              var e = function (t) {
                  var e, n = new Float64Array(16);
                  if (t)
                    for (e = 0; e < t.length; e++) n[e] = t[e];
                  return n
                },
                r = function () {
                  throw new Error("no PRNG")
                },
                i = new Uint8Array(16),
                o = new Uint8Array(32);
              o[0] = 9;
              var s = e(),
                a = e([1]),
                c = e([56129, 1]),
                u = e([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]),
                h = e([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]),
                f = e([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]),
                p = e([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]),
                l = e([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);

              function y(t, e, n, r) {
                t[e] = n >> 24 & 255, t[e + 1] = n >> 16 & 255, t[e + 2] = n >> 8 & 255, t[e + 3] = 255 & n, t[e + 4] = r >> 24 & 255, t[e + 5] = r >> 16 & 255, t[e + 6] = r >> 8 & 255, t[e + 7] = 255 & r
              }

              function d(t, e, n, r, i) {
                var o, s = 0;
                for (o = 0; o < i; o++) s |= t[e + o] ^ n[r + o];
                return (1 & s - 1 >>> 8) - 1
              }

              function v(t, e, n, r) {
                return d(t, e, n, r, 16)
              }

              function g(t, e, n, r) {
                return d(t, e, n, r, 32)
              }

              function b(t, e, n, r) {
                ! function (t, e, n, r) {
                  for (var i, o = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, s = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, a = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, c = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, u = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, h = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, f = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, p = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, l = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, y = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, d = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, v = 255 & n[16] | (255 & n[17]) << 8 | (255 & n[18]) << 16 | (255 & n[19]) << 24, g = 255 & n[20] | (255 & n[21]) << 8 | (255 & n[22]) << 16 | (255 & n[23]) << 24, b = 255 & n[24] | (255 & n[25]) << 8 | (255 & n[26]) << 16 | (255 & n[27]) << 24, m = 255 & n[28] | (255 & n[29]) << 8 | (255 & n[30]) << 16 | (255 & n[31]) << 24, w = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, k = o, _ = s, S = a, E = c, A = u, T = h, O = f, C = p, P = l, x = y, L = d, U = v, R = g, B = b, I = m, j = w, M = 0; M < 20; M += 2) k ^= (i = (R ^= (i = (P ^= (i = (A ^= (i = k + R | 0) << 7 | i >>> 25) + k | 0) << 9 | i >>> 23) + A | 0) << 13 | i >>> 19) + P | 0) << 18 | i >>> 14, T ^= (i = (_ ^= (i = (B ^= (i = (x ^= (i = T + _ | 0) << 7 | i >>> 25) + T | 0) << 9 | i >>> 23) + x | 0) << 13 | i >>> 19) + B | 0) << 18 | i >>> 14, L ^= (i = (O ^= (i = (S ^= (i = (I ^= (i = L + O | 0) << 7 | i >>> 25) + L | 0) << 9 | i >>> 23) + I | 0) << 13 | i >>> 19) + S | 0) << 18 | i >>> 14, j ^= (i = (U ^= (i = (C ^= (i = (E ^= (i = j + U | 0) << 7 | i >>> 25) + j | 0) << 9 | i >>> 23) + E | 0) << 13 | i >>> 19) + C | 0) << 18 | i >>> 14, k ^= (i = (E ^= (i = (S ^= (i = (_ ^= (i = k + E | 0) << 7 | i >>> 25) + k | 0) << 9 | i >>> 23) + _ | 0) << 13 | i >>> 19) + S | 0) << 18 | i >>> 14, T ^= (i = (A ^= (i = (C ^= (i = (O ^= (i = T + A | 0) << 7 | i >>> 25) + T | 0) << 9 | i >>> 23) + O | 0) << 13 | i >>> 19) + C | 0) << 18 | i >>> 14, L ^= (i = (x ^= (i = (P ^= (i = (U ^= (i = L + x | 0) << 7 | i >>> 25) + L | 0) << 9 | i >>> 23) + U | 0) << 13 | i >>> 19) + P | 0) << 18 | i >>> 14, j ^= (i = (I ^= (i = (B ^= (i = (R ^= (i = j + I | 0) << 7 | i >>> 25) + j | 0) << 9 | i >>> 23) + R | 0) << 13 | i >>> 19) + B | 0) << 18 | i >>> 14;
                  k = k + o | 0, _ = _ + s | 0, S = S + a | 0, E = E + c | 0, A = A + u | 0, T = T + h | 0, O = O + f | 0, C = C + p | 0, P = P + l | 0, x = x + y | 0, L = L + d | 0, U = U + v | 0, R = R + g | 0, B = B + b | 0, I = I + m | 0, j = j + w | 0, t[0] = k >>> 0 & 255, t[1] = k >>> 8 & 255, t[2] = k >>> 16 & 255, t[3] = k >>> 24 & 255, t[4] = _ >>> 0 & 255, t[5] = _ >>> 8 & 255, t[6] = _ >>> 16 & 255, t[7] = _ >>> 24 & 255, t[8] = S >>> 0 & 255, t[9] = S >>> 8 & 255, t[10] = S >>> 16 & 255, t[11] = S >>> 24 & 255, t[12] = E >>> 0 & 255, t[13] = E >>> 8 & 255, t[14] = E >>> 16 & 255, t[15] = E >>> 24 & 255, t[16] = A >>> 0 & 255, t[17] = A >>> 8 & 255, t[18] = A >>> 16 & 255, t[19] = A >>> 24 & 255, t[20] = T >>> 0 & 255, t[21] = T >>> 8 & 255, t[22] = T >>> 16 & 255, t[23] = T >>> 24 & 255, t[24] = O >>> 0 & 255, t[25] = O >>> 8 & 255, t[26] = O >>> 16 & 255, t[27] = O >>> 24 & 255, t[28] = C >>> 0 & 255, t[29] = C >>> 8 & 255, t[30] = C >>> 16 & 255, t[31] = C >>> 24 & 255, t[32] = P >>> 0 & 255, t[33] = P >>> 8 & 255, t[34] = P >>> 16 & 255, t[35] = P >>> 24 & 255, t[36] = x >>> 0 & 255, t[37] = x >>> 8 & 255, t[38] = x >>> 16 & 255, t[39] = x >>> 24 & 255, t[40] = L >>> 0 & 255, t[41] = L >>> 8 & 255, t[42] = L >>> 16 & 255, t[43] = L >>> 24 & 255, t[44] = U >>> 0 & 255, t[45] = U >>> 8 & 255, t[46] = U >>> 16 & 255, t[47] = U >>> 24 & 255, t[48] = R >>> 0 & 255, t[49] = R >>> 8 & 255, t[50] = R >>> 16 & 255, t[51] = R >>> 24 & 255, t[52] = B >>> 0 & 255, t[53] = B >>> 8 & 255, t[54] = B >>> 16 & 255, t[55] = B >>> 24 & 255, t[56] = I >>> 0 & 255, t[57] = I >>> 8 & 255, t[58] = I >>> 16 & 255, t[59] = I >>> 24 & 255, t[60] = j >>> 0 & 255, t[61] = j >>> 8 & 255, t[62] = j >>> 16 & 255, t[63] = j >>> 24 & 255
                }(t, e, n, r)
              }

              function m(t, e, n, r) {
                ! function (t, e, n, r) {
                  for (var i, o = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, s = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, a = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, c = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, u = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, h = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, f = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, p = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, l = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, y = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, d = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, v = 255 & n[16] | (255 & n[17]) << 8 | (255 & n[18]) << 16 | (255 & n[19]) << 24, g = 255 & n[20] | (255 & n[21]) << 8 | (255 & n[22]) << 16 | (255 & n[23]) << 24, b = 255 & n[24] | (255 & n[25]) << 8 | (255 & n[26]) << 16 | (255 & n[27]) << 24, m = 255 & n[28] | (255 & n[29]) << 8 | (255 & n[30]) << 16 | (255 & n[31]) << 24, w = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, k = 0; k < 20; k += 2) o ^= (i = (g ^= (i = (l ^= (i = (u ^= (i = o + g | 0) << 7 | i >>> 25) + o | 0) << 9 | i >>> 23) + u | 0) << 13 | i >>> 19) + l | 0) << 18 | i >>> 14, h ^= (i = (s ^= (i = (b ^= (i = (y ^= (i = h + s | 0) << 7 | i >>> 25) + h | 0) << 9 | i >>> 23) + y | 0) << 13 | i >>> 19) + b | 0) << 18 | i >>> 14, d ^= (i = (f ^= (i = (a ^= (i = (m ^= (i = d + f | 0) << 7 | i >>> 25) + d | 0) << 9 | i >>> 23) + m | 0) << 13 | i >>> 19) + a | 0) << 18 | i >>> 14, w ^= (i = (v ^= (i = (p ^= (i = (c ^= (i = w + v | 0) << 7 | i >>> 25) + w | 0) << 9 | i >>> 23) + c | 0) << 13 | i >>> 19) + p | 0) << 18 | i >>> 14, o ^= (i = (c ^= (i = (a ^= (i = (s ^= (i = o + c | 0) << 7 | i >>> 25) + o | 0) << 9 | i >>> 23) + s | 0) << 13 | i >>> 19) + a | 0) << 18 | i >>> 14, h ^= (i = (u ^= (i = (p ^= (i = (f ^= (i = h + u | 0) << 7 | i >>> 25) + h | 0) << 9 | i >>> 23) + f | 0) << 13 | i >>> 19) + p | 0) << 18 | i >>> 14, d ^= (i = (y ^= (i = (l ^= (i = (v ^= (i = d + y | 0) << 7 | i >>> 25) + d | 0) << 9 | i >>> 23) + v | 0) << 13 | i >>> 19) + l | 0) << 18 | i >>> 14, w ^= (i = (m ^= (i = (b ^= (i = (g ^= (i = w + m | 0) << 7 | i >>> 25) + w | 0) << 9 | i >>> 23) + g | 0) << 13 | i >>> 19) + b | 0) << 18 | i >>> 14;
                  t[0] = o >>> 0 & 255, t[1] = o >>> 8 & 255, t[2] = o >>> 16 & 255, t[3] = o >>> 24 & 255, t[4] = h >>> 0 & 255, t[5] = h >>> 8 & 255, t[6] = h >>> 16 & 255, t[7] = h >>> 24 & 255, t[8] = d >>> 0 & 255, t[9] = d >>> 8 & 255, t[10] = d >>> 16 & 255, t[11] = d >>> 24 & 255, t[12] = w >>> 0 & 255, t[13] = w >>> 8 & 255, t[14] = w >>> 16 & 255, t[15] = w >>> 24 & 255, t[16] = f >>> 0 & 255, t[17] = f >>> 8 & 255, t[18] = f >>> 16 & 255, t[19] = f >>> 24 & 255, t[20] = p >>> 0 & 255, t[21] = p >>> 8 & 255, t[22] = p >>> 16 & 255, t[23] = p >>> 24 & 255, t[24] = l >>> 0 & 255, t[25] = l >>> 8 & 255, t[26] = l >>> 16 & 255, t[27] = l >>> 24 & 255, t[28] = y >>> 0 & 255, t[29] = y >>> 8 & 255, t[30] = y >>> 16 & 255, t[31] = y >>> 24 & 255
                }(t, e, n, r)
              }
              var w = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);

              function k(t, e, n, r, i, o, s) {
                var a, c, u = new Uint8Array(16),
                  h = new Uint8Array(64);
                for (c = 0; c < 16; c++) u[c] = 0;
                for (c = 0; c < 8; c++) u[c] = o[c];
                for (; i >= 64;) {
                  for (b(h, u, s, w), c = 0; c < 64; c++) t[e + c] = n[r + c] ^ h[c];
                  for (a = 1, c = 8; c < 16; c++) a = a + (255 & u[c]) | 0, u[c] = 255 & a, a >>>= 8;
                  i -= 64, e += 64, r += 64
                }
                if (i > 0)
                  for (b(h, u, s, w), c = 0; c < i; c++) t[e + c] = n[r + c] ^ h[c];
                return 0
              }

              function _(t, e, n, r, i) {
                var o, s, a = new Uint8Array(16),
                  c = new Uint8Array(64);
                for (s = 0; s < 16; s++) a[s] = 0;
                for (s = 0; s < 8; s++) a[s] = r[s];
                for (; n >= 64;) {
                  for (b(c, a, i, w), s = 0; s < 64; s++) t[e + s] = c[s];
                  for (o = 1, s = 8; s < 16; s++) o = o + (255 & a[s]) | 0, a[s] = 255 & o, o >>>= 8;
                  n -= 64, e += 64
                }
                if (n > 0)
                  for (b(c, a, i, w), s = 0; s < n; s++) t[e + s] = c[s];
                return 0
              }

              function S(t, e, n, r, i) {
                var o = new Uint8Array(32);
                m(o, r, i, w);
                for (var s = new Uint8Array(8), a = 0; a < 8; a++) s[a] = r[a + 16];
                return _(t, e, n, s, o)
              }

              function E(t, e, n, r, i, o, s) {
                var a = new Uint8Array(32);
                m(a, o, s, w);
                for (var c = new Uint8Array(8), u = 0; u < 8; u++) c[u] = o[u + 16];
                return k(t, e, n, r, i, c, a)
              }
              var A = function (t) {
                var e, n, r, i, o, s, a, c;
                this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0, e = 255 & t[0] | (255 & t[1]) << 8, this.r[0] = 8191 & e, n = 255 & t[2] | (255 & t[3]) << 8, this.r[1] = 8191 & (e >>> 13 | n << 3), r = 255 & t[4] | (255 & t[5]) << 8, this.r[2] = 7939 & (n >>> 10 | r << 6), i = 255 & t[6] | (255 & t[7]) << 8, this.r[3] = 8191 & (r >>> 7 | i << 9), o = 255 & t[8] | (255 & t[9]) << 8, this.r[4] = 255 & (i >>> 4 | o << 12), this.r[5] = o >>> 1 & 8190, s = 255 & t[10] | (255 & t[11]) << 8, this.r[6] = 8191 & (o >>> 14 | s << 2), a = 255 & t[12] | (255 & t[13]) << 8, this.r[7] = 8065 & (s >>> 11 | a << 5), c = 255 & t[14] | (255 & t[15]) << 8, this.r[8] = 8191 & (a >>> 8 | c << 8), this.r[9] = c >>> 5 & 127, this.pad[0] = 255 & t[16] | (255 & t[17]) << 8, this.pad[1] = 255 & t[18] | (255 & t[19]) << 8, this.pad[2] = 255 & t[20] | (255 & t[21]) << 8, this.pad[3] = 255 & t[22] | (255 & t[23]) << 8, this.pad[4] = 255 & t[24] | (255 & t[25]) << 8, this.pad[5] = 255 & t[26] | (255 & t[27]) << 8, this.pad[6] = 255 & t[28] | (255 & t[29]) << 8, this.pad[7] = 255 & t[30] | (255 & t[31]) << 8
              };

              function T(t, e, n, r, i, o) {
                var s = new A(o);
                return s.update(n, r, i), s.finish(t, e), 0
              }

              function O(t, e, n, r, i, o) {
                var s = new Uint8Array(16);
                return T(s, 0, n, r, i, o), v(t, e, s, 0)
              }

              function C(t, e, n, r, i) {
                var o;
                if (n < 32) return -1;
                for (E(t, 0, e, 0, n, r, i), T(t, 16, t, 32, n - 32, t), o = 0; o < 16; o++) t[o] = 0;
                return 0
              }

              function P(t, e, n, r, i) {
                var o, s = new Uint8Array(32);
                if (n < 32) return -1;
                if (S(s, 0, 32, r, i), 0 !== O(e, 16, e, 32, n - 32, s)) return -1;
                for (E(t, 0, e, 0, n, r, i), o = 0; o < 32; o++) t[o] = 0;
                return 0
              }

              function x(t, e) {
                var n;
                for (n = 0; n < 16; n++) t[n] = 0 | e[n]
              }

              function L(t) {
                var e, n, r = 1;
                for (e = 0; e < 16; e++) n = t[e] + r + 65535, r = Math.floor(n / 65536), t[e] = n - 65536 * r;
                t[0] += r - 1 + 37 * (r - 1)
              }

              function U(t, e, n) {
                for (var r, i = ~(n - 1), o = 0; o < 16; o++) r = i & (t[o] ^ e[o]), t[o] ^= r, e[o] ^= r
              }

              function R(t, n) {
                var r, i, o, s = e(),
                  a = e();
                for (r = 0; r < 16; r++) a[r] = n[r];
                for (L(a), L(a), L(a), i = 0; i < 2; i++) {
                  for (s[0] = a[0] - 65517, r = 1; r < 15; r++) s[r] = a[r] - 65535 - (s[r - 1] >> 16 & 1), s[r - 1] &= 65535;
                  s[15] = a[15] - 32767 - (s[14] >> 16 & 1), o = s[15] >> 16 & 1, s[14] &= 65535, U(a, s, 1 - o)
                }
                for (r = 0; r < 16; r++) t[2 * r] = 255 & a[r], t[2 * r + 1] = a[r] >> 8
              }

              function B(t, e) {
                var n = new Uint8Array(32),
                  r = new Uint8Array(32);
                return R(n, t), R(r, e), g(n, 0, r, 0)
              }

              function I(t) {
                var e = new Uint8Array(32);
                return R(e, t), 1 & e[0]
              }

              function j(t, e) {
                var n;
                for (n = 0; n < 16; n++) t[n] = e[2 * n] + (e[2 * n + 1] << 8);
                t[15] &= 32767
              }

              function M(t, e, n) {
                for (var r = 0; r < 16; r++) t[r] = e[r] + n[r]
              }

              function N(t, e, n) {
                for (var r = 0; r < 16; r++) t[r] = e[r] - n[r]
              }

              function D(t, e, n) {
                var r, i, o = 0,
                  s = 0,
                  a = 0,
                  c = 0,
                  u = 0,
                  h = 0,
                  f = 0,
                  p = 0,
                  l = 0,
                  y = 0,
                  d = 0,
                  v = 0,
                  g = 0,
                  b = 0,
                  m = 0,
                  w = 0,
                  k = 0,
                  _ = 0,
                  S = 0,
                  E = 0,
                  A = 0,
                  T = 0,
                  O = 0,
                  C = 0,
                  P = 0,
                  x = 0,
                  L = 0,
                  U = 0,
                  R = 0,
                  B = 0,
                  I = 0,
                  j = n[0],
                  M = n[1],
                  N = n[2],
                  D = n[3],
                  z = n[4],
                  H = n[5],
                  q = n[6],
                  F = n[7],
                  X = n[8],
                  Y = n[9],
                  J = n[10],
                  K = n[11],
                  W = n[12],
                  V = n[13],
                  G = n[14],
                  Q = n[15];
                o += (r = e[0]) * j, s += r * M, a += r * N, c += r * D, u += r * z, h += r * H, f += r * q, p += r * F, l += r * X, y += r * Y, d += r * J, v += r * K, g += r * W, b += r * V, m += r * G, w += r * Q, s += (r = e[1]) * j, a += r * M, c += r * N, u += r * D, h += r * z, f += r * H, p += r * q, l += r * F, y += r * X, d += r * Y, v += r * J, g += r * K, b += r * W, m += r * V, w += r * G, k += r * Q, a += (r = e[2]) * j, c += r * M, u += r * N, h += r * D, f += r * z, p += r * H, l += r * q, y += r * F, d += r * X, v += r * Y, g += r * J, b += r * K, m += r * W, w += r * V, k += r * G, _ += r * Q, c += (r = e[3]) * j, u += r * M, h += r * N, f += r * D, p += r * z, l += r * H, y += r * q, d += r * F, v += r * X, g += r * Y, b += r * J, m += r * K, w += r * W, k += r * V, _ += r * G, S += r * Q, u += (r = e[4]) * j, h += r * M, f += r * N, p += r * D, l += r * z, y += r * H, d += r * q, v += r * F, g += r * X, b += r * Y, m += r * J, w += r * K, k += r * W, _ += r * V, S += r * G, E += r * Q, h += (r = e[5]) * j, f += r * M, p += r * N, l += r * D, y += r * z, d += r * H, v += r * q, g += r * F, b += r * X, m += r * Y, w += r * J, k += r * K, _ += r * W, S += r * V, E += r * G, A += r * Q, f += (r = e[6]) * j, p += r * M, l += r * N, y += r * D, d += r * z, v += r * H, g += r * q, b += r * F, m += r * X, w += r * Y, k += r * J, _ += r * K, S += r * W, E += r * V, A += r * G, T += r * Q, p += (r = e[7]) * j, l += r * M, y += r * N, d += r * D, v += r * z, g += r * H, b += r * q, m += r * F, w += r * X, k += r * Y, _ += r * J, S += r * K, E += r * W, A += r * V, T += r * G, O += r * Q, l += (r = e[8]) * j, y += r * M, d += r * N, v += r * D, g += r * z, b += r * H, m += r * q, w += r * F, k += r * X, _ += r * Y, S += r * J, E += r * K, A += r * W, T += r * V, O += r * G, C += r * Q, y += (r = e[9]) * j, d += r * M, v += r * N, g += r * D, b += r * z, m += r * H, w += r * q, k += r * F, _ += r * X, S += r * Y, E += r * J, A += r * K, T += r * W, O += r * V, C += r * G, P += r * Q, d += (r = e[10]) * j, v += r * M, g += r * N, b += r * D, m += r * z, w += r * H, k += r * q, _ += r * F, S += r * X, E += r * Y, A += r * J, T += r * K, O += r * W, C += r * V, P += r * G, x += r * Q, v += (r = e[11]) * j, g += r * M, b += r * N, m += r * D, w += r * z, k += r * H, _ += r * q, S += r * F, E += r * X, A += r * Y, T += r * J, O += r * K, C += r * W, P += r * V, x += r * G, L += r * Q, g += (r = e[12]) * j, b += r * M, m += r * N, w += r * D, k += r * z, _ += r * H, S += r * q, E += r * F, A += r * X, T += r * Y, O += r * J, C += r * K, P += r * W, x += r * V, L += r * G, U += r * Q, b += (r = e[13]) * j, m += r * M, w += r * N, k += r * D, _ += r * z, S += r * H, E += r * q, A += r * F, T += r * X, O += r * Y, C += r * J, P += r * K, x += r * W, L += r * V, U += r * G, R += r * Q, m += (r = e[14]) * j, w += r * M, k += r * N, _ += r * D, S += r * z, E += r * H, A += r * q, T += r * F, O += r * X, C += r * Y, P += r * J, x += r * K, L += r * W, U += r * V, R += r * G, B += r * Q, w += (r = e[15]) * j, s += 38 * (_ += r * N), a += 38 * (S += r * D), c += 38 * (E += r * z), u += 38 * (A += r * H), h += 38 * (T += r * q), f += 38 * (O += r * F), p += 38 * (C += r * X), l += 38 * (P += r * Y), y += 38 * (x += r * J), d += 38 * (L += r * K), v += 38 * (U += r * W), g += 38 * (R += r * V), b += 38 * (B += r * G), m += 38 * (I += r * Q), o = (r = (o += 38 * (k += r * M)) + (i = 1) + 65535) - 65536 * (i = Math.floor(r / 65536)), s = (r = s + i + 65535) - 65536 * (i = Math.floor(r / 65536)), a = (r = a + i + 65535) - 65536 * (i = Math.floor(r / 65536)), c = (r = c + i + 65535) - 65536 * (i = Math.floor(r / 65536)), u = (r = u + i + 65535) - 65536 * (i = Math.floor(r / 65536)), h = (r = h + i + 65535) - 65536 * (i = Math.floor(r / 65536)), f = (r = f + i + 65535) - 65536 * (i = Math.floor(r / 65536)), p = (r = p + i + 65535) - 65536 * (i = Math.floor(r / 65536)), l = (r = l + i + 65535) - 65536 * (i = Math.floor(r / 65536)), y = (r = y + i + 65535) - 65536 * (i = Math.floor(r / 65536)), d = (r = d + i + 65535) - 65536 * (i = Math.floor(r / 65536)), v = (r = v + i + 65535) - 65536 * (i = Math.floor(r / 65536)), g = (r = g + i + 65535) - 65536 * (i = Math.floor(r / 65536)), b = (r = b + i + 65535) - 65536 * (i = Math.floor(r / 65536)), m = (r = m + i + 65535) - 65536 * (i = Math.floor(r / 65536)), w = (r = w + i + 65535) - 65536 * (i = Math.floor(r / 65536)), o = (r = (o += i - 1 + 37 * (i - 1)) + (i = 1) + 65535) - 65536 * (i = Math.floor(r / 65536)), s = (r = s + i + 65535) - 65536 * (i = Math.floor(r / 65536)), a = (r = a + i + 65535) - 65536 * (i = Math.floor(r / 65536)), c = (r = c + i + 65535) - 65536 * (i = Math.floor(r / 65536)), u = (r = u + i + 65535) - 65536 * (i = Math.floor(r / 65536)), h = (r = h + i + 65535) - 65536 * (i = Math.floor(r / 65536)), f = (r = f + i + 65535) - 65536 * (i = Math.floor(r / 65536)), p = (r = p + i + 65535) - 65536 * (i = Math.floor(r / 65536)), l = (r = l + i + 65535) - 65536 * (i = Math.floor(r / 65536)), y = (r = y + i + 65535) - 65536 * (i = Math.floor(r / 65536)), d = (r = d + i + 65535) - 65536 * (i = Math.floor(r / 65536)), v = (r = v + i + 65535) - 65536 * (i = Math.floor(r / 65536)), g = (r = g + i + 65535) - 65536 * (i = Math.floor(r / 65536)), b = (r = b + i + 65535) - 65536 * (i = Math.floor(r / 65536)), m = (r = m + i + 65535) - 65536 * (i = Math.floor(r / 65536)), w = (r = w + i + 65535) - 65536 * (i = Math.floor(r / 65536)), o += i - 1 + 37 * (i - 1), t[0] = o, t[1] = s, t[2] = a, t[3] = c, t[4] = u, t[5] = h, t[6] = f, t[7] = p, t[8] = l, t[9] = y, t[10] = d, t[11] = v, t[12] = g, t[13] = b, t[14] = m, t[15] = w
              }

              function z(t, e) {
                D(t, e, e)
              }

              function H(t, n) {
                var r, i = e();
                for (r = 0; r < 16; r++) i[r] = n[r];
                for (r = 253; r >= 0; r--) z(i, i), 2 !== r && 4 !== r && D(i, i, n);
                for (r = 0; r < 16; r++) t[r] = i[r]
              }

              function q(t, n) {
                var r, i = e();
                for (r = 0; r < 16; r++) i[r] = n[r];
                for (r = 250; r >= 0; r--) z(i, i), 1 !== r && D(i, i, n);
                for (r = 0; r < 16; r++) t[r] = i[r]
              }

              function F(t, n, r) {
                var i, o, s = new Uint8Array(32),
                  a = new Float64Array(80),
                  u = e(),
                  h = e(),
                  f = e(),
                  p = e(),
                  l = e(),
                  y = e();
                for (o = 0; o < 31; o++) s[o] = n[o];
                for (s[31] = 127 & n[31] | 64, s[0] &= 248, j(a, r), o = 0; o < 16; o++) h[o] = a[o], p[o] = u[o] = f[o] = 0;
                for (u[0] = p[0] = 1, o = 254; o >= 0; --o) U(u, h, i = s[o >>> 3] >>> (7 & o) & 1), U(f, p, i), M(l, u, f), N(u, u, f), M(f, h, p), N(h, h, p), z(p, l), z(y, u), D(u, f, u), D(f, h, l), M(l, u, f), N(u, u, f), z(h, u), N(f, p, y), D(u, f, c), M(u, u, p), D(f, f, u), D(u, p, y), D(p, h, a), z(h, l), U(u, h, i), U(f, p, i);
                for (o = 0; o < 16; o++) a[o + 16] = u[o], a[o + 32] = f[o], a[o + 48] = h[o], a[o + 64] = p[o];
                var d = a.subarray(32),
                  v = a.subarray(16);
                return H(d, d), D(v, v, d), R(t, v), 0
              }

              function X(t, e) {
                return F(t, e, o)
              }

              function Y(t, e) {
                return r(e, 32), X(t, e)
              }

              function J(t, e, n) {
                var r = new Uint8Array(32);
                return F(r, n, e), m(t, i, r, w)
              }
              A.prototype.blocks = function (t, e, n) {
                for (var r, i, o, s, a, c, u, h, f, p, l, y, d, v, g, b, m, w, k, _ = this.fin ? 0 : 2048, S = this.h[0], E = this.h[1], A = this.h[2], T = this.h[3], O = this.h[4], C = this.h[5], P = this.h[6], x = this.h[7], L = this.h[8], U = this.h[9], R = this.r[0], B = this.r[1], I = this.r[2], j = this.r[3], M = this.r[4], N = this.r[5], D = this.r[6], z = this.r[7], H = this.r[8], q = this.r[9]; n >= 16;) p = f = 0, p += (S += 8191 & (r = 255 & t[e + 0] | (255 & t[e + 1]) << 8)) * R, p += (E += 8191 & (r >>> 13 | (i = 255 & t[e + 2] | (255 & t[e + 3]) << 8) << 3)) * (5 * q), p += (A += 8191 & (i >>> 10 | (o = 255 & t[e + 4] | (255 & t[e + 5]) << 8) << 6)) * (5 * H), p += (T += 8191 & (o >>> 7 | (s = 255 & t[e + 6] | (255 & t[e + 7]) << 8) << 9)) * (5 * z), f = (p += (O += 8191 & (s >>> 4 | (a = 255 & t[e + 8] | (255 & t[e + 9]) << 8) << 12)) * (5 * D)) >>> 13, p &= 8191, p += (C += a >>> 1 & 8191) * (5 * N), p += (P += 8191 & (a >>> 14 | (c = 255 & t[e + 10] | (255 & t[e + 11]) << 8) << 2)) * (5 * M), p += (x += 8191 & (c >>> 11 | (u = 255 & t[e + 12] | (255 & t[e + 13]) << 8) << 5)) * (5 * j), p += (L += 8191 & (u >>> 8 | (h = 255 & t[e + 14] | (255 & t[e + 15]) << 8) << 8)) * (5 * I), l = f += (p += (U += h >>> 5 | _) * (5 * B)) >>> 13, l += S * B, l += E * R, l += A * (5 * q), l += T * (5 * H), f = (l += O * (5 * z)) >>> 13, l &= 8191, l += C * (5 * D), l += P * (5 * N), l += x * (5 * M), l += L * (5 * j), f += (l += U * (5 * I)) >>> 13, l &= 8191, y = f, y += S * I, y += E * B, y += A * R, y += T * (5 * q), f = (y += O * (5 * H)) >>> 13, y &= 8191, y += C * (5 * z), y += P * (5 * D), y += x * (5 * N), y += L * (5 * M), d = f += (y += U * (5 * j)) >>> 13, d += S * j, d += E * I, d += A * B, d += T * R, f = (d += O * (5 * q)) >>> 13, d &= 8191, d += C * (5 * H), d += P * (5 * z), d += x * (5 * D), d += L * (5 * N), v = f += (d += U * (5 * M)) >>> 13, v += S * M, v += E * j, v += A * I, v += T * B, f = (v += O * R) >>> 13, v &= 8191, v += C * (5 * q), v += P * (5 * H), v += x * (5 * z), v += L * (5 * D), g = f += (v += U * (5 * N)) >>> 13, g += S * N, g += E * M, g += A * j, g += T * I, f = (g += O * B) >>> 13, g &= 8191, g += C * R, g += P * (5 * q), g += x * (5 * H), g += L * (5 * z), b = f += (g += U * (5 * D)) >>> 13, b += S * D, b += E * N, b += A * M, b += T * j, f = (b += O * I) >>> 13, b &= 8191, b += C * B, b += P * R, b += x * (5 * q), b += L * (5 * H), m = f += (b += U * (5 * z)) >>> 13, m += S * z, m += E * D, m += A * N, m += T * M, f = (m += O * j) >>> 13, m &= 8191, m += C * I, m += P * B, m += x * R, m += L * (5 * q), w = f += (m += U * (5 * H)) >>> 13, w += S * H, w += E * z, w += A * D, w += T * N, f = (w += O * M) >>> 13, w &= 8191, w += C * j, w += P * I, w += x * B, w += L * R, k = f += (w += U * (5 * q)) >>> 13, k += S * q, k += E * H, k += A * z, k += T * D, f = (k += O * N) >>> 13, k &= 8191, k += C * M, k += P * j, k += x * I, k += L * B, S = p = 8191 & (f = (f = ((f += (k += U * R) >>> 13) << 2) + f | 0) + (p &= 8191) | 0), E = l += f >>>= 13, A = y &= 8191, T = d &= 8191, O = v &= 8191, C = g &= 8191, P = b &= 8191, x = m &= 8191, L = w &= 8191, U = k &= 8191, e += 16, n -= 16;
                this.h[0] = S, this.h[1] = E, this.h[2] = A, this.h[3] = T, this.h[4] = O, this.h[5] = C, this.h[6] = P, this.h[7] = x, this.h[8] = L, this.h[9] = U
              }, A.prototype.finish = function (t, e) {
                var n, r, i, o, s = new Uint16Array(10);
                if (this.leftover) {
                  for (o = this.leftover, this.buffer[o++] = 1; o < 16; o++) this.buffer[o] = 0;
                  this.fin = 1, this.blocks(this.buffer, 0, 16)
                }
                for (n = this.h[1] >>> 13, this.h[1] &= 8191, o = 2; o < 10; o++) this.h[o] += n, n = this.h[o] >>> 13, this.h[o] &= 8191;
                for (this.h[0] += 5 * n, n = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += n, n = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += n, s[0] = this.h[0] + 5, n = s[0] >>> 13, s[0] &= 8191, o = 1; o < 10; o++) s[o] = this.h[o] + n, n = s[o] >>> 13, s[o] &= 8191;
                for (s[9] -= 8192, r = (1 ^ n) - 1, o = 0; o < 10; o++) s[o] &= r;
                for (r = ~r, o = 0; o < 10; o++) this.h[o] = this.h[o] & r | s[o];
                for (this.h[0] = 65535 & (this.h[0] | this.h[1] << 13), this.h[1] = 65535 & (this.h[1] >>> 3 | this.h[2] << 10), this.h[2] = 65535 & (this.h[2] >>> 6 | this.h[3] << 7), this.h[3] = 65535 & (this.h[3] >>> 9 | this.h[4] << 4), this.h[4] = 65535 & (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14), this.h[5] = 65535 & (this.h[6] >>> 2 | this.h[7] << 11), this.h[6] = 65535 & (this.h[7] >>> 5 | this.h[8] << 8), this.h[7] = 65535 & (this.h[8] >>> 8 | this.h[9] << 5), i = this.h[0] + this.pad[0], this.h[0] = 65535 & i, o = 1; o < 8; o++) i = (this.h[o] + this.pad[o] | 0) + (i >>> 16) | 0, this.h[o] = 65535 & i;
                t[e + 0] = this.h[0] >>> 0 & 255, t[e + 1] = this.h[0] >>> 8 & 255, t[e + 2] = this.h[1] >>> 0 & 255, t[e + 3] = this.h[1] >>> 8 & 255, t[e + 4] = this.h[2] >>> 0 & 255, t[e + 5] = this.h[2] >>> 8 & 255, t[e + 6] = this.h[3] >>> 0 & 255, t[e + 7] = this.h[3] >>> 8 & 255, t[e + 8] = this.h[4] >>> 0 & 255, t[e + 9] = this.h[4] >>> 8 & 255, t[e + 10] = this.h[5] >>> 0 & 255, t[e + 11] = this.h[5] >>> 8 & 255, t[e + 12] = this.h[6] >>> 0 & 255, t[e + 13] = this.h[6] >>> 8 & 255, t[e + 14] = this.h[7] >>> 0 & 255, t[e + 15] = this.h[7] >>> 8 & 255
              }, A.prototype.update = function (t, e, n) {
                var r, i;
                if (this.leftover) {
                  for ((i = 16 - this.leftover) > n && (i = n), r = 0; r < i; r++) this.buffer[this.leftover + r] = t[e + r];
                  if (n -= i, e += i, this.leftover += i, this.leftover < 16) return;
                  this.blocks(this.buffer, 0, 16), this.leftover = 0
                }
                if (n >= 16 && (i = n - n % 16, this.blocks(t, e, i), e += i, n -= i), n) {
                  for (r = 0; r < n; r++) this.buffer[this.leftover + r] = t[e + r];
                  this.leftover += n
                }
              };
              var K = C,
                W = P,
                V = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

              function G(t, e, n, r) {
                for (var i, o, s, a, c, u, h, f, p, l, y, d, v, g, b, m, w, k, _, S, E, A, T, O, C, P, x = new Int32Array(16), L = new Int32Array(16), U = t[0], R = t[1], B = t[2], I = t[3], j = t[4], M = t[5], N = t[6], D = t[7], z = e[0], H = e[1], q = e[2], F = e[3], X = e[4], Y = e[5], J = e[6], K = e[7], W = 0; r >= 128;) {
                  for (_ = 0; _ < 16; _++) S = 8 * _ + W, x[_] = n[S + 0] << 24 | n[S + 1] << 16 | n[S + 2] << 8 | n[S + 3], L[_] = n[S + 4] << 24 | n[S + 5] << 16 | n[S + 6] << 8 | n[S + 7];
                  for (_ = 0; _ < 80; _++)
                    if (i = U, o = R, s = B, a = I, c = j, u = M, h = N, p = z, l = H, y = q, d = F, v = X, g = Y, b = J, T = 65535 & (A = K), O = A >>> 16, C = 65535 & (E = D), P = E >>> 16, T += 65535 & (A = (X >>> 14 | j << 18) ^ (X >>> 18 | j << 14) ^ (j >>> 9 | X << 23)), O += A >>> 16, C += 65535 & (E = (j >>> 14 | X << 18) ^ (j >>> 18 | X << 14) ^ (X >>> 9 | j << 23)), P += E >>> 16, T += 65535 & (A = X & Y ^ ~X & J), O += A >>> 16, C += 65535 & (E = j & M ^ ~j & N), P += E >>> 16, T += 65535 & (A = V[2 * _ + 1]), O += A >>> 16, C += 65535 & (E = V[2 * _]), P += E >>> 16, E = x[_ % 16], O += (A = L[_ % 16]) >>> 16, C += 65535 & E, P += E >>> 16, C += (O += (T += 65535 & A) >>> 16) >>> 16, T = 65535 & (A = k = 65535 & T | O << 16), O = A >>> 16, C = 65535 & (E = w = 65535 & C | (P += C >>> 16) << 16), P = E >>> 16, T += 65535 & (A = (z >>> 28 | U << 4) ^ (U >>> 2 | z << 30) ^ (U >>> 7 | z << 25)), O += A >>> 16, C += 65535 & (E = (U >>> 28 | z << 4) ^ (z >>> 2 | U << 30) ^ (z >>> 7 | U << 25)), P += E >>> 16, O += (A = z & H ^ z & q ^ H & q) >>> 16, C += 65535 & (E = U & R ^ U & B ^ R & B), P += E >>> 16, f = 65535 & (C += (O += (T += 65535 & A) >>> 16) >>> 16) | (P += C >>> 16) << 16, m = 65535 & T | O << 16, T = 65535 & (A = d), O = A >>> 16, C = 65535 & (E = a), P = E >>> 16, O += (A = k) >>> 16, C += 65535 & (E = w), P += E >>> 16, R = i, B = o, I = s, j = a = 65535 & (C += (O += (T += 65535 & A) >>> 16) >>> 16) | (P += C >>> 16) << 16, M = c, N = u, D = h, U = f, H = p, q = l, F = y, X = d = 65535 & T | O << 16, Y = v, J = g, K = b, z = m, _ % 16 == 15)
                      for (S = 0; S < 16; S++) E = x[S], T = 65535 & (A = L[S]), O = A >>> 16, C = 65535 & E, P = E >>> 16, E = x[(S + 9) % 16], T += 65535 & (A = L[(S + 9) % 16]), O += A >>> 16, C += 65535 & E, P += E >>> 16, w = x[(S + 1) % 16], T += 65535 & (A = ((k = L[(S + 1) % 16]) >>> 1 | w << 31) ^ (k >>> 8 | w << 24) ^ (k >>> 7 | w << 25)), O += A >>> 16, C += 65535 & (E = (w >>> 1 | k << 31) ^ (w >>> 8 | k << 24) ^ w >>> 7), P += E >>> 16, w = x[(S + 14) % 16], O += (A = ((k = L[(S + 14) % 16]) >>> 19 | w << 13) ^ (w >>> 29 | k << 3) ^ (k >>> 6 | w << 26)) >>> 16, C += 65535 & (E = (w >>> 19 | k << 13) ^ (k >>> 29 | w << 3) ^ w >>> 6), P += E >>> 16, P += (C += (O += (T += 65535 & A) >>> 16) >>> 16) >>> 16, x[S] = 65535 & C | P << 16, L[S] = 65535 & T | O << 16;
                  T = 65535 & (A = z), O = A >>> 16, C = 65535 & (E = U), P = E >>> 16, E = t[0], O += (A = e[0]) >>> 16, C += 65535 & E, P += E >>> 16, P += (C += (O += (T += 65535 & A) >>> 16) >>> 16) >>> 16, t[0] = U = 65535 & C | P << 16, e[0] = z = 65535 & T | O << 16, T = 65535 & (A = H), O = A >>> 16, C = 65535 & (E = R), P = E >>> 16, E = t[1], O += (A = e[1]) >>> 16, C += 65535 & E, P += E >>> 16, P += (C += (O += (T += 65535 & A) >>> 16) >>> 16) >>> 16, t[1] = R = 65535 & C | P << 16, e[1] = H = 65535 & T | O << 16, T = 65535 & (A = q), O = A >>> 16, C = 65535 & (E = B), P = E >>> 16, E = t[2], O += (A = e[2]) >>> 16, C += 65535 & E, P += E >>> 16, P += (C += (O += (T += 65535 & A) >>> 16) >>> 16) >>> 16, t[2] = B = 65535 & C | P << 16, e[2] = q = 65535 & T | O << 16, T = 65535 & (A = F), O = A >>> 16, C = 65535 & (E = I), P = E >>> 16, E = t[3], O += (A = e[3]) >>> 16, C += 65535 & E, P += E >>> 16, P += (C += (O += (T += 65535 & A) >>> 16) >>> 16) >>> 16, t[3] = I = 65535 & C | P << 16, e[3] = F = 65535 & T | O << 16, T = 65535 & (A = X), O = A >>> 16, C = 65535 & (E = j), P = E >>> 16, E = t[4], O += (A = e[4]) >>> 16, C += 65535 & E, P += E >>> 16, P += (C += (O += (T += 65535 & A) >>> 16) >>> 16) >>> 16, t[4] = j = 65535 & C | P << 16, e[4] = X = 65535 & T | O << 16, T = 65535 & (A = Y), O = A >>> 16, C = 65535 & (E = M), P = E >>> 16, E = t[5], O += (A = e[5]) >>> 16, C += 65535 & E, P += E >>> 16, P += (C += (O += (T += 65535 & A) >>> 16) >>> 16) >>> 16, t[5] = M = 65535 & C | P << 16, e[5] = Y = 65535 & T | O << 16, T = 65535 & (A = J), O = A >>> 16, C = 65535 & (E = N), P = E >>> 16, E = t[6], O += (A = e[6]) >>> 16, C += 65535 & E, P += E >>> 16, P += (C += (O += (T += 65535 & A) >>> 16) >>> 16) >>> 16, t[6] = N = 65535 & C | P << 16, e[6] = J = 65535 & T | O << 16, T = 65535 & (A = K), O = A >>> 16, C = 65535 & (E = D), P = E >>> 16, E = t[7], O += (A = e[7]) >>> 16, C += 65535 & E, P += E >>> 16, P += (C += (O += (T += 65535 & A) >>> 16) >>> 16) >>> 16, t[7] = D = 65535 & C | P << 16, e[7] = K = 65535 & T | O << 16, W += 128, r -= 128
                }
                return r
              }

              function Q(t, e, n) {
                var r, i = new Int32Array(8),
                  o = new Int32Array(8),
                  s = new Uint8Array(256),
                  a = n;
                for (i[0] = 1779033703, i[1] = 3144134277, i[2] = 1013904242, i[3] = 2773480762, i[4] = 1359893119, i[5] = 2600822924, i[6] = 528734635, i[7] = 1541459225, o[0] = 4089235720, o[1] = 2227873595, o[2] = 4271175723, o[3] = 1595750129, o[4] = 2917565137, o[5] = 725511199, o[6] = 4215389547, o[7] = 327033209, G(i, o, e, n), n %= 128, r = 0; r < n; r++) s[r] = e[a - n + r];
                for (s[n] = 128, s[(n = 256 - 128 * (n < 112 ? 1 : 0)) - 9] = 0, y(s, n - 8, a / 536870912 | 0, a << 3), G(i, o, s, n), r = 0; r < 8; r++) y(t, 8 * r, i[r], o[r]);
                return 0
              }

              function Z(t, n) {
                var r = e(),
                  i = e(),
                  o = e(),
                  s = e(),
                  a = e(),
                  c = e(),
                  u = e(),
                  f = e(),
                  p = e();
                N(r, t[1], t[0]), N(p, n[1], n[0]), D(r, r, p), M(i, t[0], t[1]), M(p, n[0], n[1]), D(i, i, p), D(o, t[3], n[3]), D(o, o, h), D(s, t[2], n[2]), M(s, s, s), N(a, i, r), N(c, s, o), M(u, s, o), M(f, i, r), D(t[0], a, c), D(t[1], f, u), D(t[2], u, c), D(t[3], a, f)
              }

              function $(t, e, n) {
                var r;
                for (r = 0; r < 4; r++) U(t[r], e[r], n)
              }

              function tt(t, n) {
                var r = e(),
                  i = e(),
                  o = e();
                H(o, n[2]), D(r, n[0], o), D(i, n[1], o), R(t, i), t[31] ^= I(r) << 7
              }

              function et(t, e, n) {
                var r, i;
                for (x(t[0], s), x(t[1], a), x(t[2], a), x(t[3], s), i = 255; i >= 0; --i) $(t, e, r = n[i / 8 | 0] >> (7 & i) & 1), Z(e, t), Z(t, t), $(t, e, r)
              }

              function nt(t, n) {
                var r = [e(), e(), e(), e()];
                x(r[0], f), x(r[1], p), x(r[2], a), D(r[3], f, p), et(t, r, n)
              }

              function rt(t, n, i) {
                var o, s = new Uint8Array(64),
                  a = [e(), e(), e(), e()];
                for (i || r(n, 32), Q(s, n, 32), s[0] &= 248, s[31] &= 127, s[31] |= 64, nt(a, s), tt(t, a), o = 0; o < 32; o++) n[o + 32] = t[o];
                return 0
              }
              var it = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);

              function ot(t, e) {
                var n, r, i, o;
                for (r = 63; r >= 32; --r) {
                  for (n = 0, i = r - 32, o = r - 12; i < o; ++i) e[i] += n - 16 * e[r] * it[i - (r - 32)], n = e[i] + 128 >> 8, e[i] -= 256 * n;
                  e[i] += n, e[r] = 0
                }
                for (n = 0, i = 0; i < 32; i++) e[i] += n - (e[31] >> 4) * it[i], n = e[i] >> 8, e[i] &= 255;
                for (i = 0; i < 32; i++) e[i] -= n * it[i];
                for (r = 0; r < 32; r++) e[r + 1] += e[r] >> 8, t[r] = 255 & e[r]
              }

              function st(t) {
                var e, n = new Float64Array(64);
                for (e = 0; e < 64; e++) n[e] = t[e];
                for (e = 0; e < 64; e++) t[e] = 0;
                ot(t, n)
              }

              function at(t, n, r, i) {
                var o, s, a = new Uint8Array(64),
                  c = new Uint8Array(64),
                  u = new Uint8Array(64),
                  h = new Float64Array(64),
                  f = [e(), e(), e(), e()];
                Q(a, i, 32), a[0] &= 248, a[31] &= 127, a[31] |= 64;
                var p = r + 64;
                for (o = 0; o < r; o++) t[64 + o] = n[o];
                for (o = 0; o < 32; o++) t[32 + o] = a[32 + o];
                for (Q(u, t.subarray(32), r + 32), st(u), nt(f, u), tt(t, f), o = 32; o < 64; o++) t[o] = i[o];
                for (Q(c, t, r + 64), st(c), o = 0; o < 64; o++) h[o] = 0;
                for (o = 0; o < 32; o++) h[o] = u[o];
                for (o = 0; o < 32; o++)
                  for (s = 0; s < 32; s++) h[o + s] += c[o] * a[s];
                return ot(t.subarray(32), h), p
              }

              function ct(t, n, r, i) {
                var o, c = new Uint8Array(32),
                  h = new Uint8Array(64),
                  f = [e(), e(), e(), e()],
                  p = [e(), e(), e(), e()];
                if (r < 64) return -1;
                if (function (t, n) {
                    var r = e(),
                      i = e(),
                      o = e(),
                      c = e(),
                      h = e(),
                      f = e(),
                      p = e();
                    return x(t[2], a), j(t[1], n), z(o, t[1]), D(c, o, u), N(o, o, t[2]), M(c, t[2], c), z(h, c), z(f, h), D(p, f, h), D(r, p, o), D(r, r, c), q(r, r), D(r, r, o), D(r, r, c), D(r, r, c), D(t[0], r, c), z(i, t[0]), D(i, i, c), B(i, o) && D(t[0], t[0], l), z(i, t[0]), D(i, i, c), B(i, o) ? -1 : (I(t[0]) === n[31] >> 7 && N(t[0], s, t[0]), D(t[3], t[0], t[1]), 0)
                  }(p, i)) return -1;
                for (o = 0; o < r; o++) t[o] = n[o];
                for (o = 0; o < 32; o++) t[o + 32] = i[o];
                if (Q(h, t, r), st(h), et(f, p, h), nt(p, n.subarray(32)), Z(f, p), tt(c, f), r -= 64, g(n, 0, c, 0)) {
                  for (o = 0; o < r; o++) t[o] = 0;
                  return -1
                }
                for (o = 0; o < r; o++) t[o] = n[o + 64];
                return r
              }
              var ut, ht = 16,
                ft = 64,
                pt = 32,
                lt = 64;

              function yt(t, e) {
                if (32 !== t.length) throw new Error("bad key size");
                if (24 !== e.length) throw new Error("bad nonce size")
              }

              function dt() {
                for (var t = 0; t < arguments.length; t++)
                  if (!(arguments[t] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array")
              }

              function vt(t) {
                for (var e = 0; e < t.length; e++) t[e] = 0
              }
              t.lowlevel = {
                crypto_core_hsalsa20: m,
                crypto_stream_xor: E,
                crypto_stream: S,
                crypto_stream_salsa20_xor: k,
                crypto_stream_salsa20: _,
                crypto_onetimeauth: T,
                crypto_onetimeauth_verify: O,
                crypto_verify_16: v,
                crypto_verify_32: g,
                crypto_secretbox: C,
                crypto_secretbox_open: P,
                crypto_scalarmult: F,
                crypto_scalarmult_base: X,
                crypto_box_beforenm: J,
                crypto_box_afternm: K,
                crypto_box: function (t, e, n, r, i, o) {
                  var s = new Uint8Array(32);
                  return J(s, i, o), K(t, e, n, r, s)
                },
                crypto_box_open: function (t, e, n, r, i, o) {
                  var s = new Uint8Array(32);
                  return J(s, i, o), W(t, e, n, r, s)
                },
                crypto_box_keypair: Y,
                crypto_hash: Q,
                crypto_sign: at,
                crypto_sign_keypair: rt,
                crypto_sign_open: ct,
                crypto_secretbox_KEYBYTES: 32,
                crypto_secretbox_NONCEBYTES: 24,
                crypto_secretbox_ZEROBYTES: 32,
                crypto_secretbox_BOXZEROBYTES: ht,
                crypto_scalarmult_BYTES: 32,
                crypto_scalarmult_SCALARBYTES: 32,
                crypto_box_PUBLICKEYBYTES: 32,
                crypto_box_SECRETKEYBYTES: 32,
                crypto_box_BEFORENMBYTES: 32,
                crypto_box_NONCEBYTES: 24,
                crypto_box_ZEROBYTES: 32,
                crypto_box_BOXZEROBYTES: 16,
                crypto_sign_BYTES: ft,
                crypto_sign_PUBLICKEYBYTES: pt,
                crypto_sign_SECRETKEYBYTES: lt,
                crypto_sign_SEEDBYTES: 32,
                crypto_hash_BYTES: 64,
                gf: e,
                D: u,
                L: it,
                pack25519: R,
                unpack25519: j,
                M: D,
                A: M,
                S: z,
                Z: N,
                pow2523: q,
                add: Z,
                set25519: x,
                modL: ot,
                scalarmult: et,
                scalarbase: nt
              }, t.randomBytes = function (t) {
                var e = new Uint8Array(t);
                return r(e, t), e
              }, t.secretbox = function (t, e, n) {
                dt(t, e, n), yt(n, e);
                for (var r = new Uint8Array(32 + t.length), i = new Uint8Array(r.length), o = 0; o < t.length; o++) r[o + 32] = t[o];
                return C(i, r, r.length, e, n), i.subarray(ht)
              }, t.secretbox.open = function (t, e, n) {
                dt(t, e, n), yt(n, e);
                for (var r = new Uint8Array(ht + t.length), i = new Uint8Array(r.length), o = 0; o < t.length; o++) r[o + ht] = t[o];
                return r.length < 32 || 0 !== P(i, r, r.length, e, n) ? null : i.subarray(32)
              }, t.secretbox.keyLength = 32, t.secretbox.nonceLength = 24, t.secretbox.overheadLength = ht, t.scalarMult = function (t, e) {
                if (dt(t, e), 32 !== t.length) throw new Error("bad n size");
                if (32 !== e.length) throw new Error("bad p size");
                var n = new Uint8Array(32);
                return F(n, t, e), n
              }, t.scalarMult.base = function (t) {
                if (dt(t), 32 !== t.length) throw new Error("bad n size");
                var e = new Uint8Array(32);
                return X(e, t), e
              }, t.scalarMult.scalarLength = 32, t.scalarMult.groupElementLength = 32, t.box = function (e, n, r, i) {
                var o = t.box.before(r, i);
                return t.secretbox(e, n, o)
              }, t.box.before = function (t, e) {
                dt(t, e),
                  function (t, e) {
                    if (32 !== t.length) throw new Error("bad public key size");
                    if (32 !== e.length) throw new Error("bad secret key size")
                  }(t, e);
                var n = new Uint8Array(32);
                return J(n, t, e), n
              }, t.box.after = t.secretbox, t.box.open = function (e, n, r, i) {
                var o = t.box.before(r, i);
                return t.secretbox.open(e, n, o)
              }, t.box.open.after = t.secretbox.open, t.box.keyPair = function () {
                var t = new Uint8Array(32),
                  e = new Uint8Array(32);
                return Y(t, e), {
                  publicKey: t,
                  secretKey: e
                }
              }, t.box.keyPair.fromSecretKey = function (t) {
                if (dt(t), 32 !== t.length) throw new Error("bad secret key size");
                var e = new Uint8Array(32);
                return X(e, t), {
                  publicKey: e,
                  secretKey: new Uint8Array(t)
                }
              }, t.box.publicKeyLength = 32, t.box.secretKeyLength = 32, t.box.sharedKeyLength = 32, t.box.nonceLength = 24, t.box.overheadLength = t.secretbox.overheadLength, t.sign = function (t, e) {
                if (dt(t, e), e.length !== lt) throw new Error("bad secret key size");
                var n = new Uint8Array(ft + t.length);
                return at(n, t, t.length, e), n
              }, t.sign.open = function (t, e) {
                if (dt(t, e), e.length !== pt) throw new Error("bad public key size");
                var n = new Uint8Array(t.length),
                  r = ct(n, t, t.length, e);
                if (r < 0) return null;
                for (var i = new Uint8Array(r), o = 0; o < i.length; o++) i[o] = n[o];
                return i
              }, t.sign.detached = function (e, n) {
                for (var r = t.sign(e, n), i = new Uint8Array(ft), o = 0; o < i.length; o++) i[o] = r[o];
                return i
              }, t.sign.detached.verify = function (t, e, n) {
                if (dt(t, e, n), e.length !== ft) throw new Error("bad signature size");
                if (n.length !== pt) throw new Error("bad public key size");
                var r, i = new Uint8Array(ft + t.length),
                  o = new Uint8Array(ft + t.length);
                for (r = 0; r < ft; r++) i[r] = e[r];
                for (r = 0; r < t.length; r++) i[r + ft] = t[r];
                return ct(o, i, i.length, n) >= 0
              }, t.sign.keyPair = function () {
                var t = new Uint8Array(pt),
                  e = new Uint8Array(lt);
                return rt(t, e), {
                  publicKey: t,
                  secretKey: e
                }
              }, t.sign.keyPair.fromSecretKey = function (t) {
                if (dt(t), t.length !== lt) throw new Error("bad secret key size");
                for (var e = new Uint8Array(pt), n = 0; n < e.length; n++) e[n] = t[32 + n];
                return {
                  publicKey: e,
                  secretKey: new Uint8Array(t)
                }
              }, t.sign.keyPair.fromSeed = function (t) {
                if (dt(t), 32 !== t.length) throw new Error("bad seed size");
                for (var e = new Uint8Array(pt), n = new Uint8Array(lt), r = 0; r < 32; r++) n[r] = t[r];
                return rt(e, n, !0), {
                  publicKey: e,
                  secretKey: n
                }
              }, t.sign.publicKeyLength = pt, t.sign.secretKeyLength = lt, t.sign.seedLength = 32, t.sign.signatureLength = ft, t.hash = function (t) {
                dt(t);
                var e = new Uint8Array(64);
                return Q(e, t, t.length), e
              }, t.hash.hashLength = 64, t.verify = function (t, e) {
                return dt(t, e), 0 !== t.length && 0 !== e.length && t.length === e.length && 0 === d(t, 0, e, 0, t.length)
              }, t.setPRNG = function (t) {
                r = t
              }, (ut = "undefined" != typeof self ? self.crypto || self.msCrypto : null) && ut.getRandomValues ? t.setPRNG((function (t, e) {
                var n, r = new Uint8Array(e);
                for (n = 0; n < e; n += 65536) ut.getRandomValues(r.subarray(n, n + Math.min(e - n, 65536)));
                for (n = 0; n < e; n++) t[n] = r[n];
                vt(r)
              })) : (ut = n(3)) && ut.randomBytes && t.setPRNG((function (t, e) {
                var n, r = ut.randomBytes(e);
                for (n = 0; n < e; n++) t[n] = r[n];
                vt(r)
              }))
            }(t.exports ? t.exports : self.nacl = self.nacl || {})
          }, function (t, e, n) {
            ! function (e, n) {
              "use strict";
              t.exports ? t.exports = n() : (e.nacl || (e.nacl = {}), e.nacl.util = n())
            }(this, (function () {
              "use strict";
              var t = {};

              function e(t) {
                if (!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(t)) throw new TypeError("invalid encoding")
              }
              return t.decodeUTF8 = function (t) {
                if ("string" != typeof t) throw new TypeError("expected string");
                var e, n = unescape(encodeURIComponent(t)),
                  r = new Uint8Array(n.length);
                for (e = 0; e < n.length; e++) r[e] = n.charCodeAt(e);
                return r
              }, t.encodeUTF8 = function (t) {
                var e, n = [];
                for (e = 0; e < t.length; e++) n.push(String.fromCharCode(t[e]));
                return decodeURIComponent(escape(n.join("")))
              }, "undefined" == typeof atob ? void 0 !== i.from ? (t.encodeBase64 = function (t) {
                return i.from(t).toString("base64")
              }, t.decodeBase64 = function (t) {
                return e(t), new Uint8Array(Array.prototype.slice.call(i.from(t, "base64"), 0))
              }) : (t.encodeBase64 = function (t) {
                return new i(t).toString("base64")
              }, t.decodeBase64 = function (t) {
                return e(t), new Uint8Array(Array.prototype.slice.call(new i(t, "base64"), 0))
              }) : (t.encodeBase64 = function (t) {
                var e, n = [],
                  r = t.length;
                for (e = 0; e < r; e++) n.push(String.fromCharCode(t[e]));
                return btoa(n.join(""))
              }, t.decodeBase64 = function (t) {
                e(t);
                var n, r = atob(t),
                  i = new Uint8Array(r.length);
                for (n = 0; n < r.length; n++) i[n] = r.charCodeAt(n);
                return i
              }), t
            }))
          }, function (t, e, n) {
            t.exports = n(4).default
          }, function (t, e) {}, function (t, e, n) {
            "use strict";
            n.r(e);
            for (var r = function () {
                function t(t, e) {
                  this.lastId = 0, this.prefix = t, this.name = e
                }
                return t.prototype.create = function (t) {
                  this.lastId++;
                  var e = this.lastId,
                    n = this.prefix + e,
                    r = this.name + "[" + e + "]",
                    i = !1,
                    o = function () {
                      i || (t.apply(null, arguments), i = !0)
                    };
                  return this[e] = o, {
                    number: e,
                    id: n,
                    name: r,
                    callback: o
                  }
                }, t.prototype.remove = function (t) {
                  delete this[t.number]
                }, t
              }(), i = new r("_pusher_script_", "Pusher.ScriptReceivers"), o = {
                VERSION: "5.1.1",
                PROTOCOL: 7,
                host: "ws.pusherapp.com",
                ws_port: 80,
                wss_port: 443,
                ws_path: "",
                sockjs_host: "sockjs.pusher.com",
                sockjs_http_port: 80,
                sockjs_https_port: 443,
                sockjs_path: "/pusher",
                stats_host: "stats.pusher.com",
                channel_auth_endpoint: "/pusher/auth",
                channel_auth_transport: "ajax",
                activity_timeout: 12e4,
                pong_timeout: 3e4,
                unavailable_timeout: 1e4,
                cdn_http: "http://js.pusher.com",
                cdn_https: "https://js.pusher.com",
                dependency_suffix: ""
              }, s = function () {
                function t(t) {
                  this.options = t, this.receivers = t.receivers || i, this.loading = {}
                }
                return t.prototype.load = function (t, e, n) {
                  var r = this;
                  if (r.loading[t] && r.loading[t].length > 0) r.loading[t].push(n);
                  else {
                    r.loading[t] = [n];
                    var i = we.createScriptRequest(r.getPath(t, e)),
                      o = r.receivers.create((function (e) {
                        if (r.receivers.remove(o), r.loading[t]) {
                          var n = r.loading[t];
                          delete r.loading[t];
                          for (var s = function (t) {
                              t || i.cleanup()
                            }, a = 0; a < n.length; a++) n[a](e, s)
                        }
                      }));
                    i.send(o)
                  }
                }, t.prototype.getRoot = function (t) {
                  var e = we.getDocument().location.protocol;
                  return (t && t.useTLS || "https:" === e ? this.options.cdn_https : this.options.cdn_http).replace(/\/*$/, "") + "/" + this.options.version
                }, t.prototype.getPath = function (t, e) {
                  return this.getRoot(e) + "/" + t + this.options.suffix + ".js"
                }, t
              }(), a = new r("_pusher_dependencies", "Pusher.DependenciesReceivers"), c = new s({
                cdn_http: o.cdn_http,
                cdn_https: o.cdn_https,
                version: o.VERSION,
                suffix: o.dependency_suffix,
                receivers: a
              }), u = String.fromCharCode, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = {}, p = 0, l = h.length; p < l; p++) f[h.charAt(p)] = p;
            var y, d = function (t) {
                var e = t.charCodeAt(0);
                return e < 128 ? t : e < 2048 ? u(192 | e >>> 6) + u(128 | 63 & e) : u(224 | e >>> 12 & 15) + u(128 | e >>> 6 & 63) + u(128 | 63 & e)
              },
              v = function (t) {
                return t.replace(/[^\x00-\x7F]/g, d)
              },
              g = function (t) {
                var e = [0, 2, 1][t.length % 3],
                  n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0);
                return [h.charAt(n >>> 18), h.charAt(n >>> 12 & 63), e >= 2 ? "=" : h.charAt(n >>> 6 & 63), e >= 1 ? "=" : h.charAt(63 & n)].join("")
              },
              b = window.btoa || function (t) {
                return t.replace(/[\s\S]{1,3}/g, g)
              },
              m = function () {
                function t(t, e, n, r) {
                  var i = this;
                  this.clear = e, this.timer = t((function () {
                    i.timer && (i.timer = r(i.timer))
                  }), n)
                }
                return t.prototype.isRunning = function () {
                  return null !== this.timer
                }, t.prototype.ensureAborted = function () {
                  this.timer && (this.clear(this.timer), this.timer = null)
                }, t
              }(),
              w = (y = function (t, e) {
                return (y = Object.setPrototypeOf || {
                    __proto__: []
                  }
                  instanceof Array && function (t, e) {
                    t.__proto__ = e
                  } || function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  })(t, e)
              }, function (t, e) {
                function n() {
                  this.constructor = t
                }
                y(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
              });

            function k(t) {
              window.clearTimeout(t)
            }

            function _(t) {
              window.clearInterval(t)
            }
            var S = function (t) {
                function e(e, n) {
                  return t.call(this, setTimeout, k, e, (function (t) {
                    return n(), null
                  })) || this
                }
                return w(e, t), e
              }(m),
              E = function (t) {
                function e(e, n) {
                  return t.call(this, setInterval, _, e, (function (t) {
                    return n(), t
                  })) || this
                }
                return w(e, t), e
              }(m),
              A = {
                now: function () {
                  return Date.now ? Date.now() : (new Date).valueOf()
                },
                defer: function (t) {
                  return new S(0, t)
                },
                method: function (t) {
                  for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                  var r = Array.prototype.slice.call(arguments, 1);
                  return function (e) {
                    return e[t].apply(e, r.concat(arguments))
                  }
                }
              };

            function T(t) {
              for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
              for (var r = 0; r < e.length; r++) {
                var i = e[r];
                for (var o in i) i[o] && i[o].constructor && i[o].constructor === Object ? t[o] = T(t[o] || {}, i[o]) : t[o] = i[o]
              }
              return t
            }

            function O() {
              for (var t = ["Pusher"], e = 0; e < arguments.length; e++) "string" == typeof arguments[e] ? t.push(arguments[e]) : t.push(N(arguments[e]));
              return t.join(" : ")
            }

            function C(t, e) {
              var n = Array.prototype.indexOf;
              if (null === t) return -1;
              if (n && t.indexOf === n) return t.indexOf(e);
              for (var r = 0, i = t.length; r < i; r++)
                if (t[r] === e) return r;
              return -1
            }

            function P(t, e) {
              for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(t[n], n, t)
            }

            function x(t) {
              var e = [];
              return P(t, (function (t, n) {
                e.push(n)
              })), e
            }

            function L(t, e, n) {
              for (var r = 0; r < t.length; r++) e.call(n || window, t[r], r, t)
            }

            function U(t, e) {
              for (var n = [], r = 0; r < t.length; r++) n.push(e(t[r], r, t, n));
              return n
            }

            function R(t, e) {
              e = e || function (t) {
                return !!t
              };
              for (var n = [], r = 0; r < t.length; r++) e(t[r], r, t, n) && n.push(t[r]);
              return n
            }

            function B(t, e) {
              var n = {};
              return P(t, (function (r, i) {
                (e && e(r, i, t, n) || Boolean(r)) && (n[i] = r)
              })), n
            }

            function I(t, e) {
              for (var n = 0; n < t.length; n++)
                if (e(t[n], n, t)) return !0;
              return !1
            }

            function j(t) {
              return e = function (t) {
                return "object" == typeof t && (t = N(t)), encodeURIComponent((e = t.toString(), b(v(e))));
                var e
              }, n = {}, P(t, (function (t, r) {
                n[r] = e(t)
              })), n;
              var e, n
            }

            function M(t) {
              var e, n, r = B(t, (function (t) {
                return void 0 !== t
              }));
              return U((e = j(r), n = [], P(e, (function (t, e) {
                n.push([e, t])
              })), n), A.method("join", "=")).join("&")
            }

            function N(t) {
              try {
                return JSON.stringify(t)
              } catch (r) {
                return JSON.stringify((e = [], n = [], function t(r, i) {
                  var o, s, a;
                  switch (typeof r) {
                    case "object":
                      if (!r) return null;
                      for (o = 0; o < e.length; o += 1)
                        if (e[o] === r) return {
                          $ref: n[o]
                        };
                      if (e.push(r), n.push(i), "[object Array]" === Object.prototype.toString.apply(r))
                        for (a = [], o = 0; o < r.length; o += 1) a[o] = t(r[o], i + "[" + o + "]");
                      else
                        for (s in a = {}, r) Object.prototype.hasOwnProperty.call(r, s) && (a[s] = t(r[s], i + "[" + JSON.stringify(s) + "]"));
                      return a;
                    case "number":
                    case "string":
                    case "boolean":
                      return r
                  }
                }(t, "$")))
              }
              var e, n
            }
            var D = new(function () {
                function t() {
                  this.globalLog = function (t) {
                    window.console && window.console.log && window.console.log(t)
                  }
                }
                return t.prototype.debug = function () {
                  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                  this.log(this.globalLog, t)
                }, t.prototype.warn = function () {
                  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                  this.log(this.globalLogWarn, t)
                }, t.prototype.error = function () {
                  for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                  this.log(this.globalLogError, t)
                }, t.prototype.globalLogWarn = function (t) {
                  window.console && window.console.warn ? window.console.warn(t) : this.globalLog(t)
                }, t.prototype.globalLogError = function (t) {
                  window.console && window.console.error ? window.console.error(t) : this.globalLogWarn(t)
                }, t.prototype.log = function (t) {
                  for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                  var r = O.apply(this, arguments);
                  if (Pe.log) Pe.log(r);
                  else if (Pe.logToConsole) {
                    var i = t.bind(this);
                    i(r)
                  }
                }, t
              }()),
              z = {
                baseUrl: "https://pusher.com",
                urls: {
                  authenticationEndpoint: {
                    path: "/docs/authenticating_users"
                  },
                  javascriptQuickStart: {
                    path: "/docs/javascript_quick_start"
                  },
                  triggeringClientEvents: {
                    path: "/docs/client_api_guide/client_events#trigger-events"
                  }
                }
              },
              H = function (t) {
                var e, n = z.urls[t];
                return n ? (n.fullUrl ? e = n.fullUrl : n.path && (e = z.baseUrl + n.path), e ? "See: " + e : "") : ""
              },
              q = function (t, e, n) {
                var r, i = this;
                for (var o in (r = we.createXHR()).open("POST", i.options.authEndpoint, !0), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), this.authOptions.headers) r.setRequestHeader(o, this.authOptions.headers[o]);
                return r.onreadystatechange = function () {
                  if (4 === r.readyState)
                    if (200 === r.status) {
                      var t, e = !1;
                      try {
                        t = JSON.parse(r.responseText), e = !0
                      } catch (t) {
                        n(!0, "JSON returned from auth endpoint was invalid, yet status code was 200. Data was: " + r.responseText)
                      }
                      e && n(!1, t)
                    } else {
                      var o = H("authenticationEndpoint");
                      D.error("Unable to retrieve auth string from auth endpoint - received status " + r.status + " from " + i.options.authEndpoint + ". Clients must be authenticated to join private or presence channels. " + o), n(!0, r.status)
                    }
                }, r.send(this.composeQuery(e)), r
              },
              F = function (t, e, n) {
                void 0 !== this.authOptions.headers && D.warn("To send headers with the auth request, you must use AJAX, rather than JSONP.");
                var r = t.nextAuthCallbackID.toString();
                t.nextAuthCallbackID++;
                var i = t.getDocument(),
                  o = i.createElement("script");
                t.auth_callbacks[r] = function (t) {
                  n(!1, t)
                };
                var s = "Pusher.auth_callbacks['" + r + "']";
                o.src = this.options.authEndpoint + "?callback=" + encodeURIComponent(s) + "&" + this.composeQuery(e);
                var a = i.getElementsByTagName("head")[0] || i.documentElement;
                a.insertBefore(o, a.firstChild)
              },
              X = function () {
                function t(t) {
                  this.src = t
                }
                return t.prototype.send = function (t) {
                  var e = this,
                    n = "Error loading " + e.src;
                  e.script = document.createElement("script"), e.script.id = t.id, e.script.src = e.src, e.script.type = "text/javascript", e.script.charset = "UTF-8", e.script.addEventListener ? (e.script.onerror = function () {
                    t.callback(n)
                  }, e.script.onload = function () {
                    t.callback(null)
                  }) : e.script.onreadystatechange = function () {
                    "loaded" !== e.script.readyState && "complete" !== e.script.readyState || t.callback(null)
                  }, void 0 === e.script.async && document.attachEvent && /opera/i.test(navigator.userAgent) ? (e.errorScript = document.createElement("script"), e.errorScript.id = t.id + "_error", e.errorScript.text = t.name + "('" + n + "');", e.script.async = e.errorScript.async = !1) : e.script.async = !0;
                  var r = document.getElementsByTagName("head")[0];
                  r.insertBefore(e.script, r.firstChild), e.errorScript && r.insertBefore(e.errorScript, e.script.nextSibling)
                }, t.prototype.cleanup = function () {
                  this.script && (this.script.onload = this.script.onerror = null, this.script.onreadystatechange = null), this.script && this.script.parentNode && this.script.parentNode.removeChild(this.script), this.errorScript && this.errorScript.parentNode && this.errorScript.parentNode.removeChild(this.errorScript), this.script = null, this.errorScript = null
                }, t
              }(),
              Y = function () {
                function t(t, e) {
                  this.url = t, this.data = e
                }
                return t.prototype.send = function (t) {
                  if (!this.request) {
                    var e = M(this.data),
                      n = this.url + "/" + t.number + "?" + e;
                    this.request = we.createScriptRequest(n), this.request.send(t)
                  }
                }, t.prototype.cleanup = function () {
                  this.request && this.request.cleanup()
                }, t
              }(),
              J = {
                name: "jsonp",
                getAgent: function (t, e) {
                  return function (n, r) {
                    var o = "http" + (e ? "s" : "") + "://" + (t.host || t.options.host) + t.options.path,
                      s = we.createJSONPRequest(o, n),
                      a = we.ScriptReceivers.create((function (e, n) {
                        i.remove(a), s.cleanup(), n && n.host && (t.host = n.host), r && r(e, n)
                      }));
                    s.send(a)
                  }
                }
              };

            function K(t, e, n) {
              return t + (e.useTLS ? "s" : "") + "://" + (e.useTLS ? e.hostTLS : e.hostNonTLS) + n
            }

            function W(t, e) {
              return "/app/" + t + "?protocol=" + o.PROTOCOL + "&client=js&version=" + o.VERSION + (e ? "&" + e : "")
            }
            var V = {
                getInitial: function (t, e) {
                  return K("ws", e, (e.httpPath || "") + W(t, "flash=false"))
                }
              },
              G = {
                getInitial: function (t, e) {
                  return K("http", e, (e.httpPath || "/pusher") + W(t))
                }
              },
              Q = {
                getInitial: function (t, e) {
                  return K("http", e, e.httpPath || "/pusher")
                },
                getPath: function (t, e) {
                  return W(t)
                }
              },
              Z = function () {
                function t() {
                  this._callbacks = {}
                }
                return t.prototype.get = function (t) {
                  return this._callbacks[$(t)]
                }, t.prototype.add = function (t, e, n) {
                  var r = $(t);
                  this._callbacks[r] = this._callbacks[r] || [], this._callbacks[r].push({
                    fn: e,
                    context: n
                  })
                }, t.prototype.remove = function (t, e, n) {
                  if (t || e || n) {
                    var r = t ? [$(t)] : x(this._callbacks);
                    e || n ? this.removeCallback(r, e, n) : this.removeAllCallbacks(r)
                  } else this._callbacks = {}
                }, t.prototype.removeCallback = function (t, e, n) {
                  L(t, (function (t) {
                    this._callbacks[t] = R(this._callbacks[t] || [], (function (t) {
                      return e && e !== t.fn || n && n !== t.context
                    })), 0 === this._callbacks[t].length && delete this._callbacks[t]
                  }), this)
                }, t.prototype.removeAllCallbacks = function (t) {
                  L(t, (function (t) {
                    delete this._callbacks[t]
                  }), this)
                }, t
              }();

            function $(t) {
              return "_" + t
            }
            var tt = function () {
                function t(t) {
                  this.callbacks = new Z, this.global_callbacks = [], this.failThrough = t
                }
                return t.prototype.bind = function (t, e, n) {
                  return this.callbacks.add(t, e, n), this
                }, t.prototype.bind_global = function (t) {
                  return this.global_callbacks.push(t), this
                }, t.prototype.unbind = function (t, e, n) {
                  return this.callbacks.remove(t, e, n), this
                }, t.prototype.unbind_global = function (t) {
                  return t ? (this.global_callbacks = R(this.global_callbacks || [], (function (e) {
                    return e !== t
                  })), this) : (this.global_callbacks = [], this)
                }, t.prototype.unbind_all = function () {
                  return this.unbind(), this.unbind_global(), this
                }, t.prototype.emit = function (t, e, n) {
                  for (var r = 0; r < this.global_callbacks.length; r++) this.global_callbacks[r](t, e);
                  var i = this.callbacks.get(t),
                    o = [];
                  if (n ? o.push(e, n) : e && o.push(e), i && i.length > 0)
                    for (r = 0; r < i.length; r++) i[r].fn.apply(i[r].context || window, o);
                  else this.failThrough && this.failThrough(t, e);
                  return this
                }, t
              }(),
              et = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              nt = function (t) {
                function e(e, n, r, i, o) {
                  var s = t.call(this) || this;
                  return s.initialize = we.transportConnectionInitializer, s.hooks = e, s.name = n, s.priority = r, s.key = i, s.options = o, s.state = "new", s.timeline = o.timeline, s.activityTimeout = o.activityTimeout, s.id = s.timeline.generateUniqueID(), s
                }
                return et(e, t), e.prototype.handlesActivityChecks = function () {
                  return Boolean(this.hooks.handlesActivityChecks)
                }, e.prototype.supportsPing = function () {
                  return Boolean(this.hooks.supportsPing)
                }, e.prototype.connect = function () {
                  var t = this;
                  if (this.socket || "initialized" !== this.state) return !1;
                  var e = this.hooks.urls.getInitial(this.key, this.options);
                  try {
                    this.socket = this.hooks.getSocket(e, this.options)
                  } catch (e) {
                    return A.defer((function () {
                      t.onError(e), t.changeState("closed")
                    })), !1
                  }
                  return this.bindListeners(), D.debug("Connecting", {
                    transport: this.name,
                    url: e
                  }), this.changeState("connecting"), !0
                }, e.prototype.close = function () {
                  return !!this.socket && (this.socket.close(), !0)
                }, e.prototype.send = function (t) {
                  var e = this;
                  return "open" === this.state && (A.defer((function () {
                    e.socket && e.socket.send(t)
                  })), !0)
                }, e.prototype.ping = function () {
                  "open" === this.state && this.supportsPing() && this.socket.ping()
                }, e.prototype.onOpen = function () {
                  this.hooks.beforeOpen && this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options)), this.changeState("open"), this.socket.onopen = void 0
                }, e.prototype.onError = function (t) {
                  this.emit("error", {
                    type: "WebSocketError",
                    error: t
                  }), this.timeline.error(this.buildTimelineMessage({
                    error: t.toString()
                  }))
                }, e.prototype.onClose = function (t) {
                  t ? this.changeState("closed", {
                    code: t.code,
                    reason: t.reason,
                    wasClean: t.wasClean
                  }) : this.changeState("closed"), this.unbindListeners(), this.socket = void 0
                }, e.prototype.onMessage = function (t) {
                  this.emit("message", t)
                }, e.prototype.onActivity = function () {
                  this.emit("activity")
                }, e.prototype.bindListeners = function () {
                  var t = this;
                  this.socket.onopen = function () {
                    t.onOpen()
                  }, this.socket.onerror = function (e) {
                    t.onError(e)
                  }, this.socket.onclose = function (e) {
                    t.onClose(e)
                  }, this.socket.onmessage = function (e) {
                    t.onMessage(e)
                  }, this.supportsPing() && (this.socket.onactivity = function () {
                    t.onActivity()
                  })
                }, e.prototype.unbindListeners = function () {
                  this.socket && (this.socket.onopen = void 0, this.socket.onerror = void 0, this.socket.onclose = void 0, this.socket.onmessage = void 0, this.supportsPing() && (this.socket.onactivity = void 0))
                }, e.prototype.changeState = function (t, e) {
                  this.state = t, this.timeline.info(this.buildTimelineMessage({
                    state: t,
                    params: e
                  })), this.emit(t, e)
                }, e.prototype.buildTimelineMessage = function (t) {
                  return T({
                    cid: this.id
                  }, t)
                }, e
              }(tt),
              rt = function () {
                function t(t) {
                  this.hooks = t
                }
                return t.prototype.isSupported = function (t) {
                  return this.hooks.isSupported(t)
                }, t.prototype.createConnection = function (t, e, n, r) {
                  return new nt(this.hooks, t, e, n, r)
                }, t
              }(),
              it = new rt({
                urls: V,
                handlesActivityChecks: !1,
                supportsPing: !1,
                isInitialized: function () {
                  return Boolean(we.getWebSocketAPI())
                },
                isSupported: function () {
                  return Boolean(we.getWebSocketAPI())
                },
                getSocket: function (t) {
                  return we.createWebSocket(t)
                }
              }),
              ot = {
                urls: G,
                handlesActivityChecks: !1,
                supportsPing: !0,
                isInitialized: function () {
                  return !0
                }
              },
              st = T({
                getSocket: function (t) {
                  return we.HTTPFactory.createStreamingSocket(t)
                }
              }, ot),
              at = T({
                getSocket: function (t) {
                  return we.HTTPFactory.createPollingSocket(t)
                }
              }, ot),
              ct = {
                isSupported: function () {
                  return we.isXHRSupported()
                }
              },
              ut = {
                ws: it,
                xhr_streaming: new rt(T({}, st, ct)),
                xhr_polling: new rt(T({}, at, ct))
              },
              ht = new rt({
                file: "sockjs",
                urls: Q,
                handlesActivityChecks: !0,
                supportsPing: !1,
                isSupported: function () {
                  return !0
                },
                isInitialized: function () {
                  return void 0 !== window.SockJS
                },
                getSocket: function (t, e) {
                  return new window.SockJS(t, null, {
                    js_path: c.getPath("sockjs", {
                      useTLS: e.useTLS
                    }),
                    ignore_null_origin: e.ignoreNullOrigin
                  })
                },
                beforeOpen: function (t, e) {
                  t.send(JSON.stringify({
                    path: e
                  }))
                }
              }),
              ft = {
                isSupported: function (t) {
                  return we.isXDRSupported(t.useTLS)
                }
              },
              pt = new rt(T({}, st, ft)),
              lt = new rt(T({}, at, ft));
            ut.xdr_streaming = pt, ut.xdr_polling = lt, ut.sockjs = ht;
            var yt = ut,
              dt = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              vt = new(function (t) {
                function e() {
                  var e = t.call(this) || this,
                    n = e;
                  return void 0 !== window.addEventListener && (window.addEventListener("online", (function () {
                    n.emit("online")
                  }), !1), window.addEventListener("offline", (function () {
                    n.emit("offline")
                  }), !1)), e
                }
                return dt(e, t), e.prototype.isOnline = function () {
                  return void 0 === window.navigator.onLine || window.navigator.onLine
                }, e
              }(tt)),
              gt = function () {
                function t(t, e, n) {
                  this.manager = t, this.transport = e, this.minPingDelay = n.minPingDelay, this.maxPingDelay = n.maxPingDelay, this.pingDelay = void 0
                }
                return t.prototype.createConnection = function (t, e, n, r) {
                  var i = this;
                  r = T({}, r, {
                    activityTimeout: this.pingDelay
                  });
                  var o = this.transport.createConnection(t, e, n, r),
                    s = null,
                    a = function () {
                      o.unbind("open", a), o.bind("closed", c), s = A.now()
                    },
                    c = function (t) {
                      if (o.unbind("closed", c), 1002 === t.code || 1003 === t.code) i.manager.reportDeath();
                      else if (!t.wasClean && s) {
                        var e = A.now() - s;
                        e < 2 * i.maxPingDelay && (i.manager.reportDeath(), i.pingDelay = Math.max(e / 2, i.minPingDelay))
                      }
                    };
                  return o.bind("open", a), o
                }, t.prototype.isSupported = function (t) {
                  return this.manager.isAlive() && this.transport.isSupported(t)
                }, t
              }(),
              bt = {
                decodeMessage: function (t) {
                  try {
                    var e = JSON.parse(t.data),
                      n = e.data;
                    if ("string" == typeof n) try {
                      n = JSON.parse(e.data)
                    } catch (t) {}
                    var r = {
                      event: e.event,
                      channel: e.channel,
                      data: n
                    };
                    return e.user_id && (r.user_id = e.user_id), r
                  } catch (e) {
                    throw {
                      type: "MessageParseError",
                      error: e,
                      data: t.data
                    }
                  }
                },
                encodeMessage: function (t) {
                  return JSON.stringify(t)
                },
                processHandshake: function (t) {
                  var e = bt.decodeMessage(t);
                  if ("pusher:connection_established" === e.event) {
                    if (!e.data.activity_timeout) throw "No activity timeout specified in handshake";
                    return {
                      action: "connected",
                      id: e.data.socket_id,
                      activityTimeout: 1e3 * e.data.activity_timeout
                    }
                  }
                  if ("pusher:error" === e.event) return {
                    action: this.getCloseAction(e.data),
                    error: this.getCloseError(e.data)
                  };
                  throw "Invalid handshake"
                },
                getCloseAction: function (t) {
                  return t.code < 4e3 ? t.code >= 1002 && t.code <= 1004 ? "backoff" : null : 4e3 === t.code ? "tls_only" : t.code < 4100 ? "refused" : t.code < 4200 ? "backoff" : t.code < 4300 ? "retry" : "refused"
                },
                getCloseError: function (t) {
                  return 1e3 !== t.code && 1001 !== t.code ? {
                    type: "PusherError",
                    data: {
                      code: t.code,
                      message: t.reason || t.message
                    }
                  } : null
                }
              },
              mt = bt,
              wt = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              kt = function (t) {
                function e(e, n) {
                  var r = t.call(this) || this;
                  return r.id = e, r.transport = n, r.activityTimeout = n.activityTimeout, r.bindListeners(), r
                }
                return wt(e, t), e.prototype.handlesActivityChecks = function () {
                  return this.transport.handlesActivityChecks()
                }, e.prototype.send = function (t) {
                  return this.transport.send(t)
                }, e.prototype.send_event = function (t, e, n) {
                  var r = {
                    event: t,
                    data: e
                  };
                  return n && (r.channel = n), D.debug("Event sent", r), this.send(mt.encodeMessage(r))
                }, e.prototype.ping = function () {
                  this.transport.supportsPing() ? this.transport.ping() : this.send_event("pusher:ping", {})
                }, e.prototype.close = function () {
                  this.transport.close()
                }, e.prototype.bindListeners = function () {
                  var t = this,
                    e = {
                      message: function (e) {
                        var n;
                        try {
                          n = mt.decodeMessage(e)
                        } catch (n) {
                          t.emit("error", {
                            type: "MessageParseError",
                            error: n,
                            data: e.data
                          })
                        }
                        if (void 0 !== n) {
                          switch (D.debug("Event recd", n), n.event) {
                            case "pusher:error":
                              t.emit("error", {
                                type: "PusherError",
                                data: n.data
                              });
                              break;
                            case "pusher:ping":
                              t.emit("ping");
                              break;
                            case "pusher:pong":
                              t.emit("pong")
                          }
                          t.emit("message", n)
                        }
                      },
                      activity: function () {
                        t.emit("activity")
                      },
                      error: function (e) {
                        t.emit("error", {
                          type: "WebSocketError",
                          error: e
                        })
                      },
                      closed: function (e) {
                        n(), e && e.code && t.handleCloseEvent(e), t.transport = null, t.emit("closed")
                      }
                    },
                    n = function () {
                      P(e, (function (e, n) {
                        t.transport.unbind(n, e)
                      }))
                    };
                  P(e, (function (e, n) {
                    t.transport.bind(n, e)
                  }))
                }, e.prototype.handleCloseEvent = function (t) {
                  var e = mt.getCloseAction(t),
                    n = mt.getCloseError(t);
                  n && this.emit("error", n), e && this.emit(e, {
                    action: e,
                    error: n
                  })
                }, e
              }(tt),
              _t = function () {
                function t(t, e) {
                  this.transport = t, this.callback = e, this.bindListeners()
                }
                return t.prototype.close = function () {
                  this.unbindListeners(), this.transport.close()
                }, t.prototype.bindListeners = function () {
                  var t = this;
                  this.onMessage = function (e) {
                    var n;
                    t.unbindListeners();
                    try {
                      n = mt.processHandshake(e)
                    } catch (e) {
                      return t.finish("error", {
                        error: e
                      }), void t.transport.close()
                    }
                    "connected" === n.action ? t.finish("connected", {
                      connection: new kt(n.id, t.transport),
                      activityTimeout: n.activityTimeout
                    }) : (t.finish(n.action, {
                      error: n.error
                    }), t.transport.close())
                  }, this.onClosed = function (e) {
                    t.unbindListeners();
                    var n = mt.getCloseAction(e) || "backoff",
                      r = mt.getCloseError(e);
                    t.finish(n, {
                      error: r
                    })
                  }, this.transport.bind("message", this.onMessage), this.transport.bind("closed", this.onClosed)
                }, t.prototype.unbindListeners = function () {
                  this.transport.unbind("message", this.onMessage), this.transport.unbind("closed", this.onClosed)
                }, t.prototype.finish = function (t, e) {
                  this.callback(T({
                    transport: this.transport,
                    action: t
                  }, e))
                }, t
              }(),
              St = function () {
                function t(t, e) {
                  this.channel = t;
                  var n = e.authTransport;
                  if (void 0 === we.getAuthorizers()[n]) throw "'" + n + "' is not a recognized auth transport";
                  this.type = n, this.options = e, this.authOptions = (e || {}).auth || {}
                }
                return t.prototype.composeQuery = function (t) {
                  var e = "socket_id=" + encodeURIComponent(t) + "&channel_name=" + encodeURIComponent(this.channel.name);
                  for (var n in this.authOptions.params) e += "&" + encodeURIComponent(n) + "=" + encodeURIComponent(this.authOptions.params[n]);
                  return e
                }, t.prototype.authorize = function (e, n) {
                  t.authorizers = t.authorizers || we.getAuthorizers(), t.authorizers[this.type].call(this, we, e, n)
                }, t
              }(),
              Et = function () {
                function t(t, e) {
                  this.timeline = t, this.options = e || {}
                }
                return t.prototype.send = function (t, e) {
                  this.timeline.isEmpty() || this.timeline.send(we.TimelineTransport.getAgent(this, t), e)
                }, t
              }(),
              At = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              Tt = function (t) {
                function e(e) {
                  var n = this.constructor,
                    r = t.call(this, e) || this;
                  return Object.setPrototypeOf(r, n.prototype), r
                }
                return At(e, t), e
              }(Error),
              Ot = function (t) {
                function e(e) {
                  var n = this.constructor,
                    r = t.call(this, e) || this;
                  return Object.setPrototypeOf(r, n.prototype), r
                }
                return At(e, t), e
              }(Error),
              Ct = function (t) {
                function e(e) {
                  var n = this.constructor,
                    r = t.call(this, e) || this;
                  return Object.setPrototypeOf(r, n.prototype), r
                }
                return At(e, t), e
              }(Error),
              Pt = function (t) {
                function e(e) {
                  var n = this.constructor,
                    r = t.call(this, e) || this;
                  return Object.setPrototypeOf(r, n.prototype), r
                }
                return At(e, t), e
              }(Error),
              xt = function (t) {
                function e(e) {
                  var n = this.constructor,
                    r = t.call(this, e) || this;
                  return Object.setPrototypeOf(r, n.prototype), r
                }
                return At(e, t), e
              }(Error),
              Lt = function (t) {
                function e(e) {
                  var n = this.constructor,
                    r = t.call(this, e) || this;
                  return Object.setPrototypeOf(r, n.prototype), r
                }
                return At(e, t), e
              }(Error),
              Ut = function (t) {
                function e(e) {
                  var n = this.constructor,
                    r = t.call(this, e) || this;
                  return Object.setPrototypeOf(r, n.prototype), r
                }
                return At(e, t), e
              }(Error),
              Rt = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              Bt = function (t) {
                function e(e, n) {
                  var r = t.call(this, (function (t, n) {
                    D.debug("No callbacks on " + e + " for " + t)
                  })) || this;
                  return r.name = e, r.pusher = n, r.subscribed = !1, r.subscriptionPending = !1, r.subscriptionCancelled = !1, r
                }
                return Rt(e, t), e.prototype.authorize = function (t, e) {
                  return e(!1, {
                    auth: ""
                  })
                }, e.prototype.trigger = function (t, e) {
                  if (0 !== t.indexOf("client-")) throw new Tt("Event '" + t + "' does not start with 'client-'");
                  if (!this.subscribed) {
                    var n = H("triggeringClientEvents");
                    D.warn("Client event triggered before channel 'subscription_succeeded' event . " + n)
                  }
                  return this.pusher.send_event(t, e, this.name)
                }, e.prototype.disconnect = function () {
                  this.subscribed = !1, this.subscriptionPending = !1
                }, e.prototype.handleEvent = function (t) {
                  var e = t.event,
                    n = t.data;
                  "pusher_internal:subscription_succeeded" === e ? this.handleSubscriptionSucceededEvent(t) : 0 !== e.indexOf("pusher_internal:") && this.emit(e, n, {})
                }, e.prototype.handleSubscriptionSucceededEvent = function (t) {
                  this.subscriptionPending = !1, this.subscribed = !0, this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : this.emit("pusher:subscription_succeeded", t.data)
                }, e.prototype.subscribe = function () {
                  var t = this;
                  this.subscribed || (this.subscriptionPending = !0, this.subscriptionCancelled = !1, this.authorize(this.pusher.connection.socket_id, (function (e, n) {
                    
                    e ? (D.error(n), t.emit("pusher:subscription_error", n)) : (n = n, t.pusher.send_event("pusher:subscribe", {
                      auth: n.auth,
                      channel_data: n.channel_data,
                      channel: t.name
                    }))
                  })))
                }, e.prototype.unsubscribe = function () {
                  this.subscribed = !1, this.pusher.send_event("pusher:unsubscribe", {
                    channel: this.name
                  })
                }, e.prototype.cancelSubscription = function () {
                  this.subscriptionCancelled = !0
                }, e.prototype.reinstateSubscription = function () {
                  this.subscriptionCancelled = !1
                }, e
              }(tt),
              It = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              jt = function (t) {
                function e() {
                  return null !== t && t.apply(this, arguments) || this
                }
                return It(e, t), e.prototype.authorize = function (t, e) {
                  return Kt.createAuthorizer(this, this.pusher.config).authorize(t, e)
                }, e
              }(Bt),
              Mt = function () {
                function t() {
                  this.reset()
                }
                return t.prototype.get = function (t) {
                  return Object.prototype.hasOwnProperty.call(this.members, t) ? {
                    id: t,
                    info: this.members[t]
                  } : null
                }, t.prototype.each = function (t) {
                  var e = this;
                  P(this.members, (function (n, r) {
                    t(e.get(r))
                  }))
                }, t.prototype.setMyID = function (t) {
                  this.myID = t
                }, t.prototype.onSubscription = function (t) {
                  this.members = t.presence.hash, this.count = t.presence.count, this.me = this.get(this.myID)
                }, t.prototype.addMember = function (t) {
                  return null === this.get(t.user_id) && this.count++, this.members[t.user_id] = t.user_info, this.get(t.user_id)
                }, t.prototype.removeMember = function (t) {
                  var e = this.get(t.user_id);
                  return e && (delete this.members[t.user_id], this.count--), e
                }, t.prototype.reset = function () {
                  this.members = {}, this.count = 0, this.myID = null, this.me = null
                }, t
              }(),
              Nt = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              Dt = function (t) {
                function e(e, n) {
                  var r = t.call(this, e, n) || this;
                  return r.members = new Mt, r
                }
                return Nt(e, t), e.prototype.authorize = function (e, n) {
                  var r = this;
                  t.prototype.authorize.call(this, e, (function (t, e) {
                    if (!t) {
                      if (void 0 === (e = e).channel_data) {
                        var i = H("authenticationEndpoint");
                        return D.error("Invalid auth response for channel '" + r.name + "',expected 'channel_data' field. " + i), void n("Invalid auth response")
                      }
                      var o = JSON.parse(e.channel_data);
                      r.members.setMyID(o.user_id)
                    }
                    n(t, e)
                  }))
                }, e.prototype.handleEvent = function (t) {
                  var e = t.event;
                  if (0 === e.indexOf("pusher_internal:")) this.handleInternalEvent(t);
                  else {
                    var n = t.data,
                      r = {};
                    t.user_id && (r.user_id = t.user_id), this.emit(e, n, r)
                  }
                }, e.prototype.handleInternalEvent = function (t) {
                  var e = t.event,
                    n = t.data;
                  switch (e) {
                    case "pusher_internal:subscription_succeeded":
                      this.handleSubscriptionSucceededEvent(t);
                      break;
                    case "pusher_internal:member_added":
                      var r = this.members.addMember(n);
                      this.emit("pusher:member_added", r);
                      break;
                    case "pusher_internal:member_removed":
                      var i = this.members.removeMember(n);
                      i && this.emit("pusher:member_removed", i)
                  }
                }, e.prototype.handleSubscriptionSucceededEvent = function (t) {
                  this.subscriptionPending = !1, this.subscribed = !0, this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : (this.members.onSubscription(t.data), this.emit("pusher:subscription_succeeded", this.members))
                }, e.prototype.disconnect = function () {
                  this.members.reset(), t.prototype.disconnect.call(this)
                }, e
              }(jt),
              zt = n(0),
              Ht = n(1),
              qt = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              Ft = function (t) {
                function e() {
                  var e = null !== t && t.apply(this, arguments) || this;
                  return e.key = null, e
                }
                return qt(e, t), e.prototype.authorize = function (e, n) {
                  var r = this;
                  t.prototype.authorize.call(this, e, (function (t, e) {
                    if (t) n(!0, e);
                    else {
                      var i = e.shared_secret;
                      if (i) r.key = Object(Ht.decodeBase64)(i), delete e.shared_secret, n(!1, e);
                      else {
                        var o = "No shared_secret key in auth payload for encrypted channel: " + r.name;
                        n(!0, o)
                      }
                    }
                  }))
                }, e.prototype.trigger = function (t, e) {
                  throw new xt("Client events are not currently supported for encrypted channels")
                }, e.prototype.handleEvent = function (e) {
                  var n = e.event,
                    r = e.data;
                  0 !== n.indexOf("pusher_internal:") && 0 !== n.indexOf("pusher:") ? this.handleEncryptedEvent(n, r) : t.prototype.handleEvent.call(this, e)
                }, e.prototype.handleEncryptedEvent = function (t, e) {
                  var n = this;
                  if (this.key)
                    if (e.ciphertext && e.nonce) {
                      var r = Object(Ht.decodeBase64)(e.ciphertext);
                      if (r.length < zt.secretbox.overheadLength) D.error("Expected encrypted event ciphertext length to be " + zt.secretbox.overheadLength + ", got: " + r.length);
                      else {
                        var i = Object(Ht.decodeBase64)(e.nonce);
                        if (i.length < zt.secretbox.nonceLength) D.error("Expected encrypted event nonce length to be " + zt.secretbox.nonceLength + ", got: " + i.length);
                        else {
                          var o = zt.secretbox.open(r, i, this.key);
                          if (null === o) return D.debug("Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint..."), void this.authorize(this.pusher.connection.socket_id, (function (e, s) {
                            e ? D.error("Failed to make a request to the authEndpoint: " + s + ". Unable to fetch new key, so dropping encrypted event") : null !== (o = zt.secretbox.open(r, i, n.key)) ? n.emitJSON(t, Object(Ht.encodeUTF8)(o)) : D.error("Failed to decrypt event with new key. Dropping encrypted event")
                          }));
                          this.emitJSON(t, Object(Ht.encodeUTF8)(o))
                        }
                      }
                    } else D.error("Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: " + e);
                  else D.debug("Received encrypted event before key has been retrieved from the authEndpoint")
                }, e.prototype.emitJSON = function (t, e) {
                  try {
                    this.emit(t, JSON.parse(e))
                  } catch (n) {
                    this.emit(t, e)
                  }
                  return this
                }, e
              }(jt),
              Xt = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              Yt = function (t) {
                function e(e, n) {
                  var r = t.call(this) || this;
                  r.key = e, r.options = n || {}, r.state = "initialized", r.connection = null, r.usingTLS = !!n.useTLS, r.timeline = r.options.timeline, r.errorCallbacks = r.buildErrorCallbacks(), r.connectionCallbacks = r.buildConnectionCallbacks(r.errorCallbacks), r.handshakeCallbacks = r.buildHandshakeCallbacks(r.errorCallbacks);
                  var i = we.getNetwork();
                  return i.bind("online", (function () {
                    r.timeline.info({
                      netinfo: "online"
                    }), "connecting" !== r.state && "unavailable" !== r.state || r.retryIn(0)
                  })), i.bind("offline", (function () {
                    r.timeline.info({
                      netinfo: "offline"
                    }), r.connection && r.sendActivityCheck()
                  })), r.updateStrategy(), r
                }
                return Xt(e, t), e.prototype.connect = function () {
                  this.connection || this.runner || (this.strategy.isSupported() ? (this.updateState("connecting"), this.startConnecting(), this.setUnavailableTimer()) : this.updateState("failed"))
                }, e.prototype.send = function (t) {
                  return !!this.connection && this.connection.send(t)
                }, e.prototype.send_event = function (t, e, n) {
                  return !!this.connection && this.connection.send_event(t, e, n)
                }, e.prototype.disconnect = function () {
                  this.disconnectInternally(), this.updateState("disconnected")
                }, e.prototype.isUsingTLS = function () {
                  return this.usingTLS
                }, e.prototype.startConnecting = function () {
                  var t = this,
                    e = function (n, r) {
                      n ? t.runner = t.strategy.connect(0, e) : "error" === r.action ? (t.emit("error", {
                        type: "HandshakeError",
                        error: r.error
                      }), t.timeline.error({
                        handshakeError: r.error
                      })) : (t.abortConnecting(), t.handshakeCallbacks[r.action](r))
                    };
                  this.runner = this.strategy.connect(0, e)
                }, e.prototype.abortConnecting = function () {
                  this.runner && (this.runner.abort(), this.runner = null)
                }, e.prototype.disconnectInternally = function () {
                  this.abortConnecting(), this.clearRetryTimer(), this.clearUnavailableTimer(), this.connection && this.abandonConnection().close()
                }, e.prototype.updateStrategy = function () {
                  this.strategy = this.options.getStrategy({
                    key: this.key,
                    timeline: this.timeline,
                    useTLS: this.usingTLS
                  })
                }, e.prototype.retryIn = function (t) {
                  var e = this;
                  this.timeline.info({
                    action: "retry",
                    delay: t
                  }), t > 0 && this.emit("connecting_in", Math.round(t / 1e3)), this.retryTimer = new S(t || 0, (function () {
                    e.disconnectInternally(), e.connect()
                  }))
                }, e.prototype.clearRetryTimer = function () {
                  this.retryTimer && (this.retryTimer.ensureAborted(), this.retryTimer = null)
                }, e.prototype.setUnavailableTimer = function () {
                  var t = this;
                  this.unavailableTimer = new S(this.options.unavailableTimeout, (function () {
                    t.updateState("unavailable")
                  }))
                }, e.prototype.clearUnavailableTimer = function () {
                  this.unavailableTimer && this.unavailableTimer.ensureAborted()
                }, e.prototype.sendActivityCheck = function () {
                  var t = this;
                  this.stopActivityCheck(), this.connection.ping(), this.activityTimer = new S(this.options.pongTimeout, (function () {
                    t.timeline.error({
                      pong_timed_out: t.options.pongTimeout
                    }), t.retryIn(0)
                  }))
                }, e.prototype.resetActivityCheck = function () {
                  var t = this;
                  this.stopActivityCheck(), this.connection && !this.connection.handlesActivityChecks() && (this.activityTimer = new S(this.activityTimeout, (function () {
                    t.sendActivityCheck()
                  })))
                }, e.prototype.stopActivityCheck = function () {
                  this.activityTimer && this.activityTimer.ensureAborted()
                }, e.prototype.buildConnectionCallbacks = function (t) {
                  var e = this;
                  return T({}, t, {
                    message: function (t) {
                      e.resetActivityCheck(), e.emit("message", t)
                    },
                    ping: function () {
                      e.send_event("pusher:pong", {})
                    },
                    activity: function () {
                      e.resetActivityCheck()
                    },
                    error: function (t) {
                      e.emit("error", {
                        type: "WebSocketError",
                        error: t
                      })
                    },
                    closed: function () {
                      e.abandonConnection(), e.shouldRetry() && e.retryIn(1e3)
                    }
                  })
                }, e.prototype.buildHandshakeCallbacks = function (t) {
                  var e = this;
                  return T({}, t, {
                    connected: function (t) {
                      e.activityTimeout = Math.min(e.options.activityTimeout, t.activityTimeout, t.connection.activityTimeout || 1 / 0), e.clearUnavailableTimer(), e.setConnection(t.connection), e.socket_id = e.connection.id, e.updateState("connected", {
                        socket_id: e.socket_id
                      })
                    }
                  })
                }, e.prototype.buildErrorCallbacks = function () {
                  var t = this,
                    e = function (e) {
                      return function (n) {
                        n.error && t.emit("error", {
                          type: "WebSocketError",
                          error: n.error
                        }), e(n)
                      }
                    };
                  return {
                    tls_only: e((function () {
                      t.usingTLS = !0, t.updateStrategy(), t.retryIn(0)
                    })),
                    refused: e((function () {
                      t.disconnect()
                    })),
                    backoff: e((function () {
                      t.retryIn(1e3)
                    })),
                    retry: e((function () {
                      t.retryIn(0)
                    }))
                  }
                }, e.prototype.setConnection = function (t) {
                  for (var e in this.connection = t, this.connectionCallbacks) this.connection.bind(e, this.connectionCallbacks[e]);
                  this.resetActivityCheck()
                }, e.prototype.abandonConnection = function () {
                  if (this.connection) {
                    for (var t in this.stopActivityCheck(), this.connectionCallbacks) this.connection.unbind(t, this.connectionCallbacks[t]);
                    var e = this.connection;
                    return this.connection = null, e
                  }
                }, e.prototype.updateState = function (t, e) {
                  var n = this.state;
                  if (this.state = t, n !== t) {
                    var r = t;
                    "connected" === r && (r += " with new socket ID " + e.socket_id), D.debug("State changed", n + " -> " + r), this.timeline.info({
                      state: t,
                      params: e
                    }), this.emit("state_change", {
                      previous: n,
                      current: t
                    }), this.emit(t, e)
                  }
                }, e.prototype.shouldRetry = function () {
                  return "connecting" === this.state || "connected" === this.state
                }, e
              }(tt),
              //IMPORTANT
              Jt = function () {
                function t() {
                  this.channels = {}
                }
                return t.prototype.add = function (t, e) {
                  return this.channels[t] || (this.channels[t] = function (t, e) {
                    return 0 === t.indexOf("private-encrypted-") ? Kt.createEncryptedChannel(t, e) : 0 === t.indexOf("private-") ? Kt.createPrivateChannel(t, e) : 0 === t.indexOf("presence-") ? Kt.createPresenceChannel(t, e) : Kt.createChannel(t, e)
                  }(t, e)), this.channels[t]
                }, t.prototype.all = function () {
                  return function (t) {
                    var e = [];
                    return P(t, (function (t) {
                      e.push(t)
                    })), e
                  }(this.channels)
                }, t.prototype.find = function (t) {
                  return this.channels[t]
                }, t.prototype.remove = function (t) {
                  var e = this.channels[t];
                  return delete this.channels[t], e
                }, t.prototype.disconnect = function () {
                  P(this.channels, (function (t) {
                    t.disconnect()
                  }))
                }, t
              }(),
              Kt = {
                //IMPORTANT
                createChannels: function () {
                  return new Jt
                },
                createConnectionManager: function (t, e) {
                  return new Yt(t, e)
                },
                //IMPORTANT
                createChannel: function (t, e) {
                  return new Bt(t, e)
                },
                createPrivateChannel: function (t, e) {
                  return new jt(t, e)
                },
                createPresenceChannel: function (t, e) {
                  return new Dt(t, e)
                },
                createEncryptedChannel: function (t, e) {
                  return new Ft(t, e)
                },
                createTimelineSender: function (t, e) {
                  return new Et(t, e)
                },
                createAuthorizer: function (t, e) {
                  return e.authorizer ? e.authorizer(t, e) : new St(t, e)
                },
                createHandshake: function (t, e) {
                  return new _t(t, e)
                },
                createAssistantToTheTransportManager: function (t, e, n) {
                  return new gt(t, e, n)
                }
              },
              Wt = function () {
                function t(t) {
                  this.options = t || {}, this.livesLeft = this.options.lives || 1 / 0
                }
                return t.prototype.getAssistant = function (t) {
                  return Kt.createAssistantToTheTransportManager(this, t, {
                    minPingDelay: this.options.minPingDelay,
                    maxPingDelay: this.options.maxPingDelay
                  })
                }, t.prototype.isAlive = function () {
                  return this.livesLeft > 0
                }, t.prototype.reportDeath = function () {
                  this.livesLeft -= 1
                }, t
              }(),
              Vt = function () {
                function t(t, e) {
                  this.strategies = t, this.loop = Boolean(e.loop), this.failFast = Boolean(e.failFast), this.timeout = e.timeout, this.timeoutLimit = e.timeoutLimit
                }
                return t.prototype.isSupported = function () {
                  return I(this.strategies, A.method("isSupported"))
                }, t.prototype.connect = function (t, e) {
                  var n = this,
                    r = this.strategies,
                    i = 0,
                    o = this.timeout,
                    s = null,
                    a = function (c, u) {
                      u ? e(null, u) : (i += 1, n.loop && (i %= r.length), i < r.length ? (o && (o *= 2, n.timeoutLimit && (o = Math.min(o, n.timeoutLimit))), s = n.tryStrategy(r[i], t, {
                        timeout: o,
                        failFast: n.failFast
                      }, a)) : e(!0))
                    };
                  return s = this.tryStrategy(r[i], t, {
                    timeout: o,
                    failFast: this.failFast
                  }, a), {
                    abort: function () {
                      s.abort()
                    },
                    forceMinPriority: function (e) {
                      t = e, s && s.forceMinPriority(e)
                    }
                  }
                }, t.prototype.tryStrategy = function (t, e, n, r) {
                  var i = null,
                    o = null;
                  return n.timeout > 0 && (i = new S(n.timeout, (function () {
                    o.abort(), r(!0)
                  }))), o = t.connect(e, (function (t, e) {
                    t && i && i.isRunning() && !n.failFast || (i && i.ensureAborted(), r(t, e))
                  })), {
                    abort: function () {
                      i && i.ensureAborted(), o.abort()
                    },
                    forceMinPriority: function (t) {
                      o.forceMinPriority(t)
                    }
                  }
                }, t
              }(),
              Gt = function () {
                function t(t) {
                  this.strategies = t
                }
                return t.prototype.isSupported = function () {
                  return I(this.strategies, A.method("isSupported"))
                }, t.prototype.connect = function (t, e) {
                  return function (t, e, n) {
                    var r = U(t, (function (t, r, i, o) {
                      return t.connect(e, n(r, o))
                    }));
                    return {
                      abort: function () {
                        L(r, Qt)
                      },
                      forceMinPriority: function (t) {
                        L(r, (function (e) {
                          e.forceMinPriority(t)
                        }))
                      }
                    }
                  }(this.strategies, t, (function (t, n) {
                    return function (r, i) {
                      n[t].error = r, r ? function (t) {
                        return function (t, e) {
                          for (var n = 0; n < t.length; n++)
                            if (!e(t[n], n, t)) return !1;
                          return !0
                        }(t, (function (t) {
                          return Boolean(t.error)
                        }))
                      }(n) && e(!0) : (L(n, (function (t) {
                        t.forceMinPriority(i.transport.priority)
                      })), e(null, i))
                    }
                  }))
                }, t
              }();

            function Qt(t) {
              t.error || t.aborted || (t.abort(), t.aborted = !0)
            }
            var Zt = function () {
              function t(t, e, n) {
                this.strategy = t, this.transports = e, this.ttl = n.ttl || 18e5, this.usingTLS = n.useTLS, this.timeline = n.timeline
              }
              return t.prototype.isSupported = function () {
                return this.strategy.isSupported()
              }, t.prototype.connect = function (t, e) {
                var n = this.usingTLS,
                  r = function (t) {
                    var e = we.getLocalStorage();
                    if (e) try {
                      var n = e[$t(t)];
                      if (n) return JSON.parse(n)
                    } catch (e) {
                      te(t)
                    }
                    return null
                  }(n),
                  i = [this.strategy];
                if (r && r.timestamp + this.ttl >= A.now()) {
                  var o = this.transports[r.transport];
                  o && (this.timeline.info({
                    cached: !0,
                    transport: r.transport,
                    latency: r.latency
                  }), i.push(new Vt([o], {
                    timeout: 2 * r.latency + 1e3,
                    failFast: !0
                  })))
                }
                var s = A.now(),
                  a = i.pop().connect(t, (function r(o, c) {
                    o ? (te(n), i.length > 0 ? (s = A.now(), a = i.pop().connect(t, r)) : e(o)) : (function (t, e, n) {
                      var r = we.getLocalStorage();
                      if (r) try {
                        r[$t(t)] = N({
                          timestamp: A.now(),
                          transport: e,
                          latency: n
                        })
                      } catch (t) {}
                    }(n, c.transport.name, A.now() - s), e(null, c))
                  }));
                return {
                  abort: function () {
                    a.abort()
                  },
                  forceMinPriority: function (e) {
                    t = e, a && a.forceMinPriority(e)
                  }
                }
              }, t
            }();

            function $t(t) {
              return "pusherTransport" + (t ? "TLS" : "NonTLS")
            }

            function te(t) {
              var e = we.getLocalStorage();
              if (e) try {
                delete e[$t(t)]
              } catch (t) {}
            }
            var ee = function () {
                function t(t, e) {
                  var n = e.delay;
                  this.strategy = t, this.options = {
                    delay: n
                  }
                }
                return t.prototype.isSupported = function () {
                  return this.strategy.isSupported()
                }, t.prototype.connect = function (t, e) {
                  var n, r = this.strategy,
                    i = new S(this.options.delay, (function () {
                      n = r.connect(t, e)
                    }));
                  return {
                    abort: function () {
                      i.ensureAborted(), n && n.abort()
                    },
                    forceMinPriority: function (e) {
                      t = e, n && n.forceMinPriority(e)
                    }
                  }
                }, t
              }(),
              ne = function () {
                function t(t, e, n) {
                  this.test = t, this.trueBranch = e, this.falseBranch = n
                }
                return t.prototype.isSupported = function () {
                  return (this.test() ? this.trueBranch : this.falseBranch).isSupported()
                }, t.prototype.connect = function (t, e) {
                  return (this.test() ? this.trueBranch : this.falseBranch).connect(t, e)
                }, t
              }(),
              re = function () {
                function t(t) {
                  this.strategy = t
                }
                return t.prototype.isSupported = function () {
                  return this.strategy.isSupported()
                }, t.prototype.connect = function (t, e) {
                  var n = this.strategy.connect(t, (function (t, r) {
                    r && n.abort(), e(t, r)
                  }));
                  return n
                }, t
              }();

            function ie(t) {
              return function () {
                return t.isSupported()
              }
            }
            var oe, se = function (t, e) {
                var n = {};

                function r(r, i, o, s, a) {
                  var c = e(t, r, i, o, s, a);
                  return n[r] = c, c
                }
                var i, o = {
                    hostNonTLS: t.wsHost + ":" + t.wsPort,
                    hostTLS: t.wsHost + ":" + t.wssPort,
                    httpPath: t.wsPath
                  },
                  s = T({}, o, {
                    useTLS: !0
                  }),
                  a = {
                    hostNonTLS: t.httpHost + ":" + t.httpPort,
                    hostTLS: t.httpHost + ":" + t.httpsPort,
                    httpPath: t.httpPath
                  },
                  c = {
                    loop: !0,
                    timeout: 15e3,
                    timeoutLimit: 6e4
                  },
                  u = new Wt({
                    lives: 2,
                    minPingDelay: 1e4,
                    maxPingDelay: t.activity_timeout
                  }),
                  h = new Wt({
                    lives: 2,
                    minPingDelay: 1e4,
                    maxPingDelay: t.activity_timeout
                  }),
                  f = r("ws", "ws", 3, o, u),
                  p = r("wss", "ws", 3, s, u),
                  l = r("sockjs", "sockjs", 1, a),
                  y = r("xhr_streaming", "xhr_streaming", 1, a, h),
                  d = r("xdr_streaming", "xdr_streaming", 1, a, h),
                  v = r("xhr_polling", "xhr_polling", 1, a),
                  g = r("xdr_polling", "xdr_polling", 1, a),
                  b = new Vt([f], c),
                  m = new Vt([p], c),
                  w = new Vt([l], c),
                  k = new Vt([new ne(ie(y), y, d)], c),
                  _ = new Vt([new ne(ie(v), v, g)], c),
                  S = new Vt([new ne(ie(k), new Gt([k, new ee(_, {
                    delay: 4e3
                  })]), _)], c),
                  E = new ne(ie(S), S, w);
                return i = t.useTLS ? new Gt([b, new ee(E, {
                  delay: 2e3
                })]) : new Gt([b, new ee(m, {
                  delay: 2e3
                }), new ee(E, {
                  delay: 5e3
                })]), new Zt(new re(new ne(ie(f), i, E)), n, {
                  ttl: 18e5,
                  timeline: t.timeline,
                  useTLS: t.useTLS
                })
              },
              ae = {
                getRequest: function (t) {
                  var e = new window.XDomainRequest;
                  return e.ontimeout = function () {
                    t.emit("error", new Ot), t.close()
                  }, e.onerror = function (e) {
                    t.emit("error", e), t.close()
                  }, e.onprogress = function () {
                    e.responseText && e.responseText.length > 0 && t.onChunk(200, e.responseText)
                  }, e.onload = function () {
                    e.responseText && e.responseText.length > 0 && t.onChunk(200, e.responseText), t.emit("finished", 200), t.close()
                  }, e
                },
                abortRequest: function (t) {
                  t.ontimeout = t.onerror = t.onprogress = t.onload = null, t.abort()
                }
              },
              ce = function () {
                var t = function (e, n) {
                  return (t = Object.setPrototypeOf || {
                      __proto__: []
                    }
                    instanceof Array && function (t, e) {
                      t.__proto__ = e
                    } || function (t, e) {
                      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
                };
                return function (e, n) {
                  function r() {
                    this.constructor = e
                  }
                  t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                }
              }(),
              ue = function (t) {
                function e(e, n, r) {
                  var i = t.call(this) || this;
                  return i.hooks = e, i.method = n, i.url = r, i
                }
                return ce(e, t), e.prototype.start = function (t) {
                  var e = this;
                  this.position = 0, this.xhr = this.hooks.getRequest(this), this.unloader = function () {
                    e.close()
                  }, we.addUnloadListener(this.unloader), this.xhr.open(this.method, this.url, !0), this.xhr.setRequestHeader && this.xhr.setRequestHeader("Content-Type", "application/json"), this.xhr.send(t)
                }, e.prototype.close = function () {
                  this.unloader && (we.removeUnloadListener(this.unloader), this.unloader = null), this.xhr && (this.hooks.abortRequest(this.xhr), this.xhr = null)
                }, e.prototype.onChunk = function (t, e) {
                  for (;;) {
                    var n = this.advanceBuffer(e);
                    if (!n) break;
                    this.emit("chunk", {
                      status: t,
                      data: n
                    })
                  }
                  this.isBufferTooLong(e) && this.emit("buffer_too_long")
                }, e.prototype.advanceBuffer = function (t) {
                  var e = t.slice(this.position),
                    n = e.indexOf("\n");
                  return -1 !== n ? (this.position += n + 1, e.slice(0, n)) : null
                }, e.prototype.isBufferTooLong = function (t) {
                  return this.position === t.length && t.length > 262144
                }, e
              }(tt);
            ! function (t) {
              t[t.CONNECTING = 0] = "CONNECTING", t[t.OPEN = 1] = "OPEN", t[t.CLOSED = 3] = "CLOSED"
            }(oe || (oe = {}));
            var he = oe,
              fe = 1;

            function pe(t) {
              var e = -1 === t.indexOf("?") ? "?" : "&";
              return t + e + "t=" + +new Date + "&n=" + fe++
            }

            function le(t) {
              return Math.floor(Math.random() * t)
            }
            var ye, de = function () {
                function t(t, e) {
                  this.hooks = t, this.session = le(1e3) + "/" + function (t) {
                    for (var e = [], n = 0; n < t; n++) e.push(le(32).toString(32));
                    return e.join("")
                  }(8), this.location = function (t) {
                    var e = /([^\?]*)\/*(\??.*)/.exec(t);
                    return {
                      base: e[1],
                      queryString: e[2]
                    }
                  }(e), this.readyState = he.CONNECTING, this.openStream()
                }
                return t.prototype.send = function (t) {
                  return this.sendRaw(JSON.stringify([t]))
                }, t.prototype.ping = function () {
                  this.hooks.sendHeartbeat(this)
                }, t.prototype.close = function (t, e) {
                  this.onClose(t, e, !0)
                }, t.prototype.sendRaw = function (t) {
                  if (this.readyState !== he.OPEN) return !1;
                  try {
                    return we.createSocketRequest("POST", pe((e = this.location, n = this.session, e.base + "/" + n + "/xhr_send"))).start(t), !0
                  } catch (t) {
                    return !1
                  }
                  var e, n
                }, t.prototype.reconnect = function () {
                  this.closeStream(), this.openStream()
                }, t.prototype.onClose = function (t, e, n) {
                  this.closeStream(), this.readyState = he.CLOSED, this.onclose && this.onclose({
                    code: t,
                    reason: e,
                    wasClean: n
                  })
                }, t.prototype.onChunk = function (t) {
                  var e;
                  if (200 === t.status) switch (this.readyState === he.OPEN && this.onActivity(), t.data.slice(0, 1)) {
                    case "o":
                      e = JSON.parse(t.data.slice(1) || "{}"), this.onOpen(e);
                      break;
                    case "a":
                      e = JSON.parse(t.data.slice(1) || "[]");
                      for (var n = 0; n < e.length; n++) this.onEvent(e[n]);
                      break;
                    case "m":
                      e = JSON.parse(t.data.slice(1) || "null"), this.onEvent(e);
                      break;
                    case "h":
                      this.hooks.onHeartbeat(this);
                      break;
                    case "c":
                      e = JSON.parse(t.data.slice(1) || "[]"), this.onClose(e[0], e[1], !0)
                  }
                }, t.prototype.onOpen = function (t) {
                  var e, n, r;
                  this.readyState === he.CONNECTING ? (t && t.hostname && (this.location.base = (e = this.location.base, n = t.hostname, (r = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(e))[1] + n + r[3])), this.readyState = he.OPEN, this.onopen && this.onopen()) : this.onClose(1006, "Server lost session", !0)
                }, t.prototype.onEvent = function (t) {
                  this.readyState === he.OPEN && this.onmessage && this.onmessage({
                    data: t
                  })
                }, t.prototype.onActivity = function () {
                  this.onactivity && this.onactivity()
                }, t.prototype.onError = function (t) {
                  this.onerror && this.onerror(t)
                }, t.prototype.openStream = function () {
                  var t = this;
                  this.stream = we.createSocketRequest("POST", pe(this.hooks.getReceiveURL(this.location, this.session))), this.stream.bind("chunk", (function (e) {
                    t.onChunk(e)
                  })), this.stream.bind("finished", (function (e) {
                    t.hooks.onFinished(t, e)
                  })), this.stream.bind("buffer_too_long", (function () {
                    t.reconnect()
                  }));
                  try {
                    this.stream.start()
                  } catch (e) {
                    A.defer((function () {
                      t.onError(e), t.onClose(1006, "Could not start streaming", !1)
                    }))
                  }
                }, t.prototype.closeStream = function () {
                  this.stream && (this.stream.unbind_all(), this.stream.close(), this.stream = null)
                }, t
              }(),
              ve = {
                getReceiveURL: function (t, e) {
                  return t.base + "/" + e + "/xhr_streaming" + t.queryString
                },
                onHeartbeat: function (t) {
                  t.sendRaw("[]")
                },
                sendHeartbeat: function (t) {
                  t.sendRaw("[]")
                },
                onFinished: function (t, e) {
                  t.onClose(1006, "Connection interrupted (" + e + ")", !1)
                }
              },
              ge = {
                getReceiveURL: function (t, e) {
                  return t.base + "/" + e + "/xhr" + t.queryString
                },
                onHeartbeat: function () {},
                sendHeartbeat: function (t) {
                  t.sendRaw("[]")
                },
                onFinished: function (t, e) {
                  200 === e ? t.reconnect() : t.onClose(1006, "Connection interrupted (" + e + ")", !1)
                }
              },
              be = {
                getRequest: function (t) {
                  var e = new(we.getXHRAPI());
                  return e.onreadystatechange = e.onprogress = function () {
                    switch (e.readyState) {
                      case 3:
                        e.responseText && e.responseText.length > 0 && t.onChunk(e.status, e.responseText);
                        break;
                      case 4:
                        e.responseText && e.responseText.length > 0 && t.onChunk(e.status, e.responseText), t.emit("finished", e.status), t.close()
                    }
                  }, e
                },
                abortRequest: function (t) {
                  t.onreadystatechange = null, t.abort()
                }
              },
              me = {
                createStreamingSocket: function (t) {
                  return this.createSocket(ve, t)
                },
                createPollingSocket: function (t) {
                  return this.createSocket(ge, t)
                },
                createSocket: function (t, e) {
                  return new de(t, e)
                },
                createXHR: function (t, e) {
                  return this.createRequest(be, t, e)
                },
                createRequest: function (t, e, n) {
                  return new ue(t, e, n)
                },
                createXDR: function (t, e) {
                  return this.createRequest(ae, t, e)
                }
              },
              we = {
                nextAuthCallbackID: 1,
                auth_callbacks: {},
                ScriptReceivers: i,
                DependenciesReceivers: a,
                getDefaultStrategy: se,
                Transports: yt,
                transportConnectionInitializer: function () {
                  var t = this;
                  t.timeline.info(t.buildTimelineMessage({
                    transport: t.name + (t.options.useTLS ? "s" : "")
                  })), t.hooks.isInitialized() ? t.changeState("initialized") : t.hooks.file ? (t.changeState("initializing"), c.load(t.hooks.file, {
                    useTLS: t.options.useTLS
                  }, (function (e, n) {
                    t.hooks.isInitialized() ? (t.changeState("initialized"), n(!0)) : (e && t.onError(e), t.onClose(), n(!1))
                  }))) : t.onClose()
                },
                HTTPFactory: me,
                TimelineTransport: J,
                getXHRAPI: function () {
                  return window.XMLHttpRequest
                },
                getWebSocketAPI: function () {
                  return window.WebSocket || window.MozWebSocket
                },
                setup: function (t) {
                  var e = this;
                  window.Pusher = t;
                  var n = function () {
                    e.onDocumentBody(t.ready)
                  };
                  window.JSON ? n() : c.load("json2", {}, n)
                },
                getDocument: function () {
                  return document
                },
                getProtocol: function () {
                  return this.getDocument().location.protocol
                },
                getAuthorizers: function () {
                  return {
                    ajax: q,
                    jsonp: F
                  }
                },
                onDocumentBody: function (t) {
                  var e = this;
                  document.body ? t() : setTimeout((function () {
                    e.onDocumentBody(t)
                  }), 0)
                },
                createJSONPRequest: function (t, e) {
                  return new Y(t, e)
                },
                createScriptRequest: function (t) {
                  return new X(t)
                },
                getLocalStorage: function () {
                  try {
                    return window.localStorage
                  } catch (t) {
                    return
                  }
                },
                createXHR: function () {
                  return this.getXHRAPI() ? this.createXMLHttpRequest() : this.createMicrosoftXHR()
                },
                createXMLHttpRequest: function () {
                  return new(this.getXHRAPI())
                },
                createMicrosoftXHR: function () {
                  return new ActiveXObject("Microsoft.XMLHTTP")
                },
                getNetwork: function () {
                  return vt
                },
                createWebSocket: function (t) {
                  return new(this.getWebSocketAPI())(t)
                },
                createSocketRequest: function (t, e) {
                  if (this.isXHRSupported()) return this.HTTPFactory.createXHR(t, e);
                  if (this.isXDRSupported(0 === e.indexOf("https:"))) return this.HTTPFactory.createXDR(t, e);
                  throw "Cross-origin HTTP requests are not supported"
                },
                isXHRSupported: function () {
                  var t = this.getXHRAPI();
                  return Boolean(t) && void 0 !== (new t).withCredentials
                },
                isXDRSupported: function (t) {
                  var e = t ? "https:" : "http:",
                    n = this.getProtocol();
                  return Boolean(window.XDomainRequest) && n === e
                },
                addUnloadListener: function (t) {
                  void 0 !== window.addEventListener ? window.addEventListener("unload", t, !1) : void 0 !== window.attachEvent && window.attachEvent("onunload", t)
                },
                removeUnloadListener: function (t) {
                  void 0 !== window.addEventListener ? window.removeEventListener("unload", t, !1) : void 0 !== window.detachEvent && window.detachEvent("onunload", t)
                }
              };
            ! function (t) {
              t[t.ERROR = 3] = "ERROR", t[t.INFO = 6] = "INFO", t[t.DEBUG = 7] = "DEBUG"
            }(ye || (ye = {}));
            var ke = ye,
              _e = function () {
                function t(t, e, n) {
                  this.key = t, this.session = e, this.events = [], this.options = n || {}, this.sent = 0, this.uniqueID = 0
                }
                return t.prototype.log = function (t, e) {
                  t <= this.options.level && (this.events.push(T({}, e, {
                    timestamp: A.now()
                  })), this.options.limit && this.events.length > this.options.limit && this.events.shift())
                }, t.prototype.error = function (t) {
                  this.log(ke.ERROR, t)
                }, t.prototype.info = function (t) {
                  this.log(ke.INFO, t)
                }, t.prototype.debug = function (t) {
                  this.log(ke.DEBUG, t)
                }, t.prototype.isEmpty = function () {
                  return 0 === this.events.length
                }, t.prototype.send = function (t, e) {
                  var n = this,
                    r = T({
                      session: this.session,
                      bundle: this.sent + 1,
                      key: this.key,
                      lib: "js",
                      version: this.options.version,
                      cluster: this.options.cluster,
                      features: this.options.features,
                      timeline: this.events
                    }, this.options.params);
                  return this.events = [], t(r, (function (t, r) {
                    t || n.sent++, e && e(t, r)
                  })), !0
                }, t.prototype.generateUniqueID = function () {
                  return this.uniqueID++, this.uniqueID
                }, t
              }(),
              Se = function () {
                function t(t, e, n, r) {
                  this.name = t, this.priority = e, this.transport = n, this.options = r || {}
                }
                return t.prototype.isSupported = function () {
                  return this.transport.isSupported({
                    useTLS: this.options.useTLS
                  })
                }, t.prototype.connect = function (t, e) {
                  var n = this;
                  if (!this.isSupported()) return Ee(new Ut, e);
                  if (this.priority < t) return Ee(new Ct, e);
                  var r = !1,
                    i = this.transport.createConnection(this.name, this.priority, this.options.key, this.options),
                    o = null,
                    s = function () {
                      i.unbind("initialized", s), i.connect()
                    },
                    a = function () {
                      o = Kt.createHandshake(i, (function (t) {
                        r = !0, h(), e(null, t)
                      }))
                    },
                    c = function (t) {
                      h(), e(t)
                    },
                    u = function () {
                      var t;
                      h(), t = N(i), e(new Pt(t))
                    },
                    h = function () {
                      i.unbind("initialized", s), i.unbind("open", a), i.unbind("error", c), i.unbind("closed", u)
                    };
                  return i.bind("initialized", s), i.bind("open", a), i.bind("error", c), i.bind("closed", u), i.initialize(), {
                    abort: function () {
                      r || (h(), o ? o.close() : i.close())
                    },
                    forceMinPriority: function (t) {
                      r || n.priority < t && (o ? o.close() : i.close())
                    }
                  }
                }, t
              }();

            function Ee(t, e) {
              return A.defer((function () {
                e(t)
              })), {
                abort: function () {},
                forceMinPriority: function () {}
              }
            }
            var Ae = we.Transports,
              Te = function (t, e, n, r, i, o) {
                var s = Ae[n];
                if (!s) throw new Lt(n);
                return t.enabledTransports && -1 === C(t.enabledTransports, e) || t.disabledTransports && -1 !== C(t.disabledTransports, e) ? Oe : new Se(e, r, o ? o.getAssistant(s) : s, T({
                  key: t.key,
                  useTLS: t.useTLS,
                  timeline: t.timeline,
                  ignoreNullOrigin: t.ignoreNullOrigin
                }, i))
              },
              Oe = {
                isSupported: function () {
                  return !1
                },
                connect: function (t, e) {
                  var n = A.defer((function () {
                    e(new Ut)
                  }));
                  return {
                    abort: function () {
                      n.ensureAborted()
                    },
                    forceMinPriority: function () {}
                  }
                }
              },
              Ce = function () {
                function t(e, n) {
                  var r, i = this;
                  if (function (t) {
                      if (null == t) throw "You must pass your app key when you instantiate Pusher."
                    }(e), !(n = n || {}).cluster && !n.wsHost && !n.httpHost) {
                    var s = H("javascriptQuickStart");
                    D.warn("You should always specify a cluster when connecting. " + s)
                  }
                  "disableStats" in n && (D.warn("The disableStats option is deprecated in favor of enableStats"), "enableStats" in n || (n.enableStats = !n.disableStats)),
                  this.key = e,
                  this.config = T({
                    wsHost: o.host,
                    wsPort: o.ws_port,
                    wssPort: o.wss_port,
                    wsPath: o.ws_path,
                    httpHost: o.sockjs_host,
                    httpPort: o.sockjs_http_port,
                    httpsPort: o.sockjs_https_port,
                    httpPath: o.sockjs_path,
                    statsHost: o.stats_host,
                    authEndpoint: o.channel_auth_endpoint,
                    authTransport: o.channel_auth_transport,
                    activity_timeout: o.activity_timeout,
                    pong_timeout: o.pong_timeout,
                    unavailable_timeout: o.unavailable_timeout
                  }, n.cluster ? {
                    wsHost: "ws-" + (r = n.cluster) + ".pusher.com",
                    httpHost: "sockjs-" + r + ".pusher.com"
                  } : {}, n),
                  this.channels = Kt.createChannels(),
                  this.global_emitter = new tt,
                  this.sessionID = Math.floor(1e9 * Math.random()),
                  this.timeline = new _e(this.key, this.sessionID, {
                    cluster: this.config.cluster,
                    features: t.getClientFeatures(),
                    params: this.config.timelineParams || {},
                    limit: 50,
                    level: ke.INFO,
                    version: o.VERSION
                  }),
                  this.config.enableStats && (this.timelineSender = Kt.createTimelineSender(this.timeline, {
                    host: this.config.statsHost,
                    path: "/timeline/v2/" + we.TimelineTransport.name
                  })),
                  this.connection = Kt.createConnectionManager(this.key, T({
                    getStrategy: function (t) {
                      var e = T({}, i.config, t);
                      return we.getDefaultStrategy(e, Te)
                    },
                    timeline: this.timeline,
                    activityTimeout: this.config.activity_timeout,
                    pongTimeout: this.config.pong_timeout,
                    unavailableTimeout: this.config.unavailable_timeout
                  },
                  this.config, {
                    useTLS: this.shouldUseTLS()
                  })),
                  this.connection.bind("connected", (function () {
                    i.subscribeAll(), i.timelineSender && i.timelineSender.send(i.connection.isUsingTLS())
                  })),
                  this.connection.bind("message", (function (t) {
                    var e = 0 === t.event.indexOf("pusher_internal:");
                    if (t.channel) {
                      var n = i.channel(t.channel);
                      n && n.handleEvent(t)
                    }
                    e || i.global_emitter.emit(t.event, t.data)
                  })), 
                  this.connection.bind("connecting", (function () {
                    i.channels.disconnect()
                  })), 
                  this.connection.bind("disconnected", (function () {
                    i.channels.disconnect()
                  })), 
                  this.connection.bind("error", (function (t) {
                    D.warn(t)
                  })), 
                  t.instances.push(this), this.timeline.info({
                    instances: t.instances.length
                  }), 
                  t.isReady && this.connect()
                }
                return t.ready = function () {
                  t.isReady = !0;
                  for (var e = 0, n = t.instances.length; e < n; e++) t.instances[e].connect()
                }, t.getClientFeatures = function () {
                  return x(B({
                    ws: we.Transports.ws
                  }, (function (t) {
                    return t.isSupported({})
                  })))
                }, t.prototype.channel = function (t) {
                  return this.channels.find(t)
                }, t.prototype.allChannels = function () {
                  return this.channels.all()
                }, t.prototype.connect = function () {
                  if (this.connection.connect(), this.timelineSender && !this.timelineSenderTimer) {
                    var t = this.connection.isUsingTLS(),
                      e = this.timelineSender;
                    this.timelineSenderTimer = new E(6e4, (function () {
                      e.send(t)
                    }))
                  }
                }, t.prototype.disconnect = function () {
                  this.connection.disconnect(), this.timelineSenderTimer && (this.timelineSenderTimer.ensureAborted(), this.timelineSenderTimer = null)
                }, t.prototype.bind = function (t, e, n) {
                  return this.global_emitter.bind(t, e, n), this
                }, t.prototype.unbind = function (t, e, n) {
                  return this.global_emitter.unbind(t, e, n), this
                }, t.prototype.bind_global = function (t) {
                  return this.global_emitter.bind_global(t), this
                }, t.prototype.unbind_global = function (t) {
                  return this.global_emitter.unbind_global(t), this
                }, t.prototype.unbind_all = function (t) {
                  return this.global_emitter.unbind_all(), this
                }, t.prototype.subscribeAll = function () {
                  var t;
                  for (t in this.channels.channels) this.channels.channels.hasOwnProperty(t) && this.subscribe(t)
                }, t.prototype.subscribe = function (t) {
                  console.log(t)
                  var e = this.channels.add(t, this);
                  return e.subscriptionPending && e.subscriptionCancelled ? e.reinstateSubscription() : e.subscriptionPending || "connected" !== this.connection.state || e.subscribe(), e
                }, t.prototype.unsubscribe = function (t) {
                  var e = this.channels.find(t);
                  e && e.subscriptionPending ? e.cancelSubscription() : (e = this.channels.remove(t)) && "connected" === this.connection.state && e.unsubscribe()
                }, t.prototype.send_event = function (t, e, n) {
                  return this.connection.send_event(t, e, n)
                }, t.prototype.shouldUseTLS = function () {
                  return "https:" === we.getProtocol() || !0 === this.config.forceTLS || Boolean(this.config.encrypted)
                }, t.instances = [], t.isReady = !1, t.logToConsole = !1, t.Runtime = we, t.ScriptReceivers = we.ScriptReceivers, t.DependenciesReceivers = we.DependenciesReceivers, t.auth_callbacks = we.auth_callbacks, t
              }(),
              Pe = e.default = Ce;
            we.setup(Ce)
          }])
        }, t.exports = r()
      }
    },
    e = {};

  function n(r) {
    var i = e[r];
    if (void 0 !== i) return i.exports;
    var o = e[r] = {
      exports: {}
    };
    return t[r](o, o.exports, n), o.exports
  }(() => {
    "use strict";

    function t(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function e(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
      }
    }

    function r(t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t
    }

    function i() {
      return (i = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
      }).apply(this, arguments)
    }

    function o(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), e && a(t, e)
    }

    function s(t) {
      return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
    }

    function a(t, e) {
      return (a = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e, t
      })(t, e)
    }

    function c(t, e) {
      return !e || "object" != typeof e && "function" != typeof e ? function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
      }(t) : e
    }

    function u(t) {
      var e = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
        } catch (t) {
          return !1
        }
      }();
      return function () {
        var n, r = s(t);
        if (e) {
          var i = s(this).constructor;
          n = Reflect.construct(r, arguments, i)
        } else n = r.apply(this, arguments);
        return c(this, n)
      }
    }
    var h = function () {
        function e(n) {
          t(this, e), this._defaultOptions = {
            auth: {
              headers: {}
            },
            authEndpoint: "/broadcasting/auth",
            broadcaster: "pusher",
            csrfToken: null,
            host: null,
            key: null,
            namespace: "App.Events"
          }, this.setOptions(n), this.connect()
        }
        return r(e, [{
          key: "setOptions",
          value: function (t) {
            return this.options = i(this._defaultOptions, t), this.csrfToken() && (this.options.auth.headers["X-CSRF-TOKEN"] = this.csrfToken()), t
          }
        }, {
          key: "csrfToken",
          value: function () {
            var t;
            return "undefined" != typeof window && window.Laravel && window.Laravel.csrfToken ? window.Laravel.csrfToken : this.options.csrfToken ? this.options.csrfToken : "undefined" != typeof document && "function" == typeof document.querySelector && (t = document.querySelector('meta[name="csrf-token"]')) ? t.getAttribute("content") : null
          }
        }]), e
      }(),
      f = function () {
        function e() {
          t(this, e)
        }
        return r(e, [{
          key: "listenForWhisper",
          value: function (t, e) {
            return this.listen(".client-" + t, e)
          }
        }, {
          key: "notification",
          value: function (t) {
            return this.listen(".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", t)
          }
        }, {
          key: "stopListeningForWhisper",
          value: function (t, e) {
            return this.stopListening(".client-" + t, e)
          }
        }]), e
      }(),
      p = function () {
        function e(n) {
          t(this, e), this.setNamespace(n)
        }
        return r(e, [{
          key: "format",
          value: function (t) {
            return "." === t.charAt(0) || "\\" === t.charAt(0) ? t.substr(1) : (this.namespace && (t = this.namespace + "." + t), t.replace(/\./g, "\\"))
          }
        }, {
          key: "setNamespace",
          value: function (t) {
            this.namespace = t
          }
        }]), e
      }(),
      l = function (e) {
        o(i, e);
        var n = u(i);

        function i(e, r, o) {
          var s;
          return t(this, i), (s = n.call(this)).name = r, s.pusher = e, s.options = o, s.eventFormatter = new p(s.options.namespace), s.subscribe(), s
        }
        return r(i, [{
          key: "subscribe",
          value: function () {
            this.subscription = this.pusher.subscribe(this.name)
          }
        }, {
          key: "unsubscribe",
          value: function () {
            this.pusher.unsubscribe(this.name)
          }
        }, {
          key: "listen",
          value: function (t, e) {
            return this.on(this.eventFormatter.format(t), e), this
          }
        }, {
          key: "stopListening",
          value: function (t, e) {
            return e ? this.subscription.unbind(this.eventFormatter.format(t), e) : this.subscription.unbind(this.eventFormatter.format(t)), this
          }
        }, {
          key: "subscribed",
          value: function (t) {
            return this.on("pusher:subscription_succeeded", (function () {
              t()
            })), this
          }
        }, {
          key: "error",
          value: function (t) {
            return this.on("pusher:subscription_error", (function (e) {
              t(e)
            })), this
          }
        }, {
          key: "on",
          value: function (t, e) {
            return this.subscription.bind(t, e), this
          }
        }]), i
      }(f),
      y = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return r(i, [{
          key: "whisper",
          value: function (t, e) {
            return this.pusher.channels.channels[this.name].trigger("client-".concat(t), e), this
          }
        }]), i
      }(l),
      d = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return r(i, [{
          key: "whisper",
          value: function (t, e) {
            return this.pusher.channels.channels[this.name].trigger("client-".concat(t), e), this
          }
        }]), i
      }(l),
      v = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return r(i, [{
          key: "here",
          value: function (t) {
            return this.on("pusher:subscription_succeeded", (function (e) {
              t(Object.keys(e.members).map((function (t) {
                return e.members[t]
              })))
            })), this
          }
        }, {
          key: "joining",
          value: function (t) {
            return this.on("pusher:member_added", (function (e) {
              t(e.info)
            })), this
          }
        }, {
          key: "leaving",
          value: function (t) {
            return this.on("pusher:member_removed", (function (e) {
              t(e.info)
            })), this
          }
        }, {
          key: "whisper",
          value: function (t, e) {
            return this.pusher.channels.channels[this.name].trigger("client-".concat(t), e), this
          }
        }]), i
      }(l),
      g = function (e) {
        o(i, e);
        var n = u(i);

        function i(e, r, o) {
          var s;
          return t(this, i), (s = n.call(this)).events = {}, s.listeners = {}, s.name = r, s.socket = e, s.options = o, s.eventFormatter = new p(s.options.namespace), s.subscribe(), s
        }
        return r(i, [{
          key: "subscribe",
          value: function () {
            this.socket.emit("subscribe", {
              channel: this.name,
              auth: this.options.auth || {}
            })
          }
        }, {
          key: "unsubscribe",
          value: function () {
            this.unbind(), this.socket.emit("unsubscribe", {
              channel: this.name,
              auth: this.options.auth || {}
            })
          }
        }, {
          key: "listen",
          value: function (t, e) {
            return this.on(this.eventFormatter.format(t), e), this
          }
        }, {
          key: "stopListening",
          value: function (t, e) {
            return this.unbindEvent(this.eventFormatter.format(t), e), this
          }
        }, {
          key: "subscribed",
          value: function (t) {
            return this.on("connect", (function (e) {
              t(e)
            })), this
          }
        }, {
          key: "error",
          value: function (t) {
            return this
          }
        }, {
          key: "on",
          value: function (t, e) {
            var n = this;
            return this.listeners[t] = this.listeners[t] || [], this.events[t] || (this.events[t] = function (e, r) {
              n.name === e && n.listeners[t] && n.listeners[t].forEach((function (t) {
                return t(r)
              }))
            }, this.socket.on(t, this.events[t])), this.listeners[t].push(e), this
          }
        }, {
          key: "unbind",
          value: function () {
            var t = this;
            Object.keys(this.events).forEach((function (e) {
              t.unbindEvent(e)
            }))
          }
        }, {
          key: "unbindEvent",
          value: function (t, e) {
            this.listeners[t] = this.listeners[t] || [], e && (this.listeners[t] = this.listeners[t].filter((function (t) {
              return t !== e
            }))), e && 0 !== this.listeners[t].length || (this.events[t] && (this.socket.removeListener(t, this.events[t]), delete this.events[t]), delete this.listeners[t])
          }
        }]), i
      }(f),
      b = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return r(i, [{
          key: "whisper",
          value: function (t, e) {
            return this.socket.emit("client event", {
              channel: this.name,
              event: "client-".concat(t),
              data: e
            }), this
          }
        }]), i
      }(g),
      m = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return r(i, [{
          key: "here",
          value: function (t) {
            return this.on("presence:subscribed", (function (e) {
              t(e.map((function (t) {
                return t.user_info
              })))
            })), this
          }
        }, {
          key: "joining",
          value: function (t) {
            return this.on("presence:joining", (function (e) {
              return t(e.user_info)
            })), this
          }
        }, {
          key: "leaving",
          value: function (t) {
            return this.on("presence:leaving", (function (e) {
              return t(e.user_info)
            })), this
          }
        }]), i
      }(b),
      w = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return r(i, [{
          key: "subscribe",
          value: function () {}
        }, {
          key: "unsubscribe",
          value: function () {}
        }, {
          key: "listen",
          value: function (t, e) {
            return this
          }
        }, {
          key: "stopListening",
          value: function (t, e) {
            return this
          }
        }, {
          key: "subscribed",
          value: function (t) {
            return this
          }
        }, {
          key: "error",
          value: function (t) {
            return this
          }
        }, {
          key: "on",
          value: function (t, e) {
            return this
          }
        }]), i
      }(f),
      k = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return r(i, [{
          key: "whisper",
          value: function (t, e) {
            return this
          }
        }]), i
      }(w),
      _ = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          return t(this, i), n.apply(this, arguments)
        }
        return r(i, [{
          key: "here",
          value: function (t) {
            return this
          }
        }, {
          key: "joining",
          value: function (t) {
            return this
          }
        }, {
          key: "leaving",
          value: function (t) {
            return this
          }
        }, {
          key: "whisper",
          value: function (t, e) {
            return this
          }
        }]), i
      }(w),
      S = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          var e;
          return t(this, i), (e = n.apply(this, arguments)).channels = {}, e
        }
        return r(i, [{
          key: "connect",
          value: function () {
            void 0 !== this.options.client ? this.pusher = this.options.client : this.pusher = new Pusher(this.options.key, this.options)
          }
        }, {
          key: "listen",
          value: function (t, e, n) {
            return this.channel(t).listen(e, n)
          }
        }, {
          key: "channel",
          value: function (t) {
            return this.channels[t] || (this.channels[t] = new l(this.pusher, t, this.options)), this.channels[t]
          }
        }, {
          key: "privateChannel",
          value: function (t) {
            return this.channels["private-" + t] || (this.channels["private-" + t] = new y(this.pusher, "private-" + t, this.options)), this.channels["private-" + t]
          }
        }, {
          key: "encryptedPrivateChannel",
          value: function (t) {
            return this.channels["private-encrypted-" + t] || (this.channels["private-encrypted-" + t] = new d(this.pusher, "private-encrypted-" + t, this.options)), this.channels["private-encrypted-" + t]
          }
        }, {
          key: "presenceChannel",
          value: function (t) {
            return this.channels["presence-" + t] || (this.channels["presence-" + t] = new v(this.pusher, "presence-" + t, this.options)), this.channels["presence-" + t]
          }
        }, {
          key: "leave",
          value: function (t) {
            var e = this;
            [t, "private-" + t, "presence-" + t].forEach((function (t, n) {
              e.leaveChannel(t)
            }))
          }
        }, {
          key: "leaveChannel",
          value: function (t) {
            this.channels[t] && (this.channels[t].unsubscribe(), delete this.channels[t])
          }
        }, {
          key: "socketId",
          value: function () {
            return this.pusher.connection.socket_id
          }
        }, {
          key: "disconnect",
          value: function () {
            this.pusher.disconnect()
          }
        }]), i
      }(h),
      E = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          var e;
          return t(this, i), (e = n.apply(this, arguments)).channels = {}, e
        }
        return r(i, [{
          key: "connect",
          value: function () {
            var t = this,
              e = this.getSocketIO();
            return this.socket = e(this.options.host, this.options), this.socket.on("reconnect", (function () {
              Object.values(t.channels).forEach((function (t) {
                t.subscribe()
              }))
            })), this.socket
          }
        }, {
          key: "getSocketIO",
          value: function () {
            if (void 0 !== this.options.client) return this.options.client;
            if ("undefined" != typeof io) return io;
            throw new Error("Socket.io client not found. Should be globally available or passed via options.client")
          }
        }, {
          key: "listen",
          value: function (t, e, n) {
            return this.channel(t).listen(e, n)
          }
        }, {
          key: "channel",
          value: function (t) {
            return this.channels[t] || (this.channels[t] = new g(this.socket, t, this.options)), this.channels[t]
          }
        }, {
          key: "privateChannel",
          value: function (t) {
            return this.channels["private-" + t] || (this.channels["private-" + t] = new b(this.socket, "private-" + t, this.options)), this.channels["private-" + t]
          }
        }, {
          key: "presenceChannel",
          value: function (t) {
            return this.channels["presence-" + t] || (this.channels["presence-" + t] = new m(this.socket, "presence-" + t, this.options)), this.channels["presence-" + t]
          }
        }, {
          key: "leave",
          value: function (t) {
            var e = this;
            [t, "private-" + t, "presence-" + t].forEach((function (t) {
              e.leaveChannel(t)
            }))
          }
        }, {
          key: "leaveChannel",
          value: function (t) {
            this.channels[t] && (this.channels[t].unsubscribe(), delete this.channels[t])
          }
        }, {
          key: "socketId",
          value: function () {
            return this.socket.id
          }
        }, {
          key: "disconnect",
          value: function () {
            this.socket.disconnect()
          }
        }]), i
      }(h),
      A = function (e) {
        o(i, e);
        var n = u(i);

        function i() {
          var e;
          return t(this, i), (e = n.apply(this, arguments)).channels = {}, e
        }
        return r(i, [{
          key: "connect",
          value: function () {}
        }, {
          key: "listen",
          value: function (t, e, n) {
            return new w
          }
        }, {
          key: "channel",
          value: function (t) {
            return new w
          }
        }, {
          key: "privateChannel",
          value: function (t) {
            return new k
          }
        }, {
          key: "presenceChannel",
          value: function (t) {
            return new _
          }
        }, {
          key: "leave",
          value: function (t) {}
        }, {
          key: "leaveChannel",
          value: function (t) {}
        }, {
          key: "socketId",
          value: function () {
            return "fake-socket-id"
          }
        }, {
          key: "disconnect",
          value: function () {}
        }]), i
      }(h);
    const T = function () {
      function e(n) {
        t(this, e), this.options = n, this.connect(), this.options.withoutInterceptors || this.registerInterceptors()
      }
      return r(e, [{
        key: "channel",
        value: function (t) {
          return this.connector.channel(t)
        }
      }, {
        key: "connect",
        value: function () {
          "pusher" == this.options.broadcaster ? this.connector = new S(this.options) : "socket.io" == this.options.broadcaster ? this.connector = new E(this.options) : "null" == this.options.broadcaster ? this.connector = new A(this.options) : "function" == typeof this.options.broadcaster && (this.connector = new this.options.broadcaster(this.options))
        }
      }, {
        key: "disconnect",
        value: function () {
          this.connector.disconnect()
        }
      }, {
        key: "join",
        value: function (t) {
          return this.connector.presenceChannel(t)
        }
      }, {
        key: "leave",
        value: function (t) {
          this.connector.leave(t)
        }
      }, {
        key: "leaveChannel",
        value: function (t) {
          this.connector.leaveChannel(t)
        }
      }, {
        key: "listen",
        value: function (t, e, n) {
          return this.connector.listen(t, e, n)
        }
      }, {
        key: "private",
        value: function (t) {
          return this.connector.privateChannel(t)
        }
      }, {
        key: "encryptedPrivate",
        value: function (t) {
          return this.connector.encryptedPrivateChannel(t)
        }
      }, {
        key: "socketId",
        value: function () {
          return this.connector.socketId()
        }
      }, {
        key: "registerInterceptors",
        value: function () {
          "function" == typeof Vue && Vue.http && this.registerVueRequestInterceptor(), "function" == typeof axios && this.registerAxiosRequestInterceptor(), "function" == typeof jQuery && this.registerjQueryAjaxSetup()
        }
      }, {
        key: "registerVueRequestInterceptor",
        value: function () {
          var t = this;
          Vue.http.interceptors.push((function (e, n) {
            t.socketId() && e.headers.set("X-Socket-ID", t.socketId()), n()
          }))
        }
      }, {
        key: "registerAxiosRequestInterceptor",
        value: function () {
          var t = this;
          axios.interceptors.request.use((function (e) {
            return t.socketId() && (e.headers["X-Socket-Id"] = t.socketId()), e
          }))
        }
      }, {
        key: "registerjQueryAjaxSetup",
        value: function () {
          var t = this;
          void 0 !== jQuery.ajax && jQuery.ajaxPrefilter((function (e, n, r) {
            t.socketId() && r.setRequestHeader("X-Socket-Id", t.socketId())
          }))
        }
      }]), e
    }();
    window.Pusher = n(606), window.Echo = new T({
      broadcaster: "pusher",
      key: "2ae25d102cc6cd41100a",
      wsHost: "socket.trakteer.id",
      wsPort: 443,
      wssPort: 443,
      disableStats: !0,
      enabledTransports: ["ws", "wss"],
      encrypted: !0
    })
  })()
})();