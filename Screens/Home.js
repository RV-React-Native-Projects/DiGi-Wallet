import React, { useState } from 'react';
import { ColorPropType, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons, images } from '../constants';

const Home = () => {
	const featuresData = [
		{
			id: 1,
			icon: icons.reload,
			color: COLORS.purple,
			backgroundColor: COLORS.lightpurple,
			description: 'Top Up'
		},
		{
			id: 2,
			icon: icons.send,
			color: COLORS.yellow,
			backgroundColor: COLORS.lightyellow,
			description: 'Transfer'
		},
		{
			id: 3,
			icon: icons.internet,
			color: COLORS.primary,
			backgroundColor: COLORS.lightGreen,
			description: 'Internet'
		},
		{
			id: 4,
			icon: icons.wallet,
			color: COLORS.red,
			backgroundColor: COLORS.lightRed,
			description: 'Wallet'
		},
		{
			id: 5,
			icon: icons.bill,
			color: COLORS.yellow,
			backgroundColor: COLORS.lightyellow,
			description: 'Bill'
		},
		{
			id: 6,
			icon: icons.game,
			color: COLORS.primary,
			backgroundColor: COLORS.lightGreen,
			description: 'Games'
		},
		{
			id: 7,
			icon: icons.phone,
			color: COLORS.red,
			backgroundColor: COLORS.lightRed,
			description: 'Mobile Prepaid'
		},
		{
			id: 8,
			icon: icons.more,
			color: COLORS.purple,
			backgroundColor: COLORS.lightpurple,
			description: 'More'
		}
	];

	const specialPromoData = [
		{
			id: 1,
			img: images.promoBanner,
			title: 'Bonus Cashback1',
			description: "Don't miss it. Grab it now!"
		},
		{
			id: 2,
			img: images.promoBanner,
			title: 'Bonus Cashback2',
			description: "Don't miss it. Grab it now!"
		},
		{
			id: 3,
			img: images.promoBanner,
			title: 'Bonus Cashback3',
			description: "Don't miss it. Grab it now!"
		},
		{
			id: 4,
			img: images.promoBanner,
			title: 'Bonus Cashback4',
			description: "Don't miss it. Grab it now!"
		}
	];

	const [ features, setFeatures ] = useState(featuresData);
	const [ specialPromos, setSpecialPromos ] = useState(specialPromoData);

	function renderHeader() {
		return (
			<View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 2 }}>
				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 30, fontWeight: '700' }}>Hello !</Text>
					<Text style={{ fontSize: 13, color: COLORS.gray }}>Mr. Chouhan</Text>
				</View>
				<View style={{ alignContent: 'center', justifyContent: 'center' }}>
					<TouchableOpacity
						activeOpacity={0.5}
						style={{
							height: 30,
							width: 30,
							backgroundColor: COLORS.lightGray,
							alignContent: 'center',
							justifyContent: 'center'
						}}
						onPress={() => console.log('Notification Pressed')}
					>
						<Image
							source={icons.bell}
							style={{
								height: 30,
								width: 30,
								tintColor: COLORS.secondary
							}}
						/>
						<View
							style={{
								position: 'absolute',
								height: 10,
								width: 10,
								top: -4,
								right: -4,
								backgroundColor: COLORS.red,
								borderRadius: 5
							}}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	function renderBanner() {
		return (
			<View
				style={{
					height: 120,
					borderRadius: 5
				}}
			>
				<Image
					source={images.banner}
					resizeMode="cover"
					style={{
						width: '100%',
						height: '100%',
						borderRadius: 5
					}}
				/>
			</View>
		);
	}
	function renderFeatures() {
		const Header = () => (
			<View
				style={{
					marginBottom: SIZES.padding * 2
				}}
			>
				<Text style={{ fontSize: 22, fontWeight: '700' }}>Features</Text>
			</View>
		);
		const renderItem = ({ item }) => (
			<TouchableOpacity
				style={{
					marginBottom: SIZES.padding * 2,
					width: 90,
					alignItems: 'center'
				}}
				onPress={() => console.log(item.description)}
			>
				<View
					style={{
						height: 50,
						width: 50,
						marginBottom: 5,
						borderRadius: 20,
						backgroundColor: item.backgroundColor,
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Image source={item.icon} resizeMode="contain" style={{ height: 20, width: 20, tintColor: item.color }} />
				</View>
				<Text style={{ textAlign: 'center', flexWrap: 'wrap', fontSize: 15, fontWeight: '600' }}>{item.description}</Text>
			</TouchableOpacity>
		);

		return (
			<FlatList
				ListHeaderComponent={Header}
				data={features}
				numColumns={4}
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				keyExtractor={(item) => `${item.id}`}
				renderItem={renderItem}
				style={{ marginTop: SIZES.padding * 2 }}
			/>
		);
	}

	function Promos() {
		const Header = () => (
			<View>
				{renderHeader()}
				{renderBanner()}
				{renderFeatures()}
				{renderPromoHeader()}
			</View>
		);

		const renderPromoHeader = () => (
			<View style={{ flexDirection: 'row', marginBottom: SIZES.padding }}>
				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 22, fontWeight: '700' }}>Special Promos</Text>
				</View>
				<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
					<Text style={{ color: COLORS.gray, fontSize: 15, fontWeight: '600' }}>View All</Text>
				</TouchableOpacity>
			</View>
		);

		const renderItem = ({ item }) => (
			<TouchableOpacity
				style={{ marginVertical: SIZES.base, width: SIZES.width / 2.5 }}
				onPress={() => console.log(item.title)}
			>
				<View
					style={{
						height: 80,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						backgroundColor: COLORS.primary
					}}
				>
					<Image
						source={images.promoBanner}
						resizeMode="cover"
						style={{
							width: '100%',
							height: '100%',
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20
						}}
					/>
				</View>
				<View
					style={{
						padding: SIZES.padding,
						backgroundColor: COLORS.lightGray,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20
					}}
				>
					<Text style={{ fontSize: 18 }}>{item.title}</Text>
					<Text style={{ fontSize: 12 }}>{item.description}</Text>
				</View>
			</TouchableOpacity>
		);
		return (
			<FlatList
				ListHeaderComponent={Header}
				contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				data={specialPromos}
				keyExtractor={(item) => `${item.id}`}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={<View style={{ marginBottom: 80 }} />}
			/>
		);
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			{Promos()}
			{/* {console.log(specialPromos)} */}
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({});
