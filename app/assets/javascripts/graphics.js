
function GreenBubbleInViewport(bubbleGreen) {
  var top = bubbleGreen.offsetTop;
  var left = bubbleGreen.offsetLeft;
  var width = bubbleGreen.offsetWidth;
  var height = bubbleGreen.offsetHeight;

  while(bubbleGreen.offsetParent) {
    bubbleGreen = bubbleGreen.offsetParent;
    top += bubbleGreen.offsetTop;
    left += bubbleGreen.offsetLeft;
  }

  console.log('top: ', top, ' | ' + window.pageYOffset + ', left: ' + left + ' | ' + window.pageXOffset);
  console.log('top+height: ' + (top + height) + ' | ' + (window.pageYOffset + window.innerHeight));
  console.log('left-width: ' + (left + width) + ' | ' + (window.pageXOffset + window.innerWidth));

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

function bubbles() {
  // Settings
  var min_bubble_count = 1, // Minimum number of bubbles
      max_bubble_count = 20; // Maximum number of bubbles


  // Calculate a random number of bubbles based on our min/max
  var bubbleCount = min_bubble_count + Math.floor(Math.random() * (max_bubble_count + 1));

  // Create the bubbles
  for (var i = 0; i < bubbleCount; i++) {
    // if some random number  === 15 then show green bubble
    $('.bubbles').append('<div class="bubble-container"><div class="bubble"></div></div>');

    if (i === Math.floor(bubbleCount/2)) {
      $('.bubbles').append('<a href="/game_result"> <div class="bubble-container" id="green"><div class="bubble"></div></div></a>');
    }
  }
}


$(document).on( "turbolinks:load", function() {
  var seconds = 00;
  var tens = 00;
  var appendTens = document.getElementById("tens");
  var appendSeconds = document.getElementById("seconds");
  // var buttonStart = document.getElementById('button-start');
  // var buttonStop = document.getElementById('button-stop');
  // var buttonReset = document.getElementById('button-reset');
  var Interval ;
  var min_bubble_size = 150; // Smallest possible bubble diameter (px)
  var max_bubble_size = 20; // Maximum bubble blur amount (px)

  bubbles();

  function startTimer () {
    tens++;
    console.log('startTimer: ', tens);

    if(tens < 9){
      appendTens.innerHTML= "0" + tens;
    }

    if (tens > 9){
      appendTens.innerHTML = tens;
    }

    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
    console.warn('seconds: ', seconds);
  }

  // setInterval(GreenBubbleInViewport, 1000, ('#green') );

  // Now randomise the various bubble elements
  $('.bubbles').find('.bubble-container').each(function(){



    // Randomise the bubble positions (0 - 100%)
    var pos_rand = Math.floor(Math.random() * 100);

    // Randomise their size
    var size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size + 1));

    // Randomise the time they start rising (0-15s)
    var delay_rand = Math.floor(Math.random() * 16);

    // Randomise their speed (3-8s)
   var speed_rand

   if ($(this).attr('id') == 'green') {
    speed_rand = 14;
  } else {
    speed_rand  = (3 + Math.floor(Math.random() * 12));
 }




//  var speed_rand = 2;

    // Random blur
    var blur_rand = Math.floor(Math.random() * 1);

    // Cache the this selector
    var $this = $(this);

    var _this = this;

    // Apply the new styles
    $this.css({
      'left' : pos_rand + '%',

      '-webkit-animation-duration' : speed_rand + 's',
      '-moz-animation-duration' : speed_rand + 's',
      '-ms-animation-duration' : speed_rand + 's',
      'animation-duration' : speed_rand + 's',

      '-webkit-animation-delay' : delay_rand + 's',
      '-moz-animation-delay' : delay_rand + 's',
      '-ms-animation-delay' : delay_rand + 's',
      'animation-delay' : delay_rand + 's',

      '-webkit-filter' : 'blur(' + blur_rand  + 'px)',
      '-moz-filter' : 'blur(' + blur_rand  + 'px)',
      '-ms-filter' : 'blur(' + blur_rand  + 'px)',
      'filter' : 'blur(' + blur_rand  + 'px)',
    });

    $this.children('.bubble').css({
      'width' : size_rand + 'px',
      'height' : size_rand + 'px'
    });

    $this.children('.bubble').click(function() {
      console.log("i clicked a button");
      $(_this).fadeOut(300);
    });

  });

  setInterval(function() {
    if ($('#green:visible').length == 0) {
      return
    }
    var check = GreenBubbleInViewport($('#green:visible')[0]);
    console.log('bubble check: ', check + ' visible: ', $('#green:visible').length);
    if (check === true) {
      console.log('start timer');
      startTimer();
      Cookies.set('timer', tens);
      Cookies.get('timer');
    }
  }, 1000);

});
