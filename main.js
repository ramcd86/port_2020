class Main {

    constructor() {
      this.init();
      this.wWidth = window.innerWidth;
    }
  
    init() {
      $("#pre-click").click(() => {
        this.swipeOpenContent();
      })

      $(".about-nav").click(() => {
        this.navigationController('about');
      })

      $(".portfolio-nav").click(() => {
        this.navigationController('portfolio');
      })

      $(".blog-nav").click(() => {
        this.navigationController('blog');
      })

      $(".contact-nav").click(() => {
        this.navigationController('contact');
      })

    }

    navigationController(selectedNavElement) {
      document.querySelector(`#primary-content-wrapper`).scrollTo({
        top: 0,
        left: (document.querySelector(`#${selectedNavElement}`).offsetLeft - 20),
        behavior: 'smooth'
      })
      // $('.selected').animate({
      //   width: "0px"
      // }, {
      //   duration: 333,
      //   complete: () => {
      //     $('.selected').addClass('unselected')
      //     $('.selected').removeClass('selected')
      //   }
      // })
      // $(`#${selectedNavElement}`).animate({
      //   width: window.innerWidth > 1024 ? "99%" : "95%"
      // }, {
      //   duration: 333,
      //   complete: () => {
      //     $(`#${selectedNavElement}`).addClass('selected')
      //     $(`#${selectedNavElement}`).removeClass('unselected')
      //   }
      // })
    }
  
    swipeOpenContent() {
  
      const animateMain = () => {
        $("#pre-click").animate({
          height: "0px",
          marginTop: "0vh"
        }, {
          duration: 444,
          specialEasing: {
            height: "easeInOutQuint",
            marginTop: "easeInOutQuint",
          }
        })
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
            } else {
              setMainScroll()
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
        console.log('idk')
        document.querySelectorAll('section').forEach((section) => {
          section.style.overflowY = "scroll";
        })
      }
  
      animateMain()
  
    }
  
  }
  
  (() => {
    new Main();  
  })();
