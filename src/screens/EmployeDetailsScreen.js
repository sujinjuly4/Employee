import React, { useEffect } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'

const EmployeDetailsScreen = (props) => {
    const { route: { params: { employeDetails } }, navigation } = props

    useEffect(() => {
        navigation.setOptions({
            title: employeDetails.name,
            headerBackTitle: "Back"
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", height: 170, justifyContent: "space-evenly" }}>
                    <View style={{ height: 70, width: 70, borderRadius: 35, alignSelf: "center", overflow: "hidden", borderWidth: employeDetails.profile_image == "null" ? 0.5 : 0 }}>
                        {employeDetails.profile_image != "null" && <Image style={{ flex: 1 }} source={{ uri: employeDetails.profile_image }} resizeMode="contain" />}
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold" }}>{employeDetails.name}</Text>
                    </View>
                </View>
                <View style={{ borderTopWidth: 0.5, paddingVertical: 20, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>User details</Text>
                    <View style={{}}>
                        <Text>User Name : {employeDetails.username}</Text>
                        <Text>Email : {employeDetails.email}</Text>
                        {employeDetails.phone != "null" && <Text>Phone : {employeDetails.phone}</Text>}
                        <Text>Website : {employeDetails.website}</Text>
                    </View>
                </View>
                <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, paddingVertical: 20, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Address details</Text>
                    <View style={{}}>
                        <Text >Street : {employeDetails?.address?.street}</Text>
                        <Text >Suite : {employeDetails?.address?.suite}</Text>
                        <Text >City : {employeDetails?.address?.city}</Text>
                        <Text >Zipcode : {employeDetails?.address?.zipcode}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Company details</Text>
                    <View style={{}}>
                        <Text >Name : {employeDetails?.company?.name}</Text>
                        <Text >Catch Phrase : {employeDetails?.company?.catchPhrase}</Text>
                        <Text >BS : {employeDetails?.company?.bs}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EmployeDetailsScreen
