import React from 'react';
import { StatsAgent } from '../../agent';
import './Stats.css';


class Stats extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          nUsuarios: 0,
          nContraseñas: 0,
          nCat: 0,
          nMsgs: 0
      };
      this.listar_stats();
    }

    async listar_stats(){
      /* Pedimos stats a la API */
      let x = await StatsAgent.list();
      //console.log(x);
      if (x.status === 200){
        this.setState({ nUsuarios: x.nUsuarios,
                        nContraseñas: x.nContraseñas,
                        nCat: x.nCat,
                        nMsgs: x.nMsgs });
      }else{
        this.setState({ nUsuarios: -1 });
      }
    }

    render(){
      return(
        <div className="stats">
          <div className="row">
            <div className="col-group">
              <p>Usuarios registrados</p>
              <p>{this.state.nUsuarios}</p>
            </div>
            <div className="col-group">
              <p>Contraseñas guardadas</p>
              <p>{this.state.nContraseñas}</p>
            </div>
            <div className="col-group">
              <p>Categorías creadas</p>
              <p>{this.state.nCat}</p>
            </div>
            <div className="col-group">
              <p>Mensajes enviados</p>
              <p>{this.state.nMsgs}</p>
            </div>
          </div>
        </div>
      )
    }

}

export default Stats;
