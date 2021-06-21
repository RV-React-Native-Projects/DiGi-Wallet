import React, { useState, useEffect } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Modal,
	FlatList,
	TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { COLORS, SIZES, icons, images } from '../constants';

const SignUp = ({ navigation }) => {
	const [ showPassword, setShowPassword ] = useState(false);
	const [ selectedArea, setSelectedArea ] = useState(null);
	const [ modelVisible, setModelVisible ] = useState(false);
	const [ areas, setAreas ] = useState([]);

	useEffect(() => {
		fetch('https://restcountries.eu/rest/v2/all').then((response) => response.json()).then((data) => {
			let AreaData = data.map((item) => {
				return {
					code: item.alpha2Code,
					name: item.name,
					callingCode: `${item.callingCodes[0]}`,
					flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`
				};
			});
			setAreas(AreaData);

			if (AreaData.length > 0) {
				let defaultdata = AreaData.filter((a) => a.code == 'IN');

				if (defaultdata.length > 0) {
					setSelectedArea(defaultdata[0]);
				}
			}
		});
	}, []);

	function Header() {
		return (
			<TouchableOpacity
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginTop: SIZES.padding * 3,
					paddingHorizontal: SIZES.padding * 2
				}}
				onPress={() => console.log('SignUp Pressed')}
			>
				<Image source={icons.back} resizeMode="contain" style={{ width: 20, height: 20, tintColor: COLORS.white }} />
				<Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, fontSize: 20 }}>Sign Up</Text>
			</TouchableOpacity>
		);
	}

	function Logo() {
		return (
			<View style={{ marginTop: SIZES.padding * 5, height: 100, alignItems: 'center', justifyContent: 'center' }}>
				<Image source={images.wallieLogo} resizeMode="contain" style={{ width: '60%' }} />
			</View>
		);
	}

	function Form() {
		return (
			<View style={{ marginTop: SIZES.padding * 3, marginHorizontal: SIZES.padding * 3 }}>
				{/* ===== Full Name ======= */}
				<View style={{ marginTop: SIZES.padding * 3 }}>
					<Text style={{ color: COLORS.lightGreen, fontSize: 15 }}>Full Name</Text>
					<TextInput
						placeholder="Enter Full Name"
						placeholderTextColor={COLORS.white}
						selectionColor={COLORS.white}
						keyboardType="name-phone-pad"
						style={{
							marginVertical: SIZES.padding,
							borderBottomColor: COLORS.white,
							borderBottomWidth: 1,
							height: 40,
							color: COLORS.white,
							fontSize: 17
						}}
					/>
				</View>
				{/* ===== Phone Number ======= */}
				<View style={{ marginTop: SIZES.padding }}>
					<Text style={{ color: COLORS.lightGreen, fontSize: 15 }}>Phone Number</Text>
					{/* ============ Countery Code =========== */}
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity
							style={{
								width: 100,
								height: 50,
								marginHorizontal: 5,
								borderBottomColor: COLORS.white,
								borderBottomWidth: 1,
								flexDirection: 'row',
								fontSize: 17
							}}
							onPress={() => setModelVisible(true)}
						>
							<View style={{ justifyContent: 'center' }}>
								<Image source={icons.down} style={{ width: 10, height: 10, tintColor: COLORS.white }} />
							</View>
							<View style={{ justifyContent: 'center', marginLeft: 5 }}>
								<Image
									source={{ uri: selectedArea && selectedArea.flag }}
									resizeMode="contain"
									style={{ width: 30, height: 30 }}
								/>
							</View>
							<View style={{ justifyContent: 'center', marginLeft: 5 }}>
								<Text style={{ color: COLORS.white, fontSize: 17 }}>{selectedArea && `+ ${selectedArea.callingCode}`}</Text>
							</View>
						</TouchableOpacity>
						<TextInput
							style={{
								flex: 1,
								marginVertical: SIZES.padding,
								borderBottomColor: COLORS.white,
								borderBottomWidth: 1,
								height: 40,
								color: COLORS.white,
								fontSize: 17
							}}
							placeholder="Enter Phone Number"
							placeholderTextColor={COLORS.white}
							selectionColor={COLORS.white}
							keyboardType="number-pad"
							maxLength={10}
						/>
					</View>
				</View>
				{/* ======= Password =========== */}
				<View style={{ marginTop: SIZES.padding }}>
					<Text style={{ color: COLORS.lightGreen, fontSize: 15 }}>Password</Text>
					<TextInput
						style={{
							marginVertical: SIZES.padding,
							borderBottomColor: COLORS.white,
							borderBottomWidth: 1,
							height: 40,
							color: COLORS.white,
							fontSize: 17
						}}
						placeholder="Pass-word"
						placeholderTextColor={COLORS.white}
						selectionColor={COLORS.white}
						keyboardType="default"
						secureTextEntry={!showPassword}
					/>
					<TouchableOpacity
						activeOpacity={0.5}
						style={{ position: 'absolute', right: 0, bottom: 10, height: 30, width: 30 }}
						onPress={() => setShowPassword(!showPassword)}
					>
						<Image
							source={showPassword ? icons.disable_eye : icons.eye}
							style={{ height: 20, width: 20, tintColor: COLORS.white }}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	function Button() {
		return (
			<View style={{ margin: SIZES.padding * 3 }}>
				<TouchableOpacity
					activeOpacity={0.5}
					style={{
						height: 60,
						backgroundColor: COLORS.black,
						borderRadius: SIZES.radius / 2,
						alignItems: 'center',
						justifyContent: 'center'
					}}
					onPress={() => navigation.navigate('Home')}
				>
					<Text style={{ color: COLORS.white, fontSize: 20 }}>Continue</Text>
				</TouchableOpacity>
			</View>
		);
	}

	function AreaCodeModel() {
		const renderItem = ({ item }) => {
			return (
				<TouchableOpacity
					style={{ padding: SIZES.padding, flexDirection: 'row' }}
					onPress={() => {
						setSelectedArea(item);
						setModelVisible(false);
					}}
				>
					<Image source={{ uri: item.flag }} style={{ width: 30, height: 30, marginRight: 10 }} />
					<Text style={{ fontSize: 17 }}>{item.name} </Text>
					<Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.red }}>
						{' + '} {item.callingCode}
					</Text>
				</TouchableOpacity>
			);
		};
		return (
			<Modal animationType="slide" transparent={true} visible={modelVisible}>
				<TouchableWithoutFeedback onPress={() => setModelVisible(false)}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<View
							style={{ height: 500, width: SIZES.width * 0.9, backgroundColor: COLORS.lightGreen, borderRadius: SIZES.radius }}
						>
							<FlatList
								data={areas}
								renderItem={renderItem}
								keyExtractor={(item) => item.code}
								showsVerticalScrollIndicator={false}
								style={{ padding: SIZES.padding * 2, marginBottom: SIZES.padding * 2 }}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={COLORS.emerald} style="light" />
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'} style={{ flex: 1 }}>
				<LinearGradient colors={[ COLORS.lime, COLORS.emerald ]} style={{ flex: 1 }}>
					<ScrollView>
						{Header()}
						{Logo()}
						{Form()}
						{Button()}
					</ScrollView>
				</LinearGradient>
				{AreaCodeModel()}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SignUp;

const styles = StyleSheet.create({});
