import React from 'react'
/* eslint no-dupe-keys: 0 */
import { ListView } from 'antd-mobile';
import './css.css';
import home from '../../api/home'

const NUM_ROWS = 20;
let pageIndex = 1;

function genData(data, pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < data.length; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class List extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    
    this.state = {
      data: [],
      dataSource,
      isLoading: true,
      form: {
        type_id: null,
        id: null,
      }
    };
  }
  
  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);
    
    // simulate initial Ajax
    // 获取列表数据
    home.getDataList(pageIndex, NUM_ROWS, this.state.form).then((res) => {
      if (res.data.code === 200) {
        const data = res.data.data;
        this.setState({
          data,
        });
        console.log(this.state.data);
        setTimeout(() => {
          this.rData = genData(this.state.data);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 600);
      }
    });
  }
  
  getData() {
    home.getDataList(pageIndex, this.state.form).then((res) => {
      if (res.data.code === 200) {
        const data = res.data.data;
        this.setState({
          data,
        });
        setTimeout(() => {
          this.rData = genData(this.state.data);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 600);
      }
    });
  }
  
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }
  
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    ++pageIndex
    home.getDataList(pageIndex, NUM_ROWS, this.state.form).then((res) => {
      if (res.data.code === 200) {
        const data = res.data.data;
        this.setState({
          data: [...this.state.data, ...data],
        });
        // 请求
        setTimeout(() => {
          this.rData = { ...this.rData, ...genData(this.state.data, pageIndex) };
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 2000);
      }
    });
  }
  
  render() {
    /**
     * 渲染在每一行下面
     * @param sectionID
     * @param rowID
     * @returns {*}
     */
    const separator = (sectionID, rowID) => (
      <div className="separator"
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          // height: 8,
          // borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = this.state.data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.data.length - 1;
      }
      const obj = this.state.data[index--];
      return (
        <div className="list-item" key={rowID}>
          <div className="item-box">
            <img className="item-img" src={obj.img_src} alt="" />
            <div className="item-desc">
              <div className="item-title">{obj.name}</div>
              <div className="item-sec">{obj.type_name}</div>
              <div className="item-sec">{obj.descript}</div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : '无更多数据'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}

export default List;