// 适配前使用flexible_css.js对页面css样式reset
(function () {
  // flexible.css
  var cssText = "@charset \"utf-8\";html{color:#000;overflow-y:scroll;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}html,body{font-family:PingFangSC-Regular;width:100%;height:100%;}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-variant:normal}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:before,q:after{content:''}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}ins,a{text-decoration:none}"
  // cssText end
  var styleEl = document.createElement('style')
  document.getElementsByTagName('head')[0].appendChild(styleEl)
  if (styleEl.styleSheet) {
    if (!styleEl.styleSheet.disabled) {
      styleEl.styleSheet.cssText = cssText
    }
  } else {
    try {
      styleEl.innerHTML = cssText
    } catch (e) {
      styleEl.innerText = cssText
    }
  }
}())

// 使用淘宝flexible.js处理页面适配
;(function (win, lib) {
  var doc = win.document
  var docEl = doc.documentElement
  var metaEl = doc.querySelector('meta[name="viewport"]')
  var flexibleEl = doc.querySelector('meta[name="flexible"]')
  var dpr = 0
  var scale = 0
  var tid
  var flexible = lib.flexible || (lib.flexible = {})
  // 页面设置了视口规则便按设置的处理
  if (metaEl) {
    console.warn('将根据已有的meta标签来设置缩放比例')
    var match = metaEl.getAttribute('content').match(/initial-scale=([\d.]+)/)
    if (match) {
      scale = parseFloat(match[1])
      dpr = parseInt(1 / scale)
    }
  } else if (flexibleEl) {
    var content = flexibleEl.getAttribute('content')
    if (content) {
      var initialDpr = content.match(/initial-dpr=([\d.]+)/)
      var maximumDpr = content.match(/maximum-dpr=([\d.]+)/)
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1])
        scale = parseFloat((1 / dpr).toFixed(2))
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1])
        scale = parseFloat((1 / dpr).toFixed(2))
      }
    }
  }

  //  dpr和scale设置时手动计算
  if (!dpr && !scale) {
    // isAndroid虽有定义，但未起作用
    // var isAndroid = win.navigator.appVersion.match(/android/gi)
    var isIPhone = win.navigator.appVersion.match(/iphone/gi)
    var devicePixelRatio = win.devicePixelRatio
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍或3倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2
      } else {
        dpr = 1
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1
    }
    scale = 1 / dpr
  }

  docEl.setAttribute('data-dpr', dpr)
  if (!metaEl) {
    metaEl = doc.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl)
    } else {
      var wrap = doc.createElement('div')
      wrap.appendChild(metaEl)
      doc.write(wrap.innerHTML)
    }
  }

  // 如果首页未设置视口宽度和屏幕宽度统一，由于上面dpr计算会导致视口宽度为屏幕宽度*dpr，故计算出来的基础font-zise也会是统一时font-zise*dpr
  // 但是由于上面计算后会对视口做dpr等比scale，所以设计图元素只需按某一尺寸计算出rem，最终显示时大小依然能很好的还原
  // 但外部插件由于直接使用px为单位，页面的scale会导致插件被缩放
  var width = docEl.clientWidth
  var height = docEl.clientHeight
  // 修改原始方案，使同一设备设置横竖屏基础font-zise一样
  function refreshRem () {
    // var width = docEl.getBoundingClientRect().width
    // if (width / dpr > 540) {
    //   width = 540 * dpr
    // }
    // var rem = width / 10
    var result = Math.min(width, height)
    // 如果想适配平板，去掉此判断条件，直接设置rem = width / 10即可
    if (result / dpr > 540) {
      result = 540 * dpr
    }
    var rem = result / 10
    docEl.style.fontSize = rem + 'px'
    flexible.rem = win.rem = rem
  }
  //  由于修改方案横屏竖屏基础font-size大小不变，此部分事件监听无意义
  win.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  }, false)

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px'
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = 12 * dpr + 'px'
    }, false)
  }

  refreshRem()
  // 提供flexible插件的几个api
  // 使用在需要的地方直接调用如：console.log(window.lib.flexible.rem)
  flexible.dpr = win.dpr = dpr
  flexible.refreshRem = refreshRem
  // 供js中使用的rem转px方法
  flexible.rem2px = function (d) {
    var val = parseFloat(d) * this.rem
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px'
    }
    return val
  }
  // 供js中使用的px转rem方法
  flexible.px2rem = function (d) {
    var val = parseFloat(d) / this.rem
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem'
    }
    return val
  }
  // 在window的lib对象上绑定flexible的接口
})(window, window['lib'] || (window['lib'] = {}))
