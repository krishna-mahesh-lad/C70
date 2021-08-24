import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransScreen extends Component {
    constructor(){
        super();
        this.state = {
            hasCamPermission : null,
            scanned : false,
            buttonState : 'normal',
            scannedBookID: '',
            scannedStudentID: '',
        }
    }

    hasCamPermission = async(id) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCamPermission : status === 'granted',
            scanned : false,
            buttonState : id
        });

    }

    handleBarCodeScanned = async({type, data}) => {
        const {buttonState} = this.state
        if (buttonState === 'bookID')
        {this.setState({
            scannedBookID : data,
            scanned : true,
            buttonState : 'normal'
        });
    }
    else if (buttonState === 'studentID')
    {this.setState({
        scannedStudentID : data,
        scanned : true,
        buttonState : 'normal'
    });
}
    }


    render(){
        const hasCamPermission = this.state.hasCamPermission
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if (buttonState !== 'normal' && hasCamPermission){
        return(
            <BarCodeScanner
                onBarCodeScanned = {scanned ? undefined : handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
            />
            )
        }
        else if (buttonState === 'normal'){
            return(
                <View>
                    <Image
                        source = {require('../assets/booklogo.jpg')}
                        style = {{width:40, height:40}}/>

                    <Text style = {{textAlign:"center", fontSize: 30}}> Willy App </Text>
                    <View style = {{flexDirection: "row", margin: 20}}>
                        <TextInput
                            style = {{width:200, height:40, borderWidth: 1.5, fontSize: 20}}
                            placeholder = 'Book ID'
                            value = {this.state.scannedBookID}
                        />
                        <TouchableOpacity 
                        style = {{backgroundColor: "violet", width: 50, borderWidth: 1.5}}
                        onPress = {() => {this.getCamPermission('bookID')}}>
                            <Text> Scan </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flexDirection: "row", margin: 20}}>
                        <TextInput
                            style = {{width:200, height:40, borderWidth: 1.5, fontSize: 20}}
                            placeholder = 'Student ID'
                            value = {this.state.scannedStudentID}
                        />
                        <TouchableOpacity 
                        style = {{backgroundColor: "violet", width: 50, borderWidth: 1.5}}
                        onPress = {() => {this.getCamPermission('studentID')}}>
                            <Text> Scan </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}