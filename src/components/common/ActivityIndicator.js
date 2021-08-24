import React, { Component, } from 'react';
import { Button, Spinner } from 'react-bootstrap';
class ActivityIndicator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {label,type,placeholder,defaultValue,colorOfLoader } = this.props
        return (
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
           style={{color:colorOfLoader}}
            />
        )
    }
}

export default ActivityIndicator



