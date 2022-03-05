import React from 'react';
import CustomerDetails from '../CustomerDetails/CustomerDetails';

import './CustomerComponent.css';


class CustomerComponent extends React.Component {
    render() {
        return <div className='customer-component' key='customer-component' >
            <CustomerDetails customerInfo={this.props.customerInfo} key='customer-details' />
        </div >
    }
}

export default CustomerComponent;