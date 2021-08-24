import React, { Component, } from 'react';
import { Navbar, Nav, Button, Form, } from 'react-bootstrap';
class DisplayHours extends Component {
    constructor(props) {
        super(props);
        this.state = {morning:"",afternoon:"",evening:""};
    }
    componentWillMount(){
        const {createHours } = this.props
        // this.setState({[morning[0].value]:createHours})

    }
    render() {
        const {createHours } = this.props
        return (
            <div style={{ flexBasis: "100%", flexDirection: "row", display: "flex", padding: "1%", flexWrap: "wrap", borderBottom: "2px solid #F0F0F0" }}>
                <div style={{ width: 200, flexBasis: "30%", justifyContent: "center", display: "flex", alignItems: "center", fontWeight: "bold" }}>
                    Opening hours:
                    </div>
                <div style={{ padding: "1%", flexBasis: "70%",  }}>
                    <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                        <div style={{ width: 100, padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD" }}>
                            Morning
                     </div>
                        <div>

                            <div>

                                <div style={{ margin: 2, color: "#C2BDBD", width: 320, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                    From 9:00
                             </div>
                                <div style={{ margin: 2, color: "#C2BDBD", width: 320, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                    To 9:00
                         </div>
                            </div>
                        </div>

                    </div>
                    <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                        <div style={{ width: 100, padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD" }}>
                            Afternoon
                     </div>
                        <div>
                            <div>
                                <div style={{ margin: 2, color: "#C2BDBD", width: 320, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                    From 9:00
                             </div>
                                <div style={{ margin: 2, color: "#C2BDBD", width: 320, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                    To 9:00
                         </div>
                            </div>
                        </div>

                    </div>
                    <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
                        <div style={{ width: 100, padding: "1%", alignItems: "center", display: "flex", color: "#C2BDBD" }}>
                            Evening
                     </div>
                        <div>
                            <div>
                                <div style={{ margin: 2, color: "#C2BDBD", width: 320, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                    From 9:00
                             </div>
                                <div style={{ margin: 2, color: "#C2BDBD", width: 320, padding: "1%", border: "2px solid", borderColor: "#D9D6D6", alignItems: "center", display: "flex", }}>
                                    To 9:00
                         </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayHours



