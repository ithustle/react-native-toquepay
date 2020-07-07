import React from "react";
import PaymentOverview from "./component";
import RequestPayment from "./functions";

export const PaymentComponent = props => {
    return <PaymentOverview {...props} />
}

export default RNToquePay = {
    PaymentRequest: async config => {
        return await RequestPayment(config);
    }
};