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
  lazy('shiori', function() { return new Kawari(); });
  lazy('nativeshiori', function() { return new NativeShiori(this.shiori); });
  lazy('nativeshiori_encode', function() { return new NativeShioriEncode(this.nativeshiori); });
  lazy('fs', function() {
    var fsBase = new BrowserFS.FileSystem.InMemory();
    BrowserFS.initialize(fsBase);
    var fs = BrowserFS.BFSRequire('fs');
    return fs;
  });

  beforeEach(function() {
    this.fs.mkdirSync('/test-ghost');
    this.fs.writeFileSync('/test-ghost/kawarirc.kis', 'System.Callback.OnGET : ${System.Request.ID}\r\n');
    var FS = this.nativeshiori.FS;
    var BFS = new BrowserFS.EmscriptenFS(FS, this.nativeshiori.PATH, this.nativeshiori.ERRNO_CODES);
    FS.createFolder(FS.root, 'ghosts', true, true);
    FS.mount(BFS, {root: '/'}, '/ghosts');
  });

  context('Shiori', function() {
    it('initialized', function() { assert(this.shiori instanceof Kawari) });
  });

  context('NativeShiori', function() {
    it('initialized', function() { assert(this.nativeshiori instanceof NativeShiori) });
    it('can work', function() {
      assert(this.nativeshiori.load('/ghosts/test-ghost/') === 1);
      assert(/Value: OnBoot/.test(this.nativeshiori.request('GET SHIORI/3.0\r\nSender: SSP\r\nID: OnBoot\r\n\r\n')));
      assert(this.nativeshiori.unload() === 1);
    });
  });
});
