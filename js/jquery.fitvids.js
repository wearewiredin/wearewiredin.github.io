//= require FitVids/jquery.fitvids

(function($){
  'use strict';

  var ieDetect = function(ver) {
    var re = new RegExp('msie' + (!isNaN(ver) ? ('\\s' + ver) : ''), 'i');
    return re.test(navigator.userAgent);
  };

  var isMobile = function() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };


  $(document).on('ready', function(){
    var $vidSection = $('#teaser'),
        $playEl = $vidSection.find('.gm-play'),
        $teaserEl = null,

        maxVidHeight = 600,
        fullVideoURL = '//www.youtube.com/embed/CtLEKjycdCw',
        animationTime = 300,
        teaserVidFiles = {
          'video/mp4': "<%= asset_path('loop-bg.mp4') %>",
          'video/ogg': "<%= asset_path('loop-bg.ogv') %>",
          'video/webm': "<%= asset_path('loop-bg.webm') %>"
        };

    var insertTeaserVid = function(){
      var $pendingVid = $('<video />', { autoplay: true, loop: true });

      $.each(teaserVidFiles, function(key, val){
        if ( $pendingVid[0].canPlayType(key) )
          $pendingVid.attr('src', val);
      });

      $vidSection
        .addClass('teaser-playing')
        .prepend('<div class="teaser-wrapper" />')
        .find('.teaser-wrapper').append($pendingVid);

      $teaserEl = $pendingVid;

      $teaserEl.one('loadedmetadata', resizeTeaserVid);
    };

    var resizeTeaserVid = function(){
      if($teaserEl == null)
        return;

      var newHeight = $teaserEl.height();
      $vidSection.height( (newHeight < maxVidHeight) ? newHeight : maxVidHeight );
    };

    var embedFullVideo = function(){
      $teaserEl  = null;

      var iframe = $('<iframe />', {
        src: fullVideoURL,
        frameborder: 0,
        allowfullscreen: true
      });

      $vidSection
        .find('.teaser-wrapper').remove()
        .end()
        .find('.container').fadeOut(animationTime);

      setTimeout(function(){
        $vidSection
          .removeClass('fallback-active')
          .addClass('video-playing')
          .prepend('<div class="video-wrapper" />')
          .height('auto')
          .find('.video-wrapper').append(iframe).fitVids();
      }, animationTime)
    };


    // if( isMobile() || ieDetect(8) || ieDetect(7) )
    //   $vidSection.addClass('fallback-active');
    // else
    //   insertTeaserVid();

    $vidSection.addClass('fallback-active');

    $playEl.one('click', embedFullVideo);

    $(window).on('resize', resizeTeaserVid);

  });

})(jQuery);