import React, { Component } from 'react';

import './CustomerDetails.css';

import Card from '../UI/Card';
import ShowCustomerData from './ShowCustomerData';

class CustomerDetails extends Component {
    render() {
        return (
            <Card className='cd-container'>
                <h6>Customer Info</h6>
                <ShowCustomerData customerInfo={this.props.customerInfo} />
            </Card>
        );
    }
}

// const CustomerDetails = (props) => {
//     return (
//         <Card className='cd-container'>
//             <h6>Customer Info</h6>
//             <ShowCustomerData customerInfo={props.customerInfo} />
//         </Card>
//     );
// }

export default CustomerDetails;