export default RequestPayment = config => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch("http://192.168.15.30:4000/toquepay/merchant/token",
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Merchant-Id': config.merchantId,
                        'Merchant-Key': config.merchantKey
                    },
                    method: "GET",
                }
            );
            const result = await response.json();
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};