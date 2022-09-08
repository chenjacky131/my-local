import { configureStore } from '@reduxjs/toolkit'
import counterReducer from 'store/features/counter/counterSlice'  //  counter相关的状态
export default configureStore({
  reducer: {
    counter: counterReducer //  创建counter模块
  }
})