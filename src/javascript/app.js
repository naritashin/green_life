$(function() {
  var $fontSizeDefault = $('.js-default');
  var $fontSizeLarge = $('.js-large');


  $fontSizeDefault.on({
    'mouseenter': function() {
      $fontSizeDefault.attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_default_on.png');
    },
    'mouseleave': function() {
      $fontSizeDefault.attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_default.png');
    }
  });

  $fontSizeLarge.on({
    'mouseenter': function() {
      $fontSizeLarge.attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_large_on.png');
    },
    'mouseleave': function() {
      $fontSizeLarge.attr('src', 'http://www.greenlife-inc.co.jp/wp-content/themes/greenlife-inc/images/head/btn_txt_large.png');
    }
  });
});