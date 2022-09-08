import { useReducer } from "react"
const ReducerDemo = () => {
  const initialState = 0
  const [number, dispatchNumber] = useReducer((state:number, action:any) => {
    const {payload, name} = action
    switch(name){
      case 'add':
        return state + 1
      case 'sub':
        return state - 1
      case 'reset':
        return payload
    }
    return state
  }, initialState)
  return(
    <div>
      当前值:{number}
      {/* 派发更新 */}
      <button onClick={() => {dispatchNumber({name: 'add'})}}>增加</button>
      <button onClick={() => {dispatchNumber({name: 'sub'})}}>减少</button>
      <button onClick={() => {dispatchNumber({name: 'reset', payload: 666})}}>赋值</button>      
    </div>
  )
}
export default ReducerDemo