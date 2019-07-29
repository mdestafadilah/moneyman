import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    Alert,
    TextInput,
    ScrollView,
    TouchableOpacity 
} from 'react-native';
import Cicon from './comp/cicon';
import {Styles, Colors} from './lib/styles';
import Env from './lib/env';


export default class AddCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            icon: null,
            color: null,
            iKey: '00'  // iconKey()
        };



    }

    iconKey(key, key2){
        return key.toString() + key2.toString();
    }

    renderActionBar() {
        return(
            <View style={Styles.actionbarBox}>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { this.props.navigation.goBack(); }}>
                    <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                </TouchableOpacity>
                <Text style={Styles.actionbarTitle}>Add Expense Category</Text>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { this.props.navigation.goBack(); }}>
                    <Image style={Styles.icon18} source={require('./asset/icon-checked.png')}/>
                </TouchableOpacity>
            </View>
        );
    }

    renderInputTitle() {
        return(
            <View style={Styles.addTitleBox} >
                <View style={[Styles.iconBox, {marginRight: 15}]}>
                    <Image style={Styles.icon18} 
                    source={require('./asset/categories/cat-food-burger.png')}/>
                </View>
                <TextInput 
                    style={Styles.addTitleInput} 
                    autoCorrect={false}
                    underlineColorAndroid={Colors.primary}
                    placeholder={'Category Title'}
                    onChangeText={(text) => this.setState({title: text})}
                    value={this.state.title}
                />
            </View>
        );
    }

    renderCategoryIcon(item, key){
        return(
            <TouchableOpacity key={key}>
                <View style={[Styles.addIconBox]}>
                    <Image style={Styles.icon18} 
                        source={item.icon}/>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderActionBar()}
                {this.renderInputTitle()}

                <ScrollView>
                    {
                        Env.EXPENSE_ASSETS.map((item, key) => {
                            return(
                                <View key={key}>
                                    <View style={Styles.addCategoryGroup}>
                                        <Text>{item.category}</Text>
                                    </View>
                                    <View style={Styles.addIconListBox}>
                                        {
                                            item.icons.map((item2, key2) => {
                                                let k = this.iconKey(key, key2);
                                                return(
                                                    <TouchableOpacity key={k} 
                                                        onPress={() => {
                                                            this.setState({
                                                                iKey: k
                                                            });
                                                        }}>
                                                        <Cicon style={{marginHorizontal: 20, marginVertical: 10}} 
                                                            icon={item2.icon} 
                                                            color={(this.state.iKey === k) ? item2.color : Colors.lightGrey}
                                                        />
                                                    </TouchableOpacity>
                                                );
                                            })
                                        }
                                    </View>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}
