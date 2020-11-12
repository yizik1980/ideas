import React from 'react'


export default class FormApp extends React.Component {
        constructor(props){
            super(props);
            console.log(props);
           this.state = {
               fields: {},
               placeHolderColor:{},
               errors: {
               },
               approved:false,
               classApprove:"squaredOne"
           }
        }
        
        componentDidMount(){
           const errors = {
                  name:"*שם פרטי",
                  last:"*שם משפחה",
                  email:"*אימייל",
                  phone:"*נייד",
                  address:"*רחוב",
                  homeNumber:"*מס' בית",
                  city:"*עיר"
               }
           this.setState({errors});
        }
    
        
       contactSubmit(e){
            e.preventDefault();
            let flag = true;
            let errors = {};
            let placeHolderColor = {};
            if(!this.state.fields.name){
               errors.name = ' השם חסר *';
               placeHolderColor.name = true;
               flag = false;
            }
             if(!this.state.fields.last){
               errors.last = ' משפחה חסר *';
               placeHolderColor.last = true;
               flag = false;
            }
            if(!this.state.fields.phone){
               errors.phone = ' נייד חסר *';
               placeHolderColor.phone = true;
               flag = false;
            }
             if(!this.state.fields.address){
               errors.address = ' השם חסר *';
               placeHolderColor.address = true;
               flag = false;
            }
            if(!this.state.fields.email){
               errors.email = 'פרטי מייל חסר *';
               placeHolderColor.email = true;
               flag = false;
            }
            if(!this.state.fields.city){
               errors.city = 'פרטי עיר חסר *';
               placeHolderColor.city = true;
               flag = false;
            }
             if(!this.state.fields.homeNumber){
               errors.homeNumber = 'פרטי מספר בית חסר *';
               placeHolderColor.homeNumber = true;
               flag = false;
            }
             if(!this.state.approved){
               errors.approved = 'לא אישרת  *';
               flag = false;
            }
            this.setState({errors,placeHolderColor});
            if(flag){
               this.props.onChangeContact();
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
        }
        render(){
            return (
                   <div className="form" >
                <p className="right">* שדה חובה</p>
                <div className="center">
                          <fieldset>
                              <div className="flex">
                            <div className="input">
                               <input  type="text" className={this.state.placeHolderColor.name?"red":""}  placeholder={this.state.errors.name}  onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                            </div>

                        <div className="input">
                               <input  type="text" className={this.state.placeHolderColor.last?"red":""}   placeholder={this.state.errors.last} onChange={this.handleChange.bind(this, "last")} value={this.state.fields["last"]}/>
                            </div>
                              </div>
                                <div className="flex">
                            <div className="input">
                             <input  type="text" className={this.state.placeHolderColor.phone?"red":""}   placeholder={this.state.errors.phone} onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}/>

                                </div>
                              </div>
                                   <div className="flex">
                            <div className="input">
                             <input type="text" className={this.state.placeHolderColor.email?"red":""}   placeholder={this.state.errors.email} onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>

                        </div>
                              </div>
                           <div className="flex">
                            <div className="input two-third">
                             <input  type="text" className={this.state.placeHolderColor.address?"red":""}   placeholder={this.state.errors.address} onChange={this.handleChange.bind(this, "address")} value={this.state.fields["address"]}/>
                        </div>
                           <div className="input third">
                             <input  type="number" className={this.state.placeHolderColor.homeNumber?"red":""}   placeholder={this.state.errors.homeNumber} onChange={this.handleChange.bind(this, "homeNumber")} value={this.state.fields["homeNumber"]}/>
                        </div>
                              </div>
                               <div className="flex">
                            <div className="input">
                             <input  type="text" className={this.state.placeHolderColor.city?"red":""}    placeholder={this.state.errors.city} onChange={this.handleChange.bind(this, "city")} value={this.state.fields["city"]}/>
                        </div>
                           <div className="input">
                             <input  type="number"  placeholder="מיקוד" onChange={this.handleChange.bind(this, "zipcode")} value={this.state.fields["zipcode"]}/>
                        </div>
                              </div>
                         </fieldset>
                         <div  className={this.state.errors.approved && !this.state.approved ? "checkbox red":"checkbox"}  >
                           <div className={this.state.classApprove} onClick={this.checkButtonClick.bind(this)}>
                              <label ></label>
                           </div>
                           <span>אני מאשר/ת את קריאת התקנון ומסירת הפרטים למאגר הצרכנים של פארמלוג'ק, בהתאם למדיניות הפרטיות לקבלת הטבות, מבצעים ועדכונים מפארמלוג'יק ו/או מחברות הקשורות עימה עסקית, בכל אחד מערוצי התקשורת.</span>
                         </div>
                         <button role="button"  className="submit-button" onClick={this.contactSubmit.bind(this)} > להרשמה וקבלת דוגמית  </button>
                      </div>
                </div>
          )
        }
    }
