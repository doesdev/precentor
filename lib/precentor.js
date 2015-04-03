(function() {
  'use strict';
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function(document) {
    var Precentor, dom, precentor, _bitify, _boolify, _cc, _domStr, _extObj, _fullHex, _getEl, _isAry, _isElAry, _isObj, _isStr, _prepHex, _randar, _topKeyOfObj, _val;
    dom = document;
    precentor = function(obj) {
      var de, domEls, e, el, els, noElErr, optEls, pushRawEls, rawEls, settings, _i, _j, _k, _l, _len, _len1, _len2, _len3;
      noElErr = function() {
        console.error('Precentor was initialized without elements.');
      };
      optEls = obj.elements || obj.element;
      if (!optEls) {
        return noElErr();
      }
      rawEls = [];
      els = [];
      pushRawEls = function(e) {
        var el;
        if (_isStr(e)) {
          return rawEls.push({
            el: e,
            opts: null
          });
        } else {
          el = _topKeyOfObj(e);
          return rawEls.push({
            el: el,
            opts: e[el] || null
          });
        }
      };
      if (_isAry(optEls)) {
        for (_i = 0, _len = optEls.length; _i < _len; _i++) {
          e = optEls[_i];
          pushRawEls(e);
        }
      } else {
        pushRawEls(optEls);
      }
      for (_j = 0, _len1 = rawEls.length; _j < _len1; _j++) {
        el = rawEls[_j];
        if ((domEls = _getEl(el.el))) {
          if (_isElAry(domEls)) {
            for (_k = 0, _len2 = domEls.length; _k < _len2; _k++) {
              de = domEls[_k];
              els.push({
                el: de,
                opts: el.opts
              });
            }
          } else {
            els.push({
              el: domEls
            }, el.opts);
          }
        }
      }
      if (els.length === 0) {
        return noElErr();
      }
      settings = obj.settings || {};
      for (_l = 0, _len3 = els.length; _l < _len3; _l++) {
        el = els[_l];
        new Precentor(el, settings);
      }
    };
    Precentor = (function() {
      function Precentor(elObj, opts) {
        this.elObj = elObj;
        this.buildOpts = __bind(this.buildOpts, this);
        this.opts = _extObj({}, opts);
        this.inst = _randar();
        this.el = this.elObj.el;
        this.buildOpts();
      }

      Precentor.prototype.buildOpts = function() {
        var elDataSet, k, normalize, v;
        _extObj(this.opts, this.elObj.opts);
        elDataSet = this.el.dataset;
        normalize = (function(_this) {
          return function(k, v) {
            _this.opts[k.replace(/^precent(.)(.*)/, function(a, b, c) {
              return b.toLowerCase() + c;
            })] = v;
          };
        })(this);
        for (k in elDataSet) {
          v = elDataSet[k];
          normalize(k, v);
        }
      };

      return Precentor;

    })();
    _val = function(p, d) {
      if (p === false || p === 'false' || p === 0 || p === '0') {
        return p;
      } else {
        return p || d;
      }
    };
    _bitify = function(p, d) {
      if (p === false || p === 'false' || p === 0 || p === '0') {
        return 0;
      } else if (p === true || p === 'true' || p === '1' || p === 1) {
        return 1;
      } else {
        return d;
      }
    };
    _boolify = function(p, d) {
      if (p === false || p === 'false' || p === 0 || p === '0') {
        return false;
      } else {
        return !!p || d;
      }
    };
    _domStr = function(o) {
      var attrs, c, children, k, v, _i, _len, _ref, _ref1;
      attrs = '';
      children = '';
      if (o.attrs) {
        _ref = o.attrs;
        for (k in _ref) {
          v = _ref[k];
          attrs += ' ' + k + '="' + v + '"';
        }
      }
      if (o.children) {
        _ref1 = o.children;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          children += _isObj(c) ? _domStr(c) : c;
        }
      }
      return '<' + o.tag + attrs + '>' + (o.inner || children) + '</' + o.tag + '>';
    };
    _extObj = function(baseObj, extObj) {
      var k, v;
      for (k in extObj) {
        v = extObj[k];
        baseObj[k] = v;
      }
      return baseObj;
    };
    _isStr = function(obj) {
      return typeof obj === 'string';
    };
    _isAry = function(obj) {
      return obj instanceof Array;
    };
    _isElAry = function(obj) {
      return obj instanceof HTMLCollection;
    };
    _isObj = function(obj) {
      return obj !== null && typeof obj === 'object';
    };
    _topKeyOfObj = function(obj) {
      var k, v;
      for (k in obj) {
        v = obj[k];
        return k;
      }
    };
    _getEl = function(el) {
      var els;
      els = el.charAt(0) === '#' ? dom.getElementById(el.substr(1)) : dom.getElementsByClassName(el.substr(1));
      if (_isAry(els) && els.length === 0) {
        return null;
      } else {
        return els;
      }
    };
    _randar = function() {
      return (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0, 16);
    };
    _prepHex = function(hex) {
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) {
        return "" + hex + hex;
      } else {
        return hex;
      }
    };
    _fullHex = function(hex) {
      if (hex === 'transparent') {
        return hex;
      } else {
        return "#" + _prepHex(hex);
      }
    };
    _cc = function(hex) {
      return {
        r: parseInt((_prepHex(hex)).substring(0, 2), 16),
        g: parseInt((_prepHex(hex)).substring(2, 4), 16),
        b: parseInt((_prepHex(hex)).substring(4, 6), 16)
      };
    };
    this.precentor = precentor;
  })(document);

}).call(this);

//# sourceMappingURL=precentor.js.map
