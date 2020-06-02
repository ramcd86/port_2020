class Main {

    constructor() {
        this.init();
    }

    init() {
        this.swipeOpenContent();
    }

    swipeOpenContent() {

        const animateMain = () => {
            $("main").animate({
                height: "80vh",
                marginTop: "10vh"
            }, {
                duration: 444,
                specialEasing: {
                    height: "easeInOutQuint",
                    marginTop: "easeInOutQuint",
                }, 
                complete: () => {
                    expandNaviElements();
                    pullContent();
                }
            })
        }

        const expandNaviElements = (loopIt = 0) => {
            if (document.querySelectorAll('.navi-span').length > loopIt) {
                $(document.querySelectorAll('.navi-span')[loopIt]).animate({
                    height: "30px",
                    margin: "10px",
                    padding: "10px"
                }, {
                    duration: 222,
                    specialEasing: {
                        height: "easeInOutQuint",
                        margin: "easeInOutQuint",
                        padding: "easeInOutQuint",
                    }, 
                    complete: () => {
                        expandNaviElements(loopIt + 1)
                    }
                })
            } else {
                expandMain();

            }

        }

        const pullContent = () => {
            $(".primary-divide").animate({
                marginTop: "0vh",
            }, {
                duration: 444,
                specialEasing: {
                    marginTop: "easeInOutQuint",
                }, 
                complete: () => {
                    $(".primary-divide").animate({
                        marginLeft: "49%"
                    }, {
                        duration: 444,
                        specialEasing: {
                            marginLeft: "easeInOutQuint",
                        }
                    })
                }
            })
        }

        const expandMain = () => {
            $("main").animate({
                height: "100vh",
                margin: "0vh"
            }, {
                duration: 444,
                specialEasing: {
                    height: "easeInOutQuint",
                    margin: "easeInOutQuint",
                }, 
                complete: () => {
                    expandMain();
                }
            }, )
        }

        animateMain()

        $("#notch").rotate({
            count: 999999,
            forceJS: true
        })

    }

}

(() => {
    new Main();
})();


$.fn.rotate=function(options) {
    var $this=$(this), prefixes, opts, wait4css=0;
    prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
    opts=$.extend({
      startDeg: false,
      endDeg: 360,
      duration: 1,
      count: 1,
      easing: 'linear',
      animate: {},
      forceJS: false
    }, options);
  
    function supports(prop) {
      var can=false, style=document.createElement('div').style;
      $.each(prefixes, function(i, prefix) {
        if (style[prefix.replace(/\-/g, '')+prop]==='') {
          can=true;
        }
      });
      return can;
    }
  
    function prefixed(prop, value) {
      var css={};
      if (!supports.transform) {
        return css;
      }
      $.each(prefixes, function(i, prefix) {
        css[prefix.toLowerCase()+prop]=value || '';
      });
      return css;
    }
  
    function generateFilter(deg) {
      var rot, cos, sin, matrix;
      if (supports.transform) {
        return '';
      }
      rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
      cos=Math.cos(rot);
      sin=Math.sin(rot);
      matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
      return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
    }
  
    supports.transform=supports('Transform');
    supports.transition=supports('Transition');
  
    opts.endDeg*=opts.count;
    opts.duration*=opts.count;
  
    if (supports.transition && !opts.forceJS) { // CSS-Transition
      if ((/Firefox/).test(navigator.userAgent)) {
        wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
      }
      $this.queue(function(next) {
        if (opts.startDeg!==false) {
          $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
        }
        setTimeout(function() {
          $this
            .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
            .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
            .css(opts.animate);
        }, wait4css);
  
        setTimeout(function() {
          $this.css(prefixed('transition'));
          if (!opts.persist) {
            $this.css(prefixed('transform'));
          }
          next();
        }, (opts.duration*1000)-wait4css);
      });
  
    } else { // JavaScript-Animation + filter
      if (opts.startDeg===false) {
        opts.startDeg=$this.data('rotated') || 0;
      }
      opts.animate.perc=100;
  
      $this.animate(opts.animate, {
        duration: opts.duration*1000,
        easing: $.easing[opts.easing] ? opts.easing : '',
        step: function(perc, fx) {
          var deg;
          if (fx.prop==='perc') {
            deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
            $this
              .css(prefixed('transform', 'rotate('+deg+'deg)'))
              .css('filter', generateFilter(deg));
          }
        },
        complete: function() {
          if (opts.persist) {
            while (opts.endDeg>=360) {
              opts.endDeg-=360;
            }
          } else {
            opts.endDeg=0;
            $this.css(prefixed('transform'));
          }
          $this.css('perc', 0).data('rotated', opts.endDeg);
        }
      });
    }
  
    return $this;
  };