const { Deck, MapboxOverlay, ScatterplotLayer, LineLayer, GeoJsonLayer, ScenegraphLayer } = deck;

export const mapboxOverlay = () => {
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = 2;
    tooltip.style.pointerEvents = 'none';
    document.body.append(tooltip);
    return new MapboxOverlay({
        interleaved: true,
        layers: [
            //  散点图
            // new ScatterplotLayer({
            // id: "scatterplot-layer",
            // data: [
            //     {
            //     coordinates: [118.1121646707087, 24.5372773796241],
            //     colors: [255, 0, 0],
            //     },
            //     {
            //     coordinates: [118.05654638457702, 24.486203050949143],
            //     colors: [0, 255, 0],
            //     },
            //     {
            //     coordinates: [118.19705649043323, 24.449413272770272],
            //     colors: [0, 0, 255],
            //     },
            // ],
            // pickable: true,
            // opacity: 0.8,
            // stroked: true,
            // lineWidthMinPixels: 1,
            // radiusScale: 100,
            // getPosition: (d) => d.coordinates,
            // getFillColor: (d) => d.colors,
            // }),
            // // 线
            // new LineLayer({
            // id: "line-layer",
            // data: [
            //     {
            //     sourcePosition: [118.04212682891284, 24.526814300178884],
            //     targetPosition: [118.20554845977176, 24.53352951110803],
            //     color: [255, 0, 0],
            //     },
            //     {
            //     sourcePosition: [118.03508871245765, 24.46370502279612],
            //     targetPosition: [118.2048325770196, 24.476658110342825],
            //     color: [20, 55, 0],
            //     },
            // ],
            // getWidth: 1,
            // getColor: (d) => d.color,
            // }),
            // new GeoJsonLayer({
            // data: [
            //     {
            //     geometry: {
            //         type: "Polygon",
            //         coordinates: [
            //         [
            //             [118.1121646707087, 24.5372773796241],
            //             [118.05654638457702, 24.486203050949143],
            //             [118.19705649043323, 24.449413272770272],
            //         ],
            //         ],
            //         color: [255, 0, 0],
            //     },
            //     message: 'ok'
            //     },
            // ],
            // getFillColor: (d) => d.geometry.color,
            // pickable: true,
            // onHover: ({object, x, y}) => {
            //     if(object){
            //         tooltip.style.display = 'block'
            //         tooltip.style.left = x + 'px'
            //         tooltip.style.top = y + 'px'
            //         tooltip.innerHTML = object.message
            //     }else{
            //         tooltip.style.display = 'none'
            //     }
            // }
            // }),
            new ScenegraphLayer({
                id: 'ScenegraphLayer',
                data: [
                    {"name":"厦门","code":"LF","address":"3601 Deer Hill Road, Lafayette CA 94549","entries":"3481","exits":"3616","coordinates":[118.10529821563091, 24.49471688046323]},
                  ],
            
                getPosition: d => d.coordinates,
                getOrientation: d => [0, Math.random() * 180, 90],
                scenegraph: 'https://maplibre.org/maplibre-gl-js/docs/assets/34M_17/34M_17.gltf',
                sizeScale: 2,
                _lighting: 'pbr',
                pickable: true,
                onHover: () => {
                },
                onClick: (info, event) => {
                    console.log(info, event)

                }
            })
        ],
          getTooltip: ({object}) => {   //  自动设置tookTip
            return object&& {
                html: `<h2>Message:</h2><div>${object.name}</div>`,
                style: {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    fontSize: '16px'
                }
            }
          }
    });
}
export const deckInstance = new Deck({
    initialViewState: {
        longitude: -122.4,
        latitude: 37.8,
        zoom: 12,
        pitch: 0,
        bearing: 0
    },
    controller: {
        doubleClickZoom: false
    }
});