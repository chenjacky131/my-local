import React from "react";
import { useDispatch } from 'react-redux' //  通过useDiapatch来使用状态的方法
import { decrement, increment } from 'store/features/counter/counterSlice' // 使用状态的方法
const Home = () => {
  const dispatch = useDispatch()
  return <div>
    <h1>首页</h1>
    <div>
      <button onClick={ () => dispatch(increment()) }>Increment</button>
      <button onClick={ () => dispatch(decrement()) }>Decrement</button>
    </div>
  </div>
}
export default Home