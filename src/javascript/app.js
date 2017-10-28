$(function() {
  ajax();

  var $fontSizeDefault = $('.js-default'),
      $fontSizeLarge = $('.js-large'),

      $slideView = $('.p-keyvisual__wrapper'),
      $slideList = $('.p-keyvisual__list'),
      $slideWrap = $('.slide__wrap'),
      slideViewWidth = $slideView.width(),
      slideListLen = $slideList.find('li').length,
      leftValue = 0,
      i = 0,

        $facilitySlideView,
        $facilitySlideList,
        facilitySlideViewWidth,
        facilitySlideListLen;

  createKeyvisualBtn();

  $fontSizeDefault.on({
    'mouseenter': function() {
      $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_default_on.png');
    },
    'mouseleave': function() {
      if(!$(this).hasClass('is-current')) {
        $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_default.png');
      };
    }
  });

  $fontSizeLarge.on({
    'mouseenter': function() {
      $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_large_on.png');
    },
    'mouseleave': function() {
      if(!$(this).hasClass('is-current')) {
        $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_large.png');
      }
    }
  });

  $fontSizeDefault.on('click', function() {
    if(!$(this).hasClass('is-current')) {
      $('.js-fs').css('font-size', '-=3');
    }

    $('.js-fsselect').removeClass('is-current');
    $fontSizeLarge.attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_large.png');
    $(this).addClass('is-current');
    $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_default_on.png');
  });

  $fontSizeLarge.on('click', function() {
    if(!$(this).hasClass('is-current')) {
      $('.js-fs').css('font-size', '+=3');
    }

    $('.js-fsselect').removeClass('is-current');
    $fontSizeDefault.attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_default.png');

    $(this).addClass('is-current');
    $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_large_on.png');
  });

  $('.js-menu').hover(function() {
    if($(window).width() > 640) {
      $(this).children('ul')
      .fadeIn(400);
    };
  }, function() {
    if($(window).width() > 640) {
      $(this).children('ul')
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
    $('html').animate({ scrollTop: 0}, 500);
  });


  $('.p-keyvisual__img').css({
    width: slideViewWidth
  });
  $slideList.css({
    width: slideViewWidth*slideListLen
  });
  $slideWrap.css({
    width: slideViewWidth*slideListLen*2
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
    firstSlideList = $slideWrap.children().first();

    $('.p-keyvisual__img').css({width: slideViewWidth});
    $slideWrap.css({width: slideViewWidth * slideListLen * 2})
    firstSlideList.css({
      width: slideViewWidth * slideListLen,
      marginLeft: '-' + i * slideViewWidth + 'px'
    });
    leftValue = i * slideViewWidth;
  });

  $(window).on('resize', function() {
    if ($(window).width()+15 < 640) {
      var nowNum = $('.is-facility-active').parent().val();

      facilitySlideViewWidth = $facilitySlideView.width();

      $facilitySlide.css({
        width: facilitySlideViewWidth/2
      });
      $facilitySlideList.css({
        width: facilitySlideViewWidth * facilitySlideListLen
      });

      $facilitySlideList.css({
        marginLeft: '-'+ facilitySlideViewWidth * nowNum +'px'
      });
    }
  });

  $(window).on('resize', function() {
    nowNum = $('.is-facility-active').parent().val();

    if ($(window).width()+16 < 640) {
      setFacilitySlideSmall(nowNum);
    } else {
      nowNum = nowNum < 5 ? nowNum : 0;
      setFacilitySlide(nowNum);
    }
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
    data.facilities.forEach(function(facilities) {
      var item =
        '<li>'+
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
                '<a href="" class="p-news__contents__openner js-more">・・・続きを読む</a>'+
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

  function keyvisualSlider() {
    var firstSlideList = $slideWrap.children().first();

    if (leftValue == firstSlideList.width()-slideViewWidth) {
      firstSlideList.clone(true)
      .css({marginLeft: 0})
      .appendTo($slideWrap);

      leftValue += slideViewWidth;
      i += 1;

      $('.is-keyvisual-active').removeClass('is-keyvisual-active')
      .parent()
      .next()
      .children()
      .addClass('is-keyvisual-active');

      firstSlideList.stop()
      .animate({marginLeft: '-'+ leftValue +'px'},
        500,
        function() {
          firstSlideList.remove();
          leftValue = 0;
          i = 0;
          $('.is-keyvisual-active').removeClass('is-keyvisual-active');
          $('.p-keyvisual__slide__btn__list')
          .children()
          .first()
          .children()
          .addClass('is-keyvisual-active');
        }
      );
    } else {
      leftValue += slideViewWidth;
      i += 1;
      $('.is-keyvisual-active')
      .removeClass('is-keyvisual-active')
      .parent()
      .next()
      .children()
      .addClass('is-keyvisual-active');

      firstSlideList.stop()
      .animate({
        marginLeft: '-'+ leftValue +'px'
      });
    }
  }

  function createKeyvisualBtn() {
    $('.p-keyvisual__slide__btn__list').children().remove();
    for(var num = 0; num < slideListLen; num++) {
      var active = num == 0 ? 'is-keyvisual-active' : '',
          item =
        '<li value="'+ num +'">'+
          '<div class="p-keyvisual__slide__btn '+ active +'"></div>'+
        '</li>';

      $('.p-keyvisual__slide__btn__list').append(item);
    }
  }

  function keyvisualMoveSlide(value, current) {
    var num = current.parent().val(),
        value = slideViewWidth * num,
        arr = {int: num, value: value};

    $slideWrap.children().first()
    .animate({
      marginLeft: '-'+ value +'px'
    });
    $('.p-keyvisual__slide__btn').removeClass('is-keyvisual-active');
    current.addClass('is-keyvisual-active');

    return arr;
  }

  function setFacilitySlideSmall(number = 0) {
    $facilitySlideView = $('.p-facility__slide__wrapper');
    $facilitySlideList = $('.p-facility__list');
    $facilitySlide = $('.p-facility__list').children('li');
    facilitySlideViewWidth = $facilitySlideView.width();
    facilitySlideListLen = $facilitySlideList.find('li').length;
    nowNum = number;

    $facilitySlide.css({
      width: facilitySlideViewWidth/2
    });

    $facilitySlideList.css({
      width: facilitySlideViewWidth * facilitySlideListLen,
      marginLeft: '-'+ facilitySlideViewWidth * nowNum +'px'
    });

    createFacilityBtn($facilitySlideList, facilitySlideViewWidth, 2);

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
    $facilitySlideView = $('.p-facility__slide__wrapper');
    $facilitySlideList = $('.p-facility__list');
    $facilitySlide = $('.p-facility__list li');
    facilitySlideViewWidth = $facilitySlideView.width();
    facilitySlideListLen = $facilitySlideList.find('li').length;
    nowNum = number;

    $facilitySlideList.css({
      width: facilitySlideViewWidth * facilitySlideListLen,
      marginLeft: '-'+ facilitySlideViewWidth * nowNum +'px'
    });

    $facilitySlide.css({
      width: 245
    });

    createFacilityBtn($facilitySlideList, facilitySlideViewWidth, 4);

    $('.p-facility__slide__btn').on('click', function() {
      num = $(this).parent().val();

      $facilitySlideList.animate({marginLeft: '-'+ facilitySlideViewWidth * num +'px'});
      $('.p-facility__slide__btn').removeClass('is-facility-active');
      $(this).addClass('is-facility-active');
    });
  }

  function createFacilityBtn(slideList, slideViewWidth, slideNum) {
    var facilityBtnLen = slideList.width()/slideViewWidth/slideNum,
        $facilitySlideBtnList = $('.p-facility__slide__btn__list');

    $facilitySlideBtnList.children().remove();

    for(var num = 0; num < facilityBtnLen; num++) {
      var active = num == nowNum ? 'is-facility-active' : '';
      var item =
        '<li value="'+ num +'">'+
          '<div class="p-facility__slide__btn '+ active +'"></div>'+
        '</li>';

      $facilitySlideBtnList.append(item);
    }
  }
});