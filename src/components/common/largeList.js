import React, { Component, } from 'react';
import { Button, Form, Row, Col, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { MDBIcon, } from 'mdbreact';
import { connect } from "react-redux";
import { errorCall,loaderCall, createClinic,deleteClinicOrDoc, } from '../../store/action/action';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class LargeList extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedList: 0 };
  }
  render() {
    const { heading, data, func, deleteIcon,deleteClinicOrDoc,collection } = this.props
    const { selectedList } = this.state
    console.log(data, "ddddddd")
    return (
      <div style={{ background: "#F0F0F0", height: '550px',minWidth: 300, padding: "3%" }}>
        <h3 style={{ fontWeight: "bold", display: "flex", justifyContent: "center" }}>
          {heading}:
            </h3>
        <div style={{ height: '400px', background: "#F0F0F0", overflowX: 'scroll', }} >
          <ListGroup>
            {data && data.map((v, i) => {
              console.log(v, "vvvvvvvvvv")
              return (
                <ListGroup.Item style={{
                  webkitBoxShadow: "3px 3px 3px #9E9E9E",
                  mozBoxShadow: "3px 3px 3px #9E9E9E",
                  boxShadow: "3px 3px 3px #9E9E9E", flexDirection: "row", display: "flex", width: 300, alignItems: "center"
                }}
                  onClick={() => {
                    if(func){
                      this.setState({ selectedList: i })
                      func(v)
                    }

                  }}>
                  {(v.ClinicImage||v.doctorImage)&&<div style={{ display: "flex", alignItems: "center" }}>
                    <img style={{ width: 50, }} src={v.ClinicImage||v.doctorImage} />
                  </div>}
                  <div style={{ marginLeft: 10 }}>
                    <div style={{ fontWeight: "bold", color: "#8C8888" }}>
                      {v.BussinesName||v.fullName}
                    </div>
                    <div style={{ fontSize: 11, color: "#8C8888" }}>
                      {v.BussinesAddres||v.bussinesAddress||v.MobileNumber}

                    </div>
                  </div>
                  <div style={{ justifyContent: "flex-end", display: "flex", position: "absolute", right: 5 }}>
                    {selectedList === i ?
                      <MDBIcon far icon={deleteIcon ? deleteIcon : "eye"} style={{ color:deleteIcon?"red": "green" }}
                      onClick={()=>deleteIcon&&deleteClinicOrDoc(v.AdmininstratorId||v.clinicId||v.DoctorId,collection)}
                      /> :
                      <MDBIcon far icon={deleteIcon ? deleteIcon : "eye"} style={{ color:deleteIcon?"red": null }}
                      onClick={()=>deleteIcon&&deleteClinicOrDoc(v.AdmininstratorId||v.clinicId||v.DoctorId,collection)}
                       />
                    }
                  </div>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </div>
        <div className style={{}}>
          <Link to="/home"><Button variant="link">Back</Button></Link>
        </div>
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
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    deleteClinicOrDoc: (clinicId,collection) => {
      dispatch(deleteClinicOrDoc(clinicId,collection)
      )
    },
  
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(LargeList);





