import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import RNToquePay, { PaymentComponent } from "react-native-toquepay";

const product = require("./res/apple.png");
const desc = "Maçã vermelha do Norte.";
const price = 250;
const phoneNumberUser = "111177777";

const App = props => {

	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (token) {
			setLoading(false);
		}
	}, [token]);

	return (
		<SafeAreaView style={styles.wrap}>
			<View style={styles.contentProduct}>
				<Image source={product} style={styles.product} />
			</View>
			<View style={styles.contentDetails}>
				<Text style={{ fontSize: 18 }}>{desc}</Text>
				<Text style={{ fontSize: 18 }}>Preço: {price} Kz</Text>
			</View>
			{
				loading ? <ActivityIndicator style={styles.contentButton} size="large" color="#2c6cb3" /> : <View style={styles.contentButton}>
					<TouchableOpacity
						activeOpacity={.8}
						onPress={() => {
							pay(setToken);
							setLoading(true);
						}}
						style={styles.buttonBuy}
					>
						<Text style={{ color: "#fff", fontSize: 18 }}>Comprar</Text>
					</TouchableOpacity>
				</View>
			}
			<PaymentComponent
				token={token}
				merchantId={"2310"}
				merchantKey={"1234"}
				paymentInfo={{
					amount: price,
					mobilePhone: phoneNumberUser
				}}
				onPaymentAccepted={data => console.log("Recebi: ", data)}
			/>
		</SafeAreaView>
	)
}

const pay = async setToken => {
	const tk = await RNToquePay.PaymentRequest({
		merchantId: "2310",
		merchantKey: "1234"
	});

	setToken(tk);
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		padding: 16,
	},
	contentProduct: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	contentDetails: {
		marginBottom: 16,
		alignItems: "center"
	},
	product: {
		width: 184,
		height: 184
	},
	contentButton: {
		flex: 1,
	},
	buttonBuy: {
		padding: 20,
		backgroundColor: "#2c6cb3",
		alignItems: "center",
		borderRadius: 12
	}
});

export default App;