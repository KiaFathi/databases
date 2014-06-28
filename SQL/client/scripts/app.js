// YOUR CODE HERE:

var app = {
  _username : document.URL.split("=")[1],
  _roomList : {},
  _friendList : {},
  _selectedRoom : 'all',
  clearMessages: function(){
    $('#chats').empty();
  },
  addFriend : function(user) {
    if(!app._friendList[user]) {
      app._friendList[user] = true;
      $('#friendList').append('<p class="friendList">'+ user + '</p>');
    }
  },
  addRoom : function(roomname){
      if(!app._roomList[roomname] && roomname !== undefined && roomname.length > 0) {
        app._roomList[roomname] = roomname;
        $('.btn-group').append('<a class="btn dropdown-toggle" id="roomtag">'+ roomname +'</a>');
      }
  },
  addMessage: function(chatObj){
    var newDiv = $('<div class="chatMessages"></div>');
    newDiv.append("<a href='#' class='username'>" + chatObj.user_name + "</a>");
    newDiv.append("<a href='#' id='messageRoom'>All</a>");
    newDiv.append("<p id='messages'>" + chatObj.message + "</p>" + "</div>");
    $('#chats').append(newDiv);
  },
  display: function(data) {
    app.clearMessages();
    _.each(data, function(chatObj) {
      app.addMessage(chatObj);
      console.log(chatObj);
    });
  },
  init: function() {
    setInterval(function() {
      app.fetch();
    }, 5000);
  },
  server: 'http://127.0.0.1:8080/classes',
  handleSubmit: function(text, username, room){
    if(room = 'all'){
      room = '';
    }
    var message = {
      'username': username,
      'text': text,
      'roomname': app._selectedRoom
    };
    app.send(message);
  },
  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log("Message sent");
        app.fetch();
      },
      error: function(data) {
        console.log('Error: Message not sent');
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: app.server,
      // url: app.server + '?order=-createdAt',
      type: 'GET',
      success: function(data) {
        app.display(data);
      },
      error: function() {
        console.log('Error: Could not fetch');
      }
    });
  }
};

app.fetch();

$(document).ready(function() {

  $('body').on('click', '.username', function() {
    var user = $(this).text();
    app.addFriend(user);
  });
  $('body').on('click', '#send', function(){
    var msg = $('textarea').val();
    $('textarea').val("");
    console.log(app._selectedRoom);
    app.handleSubmit(msg, app._username , app._selectedRoom);
  });
  $('body').on('click', '#roomtag', function() {
    app._selectedRoom = $(this).text();
    console.log('Switched Room: ' + app._selectedRoom);
  });
  $('body').on('click', '#allRooms', function(){
    app._selectedRoom = 'all';
    console.log('Switched Room: ' + app._selectedRoom);
  });
  app.init();

});




















