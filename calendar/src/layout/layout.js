
import React from "react";
import FormApp from "./../form/FormApp"
import Logo from "./Logo";


export default class Layout extends React.Component {
        constructor(props){
            super(props);
           this.state = {
           }
        }
        componentDidMount(){
           const sent = false;
          this.setState({sent});
        }
        sendContact(){
          debugger;
          const sent = true;
          this.setState({sent});
        }
  render(){ 
  return (
      <div className="column relative">
      <Logo></Logo>
      <h3>לקבלת דוגמית חינם</h3>
      <h4>מלאו את הפרטים:</h4>
      <FormApp onChangeContact={this.sendContact.bind(this)}></FormApp>
      <div className={this.state.sent?"curtain show":"curtain"}  >
        <Logo></Logo>
        <div className="vi"></div>
        <h3>תודה על ההרשמה </h3>
        <h3>דוגמית בדרך אליך ...</h3>

        <div className="phaste-top"></div>
      </div>
      <div className={this.state.sent?"shadow show":"shadow"}></div>
      </div>
  );
} 
} ;
