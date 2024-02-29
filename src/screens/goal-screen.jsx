import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Dimensions, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import CustomButton from '../components/custom-button';

import {setNewGoal} from '../store/water-actions';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const GoalScreen = () => {
  const [waterGoal, updateGoal] = useState();
  const reduxWaterGoal = useSelector(state => state.water.waterGoal);

  const dispatch = useDispatch();

  useEffect(() => {
    updateGoal(reduxWaterGoal);
  }, []);

  const adjustWaterHandler = async direction => {
    if (direction === 'more') {
      await dispatch(setNewGoal(waterGoal + 8));
      await updateGoal(waterGoal + 8);
    }
    if (direction === 'lower') {
      if (waterGoal <= 128) {
        Alert.alert('Cant go any lower!', 'That`s not a championship goal', [
          {text: 'alright'},
        ]);
        return;
      }
      await dispatch(setNewGoal(waterGoal - 8));
      await updateGoal(waterGoal - 8);
    }
  };

  const calculateCupsFromOunces = number => {
    const updatedNumber = number / 8;
    return updatedNumber;
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.goalPrompt}>
        How many 8oz glasses of water would you like to drink each day?
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => adjustWaterHandler('lower')}>
          <Icon
            name="remove-outline"
            size={50}
            color={Colors.accentColorBlue}
          />
        </CustomButton>
        <Text style={styles.goalNumber}>
          {calculateCupsFromOunces(waterGoal)}
        </Text>
        <CustomButton onPress={() => adjustWaterHandler('more')}>
          <Icon name="add-outline" size={50} color={Colors.accentColorBlue} />
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '80%',
  },
  goalNumber: {
    fontSize: 50,
    // fontFamily: 'inconsolata-regular',
    color: 'white',
  },
  goalPrompt: {
    margin: 10,
    textAlign: 'center',
    // fontFamily: 'inconsolata-regular',
    color: 'white',
  },
});

export default GoalScreen;
