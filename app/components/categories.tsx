import * as React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { styles } from '../views/home/styles'

interface IState{
    activeName: string;
    activeProducts: string;
}

interface ICategoriesProps{
    name: string;
    initialActive?: boolean;
    heading: string;
}

interface ICategoriesContext{
    activeName?: string;
    handleCategoriesClick?: (name: string, content: React.ReactNode) => void;
}

const CategoriesContext = React.createContext<ICategoriesContext>({});

class Categories extends React.Component<{}, IState>{

    private handleCategoriesClick = (name: string, content: React.ReactNode) => {
        this.setState({activeName: name, activeProducts: content})
    }


    public static Category: React.SFC<ICategoriesProps> = props => (
        <CategoriesContext.Consumer>
            {
                (context: ICategoriesContext) => {
                    if(!context.activeName && props.initialActive){
                        if(context.handleCategoriesClick){
                            context.handleCategoriesClick(props.name, props.children);
                            return null;
                        }
                    }

                    const activeName = context.activeName ? context.activeName : props.initialActive ? props.name : "";
                    const handleCategoriesClick = () => {
               
                        if(context.handleCategoriesClick){
                            context.handleCategoriesClick(props.name, props.children)
                        }
                    }

                    return (
                        <View style={styles.categories}>
                                <TouchableOpacity onPress={handleCategoriesClick}>
                                    <View style={styles.category}>
                                        <Text style={{fontWeight: props.name === activeName ? '700' : '400'}}>{props.heading}</Text>
                                    </View>
                                </TouchableOpacity>
                        </View>
                    )
                }
            }
        </CategoriesContext.Consumer>
    )

    public render(){
        return (
            <CategoriesContext.Provider value={{
                activeName: this.state ? this.state.activeName : "",
                handleCategoriesClick: this.handleCategoriesClick
            }}>
                <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false} >
                    <View style={{flexDirection: 'row'}}>{this.props.children}</View>
                </ScrollView>
                <View>
                    {this.state && this.state.activeProducts}
                </View>
            </CategoriesContext.Provider>
        )
    }
}

export default Categories