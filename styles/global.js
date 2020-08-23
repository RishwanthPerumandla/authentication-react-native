import { StyleSheet } from 'react-native';
import AmplifyTheme from 'aws-amplify-react-native/dist/AmplifyTheme';
import { Greetings } from 'aws-amplify-react-native';
export const globalStyles = StyleSheet.create({
  imageContainer: {
    flex: 0.5,
    width: '100%',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// export class MyGreetings extends Greetings {
//   render() {
//     return (
//       <View style={globalStyles.imageContainer}>
//         {/* <Image
//           source={require('./assets/exibits_logo.png')}
//           style={globalStyles.image}
//         /> */}
//       </View>
//     );
//   }
// }

// const MySectionHeaderText = Object.assign({}, AmplifyTheme.sectionHeaderText, {
//   color: 'blue',
// });
// // const MGreetings = Object.assign({},AmplifyTheme.)

// const MyButton = Object.assign({}, AmplifyTheme.button, {
//   backgroundColor: 'blue',
// });

// const MySectionFooterLink = Object.assign({}, AmplifyTheme.sectionFooterLink, {
//   color: 'blue',
// });

// export const MyTheme = Object.assign({}, AmplifyTheme, {
//   sectionHeaderText: MySectionHeaderText,
//   button: MyButton,
//   sectionFooterLink: MySectionFooterLink,
// });
