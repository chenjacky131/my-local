import { ref } from 'vue'
import store from '@/store/index'
import request from '@/utils/axios'
import { deBounce, timePollingNum, isFleetOrMapInMap, cloneObj } from '@/utils/utils'
import worldDraw from './world-draw'
import * as canvasUtils from './canvas-utils'
import { mmsiTypeList, shipTypeMapColor} from '@/constants/fleet'
import { getShipDetails, getShipCollisionListApi } from '@/api/fleet'
import { shipCrashDetection, getShipCollisionList } from './useCanvas.js'
import { getPermissionShipsApi } from '@/api/hydraulic'
import {WORLD_SHIP_BASE_URL} from '@/api/config'
import singleShipMap from '@/shipStore'
import { getRtFuelConsumption } from '@/api/fleet'
import {getSessionLocal} from '@/utils/local'
import {
  hasLoginFn,
  hasRadarAuthFn,
  useWorldShip,
  moveMarker,
  popupMarker,
  getShipItemInfo,
  addShipItemObj,
  getRadarData,
  getFollowShipList,
  sortByShipArea,
  setShipWatchingStatus,
  closeWatchingShipTimer
} from '../../useCommon/useWorldShip'

const { createPopup } = useWorldShip()

class WorldRequest {
  radarShipList = [] //雷达船列表
  isClickShipOrAnchor = false //是否点击在船舶上或走锚圈
  clickLatlng = [] //鼠标点击的经纬度
  activityShips = {}
  isSecondView = ref(true)
  currentShip = {}//当前点击的船主要是用来判断是否需要绘制水波纹动画
  constructor () {
    this._map = null
    this.shipData = null
    this.radarTimer = null
    this.pollingTimer = null
    this._regList = mmsiTypeList.filter(item => !item.checked).map(v => v.reg) // 需要正则过滤的船舶
    this.openStatus = true // 判断全量船是否开启
    this.showAreaShip = true // 显示全量船参数
    this.openFollow = true // 船舶类型处选择是否 显示关注船
    this.isSuccessGetRadarShipData = true  // 是否成功调用到雷达船接口数据，如果一开就不成功，过10分钟再去轮询
    this.refusePolling = false // 禁用轮询
    this.inBackStatus = false // 是否正在回放
    this.xyData = {}
    this.shipMaps = {}
    this.shipWake = {} // 船舶尾迹对象（对象里面是每次轮询回来的船的经纬度信息数组）
    this.sortArrKeys = [] //根据面积排序后的mmsi数组
    this._drawType = [] // 船舶类型
    this.urgentMMSIArr = [] // 应急管理要渲染的船
    this.followShipList = [] // 关注的船舶
    this.cameraList = [] // 从 getCameraListByMMsi 接口获取的当前mmsi的 list
    this.playBackTime = undefined // 回放的时间（参数 time）
    this.needSector = new Map() //需要绘制扇形的数据
    this.needFilterShipNameList = [] //船名 过滤(1:纯数字 2:闽***渔)
    this.animation = null


    this.deBounceRequest = deBounce(this.requestData, 200)
    this.deBounceAreaShip = deBounce(this.requestData, 500)
  }

  init(map, drawType, urgentMMSIArr = [], needFilterShipNameList = []) { // 初始化
    try {
      this._map = map
      this._drawType = drawType
      this.needFilterShipNameList = needFilterShipNameList
      this.urgentMMSIArr = urgentMMSIArr // 应急管理传递过来要渲染的船
      this.mapEventBind() // 地图事件挂载
      this.destroy()
      this.pollingFunction()  // 轮询全量船
      this.requestAllFollowShip() // 请求关注船接口
      setTimeout(() => {
        moveMarker.addTo(map)
        popupMarker.addTo(map) // 初始化marker
      })
    } catch (error) {
      console.log({ error })
    }
    getPermissionShipsApi().then(res => {
      this.activityShips = res
    })
  }

  requestData(clearCache = false, isDrawShipWake) {
    if(!hasLoginFn()) return this.pollingTimer && clearTimeout(this.pollingTimer)
    this.animationElecFence()
    return new Promise((resolve) => {
      this.showAreaShip = true
      if (this.refusePolling || !this._map) return resolve()
      if (this._map.getZoom() < 12 || !this.openStatus) this.showAreaShip = false
      const [xMin, yMin, xMax, yMax] = canvasUtils.getBoundsLatLng(this._map)
      this.xyData = {
        xMin: xMin - 0.01,
        yMin: yMin - 0.01,
        xMax: xMax + 0.01,
        yMax: yMax + 0.01,
        types: this._drawType,
        time: this.playBackTime,
        showFollowShip: true,
        showAreaShip: this.showAreaShip,
        filterName: this.needFilterShipNameList,
      }
      request.post(WORLD_SHIP_BASE_URL + '/getAreaLatestShip', this.xyData)
      .then(async res => {
        if (this.refusePolling) return console.log('尚在移动或者缩放，不请求全量船数据')
        const {companyName} = getSessionLocal('userInfo');
        let oilConsumption
        if(companyName === '厦门船务'){
          oilConsumption = await getRtFuelConsumption('xgt12-api/ship-client/index/getFlowData');
        }
        this.clearCanvas(clearCache) // 正常情况下不清空缓存，因为缓存存着可以让你快速绘制其他地方的船舶，避免多次请求
        this.handleRadarShipData()
        if (this.urgentMMSIArr.length) { // 应急管理 UrgentMMSIArr数据跟全量船做下筛选，保留筛选后的全量船数据
          const mapUrgent = new Map(this.urgentMMSIArr.map(x => [x, x]))
          res = res.reduce((pre, cur) => {
            mapUrgent.has(cur.mmsi) && pre.push(cur)
            return pre
          }, [])
          this.radarShipList = []
        }
        if (this._regList.length > 0) {
          res= res.filter(v => this._regList.every(v2 => !v2.test(v.mmsi)))
        }
        // 处理船舶数据
        for(let i = 0; i < res.length; i++){
          let ship = res[i];
          if(companyName === '厦门船务' && ship.name === '厦港拖12号'){
            ship = {
              ...ship,
              ...oilConsumption
            }
          }
          this.handleShipData(ship)
          if (!this.shipWake[ship.mmsi + ''] && ship.mmsi.toString().substr(0, 2) !== '99') {
            this.shipWake[ship.mmsi + ''] = []
          }
        }
        if(isFleetOrMapInMap()) {
          shipCrashDetection(this._map).then(res => { //触发碰撞的船舶数据列表
            this.needSector = res
            this.reDraw()
          })
        }
        this.handleShipIcon(this.shipMaps, true, isDrawShipWake) // 准备处理船舶图标
        // console.timeEnd("aaabb")
      })
      .catch(err => {
        this.pollingTimer && clearTimeout(this.pollingTimer)
        console.log('全量船接口 err', err)
      })
      .finally(() => {
        resolve()
      })


    })
  }

  /**
     * 绘制全量船和电子围栏， 这块后续可以将全量船的绘制和电子围栏的绘制通过两个canvas进行管理，避免设置电子围栏动画时
     * 需要不断绘制大量额外内容
     * */
  animationElecFence() {
    //判断是否还有电子围栏
    if(Object.values(this.shipMaps).some(item => item?.enableDynamicArea === 1) && this.animation === null) {
      this.shadowBlur = 5
      this.offset = 2

      const drawElecFence = () => {
        this.clearCanvas(false)
        this.handleShipIcon(this.shipMaps, false)
        this.shadowBlur += this.offset;

        if(this.shadowBlur > 60 || this.shadowBlur < 4){
          this.offset *= -1;
        }
        this.animation = requestAnimationFrame(drawElecFence)
      }
      requestAnimationFrame(drawElecFence)
    }
    if(!Object.values(this.shipMaps).some(item => item?.enableDynamicArea === 1) && this.animation) {
      cancelAnimationFrame(this.animation)
      this.animation = null
    }

  }

  pollingFunction () {
    this.pollingTimer && clearTimeout(this.pollingTimer)
    this.pollingTimer = setTimeout(() => {
      this.requestData(true).finally(() => {
        this.pollingFunction()
      })
    }, timePollingNum * 1000)
  }

  mapEventBind () { // 事件挂载
    this._map.on('moveend', () => { // 因为缩放也会触发 moveend，所以利用防抖避免请求多次接口
      if(this._map.getZoom() < 12 && this.operaType == 'zoom') {
        this.clearCanvas()
      }
      this.refusePolling = false
      this.isSecondView.value = false
      this.deBounceAreaShip()
      this.pollingFunction()
    })
    this._map.on('movestart', ()  => {
      this.refusePolling = true
    })
    this._map.on('move', () => {
      this.reDraw(true)
      this.operaType = 'move'
    })
    this._map.on('zoomend', () => {
      this.operaType = 'zoom'
    })
    this._map.on('mouseup', (e) => {
      if(this.isClickShipOrAnchor) return 0
      this.clickLatlng = e.latlng
    })
    window.onresize = () => this.resize() // 接口有做防抖，应该没关系吧
  }

  reDraw (needChangeShip = false) { // 重绘，不清空数据
    this.clearCanvas(false) // 清空canvas，但是不清空数据
    if (needChangeShip) { // 是否需要改变 ship 在 canvas上的 x,y
      Promise.resolve().then(() => worldDraw.canvasResetOrigin()) // 实时修改地图拖动后，画布的transform
      const [xMin, yMin, xMax, yMax] = canvasUtils.getBoundsLatLng(this._map)
      this.xyData = { xMin, yMin, xMax, yMax, types: this._drawType, time: this.playBackTime }
      for (const key in this.shipMaps) {
        // 获取最新的 shipX shipY areaPos
        const ship = this.shipMaps[key]
        const { lat, lng } = ship
        const { shipX, shipY } = canvasUtils.getShipXY(lat, lng, this._map)
        const canvasShip = canvasUtils.getShipAreaPos({ ...ship, shipX, shipY, rotate: ship.rotate }, this._map)
        this.shipMaps[ship.mmsi] = {
          ...this.shipMaps[ship.mmsi],
          shipX,
          shipY,
          canvasShip
        }
      }

      for(let ship of this.radarShipList) {
        const {lat, lng} = ship
        const { shipX, shipY } = canvasUtils.getShipXY(lat, lng, this._map)
        ship.shipX = shipX
        ship.shipY = shipY
      }
    }
    // 单纯的move改变了ship 的xy ,则不需要去重新加载 shipInfoModal，但 点击事件需要，点击事件触发时 needChangeShip 为false
    this.handleShipIcon(this.shipMaps, !needChangeShip)
  }

  async handleRadarShipData (){ // 新增雷达船舶， 由于数据格式与其余船舶不一样单独存储
    if(!hasRadarAuthFn()) { // 是否有雷达目标的权限
      this.radarShipList = []
      return 0
    }
    if (this.isSuccessGetRadarShipData) {
      //this.radarShipList = []
      this.radarShipList = await getRadarData(() => {
        this.isSuccessGetRadarShipData = true
        this.radarTimer && clearTimeout(this.radarTimer)
      }, () => {
        this.radarTimer && clearTimeout(this.radarTimer)
        this.isSuccessGetRadarShipData = false
        console.log(`雷达船接口404!此后10分钟再发送请求`)
      })
    } else {
      this.radarTimer = setTimeout(() => {
        getRadarData(() => {
          this.isSuccessGetRadarShipData = true
          this.radarTimer && clearTimeout(this.radarTimer)
        }, () => {
          this.radarTimer && clearTimeout(this.radarTimer)
          this.isSuccessGetRadarShipData = false
          console.log(`雷达接口是否:${this.isSuccessGetRadarShipData}`)
        })
      }, 6000 * 1000)
    }
  }

  canvasPlayBack(time, isDrawShipWake) { // 开始回放
    this.shipData = null
    if (popupMarker) popupMarker.closePopup()
    this.destroy() // 停止之前的轮询
    this.clearCanvas(true) // 清空当前画布和缓存
    this.inBackStatus = true // 回放标识切换

    this.playbackTimeChange(time, isDrawShipWake)
  }
  setWatchingStatus(shipData, type) {
    //const content = canvasUtils.getPopupContent(this.shipData)
    //popupMarker.setPopupContent(content)
    //开启或关闭动态警戒圈
    const { enableDynamicArea } = shipData
    if(type === 0 &&  enableDynamicArea === 1) {
      setShipWatchingStatus(shipData, type)
    }
    if( type === 1 ) {
      setShipWatchingStatus(shipData, type)
    }
    popupMarker.closePopup()
  }

  playbackTimeChange(time, isDrawShipWake) { // 调整回放时间， 同时也可以用来关闭回放
    if (!Boolean(time)) {
      this.inBackStatus = false
      this.pollingFunction()
    }
    this.playBackTime = time
    this.deBounceRequest(true, isDrawShipWake)
  }

  async requestAllFollowShip () {
    this.followShipList = await getFollowShipList()
    this.reDraw()
  }

  typeChange (drawType, urgentMMSIArr = []) {
    this._drawType = drawType // drawType 改变需要清空缓存
    this.shipMaps = {}
    this.urgentMMSIArr = urgentMMSIArr
    this.deBounceRequest(true)
  }

  filterMmsiType (regList) {
    this._regList = regList
    this.deBounceRequest(true)
  }

  filterShipNameList(needFilterShipNameList) {
    this.needFilterShipNameList = needFilterShipNameList
    this.deBounceRequest(true)
  }

  toggleFollow (showFollow) {
    this.openFollow = showFollow
    this.reDraw()
  }

  handleShipData (ship, divisor=10, searchFlag=false) {
    if (!ship.lat || !ship.lon) return false;
    const map = this._map;
    this.shipMaps[ship.mmsi] = addShipItemObj(ship, divisor, map, searchFlag)
    this.handleShipWakeList(ship) // 处理尾迹列表
    return true
  }

  // (!!!待优化!!!)
  handleShipIcon(shipMaps, needDraw = true, isDrawShipWake = true) {
    const systemShipMap = store.getters.systemShipMap
    const {openFollow, inBackStatus, playBackTime, radarShipList} = this
    let shipInCanvas = false, isDrawRadarShip = false //雷达船是否已绘制
    this.sortArrKeys = sortByShipArea(shipMaps) //根据面积进行排序, 返回排序后的mmsi数组

    if (!this.openFollow) { // 关注船点击的切换，判断页面上的轨迹
      const followShipMap = new Map(this.followShipList.map(item => [item + '', item + '']))
      for (let key in this.shipWake) {
        if (followShipMap.has(key)) this.shipWake[key] = [] // 清空当前关注船的轨迹数据
      }
    }
    for (const key of this.sortArrKeys) { // 遍历区块内获取的shipMaps,再将其绘制在区块内
      const ship = shipMaps[key]
      const {mmsi, customShipType, searchFlag, canvasShip: {type, area}} = ship
      // 如果是需要绘制尾迹的船舶
      if (this.shipWake[ship.mmsi + '']) {
        if (isDrawShipWake && store.state.fleet.isDrawShipWake) {
          worldDraw.drawShipWake(ship, this.shipWake[mmsi + ''], this._map)
        }
      }
      if (searchFlag) continue
      const isBackAndSystem = (openFollow || inBackStatus) && systemShipMap.has(mmsi)
      if (isBackAndSystem) { // 回放模式或关注船开关打开且为系统船，那么用绘制系统船的方式绘制
        const fillStyle = shipTypeMapColor.has(customShipType) ? shipTypeMapColor.get(customShipType) : '#f00'

        if (isFleetOrMapInMap()) {
          worldDraw.drawSystemShipIcon(ship, fillStyle, playBackTime)
        }
      } else if (!systemShipMap.has(mmsi)) {
        let fillStyle = '#faf763'
        //如果绘制船舶外观为菱形，使用淡黄色
        if (type === 'rhombus') fillStyle = 'transparent'
        // 为了根据面积大小排序绘制，将雷达船绘制插入到船舶列表
        if(radarShipList.length) {
          if(area < radarShipList[0].area && !isDrawRadarShip) {
            for(let ship of radarShipList) {
              worldDraw.drawRadarShip(ship)
            }
            isDrawRadarShip = true
          }
        }
        worldDraw.drawActualShipIcon(ship, fillStyle, playBackTime, inBackStatus)
      }
      // 如果mmsi一样，那么赋值成 shipData
      if (this.shipData && this.shipData.mmsi == mmsi) {
        shipInCanvas = true
        this.shipData = ship
      }
      // 给活动船添加字段颜色
      if (Object.keys(this.activityShips).length > 0) {
        const {red, green} = this.activityShips
        if(red?.length > 0) {
          for(let activityMmsi of red) {
            if(activityMmsi == mmsi) {
              ship.isRedActivity = true
            }
          }
        }
        if(green?.length > 0) {
          for(let activityMmsi of green) {
            if(activityMmsi == mmsi) {
              ship.isGreenActivity = true
            }
          }
        }
      }
    }
    for (const key in shipMaps) {
      const ship = shipMaps[key]
      if (ship.searchFlag) continue
      const isBackAndSystem = (openFollow || inBackStatus) && systemShipMap.has(ship.mmsi)
      if (isBackAndSystem) {
        if (isFleetOrMapInMap()) worldDraw.drawShipName(ship, true)
      } else if (!systemShipMap.has(ship.mmsi)) {
        if (this._map.getZoom() > 12) worldDraw.drawShipName(ship) // 绘制船名
      }
    }

    if (shipInCanvas && !this.shipData.searchFlag) { // 判断是否绘制红框 和 修改 popup 的位置
      worldDraw.drawRedBox(this.shipData)
      popupMarker.setLatLng([this.shipData.lat, this.shipData.lng])
    } else if (!shipInCanvas) {
      if (popupMarker) popupMarker.closePopup()
    }

    // 若存在 shipData ，则请求左边 shipInfoModal 的数据popupMarker
    if (this.shipData && needDraw) {
      getShipItemInfo(this.shipData.mmsi)
    }
    // 以下是 -> 页面上搜索单船时候用到的逻辑时候 (searchShipTrigger -> reDraw -> handleShipIcon)
    if (this.shipData && this.shipData.searchFlag) {
      // console.log('有搜索操作，要进来逻辑')
      const ship = this.shipData
      const flag = this.handleShipData(ship, 1, true)
      if (flag) {
        this.shipData = this.shipMaps[ship.mmsi] // 赋值
        const fillStyle = '#faf763'
        worldDraw.drawActualShipIcon(this.shipMaps[ship.mmsi], fillStyle, this.playBackTime)
        // 绘制船名
        if (this._map.getZoom() > 12) worldDraw.drawShipName(this.shipMaps[ship.mmsi])
        worldDraw.drawRedBox(this.shipData)
        popupMarker.setLatLng([this.shipData.lat, this.shipData.lng])
      }
    }
  }

  handleShipWakeList (ship) { // (!!!待优化!!! 这里filter处理的尾迹逻辑会增加时间复杂度为O(n2))
    const {mmsi} = ship
    let wakeItemList = this.shipWake[mmsi + '']
    const shipMap = this.shipMaps[mmsi]
    if (!wakeItemList || !shipMap) return
    const {lat, lng, posTime} = shipMap
    const { lat: newLat, lng: newLng } = canvasUtils.originToTrans(lat, lng)
    const wakeItemObj = { lat, lng, posTime }

    if (wakeItemList.length === 0) {
      wakeItemList.push(wakeItemObj)
    } else {
      const { lat, lng, posTime } = wakeItemList[wakeItemList.length - 1] // 获取当前mmsi对应尾迹数据的最后一个值
      if (lat !== newLat || lng !== newLng) {
        // 过滤跳点 如果与上一个点航速超过50kn/h则不绘制
        const intervalTime = (wakeItemObj.posTime - posTime) / (60 * 60) // 间隔时间 单位： 小时
        const d = this._map.distance([lat, lng], [newLat, newLng]) / 1852 // 距离 单位： 海里
        const speed = d / intervalTime // 速度：kn/h
        if(speed <= 50) wakeItemList.push(wakeItemObj)
        // 超过5分钟的清除
        this.shipWake[mmsi + ''] = wakeItemList.filter(v => Date.now() - v.posTime * 1000 <= 3e5)
      }
    }
  }

  clearShipData () { // 外部调用
    this.shipData = null
    if (popupMarker) popupMarker.closePopup()
    this.reDraw(false)
  }

  clickEventTrigger (ship, showPopup = true) { // 点击事件触发的其他逻辑
    if (this.inBackStatus) return
    this.shipData = ship // 点击时赋值 shipData
    store.commit('fleet/SET_CURRENT_CLICK_SHIP', [{ ...ship }])
    showPopup && createPopup(this.shipData) // 创建 popup
    this.reDraw(false) // 重绘制canvas，这时候因为有 shipData 所以可以有红框
  }

  clickDrawerShipTrigger (mmsi, shipData = null) { //
    const ship = this.shipMaps[mmsi] ? this.shipMaps[mmsi] : shipData
    const { lat, lng } = ship
    if (lat && lng && this._map) {
      this.clickEventTrigger(ship)
      setTimeout(() => {this._map.setView([lat, lng], 14)}, 20)
    } else {
      message.error('该船舶经纬度异常')
    }
  }

  async searchShipTrigger(mmsi, needOpenShipInfo = true) {
    if (needOpenShipInfo === true) {
      store.commit('fleet/SET_NO_OPEN_SHIP_INFO_MARK', 1)
    }
    if(!this._map) this._map = singleShipMap.$map
    const isSystem = store.state.shipsList.some(ship => ship.mmsi == mmsi)
    if (isSystem) {
      this.clickDrawerShipTrigger(mmsi)
    } else {
      const res = await getShipDetails({ params: { mmsi } })
      if (res.status === 0) {
        const ship = res.data
        ship.lat = ship.lat || ship.latitude
        ship.lon = ship.lon || ship.longitude
        if (!ship.lat || !ship.lon) return message.error('该船舶经纬度异常')
        const { lat, lng: lon } = canvasUtils.lnglatsTrans(ship.lat, ship.lon)
        this.shipData = { ...ship, lat, lon, name: ship.shipName, searchFlag: true }
        setTimeout(() => {
          this._map.setView([lat, lon], 14)
          if (this.currentShip?.mmsi === ship.mmsi && this.currentShip?.hasWaterRippleDiffusionAnimation) {
            //同一艘船(3s内)
            return
          }
          //因为搜索船舶花费的时间比较长理论上来说3s内不够同时搜索两艘附近的船 所以不需要清除上一次的layer以及定时器
          const layer = L.marker([lat, lon], {
            icon: L.divIcon({
              html: `<div class="circleBox">
                     <div class="circle"></div>
                     <div class="circle1"></div>
                     <div class="circle2"></div>
                     <div class="circle3"></div>
                     </div>`,
            }),
            zIndexOffset: -9999,
          })
          layer.addTo(this._map)
          this.currentShip = {
            mmsi: ship.mmsi || '',
            hasWaterRippleDiffusionAnimation: true,
          }
          setTimeout(() => {
            layer.remove()
            this.currentShip = {}
          }, 3000)
         // this.reDraw(true)
        }, 20)
      }
    }
  }

  clearCanvas (clearData = true) { // 清空画布
    worldDraw.clear()
    if (clearData) this.shipMaps = {}
  }

  destroy () {
    this.radarShipList = []
    this.isSuccessGetRadarShipData = true
    this.radarTimer && clearTimeout(this.radarTimer)
    this.pollingTimer && clearTimeout(this.pollingTimer)
    this.playBackTime = undefined
    this.shipMaps = {}
    this.shipWake = {}
    this.needSector.clear()
    cancelAnimationFrame(this.animation)
    this.animation = null
    //closeWatchingShipTimer()
  }

  open () {
    this.openStatus = true
    this.deBounceRequest()
  }

  close () {
    this.openStatus = false
    this.shipMaps = {} // 清空数据  重新绘制，排除系统船。
    this.deBounceRequest()
  }

  resize () {
    setTimeout(() => {
      const { x: width, y: height } = this._map.getSize()
      worldDraw.canvas.width = worldDraw.CW = width
      worldDraw.canvas.height = worldDraw.CH = height
      this.deBounceRequest()
    })
  }
}
export default new WorldRequest()
export {WorldRequest}
