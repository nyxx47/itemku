import * as React from 'react'
import {
    ScrollView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    Dimensions,
    Image,
    Animated,
    LogBox
  } from 'react-native';

import Icon from '../../components/Icon'
import { IBanner, banners } from '../../mock/banner';
import { products, IProduct } from '../../mock/products'


LogBox.ignoreAllLogs();

import Categories from '../../components/categories'

import {styles} from './styles';

const width = Dimensions.get('window').width

interface IState{
    banners: IBanner[];
    products: IProduct[];
}

class Home extends React.Component<{}, IState>{

    opacity = new Animated.Value(0)
    scrollX = new Animated.Value(0)
    duration = 1200;
    
    fadeIn = () => {
        Animated.timing(this.opacity, {
            toValue: 1,
            duration: this.duration
        }).start()
    }
    
    
    public componentDidMount(){
        this.fadeIn()
    }
    

    render(){
        let position = Animated.divide(this.scrollX, width);
        
        const animatedStyles = [
            styles.product,
            {
              opacity: this.opacity
            }
        ];

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
                                    <View style={styles.banner} key={i}>
                                        <Image source={banner.source} style={{width: '100%', height: '100%'}} resizeMode="cover" />
                                    </View>
                                ))
                            }
                            
                        </ScrollView>
                        <View style={styles.dots}>
                            {
                                banners.map((_, i) => { 
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
                                })
                            }
                        </View>
                    </View>
                </ImageBackground>
           
                <View style={{marginTop: 100, marginBottom: 50}} >
                    <Categories>
                        {
                            products.map(( product, i) => (
                            <Categories.Category name={product.name} heading={product.title} initialActive={product.isActive}>
                                <View style={{marginLeft: 30, marginRight: 30, marginTop: 30}}>
                                    
                                        {
                                            product.items.map(( item, i) => (
                                                <Animated.View style={animatedStyles} key={i}>
                                                    <View style={{flexDirection: 'row', flex: 1}}>
                                                        <View style={styles.productImageWrapper}>
                                                            <Image source={item.image} resizeMode="contain" style={styles.productImage}/>
                                                        </View>
                                                        <View style={{justifyContent: 'space-between'}}>
                                                            <View>
                                                                <Text style={styles.productTitle}>{item.title}</Text>
                                                                <Text style={styles.productPrice}>Rp. {item.price}</Text>
                                                            </View>
                                                            <Text style={styles.productSold}>{item.sold}</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <Icon name="heart"/>
                                                    </View>
                                                </Animated.View>
                                            ))
                                        }
                                                             
                                </View>
                            </Categories.Category>

                            ))
                        }
                    </Categories>
                </View>
                
            </ScrollView>
            </>
        )
    }
}



export default Home;