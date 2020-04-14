import React from 'react';
import './Alerts.css';


// STATUS:
// 1 - INFO
const info = "fas fa-info-circle";
// 2 - OK
const ok = "fas fa-check-circle";
// 4 - Client Error
// 5 - Server Error
const err = "fas fa-exclamation-circle";
const quit = "fas fa-times";

/*
var e = new CustomEvent('PandoraAlert', { 'detail': {code:4, text:'Email no válido'} });
window.dispatchEvent(e);
*/

class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.event = this.event.bind(this);
    this.quit = this.quit.bind(this);
    this.alertaHTML = this.alertaHTML.bind(this);
    this.state = {
     alerts: []
    };
  }

  event(e){
    let al = this.state.alerts;
    let new_li = e.detail;
    new_li.idtimer = setTimeout(() => {
      this.quit(new_li);
    }, 15000);
    al.push(new_li);
    this.setState({ alerts: al });
  }
  quit(ev){
    let tmp = this.state.alerts;
    for( var i = 0; i < tmp.length; i++) if ( tmp[i].idtimer === ev.idtimer) {
      tmp.splice(i, 1);
      // ANIMATE
      let elem = document.getElementById(ev.idtimer.toString(10)) || null;
      if (elem !== null) elem.style.opacity = "0";
      setTimeout(() => this.setState({ alerts: tmp }), 600);
      // /\/\/\/\
      /*
      this.setState({ alerts: tmp });*/
      break;
    }
  }
  alertaHTML(a){
    let color = null, icon = info;
    if (a.code === 1) { color = "info"; icon = info; }
    else if (a.code === 2) { color = "ok"; icon = ok; }
    else if (a.code === 4) { color = "err"; icon = err; }
    else if (a.code === 5) { color = "err"; icon = err; }

    return (
      <li id={a.idtimer.toString(10)} key={a.idtimer} className={color}>
        <span className={icon}/>
        <i>{a.text}</i>
        <span className={quit} onClick={() => {this.quit(a);clearTimeout(a.idtimer);}}/>
      </li>
    );
  }

  componentDidMount() {
    window.addEventListener('PandoraAlert', this.event);
  }
  componentWillUnmount() {
    window.removeEventListener('PandoraAlert', this.event);
    for (let x in this.state.alerts) clearTimeout(x.idtimer);
  }

  render(){
    return (
      <div className="alerts">
        <ul>
          {this.state.alerts.map((a) => this.alertaHTML(a))}
        </ul>
      </div>
    );
  }
}

export default (Alerts);
