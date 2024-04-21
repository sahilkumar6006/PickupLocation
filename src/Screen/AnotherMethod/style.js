import { StyleSheet } from "react-native";

 export const styles = StyleSheet.create({
  headerContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    width:150,
    marginHorizontal:9,
    marginVertical:10,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  addItem:{
    alignSelf: 'flex-end',
    backgroundColor: 'orange',
    marginEnd:10,
    marginVertical:8
  },
  buttonText:{
    padding:8,
    color:'white'
  },
  locationinput:{
    borderWidth:0.6,
    marginHorizontal:24, 
    marginVertical:6,
    borderRadius:8
  }
})