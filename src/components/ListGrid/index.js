import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, View, FlatList } from 'react-native';

import { width } from '../../themes';

import styles from './styles';

const calcGridDimension = numColumns => ({
  height: width / numColumns,
  width: width / numColumns,
});

export default class ListGrid extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    numColumns: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired,
    showSeparator: PropTypes.bool,
    itemStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    numColumns: 3,
    itemStyle: {},
    showSeparator: false,
  };

  itemDimension = calcGridDimension(this.props.numColumns);

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item, index }) => {
    const { showSeparator, renderItem, numColumns, itemStyle } = this.props;
    let style = {};
    if (showSeparator) {
      const position = index % numColumns;
      if (position === 0 && numColumns !== 1) {
        style = styles.imageLeft;
      } else if (position === numColumns - 1) {
        style = styles.imageRight;
      } else {
        style = styles.imageCenter;
      }
    }
    return (
      <View style={[style, this.itemDimension, itemStyle]}>
        {renderItem({ item, index })}
      </View>
    );
  };

  render() {
    const { showSeparator, ...props } = this.props;
    return (
      <FlatList
        contentContainerStyle={styles.container}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={() =>
          showSeparator ? <View style={styles.separator} /> : null
        }
        showsVerticalScrollIndicator={false}
        {...props}
        renderItem={this._renderItem}
      />
    );
  }
}
