import * as React from 'react'
import { Image } from 'react-native'

interface IProps {
    name: string;
}

const Icons = {
    search: require('../assets/images/search.png'),
    notification: require('../assets/images/notification.png'),
    heart: require('../assets/images/heart.png')
}

const Icon: React.SFC<IProps> = props => {
    if(Icons[props.name] === undefined) return null;

    const source = Icons[props.name]
    return(
        <Image source={source} {...props}/>
    )
}

export default Icon