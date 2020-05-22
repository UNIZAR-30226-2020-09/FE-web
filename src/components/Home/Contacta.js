import React from 'react';
import { mailValidation } from '../../utils';
import { ContactaAgent } from '../../agent';
import './Contacta.css';


class Contacta extends React.Component{
    constructor(props){
      super(props);
      if (props.user) this.mail = props.user.mail;
      else this.mail = null;
      this.state = {
          mail: this.mail===null ? '': this.mail,
          body: ''
      };
      this.handleChangeMail = this.handleChangeMail.bind(this);
      this.handleChangeBody = this.handleChangeBody.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeMail(event) {
      this.setState({ mail: event.target.value });
    }
    handleChangeBody(event) {
      this.setState({ body: event.target.value });
    }

    async handleSubmit(event) {
      event.preventDefault();
      var e = null;
      if (mailValidation(this.state.mail)){
        let x = await ContactaAgent.contactar(this.state.mail, this.state.body);
        console.log(x);
        if (x.status === 200){
          e = new CustomEvent('PandoraAlert', { 'detail': {code:1, text:'Mensaje Enviado.'} });
          window.dispatchEvent(e);
          this.setState({ body: '' });
        }else{
          e = new CustomEvent('PandoraAlert', { 'detail': {
            code: 4,
            text: 'Error ' + x.status + ':' + x.statusText
          }});
          window.dispatchEvent(e);
        }
      }else{
        e = new CustomEvent('PandoraAlert', { 'detail': {code:4, text:'Email no válido.'} });
        window.dispatchEvent(e);
      }
    }


    render(){
      return(
        <div className="contacta">
          <div className="contacta-box">
            <h1>Contacta con nosotros</h1>
            <form onSubmit={this.handleSubmit} >
              <div className="input-group">
                <label className={this.state.mail!=="" ? "label-active":null}>
                  Correo
                </label>
                <input
                  type="text"
                  name="mail"
                  maxLength="100"
                  value={this.state.mail}
                  onChange={this.handleChangeMail}
                />
              </div>
              <div className="input-group">
                <label className={this.state.body!=="" ? "label-active": "textarea-correction"}>
                  Mensaje
                </label>
                <textarea
                type="text"
                name="body"
                minLength="5"
                maxLength="250"
                value={this.state.body}
                onChange={this.handleChangeBody}
                required/>
              </div>
              <div className="input-group">
                <button type="submit" className="btn">
                  <span className="fas"/> Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }

}

export default Contacta;
