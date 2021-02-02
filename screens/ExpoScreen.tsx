import {BarCodeScanningResult, Camera} from 'expo-camera';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

const Result = (props: BarCodeScanningResult & {target: string}) => {
  return <View style={styles.container}>
    <Text>Received data:</Text>
    <Text>data: {props.data}</Text>
    <Text>type: {props.type}</Text>
    <Text>target: {props.target}</Text>
  </View>
}
export default function ExpoScreen() {
  const [hasPermission, setHasPermission] = React.useState<boolean| null>(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [result, setResult] = React.useState<BarCodeScanningResult  & {target: string}| null>(null)

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>На мой взгляд самая крутая реализация</Text>
      <Camera flashMode={Camera.Constants.FlashMode.torch} style={styles.camera} type={type} onBarCodeScanned={(result) =>{
        // @ts-ignore почему-то туда передаётся ещё target вместо cornerPoints
        setResult(result)
      }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip Camera </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {result && <Result {...result}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'stretch'
  },
  camera: {
    flex: 4
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
