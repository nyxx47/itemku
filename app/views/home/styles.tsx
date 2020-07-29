import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width

export const styles = StyleSheet.create({
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