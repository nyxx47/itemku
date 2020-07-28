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

const width = Dimensions.get('window').width

interface IState{
    banners: IBanner[];
}

class Home extends React.Component<{}, IState>{

    scrollX = new Animated.Value(0)
    render(){
        let position = Animated.divide(this.scrollX, width);
        return(
            <>
            <StatusBar barStyle="dark-content" />
            <ScrollView>
                <ImageBackground resizeMode="stretch" source={require('../../assets/images/rounded-sq.png')} style={styles.header}>
                    <View style={styles.navbar}>
                        <View>
                            <Text style={styles.logo}>LOGO</Text>
                        </View>
                        <View style={styles.icons}>
                            <Icon name="search" style={styles.icon}/>
                            <Icon name="notification"/>
                        </View>
                    </View>
                    <ScrollView 
                    style={styles.banners} 
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
                </ImageBackground>
                
            </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
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
        position: 'relative',
        top: 40,
    },
    banner: {
        width: width - 90,
        height: 200,
        marginLeft: 30,
        marginRight: 15,
        borderRadius: 10,
        overflow: "hidden"
    },
    dots: {
        flexDirection: 'row',
        position: 'relative',
        top: 50,
        left: 30
    }
})

export default Home;