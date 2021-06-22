function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}


$(() => {

  readTextFile("./data.json", function(text){
    var data = JSON.parse(text);
    var year_len = data.length;

    //fill top
    var year_list = "";
    for(var i = 0; i < year_len; i++){
      year_list += "<li><span>" + data[i].year + "</span></li>";
    }
    var dom_year_list = document.getElementById("year_list");
    dom_year_list.innerHTML = year_list;

    //fill bottom
    var year_detials='';
    var tmp_str='';
    var tmp_len=0;
    for(var i=0; i < year_len; i++){
      tmp_str = '<div class="year_milestone"><h2 class="milestone">' + data[i].year + ' - ' + data[i].year_sum + '</h2>'
      tmp_str = tmp_str + '<p>' + data[i].year_detail + '</p><p><ul>';
      tmp_len = data[i].event_list.length;
      for(var j=0; j < tmp_len; j++){
        tmp_str += '<li>' + data[i].event_list[j] + '</li>'
      }
      tmp_str += '</ul></p></div>';

      year_detials += tmp_str;
    }
    
    document.getElementById("milestones").innerHTML = year_detials;


    let stickyTop = 0,
    scrollTarget = false;
  
    let timeline = $('.timeline__nav'),
    items = $('li', timeline),
    milestones = $('.timeline__section .milestone'),
    offsetTop = parseInt(timeline.css('top'));
  
    const TIMELINE_VALUES = {
      start: 190,
      step: 30 
    };
  
  
    $(window).resize(function () {
      timeline.removeClass('fixed');
  
      stickyTop = timeline.offset().top - offsetTop;
  
      $(window).trigger('scroll');
    }).trigger('resize');
  
    $(window).scroll(function () {
      if ($(window).scrollTop() > stickyTop) {
        timeline.addClass('fixed');
      } else {
        timeline.removeClass('fixed');
      }
    }).trigger('scroll');
  
    items.find('span').click(function () {
      let li = $(this).parent(),
      index = li.index(),
      milestone = milestones.eq(index);
  
      if (!li.hasClass('active') && milestone.length) {
        scrollTarget = index;
  
        let scrollTargetTop = milestone.offset().top - 80;
  
        $('html, body').animate({ scrollTop: scrollTargetTop }, {
          duration: 400,
          complete: function complete() {
            scrollTarget = false;
          } });
  
      }
    });
  
    $(window).scroll(function () {
      let viewLine = $(window).scrollTop() + $(window).height() / 3,
      active = -1;
  
      if (scrollTarget === false) {
        milestones.each(function () {
          if ($(this).offset().top - viewLine > 0) {
            return false;
          }
  
          active++;
        });
      } else {
        active = scrollTarget;
      }
  
      timeline.css('top', -1 * active * TIMELINE_VALUES.step + TIMELINE_VALUES.start + 'px');
  
      items.filter('.active').removeClass('active');
  
      items.eq(active != -1 ? active : 0).addClass('active');
    }).trigger('scroll');

    timeline.css('top', '190px');
    $('#year_list').find('li').filter('.active').removeClass('active');
    $('#year_list').find('li').first().addClass('active');

  });


});
