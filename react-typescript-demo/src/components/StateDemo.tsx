import { useState } from 'react'
function StateDemo(props:any){
  let [number, setNumber] = useState(() => {
    return 1
  })
  return (
    <div>我是一个组件: {props.name} {number}
    <button onClick={() => setNumber(++number)}>Click me</button>
    </div>
  )
}
export default StateDemo