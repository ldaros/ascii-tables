/*!
 * word-wrap <https://github.com/jonschlinkert/word-wrap>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function wrap(str, options) {
  options = options || {};
  if (str == null) {
    return str;
  }

  var width = options.width || 50;
  var indent = typeof options.indent === "string" ? options.indent : "  ";

  var newline = options.newline || "\n" + indent;
  var escape = typeof options.escape === "function" ? options.escape : identity;

  var regexString = ".{1," + width + "}";
  if (options.cut !== true) {
    regexString += "([\\s\u200B]+|$)|[^\\s\u200B]+?([\\s\u200B]+|$)";
  }

  var re = new RegExp(regexString, "g");
  var lines = str.match(re) || [];
  var result =
    indent +
    lines
      .map(function (line) {
        if (line.slice(-1) === "\n") {
          line = line.slice(0, line.length - 1);
        }
        return escape(line);
      })
      .join(newline);

  if (options.trim === true) {
    result = result.replace(/[ \t]*$/gm, "");
  }
  return result;
}

function identity(str) {
  return str;
}

function wrapText() {
  let textarea = $("#wrap-input")[0];
  let length = parseInt($("#wrap-length")[0].value);
  let towrap = textarea.value;
  let commenting = $("#wrap-comment")[0].value;
  let prefix = "";

  switch (commenting) {
    case "none":
      break;
    case "doubleslant":
      // C++/C#/F#/Java/JavaScript/Rust/Swift
      prefix = "// ";
      break;
    case "hash":
      // Perl/PowerShell/Python/R/Ruby
      prefix = "# ";
      break;
    case "doubledash":
      // ada/AppleScript/Haskell/Lua/SQL
      prefix = "-- ";
      break;
    case "percent":
      // MATLAB
      prefix = "% ";
      break;
    case "singlespace":
      // mediawiki
      prefix = " ";
      break;
    case "quadspace":
      // reddit
      prefix = "    ";
      break;
    case "singlequote":
      // VBA
      prefix = "' ";
      break;
    case "rem":
      // BASIC/DOS batch file
      prefix = "REM ";
      break;
    case "c":
      // Fortran IV
      prefix = "C ";
      break;
    case "exclamation":
      // Fortran 90
      prefix = "! ";
      break;
    default:
      break;
  }

  towrap = wrap(towrap, { width: length, indent: prefix });

  textarea.value = towrap;
}
