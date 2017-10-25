$(function() {
  var $fontSizeDefault = $('.js-default');
  var $fontSizeLarge = $('.js-large');


  // var fontsize = $('.js-fs').css('font-size');
  // console.log(fontsize);



  $fontSizeDefault.on({
    'mouseenter': function() {
      $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_default_on.png');
    },
    'mouseleave': function() {
      $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_default.png');
    }
  });

  $fontSizeLarge.on({
    'mouseenter': function() {
      $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_large_on.png');
    },
    'mouseleave': function() {
      $(this).attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_large.png');
    }
  });

  // $fontSizeDefault.on('click', function(event) {
  //   $('.js-fs').addClass('is-default');
  // });

  // $fontSizeLarge.on('click', function(event) {
  //   var up = fontsize * '150%';
  //   console.log(up);
  //   $('.js-fs').addClass('is-large');
  //   $('.js-fs').css('font-size', up);
  // });

  $('.js-menu').hover(function() {
    $(this).children('ul').fadeIn(400);
    // .addClass('is-active');
  }, function() {
    $(this).children('ul').fadeOut(0);
    // .removeClass('is-active');
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

  function showFacilities(data) {
    data.facilities.forEach(function(facilities) {
      var items =
        '<li>'+
          '<figure class="p-facility__item">'+
            '<a href="">'+
              '<img src="'+ facilities.img +'" alt="" class="p-facility__img">'+
            '</a>'+
          '</figure>'+
          '<a href="" class="p-facility__link">'+ facilities.name +'<img src="http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/top/btn_link.png" alt="" class="p-facility__link__btn">'+
          '</a>'+
          '<p class="p-facility__category">'+ facilities.category +'</p>'+
        '</li>';

      $('.p-facility__list').append(items);
    });
  }
});