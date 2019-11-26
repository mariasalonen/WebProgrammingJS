var ChatHeader = React.createClass({
 // Load the initial name
  getInitialState: function() {
    return {name: ''};
  }, 
  // Get's the user from the server and set's the state,
  // so that it re-renders the ChatHeader
  getUser: function() {
    $.ajax({
      url: 'ajax/get_user.php',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({name: data[0].name});
      }.bind(this),
      error: function(xhr, status, err) {
                console.error('VIRHEgetUser: ', status, err.toString());
      }
    });
  },
  componentDidMount: function() {
    // get the user
    this.getUser();
    // set the poll interval
    setInterval(this.getUser, 5000);
  },
  render: function() {
    // To display the username   
    return (
      <div className="msg-header">
        Role: <span>{this.state.name}</span>
      </div>
    );
  }
});


var Row = React.createClass({
  render: function() {
    return (
      <div className="msg-row-container">
        <div className="msg-row">
          <span className="user-label">
            <span className="msg-time">[{this.props.time} </span> : <span className="chat-username">{this.props.username} ]</span>
          </span><br/>
          {this.props.message}
        </div>
      </div>
    );
  }
});


var Messages = React.createClass({
  render: function() {
    // This is how you set inline styles in React
    var inlineStyles = {
      //height: '300px',
      //overflowY: 'scroll'
    };
  
    // Loop through the list of chats and create array of Row components
    var Rows = this.props.datas.map(function(data, index) {
      return (
        <Row key={index} username={data.username} time={data.time} message={data.message} />
      )
    });
    
    return (
      <div style={inlineStyles}>
        {Rows}
      </div>
    );
  }
});



var ChatFooter = React.createClass({
  // Message send event handler
  handleUserMessage: function(event) {
    // When shift and enter key is pressed
    if (event.shiftKey && event.keyCode === 13) {
      //var msg = this.refs.textArea.getDOMNode().value.trim();
      var msg = this.refs.textArea.value;
      if (msg !== '') {
        // call the sendmessages of ChatContainer throught the props
        this.props.sendMessage(msg);
      }
      // Prevent default and clear the textarea
      event.preventDefault();
      //this.refs.textArea.getDOMNode().value = null;
      this.refs.textArea.value = null;    }
  },
  
  render: function() {
    return (
      <div className="msg-input">
        <textarea rows="3" ref="textArea" onKeyDown={this.handleUserMessage} placeholder="Type your message. Press shift + Enter to send" />
      </div>
    );
  }
});


var ChatContainer = React.createClass({
  // Load the initial chats
  getInitialState: function() {
    return {datas: []};
  },
  
  // get's messages from server AND set's the state,
  // so that it re-renders the Messages
  getMessages: function() {
    $.ajax({
      url: 'ajax/get_messages.php',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({datas: data});
      }.bind(this),
      error: function(xhr, status, err) {
                console.error('VIRHEgetMessages: ', status, err.toString());
      }
    });
  },
  
  // add a new message AND update the messages list
  sendMessage: function(message) {
    var that = this; // Ei tarvita
    $.ajax({
      url: 'ajax/add_msg.php',
      method: 'post',
      dataType: 'json',
      data: {msg: message},
      cache: false,
      success: function(data) {
        this.setState({datas: data});
      }.bind(this),
      error: function(xhr, status, err) {
                console.error('VIRHEsendMessage: ', status, err.toString());
      }
    });
  },
  
  componentDidMount: function() {
    this.getMessages();
    setInterval(this.getMessages, 5000);
  },
  
  render: function() {
    return (
      <div className="chat-container">
        <ChatHeader />
        <ChatFooter sendMessage={this.sendMessage} />
        <Messages datas={this.state.datas} />
      </div>
    );
  }
});

ReactDOM.render(
  <ChatContainer />,
  document.getElementById('container')
);
