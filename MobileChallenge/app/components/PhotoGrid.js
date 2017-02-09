'use strict'

import React, { Component } from 'react'
import { Dimensions, ListView, StyleSheet, View } from 'react-native'

let styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

class PhotoGrid extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: new ListView.DataSource({
        rowHasChanged: (r1, r2) => { r1 !== r2 }
      }),
    }
  }

  render() {
    let rows = this._buildRows(this.props.data, this.props.itemsPerRow)
    console.log(this)

    return (
      <ListView
        { ...this.props }
        dataSource = { this.state.data.cloneWithRows(rows) }
        renderRow = { this._renderRow.bind(this) }
        style = {{ flex: 1 }} />
    )
  }

  _buildRows(items, itemsPerRow = 3) {
    return items.reduce((rows, item, idx) => {
      // If a full row is filled create a new row array
      if (idx % itemsPerRow === 0 && idx > 0) rows.push([])
      rows[rows.length - 1].push(item)
      return rows
    }, [[]])
  }

  _renderRow(items) {
    let deviceWidth = Dimensions.get('window').width
    let itemsPerRow = this.props.itemsPerRow
    let margin = this.props.itemMargin || 1

    let totalMargin = margin * (itemsPerRow - 1)
    let itemWidth = Math.floor( (deviceWidth - totalMargin) / itemsPerRow )
    let adjustedMargin = ( deviceWidth - (itemsPerRow*itemWidth) ) / (itemsPerRow - 1)

    return (
      <View style = {[ styles.row, { marginBottom: adjustedMargin } ]}>
        { items.map(item => this.props.renderItem(item, itemWidth)) }
      </View>
    )
  }

}

export default PhotoGrid
