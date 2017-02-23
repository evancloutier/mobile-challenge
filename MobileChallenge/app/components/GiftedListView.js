import React, { Component } from 'react'
import {
  ListView,
  Dimensions,
  TouchableHighlight,
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'

import Orientation from 'react-native-orientation'

export default class GiftedListView extends Component {
  constructor (props) {
    super(props)

    const init = Orientation.getInitialOrientation()

    let ds = null
    this._setPage(1)
    this._setRows([])

    ds = new ListView.DataSource({
      rowHasChanged: this.props.rowHasChanged ? this.props.rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {

      dataSource: ds.cloneWithRows(this._getRows()),
      isRefreshing: false,
      paginationStatus: 'firstLoad',
      isMounted: false,
      or: init
    }

    this._updateOrientation = this._updateOrientation.bind(this)
    Orientation.addOrientationListener(this._updateOrientation)
  }

  _setPage(page) { this._page = page }
  _getPage() { return this._page }
  _setRows(rows) { this._rows = rows }
  _getRows() { return this._rows }

  _isMounted() {
    return this.state.isMounted
  }

  paginationFetchingView() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  // Potentially use this later for no results found, etc.
  // emptyView = (refreshCallback) => {
  //   if (this.props.emptyView) {
  //     return this.props.emptyView(refreshCallback)
  //   }
  //
  //   return (
  //     <View style={[defaultStyles.defaultView, this.props.customStyles.defaultView]}>
  //       <Text style={[defaultStyles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
  //         Sorry, there is no content to display
  //       </Text>
  //
  //       <TouchableHighlight
  //         underlayColor='#c8c7cc'
  //         onPress={refreshCallback}
  //       >
  //         <Text>
  //           ↻
  //         </Text>
  //       </TouchableHighlight>
  //     </View>
  //   )
  // }

  componentDidMount() {
    this.state.isMounted = true
    this.props.onFetch(this._getPage()).then((data) => {
      this._postRefresh(data, { firstLoad: true })
    })
  }

  componentWillUnmount() {
    this.state.isMounted = false
  }

  _updateOrientation(or) {
    this.props.onRotate(this._page, this._rows)
  }

  _onRefresh(options = {}) {
    if (this._isMounted()) {
      this.setState({
        isRefreshing: true,
      })
      this._setPage(1)
      this.props.onFetch(this._getPage()).then((data) => {
        this._postRefresh(data, { firstLoad: false })
      })
    }
  }

  _postRefresh = (rows = [], options = {}) => {
    if (this._isMounted()) {
      this._updateRows(rows, options)
    }
  }

  // Need to load enough per page so that this function is not called upon render
  _onEndReached() {
    if (this.state.paginationStatus === 'allLoaded') {
      return null
    } else {
      this.setState({
        paginationStatus: 'fetching',
      })

      this.props.onFetch(this._getPage() + 1).then((data) => {
        this._postPaginate(data, { firstLoad: false })
      })
    }
  }

  _postPaginate(rows = [], options = {}) {
    this._setPage(this._getPage() + 1)

    let mergedRows = null
    if (this.props.withSections === true) {
      mergedRows = MergeRecursive(this._getRows(), rows)
    } else {
      mergedRows = this._getRows().concat(rows)
    }

    this._updateRows(mergedRows, options)
  }

  _updateRows(rows = [], options = {}) {
    if (rows != null) {
      this._setRows(rows)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rows),
        isRefreshing: false,
        paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting')
      })
    } else {
      this.setState({
        isRefreshing: false,
        paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting')
      })
    }
  }

  renderRefreshControl() {
    return (
      <RefreshControl
        onRefresh = { this._onRefresh.bind(this) }
        refreshing = { this.state.isRefreshing }
      />
    )
  }

  render() {
    return (
      <ListView
        ref = "listview"
        dataSource = { this.state.dataSource }
        renderRow = { this.props.rowView.bind(this) }
        contentContainerStyle = {{ paddingBottom: 64 }}
        automaticallyAdjustContentInsets = { false }
        scrollEnabled = { this.props.scrollEnabled }
        onEndReached = { this._onEndReached.bind(this) }
        onEndReachedThreshold = { Dimensions.get('window').height }

        canCancelContentTouches = { true }
        refreshControl = { this.props.refreshable === true ? this.renderRefreshControl() : null }
        enableEmptySections = { this.props.enableEmptySections || true }
        { ...this.props }
      />
    )
  }
}

// Helper function which merges two objects into one
function MergeRecursive(obj1, obj2) {
  for (let p in obj2) {
    try {
      if ( obj2[p].constructor == Object ) {
        obj1[p] = MergeRecursive(obj1[p], obj2[p])
      } else {
        obj1[p] = obj2[p]
      }
    } catch(e) {
      obj1[p] = obj2[p]
    }
  }
  return obj1
}
