import React, { useEffect, useState } from 'react';
import Scroll from '../../components/srollBetter';
import { specialLineProgressListApi } from "../../api/test";
import ListItem from './components/listIem.js'
import './index.scss'
import { connect } from 'react-redux'//引入react配套的redux
import store from "../../store";
import Slide from "../../components/sideBetter";

function Index() {
  const role = store.getState()
  const [page, setPage] = useState(1);
  const [pullDownLoading, setPullDownLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const opt = [
    {
      link: '',
      src: 'https://ww4.sinaimg.cn/crop.0.0.920.300/6ae90488gy1gn01la7cbhj20pk08c7li.jpg'
    }, {
      link: '',
      src: 'https://ww4.sinaimg.cn/crop.0.0.920.300/6ae90488gy1gn01la7cbhj20pk08c7li.jpg'
    }
  ]
  useEffect(() => {
    setPullDownLoading(true)
    if (pullDownLoading) {
      specialLineProgressListApi({
        pageSize: 20,
        pageNum: 1,
        "address": "",
        "productType": 1,
        "orderStatus": 2,
        "searchKeyWord": ""
      }).then(res => {
        let rows = [...listData, ...res.rows]
        setListData(rows)
        setPullDownLoading(false)
      })
    }
  }, [page]);
  const handelPageMore = () => {
    setPage(page + 1)
  };

  return (
    <div style={{width: '100%', height: '100%'}}>
      <Slide opts={opt}></Slide>
      <Scroll pullUp={handelPageMore}>
        <div className='tabs-item-wrap'>
          {
            listData.map((i, index) => {
              return (<ListItem key={index} item={i} role={role}></ListItem>)
            })
          }
        </div>
      </Scroll>
    </div>

  )
}

export default connect()(Index)
