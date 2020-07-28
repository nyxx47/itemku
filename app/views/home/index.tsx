import * as React from 'react'
import {
    ScrollView,
    View,
    Text,
    StatusBar,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Image,
    Animated
  } from 'react-native';

import Icon from '../../components/Icon'
import { IBanner, banners } from '../../mock/banner';
import { categories, ICategory } from '../../mock/categories'
import { products, IProduct } from '../../mock/products'

const width = Dimensions.get('window').width

interface IState{
    banners: IBanner[];
    categories: ICategory[];
    products: IProduct[];
}

class Home extends React.Component<{}, IState>{

    scrollX = new Animated.Value(0)
    
    render(){
        let position = Animated.divide(this.scrollX, width);
        return(
            <>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={{backgroundColor: '#ffffff'}}>
                <ImageBackground resizeMode="cover" source={require('../../assets/images/rounded-sq.png')} style={styles.header}>
                    <View style={styles.navbar}>
                        <View>
                            <Text style={styles.logo}>LOGO</Text>
                        </View>
                        <View style={styles.icons}>
                            <Icon name="search" style={styles.icon}/>
                            <Icon name="notification"/>
                        </View>
                    </View>
                    <View style={styles.banners} >
                        <ScrollView 
                        
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false} 
                        scrollEventThrottle={16}
                        pagingEnabled={true}
                        onScroll={Animated.event( 
                            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] 
                        )}>
                            {
                                banners.map((banner, i) => (
                                    <View style={styles.banner}>
                                        <Image source={banner.source} style={{width: '100%', height: '100%'}} resizeMode="cover" />
                                    </View>
                                ))
                            }
                            
                        </ScrollView>
                        <View
                        style={styles.dots} 
                        >
                        {banners.map((_, i) => { 
                            let opacity = position.interpolate({
                                inputRange: [i - 1, i, i + 1], 
                                outputRange: [0.3, 1, 0.3], 
                                extrapolate: 'clamp' 
                            });

                            let width = position.interpolate({
                                inputRange: [i - 1, i, i + 0], 
                                outputRange: [10, 30, 10], 
                                extrapolate: 'clamp' 
                            });
                            
                            return (
                            <Animated.View 
                                key={i} 
                                style={{ opacity, height: 8, width, backgroundColor: '#F38740', margin: 8, borderRadius: 5 }}
                            />
                            );
                        })}
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.categories}>
                    <ScrollView 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} >
                        {
                            categories.map((category, i) => (
                                <View style={styles.category} key={i}>
                                    <Text style={styles.categoryText}>{category.title}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
                <View style={styles.products}>
                    {
                        products.map(( product, i) => (
                            <View style={styles.product} key={i}>
                                <View style={{flexDirection: 'row', flex: 1}}>
                                    <View style={styles.productImageWrapper}>
                                        <Image source={product.image} resizeMode="contain" style={styles.productImage}/>
                                    </View>
                                    <View style={{justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={styles.productTitle}>{product.title}</Text>
                                            <Text style={styles.productPrice}>Rp. {product.price}</Text>
                                        </View>
                                        <Text style={styles.productSold}>{product.sold}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Icon name="heart"/>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 280,
        paddingBottom: 10
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 80
    },
    logo:{
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600'
    },
    icons: {
        flexDirection: 'row'
    },
    icon: {
        marginRight: 20
    },
    banners: {
        width: '100%',
        position: 'absolute',
        top: '50%'
    },
    banner: {
        width: width - 90,
        height: 180,
        marginLeft: 30,
        marginRight: 15,
        borderRadius: 10,
        overflow: "hidden"
    },
    dots: {
        flexDirection: 'row',
        position: 'relative',
        top: 15,
        left: 30
    },
    categories:{
        width: '100%',
        marginTop: 100
    },
    category: {
        marginLeft: 30,
        marginRight: 15
    },
    categoryText:{
        fontSize: 18,
        color: '#1E1E1E'
    },
    products: {
        width: '100%',
        height: '100%',
        marginTop: 30,
        paddingLeft: 30,
        paddingRight: 30
    },
    product: {
        backgroundColor: '#ffffff',
        width: '100%',
        borderRadius: 10,
        height: 100,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        shadowColor: "#656565",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 8,

        elevation: 8,
    },
    productImageWrapper: {
        width: 85,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 10,

    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    productTitle: {
        fontWeight: '600',
        fontSize: 18,
        color: '#1E1E1E'
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
        color: '#F38740'
    },
    productSold: {
        fontSize: 14,
        fontWeight: '500',
        color: '#767676'
    }
})

export default Home;