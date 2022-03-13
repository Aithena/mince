/**
 * 检测当前宿主环境
 */
function environment() {
  var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i
  var agent = navigator.userAgent
  if (null == agent) {
    return 'mobile'
  }
  var result = regex_match.exec(agent)
  if (null == result) {
    return 'pc'
  } else {
    return 'mobile'
  }
}


/**
 * 调试模式
 */
;(function () {
  mouseMenu(false)
  deveTools(false)
})(window, jQuery)


/**
 * 开发工具
 * @param {*} isEnable
 * @returns 
 */
 function deveTools (isEnable) {
  const times = 60 * 60 * 1000
  const version = '0.0.1'
  console.log(
    `%c version %c ${version} %c`,
    'background: #35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background: #41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background: transparent'
  )
  if (!isEnable) return false
  // 禁止鼠标右击
  document.oncontextmenu = function() {
    event.returnValue = false;
  };
  // 禁用开发者工具F12
  document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
    let e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 123) {
      e.returnValue = false;
      return false;
    }
  };
  let userAgent = navigator.userAgent;
  if (userAgent.indexOf('Firefox') > -1) {
    let checkStatus;
    let devtools = /./;
    devtools.toString = function() {
      checkStatus = 'on';
    };
    setInterval(function() {
      checkStatus = 'off';
      console.log(devtools);
      console.log(checkStatus);
      console.clear();
      if (checkStatus === 'on') {
        let target = '';
        try {
          window.open('about:blank', (target = '_self'));
        } catch (err) {
          let a = document.createElement('button');
          a.onclick = function() {
            window.open('about:blank', (target = '_self'));
          };
          a.click();
        }
      }
    }, times);
  } else {
    // 禁用控制台
    let ConsoleManager = {
      onOpen: function() {
        alert('Console is opened');
      },
      onClose: function() {
        alert('Console is closed');
      },
      init: function() {
        let self = this;
        let x = document.createElement('div');
        let isOpening = false,
          isOpened = false;
        Object.defineProperty(x, 'id', {
          get: function() {
            if (!isOpening) {
              self.onOpen();
              isOpening = true;
            }
            isOpened = true;
            return true;
          }
        });
        setInterval(function() {
          isOpened = false;
          console.info(x);
          console.clear();
          if (!isOpened && isOpening) {
            self.onClose();
            isOpening = false;
          }
        }, times);
      }
    };
    ConsoleManager.onOpen = function() {
      //打开控制台，跳转
      let target = '';
      try {
        window.open('about:blank', (target = '_self'));
      } catch (err) {
        let a = document.createElement('button');
        a.onclick = function() {
          window.open('about:blank', (target = '_self'));
        };
        a.click();
      }
    };
    ConsoleManager.onClose = function() {
      alert('Console is closed!!!!!');
    };
    ConsoleManager.init();
  }
}


/**
 * 鼠标右键菜单
 */
function mouseMenu (isEnable) {
  if (!isEnable) return false
  const config = [
    {
      mode: 'link',
      path: 'https://www.720yun.com/',
      label: '720yun.com'
    },
    {
      mode: 'action',
      action: 'changeCamera',
      label: '视角切换'
    },
    {
      mode: 'line'
    },
    {
      mode: 'action',
      action: 'changeView',
      label: '切换拖拽方式为反向'
    },
    {
      mode: 'line'
    },
    {
      label: 'HTML5/Desktop - Chrome 95.0 - WebGL'
    }
  ]
  document.oncontextmenu = function (event){
    event = event || window.event
    event.preventDefault ? event.preventDefault() : event.returnValue=false;
    let { clientX, clientY } = event
    if (window.$menu) {
      setPosition(clientX, clientY)
      showMenu (true)
    } else {
      window.$menu = document.createElement('div')
      $menu.setAttribute('id', 'wemenu')
      $menu.setAttribute('style', 'position: absolute; z-index: 99999; left: 0px; top: 0px;')
      $dl = document.createElement('dl')
      $dl.setAttribute('style', 'background: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, .1); padding: 3px 0px;')
      if (config && config.length) {
        config.map((item) => {
          if (item.mode === 'line') {
            let $dd = document.createElement('dd')
            $dd.setAttribute('style', 'margin: 3px 0px; height: 1px; background: #dddddd;')
            $dl.appendChild($dd)
          } else if (item.mode === 'link') {
            let $dd = document.createElement('dd')
            let $a = document.createElement('a')
            $a.setAttribute('style', 'display: block; font-size: 12px; padding: 3px 15px; line-height: 24px;')
            $a.setAttribute('href', item.path)
            $a.innerHTML = item.label
            $dd.appendChild($a)
            $dd.addEventListener('click', function (ev) {
              ev.stopPropagation()
            })
            $dl.appendChild($dd)
          } else if (item.mode === 'action') {
            let $dd = document.createElement('dd')
            let $a = document.createElement('a')
            $a.setAttribute('style', 'display: block; font-size: 12px; padding: 3px 15px; line-height: 24px;')
            $a.setAttribute('href', 'javascript:;')
            $a.innerHTML = item.label
            $dd.appendChild($a)
            $dd.addEventListener('click', function (ev) {
              ev.stopPropagation()
              switch (item.action) {
                case 'changeView':
                  console.log('changeView')
                  break
                case 'changeCamera':
                  console.log('changeCamera')
                  break
              }
              showMenu (false)
            })
            $dl.appendChild($dd)
          } else {
            let $dd = document.createElement('dd')
            let $span = document.createElement('span')
            $span.setAttribute('style', 'display: block; font-size: 12px; padding: 3px 15px; line-height: 24px;')
            $span.innerHTML = item.label
            $dd.appendChild($span)
            $dd.addEventListener('click', function (ev) {
              ev.stopPropagation()
            })
            $dl.appendChild($dd)
          }
        })
      }
      $menu.appendChild($dl)
      document.body.appendChild($menu)
      setPosition(clientX, clientY)
    }
  }
  document.onclick = function (event) {
    // event = event || window.event
    // event.preventDefault ? event.preventDefault() : event.returnValue = false
    showMenu (false)
  }
  function setPosition (clientX, clientY) {
    let maxWidth = $(window).width()
    let maxHeight = $(window).height()
    let mixHeight = $(document).scrollTop()
    let width = $menu.offsetWidth
    let height = $menu.offsetHeight
    if (clientX + width > maxWidth) clientX = clientX - width
    if (clientY + height > maxHeight) clientY = clientY - height
    $menu.style.left = clientX + 'px'
    $menu.style.top = clientY + mixHeight + 'px'
  }
  function showMenu (boolean) {
    if (window.$menu) window.$menu.style.display = boolean ? 'block' : 'none'
  }
  function destroy () {
    if (window.$menu) window.$menu.remove()
  }
}

/**
 * 首页风格
 */
 ;(function () {
  if (!$('#homePage').length) return false
  var homePage = new Swiper('#homePage .swiper-container', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
      el: '#homePage .swiper-pagination',
      clickable: true
    }
  })
})(window, jQuery)
