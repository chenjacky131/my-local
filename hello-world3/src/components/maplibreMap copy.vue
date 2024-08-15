<template>
  <div id="map">
    <!-- <DrawContainer ref="drawContainer" mapRef="map" /> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import maplibregl from 'maplibre-gl';
import * as turf from "@turf/turf";
import {
  TerraDraw,
  TerraDrawPointMode,
  TerraDrawCircleMode,
  TerraDrawLineStringMode,
  TerraDrawPolygonMode,
  TerraDrawSelectMode,
  TerraDrawFreehandMode,
  TerraDrawRectangleMode,
  TerraDrawMapLibreGLAdapter,
  TerraDrawGreatCircleMode
} from 'terra-draw';
import { generateBigShipImage } from './hooks/useCanvasGenerateImage';
import { getMapRatio } from '../components/mymap/utils';
let fakeData = {
  "data": [
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413694120,
        "heading": 343,
        "length": 37,
        "lon": 70842640,
        "speed": 0,
        "name": "XIANG LU 9",
        "shipType": 60,
        "course": 190,
        "lat": 14671782
      },
      {
        "posTime": 1705883301,
        "breadth": 9,
        "mmsi": 413694120,
        "heading": 343,
        "length": 37,
        "lon": 70842640,
        "speed": 0,
        "name": "XIANG LU 9",
        "shipType": 60,
        "course": 190,
        "lat": 14671782
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413694120,
        "heading": 343,
        "length": 37,
        "lon": 70842640,
        "speed": 0,
        "name": "XIANG LU 9",
        "shipType": 60,
        "course": 190,
        "lat": 14671782
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 314,
        "length": 39,
        "lon": 70842686,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1344,
        "lat": 14671812
      },
      {
        "posTime": 1705883167,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 314,
        "length": 39,
        "lon": 70842686,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1344,
        "lat": 14671810
      },
      {
        "posTime": 1705883186,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 314,
        "length": 39,
        "lon": 70842686,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1449,
        "lat": 14671808
      },
      {
        "posTime": 1705883207,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 313,
        "length": 39,
        "lon": 70842687,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1571,
        "lat": 14671813
      },
      {
        "posTime": 1705883217,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 313,
        "length": 39,
        "lon": 70842684,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1498,
        "lat": 14671810
      },
      {
        "posTime": 1705883237,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 312,
        "length": 39,
        "lon": 70842683,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1615,
        "lat": 14671820
      },
      {
        "posTime": 1705883267,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 312,
        "length": 39,
        "lon": 70842684,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1474,
        "lat": 14671814
      },
      {
        "posTime": 1705883268,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 312,
        "length": 39,
        "lon": 70842685,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1474,
        "lat": 14671813
      },
      {
        "posTime": 1705883306,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 312,
        "length": 39,
        "lon": 70842688,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1528,
        "lat": 14671807
      },
      {
        "posTime": 1705883327,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 313,
        "length": 39,
        "lon": 70842684,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1510,
        "lat": 14671808
      },
      {
        "posTime": 1705883347,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 314,
        "length": 39,
        "lon": 70842687,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1410,
        "lat": 14671814
      },
      {
        "posTime": 1705883366,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 314,
        "length": 39,
        "lon": 70842684,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1286,
        "lat": 14671810
      },
      {
        "posTime": 1705883387,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 314,
        "length": 39,
        "lon": 70842681,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1169,
        "lat": 14671809
      },
      {
        "posTime": 1705883397,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 313,
        "length": 39,
        "lon": 70842681,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1304,
        "lat": 14671813
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 412458260,
        "heading": 314,
        "length": 39,
        "lon": 70842681,
        "speed": 0,
        "name": "CHENG GONG YOU BAHAO",
        "shipType": 60,
        "course": 1169,
        "lat": 14671713
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 413700650,
        "heading": 314,
        "length": 50,
        "lon": 70842306,
        "speed": 0,
        "name": "TAI GU SAN HAO",
        "shipType": 60,
        "course": 574,
        "lat": 14672140
      },
      {
        "posTime": 1705883305,
        "breadth": 10,
        "mmsi": 413700650,
        "heading": 314,
        "length": 50,
        "lon": 70842306,
        "speed": 0,
        "name": "TAI GU SAN HAO",
        "shipType": 60,
        "course": 574,
        "lat": 14672140
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 413700650,
        "heading": 314,
        "length": 50,
        "lon": 70842306,
        "speed": 0,
        "name": "TAI GU SAN HAO",
        "shipType": 60,
        "course": 574,
        "lat": 14672140
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 0,
        "mmsi": 413696810,
        "heading": 0,
        "length": 0,
        "lon": 70824240,
        "speed": 0,
        "name": "HAI DA 788",
        "shipType": 80,
        "course": 3600,
        "lat": 14654331
      },
      {
        "posTime": 1705883160,
        "breadth": 0,
        "mmsi": 413696810,
        "heading": 0,
        "length": 0,
        "lon": 70824240,
        "speed": 0,
        "name": "HAI DA 788",
        "shipType": 80,
        "course": 3600,
        "lat": 14654331
      },
      {
        "posTime": 1705883445,
        "breadth": 0,
        "mmsi": 413696810,
        "heading": 0,
        "length": 0,
        "lon": 70824240,
        "speed": 0,
        "name": "HAI DA 788",
        "shipType": 80,
        "course": 3600,
        "lat": 14654331
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 14,
        "mmsi": 413698350,
        "heading": 13,
        "length": 96,
        "lon": 70825728,
        "speed": 0,
        "name": "HAI DA 288",
        "shipType": 81,
        "course": 3055,
        "lat": 14671592
      },
      {
        "posTime": 1705883169,
        "breadth": 14,
        "mmsi": 413698350,
        "heading": 13,
        "length": 96,
        "lon": 70825728,
        "speed": 0,
        "name": "HAI DA 288",
        "shipType": 81,
        "course": 3055,
        "lat": 14671592
      },
      {
        "posTime": 1705883349,
        "breadth": 14,
        "mmsi": 413698350,
        "heading": 13,
        "length": 96,
        "lon": 70825728,
        "speed": 0,
        "name": "HAI DA 288",
        "shipType": 81,
        "course": 3055,
        "lat": 14671592
      },
      {
        "posTime": 1705883445,
        "breadth": 14,
        "mmsi": 413698350,
        "heading": 13,
        "length": 96,
        "lon": 70825728,
        "speed": 0,
        "name": "HAI DA 288",
        "shipType": 81,
        "course": 3055,
        "lat": 14671592
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412443027,
        "heading": 0,
        "length": 8,
        "lon": 70799802,
        "speed": 0,
        "name": "MINLONGYU01305",
        "shipType": 30,
        "course": 0,
        "lat": 14645055
      },
      {
        "posTime": 1705883250,
        "breadth": 3,
        "mmsi": 412443027,
        "heading": 0,
        "length": 8,
        "lon": 70799802,
        "speed": 0,
        "name": "MINLONGYU01305",
        "shipType": 30,
        "course": 0,
        "lat": 14645055
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412443027,
        "heading": 0,
        "length": 8,
        "lon": 70799802,
        "speed": 0,
        "name": "MINLONGYU01305",
        "shipType": 30,
        "course": 0,
        "lat": 14645055
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 412704030,
        "heading": 52,
        "length": 53,
        "lon": 70822125,
        "speed": 0,
        "name": "HAI GONG 169",
        "shipType": 80,
        "course": 3600,
        "lat": 14657797
      },
      {
        "posTime": 1705883220,
        "breadth": 9,
        "mmsi": 412704030,
        "heading": 52,
        "length": 53,
        "lon": 70822120,
        "speed": 0,
        "name": "HAI GONG 169",
        "shipType": 80,
        "course": 3600,
        "lat": 14657801
      },
      {
        "posTime": 1705883353,
        "breadth": 9,
        "mmsi": 412704030,
        "heading": 46,
        "length": 53,
        "lon": 70822110,
        "speed": 0,
        "name": "HAI GONG 169",
        "shipType": 80,
        "course": 0,
        "lat": 14657809
      },
      {
        "posTime": 1705883408,
        "breadth": 9,
        "mmsi": 412704030,
        "heading": 36,
        "length": 53,
        "lon": 70822104,
        "speed": 0,
        "name": "HAI GONG 169",
        "shipType": 80,
        "course": 3600,
        "lat": 14657793
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 412704030,
        "heading": 46,
        "length": 53,
        "lon": 70822132,
        "speed": 0,
        "name": "HAI GONG 169",
        "shipType": 80,
        "course": 0,
        "lat": 14657869
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 127,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658516
      },
      {
        "posTime": 1705883149,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 127,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658516
      },
      {
        "posTime": 1705883169,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 129,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658516
      },
      {
        "posTime": 1705883189,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 130,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658508
      },
      {
        "posTime": 1705883209,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 130,
        "length": 52,
        "lon": 70820959,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658504
      },
      {
        "posTime": 1705883228,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 130,
        "length": 52,
        "lon": 70820959,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658496
      },
      {
        "posTime": 1705883248,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 129,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658501
      },
      {
        "posTime": 1705883278,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 124,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658492
      },
      {
        "posTime": 1705883288,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 122,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658492
      },
      {
        "posTime": 1705883298,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 121,
        "length": 52,
        "lon": 70820952,
        "speed": 1,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658487
      },
      {
        "posTime": 1705883319,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 119,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658483
      },
      {
        "posTime": 1705883329,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 118,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658483
      },
      {
        "posTime": 1705883358,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 118,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658492
      },
      {
        "posTime": 1705883368,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 118,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658489
      },
      {
        "posTime": 1705883389,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 118,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658496
      },
      {
        "posTime": 1705883408,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 120,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658496
      },
      {
        "posTime": 1705883420,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 120,
        "length": 52,
        "lon": 70820952,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658498
      },
      {
        "posTime": 1705883439,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 122,
        "length": 52,
        "lon": 70820935,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658501
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 412704020,
        "heading": 120,
        "length": 52,
        "lon": 70821198,
        "speed": 0,
        "name": "HAI GONG 166",
        "shipType": 80,
        "course": 3600,
        "lat": 14658455
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 14,
        "mmsi": 412503960,
        "heading": 0,
        "length": 62,
        "lon": 70817400,
        "speed": 0,
        "name": "YUE XIN HE 819",
        "shipType": 70,
        "course": 1692,
        "lat": 14659283
      },
      {
        "posTime": 1705883169,
        "breadth": 14,
        "mmsi": 412503960,
        "heading": 0,
        "length": 62,
        "lon": 70817400,
        "speed": 0,
        "name": "YUE XIN HE 819",
        "shipType": 70,
        "course": 1692,
        "lat": 14659281
      },
      {
        "posTime": 1705883190,
        "breadth": 14,
        "mmsi": 412503960,
        "heading": 0,
        "length": 62,
        "lon": 70817400,
        "speed": 0,
        "name": "YUE XIN HE 819",
        "shipType": 70,
        "course": 1692,
        "lat": 14659279
      },
      {
        "posTime": 1705883214,
        "breadth": 14,
        "mmsi": 412503960,
        "heading": 0,
        "length": 62,
        "lon": 70817398,
        "speed": 0,
        "name": "YUE XIN HE 819",
        "shipType": 70,
        "course": 1692,
        "lat": 14659278
      },
      {
        "posTime": 1705883299,
        "breadth": 14,
        "mmsi": 412503960,
        "heading": 0,
        "length": 62,
        "lon": 70817397,
        "speed": 0,
        "name": "YUE XIN HE 819",
        "shipType": 70,
        "course": 1692,
        "lat": 14659269
      },
      {
        "posTime": 1705883344,
        "breadth": 14,
        "mmsi": 412503960,
        "heading": 0,
        "length": 62,
        "lon": 70817395,
        "speed": 0,
        "name": "YUE XIN HE 819",
        "shipType": 70,
        "course": 1692,
        "lat": 14659264
      },
      {
        "posTime": 1705883389,
        "breadth": 14,
        "mmsi": 412503960,
        "heading": 0,
        "length": 62,
        "lon": 70817395,
        "speed": 0,
        "name": "YUE XIN HE 819",
        "shipType": 70,
        "course": 1692,
        "lat": 14659262
      },
      {
        "posTime": 1705883434,
        "breadth": 14,
        "mmsi": 412503960,
        "heading": 0,
        "length": 62,
        "lon": 70817397,
        "speed": 0,
        "name": "YUE XIN HE 819",
        "shipType": 70,
        "course": 1692,
        "lat": 14659261
      },
      {
        "posTime": 1705883445,
        "breadth": 14,
        "mmsi": 412503960,
        "heading": 0,
        "length": 62,
        "lon": 70817385,
        "speed": 0,
        "name": "YUE XIN HE 819",
        "shipType": 70,
        "course": 1692,
        "lat": 14659267
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412440219,
        "heading": 0,
        "length": 7,
        "lon": 70840362,
        "speed": 51,
        "name": "MINLONGYU08508",
        "shipType": 30,
        "course": 1574,
        "lat": 14668716
      },
      {
        "posTime": 1705883217,
        "breadth": 3,
        "mmsi": 412440219,
        "heading": 0,
        "length": 7,
        "lon": 70840362,
        "speed": 51,
        "name": "MINLONGYU08508",
        "shipType": 30,
        "course": 1574,
        "lat": 14669736
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412440219,
        "heading": 0,
        "length": 7,
        "lon": 70840362,
        "speed": 51,
        "name": "MINLONGYU08508",
        "shipType": 30,
        "course": 1574,
        "lat": 14672963
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 6,
        "mmsi": 412704150,
        "heading": 14,
        "length": 26,
        "lon": 70828293,
        "speed": 0,
        "name": "YONG HONG HAO",
        "shipType": 60,
        "course": 3169,
        "lat": 14647339
      },
      {
        "posTime": 1705883257,
        "breadth": 6,
        "mmsi": 412704150,
        "heading": 14,
        "length": 26,
        "lon": 70828292,
        "speed": 0,
        "name": "YONG HONG HAO",
        "shipType": 60,
        "course": 3169,
        "lat": 14647339
      },
      {
        "posTime": 1705883430,
        "breadth": 6,
        "mmsi": 412704150,
        "heading": 14,
        "length": 26,
        "lon": 70828290,
        "speed": 0,
        "name": "YONG HONG HAO",
        "shipType": 60,
        "course": 3522,
        "lat": 14647339
      },
      {
        "posTime": 1705883445,
        "breadth": 6,
        "mmsi": 412704150,
        "heading": 14,
        "length": 26,
        "lon": 70828293,
        "speed": 0,
        "name": "YONG HONG HAO",
        "shipType": 60,
        "course": 3169,
        "lat": 14647339
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 56,
        "mmsi": 994126419,
        "heading": 0,
        "length": 456,
        "lon": 70798683,
        "speed": 0,
        "name": "609",
        "shipType": -1,
        "course": 0,
        "lat": 14668117
      },
      {
        "posTime": 1705883147,
        "breadth": 56,
        "mmsi": 994126419,
        "heading": 0,
        "length": 456,
        "lon": 70798683,
        "speed": 0,
        "name": "609",
        "shipType": -1,
        "course": 0,
        "lat": 14668117
      },
      {
        "posTime": 1705883445,
        "breadth": 56,
        "mmsi": 994126419,
        "heading": 0,
        "length": 456,
        "lon": 70798683,
        "speed": 0,
        "name": "609",
        "shipType": -1,
        "course": 0,
        "lat": 14668117
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656660
      },
      {
        "posTime": 1705883172,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656660
      },
      {
        "posTime": 1705883217,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656660
      },
      {
        "posTime": 1705883237,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656650
      },
      {
        "posTime": 1705883257,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656650
      },
      {
        "posTime": 1705883302,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656650
      },
      {
        "posTime": 1705883324,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822711,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656653
      },
      {
        "posTime": 1705883347,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656650
      },
      {
        "posTime": 1705883392,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656650
      },
      {
        "posTime": 1705883437,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656650
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413697210,
        "heading": 0,
        "length": 53,
        "lon": 70822710,
        "speed": 0,
        "name": "HAI DA 968",
        "shipType": 80,
        "course": 1832,
        "lat": 14656650
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 2,
        "mmsi": 412442893,
        "heading": 0,
        "length": 8,
        "lon": 70820764,
        "speed": 0,
        "name": "MINLONGYU63998",
        "shipType": 30,
        "course": 0,
        "lat": 14649286
      },
      {
        "posTime": 1705883279,
        "breadth": 2,
        "mmsi": 412442893,
        "heading": 0,
        "length": 8,
        "lon": 70820764,
        "speed": 0,
        "name": "MINLONGYU63998",
        "shipType": 30,
        "course": 0,
        "lat": 14649286
      },
      {
        "posTime": 1705883445,
        "breadth": 2,
        "mmsi": 412442893,
        "heading": 0,
        "length": 8,
        "lon": 70820764,
        "speed": 0,
        "name": "MINLONGYU63998",
        "shipType": 30,
        "course": 0,
        "lat": 14649286
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 309,
        "length": 38,
        "lon": 70842722,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 0,
        "lat": 14671843
      },
      {
        "posTime": 1705883156,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 309,
        "length": 38,
        "lon": 70842721,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 0,
        "lat": 14671842
      },
      {
        "posTime": 1705883165,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 309,
        "length": 38,
        "lon": 70842720,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1347,
        "lat": 14671841
      },
      {
        "posTime": 1705883196,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 309,
        "length": 38,
        "lon": 70842721,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1390,
        "lat": 14671844
      },
      {
        "posTime": 1705883215,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 309,
        "length": 38,
        "lon": 70842718,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1420,
        "lat": 14671843
      },
      {
        "posTime": 1705883235,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 308,
        "length": 38,
        "lon": 70842723,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1421,
        "lat": 14671842
      },
      {
        "posTime": 1705883255,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 308,
        "length": 38,
        "lon": 70842727,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1373,
        "lat": 14671840
      },
      {
        "posTime": 1705883275,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 308,
        "length": 38,
        "lon": 70842726,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1298,
        "lat": 14671839
      },
      {
        "posTime": 1705883315,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 308,
        "length": 38,
        "lon": 70842727,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1357,
        "lat": 14671840
      },
      {
        "posTime": 1705883365,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 309,
        "length": 38,
        "lon": 70842729,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 0,
        "lat": 14671839
      },
      {
        "posTime": 1705883375,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 309,
        "length": 38,
        "lon": 70842727,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1337,
        "lat": 14671839
      },
      {
        "posTime": 1705883395,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 308,
        "length": 38,
        "lon": 70842724,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1441,
        "lat": 14671837
      },
      {
        "posTime": 1705883425,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 308,
        "length": 38,
        "lon": 70842721,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1277,
        "lat": 14671839
      },
      {
        "posTime": 1705883435,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 309,
        "length": 38,
        "lon": 70842717,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1336,
        "lat": 14671841
      },
      {
        "posTime": 1705883445,
        "breadth": 8,
        "mmsi": 412458250,
        "heading": 309,
        "length": 38,
        "lon": 70842718,
        "speed": 0,
        "name": "CHENGGONGYOULIUHAO",
        "shipType": 60,
        "course": 1418,
        "lat": 14671840
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669896
      },
      {
        "posTime": 1705883149,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669896
      },
      {
        "posTime": 1705883169,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831972,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669896
      },
      {
        "posTime": 1705883188,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669898
      },
      {
        "posTime": 1705883209,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 192,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669896
      },
      {
        "posTime": 1705883220,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669896
      },
      {
        "posTime": 1705883248,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 192,
        "length": 43,
        "lon": 70831972,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669892
      },
      {
        "posTime": 1705883258,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831974,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669892
      },
      {
        "posTime": 1705883280,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669890
      },
      {
        "posTime": 1705883299,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669892
      },
      {
        "posTime": 1705883318,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669890
      },
      {
        "posTime": 1705883340,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831970,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669890
      },
      {
        "posTime": 1705883368,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831968,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669892
      },
      {
        "posTime": 1705883378,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831968,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669892
      },
      {
        "posTime": 1705883400,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669892
      },
      {
        "posTime": 1705883419,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669890
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 413703690,
        "heading": 193,
        "length": 43,
        "lon": 70831971,
        "speed": 0,
        "name": "LU JIANG 81",
        "shipType": 60,
        "course": 2998,
        "lat": 14669918
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 14,
        "mmsi": 413696010,
        "heading": 97,
        "length": 96,
        "lon": 70821975,
        "speed": 0,
        "name": "HAIDA588",
        "shipType": 83,
        "course": 3060,
        "lat": 14655174
      },
      {
        "posTime": 1705883274,
        "breadth": 14,
        "mmsi": 413696010,
        "heading": 97,
        "length": 96,
        "lon": 70821975,
        "speed": 0,
        "name": "HAIDA588",
        "shipType": 83,
        "course": 3060,
        "lat": 14655174
      },
      {
        "posTime": 1705883445,
        "breadth": 14,
        "mmsi": 413696010,
        "heading": 97,
        "length": 96,
        "lon": 70821975,
        "speed": 0,
        "name": "HAIDA588",
        "shipType": 83,
        "course": 3060,
        "lat": 14655174
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 413694730,
        "heading": 0,
        "length": 54,
        "lon": 70823980,
        "speed": 0,
        "name": "HAI DA 768",
        "shipType": 81,
        "course": 3600,
        "lat": 14657020
      },
      {
        "posTime": 1705883251,
        "breadth": 10,
        "mmsi": 413694730,
        "heading": 0,
        "length": 54,
        "lon": 70823980,
        "speed": 0,
        "name": "HAI DA 768",
        "shipType": 81,
        "course": 3600,
        "lat": 14657039
      },
      {
        "posTime": 1705883431,
        "breadth": 10,
        "mmsi": 413694730,
        "heading": 0,
        "length": 54,
        "lon": 70823979,
        "speed": 0,
        "name": "HAI DA 768",
        "shipType": 81,
        "course": 3600,
        "lat": 14657072
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 413694730,
        "heading": 0,
        "length": 54,
        "lon": 70823980,
        "speed": 0,
        "name": "HAI DA 768",
        "shipType": 81,
        "course": 3600,
        "lat": 14657020
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412510133,
        "heading": 0,
        "length": 8,
        "lon": 70820488,
        "speed": 1,
        "name": "MINLONGYU01387",
        "shipType": 30,
        "course": 909,
        "lat": 14648131
      },
      {
        "posTime": 1705883294,
        "breadth": 3,
        "mmsi": 412510133,
        "heading": 0,
        "length": 8,
        "lon": 70820488,
        "speed": 1,
        "name": "MINLONGYU01387",
        "shipType": 30,
        "course": 909,
        "lat": 14648173
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412510133,
        "heading": 0,
        "length": 8,
        "lon": 70820488,
        "speed": 1,
        "name": "MINLONGYU01387",
        "shipType": 30,
        "course": 909,
        "lat": 14648214
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842346,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1333,
        "lat": 14672169
      },
      {
        "posTime": 1705883151,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842346,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1333,
        "lat": 14672169
      },
      {
        "posTime": 1705883173,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842343,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1394,
        "lat": 14672167
      },
      {
        "posTime": 1705883182,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842343,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1324,
        "lat": 14672164
      },
      {
        "posTime": 1705883211,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842345,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1268,
        "lat": 14672169
      },
      {
        "posTime": 1705883223,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842345,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1380,
        "lat": 14672169
      },
      {
        "posTime": 1705883262,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842345,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 0,
        "lat": 14672163
      },
      {
        "posTime": 1705883271,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842346,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1484,
        "lat": 14672163
      },
      {
        "posTime": 1705883302,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842345,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1442,
        "lat": 14672157
      },
      {
        "posTime": 1705883343,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842346,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1428,
        "lat": 14672158
      },
      {
        "posTime": 1705883382,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842352,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1372,
        "lat": 14672160
      },
      {
        "posTime": 1705883391,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842352,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1402,
        "lat": 14672160
      },
      {
        "posTime": 1705883413,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842351,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1420,
        "lat": 14672157
      },
      {
        "posTime": 1705883422,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842352,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1353,
        "lat": 14672158
      },
      {
        "posTime": 1705883431,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842355,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1493,
        "lat": 14672160
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 413698830,
        "heading": 320,
        "length": 45,
        "lon": 70842260,
        "speed": 0,
        "name": "SHUN YI 05",
        "shipType": 60,
        "course": 1353,
        "lat": 14672097
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 19,
        "mmsi": 413294340,
        "heading": 20,
        "length": 138,
        "lon": 70826143,
        "speed": 0,
        "name": "ZHENG XIN 2021",
        "shipType": 80,
        "course": 3147,
        "lat": 14671464
      },
      {
        "posTime": 1705883271,
        "breadth": 19,
        "mmsi": 413294340,
        "heading": 20,
        "length": 138,
        "lon": 70826143,
        "speed": 0,
        "name": "ZHENG XIN 2021",
        "shipType": 80,
        "course": 3147,
        "lat": 14671464
      },
      {
        "posTime": 1705883445,
        "breadth": 19,
        "mmsi": 413294340,
        "heading": 20,
        "length": 138,
        "lon": 70826143,
        "speed": 0,
        "name": "ZHENG XIN 2021",
        "shipType": 80,
        "course": 3147,
        "lat": 14671464
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 413256710,
        "heading": 0,
        "length": 57,
        "lon": 70799101,
        "speed": 0,
        "name": "YUN JING 88",
        "shipType": 70,
        "course": 782,
        "lat": 14669412
      },
      {
        "posTime": 1705883155,
        "breadth": 10,
        "mmsi": 413256710,
        "heading": 0,
        "length": 57,
        "lon": 70799101,
        "speed": 0,
        "name": "YUN JING 88",
        "shipType": 70,
        "course": 782,
        "lat": 14669412
      },
      {
        "posTime": 1705883241,
        "breadth": 10,
        "mmsi": 413256710,
        "heading": 0,
        "length": 57,
        "lon": 70799106,
        "speed": 0,
        "name": "YUN JING 88",
        "shipType": 70,
        "course": 782,
        "lat": 14669412
      },
      {
        "posTime": 1705883330,
        "breadth": 10,
        "mmsi": 413256710,
        "heading": 0,
        "length": 57,
        "lon": 70799104,
        "speed": 0,
        "name": "YUN JING 88",
        "shipType": 70,
        "course": 782,
        "lat": 14669411
      },
      {
        "posTime": 1705883333,
        "breadth": 10,
        "mmsi": 413256710,
        "heading": 0,
        "length": 57,
        "lon": 70799104,
        "speed": 0,
        "name": "YUN JING 88",
        "shipType": 70,
        "course": 2259,
        "lat": 14669411
      },
      {
        "posTime": 1705883376,
        "breadth": 10,
        "mmsi": 413256710,
        "heading": 0,
        "length": 57,
        "lon": 70799104,
        "speed": 0,
        "name": "YUN JING 88",
        "shipType": 70,
        "course": 2259,
        "lat": 14669412
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 413256710,
        "heading": 0,
        "length": 57,
        "lon": 70799104,
        "speed": 0,
        "name": "YUN JING 88",
        "shipType": 70,
        "course": 2259,
        "lat": 14669407
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 413703680,
        "heading": 183,
        "length": 43,
        "lon": 70832021,
        "speed": 0,
        "name": "LU JIANG 80",
        "shipType": 60,
        "course": 2210,
        "lat": 14669872
      },
      {
        "posTime": 1705883291,
        "breadth": 10,
        "mmsi": 413703680,
        "heading": 183,
        "length": 43,
        "lon": 70832021,
        "speed": 0,
        "name": "LU JIANG 80",
        "shipType": 60,
        "course": 2210,
        "lat": 14669872
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 413703680,
        "heading": 183,
        "length": 43,
        "lon": 70832021,
        "speed": 0,
        "name": "LU JIANG 80",
        "shipType": 60,
        "course": 2210,
        "lat": 14669872
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413694720,
        "heading": 0,
        "length": 44,
        "lon": 70825020,
        "speed": 0,
        "name": "JILJIANG YOU 8",
        "shipType": 60,
        "course": 2553,
        "lat": 14656566
      },
      {
        "posTime": 1705883239,
        "breadth": 9,
        "mmsi": 413694720,
        "heading": 0,
        "length": 44,
        "lon": 70825032,
        "speed": 0,
        "name": "JILJIANG YOU 8",
        "shipType": 60,
        "course": 2553,
        "lat": 14656581
      },
      {
        "posTime": 1705883422,
        "breadth": 9,
        "mmsi": 413694720,
        "heading": 0,
        "length": 44,
        "lon": 70825057,
        "speed": 0,
        "name": "JILJIANG YOU 8",
        "shipType": 60,
        "course": 2553,
        "lat": 14656611
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413694720,
        "heading": 0,
        "length": 44,
        "lon": 70825020,
        "speed": 0,
        "name": "JILJIANG YOU 8",
        "shipType": 60,
        "course": 2553,
        "lat": 14656566
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 19,
        "mmsi": 413267720,
        "heading": 85,
        "length": 118,
        "lon": 70831184,
        "speed": 0,
        "name": "XING LAN JUN 6",
        "shipType": 33,
        "course": 2159,
        "lat": 14651597
      },
      {
        "posTime": 1705883307,
        "breadth": 19,
        "mmsi": 413267720,
        "heading": 85,
        "length": 118,
        "lon": 70831184,
        "speed": 0,
        "name": "XING LAN JUN 6",
        "shipType": 33,
        "course": 2159,
        "lat": 14651565
      },
      {
        "posTime": 1705883366,
        "breadth": 19,
        "mmsi": 413267720,
        "heading": 85,
        "length": 118,
        "lon": 70831184,
        "speed": 0,
        "name": "XING LAN JUN 6",
        "shipType": 33,
        "course": 1723,
        "lat": 14651553
      },
      {
        "posTime": 1705883445,
        "breadth": 19,
        "mmsi": 413267720,
        "heading": 85,
        "length": 118,
        "lon": 70831184,
        "speed": 0,
        "name": "XING LAN JUN 6",
        "shipType": 33,
        "course": 2159,
        "lat": 14651597
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 14,
        "mmsi": 413554060,
        "heading": 0,
        "length": 60,
        "lon": 70820066,
        "speed": 0,
        "name": "TONG GANG BO 55",
        "shipType": 70,
        "course": 3600,
        "lat": 14649964
      },
      {
        "posTime": 1705883275,
        "breadth": 14,
        "mmsi": 413554060,
        "heading": 0,
        "length": 60,
        "lon": 70820066,
        "speed": 0,
        "name": "TONG GANG BO 55",
        "shipType": 70,
        "course": 3600,
        "lat": 14649964
      },
      {
        "posTime": 1705883445,
        "breadth": 14,
        "mmsi": 413554060,
        "heading": 0,
        "length": 60,
        "lon": 70820066,
        "speed": 0,
        "name": "TONG GANG BO 55",
        "shipType": 70,
        "course": 3600,
        "lat": 14649964
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 4,
        "mmsi": 412510136,
        "heading": 0,
        "length": 9,
        "lon": 70799825,
        "speed": 32,
        "name": "MINLONGYU01368",
        "shipType": 30,
        "course": 404,
        "lat": 14645075
      },
      {
        "posTime": 1705883195,
        "breadth": 4,
        "mmsi": 412510136,
        "heading": 0,
        "length": 9,
        "lon": 70799826,
        "speed": 32,
        "name": "MINLONGYU01368",
        "shipType": 30,
        "course": 404,
        "lat": 14645070
      },
      {
        "posTime": 1705883375,
        "breadth": 4,
        "mmsi": 412510136,
        "heading": 0,
        "length": 9,
        "lon": 70799833,
        "speed": 16,
        "name": "MINLONGYU01368",
        "shipType": 30,
        "course": 303,
        "lat": 14645049
      },
      {
        "posTime": 1705883376,
        "breadth": 4,
        "mmsi": 412510136,
        "heading": 0,
        "length": 9,
        "lon": 70799834,
        "speed": 16,
        "name": "MINLONGYU01368",
        "shipType": 30,
        "course": 303,
        "lat": 14645049
      },
      {
        "posTime": 1705883414,
        "breadth": 4,
        "mmsi": 412510136,
        "heading": 0,
        "length": 9,
        "lon": 70799833,
        "speed": 16,
        "name": "MINLONGYU01368",
        "shipType": 30,
        "course": 303,
        "lat": 14645047
      },
      {
        "posTime": 1705883445,
        "breadth": 4,
        "mmsi": 412510136,
        "heading": 0,
        "length": 9,
        "lon": 70799840,
        "speed": 16,
        "name": "MINLONGYU01368",
        "shipType": 30,
        "course": 303,
        "lat": 14645061
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 32,
        "mmsi": 636021063,
        "heading": 114,
        "length": 200,
        "lon": 70812640,
        "speed": 0,
        "name": "AFRICAN INSPIRATION",
        "shipType": 70,
        "course": 3370,
        "lat": 14665878
      },
      {
        "posTime": 1705883325,
        "breadth": 32,
        "mmsi": 636021063,
        "heading": 114,
        "length": 200,
        "lon": 70812640,
        "speed": 0,
        "name": "AFRICAN INSPIRATION",
        "shipType": 70,
        "course": 3370,
        "lat": 14665878
      },
      {
        "posTime": 1705883445,
        "breadth": 32,
        "mmsi": 636021063,
        "heading": 114,
        "length": 200,
        "lon": 70812640,
        "speed": 0,
        "name": "AFRICAN INSPIRATION",
        "shipType": 70,
        "course": 3370,
        "lat": 14665878
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412510137,
        "heading": 0,
        "length": 9,
        "lon": 70800089,
        "speed": 0,
        "name": "MINLONGYU01366",
        "shipType": 30,
        "course": 606,
        "lat": 14644637
      },
      {
        "posTime": 1705883245,
        "breadth": 3,
        "mmsi": 412510137,
        "heading": 0,
        "length": 9,
        "lon": 70800089,
        "speed": 0,
        "name": "MINLONGYU01366",
        "shipType": 30,
        "course": 606,
        "lat": 14644637
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412510137,
        "heading": 0,
        "length": 9,
        "lon": 70800089,
        "speed": 0,
        "name": "MINLONGYU01366",
        "shipType": 30,
        "course": 606,
        "lat": 14644637
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 43,
        "mmsi": 431120000,
        "heading": 102,
        "length": 302,
        "lon": 70802064,
        "speed": 0,
        "name": "ONE MANEUVER",
        "shipType": 71,
        "course": 2880,
        "lat": 14668658
      },
      {
        "posTime": 1705883146,
        "breadth": 43,
        "mmsi": 431120000,
        "heading": 102,
        "length": 302,
        "lon": 70802065,
        "speed": 0,
        "name": "ONE MANEUVER",
        "shipType": 71,
        "course": 2880,
        "lat": 14668658
      },
      {
        "posTime": 1705883327,
        "breadth": 43,
        "mmsi": 431120000,
        "heading": 102,
        "length": 302,
        "lon": 70802045,
        "speed": 0,
        "name": "ONE MANEUVER",
        "shipType": 71,
        "course": 2880,
        "lat": 14668683
      },
      {
        "posTime": 1705883328,
        "breadth": 43,
        "mmsi": 431120000,
        "heading": 102,
        "length": 302,
        "lon": 70802044,
        "speed": 0,
        "name": "ONE MANEUVER",
        "shipType": 71,
        "course": 2880,
        "lat": 14668684
      },
      {
        "posTime": 1705883445,
        "breadth": 43,
        "mmsi": 431120000,
        "heading": 102,
        "length": 302,
        "lon": 70802227,
        "speed": 0,
        "name": "ONE MANEUVER",
        "shipType": 71,
        "course": 2880,
        "lat": 14668501
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818753,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657867
      },
      {
        "posTime": 1705883149,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818752,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657867
      },
      {
        "posTime": 1705883180,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818744,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657862
      },
      {
        "posTime": 1705883190,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818744,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657862
      },
      {
        "posTime": 1705883219,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818736,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657862
      },
      {
        "posTime": 1705883229,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818736,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657863
      },
      {
        "posTime": 1705883250,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818736,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657862
      },
      {
        "posTime": 1705883269,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818744,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657863
      },
      {
        "posTime": 1705883289,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818744,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657862
      },
      {
        "posTime": 1705883300,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818752,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657862
      },
      {
        "posTime": 1705883330,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818752,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657859
      },
      {
        "posTime": 1705883338,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818752,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657862
      },
      {
        "posTime": 1705883369,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818752,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657862
      },
      {
        "posTime": 1705883408,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818752,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657857
      },
      {
        "posTime": 1705883439,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818744,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657853
      },
      {
        "posTime": 1705883445,
        "breadth": 14,
        "mmsi": 413361680,
        "heading": 0,
        "length": 63,
        "lon": 70818819,
        "speed": 0,
        "name": "DENG TONG 568",
        "shipType": 33,
        "course": 3600,
        "lat": 14657890
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 49,
        "length": 26,
        "lon": 70828833,
        "speed": 11,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 47,
        "lat": 14663216
      },
      {
        "posTime": 1705883148,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 49,
        "length": 26,
        "lon": 70828851,
        "speed": 11,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 47,
        "lat": 14663307
      },
      {
        "posTime": 1705883190,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 70,
        "length": 26,
        "lon": 70829112,
        "speed": 11,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 145,
        "lat": 14664591
      },
      {
        "posTime": 1705883229,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 65,
        "length": 26,
        "lon": 70829441,
        "speed": 11,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 142,
        "lat": 14665834
      },
      {
        "posTime": 1705883289,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 46,
        "length": 26,
        "lon": 70829887,
        "speed": 11,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 63,
        "lat": 14667677
      },
      {
        "posTime": 1705883310,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 67,
        "length": 26,
        "lon": 70829998,
        "speed": 11,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 166,
        "lat": 14668291
      },
      {
        "posTime": 1705883354,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 63,
        "length": 26,
        "lon": 70830385,
        "speed": 10,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 134,
        "lat": 14669470
      },
      {
        "posTime": 1705883370,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 69,
        "length": 26,
        "lon": 70830555,
        "speed": 10,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 183,
        "lat": 14670062
      },
      {
        "posTime": 1705883419,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 81,
        "length": 26,
        "lon": 70831125,
        "speed": 10,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 255,
        "lat": 14671486
      },
      {
        "posTime": 1705883445,
        "breadth": 6,
        "mmsi": 412704170,
        "heading": 69,
        "length": 26,
        "lon": 70827938,
        "speed": 10,
        "name": "ZHAOSHANGKADAKAISI",
        "shipType": 60,
        "course": 183,
        "lat": 14663524
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412443042,
        "heading": 0,
        "length": 7,
        "lon": 70800034,
        "speed": 0,
        "name": "MIN CHANG YU F23377",
        "shipType": 30,
        "course": 101,
        "lat": 14644963
      },
      {
        "posTime": 1705883277,
        "breadth": 3,
        "mmsi": 412443042,
        "heading": 0,
        "length": 7,
        "lon": 70800034,
        "speed": 0,
        "name": "MIN CHANG YU F23377",
        "shipType": 30,
        "course": 101,
        "lat": 14644963
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412443042,
        "heading": 0,
        "length": 7,
        "lon": 70800034,
        "speed": 0,
        "name": "MIN CHANG YU F23377",
        "shipType": 30,
        "course": 101,
        "lat": 14644963
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 6,
        "mmsi": 412704160,
        "heading": 323,
        "length": 26,
        "lon": 70828387,
        "speed": 0,
        "name": "JUN YUE HUI",
        "shipType": 60,
        "course": 1945,
        "lat": 14647138
      },
      {
        "posTime": 1705883284,
        "breadth": 6,
        "mmsi": 412704160,
        "heading": 323,
        "length": 26,
        "lon": 70828387,
        "speed": 0,
        "name": "JUN YUE HUI",
        "shipType": 60,
        "course": 1945,
        "lat": 14647138
      },
      {
        "posTime": 1705883445,
        "breadth": 6,
        "mmsi": 412704160,
        "heading": 323,
        "length": 26,
        "lon": 70828387,
        "speed": 0,
        "name": "JUN YUE HUI",
        "shipType": 60,
        "course": 1945,
        "lat": 14647138
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 17,
        "mmsi": 413510680,
        "heading": 0,
        "length": 47,
        "lon": 70803299,
        "speed": 0,
        "name": "DENGTONG999",
        "shipType": 33,
        "course": 3536,
        "lat": 14664229
      },
      {
        "posTime": 1705883185,
        "breadth": 17,
        "mmsi": 413510680,
        "heading": 0,
        "length": 47,
        "lon": 70803298,
        "speed": 0,
        "name": "DENGTONG999",
        "shipType": 33,
        "course": 3536,
        "lat": 14664228
      },
      {
        "posTime": 1705883269,
        "breadth": 17,
        "mmsi": 413510680,
        "heading": 0,
        "length": 47,
        "lon": 70803295,
        "speed": 0,
        "name": "DENGTONG999",
        "shipType": 33,
        "course": 3536,
        "lat": 14664225
      },
      {
        "posTime": 1705883314,
        "breadth": 17,
        "mmsi": 413510680,
        "heading": 0,
        "length": 47,
        "lon": 70803295,
        "speed": 0,
        "name": "DENGTONG999",
        "shipType": 33,
        "course": 3536,
        "lat": 14664223
      },
      {
        "posTime": 1705883360,
        "breadth": 17,
        "mmsi": 413510680,
        "heading": 0,
        "length": 47,
        "lon": 70803294,
        "speed": 0,
        "name": "DENGTONG999",
        "shipType": 33,
        "course": 3536,
        "lat": 14664225
      },
      {
        "posTime": 1705883405,
        "breadth": 17,
        "mmsi": 413510680,
        "heading": 0,
        "length": 47,
        "lon": 70803294,
        "speed": 0,
        "name": "DENGTONG999",
        "shipType": 33,
        "course": 3536,
        "lat": 14664226
      },
      {
        "posTime": 1705883445,
        "breadth": 17,
        "mmsi": 413510680,
        "heading": 0,
        "length": 47,
        "lon": 70803294,
        "speed": 0,
        "name": "DENGTONG999",
        "shipType": 33,
        "course": 3536,
        "lat": 14664221
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70826752,
        "speed": 9,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 988,
        "lat": 14650785
      },
      {
        "posTime": 1705883173,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70827513,
        "speed": 9,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 988,
        "lat": 14650680
      },
      {
        "posTime": 1705883205,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70828383,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 987,
        "lat": 14650560
      },
      {
        "posTime": 1705883244,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70829458,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 997,
        "lat": 14650398
      },
      {
        "posTime": 1705883275,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70830232,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 990,
        "lat": 14650284
      },
      {
        "posTime": 1705883276,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70830232,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 990,
        "lat": 14650285
      },
      {
        "posTime": 1705883313,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70831269,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 994,
        "lat": 14650124
      },
      {
        "posTime": 1705883344,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70832119,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 996,
        "lat": 14649989
      },
      {
        "posTime": 1705883384,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70833157,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 994,
        "lat": 14649831
      },
      {
        "posTime": 1705883395,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70833424,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 992,
        "lat": 14649792
      },
      {
        "posTime": 1705883424,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70834248,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 1000,
        "lat": 14649655
      },
      {
        "posTime": 1705883433,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70834488,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 995,
        "lat": 14649618
      },
      {
        "posTime": 1705883445,
        "breadth": 20,
        "mmsi": 413262620,
        "heading": 98,
        "length": 128,
        "lon": 70826808,
        "speed": 8,
        "name": "ZHONG AN 58",
        "shipType": 70,
        "course": 1000,
        "lat": 14650802
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412443944,
        "heading": 0,
        "length": 9,
        "lon": 70820512,
        "speed": 0,
        "name": "MINLONGYU09719",
        "shipType": 30,
        "course": 808,
        "lat": 14648310
      },
      {
        "posTime": 1705883294,
        "breadth": 3,
        "mmsi": 412443944,
        "heading": 0,
        "length": 9,
        "lon": 70820512,
        "speed": 0,
        "name": "MINLONGYU09719",
        "shipType": 30,
        "course": 808,
        "lat": 14648310
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412443944,
        "heading": 0,
        "length": 9,
        "lon": 70820512,
        "speed": 0,
        "name": "MINLONGYU09719",
        "shipType": 30,
        "course": 808,
        "lat": 14648310
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 999999013,
        "heading": 0,
        "length": 13,
        "lon": 70800522,
        "speed": 0,
        "name": "CESHI",
        "shipType": -1,
        "course": 0,
        "lat": 14657529
      },
      {
        "posTime": 1705883324,
        "breadth": 10,
        "mmsi": 999999013,
        "heading": 0,
        "length": 13,
        "lon": 70800522,
        "speed": 0,
        "name": "CESHI",
        "shipType": -1,
        "course": 0,
        "lat": 14657529
      },
      {
        "posTime": 1705883386,
        "breadth": 10,
        "mmsi": 999999013,
        "heading": 0,
        "length": 13,
        "lon": 70800522,
        "speed": 0,
        "name": "CESHI",
        "shipType": -1,
        "course": 0,
        "lat": 14657529
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 999999013,
        "heading": 0,
        "length": 13,
        "lon": 70800522,
        "speed": 0,
        "name": "CESHI",
        "shipType": -1,
        "course": 0,
        "lat": 14657529
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 4,
        "mmsi": 412509651,
        "heading": 0,
        "length": 10,
        "lon": 70820654,
        "speed": 0,
        "name": "MINLONGYU09766",
        "shipType": 30,
        "course": 101,
        "lat": 14649113
      },
      {
        "posTime": 1705883168,
        "breadth": 4,
        "mmsi": 412509651,
        "heading": 0,
        "length": 10,
        "lon": 70820654,
        "speed": 0,
        "name": "MINLONGYU09766",
        "shipType": 30,
        "course": 101,
        "lat": 14649113
      },
      {
        "posTime": 1705883445,
        "breadth": 4,
        "mmsi": 412509651,
        "heading": 0,
        "length": 10,
        "lon": 70820654,
        "speed": 0,
        "name": "MINLONGYU09766",
        "shipType": 30,
        "course": 101,
        "lat": 14649113
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 24,
        "length": 36,
        "lon": 70820974,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 2338,
        "lat": 14664557
      },
      {
        "posTime": 1705883151,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 24,
        "length": 36,
        "lon": 70820974,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 2338,
        "lat": 14664558
      },
      {
        "posTime": 1705883161,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 24,
        "length": 36,
        "lon": 70820973,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 3175,
        "lat": 14664560
      },
      {
        "posTime": 1705883201,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 25,
        "length": 36,
        "lon": 70820974,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 3175,
        "lat": 14664555
      },
      {
        "posTime": 1705883241,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 24,
        "length": 36,
        "lon": 70820976,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 389,
        "lat": 14664561
      },
      {
        "posTime": 1705883281,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 25,
        "length": 36,
        "lon": 70820982,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 389,
        "lat": 14664577
      },
      {
        "posTime": 1705883290,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 26,
        "length": 36,
        "lon": 70820981,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 131,
        "lat": 14664579
      },
      {
        "posTime": 1705883321,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 25,
        "length": 36,
        "lon": 70820986,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 131,
        "lat": 14664573
      },
      {
        "posTime": 1705883341,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 24,
        "length": 36,
        "lon": 70820981,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 2421,
        "lat": 14664571
      },
      {
        "posTime": 1705883381,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 26,
        "length": 36,
        "lon": 70820973,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 2313,
        "lat": 14664567
      },
      {
        "posTime": 1705883391,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 27,
        "length": 36,
        "lon": 70820971,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 2252,
        "lat": 14664567
      },
      {
        "posTime": 1705883420,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 24,
        "length": 36,
        "lon": 70820976,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 1616,
        "lat": 14664558
      },
      {
        "posTime": 1705883430,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 21,
        "length": 36,
        "lon": 70820978,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 818,
        "lat": 14664555
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 413699310,
        "heading": 24,
        "length": 36,
        "lon": 70820921,
        "speed": 0,
        "name": "XIAGANGTUOSHIJIUHAO",
        "shipType": 52,
        "course": 1616,
        "lat": 14664640
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413694190,
        "heading": 0,
        "length": 32,
        "lon": 70842531,
        "speed": 0,
        "name": "B0SAIDONG6",
        "shipType": 60,
        "course": 1400,
        "lat": 14672114
      },
      {
        "posTime": 1705883229,
        "breadth": 9,
        "mmsi": 413694190,
        "heading": 0,
        "length": 32,
        "lon": 70842513,
        "speed": 0,
        "name": "B0SAIDONG6",
        "shipType": 60,
        "course": 1400,
        "lat": 14671993
      },
      {
        "posTime": 1705883238,
        "breadth": 9,
        "mmsi": 413694190,
        "heading": 297,
        "length": 32,
        "lon": 70842511,
        "speed": 0,
        "name": "B0SAIDONG6",
        "shipType": 60,
        "course": 3600,
        "lat": 14671980
      },
      {
        "posTime": 1705883406,
        "breadth": 9,
        "mmsi": 413694190,
        "heading": 0,
        "length": 32,
        "lon": 70842513,
        "speed": 0,
        "name": "B0SAIDONG6",
        "shipType": 60,
        "course": 1262,
        "lat": 14671995
      },
      {
        "posTime": 1705883417,
        "breadth": 9,
        "mmsi": 413694190,
        "heading": 297,
        "length": 32,
        "lon": 70842511,
        "speed": 0,
        "name": "B0SAIDONG6",
        "shipType": 60,
        "course": 3600,
        "lat": 14671988
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413694190,
        "heading": 0,
        "length": 32,
        "lon": 70842560,
        "speed": 0,
        "name": "B0SAIDONG6",
        "shipType": 60,
        "course": 1262,
        "lat": 14672161
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 182,
        "length": 38,
        "lon": 70827923,
        "speed": 5,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1935,
        "lat": 14652369
      },
      {
        "posTime": 1705883146,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 182,
        "length": 38,
        "lon": 70827919,
        "speed": 5,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1935,
        "lat": 14652355
      },
      {
        "posTime": 1705883181,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 177,
        "length": 38,
        "lon": 70827776,
        "speed": 5,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1912,
        "lat": 14651839
      },
      {
        "posTime": 1705883213,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 157,
        "length": 38,
        "lon": 70827736,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1735,
        "lat": 14651350
      },
      {
        "posTime": 1705883219,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 154,
        "length": 38,
        "lon": 70827744,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1706,
        "lat": 14651271
      },
      {
        "posTime": 1705883246,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 146,
        "length": 38,
        "lon": 70827855,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1593,
        "lat": 14650928
      },
      {
        "posTime": 1705883250,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 146,
        "length": 38,
        "lon": 70827864,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1624,
        "lat": 14650889
      },
      {
        "posTime": 1705883279,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 150,
        "length": 38,
        "lon": 70828000,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1637,
        "lat": 14650500
      },
      {
        "posTime": 1705883296,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 138,
        "length": 38,
        "lon": 70828104,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1470,
        "lat": 14650296
      },
      {
        "posTime": 1705883310,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 139,
        "length": 38,
        "lon": 70828216,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1451,
        "lat": 14650149
      },
      {
        "posTime": 1705883327,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 147,
        "length": 38,
        "lon": 70828351,
        "speed": 5,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1480,
        "lat": 14649954
      },
      {
        "posTime": 1705883336,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 150,
        "length": 38,
        "lon": 70828416,
        "speed": 5,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1550,
        "lat": 14649825
      },
      {
        "posTime": 1705883366,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 145,
        "length": 38,
        "lon": 70828656,
        "speed": 5,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1525,
        "lat": 14649427
      },
      {
        "posTime": 1705883370,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 145,
        "length": 38,
        "lon": 70828672,
        "speed": 5,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1525,
        "lat": 14649388
      },
      {
        "posTime": 1705883403,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 137,
        "length": 38,
        "lon": 70828935,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1458,
        "lat": 14648970
      },
      {
        "posTime": 1705883406,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 137,
        "length": 38,
        "lon": 70828959,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1495,
        "lat": 14648938
      },
      {
        "posTime": 1705883436,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 148,
        "length": 38,
        "lon": 70829136,
        "speed": 3,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1554,
        "lat": 14648652
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413211240,
        "heading": 137,
        "length": 38,
        "lon": 70827420,
        "speed": 4,
        "name": "KE LV 8",
        "shipType": 60,
        "course": 1495,
        "lat": 14651426
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 14,
        "mmsi": 412705360,
        "heading": 0,
        "length": 88,
        "lon": 70823443,
        "speed": 0,
        "name": "HAIDA988",
        "shipType": 80,
        "course": 181,
        "lat": 14655686
      },
      {
        "posTime": 1705883161,
        "breadth": 14,
        "mmsi": 412705360,
        "heading": 0,
        "length": 88,
        "lon": 70823443,
        "speed": 0,
        "name": "HAIDA988",
        "shipType": 80,
        "course": 181,
        "lat": 14655702
      },
      {
        "posTime": 1705883162,
        "breadth": 14,
        "mmsi": 412705360,
        "heading": 0,
        "length": 88,
        "lon": 70823443,
        "speed": 0,
        "name": "HAIDA988",
        "shipType": 80,
        "course": 181,
        "lat": 14655703
      },
      {
        "posTime": 1705883340,
        "breadth": 14,
        "mmsi": 412705360,
        "heading": 0,
        "length": 88,
        "lon": 70823434,
        "speed": 0,
        "name": "HAIDA988",
        "shipType": 80,
        "course": 181,
        "lat": 14655694
      },
      {
        "posTime": 1705883445,
        "breadth": 14,
        "mmsi": 412705360,
        "heading": 0,
        "length": 88,
        "lon": 70823443,
        "speed": 0,
        "name": "HAIDA988",
        "shipType": 80,
        "course": 181,
        "lat": 14655703
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 20,
        "mmsi": 413394670,
        "heading": 97,
        "length": 82,
        "lon": 70834665,
        "speed": 0,
        "name": "LIAN HE QI HUA",
        "shipType": 52,
        "course": 1941,
        "lat": 14652208
      },
      {
        "posTime": 1705883197,
        "breadth": 20,
        "mmsi": 413394670,
        "heading": 97,
        "length": 82,
        "lon": 70834665,
        "speed": 0,
        "name": "LIAN HE QI HUA",
        "shipType": 52,
        "course": 1941,
        "lat": 14652208
      },
      {
        "posTime": 1705883198,
        "breadth": 20,
        "mmsi": 413394670,
        "heading": 97,
        "length": 82,
        "lon": 70834665,
        "speed": 0,
        "name": "LIAN HE QI HUA",
        "shipType": 52,
        "course": 1941,
        "lat": 14652208
      },
      {
        "posTime": 1705883378,
        "breadth": 20,
        "mmsi": 413394670,
        "heading": 94,
        "length": 82,
        "lon": 70834674,
        "speed": 0,
        "name": "LIAN HE QI HUA",
        "shipType": 52,
        "course": 1941,
        "lat": 14652191
      },
      {
        "posTime": 1705883445,
        "breadth": 20,
        "mmsi": 413394670,
        "heading": 97,
        "length": 82,
        "lon": 70834663,
        "speed": 0,
        "name": "LIAN HE QI HUA",
        "shipType": 52,
        "course": 1941,
        "lat": 14652213
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 340,
        "length": 39,
        "lon": 70819763,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 3308,
        "lat": 14664679
      },
      {
        "posTime": 1705883171,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 340,
        "length": 39,
        "lon": 70819759,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 3308,
        "lat": 14664664
      },
      {
        "posTime": 1705883212,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 341,
        "length": 39,
        "lon": 70819752,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 2146,
        "lat": 14664640
      },
      {
        "posTime": 1705883231,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 341,
        "length": 39,
        "lon": 70819756,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1593,
        "lat": 14664643
      },
      {
        "posTime": 1705883252,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 341,
        "length": 39,
        "lon": 70819745,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1593,
        "lat": 14664654
      },
      {
        "posTime": 1705883281,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 340,
        "length": 39,
        "lon": 70819759,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1593,
        "lat": 14664681
      },
      {
        "posTime": 1705883292,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 340,
        "length": 39,
        "lon": 70819774,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1593,
        "lat": 14664697
      },
      {
        "posTime": 1705883312,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 341,
        "length": 39,
        "lon": 70819766,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1593,
        "lat": 14664693
      },
      {
        "posTime": 1705883332,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 341,
        "length": 39,
        "lon": 70819748,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1431,
        "lat": 14664669
      },
      {
        "posTime": 1705883351,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 342,
        "length": 39,
        "lon": 70819737,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1431,
        "lat": 14664681
      },
      {
        "posTime": 1705883372,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 342,
        "length": 39,
        "lon": 70819725,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1431,
        "lat": 14664674
      },
      {
        "posTime": 1705883382,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 341,
        "length": 39,
        "lon": 70819728,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1431,
        "lat": 14664674
      },
      {
        "posTime": 1705883411,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 344,
        "length": 39,
        "lon": 70819756,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1431,
        "lat": 14664670
      },
      {
        "posTime": 1705883421,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 345,
        "length": 39,
        "lon": 70819762,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1431,
        "lat": 14664654
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 413699320,
        "heading": 344,
        "length": 39,
        "lon": 70819597,
        "speed": 0,
        "name": "XIAGANGTUOSHIBAHAO",
        "shipType": 52,
        "course": 1431,
        "lat": 14665095
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413694840,
        "heading": 129,
        "length": 44,
        "lon": 70843730,
        "speed": 0,
        "name": "LU JIANG YOU 8",
        "shipType": 60,
        "course": 2589,
        "lat": 14670736
      },
      {
        "posTime": 1705883232,
        "breadth": 9,
        "mmsi": 413694840,
        "heading": 129,
        "length": 44,
        "lon": 70843730,
        "speed": 0,
        "name": "LU JIANG YOU 8",
        "shipType": 60,
        "course": 2589,
        "lat": 14670736
      },
      {
        "posTime": 1705883410,
        "breadth": 9,
        "mmsi": 413694840,
        "heading": 129,
        "length": 44,
        "lon": 70843728,
        "speed": 0,
        "name": "LU JIANG YOU 8",
        "shipType": 60,
        "course": 2589,
        "lat": 14670736
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413694840,
        "heading": 129,
        "length": 44,
        "lon": 70843730,
        "speed": 0,
        "name": "LU JIANG YOU 8",
        "shipType": 60,
        "course": 2589,
        "lat": 14670736
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 56,
        "mmsi": 994126352,
        "heading": 0,
        "length": 202,
        "lon": 70829917,
        "speed": 0,
        "name": "406 HAO",
        "shipType": -1,
        "course": 0,
        "lat": 14649767
      },
      {
        "posTime": 1705883150,
        "breadth": 56,
        "mmsi": 994126352,
        "heading": 0,
        "length": 202,
        "lon": 70829917,
        "speed": 0,
        "name": "406 HAO",
        "shipType": -1,
        "course": 0,
        "lat": 14649767
      },
      {
        "posTime": 1705883445,
        "breadth": 56,
        "mmsi": 994126352,
        "heading": 0,
        "length": 202,
        "lon": 70829917,
        "speed": 0,
        "name": "406 HAO",
        "shipType": -1,
        "course": 0,
        "lat": 14649767
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 412459460,
        "heading": 0,
        "length": 35,
        "lon": 70829760,
        "speed": 0,
        "name": "ZHANG ZHAO 1",
        "shipType": 52,
        "course": 2813,
        "lat": 14647160
      },
      {
        "posTime": 1705883180,
        "breadth": 10,
        "mmsi": 412459460,
        "heading": 0,
        "length": 35,
        "lon": 70829760,
        "speed": 0,
        "name": "ZHANG ZHAO 1",
        "shipType": 52,
        "course": 2813,
        "lat": 14647160
      },
      {
        "posTime": 1705883271,
        "breadth": 10,
        "mmsi": 412459460,
        "heading": 0,
        "length": 35,
        "lon": 70829760,
        "speed": 0,
        "name": "ZHANG ZHAO 1",
        "shipType": 52,
        "course": 1101,
        "lat": 14647160
      },
      {
        "posTime": 1705883354,
        "breadth": 10,
        "mmsi": 412459460,
        "heading": 0,
        "length": 35,
        "lon": 70829749,
        "speed": 0,
        "name": "ZHANG ZHAO 1",
        "shipType": 52,
        "course": 1101,
        "lat": 14647158
      },
      {
        "posTime": 1705883403,
        "breadth": 10,
        "mmsi": 412459460,
        "heading": 0,
        "length": 35,
        "lon": 70829752,
        "speed": 0,
        "name": "ZHANG ZHAO 1",
        "shipType": 52,
        "course": 956,
        "lat": 14647156
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 412459460,
        "heading": 0,
        "length": 35,
        "lon": 70829737,
        "speed": 0,
        "name": "ZHANG ZHAO 1",
        "shipType": 52,
        "course": 1101,
        "lat": 14647166
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 13,
        "mmsi": 413351920,
        "heading": 0,
        "length": 59,
        "lon": 70820080,
        "speed": 0,
        "name": "SU JUN BO 18",
        "shipType": 33,
        "course": 3600,
        "lat": 14649927
      },
      {
        "posTime": 1705883262,
        "breadth": 13,
        "mmsi": 413351920,
        "heading": 0,
        "length": 59,
        "lon": 70820080,
        "speed": 0,
        "name": "SU JUN BO 18",
        "shipType": 33,
        "course": 3600,
        "lat": 14649927
      },
      {
        "posTime": 1705883442,
        "breadth": 13,
        "mmsi": 413351920,
        "heading": 0,
        "length": 59,
        "lon": 70820080,
        "speed": 0,
        "name": "SU JUN BO 18",
        "shipType": 33,
        "course": 3600,
        "lat": 14649927
      },
      {
        "posTime": 1705883445,
        "breadth": 13,
        "mmsi": 413351920,
        "heading": 0,
        "length": 59,
        "lon": 70820080,
        "speed": 0,
        "name": "SU JUN BO 18",
        "shipType": 33,
        "course": 3600,
        "lat": 14649927
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 8,
        "mmsi": 413698940,
        "heading": 124,
        "length": 30,
        "lon": 70831957,
        "speed": 0,
        "name": "LU JIANG 12",
        "shipType": 60,
        "course": 2926,
        "lat": 14669349
      },
      {
        "posTime": 1705883169,
        "breadth": 8,
        "mmsi": 413698940,
        "heading": 124,
        "length": 30,
        "lon": 70831957,
        "speed": 0,
        "name": "LU JIANG 12",
        "shipType": 60,
        "course": 2926,
        "lat": 14669349
      },
      {
        "posTime": 1705883350,
        "breadth": 8,
        "mmsi": 413698940,
        "heading": 124,
        "length": 30,
        "lon": 70831961,
        "speed": 0,
        "name": "LU JIANG 12",
        "shipType": 60,
        "course": 2926,
        "lat": 14669349
      },
      {
        "posTime": 1705883445,
        "breadth": 8,
        "mmsi": 413698940,
        "heading": 124,
        "length": 30,
        "lon": 70831957,
        "speed": 0,
        "name": "LU JIANG 12",
        "shipType": 60,
        "course": 2926,
        "lat": 14669349
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 2,
        "mmsi": 412510146,
        "heading": 0,
        "length": 7,
        "lon": 70799535,
        "speed": 0,
        "name": "MINLONGYU01343",
        "shipType": 30,
        "course": 2645,
        "lat": 14645107
      },
      {
        "posTime": 1705883332,
        "breadth": 2,
        "mmsi": 412510146,
        "heading": 0,
        "length": 7,
        "lon": 70799722,
        "speed": 0,
        "name": "MINLONGYU01343",
        "shipType": 30,
        "course": 2645,
        "lat": 14645107
      },
      {
        "posTime": 1705883333,
        "breadth": 2,
        "mmsi": 412510146,
        "heading": 0,
        "length": 7,
        "lon": 70799723,
        "speed": 0,
        "name": "MINLONGYU01343",
        "shipType": 30,
        "course": 2645,
        "lat": 14645107
      },
      {
        "posTime": 1705883445,
        "breadth": 2,
        "mmsi": 412510146,
        "heading": 0,
        "length": 7,
        "lon": 70799535,
        "speed": 0,
        "name": "MINLONGYU01343",
        "shipType": 30,
        "course": 2645,
        "lat": 14645107
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 4,
        "mmsi": 412445505,
        "heading": 0,
        "length": 12,
        "lon": 70820497,
        "speed": 0,
        "name": "MINLONGYU63977",
        "shipType": 30,
        "course": 2908,
        "lat": 14648341
      },
      {
        "posTime": 1705883354,
        "breadth": 4,
        "mmsi": 412445505,
        "heading": 0,
        "length": 12,
        "lon": 70820497,
        "speed": 0,
        "name": "MINLONGYU63977",
        "shipType": 30,
        "course": 2908,
        "lat": 14648341
      },
      {
        "posTime": 1705883445,
        "breadth": 4,
        "mmsi": 412445505,
        "heading": 0,
        "length": 12,
        "lon": 70820497,
        "speed": 0,
        "name": "MINLONGYU63977",
        "shipType": 30,
        "course": 2908,
        "lat": 14648341
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 38,
        "mmsi": 413511920,
        "heading": 0,
        "length": 146,
        "lon": 70821991,
        "speed": 0,
        "name": "ZHEN XIN 28",
        "shipType": 70,
        "course": 3600,
        "lat": 14649487
      },
      {
        "posTime": 1705883174,
        "breadth": 38,
        "mmsi": 413511920,
        "heading": 0,
        "length": 146,
        "lon": 70821991,
        "speed": 0,
        "name": "ZHEN XIN 28",
        "shipType": 70,
        "course": 3600,
        "lat": 14649487
      },
      {
        "posTime": 1705883175,
        "breadth": 38,
        "mmsi": 413511920,
        "heading": 0,
        "length": 146,
        "lon": 70821991,
        "speed": 0,
        "name": "ZHEN XIN 28",
        "shipType": 70,
        "course": 0,
        "lat": 14649487
      },
      {
        "posTime": 1705883353,
        "breadth": 38,
        "mmsi": 413511920,
        "heading": 0,
        "length": 146,
        "lon": 70821991,
        "speed": 0,
        "name": "ZHEN XIN 28",
        "shipType": 70,
        "course": 3600,
        "lat": 14649490
      },
      {
        "posTime": 1705883445,
        "breadth": 38,
        "mmsi": 413511920,
        "heading": 0,
        "length": 146,
        "lon": 70821991,
        "speed": 0,
        "name": "ZHEN XIN 28",
        "shipType": 70,
        "course": 0,
        "lat": 14649487
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412510144,
        "heading": 0,
        "length": 8,
        "lon": 70799802,
        "speed": 1,
        "name": "MINLONGYU01356",
        "shipType": 30,
        "course": 2911,
        "lat": 14644573
      },
      {
        "posTime": 1705883410,
        "breadth": 3,
        "mmsi": 412510144,
        "heading": 0,
        "length": 8,
        "lon": 70800067,
        "speed": 1,
        "name": "MINLONGYU01356",
        "shipType": 30,
        "course": 2911,
        "lat": 14644573
      },
      {
        "posTime": 1705883411,
        "breadth": 3,
        "mmsi": 412510144,
        "heading": 0,
        "length": 8,
        "lon": 70800068,
        "speed": 1,
        "name": "MINLONGYU01356",
        "shipType": 30,
        "course": 2911,
        "lat": 14644573
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412510144,
        "heading": 0,
        "length": 8,
        "lon": 70799802,
        "speed": 1,
        "name": "MINLONGYU01356",
        "shipType": 30,
        "course": 2911,
        "lat": 14644573
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412443074,
        "heading": 0,
        "length": 7,
        "lon": 70840463,
        "speed": 1,
        "name": "MINLONGYU08510",
        "shipType": 30,
        "course": 2769,
        "lat": 14669633
      },
      {
        "posTime": 1705883250,
        "breadth": 3,
        "mmsi": 412443074,
        "heading": 0,
        "length": 7,
        "lon": 70840470,
        "speed": 1,
        "name": "MINLONGYU08510",
        "shipType": 30,
        "course": 2769,
        "lat": 14669640
      },
      {
        "posTime": 1705883294,
        "breadth": 3,
        "mmsi": 412443074,
        "heading": 0,
        "length": 7,
        "lon": 70840473,
        "speed": 1,
        "name": "MINLONGYU08510",
        "shipType": 30,
        "course": 2769,
        "lat": 14669643
      },
      {
        "posTime": 1705883431,
        "breadth": 3,
        "mmsi": 412443074,
        "heading": 0,
        "length": 7,
        "lon": 70841380,
        "speed": 0,
        "name": "MINLONGYU08510",
        "shipType": 30,
        "course": 1157,
        "lat": 14669680
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412443074,
        "heading": 0,
        "length": 7,
        "lon": 70839487,
        "speed": 1,
        "name": "MINLONGYU08510",
        "shipType": 30,
        "course": 2769,
        "lat": 14669603
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 7,
        "mmsi": 413697520,
        "heading": 134,
        "length": 32,
        "lon": 70842622,
        "speed": 0,
        "name": "MINXIAMENYOU0083",
        "shipType": 80,
        "course": 1625,
        "lat": 14671710
      },
      {
        "posTime": 1705883318,
        "breadth": 7,
        "mmsi": 413697520,
        "heading": 134,
        "length": 32,
        "lon": 70842622,
        "speed": 0,
        "name": "MINXIAMENYOU0083",
        "shipType": 80,
        "course": 1625,
        "lat": 14671710
      },
      {
        "posTime": 1705883445,
        "breadth": 7,
        "mmsi": 413697520,
        "heading": 134,
        "length": 32,
        "lon": 70842622,
        "speed": 0,
        "name": "MINXIAMENYOU0083",
        "shipType": 80,
        "course": 1625,
        "lat": 14671710
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412442189,
        "heading": 0,
        "length": 7,
        "lon": 70800041,
        "speed": 0,
        "name": "MINLONGYU01318",
        "shipType": 30,
        "course": 0,
        "lat": 14644488
      },
      {
        "posTime": 1705883225,
        "breadth": 3,
        "mmsi": 412442189,
        "heading": 0,
        "length": 7,
        "lon": 70800121,
        "speed": 0,
        "name": "MINLONGYU01318",
        "shipType": 30,
        "course": 0,
        "lat": 14644488
      },
      {
        "posTime": 1705883226,
        "breadth": 3,
        "mmsi": 412442189,
        "heading": 0,
        "length": 7,
        "lon": 70800122,
        "speed": 0,
        "name": "MINLONGYU01318",
        "shipType": 30,
        "course": 0,
        "lat": 14644488
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412442189,
        "heading": 0,
        "length": 7,
        "lon": 70800041,
        "speed": 0,
        "name": "MINLONGYU01318",
        "shipType": 30,
        "course": 0,
        "lat": 14644488
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 18,
        "mmsi": 412477260,
        "heading": 139,
        "length": 80,
        "lon": 70815968,
        "speed": 0,
        "name": "FANG ZHOU 15",
        "shipType": 70,
        "course": 3600,
        "lat": 14665110
      },
      {
        "posTime": 1705883250,
        "breadth": 18,
        "mmsi": 412477260,
        "heading": 139,
        "length": 80,
        "lon": 70815976,
        "speed": 0,
        "name": "FANG ZHOU 15",
        "shipType": 70,
        "course": 3600,
        "lat": 14665110
      },
      {
        "posTime": 1705883428,
        "breadth": 18,
        "mmsi": 412477260,
        "heading": 140,
        "length": 80,
        "lon": 70815991,
        "speed": 0,
        "name": "FANG ZHOU 15",
        "shipType": 70,
        "course": 3600,
        "lat": 14665110
      },
      {
        "posTime": 1705883445,
        "breadth": 18,
        "mmsi": 412477260,
        "heading": 139,
        "length": 80,
        "lon": 70815968,
        "speed": 0,
        "name": "FANG ZHOU 15",
        "shipType": 70,
        "course": 3600,
        "lat": 14665110
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 33,
        "mmsi": 538003407,
        "heading": 284,
        "length": 261,
        "lon": 70804800,
        "speed": 0,
        "name": "NAVIOS DEVOTION",
        "shipType": 79,
        "course": 1530,
        "lat": 14668200
      },
      {
        "posTime": 1705883163,
        "breadth": 33,
        "mmsi": 538003407,
        "heading": 284,
        "length": 261,
        "lon": 70804800,
        "speed": 0,
        "name": "NAVIOS DEVOTION",
        "shipType": 79,
        "course": 1530,
        "lat": 14668200
      },
      {
        "posTime": 1705883296,
        "breadth": 33,
        "mmsi": 538003407,
        "heading": 284,
        "length": 261,
        "lon": 70804800,
        "speed": 0,
        "name": "NAVIOS DEVOTION",
        "shipType": 79,
        "course": 1530,
        "lat": 14668200
      },
      {
        "posTime": 1705883343,
        "breadth": 33,
        "mmsi": 538003407,
        "heading": 284,
        "length": 261,
        "lon": 70804743,
        "speed": 0,
        "name": "NAVIOS DEVOTION",
        "shipType": 79,
        "course": 3600,
        "lat": 14668208
      },
      {
        "posTime": 1705883445,
        "breadth": 33,
        "mmsi": 538003407,
        "heading": 284,
        "length": 261,
        "lon": 70804983,
        "speed": 0,
        "name": "NAVIOS DEVOTION",
        "shipType": 79,
        "course": 1530,
        "lat": 14668175
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412442571,
        "heading": 0,
        "length": 7,
        "lon": 70800070,
        "speed": 1,
        "name": "MINLONGYU01328",
        "shipType": 30,
        "course": 2510,
        "lat": 14644887
      },
      {
        "posTime": 1705883261,
        "breadth": 3,
        "mmsi": 412442571,
        "heading": 0,
        "length": 7,
        "lon": 70800070,
        "speed": 1,
        "name": "MINLONGYU01328",
        "shipType": 30,
        "course": 2510,
        "lat": 14644920
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412442571,
        "heading": 0,
        "length": 7,
        "lon": 70800070,
        "speed": 1,
        "name": "MINLONGYU01328",
        "shipType": 30,
        "course": 2510,
        "lat": 14644971
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 50,
        "mmsi": 636021130,
        "heading": 282,
        "length": 299,
        "lon": 70801029,
        "speed": 0,
        "name": "MOUNT TOURMALINE",
        "shipType": 70,
        "course": 3196,
        "lat": 14669002
      },
      {
        "posTime": 1705883213,
        "breadth": 50,
        "mmsi": 636021130,
        "heading": 282,
        "length": 299,
        "lon": 70801029,
        "speed": 0,
        "name": "MOUNT TOURMALINE",
        "shipType": 70,
        "course": 3196,
        "lat": 14668934
      },
      {
        "posTime": 1705883214,
        "breadth": 50,
        "mmsi": 636021130,
        "heading": 282,
        "length": 299,
        "lon": 70801029,
        "speed": 0,
        "name": "MOUNT TOURMALINE",
        "shipType": 70,
        "course": 3196,
        "lat": 14668933
      },
      {
        "posTime": 1705883393,
        "breadth": 50,
        "mmsi": 636021130,
        "heading": 282,
        "length": 299,
        "lon": 70801006,
        "speed": 0,
        "name": "MOUNT TOURMALINE",
        "shipType": 70,
        "course": 3196,
        "lat": 14668938
      },
      {
        "posTime": 1705883445,
        "breadth": 50,
        "mmsi": 636021130,
        "heading": 282,
        "length": 299,
        "lon": 70801037,
        "speed": 0,
        "name": "MOUNT TOURMALINE",
        "shipType": 70,
        "course": 3196,
        "lat": 14668932
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 3,
        "mmsi": 412509556,
        "heading": 0,
        "length": 9,
        "lon": 70828117,
        "speed": 1,
        "name": "MINLONGYU64098",
        "shipType": 30,
        "course": 2758,
        "lat": 14646872
      },
      {
        "posTime": 1705883243,
        "breadth": 3,
        "mmsi": 412509556,
        "heading": 0,
        "length": 9,
        "lon": 70828117,
        "speed": 1,
        "name": "MINLONGYU64098",
        "shipType": 30,
        "course": 2758,
        "lat": 14646900
      },
      {
        "posTime": 1705883445,
        "breadth": 3,
        "mmsi": 412509556,
        "heading": 0,
        "length": 9,
        "lon": 70828117,
        "speed": 1,
        "name": "MINLONGYU64098",
        "shipType": 30,
        "course": 2758,
        "lat": 14646956
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 6,
        "mmsi": 413692750,
        "heading": 317,
        "length": 36,
        "lon": 70842583,
        "speed": 0,
        "name": "XINHEPING",
        "shipType": 60,
        "course": 3179,
        "lat": 14672001
      },
      {
        "posTime": 1705883388,
        "breadth": 6,
        "mmsi": 413692750,
        "heading": 317,
        "length": 36,
        "lon": 70842583,
        "speed": 0,
        "name": "XINHEPING",
        "shipType": 60,
        "course": 3179,
        "lat": 14672001
      },
      {
        "posTime": 1705883445,
        "breadth": 6,
        "mmsi": 413692750,
        "heading": 317,
        "length": 36,
        "lon": 70842583,
        "speed": 0,
        "name": "XINHEPING",
        "shipType": 60,
        "course": 3179,
        "lat": 14672001
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413693760,
        "heading": 0,
        "length": 53,
        "lon": 70823960,
        "speed": 0,
        "name": "HAI DA 568",
        "shipType": 80,
        "course": 808,
        "lat": 14657086
      },
      {
        "posTime": 1705883193,
        "breadth": 9,
        "mmsi": 413693760,
        "heading": 0,
        "length": 53,
        "lon": 70823960,
        "speed": 0,
        "name": "HAI DA 568",
        "shipType": 80,
        "course": 808,
        "lat": 14657086
      },
      {
        "posTime": 1705883373,
        "breadth": 9,
        "mmsi": 413693760,
        "heading": 0,
        "length": 53,
        "lon": 70823960,
        "speed": 0,
        "name": "HAI DA 568",
        "shipType": 80,
        "course": 808,
        "lat": 14657086
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413693760,
        "heading": 0,
        "length": 53,
        "lon": 70823960,
        "speed": 0,
        "name": "HAI DA 568",
        "shipType": 80,
        "course": 808,
        "lat": 14657086
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 18,
        "mmsi": 413480140,
        "heading": 0,
        "length": 68,
        "lon": 70815657,
        "speed": 0,
        "name": "YUEDONGGUANCHUI0933",
        "shipType": 90,
        "course": 3600,
        "lat": 14650377
      },
      {
        "posTime": 1705883199,
        "breadth": 18,
        "mmsi": 413480140,
        "heading": 0,
        "length": 68,
        "lon": 70815711,
        "speed": 0,
        "name": "YUEDONGGUANCHUI0933",
        "shipType": 90,
        "course": 3600,
        "lat": 14650431
      },
      {
        "posTime": 1705883200,
        "breadth": 18,
        "mmsi": 413480140,
        "heading": 0,
        "length": 68,
        "lon": 70815712,
        "speed": 0,
        "name": "YUEDONGGUANCHUI0933",
        "shipType": 90,
        "course": 0,
        "lat": 14650432
      },
      {
        "posTime": 1705883376,
        "breadth": 18,
        "mmsi": 413480140,
        "heading": 0,
        "length": 68,
        "lon": 70815727,
        "speed": 0,
        "name": "YUEDONGGUANCHUI0933",
        "shipType": 90,
        "course": 3600,
        "lat": 14650425
      },
      {
        "posTime": 1705883445,
        "breadth": 18,
        "mmsi": 413480140,
        "heading": 0,
        "length": 68,
        "lon": 70815708,
        "speed": 0,
        "name": "YUEDONGGUANCHUI0933",
        "shipType": 90,
        "course": 0,
        "lat": 14650434
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 282,
        "length": 19,
        "lon": 70828346,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 2029,
        "lat": 14668278
      },
      {
        "posTime": 1705883165,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 282,
        "length": 19,
        "lon": 70828071,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 2029,
        "lat": 14667703
      },
      {
        "posTime": 1705883169,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 281,
        "length": 19,
        "lon": 70828016,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 2019,
        "lat": 14667588
      },
      {
        "posTime": 1705883202,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 271,
        "length": 19,
        "lon": 70827663,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1940,
        "lat": 14666643
      },
      {
        "posTime": 1705883236,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 255,
        "length": 19,
        "lon": 70827504,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1820,
        "lat": 14665677
      },
      {
        "posTime": 1705883265,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 267,
        "length": 19,
        "lon": 70827415,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1922,
        "lat": 14664795
      },
      {
        "posTime": 1705883296,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 257,
        "length": 19,
        "lon": 70827247,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1850,
        "lat": 14663909
      },
      {
        "posTime": 1705883309,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 257,
        "length": 19,
        "lon": 70827216,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1839,
        "lat": 14663492
      },
      {
        "posTime": 1705883329,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 257,
        "length": 19,
        "lon": 70827159,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1828,
        "lat": 14662890
      },
      {
        "posTime": 1705883342,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 245,
        "length": 19,
        "lon": 70827151,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1789,
        "lat": 14662498
      },
      {
        "posTime": 1705883362,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 236,
        "length": 19,
        "lon": 70827192,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1751,
        "lat": 14661909
      },
      {
        "posTime": 1705883385,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 232,
        "length": 19,
        "lon": 70827264,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1724,
        "lat": 14661232
      },
      {
        "posTime": 1705883393,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 237,
        "length": 19,
        "lon": 70827288,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1768,
        "lat": 14661028
      },
      {
        "posTime": 1705883405,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 254,
        "length": 19,
        "lon": 70827280,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1826,
        "lat": 14660640
      },
      {
        "posTime": 1705883416,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 267,
        "length": 19,
        "lon": 70827232,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1926,
        "lat": 14660341
      },
      {
        "posTime": 1705883419,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 269,
        "length": 19,
        "lon": 70827207,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1941,
        "lat": 14660256
      },
      {
        "posTime": 1705883445,
        "breadth": 5,
        "mmsi": 413707330,
        "heading": 267,
        "length": 19,
        "lon": 70829490,
        "speed": 10,
        "name": "KE LV 6",
        "shipType": 60,
        "course": 1926,
        "lat": 14668019
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 4,
        "mmsi": 999412602,
        "heading": 0,
        "length": 4,
        "lon": 70831585,
        "speed": 0,
        "name": "29 HAO DENG FU",
        "shipType": -1,
        "course": 0,
        "lat": 14662071
      },
      {
        "posTime": 1705883227,
        "breadth": 4,
        "mmsi": 999412602,
        "heading": 0,
        "length": 4,
        "lon": 70831585,
        "speed": 0,
        "name": "29 HAO DENG FU",
        "shipType": -1,
        "course": 0,
        "lat": 14662073
      },
      {
        "posTime": 1705883404,
        "breadth": 4,
        "mmsi": 999412602,
        "heading": 0,
        "length": 4,
        "lon": 70831585,
        "speed": 0,
        "name": "29 HAO DENG FU",
        "shipType": -1,
        "course": 0,
        "lat": 14662078
      },
      {
        "posTime": 1705883445,
        "breadth": 4,
        "mmsi": 999412602,
        "heading": 0,
        "length": 4,
        "lon": 70831585,
        "speed": 0,
        "name": "29 HAO DENG FU",
        "shipType": -1,
        "course": 0,
        "lat": 14662071
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 306,
        "length": 40,
        "lon": 70814522,
        "speed": 1,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 3482,
        "lat": 14665358
      },
      {
        "posTime": 1705883147,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 306,
        "length": 40,
        "lon": 70814512,
        "speed": 1,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 3482,
        "lat": 14665363
      },
      {
        "posTime": 1705883150,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 305,
        "length": 40,
        "lon": 70814496,
        "speed": 1,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 3440,
        "lat": 14665371
      },
      {
        "posTime": 1705883179,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 299,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 38,
        "lat": 14665429
      },
      {
        "posTime": 1705883183,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 299,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 107,
        "lat": 14665432
      },
      {
        "posTime": 1705883187,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 302,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 191,
        "lat": 14665437
      },
      {
        "posTime": 1705883190,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 302,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 365,
        "lat": 14665437
      },
      {
        "posTime": 1705883193,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 300,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 618,
        "lat": 14665437
      },
      {
        "posTime": 1705883196,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 300,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 874,
        "lat": 14665437
      },
      {
        "posTime": 1705883200,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 1174,
        "lat": 14665437
      },
      {
        "posTime": 1705883203,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 1382,
        "lat": 14665437
      },
      {
        "posTime": 1705883214,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2122,
        "lat": 14665437
      },
      {
        "posTime": 1705883223,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 302,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665440
      },
      {
        "posTime": 1705883253,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 300,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665442
      },
      {
        "posTime": 1705883263,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 300,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665440
      },
      {
        "posTime": 1705883293,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 300,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665440
      },
      {
        "posTime": 1705883303,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665440
      },
      {
        "posTime": 1705883332,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665437
      },
      {
        "posTime": 1705883343,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665437
      },
      {
        "posTime": 1705883363,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665437
      },
      {
        "posTime": 1705883374,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665437
      },
      {
        "posTime": 1705883403,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665437
      },
      {
        "posTime": 1705883423,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665437
      },
      {
        "posTime": 1705883444,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 302,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665437
      },
      {
        "posTime": 1705883445,
        "breadth": 11,
        "mmsi": 412705780,
        "heading": 301,
        "length": 40,
        "lon": 70814496,
        "speed": 0,
        "name": "XIA GANG TUO 25",
        "shipType": 52,
        "course": 2130,
        "lat": 14665437
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 16,
        "mmsi": 413244750,
        "heading": 145,
        "length": 36,
        "lon": 70821539,
        "speed": 0,
        "name": "JUN GANG 168",
        "shipType": 33,
        "course": 1450,
        "lat": 14653450
      },
      {
        "posTime": 1705883192,
        "breadth": 16,
        "mmsi": 413244750,
        "heading": 145,
        "length": 36,
        "lon": 70821540,
        "speed": 0,
        "name": "JUN GANG 168",
        "shipType": 33,
        "course": 1450,
        "lat": 14653450
      },
      {
        "posTime": 1705883234,
        "breadth": 16,
        "mmsi": 413244750,
        "heading": 0,
        "length": 36,
        "lon": 70821541,
        "speed": 0,
        "name": "JUN GANG 168",
        "shipType": 33,
        "course": 0,
        "lat": 14653450
      },
      {
        "posTime": 1705883372,
        "breadth": 16,
        "mmsi": 413244750,
        "heading": 145,
        "length": 36,
        "lon": 70821535,
        "speed": 0,
        "name": "JUN GANG 168",
        "shipType": 33,
        "course": 1450,
        "lat": 14653461
      },
      {
        "posTime": 1705883445,
        "breadth": 16,
        "mmsi": 413244750,
        "heading": 0,
        "length": 36,
        "lon": 70821544,
        "speed": 0,
        "name": "JUN GANG 168",
        "shipType": 33,
        "course": 0,
        "lat": 14653443
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 249,
        "length": 30,
        "lon": 70842338,
        "speed": 7,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 1778,
        "lat": 14669827
      },
      {
        "posTime": 1705883162,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 249,
        "length": 30,
        "lon": 70842150,
        "speed": 7,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 1778,
        "lat": 14669640
      },
      {
        "posTime": 1705883172,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 270,
        "length": 30,
        "lon": 70842039,
        "speed": 7,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 1924,
        "lat": 14669530
      },
      {
        "posTime": 1705883179,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 284,
        "length": 30,
        "lon": 70841910,
        "speed": 6,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2066,
        "lat": 14669479
      },
      {
        "posTime": 1705883186,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 291,
        "length": 30,
        "lon": 70841820,
        "speed": 6,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2177,
        "lat": 14669469
      },
      {
        "posTime": 1705883192,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 295,
        "length": 30,
        "lon": 70841730,
        "speed": 5,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2297,
        "lat": 14669460
      },
      {
        "posTime": 1705883198,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 300,
        "length": 30,
        "lon": 70841620,
        "speed": 5,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2459,
        "lat": 14669469
      },
      {
        "posTime": 1705883209,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 307,
        "length": 30,
        "lon": 70841490,
        "speed": 5,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2573,
        "lat": 14669490
      },
      {
        "posTime": 1705883218,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 313,
        "length": 30,
        "lon": 70841410,
        "speed": 4,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2699,
        "lat": 14669530
      },
      {
        "posTime": 1705883222,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 315,
        "length": 30,
        "lon": 70841400,
        "speed": 4,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2717,
        "lat": 14669530
      },
      {
        "posTime": 1705883246,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 321,
        "length": 30,
        "lon": 70841340,
        "speed": 3,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2807,
        "lat": 14669530
      },
      {
        "posTime": 1705883259,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 324,
        "length": 30,
        "lon": 70841319,
        "speed": 2,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2802,
        "lat": 14669530
      },
      {
        "posTime": 1705883289,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 327,
        "length": 30,
        "lon": 70841310,
        "speed": 0,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2598,
        "lat": 14669520
      },
      {
        "posTime": 1705883295,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 328,
        "length": 30,
        "lon": 70841310,
        "speed": 0,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2515,
        "lat": 14669520
      },
      {
        "posTime": 1705883335,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 327,
        "length": 30,
        "lon": 70841310,
        "speed": 0,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2365,
        "lat": 14669520
      },
      {
        "posTime": 1705883374,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 327,
        "length": 30,
        "lon": 70841310,
        "speed": 0,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2364,
        "lat": 14669520
      },
      {
        "posTime": 1705883406,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 327,
        "length": 30,
        "lon": 70841310,
        "speed": 0,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2364,
        "lat": 14669520
      },
      {
        "posTime": 1705883415,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 327,
        "length": 30,
        "lon": 70841310,
        "speed": 0,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2364,
        "lat": 14669520
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413700440,
        "heading": 327,
        "length": 30,
        "lon": 70841310,
        "speed": 0,
        "name": "MIN XIA MEN KE 0116",
        "shipType": 60,
        "course": 2364,
        "lat": 14669520
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 24,
        "mmsi": 413368530,
        "heading": 101,
        "length": 160,
        "lon": 70824808,
        "speed": 0,
        "name": "YU YANG DE XIN",
        "shipType": 70,
        "course": 1971,
        "lat": 14648934
      },
      {
        "posTime": 1705883249,
        "breadth": 24,
        "mmsi": 413368530,
        "heading": 101,
        "length": 160,
        "lon": 70824808,
        "speed": 0,
        "name": "YU YANG DE XIN",
        "shipType": 70,
        "course": 1971,
        "lat": 14648933
      },
      {
        "posTime": 1705883428,
        "breadth": 24,
        "mmsi": 413368530,
        "heading": 101,
        "length": 160,
        "lon": 70824808,
        "speed": 0,
        "name": "YU YANG DE XIN",
        "shipType": 70,
        "course": 1971,
        "lat": 14648931
      },
      {
        "posTime": 1705883445,
        "breadth": 24,
        "mmsi": 413368530,
        "heading": 101,
        "length": 160,
        "lon": 70824808,
        "speed": 0,
        "name": "YU YANG DE XIN",
        "shipType": 70,
        "course": 1971,
        "lat": 14648934
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 42,
        "mmsi": 563000700,
        "heading": 103,
        "length": 335,
        "lon": 70809864,
        "speed": 0,
        "name": "MAERSK SEVILLE",
        "shipType": 70,
        "course": 1950,
        "lat": 14667053
      },
      {
        "posTime": 1705883269,
        "breadth": 42,
        "mmsi": 563000700,
        "heading": 103,
        "length": 335,
        "lon": 70809864,
        "speed": 0,
        "name": "MAERSK SEVILLE",
        "shipType": 70,
        "course": 1950,
        "lat": 14667053
      },
      {
        "posTime": 1705883445,
        "breadth": 42,
        "mmsi": 563000700,
        "heading": 103,
        "length": 335,
        "lon": 70809864,
        "speed": 0,
        "name": "MAERSK SEVILLE",
        "shipType": 70,
        "course": 1950,
        "lat": 14667053
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 413698650,
        "heading": 132,
        "length": 50,
        "lon": 70843753,
        "speed": 0,
        "name": "LU JIANG ZHI XING",
        "shipType": 60,
        "course": 1165,
        "lat": 14670796
      },
      {
        "posTime": 1705883281,
        "breadth": 10,
        "mmsi": 413698650,
        "heading": 132,
        "length": 50,
        "lon": 70843753,
        "speed": 0,
        "name": "LU JIANG ZHI XING",
        "shipType": 60,
        "course": 1165,
        "lat": 14670796
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 413698650,
        "heading": 132,
        "length": 50,
        "lon": 70843753,
        "speed": 0,
        "name": "LU JIANG ZHI XING",
        "shipType": 60,
        "course": 1165,
        "lat": 14670796
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 40,
        "mmsi": 636019355,
        "heading": 93,
        "length": 304,
        "lon": 70820267,
        "speed": 0,
        "name": "ZIM TAMPA",
        "shipType": 70,
        "course": 1070,
        "lat": 14664821
      },
      {
        "posTime": 1705883251,
        "breadth": 40,
        "mmsi": 636019355,
        "heading": 93,
        "length": 304,
        "lon": 70820259,
        "speed": 0,
        "name": "ZIM TAMPA",
        "shipType": 70,
        "course": 1070,
        "lat": 14664826
      },
      {
        "posTime": 1705883431,
        "breadth": 40,
        "mmsi": 636019355,
        "heading": 93,
        "length": 304,
        "lon": 70820245,
        "speed": 0,
        "name": "ZIM TAMPA",
        "shipType": 70,
        "course": 1020,
        "lat": 14664836
      },
      {
        "posTime": 1705883445,
        "breadth": 40,
        "mmsi": 636019355,
        "heading": 93,
        "length": 304,
        "lon": 70820267,
        "speed": 0,
        "name": "ZIM TAMPA",
        "shipType": 70,
        "course": 1070,
        "lat": 14664821
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 0,
        "mmsi": 413786204,
        "heading": 0,
        "length": 0,
        "lon": 70839550,
        "speed": 0,
        "name": "LUJININGHUO1857",
        "shipType": 0,
        "course": 3003,
        "lat": 14643133
      },
      {
        "posTime": 1705883174,
        "breadth": 0,
        "mmsi": 413786204,
        "heading": 0,
        "length": 0,
        "lon": 70839550,
        "speed": 0,
        "name": "LUJININGHUO1857",
        "shipType": 0,
        "course": 3003,
        "lat": 14643133
      },
      {
        "posTime": 1705883296,
        "breadth": 0,
        "mmsi": 413786204,
        "heading": 0,
        "length": 0,
        "lon": 70839552,
        "speed": 0,
        "name": "LUJININGHUO1857",
        "shipType": 0,
        "course": 2911,
        "lat": 14643137
      },
      {
        "posTime": 1705883445,
        "breadth": 0,
        "mmsi": 413786204,
        "heading": 0,
        "length": 0,
        "lon": 70839550,
        "speed": 0,
        "name": "LUJININGHUO1857",
        "shipType": 0,
        "course": 3003,
        "lat": 14643133
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 16,
        "mmsi": 412473710,
        "heading": 113,
        "length": 80,
        "lon": 70832160,
        "speed": 0,
        "name": "HAI BANG DA 328",
        "shipType": 79,
        "course": 2810,
        "lat": 14654243
      },
      {
        "posTime": 1705883194,
        "breadth": 16,
        "mmsi": 412473710,
        "heading": 113,
        "length": 80,
        "lon": 70832160,
        "speed": 0,
        "name": "HAI BANG DA 328",
        "shipType": 79,
        "course": 2810,
        "lat": 14654247
      },
      {
        "posTime": 1705883374,
        "breadth": 16,
        "mmsi": 412473710,
        "heading": 110,
        "length": 80,
        "lon": 70832160,
        "speed": 0,
        "name": "HAI BANG DA 328",
        "shipType": 79,
        "course": 2861,
        "lat": 14654263
      },
      {
        "posTime": 1705883445,
        "breadth": 16,
        "mmsi": 412473710,
        "heading": 113,
        "length": 80,
        "lon": 70832160,
        "speed": 0,
        "name": "HAI BANG DA 328",
        "shipType": 79,
        "course": 2810,
        "lat": 14654243
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 195,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 177,
        "lat": 14647187
      },
      {
        "posTime": 1705883147,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 195,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 177,
        "lat": 14647187
      },
      {
        "posTime": 1705883155,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 195,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 177,
        "lat": 14647187
      },
      {
        "posTime": 1705883186,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 194,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 446,
        "lat": 14647183
      },
      {
        "posTime": 1705883197,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 194,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 658,
        "lat": 14647182
      },
      {
        "posTime": 1705883198,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 194,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 658,
        "lat": 14647183
      },
      {
        "posTime": 1705883236,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 194,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 658,
        "lat": 14647182
      },
      {
        "posTime": 1705883267,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 195,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 658,
        "lat": 14647182
      },
      {
        "posTime": 1705883287,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 196,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 1001,
        "lat": 14647182
      },
      {
        "posTime": 1705883327,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 197,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 1001,
        "lat": 14647182
      },
      {
        "posTime": 1705883335,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 198,
        "length": 35,
        "lon": 70829700,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 1001,
        "lat": 14647183
      },
      {
        "posTime": 1705883387,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 196,
        "length": 35,
        "lon": 70829704,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 1001,
        "lat": 14647182
      },
      {
        "posTime": 1705883445,
        "breadth": 10,
        "mmsi": 412469870,
        "heading": 198,
        "length": 35,
        "lon": 70829686,
        "speed": 0,
        "name": "ZHANGZHAO3",
        "shipType": 52,
        "course": 1001,
        "lat": 14647186
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 315,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671518
      },
      {
        "posTime": 1705883152,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 315,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671518
      },
      {
        "posTime": 1705883183,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 315,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671521
      },
      {
        "posTime": 1705883224,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 315,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671521
      },
      {
        "posTime": 1705883264,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 315,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671518
      },
      {
        "posTime": 1705883273,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 314,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671516
      },
      {
        "posTime": 1705883303,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 315,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671518
      },
      {
        "posTime": 1705883314,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 315,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671518
      },
      {
        "posTime": 1705883344,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 314,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671518
      },
      {
        "posTime": 1705883363,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 314,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671521
      },
      {
        "posTime": 1705883383,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 314,
        "length": 64,
        "lon": 70842984,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671521
      },
      {
        "posTime": 1705883404,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 315,
        "length": 64,
        "lon": 70842967,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671524
      },
      {
        "posTime": 1705883423,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 314,
        "length": 64,
        "lon": 70842967,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671518
      },
      {
        "posTime": 1705883443,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 314,
        "length": 64,
        "lon": 70842967,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671521
      },
      {
        "posTime": 1705883445,
        "breadth": 14,
        "mmsi": 413293790,
        "heading": 314,
        "length": 64,
        "lon": 70842967,
        "speed": 0,
        "name": "YU JIAN 66",
        "shipType": 60,
        "course": 2001,
        "lat": 14671477
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413699030,
        "heading": 13,
        "length": 53,
        "lon": 70822744,
        "speed": 0,
        "name": "TONG HAI YOU 9",
        "shipType": 80,
        "course": 134,
        "lat": 14656689
      },
      {
        "posTime": 1705883307,
        "breadth": 9,
        "mmsi": 413699030,
        "heading": 13,
        "length": 53,
        "lon": 70822741,
        "speed": 0,
        "name": "TONG HAI YOU 9",
        "shipType": 80,
        "course": 134,
        "lat": 14656699
      },
      {
        "posTime": 1705883434,
        "breadth": 9,
        "mmsi": 413699030,
        "heading": 13,
        "length": 53,
        "lon": 70822738,
        "speed": 0,
        "name": "TONG HAI YOU 9",
        "shipType": 80,
        "course": 134,
        "lat": 14656707
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413699030,
        "heading": 13,
        "length": 53,
        "lon": 70822744,
        "speed": 0,
        "name": "TONG HAI YOU 9",
        "shipType": 80,
        "course": 134,
        "lat": 14656689
      }
    ],
    [
      {
        "posTime": 1705883145,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 287,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 543,
        "lat": 14646802
      },
      {
        "posTime": 1705883146,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 287,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 543,
        "lat": 14646802
      },
      {
        "posTime": 1705883166,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 286,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 264,
        "lat": 14646802
      },
      {
        "posTime": 1705883176,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 286,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 460,
        "lat": 14646804
      },
      {
        "posTime": 1705883185,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 287,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 1646,
        "lat": 14646802
      },
      {
        "posTime": 1705883216,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 287,
        "length": 38,
        "lon": 70828927,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 1142,
        "lat": 14646805
      },
      {
        "posTime": 1705883227,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 286,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 1667,
        "lat": 14646802
      },
      {
        "posTime": 1705883266,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 286,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 538,
        "lat": 14646804
      },
      {
        "posTime": 1705883275,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 287,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 538,
        "lat": 14646804
      },
      {
        "posTime": 1705883296,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 287,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 3454,
        "lat": 14646804
      },
      {
        "posTime": 1705883335,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 287,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 1908,
        "lat": 14646802
      },
      {
        "posTime": 1705883365,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 288,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 3112,
        "lat": 14646804
      },
      {
        "posTime": 1705883407,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 287,
        "length": 38,
        "lon": 70828928,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 2047,
        "lat": 14646802
      },
      {
        "posTime": 1705883445,
        "breadth": 9,
        "mmsi": 413211230,
        "heading": 286,
        "length": 38,
        "lon": 70828920,
        "speed": 0,
        "name": "KE LV 7",
        "shipType": 60,
        "course": 2702,
        "lat": 14646802
      }
    ]
  ],
  "start": 1705883145,
  "end": 1705883445
}
let secondKey = 0;
let dataMap = new Map();
let aniId = null;
const timeStampStep = 1/60; //  60分之一秒
let milliSecondTag = 0; //  动画循环数据时，记录后面的-毫秒的数据
const getModes = () => {
  const mainColor = 'rgb(251 176 59)';
  const selectedColor = 'rgb(255 0 0)';
  const selectedMidPointColor = 'green';
  const pointOutlineColor = 'white';
  const pointWidth = 4;
  const lineStringWidth = 4;
  const polygonOutlineWidth = 2;
  const circleOutlineWidth = 2;
  const pointOutlineWidth = 2;
  const opacity = 0.3;
  return [
    new TerraDrawSelectMode({
      flags: {
        arbitary: {
          feature: {},
        },
        polygon: {
          feature: {
            draggable: true,
            rotateable: true,
            scaleable: true,
            coordinates: {
              midpoints: true,
              draggable: true,
              deletable: true,
            },
          },
          styles:{
            fillColor:'#f00'
          }
        },
        freehand: {
          feature: { draggable: true, coordinates: {} },
        },
        linestring: {
          feature: {
            draggable: true,
            coordinates: {
              midpoints: true,
              draggable: true,
              deletable: true,
            },
          },
        },
        circle: {
          feature: {
            draggable: true,
          },
        },
        point: {
          feature: {
            draggable: true,
          },
        },
      },
      styles:{
        	// Point
        selectedPointColor: selectedColor,
        selectedPointWidth: pointWidth,
        selectedPointOutlineColor: pointOutlineColor,
        selectedPointOutlineWidth: pointOutlineWidth,
        // LineString
        selectedLineStringColor: selectedColor,
        selectedLineStringWidth: lineStringWidth,
        // Polygon
        selectedPolygonColor: selectedColor,
        selectedPolygonFillOpacity: opacity,
        selectedPolygonOutlineColor: selectedColor,
        selectedPolygonOutlineWidth: pointOutlineWidth,
        	// Selection Points (points at vertices of a polygon/linestring feature)
        selectionPointWidth: pointWidth,
        selectionPointColor: selectedColor,
        selectionPointOutlineColor: pointOutlineColor,
        selectionPointOutlineWidth: pointOutlineWidth,
        	// Mid points (points at mid point of a polygon/linestring feature)
        midPointColor: selectedMidPointColor,
        midPointOutlineColor: pointOutlineColor,
        midPointWidth: pointWidth,
        midPointOutlineWidth: pointOutlineWidth,
      }
    }),
    new TerraDrawPointMode({
      styles:{
        pointWidth: pointWidth,
        pointColor: mainColor,
        pointOutlineColor: pointOutlineColor,
        pointOutlineWidth: pointOutlineWidth
      }
    }),
    new TerraDrawLineStringMode({
      snapping: true,
      allowSelfIntersections: false,
      styles:{
        lineStringWidth: lineStringWidth,
        lineStringColor: mainColor,
        closingPointColor: mainColor,
        closingPointWidth: pointWidth,
        closingPointOutlineColor: pointOutlineColor,
        closingPointOutlineWidth: pointOutlineWidth,
      }
    }),
    new TerraDrawGreatCircleMode({ snapping: true }),
    new TerraDrawPolygonMode({
      snapping: true,
      allowSelfIntersections: false,
      styles:{
        fillColor: mainColor,
        outlineColor: mainColor,
        outlineWidth: polygonOutlineWidth,
        fillOpacity: opacity,
        closingPointWidth: pointWidth,
        closingPointColor: mainColor,
        closingPointOutlineWidth: pointOutlineWidth,
        closingPointOutlineColor: pointOutlineColor,
      }
    }),
    new TerraDrawRectangleMode(),
    new TerraDrawCircleMode({
      styles:{
        fillColor: mainColor,
        outlineColor: mainColor,
        outlineWidth: circleOutlineWidth,
        fillOpacity: opacity,
      }
    }),
    new TerraDrawFreehandMode()
  ];
};
const clearDraw = () => {
  window.$draw.start();
  window.$draw.stop();
}
const initDraw = (map) => {  //  初始化绘图工具
  const draw = new TerraDraw({
    adapter: new TerraDrawMapLibreGLAdapter({
      map,
      coordinatePrecision: 9
    }),
    modes: getModes(),
  });
  window.$draw = draw;
  draw.start();
  draw.setMode('linestring');
  draw.on('finish', (ids) => {
    const features = draw.getSnapshot();
    const coordinates = features[0].geometry.coordinates;
    console.log(features)
    draw.clear();
    draw.addFeatures([{
      "id": draw._store.getId(),
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": coordinates
      },
      "properties": {
        "mode": "linestring",
      }
    }]);
    draw.setMode('select');
  });
}
const loadImage = async (src) => {  //  加载图片
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      resolve(image);
    }
  });
}
const addShipIcon = async () => { //  添加船舶图标
  const map = window.$map;
  const ratio = getMapRatio(map);
  const lnglat = [118.10158203340853,24.48492800663155];
  const zoom = map.getZoom();
  const shipLength = 100/ratio;
  const shipIconName = `big-ship-${shipLength}-${zoom}`;
  const isImageExist = map.getImage(shipIconName);
  if(!isImageExist){
    const bigShipImage = generateBigShipImage(shipLength, '#ff0000', '#444444');
    const img = await loadImage(bigShipImage);
    map.addImage(shipIconName, img);    
  }
  const shipSource = map.getSource('shipSource');
  const data = {
    type: "FeatureCollection",
    features: [{
      type:'Feature',
      geometry: {
        type: 'Point',
        coordinates: lnglat
      },
      properties:{
        icon: shipIconName,
      }
    }],
  }
  if(!shipSource){
    map.addSource('shipSource', {
      type: 'geojson',
      data
    });    
  }else{
    shipSource.setData(data);
  }
  const shipLayer = map.getLayer('shipLayer');
  if(!shipLayer){
    map.addLayer({
      id: 'shipLayer',
      type: 'symbol',
      source: 'shipSource',
      layout: {
        "icon-image": ['get', 'icon'],
        "icon-size": 0.5,
        "icon-pitch-alignment": "map",
        "icon-rotation-alignment": "map",
        "icon-overlap": "always",
      },
    })    
  }
}
const playbackAnimation = () => {
  const map = window.$map;
  const key = `${secondKey}-${milliSecondTag}`
  const data = dataMap.get(key);
  const geojson = {
    type: 'FeatureCollection',
    features: data
  }
  const source = map.getSource("shipsSource");
  source.setData(geojson);
  if(milliSecondTag < 59){  //  先循环后面的毫秒
    milliSecondTag+=1;
  }else{
    secondKey += 1;
    milliSecondTag = 0;
  }
  if(secondKey > fakeData.end){
    cancelAnimationFrame(aniId);
  }else{
    aniId = requestAnimationFrame(() => {
      playbackAnimation()
    });    
  }
}
const handleData = (obj) => {
  const {start, end, data} = obj;
  for(let i = start; i <= end; i++){
    let locationsArr = []
    data.map(shipLocations => {
      if(i === start){  //  开始时间点
        const _location = shipLocations[0];
        const {lon, lat} = _location;
        locationsArr.push({
          type: 'Feature',
          properties:{
            ..._location,
            lon: lon / 600000,
            lat: lat / 600000,
            icon: 'ship',
            posTime: i
          },
          geometry:{
            type: 'Point',
            coordinates: [lon / 600000, lat / 600000]
          }
        })
      }else{
        const existLocation = shipLocations.find(item => item.posTime === i);
        if(existLocation){
          const {lon, lat, mmsi} = existLocation;
          const thisPoint = [lon/600000, lat/600000];
          const lastSecondDatas = dataMap.get(`${i - 1}-0`); //  上一秒的数据
          const lastPointObj = lastSecondDatas.find(feature => feature.properties.mmsi === mmsi); //  上一秒这艘船的feature数据
          const {lon: lastLon, lat: lasLat} = lastPointObj.properties;
          const lastPoint = [lastLon, lasLat];
          denserData(thisPoint, lastPoint, i, existLocation);//  先加密，再推下个点的数据进去
          //  往里推整秒的这条船的数据
          locationsArr.push({
            type: 'Feature',
            properties:{
              ...existLocation,
              lon: lon / 600000,
              lat: lat / 600000,
              icon: 'ship',
              posTime: i
            },
            geometry:{
              type: 'Point',
              coordinates: [lon / 600000, lat / 600000]
            }
          });
        }else{
          let time = i - 1;
          let lastMapData = dataMap.get(`${time}-0`);
          const mmsi = shipLocations[0].mmsi;
          const existLastLocation = lastMapData.find(item => item.properties.mmsi === mmsi);
          if(existLastLocation){
            const {lon, lat} = existLastLocation.properties;
            denserData([lon, lat], [lon,lat], i, existLastLocation.properties)
            locationsArr.push({
              type: 'Feature',
              properties:{
                ...existLastLocation.properties,
                icon: 'ship',
                posTime: i
              },
              geometry:{
                type: 'Point',
                coordinates: [lon, lat]
              }
            })
          }
        }
      }
    });
    dataMap.set(`${i}-0`, locationsArr);
  }
}
const denserData = (thisPoint, lastPoint, second, info) => {  //  加密数据
  const line = turf.lineString([lastPoint, thisPoint]);
  const from = turf.point(thisPoint);
  const to = turf.point(lastPoint);
  const distance = turf.distance(from, to); //  两点之间的距离
  const step = distance/60; //  距离分成60份
  if(step === 0){ //  如果上个点和这个点位置没变化
    for(let i = 1; i < 60; i++){
      const lnglat = thisPoint;
      const timeStamp = (second-1) + timeStampStep*(i);
      let timeStampData = dataMap.get(`${second-1}-${i}`);
      if(!timeStampData){
        timeStampData = []
      }
      timeStampData.push({
        type: 'Feature',
        properties:{
          ...info,
          lon: lnglat[0],
          lat: lnglat[1],
          icon: 'ship',
          posTime: timeStamp
        },
        geometry:{
          type: 'Point',
          coordinates: lnglat
        }
      });
      dataMap.set(`${second-1}-${i}`, timeStampData)
    }
    return
  }
  const along = turf.lineChunk(line,step);
  const pointsInBetween = []
  along.features.map((feature, i) => {
    if(i !== 0){
      const point = feature.geometry.coordinates[0];
      pointsInBetween.push(point);
    }
  });
  for(let i = 0; i < pointsInBetween.length; i++){
    const lnglat = pointsInBetween[i];
    const timeStamp = (second-1) + timeStampStep*(i+1);
    let timeStampData = dataMap.get(`${second-1}-${i+1}`);
    if(!timeStampData){
      timeStampData = []
    }
    timeStampData.push({
      type: 'Feature',
      properties:{
        ...info,
        lon: lnglat[0],
        lat: lnglat[1],
        icon: 'ship',
        posTime: timeStamp
      },
      geometry:{
        type: 'Point',
        coordinates: lnglat
      }
    });
    dataMap.set(`${second-1}-${i+1}`, timeStampData)
  }
}
onMounted(() => {
  const map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://demotiles.maplibre.org/style.json', // style URL
    center: [118.04087766538527, 24.428557070167827], // starting position [lng, lat]
    zoom: 12 // starting zoom
  });
  window.$map = map;
  window.$turf = turf;
  map.on('click', (e) => {
    console.log(e)
  });
  map.on('load', async () => {
    const img = require('./follow-ship.png');
    const res = await loadImage(img);
    map.addImage('ship', res);
    map.addSource("shipsSource", {
      type: "geojson",
      data: {
        type: 'FeatureCollection',
        features: []
      },
    });
    map.addLayer({
      id: 'ships',
      type: "symbol",
      source: "shipsSource",
      layout: {
        "icon-image": ['get', 'icon'],
        "icon-size": 0.5,
        "icon-pitch-alignment": "map",
        "icon-rotation-alignment": "map",
        "icon-rotate": ["get", "heading"],
        "icon-overlap": "always",
      }
    })
    handleData(fakeData);
    secondKey = 1705883145;
    playbackAnimation();
  })
});
const drawLineGapDoubleLine = (map) => {
  //  画双线
  map.addLayer({
    "id": "route",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              118.06186294043727,
              24.448465647976676
            ],
            [
              118.09718595094608,
              24.40809347768021
            ],
            [
              118.1325089614549,
              24.408777859377437
            ],
            [
              118.17459595269912,
              24.428623314559005
            ],
            [
              118.21968915760493,
              24.468304857743888
            ],
            [
              118.27831032398166,
              24.510025405392867
            ],
            [
              118.3482047915852,
              24.53327347257232
            ],
            [
              118.37450916111288,
              24.535324565991132
            ]
          ],
        }
      }
    },
    "paint": {
      "line-color": "#f00",
      "line-width": 2,
      "line-gap-width": 10,
      "line-dasharray": [2, 4]
    }
  });
}
const drawTextAloneLine = (map) => {
  //  文字加到线上去
  map.addLayer({
    "id": "name",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            [
              118.08484245696809,
              24.44185647899667
            ],
            [
              118.13951529126632,
              24.466977561876917
            ],
            [
              118.19418812556336,
              24.503939097416563
            ]
          ],
          "type": "LineString"
        }
      }
    },
    "layout": {
      "text-field": '测试',
      'symbol-spacing': 10000,
      'symbol-placement': 'line-center'
    }
  });
}
const drawDoubleLine = (map) => {
  map.addLayer({
    "id": "route",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              118.06186294043727,
              24.448465647976676
            ],
            [
              118.09718595094608,
              24.40809347768021
            ],
            [
              118.1325089614549,
              24.408777859377437
            ],
            [
              118.17459595269912,
              24.428623314559005
            ],
            [
              118.21968915760493,
              24.468304857743888
            ],
            [
              118.27831032398166,
              24.510025405392867
            ],
            [
              118.3482047915852,
              24.53327347257232
            ],
            [
              118.37450916111288,
              24.535324565991132
            ]
          ],
        }
      }
    },
    "paint": {
      "line-color": "#f00",
      "line-width": 2,
      "line-dasharray": [2, 4]
    }
  });
  map.addLayer({
    "id": "route2",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              118.06186294043727,
              24.448465647976676
            ],
            [
              118.09718595094608,
              24.40809347768021
            ],
            [
              118.1325089614549,
              24.408777859377437
            ],
            [
              118.17459595269912,
              24.428623314559005
            ],
            [
              118.21968915760493,
              24.468304857743888
            ],
            [
              118.27831032398166,
              24.510025405392867
            ],
            [
              118.3482047915852,
              24.53327347257232
            ],
            [
              118.37450916111288,
              24.535324565991132
            ]
          ],
        }
      }
    },
    "paint": {
      "line-color": "#f00",
      "line-width": 2,
      'line-offset': -10
    }
  });
}
const shipAnimation = (map) => {
  const startPoint = turf.point([118.041786248,24.404686234]);
  const speed = 100;  //  km/h
  const distance = speed*(5/3600);  //  5秒内走过的距离（千米）
  const bearing = 90;
  const options = {units: 'kilometers'};
  const destination = turf.destination(startPoint, distance, bearing, options);
  const line = turf.lineString([startPoint.geometry.coordinates, destination.geometry.coordinates]);
  const step = distance/300;
  const chunk = turf.lineChunk(line, step, {units: 'kilometers'});
  const dots = []
  chunk.features.map((feature,index) => {
    if(index === 0){  //  第一个feature
      dots.push(feature.geometry.coordinates[0]);
    }else{
      dots.push(feature.geometry.coordinates[1]);
    }
  });
  const dotsGeojson = {
    type: 'FeatureCollection',
    features: []
  }
  dotsGeojson.features = dots.map(dot => {
    const feature = {
      type: 'Feature',
      geometry:{
        coordinates: dot,
        type: 'Point'
      }
    }
    return feature;
  });
  map.addSource('shipSource', {
    type: 'geojson',
    data: dotsGeojson
  });
  map.addLayer({
    id: 'shipLayer',
    type: 'symbol',
    source: 'shipSource',
    layout: {
      "icon-image": 'shipIcon',
      "icon-size": 0.5,
      "icon-pitch-alignment": "map",
      "icon-rotation-alignment": "map",
      "icon-overlap": "always",
    },
  });
  let count = 0;
  function animate(){
    const source = map.getSource('shipSource');
    source.setData({
      type: 'FeatureCollection',
      features: [dotsGeojson.features[count]]
    });
    count++;
    if(count !== dotsGeojson.features.length){
      requestAnimationFrame(animate);
    }
  }
  animate();
}
</script>
<style scoped lang="scss">
#map {
  width: 100vw;
  height: 100vh;
}
</style>
