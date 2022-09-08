import {useState, useEffect} from 'react'
const Test = () => {
  const [count, setCount] = useState({name: '计数器', number: 0})
  useEffect(() => {
    document.title = `You clicked ${count} times`
  },[count])
  return(
    <div>
      <p>{count.name}:{count.number}</p>
      <button onClick={() => setCount({...count, number: count.number + 1})}>修改数字</button>
      <button onClick={() => setCount({...count, name: '计数器改名'})}>修改名字</button>
    </div>
  )
}
export default Test