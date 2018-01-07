NativeShiori
================================

[![npm](https://img.shields.io/npm/v/nativeshiori.svg)](https://www.npmjs.com/package/nativeshiori)
[![npm license](https://img.shields.io/npm/l/nativeshiori.svg)](https://www.npmjs.com/package/nativeshiori)
[![npm download total](https://img.shields.io/npm/dt/nativeshiori.svg)](https://www.npmjs.com/package/nativeshiori)
[![npm download by month](https://img.shields.io/npm/dm/nativeshiori.svg)](https://www.npmjs.com/package/nativeshiori)
[![Bower](https://img.shields.io/bower/v/nativeshiori.svg)](https://github.com/Narazaka/nativeshiori)
[![Bower](https://img.shields.io/bower/l/nativeshiori.svg)](https://github.com/Narazaka/nativeshiori)

[![Dependency Status](https://david-dm.org/Narazaka/nativeshiori/status.svg)](https://david-dm.org/Narazaka/nativeshiori)
[![devDependency Status](https://david-dm.org/Narazaka/nativeshiori/dev-status.svg)](https://david-dm.org/Narazaka/nativeshiori?type=dev)
[![Travis Build Status](https://travis-ci.org/Narazaka/nativeshiori.svg?branch=master)](https://travis-ci.org/Narazaka/nativeshiori)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/Narazaka/nativeshiori?svg=true&branch=master)](https://ci.appveyor.com/project/Narazaka/nativeshiori)
[![Code Climate](https://codeclimate.com/github/Narazaka/nativeshiori/badges/gpa.svg)](https://codeclimate.com/github/Narazaka/nativeshiori)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f93742b08d2c4f39854914bafcedad28)](https://www.codacy.com/app/narazaka/nativeshiori?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Narazaka/nativeshiori&amp;utm_campaign=Badge_Grade)
[![Greenkeeper badge](https://badges.greenkeeper.io/Narazaka/nativeshiori.svg)](https://greenkeeper.io/)

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
    <script src="nativeshiori-encode.js"></script>

Usage
--------------------------------

    var kawarirc_str = 'System.Callback.OnGET: test\r\n';
    var kawarirc = Encoding.convert(Encoding.stringToCode(kawarirc_str), 'SJIS', 'UNICODE');
    var storage = {
      'kawarirc.kis': new Uint8Array(kawarirc) // filename: ArrayBuffer or Uint8Array
    };

    var nativeshiori = new NativeShioriEncode(new NativeShiori(new HogeShiori())); // Shiori instance (with auto charset convert)

    nativeshiori.push('/path/to/ghost/master/', storage); // write files in storage to FS (/path/to/ghost/master/*)

    var load_code = nativeshiori.load('/path/to/ghost/master/'); // load() **CAUTION**: SHIORI/3.0 load() expects path separator (ex. '/') at the end of dirpath

    var response = nativeshiori.request('GET SHIORI/3.0\r\nCharset: Shift_JIS\r\nID: OnBoot\r\n\r\n'); // request()

    var unload_code = nativeshiori.unload(); // unload()

    var after_storage = nativeshiori.pull('/path/to/ghost/master/'); // read and unlink files in FS and return them (filename: ArrayBuffer)

LICENSE
--------------------------------

(C) 2014-2016 Narazaka : Licensed under [The MIT License](http://narazaka.net/license/MIT?2016)
