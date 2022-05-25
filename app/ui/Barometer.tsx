
import {Dimensions, View} from "react-native";
import React from "react";
import Progress from "react-native-progress";

interface IBarometer {
    level: number;
}

const Barometer: React.FC<IBarometer> = (props) => {

    let colors: string;

    if (props.level <= 30) {
        colors = "red";
    } else if(props.level <= 50) {
        colors = "yellow";
    } else if(props.level <= 70) {
        colors = "blue"
    } else if(props.level <= 80){
        colors = "#10a5b5";
    } else if(props.level > 81){
        colors = "green";
    }

    return (
        <View>
            <Progress.Bar
                height={10}
                progress={props.level / 100}
                width={Dimensions.get("window").width - 80}
                style={{borderWidth: 0, backgroundColor: "#ccc"}}
                color={"#ff00"}/>
        </View>

    )
}

export default Barometer;
