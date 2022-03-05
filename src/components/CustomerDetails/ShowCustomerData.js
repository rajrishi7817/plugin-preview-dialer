import React from 'react';
import './ShowCustomerData.css';

const ShowCustomerData = (props) => {

    return (
        <div>
            <div className='show-customer-data__container'>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Name</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.name}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Date Of Birth</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.dob}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Address</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.addr}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>State</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.addr_State}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>ZipCode</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.addr_ZipCode}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Email</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.email}</div>
                    </div>
                </div>
            </div >
        </div>
    );

}

export default ShowCustomerData;