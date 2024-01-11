// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/main.js":[function(require,module,exports) {
'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var COLUMN_LENGTH = 4;
var winValue = 2048;
var gameField = document.querySelector('.game-field').tBodies[0];

var rows = _toConsumableArray(gameField.children);

var cells = _toConsumableArray(gameField.querySelectorAll('.field-cell'));

var scoreBlock = document.querySelector('.game-score');
var bestBlock = document.querySelector('.game-best');
var tiles = [];
var wasAnyCellReplaced = false;
var score = 0;
var best = window.localStorage.getItem('best') || 0;
var xTouchStartPoint = null;
var yToucStartPoint = null;
var lastY = 1;

function isPossibleToMove() {
  if (getEmptyCells().length > 0) {
    return true;
  }

  for (var i = 0; i < rows.length; i++) {
    for (var k = 0; k < rows.length; k++) {
      var currentCellValue = rows[i].children[k].dataset.num;

      if (k !== rows.length - 1) {
        var rightCellValue = rows[i].children[k + 1].dataset.num;

        if (currentCellValue === rightCellValue) {
          return true;
        }
      }

      if (i !== rows.length - 1) {
        var bottomCellValue = rows[i + 1].children[k].dataset.num;

        if (currentCellValue === bottomCellValue) {
          return true;
        }
      }
    }
  }

  return false;
}

function getCellsByRows() {
  return rows.map(function (row) {
    return _toConsumableArray(row.children);
  });
}

function getCellsByRowsReversed() {
  return getCellsByRows().map(function (row) {
    return row.reverse();
  });
}

function getCellsByColumns() {
  var columns = [];

  for (var i = 0; i < COLUMN_LENGTH; i++) {
    var column = [];

    for (var k = 0; k < rows.length; k++) {
      column.push(rows[k].children[i]);
    }

    columns.push(column);
  }

  return columns;
}

function getCellsByReversedColumns() {
  var columns = [];

  for (var i = 0; i < COLUMN_LENGTH; i++) {
    var column = [];

    for (var k = 0; k < rows.length; k++) {
      column.push(rows[rows.length - k - 1].children[i]);
    }

    columns.push(column);
  }

  return columns;
}

function createTile(cell) {
  var tile = document.createElement('div');
  tile.classList.add('tile');
  tile.style.top = cell.offsetTop + 'px';
  tile.style.left = cell.offsetLeft + 'px';
  gameField.append(tile);
  return tile;
}

function initTilesAndCells() {
  for (var i = 0; i < cells.length; i++) {
    tiles.push(createTile(cells[i]));
  }

  for (var _i2 = 0; _i2 < cells.length; _i2++) {
    cells[_i2].dataset.id = _i2;
    cells[_i2].dataset.num = 0;
  }
}

function getEmptyCells() {
  return cells.filter(function (cell) {
    return cell.dataset.num === '0';
  });
}

function getRandomEmptyCell() {
  var emptyCells = getEmptyCells();
  var emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return emptyCell;
}

function makeNewCell() {
  var emptyCell = getRandomEmptyCell();
  var id = emptyCell.dataset.id;
  emptyCell.dataset.num = Math.random() >= 0.9 ? 4 : 2;
  tiles[id].textContent = emptyCell.dataset.num;
  tiles[id].classList.add("tile--".concat(emptyCell.dataset.num));
  tiles[id].classList.add('anim-show');
  setTimeout(function () {
    return tiles[id].classList.remove('anim-show');
  }, 500);
}

function replaceEmptyCells(arrOfCells) {
  var isSorted = false;

  do {
    isSorted = true;

    for (var k = 0; k < arrOfCells.length; k++) {
      if (k === arrOfCells.length - 1) {
        break;
      }

      if (arrOfCells[k].dataset.num !== '0' && arrOfCells[k + 1].dataset.num === '0') {
        arrOfCells[k + 1].dataset.num = arrOfCells[k].dataset.num;
        arrOfCells[k].dataset.num = 0;
        var _ref = [arrOfCells[k].dataset.id, arrOfCells[k + 1].dataset.id];
        arrOfCells[k + 1].dataset.id = _ref[0];
        arrOfCells[k].dataset.id = _ref[1];
        wasAnyCellReplaced = true;
        isSorted = false;
      }
    }
  } while (!isSorted);
}

function slide(groupedCells) {
  for (var i = 0; i < groupedCells.length; i++) {
    var cellsGroup = groupedCells[i];
    replaceEmptyCells(cellsGroup);

    var _loop = function _loop() {
      if (k === cellsGroup.length - 1) {
        return 1; // break
      }

      if (cellsGroup[k].dataset.num === cellsGroup[k + 1].dataset.num && cellsGroup[k].dataset.num !== '0') {
        var cellToRemove = cellsGroup[k];
        var cellToDouble = cellsGroup[k + 1];
        var tileToRemove = tiles[cellToRemove.dataset.id];
        var tileToDouble = tiles[cellToDouble.dataset.id];
        var newNumber = cellToDouble.dataset.num * 2;
        tileToRemove.classList.remove("tile--".concat(cellToRemove.dataset.num));
        tileToRemove.textContent = '';
        cellToRemove.dataset.num = 0;
        tileToDouble.classList.remove("tile--".concat(cellToDouble.dataset.num));
        cellToDouble.dataset.num = newNumber;
        tileToDouble.textContent = newNumber;
        tileToDouble.classList.add("tile--".concat(newNumber));
        tileToDouble.classList.add("anim-merge");
        setTimeout(function () {
          return tileToDouble.classList.remove("anim-merge");
        }, 500);
        wasAnyCellReplaced = true;
        score += newNumber;

        if (newNumber === winValue) {
          document.querySelector('.message-win').classList.remove('hidden');
        }

        replaceEmptyCells(cellsGroup);
      }
    };

    for (var k = 2; k >= 0; k--) {
      if (_loop()) break;
    }
  }

  cells.forEach(function (cell) {
    tiles[cell.dataset.id].style.top = cell.offsetTop + 'px';
    tiles[cell.dataset.id].style.left = cell.offsetLeft + 'px';
  });
}

function slideUp() {
  var cellsArr = getCellsByReversedColumns();
  slide(cellsArr);

  if (wasAnyCellReplaced) {
    makeNewCell();
    wasAnyCellReplaced = false;
  }
}

function slideDown() {
  var cellsArr = getCellsByColumns();
  slide(cellsArr);

  if (wasAnyCellReplaced) {
    makeNewCell();
    wasAnyCellReplaced = false;
  }
}

function slideRight() {
  var cellsArr = getCellsByRows();
  slide(cellsArr);

  if (wasAnyCellReplaced) {
    makeNewCell();
    wasAnyCellReplaced = false;
  }
}

function slideLeft() {
  var cellsArr = getCellsByRowsReversed();
  slide(cellsArr);

  if (wasAnyCellReplaced) {
    makeNewCell();
    wasAnyCellReplaced = false;
  }
}

function endMove() {
  if (score > best) {
    window.localStorage.setItem('best', score);
    best = score;
  }

  scoreBlock.textContent = score;
  bestBlock.textContent = best;

  if (!isPossibleToMove()) {
    document.querySelector('.message-lose').classList.remove('hidden');
  }
}

function handleButtonClick(e) {
  e.target.textContent = 'Restart';
  e.target.classList.remove('start');
  e.target.classList.add('restart');
  document.querySelector('.message-start').classList.add('hidden');
  document.querySelector('.message-lose').classList.add('hidden');
  document.querySelector('.message-win').classList.add('hidden');
  cells.forEach(function (cell) {
    tiles[cell.dataset.id].textContent = '';
    tiles[cell.dataset.id].classList.remove("tile--".concat(cell.dataset.num));
    cell.dataset.num = 0;
  });
  score = 0;
  document.querySelector('.game-score').textContent = 0;
  makeNewCell();
  makeNewCell();
}

function handleInput(e) {
  switch (e.key) {
    case 'ArrowUp':
      slideUp();
      break;

    case 'ArrowDown':
      slideDown();
      break;

    case 'ArrowRight':
      slideRight();
      break;

    case 'ArrowLeft':
      slideLeft();
      break;
  }

  endMove();
}

function handleTouchStart(e) {
  var firstTouch = e.touches[0];
  xTouchStartPoint = firstTouch.clientX;
  yToucStartPoint = firstTouch.clientY;
}

function handleTouchMove(e) {
  if (!xTouchStartPoint || !yToucStartPoint) {
    return;
  }

  var xTouchEndPoint = e.touches[0].clientX;
  var yTouchEndPoint = e.touches[0].clientY;
  var xDiff = xTouchEndPoint - xTouchStartPoint;
  var yDiff = yTouchEndPoint - yToucStartPoint;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      slideRight();
    } else {
      slideLeft();
    }
  } else {
    if (yDiff > 0) {
      slideDown();
    } else {
      slideUp();
    }
  }

  xTouchStartPoint = null;
  yToucStartPoint = null;
  endMove();
}

function disableScrollReload(e) {
  var lastS = document.documentElement.scrollTop;

  if (lastS === 0 && lastY - e.touches[0].clientY < 0 && e.cancelable) {
    e.preDefault();
    e.stopPropagation();
  }

  lastY = e.touches[0].clientY;
}

bestBlock.textContent = best;
initTilesAndCells();
document.querySelector('.button').addEventListener('click', handleButtonClick);
document.addEventListener('keyup', handleInput);
gameField.addEventListener('touchstart', handleTouchStart, false);
gameField.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchmove', disableScrollReload, {
  passive: false
});
},{}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57409" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","scripts/main.js"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map