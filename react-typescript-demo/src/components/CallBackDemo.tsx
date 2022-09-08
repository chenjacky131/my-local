import React, { useCallback, useEffect, useState } from 'react'
interface Prop {
  getInfo: any;
}
const DemoChildren = React.memo((props : Prop) => {
  console.log('子组件更新')
  useEffect(() => {
    props.getInfo('子组件')
  }, [])
  return <div>子组件</div>
})
const CallBackDemo = () => {
  const [number, setNumber] = useState(1)
  const getInfo = (useCallback((number:any) => {
    console.log(number)
  }, []))
  //  传给子组件的函数发生变化时，不触发子组件更新，除非加了useCallback的第二个数组参数，参数是对应改变的值。useCallback必须配合React.memo使用
  return <div>
    { /* 点击按钮触发父组件更新，但是子组件没有更新 */ }
    <button onClick={() => setNumber(number + 1)}>增加</button>
    <DemoChildren getInfo={getInfo} />
  </div>
}
export default CallBackDemo