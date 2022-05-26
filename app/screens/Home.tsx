import React, {useEffect} from 'react';
import {View, StyleSheet, Text, ImageBackground, Dimensions, Image, ScrollView} from "react-native";
import * as Progress from 'react-native-progress';

import data from '../data/data.json';
import Animated, {
    useSharedValue,
    SharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withRepeat, withDelay, FadeIn, ZoomInEasyDown, ZoomInEasyUp, ZoomIn
} from "react-native-reanimated";

const Home: React.FC = () => {

    // data
    const user = data[0];
    //shared value
    const scale: SharedValue<number> = useSharedValue(5);
    const progress: SharedValue<number> = useSharedValue(0);

    const leftFadingIn: SharedValue<number> = useSharedValue(-1200);
    const rightFadingIn: SharedValue<number> = useSharedValue(1200);

    let progArray: number[] = [];
    // shared values programming
    const progressJavascript: SharedValue<number> = useSharedValue(0);
    const progressTypescript: SharedValue<number> = useSharedValue(0);
    const progressCpp: SharedValue<number> = useSharedValue(0);
    const progressKotlin: SharedValue<number> = useSharedValue(0);

    const stylePhoto = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            transform: [{scale: scale.value,}]
        }
    }, []);

    const leftFadingStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            transform: [{translateX: leftFadingIn.value}]
        }
    }, []);

    const rightFadingStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            transform: [{translateX: rightFadingIn.value}]
        }
    }, []);

    useEffect(() => {
        progress.value = withTiming(1, {duration: 2000});
        scale.value = withRepeat(withSpring(1), 1,);

        leftFadingIn.value = withDelay(800, withSpring(0, {damping: 8, velocity: 15}));
        rightFadingIn.value = withDelay(900, withSpring(0, {damping: 8, velocity: 15}));

        progressJavascript.value = withTiming(user.Programming_skills[0].level);
        progressTypescript.value = withTiming(user.Programming_skills[1].level);
        progressCpp.value = withTiming(user.Programming_skills[2].level);
        progressKotlin.value = withTiming(user.Programming_skills[3].level);

    }, []);

    return (
        <ImageBackground source={{uri: user.image}} style={styles.imageBg} resizeMode={"cover"}
                         imageStyle={{opacity: 0.1, backgroundColor: "#000"}}>

            {/*<StatusBar translucent={true}/>*/}
            <View style={{
                paddingVertical: 40,
                backgroundColor: "#fff",
                flex: 1,
            }}>
                {/* Main View*/}
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <View style={{marginBottom: 20}}>
                        <Animated.Image
                            entering={ZoomIn.delay(1000).duration(1000).springify()}
                            style={[styles.image]}
                            source={{uri: user.image}}
                            height={300}
                            width={300}/>
                    </View>
                    {/*<View style={styles.section}>*/}
                    <Animated.Text
                        style={[styles.xxTitle, rightFadingStyle]}>{user.firstname} {user.lastname}</Animated.Text>
                    {/*</View>*/}
                </View>

                <ScrollView style={styles.container}>

                    <Animated.View style={[styles.section, leftFadingStyle]}>
                        <Text style={styles.title}>About me</Text>
                        <Text style={styles.contentText}>
                            {user.about}
                        </Text>
                    </Animated.View>

                    {/* programming skills*/}
                    <Animated.View style={[styles.section, rightFadingStyle]}>
                        <Text style={styles.title}>Programming skills</Text>
                        {user.Programming_skills.map((item, index) =>
                            <Animated.View key={index} entering={FadeIn.delay(1000 * index)}>
                                <Text style={styles.contentTextSkill}>{item.language}</Text>
                                {/*<Barometer level={item.level}/>*/}
                                <Progress.Bar
                                    height={10}
                                    progress={item.level / 100}
                                    width={Dimensions.get("window").width - 80}
                                    style={{borderWidth: 0, backgroundColor: "#ccc"}}
                                    color={"orange"}/>
                            </Animated.View>
                        )}
                    </Animated.View>
                    {/* Social media*/}
                    <Animated.View style={[styles.section, leftFadingStyle]}>
                        <Text style={styles.title}>Social Media</Text>
                        <View>
                            <Text style={styles.contentText}>Youtube</Text>
                            <Text style={styles.contentText}>{user.social.youtube}</Text>
                        </View>

                        <View>
                            <Text style={styles.contentText}>Facebook</Text>
                            <Text style={styles.contentText}>{user.social.facebook}</Text>
                        </View>

                        <View>
                            <Text style={styles.contentText}>Twitter</Text>
                            <Text style={styles.contentText}>{user.social.twitter}</Text>
                        </View>
                    </Animated.View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        //  height: Dimensions.get("window").height / 2
        flex: 5
    },
    image: {
        // opacity: 0,
        borderRadius: 150,
        height: 300,
        width: 300,
    },

    imageBg: {
        flex: 1,
    },
    xxTitle: {
        fontFamily: "MontserratBold",
        fontSize: 35,
        color: "#10a5b5",
        fontWeight: "bold",
    },
    title: {
        fontFamily: "MontserratBold",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 5,
    },
    contentText: {
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: 16,
        color: "#212020"
    },
    contentTextSkill: {
        fontFamily: "MontserratMedium",
        fontWeight: "bold",
        fontSize: 17,
        color: "grey"
    },
    section: {
        marginBottom: 10
    }
});
