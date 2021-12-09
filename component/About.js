import React from 'react';
import { ScrollView, Text, Dimensions, View } from 'react-native';

const { width } = Dimensions.get("window");
const rem = width / 20;

const About = () => {
  return (
    <ScrollView style={{ paddingTop: '7%', marginTop: '13%' }}>
      <View style={{ marginLeft: '5%', marginRight: '6%' }}>

        <Text style={{ fontSize: rem * 2, fontWeight: 'bold' }}>
          Blancer
        </Text>

        <Text style={{ fontSize: rem }}> </Text>

        <Text style={{ fontSize: rem * 1.5 }}>
          License
        </Text>

        <Text style={{ fontSize: rem * 0.83 }}>
          {'\n'}MIT License{'\n'}
          {'\n'}
          Copyright (c) 2021 The Balancer Authors{'\n'}
          {'\n'}
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the "Software"), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:{'\n'}{'\n'}

          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.{'\n'}{'\n'}

          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.{'\n'}{'\n'}

          The source code is available on https://github.com/seungwoochoe/Balancer{'\n'}{'\n'}{'\n'}
        </Text>

        <Text style={{ fontSize: rem * 1.5 }}>
          Acknowledgements
        </Text>

        <Text style={{ fontSize: rem * 0.83 }}>
          {'\n'}This software uses open source projects.
          You can find the source code and licenses of those projects below.
          We acknowledge and are grateful to the people who contributed to those projects.
          {'\n\n'}
          React https://github.com/facebook/react{'\n'}
          MIT License https://github.com/facebook/react/blob/main/LICENSE
          {'\n\n'}
          React Native https://github.com/facebook/react-native{'\n'}
          MIT License https://github.com/facebook/react-native/blob/main/LICENSE
          {'\n\n'}
          Expo https://github.com/expo/expo{'\n'}
          MIT License https://github.com/expo/expo/blob/master/LICENSE
          {'\n\n'}
          React Navigation https://github.com/react-navigation/react-navigation{'\n'}
          MIT License https://opensource.org/licenses/MIT
          {'\n\n'}
          React Native Screens https://github.com/software-mansion/react-native-screens{'\n'}
          MIT License https://github.com/software-mansion/react-native-screens/blob/master/LICENSE
          {'\n\n'}
          React Native Safe Area Context https://github.com/th3rdwave/react-native-safe-area-context{'\n'}
          MIT License https://github.com/th3rdwave/react-native-safe-area-context/blob/main/LICENSE
          {'\n\n'}
          React Native Reanimated https://github.com/software-mansion/react-native-reanimated{'\n'}
          MIT License https://github.com/software-mansion/react-native-reanimated/blob/master/LICENSE
          {'\n\n'}
          React Native Gesture Handler https://github.com/software-mansion/react-native-gesture-handler{'\n'}
          MIT License https://github.com/software-mansion/react-native-gesture-handler/blob/master/LICENSE
          {'\n\n'}
          React Native Vector Icons https://github.com/oblador/react-native-vector-icons{'\n'}
          MIT License https://github.com/oblador/react-native-vector-icons/blob/master/LICENSE
          {'\n\n'}
          React Native Slider https://github.com/callstack/react-native-slider{'\n'}
          MIT License https://github.com/callstack/react-native-slider/blob/main/LICENSE.md
        </Text>

        <Text>{'\n\n\n\n'}</Text>

      </View>
    </ScrollView>
  );
};

export default About;
