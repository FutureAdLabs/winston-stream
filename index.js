/*global Writable */

var stream = require("stream");
var util = require("util");

util.inherits(WinstonStream, stream.Writable);

function WinstonStream(logger, level) {
  stream.Writable.call(this, {decodeStrings: false});
  this._logger = logger;
  this._level = level;
}

WinstonStream.prototype._write = function _write(chunk, encoding, callback) {
  var s = (typeof chunk === "string") ? chunk : chunk.toString("utf-8");
  if (s.slice(-1) === "\n") {
    s = s.slice(0, -1);
  }
  this._logger.log(this._level, s);
  callback();
}

module.exports = function stream(logger, level) {
  return new WinstonStream(logger, level);
}
