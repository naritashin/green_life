$(function() {
  var $fontSizeDefault = $('.js-default'),
      $fontSizeLarge = $('.js-large'),

      $slideView = $('.p-keyvisual__wrapper'),
      $slideList = $('.p-keyvisual__list'),
      $slideWrap = $('.slide__wrap'),
      slideViewWidth = $slideView.width(),
      slideListLen = $slideList.find('li').length,
      leftValue = 0,
      i = 0;

  ajax();
  keyvisualInit();
  createKeyvisualBtn();

  $fontSizeDefault.on(eventFsSelect("default", "large"));

  $fontSizeLarge.on(eventFsSelect("large", "default"));

  $('.js-menu').hover(function() {
    if($(window).width()+16 >= 640) {
      $(this).children('ul')
      .fadeIn(400);
    };
  }, function() {
    if($(window).width()+16 >= 640) {
      $(this).children('ul')
      .stop()
      .fadeOut(0);
    }
  });

  $('.js-navbar').on('click', function() {
    $('.header__nav__list').slideToggle();
  });

  $('.header__nav__toggle').on('click', function() {
    $(this).next().slideToggle();
  });

  $('.js-totop').on('click', function() {
    $('html').animate({
      scrollTop: 0
    },
    500);
  });

  setInterval(function() {
    keyvisualSlider();
  }, 7000);

  $('.p-keyvisual__slide__btn').on('click', function() {
    current = $(this);
    arr = keyvisualMoveSlide(leftValue, current);

    i= arr['int'];
    leftValue = arr['value'];
  });

  $(window).on('resize', function() {
    slideViewWidth = $slideView.width();
    slideWidth = slideViewWidth * slideListLen;
    nowNum = $('.is-facility-active').parent().val();
    $facilitySlideBtnList = $('.p-facility__slide__btn__list');

    $('.p-keyvisual__img').css({
      width: slideViewWidth
    });
    $slideWrap.css({
      width: slideWidth * 2
    });

    $slideWrap.children().first()
    .css({
      width: slideWidth,
      marginLeft: '-' + i * slideViewWidth + 'px'
    });

    leftValue = i * slideViewWidth;

    if ($(window).width()+16 < 640) {
      facilitySlideViewWidth = $('.p-facility__slide__wrapper').width();

      $('.p-facility__list li').css({
        width: facilitySlideViewWidth/2
      });
      facilityListResize($facilitySlideList,
        facilitySlideViewWidth,
        facilitySlideListLen,
        $('.is-facility-active').parent().val());
      }

    if ($facilitySlideBtnList.hasClass('is-n4') && $(window).width()+16 < 640) {
      nowNum *= 2;

      $facilitySlideBtnList.removeClass('is-n4');
      setFacilitySlideSmall(nowNum);
    } else if ($facilitySlideBtnList.hasClass('is-n2') && $(window).width()+16 >= 640) {
      nowNum = Math.floor(nowNum/2);

      $facilitySlideBtnList.removeClass('is-n2');
      setFacilitySlide(nowNum);
    }
  });

  $('.p-news__contents__list').on('click', '.p-news__contents__openner', function() {
    $(this).toggleClass('is-open');
    $(this).parent()
    .prev()
    .toggleClass('is-more');
  });

  function ajax() {
    $.ajax({
      url: '../../api/facilities.json',
      dataType: 'json',
    })
    .done(function(data) {
      showFacilities(data);

      if ($(window).width()+16 < 640) {
        setFacilitySlideSmall();
      } else {
        setFacilitySlide();
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

    $.ajax({
      url: '../../api/news.json',
      dataType: 'json',
    })
    .done(function(news) {
      showNews(news);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

    $.ajax({
      url: '../../api/infomation.json',
      dataType: 'json',
    })
    .done(function(infos) {
      showInfos(infos);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }

  function showFacilities(data) {
    data.facilities.forEach(function(facilities, count) {

      if((count % 4) === 0 && (count % 2) === 0) {
        slideCount = 'is-count-n2 is-count-n4';
      } else if((count % 4) === 0) {
        slideCount = 'is-count-n4';
      } else if((count % 2) === 0) {
        slideCount = 'is-count-n2';
      } else {
        slideCount = '';
      }

      var item =
        '<li class="'+ slideCount +'">'+
          '<figure class="p-facility__item">'+
            '<a href="">'+
              '<img src="'+ facilities.img +'" alt="'+ facilities.name +'" class="p-facility__img">'+
            '</a>'+
          '</figure>'+
          '<a href="" class="p-facility__link js-fs">'+ facilities.name +'<img src="http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/top/btn_link.png" alt="" class="p-facility__link__btn">'+
          '</a>'+
          '<p class="p-facility__category">'+ facilities.category +'</p>'+
        '</li>';

      $('.p-facility__list').append(item);
    });
  }

  function showNews(data) {
    data.news.forEach(function(news) {
      var item =
        '<li class="u-cf">'+
          '<div class="p-news__contents__inner">'+
            '<figure class="c-arrow">'+
              '<img src="http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/etc/link_arrow_orange.jpg" alt="">'+
              '</figure>'+
            '<span class="p-news__contents__date js-fs">'+ news.year +'年'+ news.month +'月'+ news.date +'日</span>'+
            '<h3 class="p-news__contents__facility js-fs">'+ news.facility +'</h3>'+
            '<div class="p-news__contents__txtarea">'+
              '<h4 class="p-news__contents__title js-fs">'+ news.title +'</h4>'+
              '<p class="p-news__contents__txt js-fs">'+ news.content +
              '</p>'+
              '<p class="u-align-right">'+
                '<a class="p-news__contents__openner">・・・続きを読む</a>'+
              '</p>'+
            '</div>'+
          '</div>'+
          '<figure class="p-news__contents__item">'+
          '<img src="'+ news.image +'" alt="" class="p-news__contents__img">'+
          '</figure>'+
        '</li>';

        $('.p-news__contents__list').append(item);
    });
  }

  function showInfos(data) {
    data.infos.forEach(function(infos) {
      var item =
        '<li>'+
          '<figure class="c-arrow"><img src="http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/etc/link_arrow_grey.jpg" alt=""></figure>'+
          '<span class="p-info__date">'+ infos.year +'年'+ infos.month +'月'+ infos.date +'日</span>'+
          '<a href="" class="p-info__txt">'+ infos.title +'</a>'+
        '</li>';

        $('.p-info__list').append(item);
    });
  }

  function eventFsSelect(type, notType) {
    var eo = Object(),
        changeSize = type === "default" ? '-=3' : '+=3';

    eo.mouseenter = function() {
      $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_'+ type +'_on.png');
    };
    eo.mouseleave = function() {
      if(!$(this).hasClass('is-current'))
        $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_'+ type +'.png');
    };
    eo.click = function() {
      if(!$(this).hasClass('is-current'))
        $('.js-fs').css('font-size', changeSize);

      $('.js-fsselect').removeClass('is-current');
      $(this).parent()
      .siblings()
      .children()
      .attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_'+ notType +'.png');

      $(this).addClass('is-current');
      $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_'+ type +'_on.png');
    };
    return eo;
  }

  function keyvisualInit() {
    var slideWidth = slideViewWidth*slideListLen;
    $('.p-keyvisual__img').css({
      width: slideViewWidth
    });
    $slideList.css({
      width: slideWidth
    });
    $slideWrap.css({
      width: slideWidth*2
    });
  };

  function keyvisualSlider() {
    var firstSlideList = $slideWrap.children().first();

    if (leftValue == firstSlideList.width() - slideViewWidth) {
      firstSlideList.clone(true)
      .css({
        marginLeft: 0
      })
      .appendTo($slideWrap);

      leftValue += slideViewWidth;
      i += 1;

      $('.is-keyvisual-active').removeClass('is-keyvisual-active')
      .next()
      .addClass('is-keyvisual-active');

      firstSlideList.stop()
      .animate({
        marginLeft: '-'+ leftValue +'px'
      },
        700,
        function() {
          firstSlideList.remove();
          leftValue = 0;
          i = 0;

          $('.is-keyvisual-active').removeClass('is-keyvisual-active');

          $('.p-keyvisual__slide__btn__list').children()
          .first()
          .addClass('is-keyvisual-active');
        }
      );
    } else {
      leftValue += slideViewWidth;
      i += 1;

      $('.is-keyvisual-active')
      .removeClass('is-keyvisual-active')
      .next()
      .addClass('is-keyvisual-active');

      firstSlideList.stop()
      .animate({
        marginLeft: '-'+ leftValue +'px'
      },
      700);
    }
  }

  function createKeyvisualBtn() {
    $('.p-keyvisual__slide__btn__list').children().remove();

    $slideList.children().each(function(count) {
      var active = count == 0 ? 'is-keyvisual-active' : '',
          item =
            '<li value="'+ count +'" class="p-keyvisual__slide__btn '+ active +'">'+
            '</li>';

      $('.p-keyvisual__slide__btn__list').append(item);
    });
  }

  function keyvisualMoveSlide(value, current) {
    var num = current.val(),
        value = slideViewWidth * num,
        arr = {int: num, value: value};

    $slideWrap.children().first()
    .animate({
      marginLeft: '-'+ value +'px'
    },
    700);
    $('.p-keyvisual__slide__btn').removeClass('is-keyvisual-active');
    current.addClass('is-keyvisual-active');

    return arr;
  }

  function setFacilitySlideSmall(number = 0) {
    $facilitySlideList = $('.p-facility__list');
    facilitySlideViewWidth = $('.p-facility__slide__wrapper').width();
    facilitySlideListLen = $facilitySlideList.find('li').length;
    nowNum = number;

    $('.p-facility__list li').css({
      width: facilitySlideViewWidth/2
    });

    facilityListResize($facilitySlideList,
      facilitySlideViewWidth,
      facilitySlideListLen,
      nowNum);

    createFacilityBtn($facilitySlideList,
      facilitySlideViewWidth,
      2);

    $('.p-facility__slide__btn').on('click', function() {
      num = $(this).parent().val();

      $facilitySlideList.animate({
        marginLeft: '-'+ facilitySlideViewWidth * num +'px'
      });

      $('.p-facility__slide__btn').removeClass('is-facility-active');
      $(this).addClass('is-facility-active');
    });
  }

  function setFacilitySlide(number = 0) {
    $facilitySlideList = $('.p-facility__list');
    $facilitySlide = $('.p-facility__list li');
    facilitySlideViewWidth = $('.p-facility__slide__wrapper').width();
    facilitySlideListLen = $facilitySlideList.find('li').length;
    nowNum = number;

    facilityListResize($facilitySlideList,
      facilitySlideViewWidth,
      facilitySlideListLen,
      nowNum);

    $('.p-facility__list li').css({
      width: 245
    });

    createFacilityBtn($facilitySlideList,
      facilitySlideViewWidth,
      4);

    $('.p-facility__slide__btn').on('click', function() {
      num = $(this).parent().val();

      $facilitySlideList.animate({
        marginLeft: '-'+ facilitySlideViewWidth * num +'px'
      });

      $('.p-facility__slide__btn').removeClass('is-facility-active');
      $(this).addClass('is-facility-active');
    });
  }

  function createFacilityBtn(slideList,
    slideViewWidth,
    slideNum) {
    var $facilitySlideBtnList = $('.p-facility__slide__btn__list');

    $facilitySlideBtnList.children().remove();

    $('.is-count-n'+ slideNum).each(function(count) {
      var active = count == nowNum ? 'is-facility-active' : '',
          item =
            '<li value="'+ count +'">'+
              '<div class="p-facility__slide__btn '+ active +'"></div>'+
            '</li>';

      $facilitySlideBtnList.append(item);
    });

    $facilitySlideBtnList.addClass('is-n'+slideNum);
  }

  function facilityListResize(list, viewWidth, len, num) {
    list.css({
      width: viewWidth * len,
      marginLeft: '-'+ viewWidth * num +'px'
    });
  }
});