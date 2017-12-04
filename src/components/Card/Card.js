import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import themeStyles from './styles';
import {
  //updateScreenIndex,
} from '../../actions/program_actions';

class Card extends Component {
  state = {
    warningVisible: false,
    selectedDeleteKey: '',
  }

  renderWarning(styles, key) {
    if (this.state.warningVisible && key === this.state.selectedDeleteKey) {
      return (
        <Animatable.View animation={'fadeIn'}>
          <View style={styles.cardDivider} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Entypo
              size={30}
              name={'cross'}
              style={styles.cardIcon}
              underlayColor={'transparent'}
              onPress={() => this.setState({ warningVisible: false })}
            />
            <Text style={styles.warningText}>
              Are you sure?
            </Text>
            <Entypo
              size={25}
              name={'check'}
              style={styles.cardIcon}
              underlayColor={'transparent'}
              onPress={() => this.showPopover}
            />
          </View>
        </Animatable.View>
      );
    }
  }

  renderEmptyCard(styles, title) {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Entypo style={styles.cardTitle} name={'add-to-list'} />
          <Text style={styles.cardTitle}>
            `Use the buttons below to add a new ${title}`
          </Text>
        </View>
        <View style={styles.cardDivider} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Entypo
            size={25}
            name={'edit'}
            style={styles.cardIcon}
            underlayColor={'transparent'}
            onPress={() => this.showPopover}
          />
        </View>
      </View>
    );
  }

  render() {
    const { theme, screenIndex, empty, title, item, subtitle, icon, onPress } = this.props;
    const styles = themeStyles[theme];

    if (empty) return this.renderEmptyCard(styles, title);

    return (
      <TouchableOpacity key={item.name} style={styles.cardContainer} onPress={onPress} >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <MaterialIcons style={styles.cardTitle} name={icon} />
          <Text style={styles.cardTitle}>
            {item.name}
          </Text>
        </View>
        <View style={styles.cardDivider} />
        <Text style={styles.cardSubtitle}>
          {subtitle}
        </Text>
        <View style={styles.cardDivider} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Entypo
            size={25}
            name={'edit'}
            style={styles.cardIcon}
            underlayColor={'transparent'}
            onPress={() => this.showPopover}
          />
          <Entypo
            ref='deleteButton'
            size={22}
            name={'trash'}
            style={styles.cardIcon}
            underlayColor={'transparent'}
            onPress={() => this.setState({ warningVisible: true, selectedDeleteKey: item.key })}
          />
        </View>
        {this.renderWarning(styles, item.key)}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({ program, theme }) => {
  return {
    theme: theme.selected,
    screenIndex: program.screenIndex,
  };
};

export default connect(mapStateToProps)(Card);
