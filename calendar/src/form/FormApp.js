import React from 'react'


export default class FormApp extends React.Component {
        constructor(props){
            super(props);
           this.state = {
               fields: {},
               errors: {},
               approved:false,
               classApprove:"squaredOne"
           }
        }
        submitForm(){
           this.handleChange();
        }
        handleValidation(){
            let fields = this.state.fields;
            let errors = {};
            let formIsValid = true;

            //Name
            if(!fields["name"]){
               formIsValid = false;
               errors["name"] = "Cannot be empty";
            }
      
            if(typeof fields["name"] !== "undefined"){
               if(!fields["name"].match(/^[a-zA-Z]+$/)){
                  formIsValid = false;
                  errors["name"] = "Only letters";
               }        
            }
       
            //Email
            if(!fields["email"]){
               formIsValid = false;
               errors["email"] = "Cannot be empty";
            }
      
            if(typeof fields["email"] !== "undefined"){
               let lastAtPos = fields["email"].lastIndexOf('@');
               let lastDotPos = fields["email"].lastIndexOf('.');

               if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                  formIsValid = false;
                  errors["email"] = "Email is not valid";
                }
           }  

           this.setState({errors: errors});
           return formIsValid;
       }
        
       contactSubmit(e){
            e.preventDefault();

            if(this.handleValidation()){
               alert("Form submitted");
            }else{
               alert("Form has errors.")
            }
      
        }
    
        handleChange(field, e){         
            let fields = this.state.fields;
            fields[field] = e.target.value;        
            this.setState({fields});
        }
        checkButtonClick(e){
         const approved = !this.state.approved;
         const classApprove = approved? this.state.classApprove +' checked': this.state.classApprove.replace('checked','')
         this.setState({approved,classApprove});
         console.log(this.state);
        }
        render(){
            return (
                   <div className="form" >
                <p className="right">* שדה חובה</p>
                <div className="center">
                          <fieldset>
                              <div className="flex">
                            <div className="input">
                               <input  type="text"  placeholder="*שם פרטי" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                               <span >{this.state.errors["name"]}</span>
                            </div>

                        <div className="input">
                               <input  type="text"  placeholder="*שם משפחה" onChange={this.handleChange.bind(this, "last")} value={this.state.fields["last"]}/>
                               <span >{this.state.errors["last"]}</span>
                            </div>
                              </div>
                                <div className="flex">
                            <div className="input">
                             <input  type="text"  placeholder="*נייד" onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}/>
                             <span >{this.state.errors["phone"]}</span>
                                </div>
                              </div>
                                   <div className="flex">
                            <div className="input">
                             <input type="text"  placeholder="*מייל" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                             <span >{this.state.errors["email"]}</span>
                        </div>
                              </div>
                           <div className="flex">
                            <div className="input two-third">
                             <input  type="text"  placeholder="*רחוב" onChange={this.handleChange.bind(this, "address")} value={this.state.fields["address"]}/>
                             <span >{this.state.errors["address"]}</span>
                        </div>
                           <div className="input third">
                             <input  type="number"  placeholder="*מס' בית" onChange={this.handleChange.bind(this, "homeNumber")} value={this.state.fields["homeNumber"]}/>
                             <span >{this.state.errors["homeNumber"]}</span>
                        </div>
                              </div>
                               <div className="flex">
                            <div className="input">
                             <input  type="text"  placeholder="*עיר" onChange={this.handleChange.bind(this, "city")} value={this.state.fields["city"]}/>
                             <span >{this.state.errors["address"]}</span>
                        </div>
                           <div className="input">
                             <input  type="number"  placeholder="מיקוד" onChange={this.handleChange.bind(this, "zipcode")} value={this.state.fields["zipcode"]}/>
                             <span >{this.state.errors["homeNumber"]}</span>
                        </div>
                              </div>
                         </fieldset>
                         <div className="checkbox">
                           <div className={this.state.classApprove} onClick={this.checkButtonClick.bind(this)}>
                              <label ></label>
                           </div>
                           <span>אני מאשר/ת את קריאת התקנון ומסירת הפרטים למאגר הצרכנים של פארמלוג'ק, בהתאם למדיניות הפרטיות לקבלת הטבות, מבצעים ועדכונים מפארמלוג'יק ו/או מחברות הקשורות עימה עסקית, בכל אחד מערוצי התקשורת.</span>
                         </div>
                         <button role="button" className="submit-button" onClick={this.submitForm.bind(this)} > להרשמה וקבלת דוגמית  </button>
                      </div>
                </div>
          )
        }
    }
