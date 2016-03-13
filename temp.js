/*
   Free Code Camp - Pomodoro Clock
   Author - Varenya
*/


var TimerDuration = React.createClass({

  getInitialState : function () {
    return {duration : 0};
  },

  handleClick: function (arg,e) {
    e.preventDefault();
    if(arg == "-"){
      if ( this.state.duration > 0)
        this.setState({duration:this.state.duration-1});
    }
    else{
        this.setState({duration:this.state.duration+1});
    }
  },

  render: function() {
    return (
      <div className="col-md-6">
        <div className="center">
          <div className="type"> {this.props.type} </div>
          <span className="minus" onClick={this.handleClick.bind(this,"-")}> - </span>
          <span className="duration"> {this.state.duration} </span>
          <span className="plus" onClick={this.handleClick.bind(this,"+")} > + </span>
        </div>
      </div>
    );
  }

});

var Clock = React.createClass({

  render: function() {
    return (
      <div className="col-md-12">
        <div className="clock-pomodoro">
          <div className="time"> 24:45 </div>
        </div>
      </div>
    );
  }

});

var Pomodoro = React.createClass({
  render: function() {
    return (
      <div className = "row">
        <TimerDuration type="Break Length"/>
        <TimerDuration type="Session Length"/>
        <Clock />
      </div>
    );
  }
})

ReactDOM.render(<Pomodoro />,document.getElementById('dummy'));
