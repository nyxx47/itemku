export interface IProduct{
    image: string;
    title: string;
    price: string;
    sold: string;
}

export const products: IProduct[] = [
    {
        image: require('../assets/images/fighter.png'),
        title: "King of the fighter",
        price: '100.000',
        sold: '999+ Produk terjual'
    },
    {
        image: require('../assets/images/fighter.png'),
        title: "King of the fighter",
        price: '100.000',
        sold: '999+ Produk terjual'
    },
    {
        image: require('../assets/images/fighter.png'),
        title: "King of the fighter",
        price: '100.000',
        sold: '999+ Produk terjual'
    }
]