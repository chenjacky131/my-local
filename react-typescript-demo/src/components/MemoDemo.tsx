//  传入useMemo的函数会在渲染期间执行。请不要在这个函数的内部执行与渲染无关的操作，诸如副作用这类的操作属于useEffect的范畴，而不是useMemo。
import { useMemo, useState} from 'react'
const MemoDemo = () => {
  const [number, setNumber] = useState(0)
  const newLog = useMemo(() => {
    const log = () => {
      console.log(number)
    }
    return log
  }, [number])  //  这边如果没有加number，state的状态读取不到最新的
  return <div>
    <div onClick={() => newLog()}>打印</div>
    <span onClick={() => setNumber(number + 1)}>增加</span>
  </div>
}
export default MemoDemo