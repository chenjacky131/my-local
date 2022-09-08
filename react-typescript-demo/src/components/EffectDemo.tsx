import { useState, useEffect, useRef } from 'react'
function EffectDemo(props:any){
  let [number, setNumber] = useState(0)
  const target:any = useRef()
  /* 
    userEffect的第二个参数，
    1:没有时，组件的初始化和更新都会执行。
    2:空数组，初始化调用一次后就不再执行，相当于componentDidMount
    3:有一个或者多个值的数组。传入第二个参数，只有一个值，该值有变化就执行，传入第二个参数，有多个值的数组，会比较每一个值，有一个不相等就执行
  */
  useEffect(() => {
    console.log(number)
    console.log(target.current)
  }, [props])
  return (
    <div>
      <p>{number} {props.name}</p>
      <button ref={target} onClick={() => {
        setNumber(number + 1)
      }}>点击</button>
    </div>
  )
}
export default EffectDemo