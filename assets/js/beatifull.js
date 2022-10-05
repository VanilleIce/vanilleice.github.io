// Dean Attali / Beautiful Jekyll 2020

var Beautifull = {

    bigImgEl : null,
    numImgs : null,
  
    init : function() {
      setTimeout(Beautifull.initNavbar, 10);
  
      // Shorten the navbar after scrolling a little bit down
      $(window).scroll(function() {
          if ($(".navbar").offset().top > 50) {
              $(".navbar").addClass("top-nav-short");
          } else {
              $(".navbar").removeClass("top-nav-short");
          }
      });
  
      // On mobile, hide the avatar when expanding the navbar menu
      $('#main-navbar').on('show.bs.collapse', function () {
        $(".navbar").addClass("top-nav-expanded");
      });
      $('#main-navbar').on('hidden.bs.collapse', function () {
        $(".navbar").removeClass("top-nav-expanded");
      });
  
      // show the big header image
      Beautifull.initImgs();
  
      Beautifull.initSearch();
    },
  
    initNavbar : function() {
      // Set the navbar-dark/light class based on its background color
      const rgb = $('.navbar').css("background-color").replace(/[^\d,]/g,'').split(",");
      const brightness = Math.round(( // http://www.w3.org/TR/AERT#color-contrast
        parseInt(rgb[0]) * 299 +
        parseInt(rgb[1]) * 587 +
        parseInt(rgb[2]) * 114
      ) / 1000);
      if (brightness <= 125) {
        $(".navbar").removeClass("navbar-light").addClass("navbar-dark");
      } else {
        $(".navbar").removeClass("navbar-dark").addClass("navbar-light");
      }
    },
  
    initImgs : function() {
      // If the page was large images to randomly select from, choose an image
      if ($("#header-big-imgs").length > 0) {
        Beautifull.bigImgEl = $("#header-big-imgs");
        Beautifull.numImgs = Beautifull.bigImgEl.attr("data-num-img");
  
        // 2fc73a3a967e97599c9763d05e564189
        // set an initial image
        var imgInfo = Beautifull.getImgInfo();
        var src = imgInfo.src;
        var desc = imgInfo.desc;
        Beautifull.setImg(src, desc);
  
        // For better UX, prefetch the next image so that it will already be loaded when we want to show it
        var getNextImg = function() {
          var imgInfo = Beautifull.getImgInfo();
          var src = imgInfo.src;
          var desc = imgInfo.desc;
  
          var prefetchImg = new Image();
          prefetchImg.src = src;
          // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`
  
          setTimeout(function(){
            var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
            $(".intro-header.big-img").prepend(img);
            setTimeout(function(){ img.css("opacity", "1"); }, 50);
  
            // after the animation of fading in the new image is done, prefetch the next one
            //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
            setTimeout(function() {
              Beautifull.setImg(src, desc);
              img.remove();
              getNextImg();
            }, 1000);
            //});
          }, 6000);
        };
  
        // If there are multiple images, cycle through them
        if (Beautifull.numImgs > 1) {
          getNextImg();
        }
      }
    },
  
    getImgInfo : function() {
      var randNum = Math.floor((Math.random() * Beautifull.numImgs) + 1);
      var src = Beautifull.bigImgEl.attr("data-img-src-" + randNum);
      var desc = Beautifull.bigImgEl.attr("data-img-desc-" + randNum);
  
      return {
        src : src,
        desc : desc
      }
    },
  
    setImg : function(src, desc) {
      $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
      if (typeof desc !== typeof undefined && desc !== false) {
        $(".img-desc").text(desc).show();
      } else {
        $(".img-desc").hide();
      }
    },
  
    initSearch : function() {
      if (!document.getElementById("beautifuljekyll-search-overlay")) {
        return;
      }
  
      $("#nav-search-link").click(function(e) {
        e.preventDefault();
        $("#beautifuljekyll-search-overlay").show();
        $("#nav-search-input").focus().select();
        $("body").addClass("overflow-hidden");
      });
      $("#nav-search-exit").click(function(e) {
        e.preventDefault();
        $("#beautifuljekyll-search-overlay").hide();
        $("body").removeClass("overflow-hidden");
      });
      $(document).on('keyup', function(e) {
        if (e.key == "Escape") {
          $("#beautifuljekyll-search-overlay").hide();
          $("body").removeClass("overflow-hidden");
        }
      });
    }
  };
  
  // 2fc73a3a967e97599c9763d05e564189
  
  document.addEventListener('DOMContentLoaded', Beautifull.init);
