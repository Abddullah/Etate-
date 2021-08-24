import React, { Component, } from 'react';
import { Button, Form, Row, Col, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';


const options = [
    { value: 'Morning', label: 'Morning' },
    { value: 'Afternoon', label: 'Afternoon' },
    { value: 'Evening', label: 'Evening' },
  ];
  
class AddHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
                addHours:{ value: 'Morning', label: 'Morning'}
        }
    }
    render() {
        const {func } = this.props
        const {addHours,timeFrom,timeTo,} = this.state
        return (
            <div style={{ display: "flex", justifyContent: "center", margin: "2% " }}>
                <Form style={{}} >
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={4} style={{ alignItems: "center", display: "flex", color: "#C2BDBD", }}>
                            Timing
                         </Form.Label>
                        <Col sm={8}>
                        <Select
                        defaultInputValue={addHours.value}
                      value={addHours}
                      onChange={(value) => this.setState({ addHours: value })}
                      options={options}
                    />

                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={4} style={{ alignItems: "center", display: "flex", color: "#C2BDBD", }}>
                            From
                         </Form.Label>
                        <Col sm={8}>
                            <Form.Control onChange={(v)=>this.setState({timeFrom:v.target.value})} type="number" placeholder="From" />
                            {/* <Form.Control type="text" placeholder="Bussines addres" /> */}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={4} style={{ alignItems: "center", display: "flex", color: "#C2BDBD", }}>
                            To
                         </Form.Label>
                        <Col sm={8}>
                            <Form.Control onChange={(v)=>this.setState({timeTo:v.target.value})} type="number" placeholder="to" />
                        </Col>
                    </Form.Group>
                    <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                        <Button 
                        onClick={()=>{
                            timeFrom&&timeTo&&
                            func({addHours:addHours.value,timeFrom,timeTo})}}
                        variant="primary"  size="lg" block>
                            Add
                    </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default AddHours



