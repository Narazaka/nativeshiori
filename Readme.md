NativeShiori
================================

What is the NativeShiori?
--------------------------------

Emscriptenized Shiori subsystem module that has load(), request(), unload() and wrapped as below.

    HogeShiori = function(){
      ... (emscripten code) ...
      this['Module'] = Module;
      this['FS'] = FS;
    };

These modules has too low level interface to use conveniently.

This is easy handler module for them.

Installation
--------------------------------

this requires [encoding-japanese](https://www.npmjs.org/package/encoding-japanese)

    bower install nativeshiori

or

    npm install nativeshiori

or download zip archive

then

    <script src="encoding.min.js"></script>
    <script src="nativeshiori.js"></script>

Usage
--------------------------------

    var kawarirc_str = 'System.Callback.OnGET: test\r\n';
    var kawarirc = Encoding.convert(Encoding.stringToCode(request), 'SJIS', 'UNICODE');
    var storage = {
      'kawarirc.kis': new Uint8Array(kawarirc) // filename: ArrayBufferView
    };
    
    var nativeshiori = new NativeShiori(new HogeShiori(), storage); // Shiori instance and optional storage (/hoge/ghost/master/*)
    
    var load_code = nativeshiori.load('/path/to/ghost/master'); // write files in storage to FS then load() if storage exists, else load()
    
    var response = nativeshiori.request('GET SHIORI/3.0\r\nCharset: Shift_JIS\r\nID: OnBoot\r\n\r\n'); // request()
    
    var unload_code = nativeshiori.unload(); // unload()

LICENSE
--------------------------------

(C) 2014 Narazaka : Licensed under [The MIT License](http://narazaka.net/license/MIT?2014)
