/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/no-unlimited-disable */
import React from 'react';
import {Text, View, Animated, FlatList} from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import {
  getcategorieslist,
  getpopularproduct,
  getproduct,
} from '../../store/modules/dashboard';
import {ifIphoneX} from '../../constants/utils';
import {constants, colors, sizes} from '../../constants';
import styles from './HomeScreen.styles';
import {connect} from 'react-redux';

import CategoriesItems from './CategoriesItems';
import PopularItems from './PopularItems';
import TopTabBarItem from './TopTabBarItem';

const {event, ValueXY} = Animated;
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerLayout: {
        height: 0,
      },
      contentHeight: {},
      modalVisible: false,
      refreshing: false,
      selectedIndex: 0,
      subMenus: [],
    };
    this.scrollY = new ValueXY();
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.scrollY.y.addListener(({ value }) => (this._value = value));
    this.fetchAPI();
  }

  fetchAPI = async () => {
    try {
      this.props.getcategorieslist();
      this.props.getpopularproduct();
      this.props.getproduct();
    } catch (error) {
      console.log('error', error);
    }
  };

  componentWillUnmount() {
    this.scrollY.y.removeListener();
  }

  setHeaderSize = headerLayout => this.setState({headerLayout});

  scrollPosition = value => {
    const {headerLayout} = this.state;
    return constants.scrollPosition(headerLayout.height, value);
  };

  renderHeader = () => <View />;

  onPressSelectedItem = (item, index) => {
    let sub_menus = item?.sub_menus;
    let Arr = [];
    sub_menus.map((element, i) => {
      let data = {
        title: element.name,
        content: this.renderContent(element.id),
      };
      Arr.push(data);
    });
    this.setState({selectedIndex: index, subMenus: Arr});
  };

  onPressPapularItem = () => {};

  renderForeground = categories => {
    if (!categories) {
      return null;
    }
    const {menus} = categories[0];
    const [startTitleFade, finishTitleFade] = [
      this.scrollPosition(25),
      this.scrollPosition(45),
    ];

    const titleOpacity = this.scrollY.y.interpolate({
      inputRange: [0, startTitleFade, finishTitleFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const {selectedIndex} = this.state;
    return (
      <View style={styles.foreground}>
        <Animated.View
          style={[styles.messageContainer, {opacity: titleOpacity}]}>
          <View style={{paddingVertical: 12, paddingLeft: 12}}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              Browse by Categories
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={menus}
            renderItem={({item, index}) => {
              return (
                <CategoriesItems
                  item={item}
                  index={index}
                  selectedIndex={selectedIndex}
                  onPressSelectedItem={(element, i) =>
                    this.onPressSelectedItem(element, i)
                  }
                />
              );
            }}
          />
        </Animated.View>

        <Animated.View
          style={[styles.messageContainer, {opacity: titleOpacity}]}>
          <View style={{paddingVertical: 12, paddingLeft: 12}}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>Papular</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={menus}
            renderItem={({item, index}) => {
              return (
                <PopularItems
                  item={item}
                  index={index}
                  onPressPapularItem={(element, i) =>
                    this.onPressPapularItem(element, i)
                  }
                />
              );
            }}
          />
        </Animated.View>
      </View>
    );
  };

  renderContent = () => {
    const {product} = this.props;
    let products = product[0] && product[0].products;
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={({item, index}) => {
          return <TopTabBarItem item={item} index={index} />;
        }}
      />
    );
  };

  render() {
    const {subMenus} = this.state;
    const {categorieslist} = this.props;

    let Arr = [];
    categorieslist &&
      categorieslist[0] &&
      categorieslist[0].menus &&
      categorieslist[0].menus[0] &&
      categorieslist[0].menus[0].sub_menus &&
      categorieslist[0].menus[0].sub_menus.map((item, i) => {
        let data = {
          title: item.name,
          content: this.renderContent(item.id),
        };
        Arr.push(data);
      });

    return (
      <>
        <StickyParallaxHeader
          foreground={this.renderForeground(this.props.categorieslist)}
          header={this.renderHeader()}
          tabs={subMenus.length > 0 ? subMenus : Arr}
          deviceWidth={constants.deviceWidth}
          parallaxHeight={sizes.homeScreenParallaxHeader}
          scrollEvent={event(
            [{nativeEvent: {contentOffset: {y: this.scrollY.y}}}],
            {
              useNativeDriver: false,
            },
          )}
          headerSize={this.setHeaderSize}
          headerHeight={ifIphoneX(40, 50)}
          tabTextStyle={styles.tabText}
          tabTextContainerStyle={styles.tabTextContainerStyle}
          tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
          tabsContainerBackgroundColor={colors.white}
          tabsWrapperStyle={styles.tabsWrapper}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    categorieslist: state.dashboard.categories,
    popularProduct: state.dashboard.popularProduct,
    product: state.dashboard.product,
  };
};

const mapDispatchToProps = {
  getcategorieslist: () => getcategorieslist(),
  getpopularproduct: () => getpopularproduct(),
  getproduct: () => getproduct(),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
