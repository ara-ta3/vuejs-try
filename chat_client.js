(function() {
  $(function() {
      var ws = new WebSocket('ws://127.0.0.1:8888/');
          ws.onerror = function(e){}
          ws.onopen = function() {
              ws.send(JSON.stringify({
                  user: userName,
              }));
          };

      var userName = 'ゲスト' + Math.floor(Math.random() * 100);
      var demo  = new Vue({
          el: "#demo",
          data: {
              user: "太郎",
              time: "2014-12-1 12:00:00",
              text:"",
              lastMessage : "",
              results:[]
          },
          methods: {
              execute: function() {
                  ws.send(JSON.stringify({
                      user: this.user,
                      text: this.text
                  }));
                  this.lastMessage = this.text;
                  this.text = '';
              }
          }
      });

      ws.onmessage = function(event) {
          var data = JSON.parse(event.data);
          if( data.user ) {
              demo.user = data.user;
          }
          demo.results = data;
      };

      return demo;
  });

  return;

}).call(this);
