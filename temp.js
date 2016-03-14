/*
   Free Code Camp - Pomodoro Clock
   Author - Varenya
*/


var TimerDuration = React.createClass({

  getInitialState : function () {
    return {duration : this.props.initialDuration};
  },

  handleClick: function (arg,e) {
    e.preventDefault();
    if(arg == "-"){
      if ( this.state.duration > 0)
        this.setState({duration:this.state.duration-1},function () {
          //console.log("Inside callback",this.props.type,this.state.duration);
          this.props.onTimeChange(this.props.type,this.state.duration);
        });
    }
    else{
        this.setState({duration:this.state.duration+1},function () {
          //console.log("Inside callback",this.props.type,this.state.duration);
          this.props.onTimeChange(this.props.type,this.state.duration);
        });
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

  getInitialState: function () {
    return {timer: this.props.intervalDuration,displayText:this.props.intervalDuration+":00",break:this.props.breakDuration};
  },

  startTimer : function (duration,breakTime) {

    // console.log("Clock",duration);
    var timer = duration;
    var breaker = true;
    var minutes,seconds;

    setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          // display.text(minutes + ":" + seconds);

          this.setState({displayText: minutes + ":" + seconds});

          if (--timer < 0) {
            if(breaker){
              timer = breakTime;
              breaker = !breaker;
            }
            else{
              timer = duration;
              breaker = !breaker;
            }
          }
      }.bind(this), 1000);

  },

  componentWillReceiveProps: function(nextProps) {
    console.log(nextProps);
    this.setState({timer:nextProps.intervalDuration,break:nextProps.breakDuration});
    // this.setState({
    //   likesIncreasing: nextProps.likeCount > this.props.likeCount
    // });
  },

  handleClickTimer : function (e) {
    e.preventDefault();
    this.startTimer(this.state.timer,this.state.break);
  },


  render: function() {
    //  console.log("Duration from BreakClock "+ this.props.breakDuration);
    //  console.log("Duration from Interval Clock "+ this.props.intervalDuration);
    // let displayText = this.props.intervalDuration + ":00";
    return (
      <div className="col-md-12">
        <div className="clock-pomodoro">
          <div className="time" onClick={this.handleClickTimer}> {this.state.displayText} </div>
        </div>
      </div>
    );
  }

});

var Pomodoro = React.createClass({

  getInitialState: function () {
    return {breaktime:0,interval:10};
  },

  handleTimeChange : function(clock,time){

    if(clock=="Break Length")
      this.setState({breaktime:time});
    if(clock=="Session Length")
      this.setState({interval:time});

  },
  render: function() {
    return (
      <div className = "row">
        <TimerDuration type="Break Length" initialDuration={0} onTimeChange={this.handleTimeChange}/>
        <TimerDuration type="Session Length" initialDuration={10} onTimeChange={this.handleTimeChange}/>
        <Clock breakDuration={this.state.breaktime} intervalDuration={this.state.interval}/>
      </div>
    );
  }
})

ReactDOM.render(<Pomodoro />,document.getElementById('dummy'));
