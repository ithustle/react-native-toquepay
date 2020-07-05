import React from "react";
import PaymentOverview from "./functions";
import RequestPayment from "./fn/RequestPayment";

export const PaymentComponent = props => {
    return <PaymentOverview {...props} />
}

export default RNToquePay = {
    PaymentRequest: async config => {
        return await RequestPayment(config);
    }
}