/* (C) 2016 Narazaka : Licensed under The MIT License - http://narazaka.net/license/MIT?2016 */

var Encoding;
if (typeof module !== 'undefined' && typeof require !== 'undefined' && require !== null) {
  Encoding = require('encoding-japanese');
}

var NativeShioriEncode = function(shiori, debug) {
  this.shiori = shiori;
  this.debug = debug;
};

NativeShioriEncode.prototype.load = function(dirpath) {
  if (this.debug) console.log('nativeshiori-encode.load()', dirpath);
  var dirpath_enc = Encoding.codeToString(Encoding.convert(Encoding.stringToCode(dirpath), 'UTF8', 'UNICODE'));

  return this.shiori.load(dirpath_enc);
};

NativeShioriEncode.prototype.request = function(request) {
  if (this.debug) console.log('nativeshiori-encode.request()\n', request);
  var request_enc = Encoding.codeToString(Encoding.convert(Encoding.stringToCode(request), this.detect_shiori_charset(request), 'UNICODE'));

  var response_enc = this.shiori.request(request_enc);

  var response = Encoding.codeToString(Encoding.convert(Encoding.stringToCode(response_enc), 'UNICODE', this.detect_shiori_charset(response_enc)));

  if (this.debug) console.log('nativeshiori-encode.request() returns\n', response);
  return response;
};

NativeShioriEncode.prototype.unload = function() {
  if (this.debug) console.log('nativeshiori-encode.unload()');
  return this.shiori.unload();
};

NativeShioriEncode.prototype.push = function(dirpath, storage) {
  if (this.debug) console.log('nativeshiori-encode.push()', dirpath, storage);
  this.shiori.push(dirpath, storage);
};

NativeShioriEncode.prototype.pull = function(dirpath) {
  if (this.debug) console.log('nativeshiori-encode.pull()', dirpath);
  return this.shiori.pull(dirpath);
};

NativeShioriEncode.prototype.detect_shiori_charset = function(str) {
  var charset = 'AUTO';
  var result = str.match(/\r\nCharset: (.+)\r\n/i);
  if (result) {
    switch (result[1]) {
      case 'UTF-8':
        charset = 'UTF8';
        break;
      case 'Shift_JIS':
        charset = 'SJIS';
        break;
    }
  }
  return charset;
};

if ((typeof module !== 'undefined' && module !== null) && (module.exports != null)) module.exports = NativeShioriEncode;
