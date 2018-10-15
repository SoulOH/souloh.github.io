/**
 * Created by Yushuhui on 2016/5/3
 */


(function () {
    //IE6-9, jump to index_com.html
    var isCom = false;
    for (var i = 6; i < 10; i++) {
      if (navigator.userAgent.indexOf("MSIE " + i) != -1)
        isCom = true;
    }
    if (isCom) {
      location.href = 'index_com.html';
    }
  
    //variables
    var nCur = 1, nTotal = 6;
    var iTime = 600;
    var menuIndex = -1;
    var d1, d2, tp, vh;
  
    //refresh on resizing
    window.onresize = function () {
      var vhNew = document.body.clientHeight / 100;
      if (vhNew == vh)
        return;
      Array.prototype.slice.call(document.getElementsByClassName('sec_normal')).forEach(function (e, i) {
        var t = e.style.transform;
        if (t == "" || e == "translateY(0px)")
          return;
        t = t.replace("translateY(", "").replace("px)", "");
        e.style.transform = "translateY(" + t * vhNew / vh + "px)";
      });
      vh = vhNew;
    };
  
    //fix compatibility for 360 browser
    function fixBind(tm) {
      toggleBind();
      setTimeout(function () {
        toggleBind();
      }, tm ? tm : iTime);
    }
  
    //toggle bind
    function toggleBind() {
      if (document.onmousewheel) {
        if (document.removeEventListener) {
          document.removeEventListener('DOMMouseScroll', sectionOnScroll);
        }
        document.onmousewheel = null;
      }
      else {
        if (document.addEventListener) {
          document.addEventListener('DOMMouseScroll', sectionOnScroll, false);
        }
        document.onmousewheel = sectionOnScroll;
      }
    }
  
    //go top
    function goTop() {
      if (nCur == 1) {
        return;
      }
      fixBind(iTime * 2);
      var cur = document.getElementsByClassName('s' + nCur)[0];
      var first = document.getElementsByClassName('s1')[0];
      var s5 = document.getElementsByClassName('s5')[0];
      first.style.transform = translateY(0);
      cur.style.transform = translateY(100);
      if (nCur == 6) {
        s5.style.transform = translateY(100);
      }
      tp.classList.add('dis_non');
      setTimeout(function () {
        for (var i = nCur; i > 1; i--) {
          var el = document.getElementsByClassName('s' + i)[0];
          el.style.transform = translateY(100);
        }
        nCur = 1;
      }, iTime);
    }
  
    //go bottom
    function goBottom() {
      if (nCur >= 5) {
        return;
      }
      fixBind(iTime * 2);
      var cur = document.getElementsByClassName('s' + nCur)[0];
      var last = document.getElementsByClassName('s5')[0];
      last.style.transform = translateY(0);
      cur.style.transform = translateY(-100);
      d1.classList.remove('dis_non');
      d2.classList.remove('dis_non');
      tp.classList.remove('dis_non');
      setTimeout(function () {
        for (var i = nCur; i < 5; i++) {
          var el = document.getElementsByClassName('s' + i)[0];
          el.style.transform = translateY(-100);
        }
        nCur = 5;
      }, iTime);
    }
  
    //scroll event trigger
    function sectionOnScroll(ev) {
      fixBind();
      //get direction
      var event = ev || window.event;
      if (event.type == 'DOMMouseScroll')
        var dir = event.detail > 0;
      if (event.wheelDelta)
        var dir = event.wheelDelta < 0;
  
      var cur = document.getElementsByClassName('s' + nCur)[0];
      var mov = document.getElementsByClassName('s' + (nCur + (dir ? 1 : -1)))[0];
  
      //page down
      if (dir && nCur < nTotal) {
        if (nCur == 1) {
          setTimeout(function () {
            tp.classList.remove('dis_non');
            //d1.classList.remove("dis_non");
           // d2.classList.remove("dis_non");
          }, iTime);
        }
        if (nCur != 5) {
          cur.style.transform = translateY(-100);
          mov.style.transform = translateY(0);
  
        } else {
          document.getElementById('head').classList.add('border_none');
          cur.style.transform = translateY(-35);
          mov.style.transform = translateY(65);
        }
        nCur++;
      }
      //page up
      if (!dir && nCur > 1) {
        if (nCur == 2) {
          setTimeout(function () {
            tp.classList.add('dis_non');
            d1.classList.add("dis_non");
            d2.classList.add("dis_non");
          }, iTime);
        }
        if (nCur != 6) {
          cur.style.transform = translateY(100);
          mov.style.transform = "translateY(0)";
        } else {
          document.getElementById('head').classList.remove('border_none');
          cur.style.transform = translateY(100);
          mov.style.transform = "translateY(0)";
        }
        nCur--;
      }
    }
  
    function translateY(n) {
      return "translateY(" + n * vh + "px)";
    }
  
    //animations of top right menu
    //TODO:simplify
    function initMenuAnimation() {
      var menu_li = document.getElementById("menu_top").children;
      var l = menu_li.length;
      for (var i = 0; i < l; i++) {
        menu_li[i].li_index = i;
        menu_li[i].onmouseenter = function (e) {
          var current_hr = e.target.getElementsByTagName('hr')[0];
          var current_index = e.target.li_index;
          var classN = "anm_menu_init ";
          if (menuIndex != -1) {
            classN += (current_index > menuIndex) ? "fle" : "flr";
          }
          current_hr.className = classN;
          for (var i = 0; i < menu_li.length; i++) {
            if (i != menuIndex && i != current_index) {
              menu_li[i].getElementsByTagName('hr')[0].className = "";
            }
          }
          menuIndex = current_index;
        };
        menu_li[i].onmouseleave = function (e) {
          setTimeout(function () {
            var current_hr = e.target.getElementsByTagName('hr')[0];
            var current_index = e.target.li_index;
            var classN = "anm_menu_fade ";
            if (current_index == menuIndex) {
              menuIndex = -1;
            }
            else if (menuIndex != -1) {
              classN += (current_index < menuIndex) ? "flr" : "fle";
            }
            current_hr.className = classN;
          }, 10);
        };
      }
    }
  
    function init() {
      if (!document.body)
        return setTimeout(arguments.callee, 50);
  
      var qr = document.getElementById('s1_qr');
      var zoom = document.getElementById('zoom');
      d1 = document.getElementById('d1');
      d2 = document.getElementById('d2');
      tp = document.getElementsByClassName('goTop')[0];
      vh = document.body.clientHeight / 100;
  
      for (var i = 2; i <= nTotal; i++) {
        document.getElementsByClassName('s' + i)[0].style.transform = translateY(100);
      }
  
      document.getElementsByClassName('goTop')[0].onclick = goTop;
      var gob = document.getElementsByClassName("goBottom");
      if (gob.length > 0) {
        gob[0].onclick = goBottom;
      }
  
      qr.onmouseenter = function () {
        zoom.classList.remove('dis_non');
      };
      qr.onmouseleave = function () {
        zoom.classList.add('dis_non');
      };
  
      if (location.hash == '#Info') {
        goBottom();
        d1.classList.remove("dis_non");
        d2.classList.remove("dis_non");
      }
  
      initMenuAnimation();
      toggleBind();
    }
  
    init();
  
  })();