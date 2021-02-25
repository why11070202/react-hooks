import React, { useState, useEffect } from 'react'
import './index.scss'

let SlideInter;
const Sliders = (props) => {
  return (
    <a href={props.link ? props.link : 'javascript:void(0)'} className="slide-a"
       style={{width: document.documentElement.clientWidth + "px"}}>
      <div className="slide-li" style={{backgroundImage: "url(" + props.src + ")"}}></div>
    </a>
  )
}

const Slide = (props) => {
  let {autoSlide, opts, continuous} = props;
  const [baseWidth, setBaseWidth] = useState(document.documentElement.clientWidth);
  const [startX, setStartX] = useState('');
  const [moveX, setMoveX] = useState('');
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [index, setIndex] = useState(0);
  const length = opts.length
  const slideSpeed = 2000; //滑动滚动时间
  const swiper = 35;  //滑动滚动触发距离

  const touchStart = (e) => {
    setTime(0)
    setStartX(e.touches[0].pageX)
  }

  const touchMove = (e) => {
    // e.preventDefault()
    if (autoSlide) {
      stopSlideFun();
    }
    let _curX = e.touches[0].pageX
    let _moveX = _curX - startX
    let _distance = -(index * baseWidth - _moveX)
    setMoveX(_moveX)
    setTime(0)
    setDistance(_distance)

  }

  const touchEnd = (e) => {
    if (Math.abs(moveX) <= swiper) {
      slideFun('', '.5')
    } else {
      if (moveX > swiper) {
        slideFun('prev', '.5')
      } else if (Math.abs(moveX) > swiper) {
        slideFun('next', '.5')
      }
    }
    setMoveX(0)
  }
  /**
   * index控制
   * @param  {num} go   指定index数值
   * @param  {num} time transition时间
   */
  const slideFun = (go, time) => {
    let _index = index
    if (typeof go === "number") {
      _index = go
    } else if (go === "next") {
      _index++
    } else if (go === "prev") {
      _index--
    }

    // 是否循环滚动
    if (continuous) {
      if (_index > length) {
        scrollFun(_index, time)
        //返回第一个
        _index = 1
        setTimeout(() => {
          scrollFun(_index, 0)
          autoSlideFun()
          setIndex(_index)
        }, 500);
      } else if (_index < 1) {
        scrollFun(_index, time)
        //返回最后一个
        _index = length
        setTimeout(() => {
          scrollFun(_index, 0)
          autoSlideFun()
          setIndex(_index)
        }, 500)
      } else {
        scrollFun(_index, time)
        setIndex(_index)
      }
    } else {
      if (_index >= length) {
        _index = 0;
      } else if (_index < 0) {
        _index = length - 1;
      }
      scrollFun(_index, time)
      setIndex(_index)
    }
  }
  /**
   * 滚动函数
   * @param  {num} index 指定滚动的index
   * @param  {num} time  transition的时间
   */
  const scrollFun = (index, time) => {
    setTime(time)
    setDistance(-(index * baseWidth))
  }

  const autoSlideFun = () => {
    if (autoSlide) {
      stopSlideFun()
      SlideInter = setInterval(() => {
        slideFun('next', '.5')
      }, slideSpeed)
    }
  }

  const stopSlideFun = () => {
    clearInterval(SlideInter)
  }

  useEffect(() => {
    if (continuous) {
      let newIndex = index + 1
      setIndex(newIndex)
      setDistance(-newIndex * baseWidth)
    }
    if (autoSlide) {
      autoSlideFun();
    }
  }, [])

  let slideStyle = {
    width: (document.documentElement.clientWidth * (opts.length + 2)) + "px",
    WebkitTransform: 'translate3d(' + distance + "px,0,0)",
    transform: 'translate3d(' + distance + "px,0,0)",
    WebkitTranstion: "all " + time + "s",
    transition: "all " + time + "s"
  }

  let slide = opts.map((item, i) => {
    return (
      <Sliders link={item.link} src={item.src} key={i}/>
    )
  })
  return (
    <div className="slide-wrap">
      <div className="slide-ul" style={slideStyle} onTouchStart={e => touchStart(e)}
           onTouchMove={e => touchMove(e)} onTouchEnd={e => touchEnd(e)}
           onTransitionEnd={() => autoSlideFun()}>
        {continuous ? <Sliders link={opts[opts.length - 1].link} src={opts[opts.length - 1].src}
                               picWidth={baseWidth}/> : ""}
        {slide}
        {continuous ?
          <Sliders link={opts[0].link} src={opts[0].src} picWidth={baseWidth}/> : ""}
      </div>
      <div className="dots-wrap">
        {opts.length > 1 && opts.map((item, i) => {
          return (
            <span key={i} onClick={() => {
              scrollFun(continuous ? i + 1 : i, '.5')
              setIndex(continuous ? i + 1 : i)
            }} className={(continuous ? (index - 1) : index) === i ? 'active dots' : 'dots'}/>
          )
        })}
      </div>
    </div>
  );
}
Slide.defaultProps = {
  continuous: false,
  autoSlide: false
}
export default Slide;
