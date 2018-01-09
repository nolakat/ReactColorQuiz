var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quiz = function (_React$Component) {
  _inherits(Quiz, _React$Component);

  function Quiz(props) {
    _classCallCheck(this, Quiz);

    var _this = _possibleConstructorReturn(this, (Quiz.__proto__ || Object.getPrototypeOf(Quiz)).call(this, props));

    _this.state = {
      background: null,
      correct: 0,
      total: 0
    };

    _this.generateColors = _this.generateColors.bind(_this);
    _this.gameLogic = _this.gameLogic.bind(_this);
    _this.preventDupes = _this.preventDupes.bind(_this);
    _this.setKeys = _this.setKeys.bind(_this);
    return _this;
  }

  _createClass(Quiz, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.generateColors();
    }
  }, {
    key: 'generateColors',
    value: function generateColors() {
      //temp array to store colors
      var tempArr = [];
      //pick from list of colors
      var colorList = [['red', 'red'], ['blue', 'blue'], ['green', 'green']];

      //loop through colors and pick 3. 
      for (var i = 0; i < 3; i++) {
        var n = Math.floor(Math.random() * colorList.length);
        var b = colorList.splice(n, 1);
        tempArr.push([b[0]]);
      }

      //create AnswerKey from first Color in Array
      var newKey = tempArr[0][0][0];
      this.setKeys(tempArr, newKey);
    }
  }, {
    key: 'setKeys',
    value: function setKeys(tempArr, newKey) {
      var oldKey = this.state.background;

      var isMatch = this.preventDupes(newKey, oldKey);
      if (isMatch == false) {
        tempArr = [];
        this.generateColors();
        return;
      }

      this.setState(function (prevState) {
        return { background: newKey };
      });

      var mixedkeys = this.shuffle(tempArr);
      listofKeys = mixedkeys;
      keyColor = newKey;
    }
  }, {
    key: 'shuffle',
    value: function shuffle(arr) {
      var i, j, temp;
      for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }
  }, {
    key: 'preventDupes',
    value: function preventDupes(newKey, oldKey) {
      if (newKey == oldKey) {
        return false;
      } else {
        return newKey;
      }
    }
  }, {
    key: 'gameLogic',
    value: function gameLogic(element, newKey) {
      if (element[0][0] == newKey) {
        this.setState({ correct: this.state.correct + 1 });
      }
      this.setState({ total: this.state.total + 1 });
      this.generateColors();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { id: 'content' },
          React.createElement(
            'div',
            { className: 'score' },
            React.createElement(
              'h2',
              null,
              React.createElement(
                'sup',
                null,
                this.state.correct
              ),
              React.createElement(
                'span',
                null,
                '/'
              ),
              React.createElement(
                'sub',
                null,
                this.state.total
              )
            )
          ),
          React.createElement(
            'h1',
            null,
            'What Color Am I?'
          ),
          React.createElement(ButtonList, { colors: listofKeys, keyColor: keyColor, action: this.gameLogic }),
          React.createElement(
            'div',
            { className: 'footer' },
            ' ',
            React.createElement(
              'h5',
              null,
              '\uD83C\uDF08She Comes in Colors Everywhere',
              React.createElement(
                'span',
                { className: 'flip' },
                '\uD83C\uDF08'
              )
            ),
            '            '
          ),
          React.createElement(SvgBG, { keyColor: keyColor })
        )
      );
    }
  }]);

  return Quiz;
}(React.Component);

//do I use class or const??


var SvgBG = function (_React$Component2) {
  _inherits(SvgBG, _React$Component2);

  function SvgBG() {
    _classCallCheck(this, SvgBG);

    return _possibleConstructorReturn(this, (SvgBG.__proto__ || Object.getPrototypeOf(SvgBG)).apply(this, arguments));
  }

  _createClass(SvgBG, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //on first question always use first transition
      this.slideRight();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      //set initial values??

    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.setAnimation();
    }
  }, {
    key: 'setAnimation',
    value: function setAnimation() {
      var randNum = Math.floor(Math.random() * 2);
      switch (randNum) {
        case 0:
          this.slideUp();
          break;
        case 1:
          this.slideRight();
          break;
        default:
          this.slideUp();
      }
    }
  }, {
    key: 'slideUp',
    value: function slideUp() {
      console.log('slideUp fired');
      TweenMax.to("#hero", 2, { fill: keyColor, ease: Expo.easeInOut });

      TweenMax.from('#testL', 1, {
        width: window.innerWidth,
        height: 0,
        x: 0,
        y: 400
      });
      TweenMax.to('#testL', 1, {
        width: window.innerWidth,
        fill: keyColor,
        height: window.innerHeight
      });

      return;
    }
  }, {
    key: 'slideRight',
    value: function slideRight() {
      console.log('slideRight fired.');

      TweenMax.to("#hero", 2, { fill: keyColor, ease: Expo.easeInOut });

      TweenMax.from('#testL', 1, {
        width: 0,
        height: window.innerHeight
      });
      TweenMax.to('#testL', 1, {
        width: window.innerWidth,
        fill: keyColor,
        height: window.innerHeight
      });

      return;
    }
  }, {
    key: 'render',
    value: function render() {
      keyColor = this.props.keyColor;
      console.log('drawBackground: ', keyColor);

      return React.createElement(
        'div',
        null,
        React.createElement(DrawTrans, null)
      );
    }
  }]);

  return SvgBG;
}(React.Component);

var DrawTrans = function (_React$Component3) {
  _inherits(DrawTrans, _React$Component3);

  function DrawTrans() {
    _classCallCheck(this, DrawTrans);

    return _possibleConstructorReturn(this, (DrawTrans.__proto__ || Object.getPrototypeOf(DrawTrans)).apply(this, arguments));
  }

  _createClass(DrawTrans, [{
    key: 'render',
    value: function render() {
      console.log('DrawTrans firing');

      return React.createElement(
        'div',
        null,
        React.createElement(
          'svg',
          { className: 'hero', id: 'hero', width: window.innerWidth, height: window.innerHeight, fill: 'transparent' },
          React.createElement('rect', { id: 'newBG', x: '0', y: '0', width: '100%', height: '100%', stroke: 'rgba(100, 100, 0, 1)', 'stroke-width': '1' }),
          React.createElement('rect', { id: 'testL', className: 'test', x: '0', y: '0', width: '0', height: '0' }),
          React.createElement('circle', { id: 'circ', cx: '0', cy: '0', r: '0', fill: 'purple' })
        )
      );
    }
  }]);

  return DrawTrans;
}(React.Component);

var ButtonList = function (_React$Component4) {
  _inherits(ButtonList, _React$Component4);

  function ButtonList() {
    _classCallCheck(this, ButtonList);

    return _possibleConstructorReturn(this, (ButtonList.__proto__ || Object.getPrototypeOf(ButtonList)).apply(this, arguments));
  }

  _createClass(ButtonList, [{
    key: 'render',
    value: function render() {
      var _this5 = this;

      var arr = this.props.colors;
      var keyColor = this.props.keyColor;
      console.log('button props:', this.props);

      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          null,
          arr.map(function (element) {
            return React.createElement(
              'li',
              null,
              React.createElement(
                'button',
                { onClick: function onClick() {
                    return _this5.props.action(element, keyColor);
                  } },
                element[0][1]
              )
            );
          })
        )
      );
    }
  }]);

  return ButtonList;
}(React.Component);

ReactDOM.render(React.createElement(Quiz, null), document.getElementById('root'));