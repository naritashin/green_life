$(function() {
  var $fontSizeDefault = $('.js-default'),
  $fontSizeLarge = $('.js-large');

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
      $(this).children('ul').fadeIn(400);
    };
  }, function() {
    if($(window).width() > 640) {
      $(this).children('ul').fadeOut(0);
    }
  });

  $('.js-navbar').on('click', function() {
    $('.header__nav__list').slideToggle();
  });

  $('.header__nav__toggle').on('click', function() {
    console.log($(this).parent().next());
    $(this).next().slideToggle();
  });


  $.ajax({
    url: '../../api/facilities.json',
    dataType: 'json',
  })
  .done(function(data) {
    showFacilities(data);
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

  function showFacilities(data) {
    data.facilities.forEach(function(facilities) {
      var item =
        '<li>'+
          '<figure class="p-facility__item">'+
            '<a href="">'+
              '<img src="'+ facilities.img +'" alt="" class="p-facility__img">'+
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

  $('.js-totop').on('click', function() {
    $('html').animate({ scrollTop: 0}, 500);
  });

  var slideWrapWith = $('.p-keyvisual__wrapper').width(),
  slideImgWidth = $('.p-keyvisual__img').css({width: slideWrapWith}),
  sildeListLen = $('.p-keyvisual__list').find('li').length,
  slideListWidth = $('.p-keyvisual__list').css({width: slideWrapWith*sildeListLen});

  console.log(slideWrapWith);
  console.log(slideImgWidth);
  console.log(slideListWidth);

  $(window).on('resize', function() {
    var slideWrapWith = $('.p-keyvisual__wrapper').width(),
    slideImgWidth = $('.p-keyvisual__img').css({width: slideWrapWith}),
    sildeListLen = $('.p-keyvisual__list').find('li').length,
    slideListWidth = $('.p-keyvisual__list').css({width: slideWrapWith*sildeListLen});


    console.log(slideWrapWith);
    console.log(slideImgWidth);
    console.log(slideListWidth);

  });
});