import React, { Component, } from 'react';
// import { Layout, Menu, Breadcrumb,Row, Col, } from 'antd';
import {
  Navbar, Nav, Button, Form, FormControl, Row, Col, Container, Layout, NavDropdown, Card, Jumbotron, DropdownButton, Dropdown,
  ListGroup,
} from 'react-bootstrap';
import AppHeader from './common/AppHeader';
// import {} from 'bootstrap';
// import { ButtonToolbar,DropdownButton,Dropdown , Navbar,Nav,NavDropdown} from 'react-bootstrap';
import styles from './style.css';
import { FaLevelUpAlt, FaAngleDoubleRight, FaMapMarkerAlt, FaPhone, } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';

// const { Header, Footer, Sider, Content } = Layout;

class OpeningHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch1: true,
    };
  }


  handleSwitchChange = nr => () => {
    let switchNumber = `switch${nr}`;
    this.setState({
      [switchNumber]: !this.state[switchNumber]
    });
  }
  render() {
    return (
      <div style={{ backgroundColor: "#fff", }}>
        <AppHeader />

        <center>
          <div style={{ marginTop: "3%" }}>
            <a href={"#"}>   <span style={{ fontWeight: "bold", color: "black" }}>1. Account details</span></a>
            <a href={"#"}>   <span style={{ marginLeft: "5%", fontWeight: "bold", color: "black" }}>2. Business address</span></a>
            <a href={"#"}>   <span style={{ marginLeft: "5%", fontWeight: "bold", color: "black" }}>3. Opening hours</span></a>
            <a href={"#"}>   <span style={{ marginLeft: "5%", fontWeight: "bold", color: "black" }}>4. Doctors</span></a>
            <a href={"#"}>   <span style={{ marginLeft: "5%", fontWeight: "bold", color: "black" }}>5. Booking administrator</span></a>
          </div>
        </center>
        {/* <center> */}
        <div style={{ display: "flex", flexBasis: "100%", marginTop: "3%", }}>
          <div style={{ flexBasis: "40%", justifyContent: "center", display: "flex", borderRight: "2px solid", borderRightColor: "#F4F6FA" }}>
            <div>
              <h3 style={{ fontWeight: "bold", display: "flex", justifyContent: "center" }}>
                Business name:
        </h3>
              <div >
                <Button variant="outline-primary"  >Remove</Button>
              </div>
            </div>
          </div>
          <div style={{ flexBasis: "60%", }}>
            <div style={{ flexBasis: "100%", flexDirection: "row", display: "flex", padding: "1%", flexWrap: "wrap", borderBottom: "2px solid", borderBottomColor: "#D9D6D6", }}>
              <div style={{ width: 200, flexBasis: "30%", justifyContent: "center", display: "flex", alignItems: "center", fontWeight: "bold" }}>
                Opening hours:
            </div>
              <div style={{ padding: "1%", flexBasis: "70%", }}>
                <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                  <div style={{ width: 100, padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD" }}>
                    Morning
              </div>
                  <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                    From 9:00
              </div>
                  <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                    To 9:00
              </div>
                </div>
                <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                  <div style={{ width: 100, padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD" }}>
                    Afternoon
              </div>
                  <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                    From 9:00
              </div>
                  <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                    To 9:00
              </div>
                </div>
                <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                  <div style={{ width: 100, padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD" }}>
                    Evening
              </div>
                  <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                    From 9:00
              </div>
                  <div style={{ margin: 2, color: "#C2BDBD", width: 220, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                    To 9:00
              </div>
                </div>
              </div>
            </div>
            {/* <div style={{  width:275, background:"yellow"}}>
              <img width="50%" src={require('../assets/default.png')} />
            </div> */}
            <div style={{ display: "flex", justifyContent: "center", margin: "2% " }}>
              <Form style={{}} >
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} style={{ alignItems: "center", display: "flex", color: "#C2BDBD", }}>
                    Timing
                         </Form.Label>
                  <Col sm={8}>

                    <DropdownButton
                      title={"Morning"}
                      variant={"Secondary"}
                      id={`dropdown-variants-Secondary`}
                      key={"Secondary"}
                    >
                      <Dropdown.Item eventKey="1">Morning</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Afternoon</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Evening</Dropdown.Item>

                    </DropdownButton>


                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} style={{ alignItems: "center", display: "flex", color: "#C2BDBD", }}>
                    From
                         </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="From" />
                    {/* <Form.Control type="text" placeholder="Bussines addres" /> */}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} style={{ alignItems: "center", display: "flex", color: "#C2BDBD", }}>
                    To
                         </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="number" placeholder="to" />
                  </Col>
                </Form.Group>
                <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                  <Button variant="primary" type="submit" size="lg" block>
                    Add
                    </Button>
                </div>
              </Form>
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "2%", flexWrap: "wrap" }}>
              <div style={{ width: 220, height: 220, margin: "2%", color: "#C2BDBD", }}>
                <div style={{ fontSize: 25 }}>

                  Morning
               </div>
                <div style={{
                  border: "2px solid", borderColor: "#D9D6D6", width: 220, height: 190,
                  borderRadius: 10,
                  webkitBoxShadow: "3px 3px 3px #9E9E9E",
                  mozBoxShadow: "3px 3px 3px #9E9E9E",
                  boxShadow: "3px 3px 3px #9E9E9E",
                }}>
                  <div style={{ padding: 10, }}>
                    9:00 to 12:00  <span><MDBIcon far icon="trash-alt" className="float-right" /></span>
                  </div>
                  <div style={{ padding: 10, }}>
                    9:00 to 12:00<span><MDBIcon far icon="trash-alt" className="float-right" /></span>
                  </div>
                  <div style={{ padding: 10, }}>
                    9:00 to 12:00<span><MDBIcon far icon="trash-alt" className="float-right" /></span>
                  </div>
                </div>
              </div>
              <div style={{ width: 220, height: 220, margin: "2%", color: "#C2BDBD", }}>
                <div style={{ fontSize: 25 }}>
                  Afternoon
               </div>
                <div style={{
                  border: "2px solid", borderColor: "#D9D6D6", width: 220, height: 190,
                  borderRadius: 10,
                  webkitBoxShadow: "3px 3px 3px #9E9E9E",
                  mozBoxShadow: "3px 3px 3px #9E9E9E",
                  boxShadow: "3px 3px 3px #9E9E9E",
                }}>
                  <div style={{ padding: 10, }}>
                    9:00 to 12:00  <span><MDBIcon far icon="trash-alt" className="float-right" /></span>
                  </div>
                  <div style={{ padding: 10, }}>
                    9:00 to 12:00<span><MDBIcon far icon="trash-alt" className="float-right" /></span>
                  </div>
                  <div style={{ padding: 10, }}>
                    9:00 to 12:00<span><MDBIcon far icon="trash-alt" className="float-right" /></span>
                  </div>
                </div>
              </div>
              <div style={{ width: 220, height: 220, margin: "2%", color: "#C2BDBD", }}>
                <div style={{ fontSize: 25 }}>

                  Evening
               </div>
                <div style={{
                  border: "2px solid", borderColor: "#D9D6D6", width: 220, height: 190,
                  borderRadius: 10,
                  webkitBoxShadow: "3px 3px 3px #9E9E9E",
                  mozBoxShadow: "3px 3px 3px #9E9E9E",
                  boxShadow: "3px 3px 3px #9E9E9E",
                }}>
                  <div style={{ padding: 10, }}>
                    9:00 to 12:00  <span><MDBIcon far icon="trash-alt" className="float-right" /></span>
                  </div>
                  <div style={{ padding: 10, }}>
                    9:00 to 12:00<span><MDBIcon far icon="trash-alt" className="float-right" /></span>
                  </div>
                  <div style={{ padding: 10, }}>
                    9:00 to 12:00<span><MDBIcon far icon="trash-alt" className="float-right" /></span>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
        <div className="float-right" style={{justifyContent:"flex-end",display:"flex",padding:"2%"}}>
                    <Button variant="primary">Add</Button>
                    <Button variant="primary">Next</Button>
                  </div>
        {/* </center> */}

      </div>
    )
  }
}

export default OpeningHours



