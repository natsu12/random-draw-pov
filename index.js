Array.prototype.deleteElementByValue = function(varElement)
{
    var numDeleteIndex = -1;
    for (var i=0; i<this.length; i++)
    {
        // 严格比较，即类型与数值必须同时相等。
        if (this[i] === varElement)
        {
            this.splice(i, 1);
            numDeleteIndex = i;
            break;
        }
    }
    return numDeleteIndex;
}

$(function  () {
  var player_arr = ['自选','自选'];

  $('.add-people-btn').click(function () {
    var player_name = $('#people').val();
    var player = $('<div class="player"><span class="name">' + player_name + '</span><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
    $('.players').append(player);
    $('#people').val('');
    player_arr.push(player_name);
    return false;
  });

  $('.players').delegate('.close', 'click', function () {
    var player_name = this.parentNode.firstChild.innerText;
    player_arr.deleteElementByValue(player_name);
    $(this.parentNode).remove();
    $('.deleted_players').append(this.parentNode);
  });

  $('.deleted_players').delegate('.close', 'click', function () {
    var player_name = this.parentNode.firstChild.innerText;
    player_arr.push(player_name);
    $(this.parentNode).remove();
    $('.players').append(this.parentNode);
  });

  $('.set-tribe-btn').click(function () {
    $('.tribe').remove();
    var count = $('#tribe-count').val();
    for (var i = 0; i < count; i++) {
      var tribe = $('<div class="tribe"><div class="title"><input type="text" placeholder="输入部落名" class="tribe-name"></div></div>');
      $('.tribes').append(tribe);

      
    }
    
    $('#tribe-count').val('');
    return false;
  });

  $('.random-draw').click(function () {
    var list = [];
    for (var i = 0; i < player_arr.length; i++) {
      list[i] = i;
    }
    for (var i = 0; i < list.length; i++) {
      var rand = parseInt(Math.random() * list.length);
      var temp = list[rand];
      list[rand] = list[i];
      list[i] = temp;
    }
    
    $('.item').remove();
    $('.tribe').each(function () {
      var count = 2;
      for (var j = 0; j < player_arr.length / count; j++) {
        $(this).append($('<div class="item"></div>'));
      }
    });
    
    for (var i = 0; i < player_arr.length; i++) {
      $($(".item")[i]).html((i+1) + " " + player_arr[list[i]]);
    }
  });
})