import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, Pressable, TextInput } from 'react-native'
import Realm from 'realm';
import axios from "axios"
import { isEmpty } from "lodash"

const EmployeeListScreen = (props) => {
    const { navigation } = props
    const [employeeList, setemployeeList] = useState([])
    const [search, setsearch] = useState("")
    let realmDB
    const geo = {
        name: "geo",
        embedded: true,
        properties: {
            "lat": "string",
            "lng": "string"
        }
    }
    const address = {
        name: "address",
        embedded: true,
        properties: {
            "street": "string",
            "suite": "string",
            "city": "string",
            "zipcode": "string",
            "geo": "geo"
        }
    }
    const company = {
        name: "company",
        embedded: true,
        properties: {
            "name": "string",
            "catchPhrase": "string",
            "bs": "string"
        }
    }

    const employes = {
        name: "employes",
        properties: {
            "id": "int",
            "name": "string",
            "username": "string",
            "email": "string",
            "profile_image": "string",
            "address": "address",
            "phone": "string",
            "website": "string",
            "company": "company"
        },
        primaryKey: "id",
    }

    const getInstance = async () => {
        return await Realm.open({
            path: "EmployeeDatabase.realm",
            schema: [employes, address, company, geo],
        });
    }

    useEffect(async () => {
        realmDB = await getInstance()
        const list = realmDB.objects("employes")
        if (list.length > 0) {
            setemployeeList(list)
        } else {
            getApiData()
        }
    }, [])

    const getApiData = async () => {
        try {
            const list = await axios.get('https://www.mocky.io/v2/5d565297300000680030a986')
            if (!isEmpty(list.data)) {
                storeData(list.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const storeData = async (data) => {
        realmDB.write(() => {
            data.map((item) => {
                realmDB.create("employes", { ...item, phone: item.phone ? item.phone : "null", website: item.website ? item.website : "null", profile_image: item.profile_image ? item.profile_image : "null" });
            })
        });
        setemployeeList(realmDB.objects("employes"))
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <TextInput
                style={{ margin: 10, borderWidth: 1, padding: 10, borderRadius: 5, height: 50 }}
                onChangeText={(text) => setsearch(text)}
                value={search}
                placeholder="Search"
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={employeeList.filter(({ name, email }) => {
                    return name.toLowerCase().includes(search.toLowerCase()) || email.toLowerCase().includes(search.toLowerCase())
                })}
                renderItem={({ item, index }) => {
                    return <Pressable key={index.toString()} onPress={() => {
                        navigation.navigate("EmployeDetailsScreen", { employeDetails: item })
                    }} style={{ height: 100, width: "95%", borderWidth: 0.5, margin: 10, marginTop: 0, borderRadius: 5, paddingHorizontal: 10, flexDirection: "row" }}>
                        <View style={{ height: 70, width: 70, borderRadius: 35, alignSelf: "center", overflow: "hidden", borderWidth: item.profile_image == "null" ? 0.5 : 0 }}>
                            {item.profile_image != "null" && <Image style={{ flex: 1 }} source={{ uri: item.profile_image }} resizeMode="contain" />}
                        </View>
                        <View style={{ flex: 1, padding: 10, justifyContent: "space-evenly" }}>
                            <Text>{item.name}</Text>
                            <Text>{item.company?.name}</Text>
                        </View>
                    </Pressable>
                }}
            />
        </View>
    )
}

export default EmployeeListScreen
