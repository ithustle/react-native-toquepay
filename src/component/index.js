import React, { useState, useEffect } from "react";
import { SafeAreaView, Dimensions, View, Modal, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("screen");

export default PaymentOverview = props => {

    const {
        token,
        paymentInfo,
    } = props;

    const [ visible, setVisible] = useState(false);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if (token !== null) {
            setVisible(true);
        }

    }, [token])

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType={"slide"}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.background} />
            <SafeAreaView style={styles.contentDetails}>
                <View style={styles.header}>
                    <Text>ToquePay</Text>
                    <TouchableOpacity activeOpacity={.8} onPress={() => setVisible(false)}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyDetails}>
                    <View style={styles.contentTotalToPay}>
                        <Text style={styles.totalToPay}>{formatMoney(paymentInfo.amount)} Kz</Text>
                    </View>
                    <View style={styles.contentInfoPayment}>
                        <Text style={styles.title}>Método</Text>
                        <Text style={styles.subtitle}>Multicaixa Express</Text>
                    </View>
                    <View style={styles.contentInfoPayment}>
                        <Text style={styles.title}>Conta</Text>
                        <Text style={styles.subtitle}>{paymentInfo.mobilePhone}</Text>
                    </View>
                    <View style={styles.contentInfoPayment}>
                        <Text style={styles.title}>Comerciante</Text>
                        <Text style={styles.subtitle}>ToqueMedia, Lda</Text>
                    </View>
                </View>
                { loading ? <ActivityIndicator size="large" color="#29A9E1" /> : <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => makePayment(props, token) }
                    style={styles.buttonPay}
                >
                    <Text style={styles.buttonPayText}>Confirmar</Text>
                </TouchableOpacity>}
            </SafeAreaView>
        </Modal>

    )
}

const makePayment = (props, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch("http://192.168.0.127:4000/toquepay/payment",
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Merchant-Id': props.merchantId,
                        'Merchant-Key': props.merchantKey
                    },
                    method: "POST",
                    body: JSON.stringify({...props.paymentInfo, token })
                }
            );
            const result = await response.json();
            resolve(result);
        } catch (error) {
            reject(error)
        }
    })
}

const formatMoney = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: "#111",
        opacity: .7,
        position: "absolute",
        zIndex: 10,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    contentDetails: {
        height: height / 2,
        backgroundColor: "#eee",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 11
    },
    header: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bodyDetails: {
        backgroundColor: "#fff",
        padding: 12,
        flex: 1,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 10
    },
    buttonPay: {
        padding: 16,
        backgroundColor: "#29A9E1",
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        borderRadius: 10
    },
    buttonPayText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center"
    },
    contentTotalToPay: {
        padding: 16,
    },  
    totalToPay: {
        fontSize: 28,
        textAlign: "center",
    },
    contentInfoPayment: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 18,
        paddingBottom: 18,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    title: { color: "#777", textTransform: "uppercase" },
    subtitle: { textTransform: "uppercase" }
})