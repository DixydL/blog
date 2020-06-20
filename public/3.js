(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/fault/index.js":
/*!*************************************!*\
  !*** ./node_modules/fault/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var formatter = __webpack_require__(/*! format */ "./node_modules/format/format.js")

var fault = create(Error)

module.exports = fault

fault.eval = create(EvalError)
fault.range = create(RangeError)
fault.reference = create(ReferenceError)
fault.syntax = create(SyntaxError)
fault.type = create(TypeError)
fault.uri = create(URIError)

fault.create = create

// Create a new `EConstructor`, with the formatted `format` as a first argument.
function create(EConstructor) {
  FormattedError.displayName = EConstructor.displayName || EConstructor.name

  return FormattedError

  function FormattedError(format) {
    if (format) {
      format = formatter.apply(null, arguments)
    }

    return new EConstructor(format)
  }
}


/***/ }),

/***/ "./node_modules/format/format.js":
/*!***************************************!*\
  !*** ./node_modules/format/format.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//
// format - printf-like string formatting for JavaScript
// github.com/samsonjs/format
// @_sjs
//
// Copyright 2010 - 2013 Sami Samhuri <sami@samhuri.net>
//
// MIT License
// http://sjs.mit-license.org
//

;(function() {

  //// Export the API
  var namespace;

  // CommonJS / Node module
  if (true) {
    namespace = module.exports = format;
  }

  // Browsers and other environments
  else {}

  namespace.format = format;
  namespace.vsprintf = vsprintf;

  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    namespace.printf = printf;
  }

  function printf(/* ... */) {
    console.log(format.apply(null, arguments));
  }

  function vsprintf(fmt, replacements) {
    return format.apply(null, [fmt].concat(replacements));
  }

  function format(fmt) {
    var argIndex = 1 // skip initial format argument
      , args = [].slice.call(arguments)
      , i = 0
      , n = fmt.length
      , result = ''
      , c
      , escaped = false
      , arg
      , tmp
      , leadingZero = false
      , precision
      , nextArg = function() { return args[argIndex++]; }
      , slurpNumber = function() {
          var digits = '';
          while (/\d/.test(fmt[i])) {
            digits += fmt[i++];
            c = fmt[i];
          }
          return digits.length > 0 ? parseInt(digits) : null;
        }
      ;
    for (; i < n; ++i) {
      c = fmt[i];
      if (escaped) {
        escaped = false;
        if (c == '.') {
          leadingZero = false;
          c = fmt[++i];
        }
        else if (c == '0' && fmt[i + 1] == '.') {
          leadingZero = true;
          i += 2;
          c = fmt[i];
        }
        else {
          leadingZero = true;
        }
        precision = slurpNumber();
        switch (c) {
        case 'b': // number in binary
          result += parseInt(nextArg(), 10).toString(2);
          break;
        case 'c': // character
          arg = nextArg();
          if (typeof arg === 'string' || arg instanceof String)
            result += arg;
          else
            result += String.fromCharCode(parseInt(arg, 10));
          break;
        case 'd': // number in decimal
          result += parseInt(nextArg(), 10);
          break;
        case 'f': // floating point number
          tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
          result += leadingZero ? tmp : tmp.replace(/^0/, '');
          break;
        case 'j': // JSON
          result += JSON.stringify(nextArg());
          break;
        case 'o': // number in octal
          result += '0' + parseInt(nextArg(), 10).toString(8);
          break;
        case 's': // string
          result += nextArg();
          break;
        case 'x': // lowercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16);
          break;
        case 'X': // uppercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
          break;
        default:
          result += c;
          break;
        }
      } else if (c === '%') {
        escaped = true;
      } else {
        result += c;
      }
    }
    return result;
  }

}());


/***/ }),

/***/ "./node_modules/highlight.js/lib/highlight.js":
/*!****************************************************!*\
  !*** ./node_modules/highlight.js/lib/highlight.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

(function(factory) {

  // Find the global object for export to both the browser and web workers.
  var globalObject = typeof window === 'object' && window ||
                     typeof self === 'object' && self;

  // Setup highlight.js for different environments. First is Node.js or
  // CommonJS.
  // `nodeType` is checked to ensure that `exports` is not a HTML element.
  if( true && !exports.nodeType) {
    factory(exports);
  } else if(globalObject) {
    // Export hljs globally even when using AMD for cases when this script
    // is loaded with others that may still expect a global hljs.
    globalObject.hljs = factory({});

    // Finally register the global hljs with AMD.
    if(true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return globalObject.hljs;
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }

}(function(hljs) {
  // Convenience variables for build-in objects
  var ArrayProto = [],
      objectKeys = Object.keys;

  // Global internal variables used within the highlight.js library.
  var languages = {},
      aliases   = {};

  // Regular expressions used throughout the highlight.js library.
  var noHighlightRe    = /^(no-?highlight|plain|text)$/i,
      languagePrefixRe = /\blang(?:uage)?-([\w-]+)\b/i,
      fixMarkupRe      = /((^(<[^>]+>|\t|)+|(?:\n)))/gm;

  // The object will be assigned by the build tool. It used to synchronize API
  // of external language files with minified version of the highlight.js library.
  var API_REPLACES;

  var spanEndTag = '</span>';

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  var options = {
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined
  };

  // keywords that should have no default relevance value
  var COMMON_KEYWORDS = 'of and for in not or if then'.split(' ')


  /* Utility functions */

  function escape(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function tag(node) {
    return node.nodeName.toLowerCase();
  }

  function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index === 0;
  }

  function isNotHighlighted(language) {
    return noHighlightRe.test(language);
  }

  function blockLanguage(block) {
    var i, match, length, _class;
    var classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    match = languagePrefixRe.exec(classes);
    if (match) {
      return getLanguage(match[1]) ? match[1] : 'no-highlight';
    }

    classes = classes.split(/\s+/);

    for (i = 0, length = classes.length; i < length; i++) {
      _class = classes[i];

      if (isNotHighlighted(_class) || getLanguage(_class)) {
        return _class;
      }
    }
  }

  function inherit(parent) {  // inherit(parent, override_obj, override_obj, ...)
    var key;
    var result = {};
    var objects = Array.prototype.slice.call(arguments, 1);

    for (key in parent)
      result[key] = parent[key];
    objects.forEach(function(obj) {
      for (key in obj)
        result[key] = obj[key];
    });
    return result;
  }

  /* Stream merging */

  function nodeStream(node) {
    var result = [];
    (function _nodeStream(node, offset) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType === 3)
          offset += child.nodeValue.length;
        else if (child.nodeType === 1) {
          result.push({
            event: 'start',
            offset: offset,
            node: child
          });
          offset = _nodeStream(child, offset);
          // Prevent void elements from having an end tag that would actually
          // double them in the output. There are more void elements in HTML
          // but we list only those realistically expected in code display.
          if (!tag(child).match(/br|hr|img|input/)) {
            result.push({
              event: 'stop',
              offset: offset,
              node: child
            });
          }
        }
      }
      return offset;
    })(node, 0);
    return result;
  }

  function mergeStreams(original, highlighted, value) {
    var processed = 0;
    var result = '';
    var nodeStack = [];

    function selectStream() {
      if (!original.length || !highlighted.length) {
        return original.length ? original : highlighted;
      }
      if (original[0].offset !== highlighted[0].offset) {
        return (original[0].offset < highlighted[0].offset) ? original : highlighted;
      }

      /*
      To avoid starting the stream just before it should stop the order is
      ensured that original always starts first and closes last:

      if (event1 == 'start' && event2 == 'start')
        return original;
      if (event1 == 'start' && event2 == 'stop')
        return highlighted;
      if (event1 == 'stop' && event2 == 'start')
        return original;
      if (event1 == 'stop' && event2 == 'stop')
        return highlighted;

      ... which is collapsed to:
      */
      return highlighted[0].event === 'start' ? original : highlighted;
    }

    function open(node) {
      function attr_str(a) {return ' ' + a.nodeName + '="' + escape(a.value).replace('"', '&quot;') + '"';}
      result += '<' + tag(node) + ArrayProto.map.call(node.attributes, attr_str).join('') + '>';
    }

    function close(node) {
      result += '</' + tag(node) + '>';
    }

    function render(event) {
      (event.event === 'start' ? open : close)(event.node);
    }

    while (original.length || highlighted.length) {
      var stream = selectStream();
      result += escape(value.substring(processed, stream[0].offset));
      processed = stream[0].offset;
      if (stream === original) {
        /*
        On any opening or closing tag of the original markup we first close
        the entire highlighted node stack, then render the original tag along
        with all the following original tags at the same offset and then
        reopen all the tags on the highlighted stack.
        */
        nodeStack.reverse().forEach(close);
        do {
          render(stream.splice(0, 1)[0]);
          stream = selectStream();
        } while (stream === original && stream.length && stream[0].offset === processed);
        nodeStack.reverse().forEach(open);
      } else {
        if (stream[0].event === 'start') {
          nodeStack.push(stream[0].node);
        } else {
          nodeStack.pop();
        }
        render(stream.splice(0, 1)[0]);
      }
    }
    return result + escape(value.substr(processed));
  }

  /* Initialization */

  function dependencyOnParent(mode) {
    if (!mode) return false;

    return mode.endsWithParent || dependencyOnParent(mode.starts)
  }

  function expand_or_clone_mode(mode) {
    if (mode.variants && !mode.cached_variants) {
      mode.cached_variants = mode.variants.map(function(variant) {
        return inherit(mode, {variants: null}, variant);
      });
    }

    // EXPAND
    // if we have variants then essentually "replace" the mode with the variants
    // this happens in compileMode, where this function is called from
    if (mode.cached_variants)
      return mode.cached_variants;

    // CLONE
    // if we have dependencies on parents then we need a unique
    // instance of ourselves, so we can be reused with many
    // different parents without issue
    if (dependencyOnParent(mode))
      return [inherit(mode, { starts: mode.starts ? inherit(mode.starts) : null })]

    // no special dependency issues, just return ourselves
    return [mode]
  }

  function restoreLanguageApi(obj) {
    if(API_REPLACES && !obj.langApiRestored) {
      obj.langApiRestored = true;
      for(var key in API_REPLACES)
        obj[key] && (obj[API_REPLACES[key]] = obj[key]);
      (obj.contains || []).concat(obj.variants || []).forEach(restoreLanguageApi);
    }
  }

  function compileKeywords(rawKeywords, case_insensitive) {
      var compiled_keywords = {};

      if (typeof rawKeywords === 'string') { // string
        splitAndCompile('keyword', rawKeywords);
      } else {
        objectKeys(rawKeywords).forEach(function (className) {
          splitAndCompile(className, rawKeywords[className]);
        });
      }
    return compiled_keywords;

    // ---

    function splitAndCompile(className, str) {
      if (case_insensitive) {
        str = str.toLowerCase();
      }
      str.split(' ').forEach(function(keyword) {
        var pair = keyword.split('|');
        compiled_keywords[pair[0]] = [className, scoreForKeyword(pair[0], pair[1])];
      });
    };
  }

  function scoreForKeyword(keyword, providedScore) {
    // manual scores always win over common keywords
    // so you can force a score of 1 if you really insist
    if (providedScore)
      return Number(providedScore)

    return commonKeyword(keyword) ? 0 : 1;
  }

  function commonKeyword(word) {
    return COMMON_KEYWORDS.indexOf(word.toLowerCase()) != -1
  }

  function compileLanguage(language) {

    function reStr(re) {
        return (re && re.source) || re;
    }

    function langRe(value, global) {
      return new RegExp(
        reStr(value),
        'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '')
      );
    }

    function reCountMatchGroups(re) {
      return (new RegExp(re.toString() + '|')).exec('').length - 1;
    }

    // joinRe logically computes regexps.join(separator), but fixes the
    // backreferences so they continue to match.
    // it also places each individual regular expression into it's own
    // match group, keeping track of the sequencing of those match groups
    // is currently an exercise for the caller. :-)
    function joinRe(regexps, separator) {
      // backreferenceRe matches an open parenthesis or backreference. To avoid
      // an incorrect parse, it additionally matches the following:
      // - [...] elements, where the meaning of parentheses and escapes change
      // - other escape sequences, so we do not misparse escape sequences as
      //   interesting elements
      // - non-matching or lookahead parentheses, which do not capture. These
      //   follow the '(' with a '?'.
      var backreferenceRe = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
      var numCaptures = 0;
      var ret = '';
      for (var i = 0; i < regexps.length; i++) {
        numCaptures += 1;
        var offset = numCaptures;
        var re = reStr(regexps[i]);
        if (i > 0) {
          ret += separator;
        }
        ret += "(";
        while (re.length > 0) {
          var match = backreferenceRe.exec(re);
          if (match == null) {
            ret += re;
            break;
          }
          ret += re.substring(0, match.index);
          re = re.substring(match.index + match[0].length);
          if (match[0][0] == '\\' && match[1]) {
            // Adjust the backreference.
            ret += '\\' + String(Number(match[1]) + offset);
          } else {
            ret += match[0];
            if (match[0] == '(') {
              numCaptures++;
            }
          }
        }
        ret += ")";
      }
      return ret;
    }

    function buildModeRegex(mode) {

      var matchIndexes = {};
      var matcherRe;
      var regexes = [];
      var matcher = {};
      var matchAt = 1;

      function addRule(rule, regex) {
        matchIndexes[matchAt] = rule;
        regexes.push([rule, regex]);
        matchAt += reCountMatchGroups(regex) + 1;
      }

      var term;
      for (var i=0; i < mode.contains.length; i++) {
        var re;
        term = mode.contains[i];
        if (term.beginKeywords) {
          re = '\\.?(?:' + term.begin + ')\\.?';
        } else {
          re = term.begin;
        }
        addRule(term, re);
      }
      if (mode.terminator_end)
        addRule("end", mode.terminator_end);
      if (mode.illegal)
        addRule("illegal", mode.illegal);

      var terminators = regexes.map(function(el) { return el[1] });
      matcherRe = langRe(joinRe(terminators, '|'), true);

      matcher.lastIndex = 0;
      matcher.exec = function(s) {
        var rule;

        if( regexes.length === 0) return null;

        matcherRe.lastIndex = matcher.lastIndex;
        var match = matcherRe.exec(s);
        if (!match) { return null; }

        for(var i = 0; i<match.length; i++) {
          if (match[i] != undefined && matchIndexes["" +i] != undefined ) {
            rule = matchIndexes[""+i];
            break;
          }
        }

        // illegal or end match
        if (typeof rule === "string") {
          match.type = rule;
          match.extra = [mode.illegal, mode.terminator_end];
        } else {
          match.type = "begin";
          match.rule = rule;
        }
        return match;
      }

      return matcher;
    }

    function compileMode(mode, parent) {
      if (mode.compiled)
        return;
      mode.compiled = true;

      mode.keywords = mode.keywords || mode.beginKeywords;
      if (mode.keywords)
        mode.keywords = compileKeywords(mode.keywords, language.case_insensitive)

      mode.lexemesRe = langRe(mode.lexemes || /\w+/, true);

      if (parent) {
        if (mode.beginKeywords) {
          mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
        }
        if (!mode.begin)
          mode.begin = /\B|\b/;
        mode.beginRe = langRe(mode.begin);
        if (mode.endSameAsBegin)
          mode.end = mode.begin;
        if (!mode.end && !mode.endsWithParent)
          mode.end = /\B|\b/;
        if (mode.end)
          mode.endRe = langRe(mode.end);
        mode.terminator_end = reStr(mode.end) || '';
        if (mode.endsWithParent && parent.terminator_end)
          mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }
      if (mode.illegal)
        mode.illegalRe = langRe(mode.illegal);
      if (mode.relevance == null)
        mode.relevance = 1;
      if (!mode.contains) {
        mode.contains = [];
      }
      mode.contains = Array.prototype.concat.apply([], mode.contains.map(function(c) {
        return expand_or_clone_mode(c === 'self' ? mode : c);
      }));
      mode.contains.forEach(function(c) {compileMode(c, mode);});

      if (mode.starts) {
        compileMode(mode.starts, parent);
      }

      mode.terminators = buildModeRegex(mode);
    }

    compileMode(language);
  }

  /*
  Core highlighting function. Accepts a language name, or an alias, and a
  string with the code to highlight. Returns an object with the following
  properties:

  - relevance (int)
  - value (an HTML string with highlighting markup)

  */
  function highlight(name, value, ignore_illegals, continuation) {

    function escapeRe(value) {
      return new RegExp(value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
    }

    function endOfMode(mode, lexeme) {
      if (testRe(mode.endRe, lexeme)) {
        while (mode.endsParent && mode.parent) {
          mode = mode.parent;
        }
        return mode;
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, lexeme);
      }
    }

    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }

    function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
      if (!leaveOpen && insideSpan === '') return '';
      if (!classname) return insideSpan;

      var classPrefix = noPrefix ? '' : options.classPrefix,
          openSpan    = '<span class="' + classPrefix,
          closeSpan   = leaveOpen ? '' : spanEndTag;

      openSpan += classname + '">';

      return openSpan + insideSpan + closeSpan;
    }

    function processKeywords() {
      var keyword_match, last_index, match, result;

      if (!top.keywords)
        return escape(mode_buffer);

      result = '';
      last_index = 0;
      top.lexemesRe.lastIndex = 0;
      match = top.lexemesRe.exec(mode_buffer);

      while (match) {
        result += escape(mode_buffer.substring(last_index, match.index));
        keyword_match = keywordMatch(top, match);
        if (keyword_match) {
          relevance += keyword_match[1];
          result += buildSpan(keyword_match[0], escape(match[0]));
        } else {
          result += escape(match[0]);
        }
        last_index = top.lexemesRe.lastIndex;
        match = top.lexemesRe.exec(mode_buffer);
      }
      return result + escape(mode_buffer.substr(last_index));
    }

    function processSubLanguage() {
      var explicit = typeof top.subLanguage === 'string';
      if (explicit && !languages[top.subLanguage]) {
        return escape(mode_buffer);
      }

      var result = explicit ?
                   highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) :
                   highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined);

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Usecase in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      if (explicit) {
        continuations[top.subLanguage] = result.top;
      }
      return buildSpan(result.language, result.value, false, true);
    }

    function processBuffer() {
      result += (top.subLanguage != null ? processSubLanguage() : processKeywords());
      mode_buffer = '';
    }

    function startNewMode(mode) {
      result += mode.className? buildSpan(mode.className, '', true): '';
      top = Object.create(mode, {parent: {value: top}});
    }


    function doBeginMatch(match) {
      var lexeme = match[0];
      var new_mode = match.rule;

      if (new_mode && new_mode.endSameAsBegin) {
        new_mode.endRe = escapeRe( lexeme );
      }

      if (new_mode.skip) {
        mode_buffer += lexeme;
      } else {
        if (new_mode.excludeBegin) {
          mode_buffer += lexeme;
        }
        processBuffer();
        if (!new_mode.returnBegin && !new_mode.excludeBegin) {
          mode_buffer = lexeme;
        }
      }
      startNewMode(new_mode, lexeme);
      return new_mode.returnBegin ? 0 : lexeme.length;
    }

    function doEndMatch(match) {
      var lexeme = match[0];
      var end_mode = endOfMode(top, lexeme);
      if (!end_mode) { return; }

      var origin = top;
      if (origin.skip) {
        mode_buffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          mode_buffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          mode_buffer = lexeme;
        }
      }
      do {
        if (top.className) {
          result += spanEndTag;
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== end_mode.parent);
      if (end_mode.starts) {
        if (end_mode.endSameAsBegin) {
          end_mode.starts.endRe = end_mode.endRe;
        }
        startNewMode(end_mode.starts, '');
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }

    var lastMatch = {};
    function processLexeme(text_before_match, match) {

      var lexeme = match && match[0];

      // add non-matched text to the current mode buffer
      mode_buffer += text_before_match;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
      if (lastMatch.type=="begin" && match.type=="end" && lastMatch.index == match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        mode_buffer += value.slice(match.index, match.index + 1)
        return 1;
      }
      lastMatch = match;

      if (match.type==="begin") {
        return doBeginMatch(match);
      } else if (match.type==="illegal" && !ignore_illegals) {
        // illegal match, we do not continue processing
        throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
      } else if (match.type==="end") {
        var processed = doEndMatch(match);
        if (processed != undefined)
          return processed;
      }

      /*
      Why might be find ourselves here?  Only one occasion now.  An end match that was
      triggered but could not be completed.  When might this happen?  When an `endSameasBegin`
      rule sets the end rule to a specific match.  Since the overall mode termination rule that's
      being used to scan the text isn't recompiled that means that any match that LOOKS like
      the end (but is not, because it is not an exact match to the beginning) will
      end up here.  A definite end match, but when `doEndMatch` tries to "reapply"
      the end rule and fails to match, we wind up here, and just silently ignore the end.

      This causes no real harm other than stopping a few times too many.
      */

      mode_buffer += lexeme;
      return lexeme.length;
    }

    var language = getLanguage(name);
    if (!language) {
      throw new Error('Unknown language: "' + name + '"');
    }

    compileLanguage(language);
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var result = '', current;
    for(current = top; current !== language; current = current.parent) {
      if (current.className) {
        result = buildSpan(current.className, '', true) + result;
      }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
      var match, count, index = 0;
      while (true) {
        top.terminators.lastIndex = index;
        match = top.terminators.exec(value);
        if (!match)
          break;
        count = processLexeme(value.substring(index, match.index), match);
        index = match.index + count;
      }
      processLexeme(value.substr(index));
      for(current = top; current.parent; current = current.parent) { // close dangling modes
        if (current.className) {
          result += spanEndTag;
        }
      }
      return {
        relevance: relevance,
        value: result,
        illegal:false,
        language: name,
        top: top
      };
    } catch (e) {
      if (e.message && e.message.indexOf('Illegal') !== -1) {
        return {
          illegal: true,
          relevance: 0,
          value: escape(value)
        };
      } else {
        throw e;
      }
    }
  }

  /*
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

  */
  function highlightAuto(text, languageSubset) {
    languageSubset = languageSubset || options.languages || objectKeys(languages);
    var result = {
      relevance: 0,
      value: escape(text)
    };
    var second_best = result;
    languageSubset.filter(getLanguage).filter(autoDetection).forEach(function(name) {
      var current = highlight(name, text, false);
      current.language = name;
      if (current.relevance > second_best.relevance) {
        second_best = current;
      }
      if (current.relevance > result.relevance) {
        second_best = result;
        result = current;
      }
    });
    if (second_best.language) {
      result.second_best = second_best;
    }
    return result;
  }

  /*
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

  */
  function fixMarkup(value) {
    return !(options.tabReplace || options.useBR)
      ? value
      : value.replace(fixMarkupRe, function(match, p1) {
          if (options.useBR && match === '\n') {
            return '<br>';
          } else if (options.tabReplace) {
            return p1.replace(/\t/g, options.tabReplace);
          }
          return '';
      });
  }

  function buildClassName(prevClassName, currentLang, resultLang) {
    var language = currentLang ? aliases[currentLang] : resultLang,
        result   = [prevClassName.trim()];

    if (!prevClassName.match(/\bhljs\b/)) {
      result.push('hljs');
    }

    if (prevClassName.indexOf(language) === -1) {
      result.push(language);
    }

    return result.join(' ').trim();
  }

  /*
  Applies highlighting to a DOM node containing code. Accepts a DOM node and
  two optional parameters for fixMarkup.
  */
  function highlightBlock(block) {
    var node, originalStream, result, resultNode, text;
    var language = blockLanguage(block);

    if (isNotHighlighted(language))
        return;

    if (options.useBR) {
      node = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
    } else {
      node = block;
    }
    text = node.textContent;
    result = language ? highlight(language, text, true) : highlightAuto(text);

    originalStream = nodeStream(node);
    if (originalStream.length) {
      resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }
    result.value = fixMarkup(result.value);

    block.innerHTML = result.value;
    block.className = buildClassName(block.className, language, result.language);
    block.result = {
      language: result.language,
      re: result.relevance
    };
    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance
      };
    }
  }

  /*
  Updates highlight.js global options with values passed in the form of an object.
  */
  function configure(user_options) {
    options = inherit(options, user_options);
  }

  /*
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
  */
  function initHighlighting() {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;

    var blocks = document.querySelectorAll('pre code');
    ArrayProto.forEach.call(blocks, highlightBlock);
  }

  /*
  Attaches highlighting to the page load event.
  */
  function initHighlightingOnLoad() {
    addEventListener('DOMContentLoaded', initHighlighting, false);
    addEventListener('load', initHighlighting, false);
  }

  function registerLanguage(name, language) {
    var lang = languages[name] = language(hljs);
    restoreLanguageApi(lang);
    lang.rawDefinition = language.bind(null,hljs);

    if (lang.aliases) {
      lang.aliases.forEach(function(alias) {aliases[alias] = name;});
    }
  }

  function listLanguages() {
    return objectKeys(languages);
  }

  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  function autoDetection(name) {
    var lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /* Interface definition */

  hljs.highlight = highlight;
  hljs.highlightAuto = highlightAuto;
  hljs.fixMarkup = fixMarkup;
  hljs.highlightBlock = highlightBlock;
  hljs.configure = configure;
  hljs.initHighlighting = initHighlighting;
  hljs.initHighlightingOnLoad = initHighlightingOnLoad;
  hljs.registerLanguage = registerLanguage;
  hljs.listLanguages = listLanguages;
  hljs.getLanguage = getLanguage;
  hljs.autoDetection = autoDetection;
  hljs.inherit = inherit;

  // Common regexps
  hljs.IDENT_RE = '[a-zA-Z]\\w*';
  hljs.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
  hljs.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  hljs.C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
  hljs.BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
  hljs.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

  // Common modes
  hljs.BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]', relevance: 0
  };
  hljs.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  hljs.PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  };
  hljs.COMMENT = function (begin, end, inherits) {
    var mode = hljs.inherit(
      {
        className: 'comment',
        begin: begin, end: end,
        contains: []
      },
      inherits || {}
    );
    mode.contains.push(hljs.PHRASAL_WORDS_MODE);
    mode.contains.push({
      className: 'doctag',
      begin: '(?:TODO|FIXME|NOTE|BUG|XXX):',
      relevance: 0
    });
    return mode;
  };
  hljs.C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$');
  hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT('/\\*', '\\*/');
  hljs.HASH_COMMENT_MODE = hljs.COMMENT('#', '$');
  hljs.NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE,
    relevance: 0
  };
  hljs.C_NUMBER_MODE = {
    className: 'number',
    begin: hljs.C_NUMBER_RE,
    relevance: 0
  };
  hljs.BINARY_NUMBER_MODE = {
    className: 'number',
    begin: hljs.BINARY_NUMBER_RE,
    relevance: 0
  };
  hljs.CSS_NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE + '(' +
      '%|em|ex|ch|rem'  +
      '|vw|vh|vmin|vmax' +
      '|cm|mm|in|pt|pc|px' +
      '|deg|grad|rad|turn' +
      '|s|ms' +
      '|Hz|kHz' +
      '|dpi|dpcm|dppx' +
      ')?',
    relevance: 0
  };
  hljs.REGEXP_MODE = {
    className: 'regexp',
    begin: /\//, end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        begin: /\[/, end: /\]/,
        relevance: 0,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
  hljs.TITLE_MODE = {
    className: 'title',
    begin: hljs.IDENT_RE,
    relevance: 0
  };
  hljs.UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };
  hljs.METHOD_GUARD = {
    // excludes method names from keyword processing
    begin: '\\.\\s*' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };

  return hljs;
}));


/***/ }),

/***/ "./node_modules/lowlight/lib/core.js":
/*!*******************************************!*\
  !*** ./node_modules/lowlight/lib/core.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var high = __webpack_require__(/*! highlight.js/lib/highlight.js */ "./node_modules/highlight.js/lib/highlight.js")
var fault = __webpack_require__(/*! fault */ "./node_modules/fault/index.js")

// The lowlight interface, which has to be compatible with highlight.js, as
// this object is passed to highlight.js syntaxes.

function High() {}

High.prototype = high

// Expose.
var low = new High() // Ha!

module.exports = low

low.highlight = highlight
low.highlightAuto = autoHighlight
low.registerLanguage = registerLanguage
low.listLanguages = listLanguages
low.registerAlias = registerAlias
low.getLanguage = getLanguage

var inherit = high.inherit
var own = {}.hasOwnProperty

var defaultPrefix = 'hljs-'
var keyInsensitive = 'case_insensitive'
var keyCachedVariants = 'cached_variants'
var keyTerminatorEnd = 'terminator_end'
var space = ' '
var verticalBar = '|'
var parenOpen = '('
var parenClose = ')'
var backslash = '\\'
var commonKeywords = ['of', 'and', 'for', 'in', 'not', 'or', 'if', 'then']

// Maps of syntaxes.
var languageNames = []
var languages = {}
var aliases = {}

// Highlighting with language detection.
// Accepts a string with the code to highlight.
// Returns an object with the following properties:
//
// *   `language` — Detected language
// *   `relevance` — Integer
// *   `value` — HAST tree with highlighting markup
// *   `secondBest` — Object with the same structure for second-best
//     heuristically detected language, may be absent.
function autoHighlight(value, options) {
  var settings = options || {}
  var subset = settings.subset || languageNames
  var prefix = settings.prefix
  var length = subset.length
  var index = -1
  var result
  var secondBest
  var current
  var name

  if (prefix === null || prefix === undefined) {
    prefix = defaultPrefix
  }

  if (typeof value !== 'string') {
    throw fault('Expected `string` for value, got `%s`', value)
  }

  secondBest = normalize({})
  result = normalize({})

  while (++index < length) {
    name = subset[index]

    if (!getLanguage(name)) {
      continue
    }

    current = normalize(coreHighlight(name, value, false, prefix))

    current.language = name

    if (current.relevance > secondBest.relevance) {
      secondBest = current
    }

    if (current.relevance > result.relevance) {
      secondBest = result
      result = current
    }
  }

  if (secondBest.language) {
    result.secondBest = secondBest
  }

  return result
}

// Highlighting `value` in the language `language`.
function highlight(language, value, options) {
  var settings = options || {}
  var prefix = settings.prefix

  if (prefix === null || prefix === undefined) {
    prefix = defaultPrefix
  }

  return normalize(coreHighlight(language, value, true, prefix))
}

// Register a language.
function registerLanguage(name, syntax) {
  var lang = syntax(low)

  lang.rawDefinition = syntax.bind(null, low)

  languages[name] = lang

  languageNames.push(name)

  if (lang.aliases) {
    registerAlias(name, lang.aliases)
  }
}

// Get a list of all registered languages.
function listLanguages() {
  return languageNames.concat()
}

// Register more aliases for an already registered language.
function registerAlias(name, alias) {
  var map = name
  var key
  var list
  var length
  var index

  if (alias) {
    map = {}
    map[name] = alias
  }

  for (key in map) {
    list = map[key]
    list = typeof list === 'string' ? [list] : list
    length = list.length
    index = -1

    while (++index < length) {
      aliases[list[index]] = key
    }
  }
}

// Core highlighting function.
// Accepts a language name, or an alias, and a string with the code to
// highlight.
// eslint-disable-next-line max-params
function coreHighlight(name, value, ignore, prefix, continuation) {
  var lastMatch = {}
  var continuations = {}
  var stack = []
  var modeBuffer = ''
  var relevance = 0
  var language
  var top
  var current
  var currentChildren
  var offset
  var count
  var match
  var children

  if (typeof name !== 'string') {
    throw fault('Expected `string` for name, got `%s`', name)
  }

  if (typeof value !== 'string') {
    throw fault('Expected `string` for value, got `%s`', value)
  }

  language = getLanguage(name)
  top = continuation || language
  children = []

  current = top
  currentChildren = children

  if (!language) {
    throw fault('Unknown language: `%s` is not registered', name)
  }

  compileLanguage(language)

  try {
    top.terminators.lastIndex = 0
    offset = 0
    match = top.terminators.exec(value)

    while (match) {
      count = processLexeme(value.slice(offset, match.index), match)
      offset = match.index + count
      top.terminators.lastIndex = offset
      match = top.terminators.exec(value)
    }

    processLexeme(value.slice(offset))
    current = top

    while (current.parent) {
      if (current.className) {
        pop()
      }

      current = current.parent
    }

    return {
      relevance: relevance,
      value: currentChildren,
      illegal: false,
      language: name,
      top: top
    }
  } catch (error) {
    /* istanbul ignore if - Catch-all  */
    if (error.message.indexOf('Illegal') === -1) {
      throw error
    }

    return {relevance: 0, illegal: true, value: addText(value, [])}
  }

  function escapeRe(value) {
    return new RegExp(value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm')
  }

  function doBeginMatch(match) {
    var lexeme = match[0]
    var newMode = match.rule

    if (newMode && newMode.endSameAsBegin) {
      newMode.endRe = escapeRe(lexeme)
    }

    if (newMode.skip) {
      modeBuffer += lexeme
    } else {
      if (newMode.excludeBegin) {
        modeBuffer += lexeme
      }

      addSiblings(processBuffer(), currentChildren)

      if (!newMode.returnBegin && !newMode.excludeBegin) {
        modeBuffer = lexeme
      }
    }

    startNewMode(newMode)

    return newMode.returnBegin ? 0 : lexeme.length
  }

  function doEndMatch(match) {
    var lexeme = match[0]
    var matchPlusRemainder = value.slice(match.index)
    var endMode = endOfMode(top, matchPlusRemainder)

    if (!endMode) {
      return
    }

    var origin = top

    if (origin.skip) {
      modeBuffer += lexeme
    } else {
      if (!(origin.returnEnd || origin.excludeEnd)) {
        modeBuffer += lexeme
      }

      addSiblings(processBuffer(), currentChildren)

      if (origin.excludeEnd) {
        modeBuffer = lexeme
      }
    }

    do {
      if (top.className) {
        pop()
      }

      if (!top.skip && !top.subLanguage) {
        relevance += top.relevance
      }

      top = top.parent
    } while (top !== endMode.parent)

    if (endMode.starts) {
      /* istanbul ignore if - hljs 9.16 added support for this but didn’t use it yet. */
      if (endMode.endSameAsBegin) {
        endMode.starts.endRe = endMode.endRe
      }

      startNewMode(endMode.starts)
    }

    return origin.returnEnd ? 0 : lexeme.length
  }

  function processLexeme(textBeforeMatch, match) {
    var lexeme = match && match[0]
    var processed

    // Add non-matched text to the current mode buffer
    modeBuffer += textBeforeMatch

    if (lexeme === undefined) {
      addSiblings(processBuffer(), currentChildren)
      return 0
    }

    // We've found a 0 width match and we're stuck, so we need to advance
    // this happens when we have badly behaved rules that have optional matchers to the degree that
    // sometimes they can end up matching nothing at all
    // Ref: https://github.com/highlightjs/highlight.js/issues/2140
    /* istanbul ignore if - Unknown what this fixes or which case fixes it */
    if (
      lastMatch.type === 'begin' &&
      match.type === 'end' &&
      lastMatch.index === match.index &&
      lexeme === ''
    ) {
      // Spit the “skipped” character that our regex choked on back into the output sequence
      modeBuffer += value.slice(match.index, match.index + 1)
      return 1
    }

    lastMatch = match

    if (match.type === 'begin') {
      return doBeginMatch(match)
    }

    if (match.type === 'end') {
      processed = doEndMatch(match)

      if (processed !== undefined) {
        return processed
      }
    }

    if (match.type === 'illegal' && !ignore) {
      // Illegal match, we do not continue processing
      throw fault(
        'Illegal lexeme "%s" for mode "%s"',
        lexeme,
        top.className || '<unnamed>'
      )
    }

    // Why might be find ourselves here?
    // Only one occasion now.
    // An end match that was triggered but could not be completed.
    // When might this happen?
    // When an `endSameasBegin` rule sets the end rule to a specific match.
    // Since the overall mode termination rule that’s being used to scan the
    // text isn’t recompiled that means that any match that LOOKS like the end
    // (but is not, because it is not an exact match to the beginning) will end
    // up here.
    // A definite end match, but when `doEndMatch` tries to “reapply” the end
    // rule and fails to match, we wind up here, and just silently ignore the
    // end.
    // This causes no real harm other than stopping a few times too many.
    modeBuffer += lexeme

    return lexeme.length
  }

  // Start a new mode with a `lexeme` to process.
  function startNewMode(mode) {
    var node

    if (mode.className) {
      node = build(mode.className, [])
    }

    // Enter a new mode.
    if (node) {
      currentChildren.push(node)
      stack.push(currentChildren)
      currentChildren = node.children
    }

    top = Object.create(mode, {parent: {value: top}})
  }

  // Process the buffer.
  function processBuffer() {
    var result = top.subLanguage ? processSubLanguage() : processKeywords()
    modeBuffer = ''
    return result
  }

  // Process a sublanguage (returns a list of nodes).
  function processSubLanguage() {
    var explicit = typeof top.subLanguage === 'string'
    var subvalue

    /* istanbul ignore if - support non-loaded sublanguages */
    if (explicit && !languages[top.subLanguage]) {
      return addText(modeBuffer, [])
    }

    if (explicit) {
      subvalue = coreHighlight(
        top.subLanguage,
        modeBuffer,
        true,
        prefix,
        continuations[top.subLanguage]
      )
    } else {
      subvalue = autoHighlight(modeBuffer, {
        subset: top.subLanguage.length === 0 ? undefined : top.subLanguage,
        prefix: prefix
      })
    }

    // If we couldn’t highlight, for example because the requests subset isn’t
    // loaded, return a text node.
    if (!subvalue.language) {
      return [buildText(modeBuffer)]
    }

    // Counting embedded language score towards the host language may be
    // disabled with zeroing the containing mode relevance.
    // Usecase in point is Markdown that allows XML everywhere and makes every
    // XML snippet to have a much larger Markdown score.
    if (top.relevance > 0) {
      relevance += subvalue.relevance
    }

    if (explicit) {
      continuations[top.subLanguage] = subvalue.top
    }

    return [build(subvalue.language, subvalue.value, true)]
  }

  // Process keywords. Returns nodes.
  function processKeywords() {
    var nodes = []
    var lastIndex
    var keyword
    var node
    var submatch

    if (!top.keywords) {
      return addText(modeBuffer, nodes)
    }

    lastIndex = 0

    top.lexemesRe.lastIndex = 0

    keyword = top.lexemesRe.exec(modeBuffer)

    while (keyword) {
      addText(modeBuffer.slice(lastIndex, keyword.index), nodes)

      submatch = keywordMatch(top, keyword)

      if (submatch) {
        relevance += submatch[1]

        node = build(submatch[0], [])

        nodes.push(node)

        addText(keyword[0], node.children)
      } else {
        addText(keyword[0], nodes)
      }

      lastIndex = top.lexemesRe.lastIndex
      keyword = top.lexemesRe.exec(modeBuffer)
    }

    addText(modeBuffer.slice(lastIndex), nodes)

    return nodes
  }

  // Add siblings.
  function addSiblings(siblings, nodes) {
    var length = siblings.length
    var index = -1
    var sibling

    while (++index < length) {
      sibling = siblings[index]

      if (sibling.type === 'text') {
        addText(sibling.value, nodes)
      } else {
        nodes.push(sibling)
      }
    }
  }

  // Add a text.
  function addText(value, nodes) {
    var tail

    if (value) {
      tail = nodes[nodes.length - 1]

      if (tail && tail.type === 'text') {
        tail.value += value
      } else {
        nodes.push(buildText(value))
      }
    }

    return nodes
  }

  // Build a text.
  function buildText(value) {
    return {type: 'text', value: value}
  }

  // Build a span.
  function build(name, contents, noPrefix) {
    return {
      type: 'element',
      tagName: 'span',
      properties: {
        className: [(noPrefix ? '' : prefix) + name]
      },
      children: contents
    }
  }

  // Check if the first word in `keywords` is a keyword.
  function keywordMatch(mode, keywords) {
    var keyword = keywords[0]

    if (language[keyInsensitive]) {
      keyword = keyword.toLowerCase()
    }

    return own.call(mode.keywords, keyword) && mode.keywords[keyword]
  }

  // Check if `lexeme` ends `mode`.
  function endOfMode(mode, lexeme) {
    if (test(mode.endRe, lexeme)) {
      while (mode.endsParent && mode.parent) {
        mode = mode.parent
      }

      return mode
    }

    if (mode.endsWithParent) {
      return endOfMode(mode.parent, lexeme)
    }
  }

  // Exit the current context.
  function pop() {
    /* istanbul ignore next - removed in hljs 9.3 */
    currentChildren = stack.pop() || children
  }
}

// Compile a language.
function compileLanguage(language) {
  compileMode(language)

  // Compile a language mode, optionally with a parent.
  function compileMode(mode, parent) {
    if (mode.compiled) {
      return
    }

    mode.compiled = true

    mode.keywords = mode.keywords || mode.beginKeywords

    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language[keyInsensitive])
    }

    mode.lexemesRe = langRe(mode.lexemes || /\w+/, true)

    if (parent) {
      if (mode.beginKeywords) {
        mode.begin =
          '\\b(' + mode.beginKeywords.split(space).join(verticalBar) + ')\\b'
      }

      if (!mode.begin) {
        mode.begin = /\B|\b/
      }

      mode.beginRe = langRe(mode.begin)

      if (mode.endSameAsBegin) {
        mode.end = mode.begin
      }

      if (!mode.end && !mode.endsWithParent) {
        mode.end = /\B|\b/
      }

      if (mode.end) {
        mode.endRe = langRe(mode.end)
      }

      mode[keyTerminatorEnd] = source(mode.end) || ''

      if (mode.endsWithParent && parent[keyTerminatorEnd]) {
        mode[keyTerminatorEnd] +=
          (mode.end ? verticalBar : '') + parent[keyTerminatorEnd]
      }
    }

    if (mode.illegal) {
      mode.illegalRe = langRe(mode.illegal)
    }

    if (mode.relevance === undefined) {
      mode.relevance = 1
    }

    mode.contains = compileContains(mode.contains || [], mode)

    if (mode.starts) {
      compileMode(mode.starts, parent)
    }

    mode.terminators = buildModeRegex(mode)
  }

  function compileContains(contains, mode) {
    var result = []
    var length = contains.length
    var index = -1
    var contained

    while (++index < length) {
      contained = contains[index]
      result = result.concat(
        expandOrCloneMode(contained === 'self' ? mode : contained)
      )
    }

    length = result.length
    index = -1

    while (++index < length) {
      compileMode(result[index], mode)
    }

    return result
  }

  function buildModeRegex(mode) {
    var indices = {}
    var expression
    var regexes = []
    var matcher = {}
    var matchAt = 1
    var term
    var values = mode.contains
    var length = values.length
    var index = -1
    var terminators = []

    while (++index < length) {
      term = values[index]

      addRule(
        term,
        term.beginKeywords ? '\\.?(?:' + term.begin + ')\\.?' : term.begin
      )
    }

    if (mode[keyTerminatorEnd]) {
      addRule('end', mode[keyTerminatorEnd])
    }

    if (mode.illegal) {
      addRule('illegal', mode.illegal)
    }

    length = regexes.length
    index = -1

    while (++index < length) {
      terminators[index] = regexes[index][1]
    }

    expression = langRe(joinRe(terminators, verticalBar), true)

    matcher = {lastIndex: 0, exec: exec}

    return matcher

    function exec(value) {
      var length
      var index
      var rule
      var match
      var submatch

      if (regexes.length === 0) return null

      expression.lastIndex = matcher.lastIndex
      match = expression.exec(value)

      if (!match) {
        return null
      }

      length = match.length
      index = -1

      while (++index < length) {
        submatch = match[index]

        if (submatch !== undefined && indices[index] !== undefined) {
          rule = indices[index]
          break
        }
      }

      // Illegal or end match
      if (typeof rule === 'string') {
        match.type = rule
        match.extra = [mode.illegal, mode.terminator_end]
      } else {
        match.type = 'begin'
        match.rule = rule
      }

      return match
    }

    function addRule(rule, regex) {
      indices[matchAt] = rule
      regexes.push([rule, regex])
      matchAt += new RegExp(regex.toString() + verticalBar).exec('').length
    }
  }

  function joinRe(regexes, separator) {
    var backreferenceRe = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9]\d*)|\\./
    var captures = 0
    var result = ''
    var length = regexes.length
    var index = -1
    var regex
    var offset
    var expression
    var match

    while (++index < length) {
      regex = regexes[index]
      expression = source(regex)
      captures += 1
      offset = captures

      if (index !== 0) {
        result += separator
      }

      result += parenOpen

      while (expression.length > 0) {
        match = backreferenceRe.exec(expression)

        if (match === null) {
          result += expression
          break
        }

        result += expression.slice(0, match.index)
        expression = expression.slice(match.index + match[0].length)

        if (match[0][0] === backslash && match[1]) {
          // Adjust the backreference.
          result += backslash + String(Number(match[1]) + offset)
        } else {
          result += match[0]

          if (match[0] === parenOpen) {
            captures++
          }
        }
      }

      result += parenClose
    }

    return result
  }

  // Create a regex for `value`.
  function langRe(value, global) {
    return new RegExp(
      source(value),
      'm' + (language[keyInsensitive] ? 'i' : '') + (global ? 'g' : '')
    )
  }

  // Get the source of an expression or string.
  function source(re) {
    return (re && re.source) || re
  }
}

function compileKeywords(values, caseInsensitive) {
  var compiled = {}
  var key

  if (typeof values === 'string') {
    flatten('keyword', values)
  } else {
    for (key in values) {
      flatten(key, values[key])
    }
  }

  return compiled

  function flatten(key, value) {
    var val = caseInsensitive ? value.toLowerCase() : value
    all(key, val.split(space))
  }

  function all(key, values) {
    var length = values.length
    var index = -1
    var pair

    while (++index < length) {
      pair = values[index].split(verticalBar)
      compiled[pair[0]] = [key, Number(pair[1]) || common(pair[0]) ? 0 : 1]
    }
  }
}

function common(value) {
  return commonKeywords.indexOf(value.toLowerCase()) !== -1
}

function expandOrCloneMode(mode) {
  var length
  var index
  var variants
  var result

  if (mode.variants && !mode[keyCachedVariants]) {
    variants = mode.variants
    length = variants.length
    index = -1
    result = []

    while (++index < length) {
      result[index] = inherit(mode, {variants: null}, variants[index])
    }

    mode[keyCachedVariants] = result
  }

  // Expand.
  if (mode.cached_variants) return mode.cached_variants

  // Clone.
  if (dependencyOnParent(mode))
    return [inherit(mode, {starts: mode.starts ? inherit(mode.starts) : null})]

  return [mode]
}

function dependencyOnParent(mode) {
  return mode ? mode.endsWithParent || dependencyOnParent(mode.starts) : false
}

// Normalize a syntax result.
function normalize(result) {
  return {
    relevance: result.relevance || 0,
    language: result.language || null,
    value: result.value || []
  }
}

// Check if `expression` matches `lexeme`.
function test(expression, lexeme) {
  var match = expression && expression.exec(lexeme)
  return match && match.index === 0
}

// Get a language by `name`.
function getLanguage(name) {
  name = name.toLowerCase()

  return languages[name] || languages[aliases[name]]
}


/***/ }),

/***/ "./node_modules/prosemirror-collab/dist/index.es.js":
/*!**********************************************************!*\
  !*** ./node_modules/prosemirror-collab/dist/index.es.js ***!
  \**********************************************************/
/*! exports provided: collab, getVersion, rebaseSteps, receiveTransaction, sendableSteps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collab", function() { return collab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVersion", function() { return getVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rebaseSteps", function() { return rebaseSteps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveTransaction", function() { return receiveTransaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendableSteps", function() { return sendableSteps; });
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");


var Rebaseable = function Rebaseable(step, inverted, origin) {
  this.step = step;
  this.inverted = inverted;
  this.origin = origin;
};

// : ([Rebaseable], [Step], Transform) → [Rebaseable]
// Undo a given set of steps, apply a set of other steps, and then
// redo them.
function rebaseSteps(steps, over, transform) {
  for (var i = steps.length - 1; i >= 0; i--) { transform.step(steps[i].inverted); }
  for (var i$1 = 0; i$1 < over.length; i$1++) { transform.step(over[i$1]); }
  var result = [];
  for (var i$2 = 0, mapFrom = steps.length; i$2 < steps.length; i$2++) {
    var mapped = steps[i$2].step.map(transform.mapping.slice(mapFrom));
    mapFrom--;
    if (mapped && !transform.maybeStep(mapped).failed) {
      transform.mapping.setMirror(mapFrom, transform.steps.length - 1);
      result.push(new Rebaseable(mapped, mapped.invert(transform.docs[transform.docs.length - 1]), steps[i$2].origin));
    }
  }
  return result
}

// This state field accumulates changes that have to be sent to the
// central authority in the collaborating group and makes it possible
// to integrate changes made by peers into our local document. It is
// defined by the plugin, and will be available as the `collab` field
// in the resulting editor state.
var CollabState = function CollabState(version, unconfirmed) {
  // : number
  // The version number of the last update received from the central
  // authority. Starts at 0 or the value of the `version` property
  // in the option object, for the editor's value when the option
  // was enabled.
  this.version = version;

  // : [Rebaseable]
  // The local steps that havent been successfully sent to the
  // server yet.
  this.unconfirmed = unconfirmed;
};

function unconfirmedFrom(transform) {
  var result = [];
  for (var i = 0; i < transform.steps.length; i++)
    { result.push(new Rebaseable(transform.steps[i],
                               transform.steps[i].invert(transform.docs[i]),
                               transform)); }
  return result
}

var collabKey = new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__["PluginKey"]("collab");

// :: (?Object) → Plugin
//
// Creates a plugin that enables the collaborative editing framework
// for the editor.
//
//   config::- An optional set of options
//
//     version:: ?number
//     The starting version number of the collaborative editing.
//     Defaults to 0.
//
//     clientID:: ?union<number, string>
//     This client's ID, used to distinguish its changes from those of
//     other clients. Defaults to a random 32-bit number.
function collab(config) {
  if ( config === void 0 ) config = {};

  config = {version: config.version || 0,
            clientID: config.clientID == null ? Math.floor(Math.random() * 0xFFFFFFFF) : config.clientID};

  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__["Plugin"]({
    key: collabKey,

    state: {
      init: function () { return new CollabState(config.version, []); },
      apply: function apply(tr, collab) {
        var newState = tr.getMeta(collabKey);
        if (newState)
          { return newState }
        if (tr.docChanged)
          { return new CollabState(collab.version, collab.unconfirmed.concat(unconfirmedFrom(tr))) }
        return collab
      }
    },

    config: config,
    // This is used to notify the history plugin to not merge steps,
    // so that the history can be rebased.
    historyPreserveItems: true
  })
}

// :: (state: EditorState, steps: [Step], clientIDs: [union<number, string>], options: ?Object) → Transaction
// Create a transaction that represents a set of new steps received from
// the authority. Applying this transaction moves the state forward to
// adjust to the authority's view of the document.
//
//   options::- Additional options.
//
//     mapSelectionBackward:: ?boolean
//     When enabled (the default is `false`), if the current selection
//     is a [text selection](#state.TextSelection), its sides are
//     mapped with a negative bias for this transaction, so that
//     content inserted at the cursor ends up after the cursor. Users
//     usually prefer this, but it isn't done by default for reasons
//     of backwards compatibility.
function receiveTransaction(state, steps, clientIDs, options) {
  // Pushes a set of steps (received from the central authority) into
  // the editor state (which should have the collab plugin enabled).
  // Will recognize its own changes, and confirm unconfirmed steps as
  // appropriate. Remaining unconfirmed steps will be rebased over
  // remote steps.
  var collabState = collabKey.getState(state);
  var version = collabState.version + steps.length;
  var ourID = collabKey.get(state).spec.config.clientID;

  // Find out which prefix of the steps originated with us
  var ours = 0;
  while (ours < clientIDs.length && clientIDs[ours] == ourID) { ++ours; }
  var unconfirmed = collabState.unconfirmed.slice(ours);
  steps = ours ? steps.slice(ours) : steps;

  // If all steps originated with us, we're done.
  if (!steps.length)
    { return state.tr.setMeta(collabKey, new CollabState(version, unconfirmed)) }

  var nUnconfirmed = unconfirmed.length;
  var tr = state.tr;
  if (nUnconfirmed) {
    unconfirmed = rebaseSteps(unconfirmed, steps, tr);
  } else {
    for (var i = 0; i < steps.length; i++) { tr.step(steps[i]); }
    unconfirmed = [];
  }

  var newCollabState = new CollabState(version, unconfirmed);
  if (options && options.mapSelectionBackward && state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__["TextSelection"]) {
    tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_0__["TextSelection"].between(tr.doc.resolve(tr.mapping.map(state.selection.anchor, -1)),
                                          tr.doc.resolve(tr.mapping.map(state.selection.head, -1)), -1));
    tr.updated &= ~1;
  }
  return tr.setMeta("rebased", nUnconfirmed).setMeta("addToHistory", false).setMeta(collabKey, newCollabState)
}

// :: (state: EditorState) → ?{version: number, steps: [Step], clientID: union<number, string>, origins: [Transaction]}
// Provides data describing the editor's unconfirmed steps, which need
// to be sent to the central authority. Returns null when there is
// nothing to send.
//
// `origins` holds the _original_ transactions that produced each
// steps. This can be useful for looking up time stamps and other
// metadata for the steps, but note that the steps may have been
// rebased, whereas the origin transactions are still the old,
// unchanged objects.
function sendableSteps(state) {
  var collabState = collabKey.getState(state);
  if (collabState.unconfirmed.length == 0) { return null }
  return {
    version: collabState.version,
    steps: collabState.unconfirmed.map(function (s) { return s.step; }),
    clientID: collabKey.get(state).spec.config.clientID,
    get origins() { return this._origins || (this._origins = collabState.unconfirmed.map(function (s) { return s.origin; })) }
  }
}

// :: (EditorState) → number
// Get the version up to which the collab plugin has synced with the
// central authority.
function getVersion(state) {
  return collabKey.getState(state).version
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/prosemirror-history/dist/index.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/prosemirror-history/dist/index.es.js ***!
  \***********************************************************/
/*! exports provided: HistoryState, closeHistory, history, redo, redoDepth, undo, undoDepth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryState", function() { return HistoryState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeHistory", function() { return closeHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "history", function() { return history; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redo", function() { return redo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redoDepth", function() { return redoDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "undo", function() { return undo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "undoDepth", function() { return undoDepth; });
/* harmony import */ var rope_sequence__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rope-sequence */ "./node_modules/rope-sequence/dist/index.es.js");
/* harmony import */ var prosemirror_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");




// ProseMirror's history isn't simply a way to roll back to a previous
// state, because ProseMirror supports applying changes without adding
// them to the history (for example during collaboration).
//
// To this end, each 'Branch' (one for the undo history and one for
// the redo history) keeps an array of 'Items', which can optionally
// hold a step (an actual undoable change), and always hold a position
// map (which is needed to move changes below them to apply to the
// current document).
//
// An item that has both a step and a selection bookmark is the start
// of an 'event' — a group of changes that will be undone or redone at
// once. (It stores only the bookmark, since that way we don't have to
// provide a document until the selection is actually applied, which
// is useful when compressing.)

// Used to schedule history compression
var max_empty_items = 500;

var Branch = function Branch(items, eventCount) {
  this.items = items;
  this.eventCount = eventCount;
};

// : (EditorState, bool) → ?{transform: Transform, selection: ?SelectionBookmark, remaining: Branch}
// Pop the latest event off the branch's history and apply it
// to a document transform.
Branch.prototype.popEvent = function popEvent (state, preserveItems) {
    var this$1 = this;

  if (this.eventCount == 0) { return null }

  var end = this.items.length;
  for (;; end--) {
    var next = this.items.get(end - 1);
    if (next.selection) { --end; break }
  }

  var remap, mapFrom;
  if (preserveItems) {
    remap = this.remapping(end, this.items.length);
    mapFrom = remap.maps.length;
  }
  var transform = state.tr;
  var selection, remaining;
  var addAfter = [], addBefore = [];

  this.items.forEach(function (item, i) {
    if (!item.step) {
      if (!remap) {
        remap = this$1.remapping(end, i + 1);
        mapFrom = remap.maps.length;
      }
      mapFrom--;
      addBefore.push(item);
      return
    }

    if (remap) {
      addBefore.push(new Item(item.map));
      var step = item.step.map(remap.slice(mapFrom)), map;

      if (step && transform.maybeStep(step).doc) {
        map = transform.mapping.maps[transform.mapping.maps.length - 1];
        addAfter.push(new Item(map, null, null, addAfter.length + addBefore.length));
      }
      mapFrom--;
      if (map) { remap.appendMap(map, mapFrom); }
    } else {
      transform.maybeStep(item.step);
    }

    if (item.selection) {
      selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
      remaining = new Branch(this$1.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), this$1.eventCount - 1);
      return false
    }
  }, this.items.length, 0);

  return {remaining: remaining, transform: transform, selection: selection}
};

// : (Transform, ?SelectionBookmark, Object) → Branch
// Create a new branch with the given transform added.
Branch.prototype.addTransform = function addTransform (transform, selection, histOptions, preserveItems) {
  var newItems = [], eventCount = this.eventCount;
  var oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;

  for (var i = 0; i < transform.steps.length; i++) {
    var step = transform.steps[i].invert(transform.docs[i]);
    var item = new Item(transform.mapping.maps[i], step, selection), merged = (void 0);
    if (merged = lastItem && lastItem.merge(item)) {
      item = merged;
      if (i) { newItems.pop(); }
      else { oldItems = oldItems.slice(0, oldItems.length - 1); }
    }
    newItems.push(item);
    if (selection) {
      eventCount++;
      selection = null;
    }
    if (!preserveItems) { lastItem = item; }
  }
  var overflow = eventCount - histOptions.depth;
  if (overflow > DEPTH_OVERFLOW) {
    oldItems = cutOffEvents(oldItems, overflow);
    eventCount -= overflow;
  }
  return new Branch(oldItems.append(newItems), eventCount)
};

Branch.prototype.remapping = function remapping (from, to) {
  var maps = new prosemirror_transform__WEBPACK_IMPORTED_MODULE_1__["Mapping"];
  this.items.forEach(function (item, i) {
    var mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from
        ? maps.maps.length - item.mirrorOffset : null;
    maps.appendMap(item.map, mirrorPos);
  }, from, to);
  return maps
};

Branch.prototype.addMaps = function addMaps (array) {
  if (this.eventCount == 0) { return this }
  return new Branch(this.items.append(array.map(function (map) { return new Item(map); })), this.eventCount)
};

// : (Transform, number)
// When the collab module receives remote changes, the history has
// to know about those, so that it can adjust the steps that were
// rebased on top of the remote changes, and include the position
// maps for the remote changes in its array of items.
Branch.prototype.rebased = function rebased (rebasedTransform, rebasedCount) {
  if (!this.eventCount) { return this }

  var rebasedItems = [], start = Math.max(0, this.items.length - rebasedCount);

  var mapping = rebasedTransform.mapping;
  var newUntil = rebasedTransform.steps.length;
  var eventCount = this.eventCount;
  this.items.forEach(function (item) { if (item.selection) { eventCount--; } }, start);

  var iRebased = rebasedCount;
  this.items.forEach(function (item) {
    var pos = mapping.getMirror(--iRebased);
    if (pos == null) { return }
    newUntil = Math.min(newUntil, pos);
    var map = mapping.maps[pos];
    if (item.step) {
      var step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
      var selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
      if (selection) { eventCount++; }
      rebasedItems.push(new Item(map, step, selection));
    } else {
      rebasedItems.push(new Item(map));
    }
  }, start);

  var newMaps = [];
  for (var i = rebasedCount; i < newUntil; i++)
    { newMaps.push(new Item(mapping.maps[i])); }
  var items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
  var branch = new Branch(items, eventCount);

  if (branch.emptyItemCount() > max_empty_items)
    { branch = branch.compress(this.items.length - rebasedItems.length); }
  return branch
};

Branch.prototype.emptyItemCount = function emptyItemCount () {
  var count = 0;
  this.items.forEach(function (item) { if (!item.step) { count++; } });
  return count
};

// Compressing a branch means rewriting it to push the air (map-only
// items) out. During collaboration, these naturally accumulate
// because each remote change adds one. The `upto` argument is used
// to ensure that only the items below a given level are compressed,
// because `rebased` relies on a clean, untouched set of items in
// order to associate old items with rebased steps.
Branch.prototype.compress = function compress (upto) {
    if ( upto === void 0 ) upto = this.items.length;

  var remap = this.remapping(0, upto), mapFrom = remap.maps.length;
  var items = [], events = 0;
  this.items.forEach(function (item, i) {
    if (i >= upto) {
      items.push(item);
      if (item.selection) { events++; }
    } else if (item.step) {
      var step = item.step.map(remap.slice(mapFrom)), map = step && step.getMap();
      mapFrom--;
      if (map) { remap.appendMap(map, mapFrom); }
      if (step) {
        var selection = item.selection && item.selection.map(remap.slice(mapFrom));
        if (selection) { events++; }
        var newItem = new Item(map.invert(), step, selection), merged, last = items.length - 1;
        if (merged = items.length && items[last].merge(newItem))
          { items[last] = merged; }
        else
          { items.push(newItem); }
      }
    } else if (item.map) {
      mapFrom--;
    }
  }, this.items.length, 0);
  return new Branch(rope_sequence__WEBPACK_IMPORTED_MODULE_0__["default"].from(items.reverse()), events)
};

Branch.empty = new Branch(rope_sequence__WEBPACK_IMPORTED_MODULE_0__["default"].empty, 0);

function cutOffEvents(items, n) {
  var cutPoint;
  items.forEach(function (item, i) {
    if (item.selection && (n-- == 0)) {
      cutPoint = i;
      return false
    }
  });
  return items.slice(cutPoint)
}

var Item = function Item(map, step, selection, mirrorOffset) {
  // The (forward) step map for this item.
  this.map = map;
  // The inverted step
  this.step = step;
  // If this is non-null, this item is the start of a group, and
  // this selection is the starting selection for the group (the one
  // that was active before the first step was applied)
  this.selection = selection;
  // If this item is the inverse of a previous mapping on the stack,
  // this points at the inverse's offset
  this.mirrorOffset = mirrorOffset;
};

Item.prototype.merge = function merge (other) {
  if (this.step && other.step && !other.selection) {
    var step = other.step.merge(this.step);
    if (step) { return new Item(step.getMap().invert(), step, this.selection) }
  }
};

// The value of the state field that tracks undo/redo history for that
// state. Will be stored in the plugin state when the history plugin
// is active.
var HistoryState = function HistoryState(done, undone, prevRanges, prevTime) {
  this.done = done;
  this.undone = undone;
  this.prevRanges = prevRanges;
  this.prevTime = prevTime;
};

var DEPTH_OVERFLOW = 20;

// : (HistoryState, EditorState, Transaction, Object)
// Record a transformation in undo history.
function applyTransaction(history, state, tr, options) {
  var historyTr = tr.getMeta(historyKey), rebased;
  if (historyTr) { return historyTr.historyState }

  if (tr.getMeta(closeHistoryKey)) { history = new HistoryState(history.done, history.undone, null, 0); }

  var appended = tr.getMeta("appendedTransaction");

  if (tr.steps.length == 0) {
    return history
  } else if (appended && appended.getMeta(historyKey)) {
    if (appended.getMeta(historyKey).redo)
      { return new HistoryState(history.done.addTransform(tr, null, options, mustPreserveItems(state)),
                              history.undone, rangesFor(tr.mapping.maps[tr.steps.length - 1]), history.prevTime) }
    else
      { return new HistoryState(history.done, history.undone.addTransform(tr, null, options, mustPreserveItems(state)),
                              null, history.prevTime) }
  } else if (tr.getMeta("addToHistory") !== false && !(appended && appended.getMeta("addToHistory") === false)) {
    // Group transforms that occur in quick succession into one event.
    var newGroup = history.prevTime == 0 || !appended && (history.prevTime < (tr.time || 0) - options.newGroupDelay ||
                                                          !isAdjacentTo(tr, history.prevRanges));
    var prevRanges = appended ? mapRanges(history.prevRanges, tr.mapping) : rangesFor(tr.mapping.maps[tr.steps.length - 1]);
    return new HistoryState(history.done.addTransform(tr, newGroup ? state.selection.getBookmark() : null,
                                                      options, mustPreserveItems(state)),
                            Branch.empty, prevRanges, tr.time)
  } else if (rebased = tr.getMeta("rebased")) {
    // Used by the collab module to tell the history that some of its
    // content has been rebased.
    return new HistoryState(history.done.rebased(tr, rebased),
                            history.undone.rebased(tr, rebased),
                            mapRanges(history.prevRanges, tr.mapping), history.prevTime)
  } else {
    return new HistoryState(history.done.addMaps(tr.mapping.maps),
                            history.undone.addMaps(tr.mapping.maps),
                            mapRanges(history.prevRanges, tr.mapping), history.prevTime)
  }
}

function isAdjacentTo(transform, prevRanges) {
  if (!prevRanges) { return false }
  if (!transform.docChanged) { return true }
  var adjacent = false;
  transform.mapping.maps[0].forEach(function (start, end) {
    for (var i = 0; i < prevRanges.length; i += 2)
      { if (start <= prevRanges[i + 1] && end >= prevRanges[i])
        { adjacent = true; } }
  });
  return adjacent
}

function rangesFor(map) {
  var result = [];
  map.forEach(function (_from, _to, from, to) { return result.push(from, to); });
  return result
}

function mapRanges(ranges, mapping) {
  if (!ranges) { return null }
  var result = [];
  for (var i = 0; i < ranges.length; i += 2) {
    var from = mapping.map(ranges[i], 1), to = mapping.map(ranges[i + 1], -1);
    if (from <= to) { result.push(from, to); }
  }
  return result
}

// : (HistoryState, EditorState, (tr: Transaction), bool)
// Apply the latest event from one branch to the document and shift the event
// onto the other branch.
function histTransaction(history, state, dispatch, redo) {
  var preserveItems = mustPreserveItems(state), histOptions = historyKey.get(state).spec.config;
  var pop = (redo ? history.undone : history.done).popEvent(state, preserveItems);
  if (!pop) { return }

  var selection = pop.selection.resolve(pop.transform.doc);
  var added = (redo ? history.done : history.undone).addTransform(pop.transform, state.selection.getBookmark(),
                                                                  histOptions, preserveItems);

  var newHist = new HistoryState(redo ? added : pop.remaining, redo ? pop.remaining : added, null, 0);
  dispatch(pop.transform.setSelection(selection).setMeta(historyKey, {redo: redo, historyState: newHist}).scrollIntoView());
}

var cachedPreserveItems = false, cachedPreserveItemsPlugins = null;
// Check whether any plugin in the given state has a
// `historyPreserveItems` property in its spec, in which case we must
// preserve steps exactly as they came in, so that they can be
// rebased.
function mustPreserveItems(state) {
  var plugins = state.plugins;
  if (cachedPreserveItemsPlugins != plugins) {
    cachedPreserveItems = false;
    cachedPreserveItemsPlugins = plugins;
    for (var i = 0; i < plugins.length; i++) { if (plugins[i].spec.historyPreserveItems) {
      cachedPreserveItems = true;
      break
    } }
  }
  return cachedPreserveItems
}

// :: (Transaction) → Transaction
// Set a flag on the given transaction that will prevent further steps
// from being appended to an existing history event (so that they
// require a separate undo command to undo).
function closeHistory(tr) {
  return tr.setMeta(closeHistoryKey, true)
}

var historyKey = new prosemirror_state__WEBPACK_IMPORTED_MODULE_2__["PluginKey"]("history");
var closeHistoryKey = new prosemirror_state__WEBPACK_IMPORTED_MODULE_2__["PluginKey"]("closeHistory");

// :: (?Object) → Plugin
// Returns a plugin that enables the undo history for an editor. The
// plugin will track undo and redo stacks, which can be used with the
// [`undo`](#history.undo) and [`redo`](#history.redo) commands.
//
// You can set an `"addToHistory"` [metadata
// property](#state.Transaction.setMeta) of `false` on a transaction
// to prevent it from being rolled back by undo.
//
//   config::-
//   Supports the following configuration options:
//
//     depth:: ?number
//     The amount of history events that are collected before the
//     oldest events are discarded. Defaults to 100.
//
//     newGroupDelay:: ?number
//     The delay between changes after which a new group should be
//     started. Defaults to 500 (milliseconds). Note that when changes
//     aren't adjacent, a new group is always started.
function history(config) {
  config = {depth: config && config.depth || 100,
            newGroupDelay: config && config.newGroupDelay || 500};
  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_2__["Plugin"]({
    key: historyKey,

    state: {
      init: function init() {
        return new HistoryState(Branch.empty, Branch.empty, null, 0)
      },
      apply: function apply(tr, hist, state) {
        return applyTransaction(hist, state, tr, config)
      }
    },

    config: config
  })
}

// :: (EditorState, ?(tr: Transaction)) → bool
// A command function that undoes the last change, if any.
function undo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.done.eventCount == 0) { return false }
  if (dispatch) { histTransaction(hist, state, dispatch, false); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// A command function that redoes the last undone change, if any.
function redo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.undone.eventCount == 0) { return false }
  if (dispatch) { histTransaction(hist, state, dispatch, true); }
  return true
}

// :: (EditorState) → number
// The amount of undoable events available in a given state.
function undoDepth(state) {
  var hist = historyKey.getState(state);
  return hist ? hist.done.eventCount : 0
}

// :: (EditorState) → number
// The amount of redoable events available in a given editor state.
function redoDepth(state) {
  var hist = historyKey.getState(state);
  return hist ? hist.undone.eventCount : 0
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/rope-sequence/dist/index.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/rope-sequence/dist/index.es.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var GOOD_LEAF_SIZE = 200;

// :: class<T> A rope sequence is a persistent sequence data structure
// that supports appending, prepending, and slicing without doing a
// full copy. It is represented as a mostly-balanced tree.
var RopeSequence = function RopeSequence () {};

RopeSequence.prototype.append = function append (other) {
  if (!other.length) { return this }
  other = RopeSequence.from(other);

  return (!this.length && other) ||
    (other.length < GOOD_LEAF_SIZE && this.leafAppend(other)) ||
    (this.length < GOOD_LEAF_SIZE && other.leafPrepend(this)) ||
    this.appendInner(other)
};

// :: (union<[T], RopeSequence<T>>) → RopeSequence<T>
// Prepend an array or other rope to this one, returning a new rope.
RopeSequence.prototype.prepend = function prepend (other) {
  if (!other.length) { return this }
  return RopeSequence.from(other).append(this)
};

RopeSequence.prototype.appendInner = function appendInner (other) {
  return new Append(this, other)
};

// :: (?number, ?number) → RopeSequence<T>
// Create a rope repesenting a sub-sequence of this rope.
RopeSequence.prototype.slice = function slice (from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from >= to) { return RopeSequence.empty }
  return this.sliceInner(Math.max(0, from), Math.min(this.length, to))
};

// :: (number) → T
// Retrieve the element at the given position from this rope.
RopeSequence.prototype.get = function get (i) {
  if (i < 0 || i >= this.length) { return undefined }
  return this.getInner(i)
};

// :: ((element: T, index: number) → ?bool, ?number, ?number)
// Call the given function for each element between the given
// indices. This tends to be more efficient than looping over the
// indices and calling `get`, because it doesn't have to descend the
// tree for every element.
RopeSequence.prototype.forEach = function forEach (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from <= to)
    { this.forEachInner(f, from, to, 0); }
  else
    { this.forEachInvertedInner(f, from, to, 0); }
};

// :: ((element: T, index: number) → U, ?number, ?number) → [U]
// Map the given functions over the elements of the rope, producing
// a flat array.
RopeSequence.prototype.map = function map (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  var result = [];
  this.forEach(function (elt, i) { return result.push(f(elt, i)); }, from, to);
  return result
};

// :: (?union<[T], RopeSequence<T>>) → RopeSequence<T>
// Create a rope representing the given array, or return the rope
// itself if a rope was given.
RopeSequence.from = function from (values) {
  if (values instanceof RopeSequence) { return values }
  return values && values.length ? new Leaf(values) : RopeSequence.empty
};

var Leaf = /*@__PURE__*/(function (RopeSequence) {
  function Leaf(values) {
    RopeSequence.call(this);
    this.values = values;
  }

  if ( RopeSequence ) Leaf.__proto__ = RopeSequence;
  Leaf.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Leaf.prototype.constructor = Leaf;

  var prototypeAccessors = { length: { configurable: true },depth: { configurable: true } };

  Leaf.prototype.flatten = function flatten () {
    return this.values
  };

  Leaf.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    return new Leaf(this.values.slice(from, to))
  };

  Leaf.prototype.getInner = function getInner (i) {
    return this.values[i]
  };

  Leaf.prototype.forEachInner = function forEachInner (f, from, to, start) {
    for (var i = from; i < to; i++)
      { if (f(this.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    for (var i = from - 1; i >= to; i--)
      { if (f(this.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.leafAppend = function leafAppend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(this.values.concat(other.flatten())) }
  };

  Leaf.prototype.leafPrepend = function leafPrepend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(other.flatten().concat(this.values)) }
  };

  prototypeAccessors.length.get = function () { return this.values.length };

  prototypeAccessors.depth.get = function () { return 0 };

  Object.defineProperties( Leaf.prototype, prototypeAccessors );

  return Leaf;
}(RopeSequence));

// :: RopeSequence
// The empty rope sequence.
RopeSequence.empty = new Leaf([]);

var Append = /*@__PURE__*/(function (RopeSequence) {
  function Append(left, right) {
    RopeSequence.call(this);
    this.left = left;
    this.right = right;
    this.length = left.length + right.length;
    this.depth = Math.max(left.depth, right.depth) + 1;
  }

  if ( RopeSequence ) Append.__proto__ = RopeSequence;
  Append.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Append.prototype.constructor = Append;

  Append.prototype.flatten = function flatten () {
    return this.left.flatten().concat(this.right.flatten())
  };

  Append.prototype.getInner = function getInner (i) {
    return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length)
  };

  Append.prototype.forEachInner = function forEachInner (f, from, to, start) {
    var leftLen = this.left.length;
    if (from < leftLen &&
        this.left.forEachInner(f, from, Math.min(to, leftLen), start) === false)
      { return false }
    if (to > leftLen &&
        this.right.forEachInner(f, Math.max(from - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false)
      { return false }
  };

  Append.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    var leftLen = this.left.length;
    if (from > leftLen &&
        this.right.forEachInvertedInner(f, from - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false)
      { return false }
    if (to < leftLen &&
        this.left.forEachInvertedInner(f, Math.min(from, leftLen), to, start) === false)
      { return false }
  };

  Append.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    var leftLen = this.left.length;
    if (to <= leftLen) { return this.left.slice(from, to) }
    if (from >= leftLen) { return this.right.slice(from - leftLen, to - leftLen) }
    return this.left.slice(from, leftLen).append(this.right.slice(0, to - leftLen))
  };

  Append.prototype.leafAppend = function leafAppend (other) {
    var inner = this.right.leafAppend(other);
    if (inner) { return new Append(this.left, inner) }
  };

  Append.prototype.leafPrepend = function leafPrepend (other) {
    var inner = this.left.leafPrepend(other);
    if (inner) { return new Append(inner, this.right) }
  };

  Append.prototype.appendInner = function appendInner (other) {
    if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1)
      { return new Append(this.left, new Append(this.right, other)) }
    return new Append(this, other)
  };

  return Append;
}(RopeSequence));

var ropeSequence = RopeSequence;

/* harmony default export */ __webpack_exports__["default"] = (ropeSequence);


/***/ }),

/***/ "./node_modules/tiptap-extensions/dist/extensions.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiptap-extensions/dist/extensions.esm.js ***!
  \***************************************************************/
/*! exports provided: Blockquote, Bold, BulletList, Code, CodeBlock, CodeBlockHighlight, Collaboration, Focus, HardBreak, Heading, Highlight, History, HorizontalRule, Image, Italic, Link, ListItem, Mention, OrderedList, Placeholder, Search, Strike, Suggestions, Table, TableCell, TableHeader, TableRow, TodoItem, TodoList, TrailingNode, Underline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Blockquote", function() { return Blockquote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bold", function() { return Bold; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulletList", function() { return BulletList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Code", function() { return Code; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeBlock", function() { return CodeBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeBlockHighlight", function() { return CodeBlockHighlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collaboration", function() { return Collaboration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Focus", function() { return Focus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardBreak", function() { return HardBreak; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Heading", function() { return Heading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Highlight", function() { return HighlightPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "History", function() { return History; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalRule", function() { return HorizontalRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return Image; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Italic", function() { return Italic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItem", function() { return ListItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mention", function() { return Mention; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderedList", function() { return OrderedList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Placeholder", function() { return Placeholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Search", function() { return Search; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Strike", function() { return Strike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Suggestions", function() { return SuggestionsPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableCell", function() { return TableCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableHeader", function() { return TableHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableRow", function() { return TableRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoItem", function() { return TodoItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoList", function() { return TodoList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrailingNode", function() { return TrailingNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Underline", function() { return Underline; });
/* harmony import */ var tiptap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");
/* harmony import */ var tiptap_commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiptap-commands */ "./node_modules/tiptap-commands/dist/commands.esm.js");
/* harmony import */ var lowlight_lib_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lowlight/lib/core */ "./node_modules/lowlight/lib/core.js");
/* harmony import */ var lowlight_lib_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lowlight_lib_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prosemirror_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prosemirror-view */ "./node_modules/prosemirror-view/dist/index.es.js");
/* harmony import */ var prosemirror_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prosemirror-utils */ "./node_modules/prosemirror-utils/dist/index.js");
/* harmony import */ var prosemirror_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prosemirror_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prosemirror-tables */ "./node_modules/prosemirror-tables/dist/index.es.js");
/* harmony import */ var tiptap_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tiptap-utils */ "./node_modules/tiptap-utils/dist/utils.esm.js");
/* harmony import */ var prosemirror_transform__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");
/* harmony import */ var prosemirror_collab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prosemirror-collab */ "./node_modules/prosemirror-collab/dist/index.es.js");
/* harmony import */ var prosemirror_history__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prosemirror-history */ "./node_modules/prosemirror-history/dist/index.es.js");

    /*!
    * tiptap-extensions v1.29.0
    * (c) 2020 Scrumpy UG (limited liability)
    * @license MIT
    */
  












function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Blockquote = /*#__PURE__*/function (_Node) {
  _inherits(Blockquote, _Node);

  var _super = _createSuper(Blockquote);

  function Blockquote() {
    _classCallCheck(this, Blockquote);

    return _super.apply(this, arguments);
  }

  _createClass(Blockquote, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type,
          schema = _ref.schema;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleWrap"])(type, schema.nodes.paragraph);
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref2) {
      var type = _ref2.type;
      return {
        'Ctrl->': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleWrap"])(type)
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["wrappingInputRule"])(/^\s*>\s$/, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'blockquote';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: 'block*',
        group: 'block',
        defining: true,
        draggable: false,
        parseDOM: [{
          tag: 'blockquote'
        }],
        toDOM: function toDOM() {
          return ['blockquote', 0];
        }
      };
    }
  }]);

  return Blockquote;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var BulletList = /*#__PURE__*/function (_Node) {
  _inherits(BulletList, _Node);

  var _super = _createSuper(BulletList);

  function BulletList() {
    _classCallCheck(this, BulletList);

    return _super.apply(this, arguments);
  }

  _createClass(BulletList, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type,
          schema = _ref.schema;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleList"])(type, schema.nodes.list_item);
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref2) {
      var type = _ref2.type,
          schema = _ref2.schema;
      return {
        'Shift-Ctrl-8': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleList"])(type, schema.nodes.list_item)
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["wrappingInputRule"])(/^\s*([-+*])\s$/, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'bullet_list';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: 'list_item+',
        group: 'block',
        parseDOM: [{
          tag: 'ul'
        }],
        toDOM: function toDOM() {
          return ['ul', 0];
        }
      };
    }
  }]);

  return BulletList;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var CodeBlock = /*#__PURE__*/function (_Node) {
  _inherits(CodeBlock, _Node);

  var _super = _createSuper(CodeBlock);

  function CodeBlock() {
    _classCallCheck(this, CodeBlock);

    return _super.apply(this, arguments);
  }

  _createClass(CodeBlock, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type,
          schema = _ref.schema;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleBlockType"])(type, schema.nodes.paragraph);
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref2) {
      var type = _ref2.type;
      return {
        'Shift-Ctrl-\\': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["setBlockType"])(type)
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["textblockTypeInputRule"])(/^```$/, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'code_block';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: 'text*',
        marks: '',
        group: 'block',
        code: true,
        defining: true,
        draggable: false,
        parseDOM: [{
          tag: 'pre',
          preserveWhitespace: 'full'
        }],
        toDOM: function toDOM() {
          return ['pre', ['code', 0]];
        }
      };
    }
  }]);

  return CodeBlock;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

function getDecorations(_ref) {
  var doc = _ref.doc,
      name = _ref.name;
  var decorations = [];
  var blocks = Object(prosemirror_utils__WEBPACK_IMPORTED_MODULE_4__["findBlockNodes"])(doc).filter(function (item) {
    return item.node.type.name === name;
  });

  var flatten = function flatten(list) {
    return list.reduce(function (a, b) {
      return a.concat(Array.isArray(b) ? flatten(b) : b);
    }, []);
  };

  function parseNodes(nodes) {
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return nodes.map(function (node) {
      var classes = [].concat(_toConsumableArray(className), _toConsumableArray(node.properties ? node.properties.className : []));

      if (node.children) {
        return parseNodes(node.children, classes);
      }

      return {
        text: node.value,
        classes: classes
      };
    });
  }

  blocks.forEach(function (block) {
    var startPos = block.pos + 1;
    var nodes = lowlight_lib_core__WEBPACK_IMPORTED_MODULE_2___default.a.highlightAuto(block.node.textContent).value;
    flatten(parseNodes(nodes)).map(function (node) {
      var from = startPos;
      var to = from + node.text.length;
      startPos = to;
      return _objectSpread2({}, node, {
        from: from,
        to: to
      });
    }).forEach(function (node) {
      var decoration = prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["Decoration"].inline(node.from, node.to, {
        class: node.classes.join(' ')
      });
      decorations.push(decoration);
    });
  });
  return prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["DecorationSet"].create(doc, decorations);
}

function HighlightPlugin(_ref2) {
  var name = _ref2.name;
  return new tiptap__WEBPACK_IMPORTED_MODULE_0__["Plugin"]({
    name: new tiptap__WEBPACK_IMPORTED_MODULE_0__["PluginKey"]('highlight'),
    state: {
      init: function init(_, _ref3) {
        var doc = _ref3.doc;
        return getDecorations({
          doc: doc,
          name: name
        });
      },
      apply: function apply(transaction, decorationSet, oldState, newState) {
        // TODO: find way to cache decorations
        // https://discuss.prosemirror.net/t/how-to-update-multiple-inline-decorations-on-node-change/1493
        var oldNodeName = oldState.selection.$head.parent.type.name;
        var newNodeName = newState.selection.$head.parent.type.name;
        var oldNodes = Object(prosemirror_utils__WEBPACK_IMPORTED_MODULE_4__["findBlockNodes"])(oldState.doc).filter(function (item) {
          return item.node.type.name === name;
        });
        var newNodes = Object(prosemirror_utils__WEBPACK_IMPORTED_MODULE_4__["findBlockNodes"])(newState.doc).filter(function (item) {
          return item.node.type.name === name;
        }); // Apply decorations if selection includes named node, or transaction changes named node.

        if (transaction.docChanged && ([oldNodeName, newNodeName].includes(name) || newNodes.length !== oldNodes.length)) {
          return getDecorations({
            doc: transaction.doc,
            name: name
          });
        }

        return decorationSet.map(transaction.mapping, transaction.doc);
      }
    },
    props: {
      decorations: function decorations(state) {
        return this.getState(state);
      }
    }
  });
}

var CodeBlockHighlight = /*#__PURE__*/function (_Node) {
  _inherits(CodeBlockHighlight, _Node);

  var _super = _createSuper(CodeBlockHighlight);

  function CodeBlockHighlight() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CodeBlockHighlight);

    _this = _super.call(this, options);

    try {
      Object.entries(_this.options.languages).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            mapping = _ref2[1];

        lowlight_lib_core__WEBPACK_IMPORTED_MODULE_2___default.a.registerLanguage(name, mapping);
      });
    } catch (err) {
      throw new Error('Invalid syntax highlight definitions: define at least one highlight.js language mapping');
    }

    return _this;
  }

  _createClass(CodeBlockHighlight, [{
    key: "commands",
    value: function commands(_ref3) {
      var type = _ref3.type,
          schema = _ref3.schema;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleBlockType"])(type, schema.nodes.paragraph);
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref4) {
      var type = _ref4.type;
      return {
        'Shift-Ctrl-\\': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["setBlockType"])(type)
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref5) {
      var type = _ref5.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["textblockTypeInputRule"])(/^```$/, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'code_block';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        languages: {}
      };
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: 'text*',
        marks: '',
        group: 'block',
        code: true,
        defining: true,
        draggable: false,
        parseDOM: [{
          tag: 'pre',
          preserveWhitespace: 'full'
        }],
        toDOM: function toDOM() {
          return ['pre', ['code', 0]];
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      return [HighlightPlugin({
        name: this.name
      })];
    }
  }]);

  return CodeBlockHighlight;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var HardBreak = /*#__PURE__*/function (_Node) {
  _inherits(HardBreak, _Node);

  var _super = _createSuper(HardBreak);

  function HardBreak() {
    _classCallCheck(this, HardBreak);

    return _super.apply(this, arguments);
  }

  _createClass(HardBreak, [{
    key: "keys",
    value: function keys(_ref) {
      var type = _ref.type;
      var command = Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["chainCommands"])(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["exitCode"], function (state, dispatch) {
        dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
        return true;
      });
      return {
        'Mod-Enter': command,
        'Shift-Enter': command
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'hard_break';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        inline: true,
        group: 'inline',
        selectable: false,
        parseDOM: [{
          tag: 'br'
        }],
        toDOM: function toDOM() {
          return ['br'];
        }
      };
    }
  }]);

  return HardBreak;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var Heading = /*#__PURE__*/function (_Node) {
  _inherits(Heading, _Node);

  var _super = _createSuper(Heading);

  function Heading() {
    _classCallCheck(this, Heading);

    return _super.apply(this, arguments);
  }

  _createClass(Heading, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type,
          schema = _ref.schema;
      return function (attrs) {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleBlockType"])(type, schema.nodes.paragraph, attrs);
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref2) {
      var type = _ref2.type;
      return this.options.levels.reduce(function (items, level) {
        return _objectSpread2({}, items, {}, _defineProperty({}, "Shift-Ctrl-".concat(level), Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["setBlockType"])(type, {
          level: level
        })));
      }, {});
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return this.options.levels.map(function (level) {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["textblockTypeInputRule"])(new RegExp("^(#{1,".concat(level, "})\\s$")), type, function () {
          return {
            level: level
          };
        });
      });
    }
  }, {
    key: "name",
    get: function get() {
      return 'heading';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        levels: [1, 2, 3, 4, 5, 6]
      };
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        attrs: {
          level: {
            default: 1
          }
        },
        content: 'inline*',
        group: 'block',
        defining: true,
        draggable: false,
        parseDOM: this.options.levels.map(function (level) {
          return {
            tag: "h".concat(level),
            attrs: {
              level: level
            }
          };
        }),
        toDOM: function toDOM(node) {
          return ["h".concat(node.attrs.level), 0];
        }
      };
    }
  }]);

  return Heading;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var HorizontalRule = /*#__PURE__*/function (_Node) {
  _inherits(HorizontalRule, _Node);

  var _super = _createSuper(HorizontalRule);

  function HorizontalRule() {
    _classCallCheck(this, HorizontalRule);

    return _super.apply(this, arguments);
  }

  _createClass(HorizontalRule, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type;
      return function () {
        return function (state, dispatch) {
          return dispatch(state.tr.replaceSelectionWith(type.create()));
        };
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref2) {
      var type = _ref2.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["nodeInputRule"])(/^(?:---|___\s|\*\*\*\s)$/, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'horizontal_rule';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        group: 'block',
        parseDOM: [{
          tag: 'hr'
        }],
        toDOM: function toDOM() {
          return ['hr'];
        }
      };
    }
  }]);

  return HorizontalRule;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */

var IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

var Image = /*#__PURE__*/function (_Node) {
  _inherits(Image, _Node);

  var _super = _createSuper(Image);

  function Image() {
    _classCallCheck(this, Image);

    return _super.apply(this, arguments);
  }

  _createClass(Image, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type;
      return function (attrs) {
        return function (state, dispatch) {
          var selection = state.selection;
          var position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
          var node = type.create(attrs);
          var transaction = state.tr.insert(position, node);
          dispatch(transaction);
        };
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref2) {
      var type = _ref2.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["nodeInputRule"])(IMAGE_INPUT_REGEX, type, function (match) {
        var _match = _slicedToArray(match, 4),
            alt = _match[1],
            src = _match[2],
            title = _match[3];

        return {
          src: src,
          alt: alt,
          title: title
        };
      })];
    }
  }, {
    key: "name",
    get: function get() {
      return 'image';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        inline: true,
        attrs: {
          src: {},
          alt: {
            default: null
          },
          title: {
            default: null
          }
        },
        group: 'inline',
        draggable: true,
        parseDOM: [{
          tag: 'img[src]',
          getAttrs: function getAttrs(dom) {
            return {
              src: dom.getAttribute('src'),
              title: dom.getAttribute('title'),
              alt: dom.getAttribute('alt')
            };
          }
        }],
        toDOM: function toDOM(node) {
          return ['img', node.attrs];
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      return [new tiptap__WEBPACK_IMPORTED_MODULE_0__["Plugin"]({
        props: {
          handleDOMEvents: {
            drop: function drop(view, event) {
              var hasFiles = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length;

              if (!hasFiles) {
                return;
              }

              var images = Array.from(event.dataTransfer.files).filter(function (file) {
                return /image/i.test(file.type);
              });

              if (images.length === 0) {
                return;
              }

              event.preventDefault();
              var schema = view.state.schema;
              var coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY
              });
              images.forEach(function (image) {
                var reader = new FileReader();

                reader.onload = function (readerEvent) {
                  var node = schema.nodes.image.create({
                    src: readerEvent.target.result
                  });
                  var transaction = view.state.tr.insert(coordinates.pos, node);
                  view.dispatch(transaction);
                };

                reader.readAsDataURL(image);
              });
            }
          }
        }
      })];
    }
  }]);

  return Image;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var ListItem = /*#__PURE__*/function (_Node) {
  _inherits(ListItem, _Node);

  var _super = _createSuper(ListItem);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _super.apply(this, arguments);
  }

  _createClass(ListItem, [{
    key: "keys",
    value: function keys(_ref) {
      var type = _ref.type;
      return {
        Enter: Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["splitListItem"])(type),
        Tab: Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["sinkListItem"])(type),
        'Shift-Tab': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["liftListItem"])(type)
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'list_item';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: 'paragraph block*',
        defining: true,
        draggable: false,
        parseDOM: [{
          tag: 'li'
        }],
        toDOM: function toDOM() {
          return ['li', 0];
        }
      };
    }
  }]);

  return ListItem;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

function triggerCharacter(_ref) {
  var _ref$char = _ref.char,
      char = _ref$char === void 0 ? '@' : _ref$char,
      _ref$allowSpaces = _ref.allowSpaces,
      allowSpaces = _ref$allowSpaces === void 0 ? false : _ref$allowSpaces,
      _ref$startOfLine = _ref.startOfLine,
      startOfLine = _ref$startOfLine === void 0 ? false : _ref$startOfLine;
  return function ($position) {
    // cancel if top level node
    if ($position.depth <= 0) {
      return false;
    } // Matching expressions used for later


    var escapedChar = "\\".concat(char);
    var suffix = new RegExp("\\s".concat(escapedChar, "$"));
    var prefix = startOfLine ? '^' : '';
    var regexp = allowSpaces ? new RegExp("".concat(prefix).concat(escapedChar, ".*?(?=\\s").concat(escapedChar, "|$)"), 'gm') : new RegExp("".concat(prefix, "(?:^)?").concat(escapedChar, "[^\\s").concat(escapedChar, "]*"), 'gm'); // Lookup the boundaries of the current node

    var textFrom = $position.before();
    var textTo = $position.end();
    var text = $position.doc.textBetween(textFrom, textTo, '\0', '\0');
    var match = regexp.exec(text);
    var position;

    while (match !== null) {
      // JavaScript doesn't have lookbehinds; this hacks a check that first character is " "
      // or the line beginning
      var matchPrefix = match.input.slice(Math.max(0, match.index - 1), match.index);

      if (/^[\s\0]?$/.test(matchPrefix)) {
        // The absolute position of the match in the document
        var from = match.index + $position.start();
        var to = from + match[0].length; // Edge case handling; if spaces are allowed and we're directly in between
        // two triggers

        if (allowSpaces && suffix.test(text.slice(to - 1, to + 1))) {
          match[0] += ' ';
          to += 1;
        } // If the $position is located within the matched substring, return that range


        if (from < $position.pos && to >= $position.pos) {
          position = {
            range: {
              from: from,
              to: to
            },
            query: match[0].slice(char.length),
            text: match[0]
          };
        }
      }

      match = regexp.exec(text);
    }

    return position;
  };
}

function SuggestionsPlugin(_ref2) {
  var _ref2$matcher = _ref2.matcher,
      matcher = _ref2$matcher === void 0 ? {
    char: '@',
    allowSpaces: false,
    startOfLine: false
  } : _ref2$matcher,
      _ref2$appendText = _ref2.appendText,
      appendText = _ref2$appendText === void 0 ? null : _ref2$appendText,
      _ref2$suggestionClass = _ref2.suggestionClass,
      suggestionClass = _ref2$suggestionClass === void 0 ? 'suggestion' : _ref2$suggestionClass,
      _ref2$command = _ref2.command,
      _command = _ref2$command === void 0 ? function () {
    return false;
  } : _ref2$command,
      _ref2$items = _ref2.items,
      items = _ref2$items === void 0 ? [] : _ref2$items,
      _ref2$onEnter = _ref2.onEnter,
      onEnter = _ref2$onEnter === void 0 ? function () {
    return false;
  } : _ref2$onEnter,
      _ref2$onChange = _ref2.onChange,
      onChange = _ref2$onChange === void 0 ? function () {
    return false;
  } : _ref2$onChange,
      _ref2$onExit = _ref2.onExit,
      onExit = _ref2$onExit === void 0 ? function () {
    return false;
  } : _ref2$onExit,
      _ref2$onKeyDown = _ref2.onKeyDown,
      onKeyDown = _ref2$onKeyDown === void 0 ? function () {
    return false;
  } : _ref2$onKeyDown,
      _ref2$onFilter = _ref2.onFilter,
      onFilter = _ref2$onFilter === void 0 ? function (searchItems, query) {
    if (!query) {
      return searchItems;
    }

    return searchItems.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
    });
  } : _ref2$onFilter;

  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_5__["Plugin"]({
    key: new prosemirror_state__WEBPACK_IMPORTED_MODULE_5__["PluginKey"]('suggestions'),
    view: function view() {
      var _this = this;

      return {
        update: function update(view, prevState) {
          var prev = _this.key.getState(prevState);

          var next = _this.key.getState(view.state); // See how the state changed


          var moved = prev.active && next.active && prev.range.from !== next.range.from;
          var started = !prev.active && next.active;
          var stopped = prev.active && !next.active;
          var changed = !started && !stopped && prev.query !== next.query;
          var handleStart = started || moved;
          var handleChange = changed && !moved;
          var handleExit = stopped || moved; // Cancel when suggestion isn't active

          if (!handleStart && !handleChange && !handleExit) {
            return;
          }

          var state = handleExit ? prev : next;
          var decorationNode = document.querySelector("[data-decoration-id=\"".concat(state.decorationId, "\"]")); // build a virtual node for popper.js or tippy.js
          // this can be used for building popups without a DOM node

          var virtualNode = decorationNode ? {
            getBoundingClientRect: function getBoundingClientRect() {
              return decorationNode.getBoundingClientRect();
            },
            clientWidth: decorationNode.clientWidth,
            clientHeight: decorationNode.clientHeight
          } : null;
          var props = {
            view: view,
            range: state.range,
            query: state.query,
            text: state.text,
            decorationNode: decorationNode,
            virtualNode: virtualNode,
            items: onFilter(Array.isArray(items) ? items : items(), state.query),
            command: function command(_ref3) {
              var range = _ref3.range,
                  attrs = _ref3.attrs;

              _command({
                range: range,
                attrs: attrs,
                schema: view.state.schema
              })(view.state, view.dispatch, view);

              if (appendText) {
                Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["insertText"])(appendText)(view.state, view.dispatch, view);
              }
            }
          }; // Trigger the hooks when necessary

          if (handleExit) {
            onExit(props);
          }

          if (handleChange) {
            onChange(props);
          }

          if (handleStart) {
            onEnter(props);
          }
        }
      };
    },
    state: {
      // Initialize the plugin's internal state.
      init: function init() {
        return {
          active: false,
          range: {},
          query: null,
          text: null
        };
      },
      // Apply changes to the plugin state from a view transaction.
      apply: function apply(tr, prev) {
        var selection = tr.selection;

        var next = _objectSpread2({}, prev); // We can only be suggesting if there is no selection


        if (selection.from === selection.to) {
          // Reset active state if we just left the previous suggestion range
          if (selection.from < prev.range.from || selection.from > prev.range.to) {
            next.active = false;
          } // Try to match against where our cursor currently is


          var $position = selection.$from;
          var match = triggerCharacter(matcher)($position);
          var decorationId = (Math.random() + 1).toString(36).substr(2, 5); // If we found a match, update the current state to show it

          if (match) {
            next.active = true;
            next.decorationId = prev.decorationId ? prev.decorationId : decorationId;
            next.range = match.range;
            next.query = match.query;
            next.text = match.text;
          } else {
            next.active = false;
          }
        } else {
          next.active = false;
        } // Make sure to empty the range if suggestion is inactive


        if (!next.active) {
          next.decorationId = null;
          next.range = {};
          next.query = null;
          next.text = null;
        }

        return next;
      }
    },
    props: {
      // Call the keydown hook if suggestion is active.
      handleKeyDown: function handleKeyDown(view, event) {
        var _this$getState = this.getState(view.state),
            active = _this$getState.active,
            range = _this$getState.range;

        if (!active) return false;
        return onKeyDown({
          view: view,
          event: event,
          range: range
        });
      },
      // Setup decorator on the currently active suggestion.
      decorations: function decorations(editorState) {
        var _this$getState2 = this.getState(editorState),
            active = _this$getState2.active,
            range = _this$getState2.range,
            decorationId = _this$getState2.decorationId;

        if (!active) return null;
        return prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["DecorationSet"].create(editorState.doc, [prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["Decoration"].inline(range.from, range.to, {
          nodeName: 'span',
          class: suggestionClass,
          'data-decoration-id': decorationId
        })]);
      }
    }
  });
}

var Mention = /*#__PURE__*/function (_Node) {
  _inherits(Mention, _Node);

  var _super = _createSuper(Mention);

  function Mention() {
    _classCallCheck(this, Mention);

    return _super.apply(this, arguments);
  }

  _createClass(Mention, [{
    key: "commands",
    value: function commands(_ref) {
      var _this = this;

      var schema = _ref.schema;
      return function (attrs) {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["replaceText"])(null, schema.nodes[_this.name], attrs);
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'mention';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        matcher: {
          char: '@',
          allowSpaces: false,
          startOfLine: false
        },
        mentionClass: 'mention',
        suggestionClass: 'mention-suggestion'
      };
    }
  }, {
    key: "schema",
    get: function get() {
      var _this2 = this;

      return {
        attrs: {
          id: {},
          label: {}
        },
        group: 'inline',
        inline: true,
        selectable: false,
        atom: true,
        toDOM: function toDOM(node) {
          return ['span', {
            class: _this2.options.mentionClass,
            'data-mention-id': node.attrs.id
          }, "".concat(_this2.options.matcher.char).concat(node.attrs.label)];
        },
        parseDOM: [{
          tag: 'span[data-mention-id]',
          getAttrs: function getAttrs(dom) {
            var id = dom.getAttribute('data-mention-id');
            var label = dom.innerText.split(_this2.options.matcher.char).join('');
            return {
              id: id,
              label: label
            };
          }
        }]
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this3 = this;

      return [SuggestionsPlugin({
        command: function command(_ref2) {
          var range = _ref2.range,
              attrs = _ref2.attrs,
              schema = _ref2.schema;
          return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["replaceText"])(range, schema.nodes[_this3.name], attrs);
        },
        appendText: ' ',
        matcher: this.options.matcher,
        items: this.options.items,
        onEnter: this.options.onEnter,
        onChange: this.options.onChange,
        onExit: this.options.onExit,
        onKeyDown: this.options.onKeyDown,
        onFilter: this.options.onFilter,
        suggestionClass: this.options.suggestionClass
      })];
    }
  }]);

  return Mention;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var OrderedList = /*#__PURE__*/function (_Node) {
  _inherits(OrderedList, _Node);

  var _super = _createSuper(OrderedList);

  function OrderedList() {
    _classCallCheck(this, OrderedList);

    return _super.apply(this, arguments);
  }

  _createClass(OrderedList, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type,
          schema = _ref.schema;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleList"])(type, schema.nodes.list_item);
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref2) {
      var type = _ref2.type,
          schema = _ref2.schema;
      return {
        'Shift-Ctrl-9': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleList"])(type, schema.nodes.list_item)
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["wrappingInputRule"])(/^(\d+)\.\s$/, type, function (match) {
        return {
          order: +match[1]
        };
      }, function (match, node) {
        return node.childCount + node.attrs.order === +match[1];
      })];
    }
  }, {
    key: "name",
    get: function get() {
      return 'ordered_list';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        attrs: {
          order: {
            default: 1
          }
        },
        content: 'list_item+',
        group: 'block',
        parseDOM: [{
          tag: 'ol',
          getAttrs: function getAttrs(dom) {
            return {
              order: dom.hasAttribute('start') ? +dom.getAttribute('start') : 1
            };
          }
        }],
        toDOM: function toDOM(node) {
          return node.attrs.order === 1 ? ['ol', 0] : ['ol', {
            start: node.attrs.order
          }, 0];
        }
      };
    }
  }]);

  return OrderedList;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var TableNodes = Object(prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["tableNodes"])({
  tableGroup: 'block',
  cellContent: 'block+',
  cellAttributes: {
    background: {
      default: null,
      getFromDOM: function getFromDOM(dom) {
        return dom.style.backgroundColor || null;
      },
      setDOMAttr: function setDOMAttr(value, attrs) {
        if (value) {
          var style = {
            style: "".concat(attrs.style || '', "background-color: ").concat(value, ";")
          };
          Object.assign(attrs, style);
        }
      }
    }
  }
});

var Table = /*#__PURE__*/function (_Node) {
  _inherits(Table, _Node);

  var _super = _createSuper(Table);

  function Table() {
    _classCallCheck(this, Table);

    return _super.apply(this, arguments);
  }

  _createClass(Table, [{
    key: "commands",
    value: function commands(_ref) {
      var schema = _ref.schema;
      return {
        createTable: function createTable$1(_ref2) {
          var rowsCount = _ref2.rowsCount,
              colsCount = _ref2.colsCount,
              withHeaderRow = _ref2.withHeaderRow;
          return function (state, dispatch) {
            var offset = state.tr.selection.anchor + 1;

            var nodes = Object(prosemirror_utils__WEBPACK_IMPORTED_MODULE_4__["createTable"])(schema, rowsCount, colsCount, withHeaderRow);

            var tr = state.tr.replaceSelectionWith(nodes).scrollIntoView();
            var resolvedPos = tr.doc.resolve(offset);
            tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_5__["TextSelection"].near(resolvedPos));
            dispatch(tr);
          };
        },
        addColumnBefore: function addColumnBefore$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["addColumnBefore"];
        },
        addColumnAfter: function addColumnAfter$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["addColumnAfter"];
        },
        deleteColumn: function deleteColumn$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["deleteColumn"];
        },
        addRowBefore: function addRowBefore$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["addRowBefore"];
        },
        addRowAfter: function addRowAfter$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["addRowAfter"];
        },
        deleteRow: function deleteRow$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["deleteRow"];
        },
        deleteTable: function deleteTable$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["deleteTable"];
        },
        toggleCellMerge: function toggleCellMerge() {
          return function (state, dispatch) {
            if (Object(prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["mergeCells"])(state, dispatch)) {
              return;
            }

            Object(prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["splitCell"])(state, dispatch);
          };
        },
        mergeCells: function mergeCells$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["mergeCells"];
        },
        splitCell: function splitCell$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["splitCell"];
        },
        toggleHeaderColumn: function toggleHeaderColumn$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["toggleHeaderColumn"];
        },
        toggleHeaderRow: function toggleHeaderRow$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["toggleHeaderRow"];
        },
        toggleHeaderCell: function toggleHeaderCell$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["toggleHeaderCell"];
        },
        setCellAttr: function setCellAttr$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["setCellAttr"];
        },
        fixTables: function fixTables$1() {
          return prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["fixTables"];
        }
      };
    }
  }, {
    key: "keys",
    value: function keys() {
      return {
        Tab: Object(prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["goToNextCell"])(1),
        'Shift-Tab': Object(prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["goToNextCell"])(-1)
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'table';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        resizable: false
      };
    }
  }, {
    key: "schema",
    get: function get() {
      return TableNodes.table;
    }
  }, {
    key: "plugins",
    get: function get() {
      return [].concat(_toConsumableArray(this.options.resizable ? [Object(prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["columnResizing"])()] : []), [Object(prosemirror_tables__WEBPACK_IMPORTED_MODULE_6__["tableEditing"])()]);
    }
  }]);

  return Table;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var TableHeader = /*#__PURE__*/function (_Node) {
  _inherits(TableHeader, _Node);

  var _super = _createSuper(TableHeader);

  function TableHeader() {
    _classCallCheck(this, TableHeader);

    return _super.apply(this, arguments);
  }

  _createClass(TableHeader, [{
    key: "name",
    get: function get() {
      return 'table_header';
    }
  }, {
    key: "schema",
    get: function get() {
      return TableNodes.table_header;
    }
  }]);

  return TableHeader;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var TableCell = /*#__PURE__*/function (_Node) {
  _inherits(TableCell, _Node);

  var _super = _createSuper(TableCell);

  function TableCell() {
    _classCallCheck(this, TableCell);

    return _super.apply(this, arguments);
  }

  _createClass(TableCell, [{
    key: "name",
    get: function get() {
      return 'table_cell';
    }
  }, {
    key: "schema",
    get: function get() {
      return TableNodes.table_cell;
    }
  }]);

  return TableCell;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var TableRow = /*#__PURE__*/function (_Node) {
  _inherits(TableRow, _Node);

  var _super = _createSuper(TableRow);

  function TableRow() {
    _classCallCheck(this, TableRow);

    return _super.apply(this, arguments);
  }

  _createClass(TableRow, [{
    key: "name",
    get: function get() {
      return 'table_row';
    }
  }, {
    key: "schema",
    get: function get() {
      return TableNodes.table_row;
    }
  }]);

  return TableRow;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var TodoItem = /*#__PURE__*/function (_Node) {
  _inherits(TodoItem, _Node);

  var _super = _createSuper(TodoItem);

  function TodoItem() {
    _classCallCheck(this, TodoItem);

    return _super.apply(this, arguments);
  }

  _createClass(TodoItem, [{
    key: "keys",
    value: function keys(_ref) {
      var type = _ref.type;
      return {
        Enter: Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["splitToDefaultListItem"])(type),
        Tab: this.options.nested ? Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["sinkListItem"])(type) : function () {},
        'Shift-Tab': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["liftListItem"])(type)
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'todo_item';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        nested: false
      };
    }
  }, {
    key: "view",
    get: function get() {
      return {
        props: ['node', 'updateAttrs', 'view'],
        methods: {
          onChange: function onChange() {
            this.updateAttrs({
              done: !this.node.attrs.done
            });
          }
        },
        template: "\n        <li :data-type=\"node.type.name\" :data-done=\"node.attrs.done.toString()\" data-drag-handle>\n          <span class=\"todo-checkbox\" contenteditable=\"false\" @click=\"onChange\"></span>\n          <div class=\"todo-content\" ref=\"content\" :contenteditable=\"view.editable.toString()\"></div>\n        </li>\n      "
      };
    }
  }, {
    key: "schema",
    get: function get() {
      var _this = this;

      return {
        attrs: {
          done: {
            default: false
          }
        },
        draggable: true,
        content: this.options.nested ? '(paragraph|todo_list)+' : 'paragraph+',
        toDOM: function toDOM(node) {
          var done = node.attrs.done;
          return ['li', {
            'data-type': _this.name,
            'data-done': done.toString()
          }, ['span', {
            class: 'todo-checkbox',
            contenteditable: 'false'
          }], ['div', {
            class: 'todo-content'
          }, 0]];
        },
        parseDOM: [{
          priority: 51,
          tag: "[data-type=\"".concat(this.name, "\"]"),
          getAttrs: function getAttrs(dom) {
            return {
              done: dom.getAttribute('data-done') === 'true'
            };
          }
        }]
      };
    }
  }]);

  return TodoItem;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var TodoList = /*#__PURE__*/function (_Node) {
  _inherits(TodoList, _Node);

  var _super = _createSuper(TodoList);

  function TodoList() {
    _classCallCheck(this, TodoList);

    return _super.apply(this, arguments);
  }

  _createClass(TodoList, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type,
          schema = _ref.schema;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleList"])(type, schema.nodes.todo_item);
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref2) {
      var type = _ref2.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["wrappingInputRule"])(/^\s*(\[ \])\s$/, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'todo_list';
    }
  }, {
    key: "schema",
    get: function get() {
      var _this = this;

      return {
        group: 'block',
        content: 'todo_item+',
        toDOM: function toDOM() {
          return ['ul', {
            'data-type': _this.name
          }, 0];
        },
        parseDOM: [{
          priority: 51,
          tag: "[data-type=\"".concat(this.name, "\"]")
        }]
      };
    }
  }]);

  return TodoList;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Node"]);

var Bold = /*#__PURE__*/function (_Mark) {
  _inherits(Bold, _Mark);

  var _super = _createSuper(Bold);

  function Bold() {
    _classCallCheck(this, Bold);

    return _super.apply(this, arguments);
  }

  _createClass(Bold, [{
    key: "keys",
    value: function keys(_ref) {
      var type = _ref.type;
      return {
        'Mod-b': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type)
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref2) {
      var type = _ref2.type;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type);
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markInputRule"])(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)];
    }
  }, {
    key: "pasteRules",
    value: function pasteRules(_ref4) {
      var type = _ref4.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markPasteRule"])(/(?:\*\*|__)([^*_]+)(?:\*\*|__)/g, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'bold';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        parseDOM: [{
          tag: 'strong'
        }, {
          tag: 'b',
          getAttrs: function getAttrs(node) {
            return node.style.fontWeight !== 'normal' && null;
          }
        }, {
          style: 'font-weight',
          getAttrs: function getAttrs(value) {
            return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null;
          }
        }],
        toDOM: function toDOM() {
          return ['strong', 0];
        }
      };
    }
  }]);

  return Bold;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Mark"]);

var Code = /*#__PURE__*/function (_Mark) {
  _inherits(Code, _Mark);

  var _super = _createSuper(Code);

  function Code() {
    _classCallCheck(this, Code);

    return _super.apply(this, arguments);
  }

  _createClass(Code, [{
    key: "keys",
    value: function keys(_ref) {
      var type = _ref.type;
      return {
        'Mod-`': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type)
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref2) {
      var type = _ref2.type;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type);
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markInputRule"])(/(?:`)([^`]+)(?:`)$/, type)];
    }
  }, {
    key: "pasteRules",
    value: function pasteRules(_ref4) {
      var type = _ref4.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markPasteRule"])(/(?:`)([^`]+)(?:`)/g, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'code';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        excludes: '_',
        parseDOM: [{
          tag: 'code'
        }],
        toDOM: function toDOM() {
          return ['code', 0];
        }
      };
    }
  }]);

  return Code;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Mark"]);

var Italic = /*#__PURE__*/function (_Mark) {
  _inherits(Italic, _Mark);

  var _super = _createSuper(Italic);

  function Italic() {
    _classCallCheck(this, Italic);

    return _super.apply(this, arguments);
  }

  _createClass(Italic, [{
    key: "keys",
    value: function keys(_ref) {
      var type = _ref.type;
      return {
        'Mod-i': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type)
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref2) {
      var type = _ref2.type;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type);
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markInputRule"])(/(?:^|[^_])(_([^_]+)_)$/, type), Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markInputRule"])(/(?:^|[^*])(\*([^*]+)\*)$/, type)];
    }
  }, {
    key: "pasteRules",
    value: function pasteRules(_ref4) {
      var type = _ref4.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markPasteRule"])(/_([^_]+)_/g, type), Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markPasteRule"])(/\*([^*]+)\*/g, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'italic';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        parseDOM: [{
          tag: 'i'
        }, {
          tag: 'em'
        }, {
          style: 'font-style=italic'
        }],
        toDOM: function toDOM() {
          return ['em', 0];
        }
      };
    }
  }]);

  return Italic;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Mark"]);

var Link = /*#__PURE__*/function (_Mark) {
  _inherits(Link, _Mark);

  var _super = _createSuper(Link);

  function Link() {
    _classCallCheck(this, Link);

    return _super.apply(this, arguments);
  }

  _createClass(Link, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type;
      return function (attrs) {
        if (attrs.href) {
          return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["updateMark"])(type, attrs);
        }

        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["removeMark"])(type);
      };
    }
  }, {
    key: "pasteRules",
    value: function pasteRules(_ref2) {
      var type = _ref2.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["pasteRule"])(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g, type, function (url) {
        return {
          href: url
        };
      })];
    }
  }, {
    key: "name",
    get: function get() {
      return 'link';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        openOnClick: true
      };
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        attrs: {
          href: {
            default: null
          }
        },
        inclusive: false,
        parseDOM: [{
          tag: 'a[href]',
          getAttrs: function getAttrs(dom) {
            return {
              href: dom.getAttribute('href')
            };
          }
        }],
        toDOM: function toDOM(node) {
          return ['a', _objectSpread2({}, node.attrs, {
            rel: 'noopener noreferrer nofollow'
          }), 0];
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      if (!this.options.openOnClick) {
        return [];
      }

      return [new tiptap__WEBPACK_IMPORTED_MODULE_0__["Plugin"]({
        props: {
          handleClick: function handleClick(view, pos, event) {
            var schema = view.state.schema;
            var attrs = Object(tiptap_utils__WEBPACK_IMPORTED_MODULE_7__["getMarkAttrs"])(view.state, schema.marks.link);

            if (attrs.href && event.target instanceof HTMLAnchorElement) {
              event.stopPropagation();
              window.open(attrs.href);
            }
          }
        }
      })];
    }
  }]);

  return Link;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Mark"]);

var Strike = /*#__PURE__*/function (_Mark) {
  _inherits(Strike, _Mark);

  var _super = _createSuper(Strike);

  function Strike() {
    _classCallCheck(this, Strike);

    return _super.apply(this, arguments);
  }

  _createClass(Strike, [{
    key: "keys",
    value: function keys(_ref) {
      var type = _ref.type;
      return {
        'Mod-d': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type)
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref2) {
      var type = _ref2.type;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type);
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markInputRule"])(/~([^~]+)~$/, type)];
    }
  }, {
    key: "pasteRules",
    value: function pasteRules(_ref4) {
      var type = _ref4.type;
      return [Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["markPasteRule"])(/~([^~]+)~/g, type)];
    }
  }, {
    key: "name",
    get: function get() {
      return 'strike';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        parseDOM: [{
          tag: 's'
        }, {
          tag: 'del'
        }, {
          tag: 'strike'
        }, {
          style: 'text-decoration',
          getAttrs: function getAttrs(value) {
            return value === 'line-through';
          }
        }],
        toDOM: function toDOM() {
          return ['s', 0];
        }
      };
    }
  }]);

  return Strike;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Mark"]);

var Underline = /*#__PURE__*/function (_Mark) {
  _inherits(Underline, _Mark);

  var _super = _createSuper(Underline);

  function Underline() {
    _classCallCheck(this, Underline);

    return _super.apply(this, arguments);
  }

  _createClass(Underline, [{
    key: "keys",
    value: function keys(_ref) {
      var type = _ref.type;
      return {
        'Mod-u': Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type)
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref2) {
      var type = _ref2.type;
      return function () {
        return Object(tiptap_commands__WEBPACK_IMPORTED_MODULE_1__["toggleMark"])(type);
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'underline';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        parseDOM: [{
          tag: 'u'
        }, {
          style: 'text-decoration',
          getAttrs: function getAttrs(value) {
            return value === 'underline';
          }
        }],
        toDOM: function toDOM() {
          return ['u', 0];
        }
      };
    }
  }]);

  return Underline;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Mark"]);

var Collaboration = /*#__PURE__*/function (_Extension) {
  _inherits(Collaboration, _Extension);

  var _super = _createSuper(Collaboration);

  function Collaboration() {
    _classCallCheck(this, Collaboration);

    return _super.apply(this, arguments);
  }

  _createClass(Collaboration, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.getSendableSteps = this.debounce(function (state) {
        var sendable = Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_9__["sendableSteps"])(state);

        if (sendable) {
          _this.options.onSendable({
            editor: _this.editor,
            sendable: {
              version: sendable.version,
              steps: sendable.steps.map(function (step) {
                return step.toJSON();
              }),
              clientID: sendable.clientID
            }
          });
        }
      }, this.options.debounce);
      this.editor.on('transaction', function (_ref) {
        var state = _ref.state;

        _this.getSendableSteps(state);
      });
    }
  }, {
    key: "debounce",
    value: function debounce(fn, delay) {
      var timeout;
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
          fn.apply(void 0, args);
          timeout = null;
        }, delay);
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'collaboration';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      var _this2 = this;

      return {
        version: 0,
        clientID: Math.floor(Math.random() * 0xFFFFFFFF),
        debounce: 250,
        onSendable: function onSendable() {},
        update: function update(_ref2) {
          var steps = _ref2.steps,
              version = _ref2.version;
          var _this2$editor = _this2.editor,
              state = _this2$editor.state,
              view = _this2$editor.view,
              schema = _this2$editor.schema;

          if (Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_9__["getVersion"])(state) > version) {
            return;
          }

          view.dispatch(Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_9__["receiveTransaction"])(state, steps.map(function (item) {
            return prosemirror_transform__WEBPACK_IMPORTED_MODULE_8__["Step"].fromJSON(schema, item.step);
          }), steps.map(function (item) {
            return item.clientID;
          })));
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      return [Object(prosemirror_collab__WEBPACK_IMPORTED_MODULE_9__["collab"])({
        version: this.options.version,
        clientID: this.options.clientID
      })];
    }
  }]);

  return Collaboration;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Extension"]);

var Focus = /*#__PURE__*/function (_Extension) {
  _inherits(Focus, _Extension);

  var _super = _createSuper(Focus);

  function Focus() {
    _classCallCheck(this, Focus);

    return _super.apply(this, arguments);
  }

  _createClass(Focus, [{
    key: "name",
    get: function get() {
      return 'focus';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        className: 'has-focus',
        nested: false
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      return [new tiptap__WEBPACK_IMPORTED_MODULE_0__["Plugin"]({
        props: {
          decorations: function decorations(_ref) {
            var doc = _ref.doc,
                plugins = _ref.plugins,
                selection = _ref.selection;
            var editablePlugin = plugins.find(function (plugin) {
              return plugin.key.startsWith('editable$');
            });
            var editable = editablePlugin.props.editable();
            var active = editable && _this.options.className;
            var focused = _this.editor.focused;
            var anchor = selection.anchor;
            var decorations = [];

            if (!active || !focused) {
              return false;
            }

            doc.descendants(function (node, pos) {
              var hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;

              if (hasAnchor && !node.isText) {
                var decoration = prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["Decoration"].node(pos, pos + node.nodeSize, {
                  class: _this.options.className
                });
                decorations.push(decoration);
              }

              return _this.options.nested;
            });
            return prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["DecorationSet"].create(doc, decorations);
          }
        }
      })];
    }
  }]);

  return Focus;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Extension"]);

var History = /*#__PURE__*/function (_Extension) {
  _inherits(History, _Extension);

  var _super = _createSuper(History);

  function History() {
    _classCallCheck(this, History);

    return _super.apply(this, arguments);
  }

  _createClass(History, [{
    key: "keys",
    value: function keys() {
      var keymap = {
        'Mod-z': prosemirror_history__WEBPACK_IMPORTED_MODULE_10__["undo"],
        'Mod-y': prosemirror_history__WEBPACK_IMPORTED_MODULE_10__["redo"],
        'Shift-Mod-z': prosemirror_history__WEBPACK_IMPORTED_MODULE_10__["redo"]
      };
      return keymap;
    }
  }, {
    key: "commands",
    value: function commands() {
      return {
        undo: function undo$1() {
          return prosemirror_history__WEBPACK_IMPORTED_MODULE_10__["undo"];
        },
        redo: function redo$1() {
          return prosemirror_history__WEBPACK_IMPORTED_MODULE_10__["redo"];
        },
        undoDepth: function undoDepth$1() {
          return prosemirror_history__WEBPACK_IMPORTED_MODULE_10__["undoDepth"];
        },
        redoDepth: function redoDepth$1() {
          return prosemirror_history__WEBPACK_IMPORTED_MODULE_10__["redoDepth"];
        }
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'history';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        depth: '',
        newGroupDelay: ''
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      return [Object(prosemirror_history__WEBPACK_IMPORTED_MODULE_10__["history"])({
        depth: this.options.depth,
        newGroupDelay: this.options.newGroupDelay
      })];
    }
  }]);

  return History;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Extension"]);

var Placeholder = /*#__PURE__*/function (_Extension) {
  _inherits(Placeholder, _Extension);

  var _super = _createSuper(Placeholder);

  function Placeholder() {
    _classCallCheck(this, Placeholder);

    return _super.apply(this, arguments);
  }

  _createClass(Placeholder, [{
    key: "name",
    get: function get() {
      return 'placeholder';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
        emptyNodeText: 'Write something …',
        showOnlyWhenEditable: true,
        showOnlyCurrent: true
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      return [new tiptap__WEBPACK_IMPORTED_MODULE_0__["Plugin"]({
        props: {
          decorations: function decorations(_ref) {
            var doc = _ref.doc,
                plugins = _ref.plugins,
                selection = _ref.selection;
            var editablePlugin = plugins.find(function (plugin) {
              return plugin.key.startsWith('editable$');
            });
            var editable = editablePlugin.props.editable();
            var active = editable || !_this.options.showOnlyWhenEditable;
            var anchor = selection.anchor;
            var decorations = [];
            var isEditorEmpty = doc.textContent.length === 0;

            if (!active) {
              return false;
            }

            doc.descendants(function (node, pos) {
              var hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
              var isNodeEmpty = node.content.size === 0;

              if ((hasAnchor || !_this.options.showOnlyCurrent) && isNodeEmpty) {
                var classes = [_this.options.emptyNodeClass];

                if (isEditorEmpty) {
                  classes.push(_this.options.emptyEditorClass);
                }

                var decoration = prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["Decoration"].node(pos, pos + node.nodeSize, {
                  class: classes.join(' '),
                  'data-empty-text': typeof _this.options.emptyNodeText === 'function' ? _this.options.emptyNodeText(node) : _this.options.emptyNodeText
                });
                decorations.push(decoration);
              }

              return false;
            });
            return prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["DecorationSet"].create(doc, decorations);
          }
        }
      })];
    }
  }]);

  return Placeholder;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Extension"]);

var Search = /*#__PURE__*/function (_Extension) {
  _inherits(Search, _Extension);

  var _super = _createSuper(Search);

  function Search() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Search);

    _this = _super.call(this, options);
    _this.results = [];
    _this.searchTerm = null;
    _this._updating = false;
    return _this;
  }

  _createClass(Search, [{
    key: "commands",
    value: function commands() {
      var _this2 = this;

      return {
        find: function find(attrs) {
          return _this2.find(attrs);
        },
        replace: function replace(attrs) {
          return _this2.replace(attrs);
        },
        replaceAll: function replaceAll(attrs) {
          return _this2.replaceAll(attrs);
        },
        clearSearch: function clearSearch() {
          return _this2.clear();
        }
      };
    }
  }, {
    key: "_search",
    value: function _search(doc) {
      var _this3 = this;

      this.results = [];
      var mergedTextNodes = [];
      var index = 0;

      if (!this.searchTerm) {
        return;
      }

      doc.descendants(function (node, pos) {
        if (node.isText) {
          if (mergedTextNodes[index]) {
            mergedTextNodes[index] = {
              text: mergedTextNodes[index].text + node.text,
              pos: mergedTextNodes[index].pos
            };
          } else {
            mergedTextNodes[index] = {
              text: node.text,
              pos: pos
            };
          }
        } else {
          index += 1;
        }
      });
      mergedTextNodes.forEach(function (_ref) {
        var text = _ref.text,
            pos = _ref.pos;
        var search = _this3.findRegExp;
        var m; // eslint-disable-next-line no-cond-assign

        while (m = search.exec(text)) {
          if (m[0] === '') {
            break;
          }

          _this3.results.push({
            from: pos + m.index,
            to: pos + m.index + m[0].length
          });
        }
      });
    }
  }, {
    key: "replace",
    value: function replace(_replace) {
      var _this4 = this;

      return function (state, dispatch) {
        var firstResult = _this4.results[0];

        if (!firstResult) {
          return;
        }

        var _this4$results$ = _this4.results[0],
            from = _this4$results$.from,
            to = _this4$results$.to;
        dispatch(state.tr.insertText(_replace, from, to));

        _this4.editor.commands.find(_this4.searchTerm);
      };
    }
  }, {
    key: "rebaseNextResult",
    value: function rebaseNextResult(replace, index) {
      var lastOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var nextIndex = index + 1;

      if (!this.results[nextIndex]) {
        return null;
      }

      var _this$results$index = this.results[index],
          currentFrom = _this$results$index.from,
          currentTo = _this$results$index.to;
      var offset = currentTo - currentFrom - replace.length + lastOffset;
      var _this$results$nextInd = this.results[nextIndex],
          from = _this$results$nextInd.from,
          to = _this$results$nextInd.to;
      this.results[nextIndex] = {
        to: to - offset,
        from: from - offset
      };
      return offset;
    }
  }, {
    key: "replaceAll",
    value: function replaceAll(replace) {
      var _this5 = this;

      return function (_ref2, dispatch) {
        var tr = _ref2.tr;
        var offset;

        if (!_this5.results.length) {
          return;
        }

        _this5.results.forEach(function (_ref3, index) {
          var from = _ref3.from,
              to = _ref3.to;
          tr.insertText(replace, from, to);
          offset = _this5.rebaseNextResult(replace, index, offset);
        });

        dispatch(tr);

        _this5.editor.commands.find(_this5.searchTerm);
      };
    }
  }, {
    key: "find",
    value: function find(searchTerm) {
      var _this6 = this;

      return function (state, dispatch) {
        _this6.searchTerm = _this6.options.disableRegex ? searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') : searchTerm;

        _this6.updateView(state, dispatch);
      };
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this7 = this;

      return function (state, dispatch) {
        _this7.searchTerm = null;

        _this7.updateView(state, dispatch);
      };
    }
  }, {
    key: "updateView",
    value: function updateView(_ref4, dispatch) {
      var tr = _ref4.tr;
      this._updating = true;
      dispatch(tr);
      this._updating = false;
    }
  }, {
    key: "createDeco",
    value: function createDeco(doc) {
      this._search(doc);

      return this.decorations ? prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["DecorationSet"].create(doc, this.decorations) : [];
    }
  }, {
    key: "name",
    get: function get() {
      return 'search';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        autoSelectNext: true,
        findClass: 'find',
        searching: false,
        caseSensitive: false,
        disableRegex: true,
        alwaysSearch: false
      };
    }
  }, {
    key: "findRegExp",
    get: function get() {
      return RegExp(this.searchTerm, !this.options.caseSensitive ? 'gui' : 'gu');
    }
  }, {
    key: "decorations",
    get: function get() {
      var _this8 = this;

      return this.results.map(function (deco) {
        return prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["Decoration"].inline(deco.from, deco.to, {
          class: _this8.options.findClass
        });
      });
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this9 = this;

      return [new tiptap__WEBPACK_IMPORTED_MODULE_0__["Plugin"]({
        state: {
          init: function init() {
            return prosemirror_view__WEBPACK_IMPORTED_MODULE_3__["DecorationSet"].empty;
          },
          apply: function apply(tr, old) {
            if (_this9._updating || _this9.options.searching || tr.docChanged && _this9.options.alwaysSearch) {
              return _this9.createDeco(tr.doc);
            }

            if (tr.docChanged) {
              return old.map(tr.mapping, tr.doc);
            }

            return old;
          }
        },
        props: {
          decorations: function decorations(state) {
            return this.getState(state);
          }
        }
      })];
    }
  }]);

  return Search;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Extension"]);

var TrailingNode = /*#__PURE__*/function (_Extension) {
  _inherits(TrailingNode, _Extension);

  var _super = _createSuper(TrailingNode);

  function TrailingNode() {
    _classCallCheck(this, TrailingNode);

    return _super.apply(this, arguments);
  }

  _createClass(TrailingNode, [{
    key: "name",
    get: function get() {
      return 'trailing_node';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        node: 'paragraph',
        notAfter: ['paragraph']
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      var plugin = new tiptap__WEBPACK_IMPORTED_MODULE_0__["PluginKey"](this.name);
      var disabledNodes = Object.entries(this.editor.schema.nodes).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[1];

        return value;
      }).filter(function (node) {
        return _this.options.notAfter.includes(node.name);
      });
      return [new tiptap__WEBPACK_IMPORTED_MODULE_0__["Plugin"]({
        key: plugin,
        view: function view() {
          return {
            update: function update(view) {
              var state = view.state;
              var insertNodeAtEnd = plugin.getState(state);

              if (!insertNodeAtEnd) {
                return;
              }

              var doc = state.doc,
                  schema = state.schema,
                  tr = state.tr;
              var type = schema.nodes[_this.options.node];
              var transaction = tr.insert(doc.content.size, type.create());
              view.dispatch(transaction);
            }
          };
        },
        state: {
          init: function init(_, state) {
            var lastNode = state.tr.doc.lastChild;
            return !Object(tiptap_utils__WEBPACK_IMPORTED_MODULE_7__["nodeEqualsType"])({
              node: lastNode,
              types: disabledNodes
            });
          },
          apply: function apply(tr, value) {
            if (!tr.docChanged) {
              return value;
            }

            var lastNode = tr.doc.lastChild;
            return !Object(tiptap_utils__WEBPACK_IMPORTED_MODULE_7__["nodeEqualsType"])({
              node: lastNode,
              types: disabledNodes
            });
          }
        }
      })];
    }
  }]);

  return TrailingNode;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Extension"]);




/***/ })

}]);