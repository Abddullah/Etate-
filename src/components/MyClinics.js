import React, { Component, } from 'react';
// import { Layout, Menu, Breadcrumb,Row, Col, } from 'antd';
import {
  Navbar, Nav, Button, Form, FormControl, Row, Col, Container, Layout, NavDropdown, Card, Jumbotron, DropdownButton, Dropdown,
  ListGroup,
} from 'react-bootstrap';
import AppHeader from './common/AppHeader';
import BreadCrum from './common/BreadCrum';
// import {} from 'bootstrap';
// import { ButtonToolbar,DropdownButton,Dropdown , Navbar,Nav,NavDropdown} from 'react-bootstrap';
import styles from './style.css';
import { FaLevelUpAlt, FaAngleDoubleRight, FaMapMarkerAlt, FaPhone, } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import LargeList from './common/largeList';
import { connect } from "react-redux";
var QRCode = require('qrcode.react');

// const { Header, Footer, Sider, Content } = Layout;

class MyClinics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch1: true, selectedList: ""
    };
  }


  handleSwitchChange = nr => () => {
    let switchNumber = `switch${nr}`;
    this.setState({
      [switchNumber]: !this.state[switchNumber]
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedList: nextProps.myClinics[0]
    })
  }
  render() {
    const { isLoader, isError, errorMessage, myClinics } = this.props
    const { selectedList } = this.state
    console.log(selectedList, "selectedList")
    return (
      <div style={{ backgroundColor: "#fff", }}>
        <AppHeader />
        <BreadCrum />

        {/* <center> */}
        <div style={{ display: "flex", flexBasis: "100%", flexWrap: "wrap", justifyContent: "center", marginTop: "3%", }}>
          <div style={{ flexBasis: "40%", justifyContent: "center", display: "flex", borderRight: "2px solid", borderRightColor: "#F4F6FA", }}>
            <LargeList heading="Clinics name" data={myClinics} func={(selectedList) => this.setState({ selectedList })} />

          </div>
          <div style={{ flexBasis: "60%", }}>
            <div style={{ flexBasis: "100%", flexDirection: "row", display: "flex", padding: "1%", flexWrap: "wrap", borderBottom: "2px solid", borderBottomColor: "#F4F6FA", }}>
              <div style={{ width: 200, flexBasis: "30%", justifyContent: "center", display: "flex", alignItems: "center", fontWeight: "bold" }}>
                <img width="200" src={selectedList && selectedList.ClinicImage} />
              </div>
              <div style={{ padding: "1%", flexBasis: "70%", }}>
                <div style={{ padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD", fontSize: 14 }}>
                  {selectedList && selectedList.etateId}
                </div>
                <div style={{ padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD", fontSize: 14 }}>
                  {selectedList && selectedList.BussinesName}

                </div>
                <div style={{ padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD", fontSize: 14 }}>
                  {selectedList && selectedList.BussinesAddres}

                </div>
                <div style={{ padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD", fontSize: 14 }}>
                  {selectedList && selectedList.BussinesAddres}

                </div>
                <div style={{ padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD", fontSize: 14 }}>
                  {selectedList && selectedList.bussinesCatogery}

                </div>
                <div style={{ padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD", fontSize: 14 }}>
                  {selectedList && selectedList.registrationNumber}

                </div>


              </div>
            </div>
            {/* <div style={{  width:275, background:"yellow"}}>
              <img width="50%" src={require('../assets/default.png')} />
            </div> */}
            <div style={{ flexBasis: "100%", flexDirection: "row", display: "flex", padding: "1%", flexWrap: "wrap", }}>
              <div style={{ width: 200, flexBasis: "30%", justifyContent: "center", display: "flex", alignItems: "center", fontWeight: "bold" }}>
              {selectedList&& <QRCode value={selectedList.clinicId+selectedList.BussinesName} />
     }  
        </div>
              <div style={{ padding: "1%", flexBasis: "70%", }}>
                <div style={{ fontWeight: "bold" }}>Opening hours:</div>
                {selectedList && selectedList.arrayOfMorning.length > 0 &&
                  <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                    <div style={{ width: 100, padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD" }}>
                      Morning
              </div>
                    <div>
                      {
                        selectedList&&selectedList.arrayOfMorning.map((v, i) => {
                          console.log(v,"pppppppppp")
                          return (
                            <>
                              <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                From {v.timeFrom}
                          </div>
                              <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                To {v.timeTo}
                          </div>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>
                }
                {selectedList && selectedList.arrayOfAfternoon.length > 0 &&
                  <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                    <div style={{ width: 100, padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD" }}>
                      Afternoon
              </div>
                    <div>
                      {selectedList && selectedList.arrayOfAfternoon &&
                        selectedList.arrayOfAfternoon.map((v, i) => {
                          return (
                            <>
                              <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                From 9:00
                          </div>
                              <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                To 9:00
                          </div>
                            </>
                          )
                        })
                      }

                    </div>
                  </div>
                }
                {selectedList && selectedList.arrayOfEvening.length > 0 &&
                  <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                    <div style={{ width: 100, padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD" }}>
                      Evening
              </div>
                    <div>
                      {
                        selectedList.arrayOfEvening.map((v, i) => {
                          return (
                            <>
                              <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                From 9:00
                          </div>
                              <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                To 9:00
                          </div>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>
                }
              </div>

            </div>
          </div>
        </div>
        {/* <div className="float-right" style={{ justifyContent: "flex-end", display: "flex", padding: "2%" }}>
          <Button variant="primary">Add</Button>
          <Button variant="primary">Next</Button>
        </div> */}
        {/* </center> */}

      </div>
    )
  }
}


let mapStateToProps = state => {
  return {
    isLoader: state.root.isLoader,
    isError: state.root.isError,
    errorMessage: state.root.errorMessage,
    myClinics: state.root.myClinics,
    //   errorInStore: state.root.error,
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    // errorCall: (errorMessage) => {
    //   dispatch(errorCall(errorMessage)
    //   ) },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(MyClinics);






