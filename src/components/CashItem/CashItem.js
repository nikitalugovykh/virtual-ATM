import React from 'react';
import { connect } from 'react-redux';

const CashItem = ({item, count}) => {

    return(
        <div>{item}: <span><b>{count}</b></span></div>
    )
}

const mapStateToProps = (props) => {
    return {
        givenMoney: props.givenMoney
    }
}

export default connect(mapStateToProps, null)(CashItem)