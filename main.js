class Main {

    constructor() {
      this.init();
      this.wWidth = window.innerWidth;
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
              pullContent();
            }
          })
        } else {
          expandMain();
  
        }
  
      }
  
  
      const pullContent = () => {
        $(".primary-divide").animate({
          marginTop: "10vh",
        }, {
          duration: 444,
          specialEasing: {
            marginTop: "easeInOutQuint",
          },
          complete: () => {
            console.log(this.wWidth)
            if (window.innerWidth > 1024) {
              $(".primary-divide").animate({
                marginLeft: "33%"
              }, {
                duration: 444,
                specialEasing: {
                  marginLeft: "easeInOutQuint",
                },
                complete: () => {
                    setMainScroll()
                }
              })
            }
  
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

      const setMainScroll = () => {
        document.querySelector('section').style.overflowY = "scroll";
      }
  
      animateMain()
  
    }
  
  }
  
  (() => {
    new Main();  
  })();
