import React from 'react';
import './Compartir.css';

class Compartir extends React.Component{
    constructor(props){
        super(props);
        this.getUsers = props.getUsers;
        this.setNewUser = props.setNewUser;
        this.delUser = props.delUser;
        this.state ={
            anyadiendo: ""
        };
        this.changeAnyadir = this.changeAnyadir.bind(this);
        this.submitAnyadir = this.submitAnyadir.bind(this);
        this.delete = this.delete.bind(this);
        this.sem = 1;
    }

    async changeAnyadir(event){
      await this.setState({ anyadiendo: event.target.value });
    }
    async submitAnyadir(){
      if(this.state.anyadiendo !== ''){
        await this.setNewUser(this.state.anyadiendo);
        await this.setState({ anyadiendo: "" });
      }
    }
    async delete(user){
      await this.delUser(user);
      await this.setState({ anyadiendo: "" });
    }



    render(){
      var x = [];
      x = this.getUsers();
        return(
            <div className="row compartir">
              <div className="column col-100">
              {x.map( (c,i) =>
                <div key={i} className="input-group">
                    <input readOnly name="u" type="text" value={c} />
                    <button type="submit" onClick={() => this.delete(c)} className="btn-minus fas fa-minus-square"/>
                </div>
              )}
                <div className="input-group">
                    <input placeholder="Introduzca usuario a quien compartir" type="text" value={this.state.anyadiendo} onChange={this.changeAnyadir} />
                    <button type="button" onClick={this.submitAnyadir} className="btn-plus fas fa-plus-square"/>
                </div>
              </div>
            </div>
        )
      }
}


export default Compartir;
