var NaviveShiori;
var NaviveShioriEncode;
var Kawari;
var BrowserFS;
var assert;
if (typeof module !== 'undefined' && module !== null && module.exports) {
  NativeShiori = require('../nativeshiori');
  NaviveShioriEncode = require('../nativeshiori-encode');
  Kawari = require('kawari.js');
  BrowserFS = require('browserfs');
  assert = require('power-assert');
}

describe('NativeShiori', function() {
  var lazy = {
    shiori: function() { return new Kawari(); },
    nativeshiori: function() { return new NativeShiori(lazy.shiori()); },
    nativeshiori_encode: function() { return new NativeShioriEncode(lazy.nativeshiori()); },
    fs: function() {
      var fsBase = new BrowserFS.FileSystem.InMemory();
      BrowserFS.initialize(fsBase);
      var fs = BrowserFS.BFSRequire('fs');
      return fs;
    },
  };

  var nativeshiori;

  beforeEach(function() {
    var fs = lazy.fs();
    nativeshiori = lazy.nativeshiori();
    fs.mkdirSync('/test-ghost');
    fs.writeFileSync('/test-ghost/kawarirc.kis', 'System.Callback.OnGET : ${System.Request.ID}\r\n');
    var FS = nativeshiori.FS;
    var BFS = new BrowserFS.EmscriptenFS(FS, nativeshiori.PATH, nativeshiori.ERRNO_CODES);
    FS.createFolder(FS.root, 'ghosts', true, true);
    FS.mount(BFS, {root: '/'}, '/ghosts');
  });

  context('Shiori', function() {
    it('initialized', function() { assert(lazy.shiori() instanceof Kawari) });
  });

  context('NativeShiori', function() {
    it('initialized', function() { assert(lazy.nativeshiori() instanceof NativeShiori) });
    it('can work', function() {
      assert(nativeshiori.load('/ghosts/test-ghost/') === 1);
      assert(/Value: OnBoot/.test(nativeshiori.request('GET SHIORI/3.0\r\nSender: SSP\r\nID: OnBoot\r\n\r\n')));
      assert(nativeshiori.unload() === 1);
    });
  });
});
