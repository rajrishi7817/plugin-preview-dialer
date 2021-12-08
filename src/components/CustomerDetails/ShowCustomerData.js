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
                        <div><b>:</b>&nbsp;{props.customerInfo.name}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Date Of Birth</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.dob}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Address</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.addr}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>State</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.addr_State}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>ZipCode</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.addr_ZipCode}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Email</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.email}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Client Name</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.client_NM}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Guarantor Name</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.guarantor_Name}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Current Display</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.curr_DISP}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Hospital Code</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.HOSP_SVC_CD}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>RTE Balance</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.RTE_BAL}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>CBR Score</div>
                    </div>
                    <div className='data-value'>
                        <div><b>:</b>&nbsp;{props.customerInfo.CBR_SCORE}</div>
                    </div>
                </div>
            </div >
        </div>
    );

}

export default ShowCustomerData;