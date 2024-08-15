import L from 'leaflet'
import arrowImage1 from '@/assets/img/arrows/arrow1.png'
import arrowImage2 from '@/assets/img/arrows/arrow2.png'
import arrowImage3 from '@/assets/img/arrows/arrow3.png'
import arrowImage4 from '@/assets/img/arrows/arrow4.png'
import arrowImage5 from '@/assets/img/arrows/arrow5.png'
import arrowImage6 from '@/assets/img/arrows/arrow6.png'
import arrowImage7 from '@/assets/img/arrows/arrow7.png'
import arrowImage8 from '@/assets/img/arrows/arrow8.png'
import arrowImage9 from '@/assets/img/arrows/arrow9.png'
import arrowImage10 from '@/assets/img/arrows/arrow10.png'

const con = {
  // STATE_URL_NEW: `http://www.google.cn/maps/vt?lyrs=s@804&gl=${ navigator.language.includes("zh") ? "zh_CN" : "en" }&x={x}&y={y}&z={z}`,
  STATE_URL_NEW: `http://maps1.shipdt.com/vt?lyrs=y&hl=zh-CN&gl=CN&z={z}&x={x}&y={y}`,
  // MAP_URL:  `http://www.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i342009817!3m9!2s${ navigator.language.includes("zh") ? "zh_CN" : "en" }!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0`
  MAP_URL: `http://maps{s}.shipdt.com/vt/lyrs=m&hl=zh-CN&gl=${navigator.language.includes('zh') ? 'zh_CN' : 'en'}&s=Gal&z={z}&x={x}&y={y}`
}

export const mapZoomCrs = {
  minZoom: 3,
  maxZoom: 18,
  crs: L.CRS.EPSG3857,
  subdomains:[1,2,3,4,5,6,7],
  // zoomSnap: 0.5,
}

export const coeff = 600000 // 精度系数

export const voyageColors = ['#0073F5', '#9C27B0', '#FF6501','#008A3E','#B71B61','#C5912E','#FF0000','#FF01C1','#E91E63','#00BCD4']
const tileUrlName = 'https://t{s}.tianditu.gov.cn'
export const TDLayerURL = `${tileUrlName}/DataServer/?T=cva_w&X={x}&Y={y}&L={z}&tk={key}`

export const key = '8c16062efc93b72c81d8d1cacb19fceb'
export const TDLayerConfig = {
  ...mapZoomCrs,
  id: 'map',
  key,
  center: [24.48996, 118.083457],
  continuousWorld: true,
  attributionControl: false,
  // zoomSnap: 0.5,
}

export const TDLayer = new L.TileLayer(TDLayerURL, TDLayerConfig)

export const mapLayer = L.tileLayer(`${tileUrlName}/DataServer/?T=vec_w&x={x}&y={y}&l={z}&tk={key}`, {
  ...mapZoomCrs,
  key,
  subdomains:[1,2,3,4,5,6,7],
  // zoomSnap: 0.5,
})

export const satelliteLayer = L.tileLayer(
  `${tileUrlName}/DataServer/?T=img_w&X={x}&Y={y}&L={z}&tk={key}`,
  {
    ...mapZoomCrs,
    key: key,
    attribution: false,
    subdomains:[1,2,3,4,5,6,7],
    // zoomSnap: 0.5,
  }
)

export const arrowImageArr = [arrowImage1, arrowImage2, arrowImage3, arrowImage4, arrowImage5, arrowImage6, arrowImage7, arrowImage8, arrowImage9, arrowImage10]


export default con
