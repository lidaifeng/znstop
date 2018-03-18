/**
 * Created by pwz on 2018/1/30.
 */

define(['ol'],function(ol) {
    var layer02 = new ol.layer.Tile({
        title: "天地图路网",
        projection: 'EPSG:4326',
        source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
        })
    });
    var layer03 = new ol.layer.Tile({
        title: "天地图文字标注",
        projection: 'EPSG:4326',
        source: new ol.source.XYZ({
            url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
        })
    });

//实例化Map对象加载地图
    var map = new ol.Map({
        //地图容器div的ID
        target: 'mapCon',
        projection: ol.proj.get('EPSG:4326'),
        //地图容器中加载的图
        layers: [
            layer02,layer03
        ],
        //地图视图设置
        view: new ol.View({
            //地图初始中心点
            center: ol.proj.fromLonLat([114.4260, 30.4200]),
            //地图初始显示级别
            maxZoom: 18,
            minZoom: 6,
            zoom: 16
        }),
        controls: ol.control.defaults().extend([

        ])
    });
    
    /*
     * 添加几个vector图层
     * */
    var zb = [[114.4290, 30.4167], [114.4267, 30.42235], [114.4284, 30.4193], [114.4323, 30.4245], [114.4329, 30.4204]];
    var pNum=0;
    map.addVector=function() {
        for (var i = 0, len = 5; i < len; i++) {
        	pNum++;
            var point = new ol.Feature({
                name:"停车场"+pNum,
                fees:300+"$",
                hour:2+i+"小时",
                more:'<a href="stoppanel.html">更多详情</a>',
                geometry: new ol.geom.Point(ol.proj.fromLonLat(zb[i]))
            })
            point.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 9,
                    stroke: new ol.style.Stroke({
                        color: '#fff'
                    }),
                    fill: new ol.style.Fill({
                        color: '#3399CC'
                    })
                }),
                text: new ol.style.Text({
                    text: "P"+pNum,
                    fill: new ol.style.Fill({
                        color: '#fff'
                    })
                })

            }))
            var pointSource = new ol.source.Vector({
                features: [point]
            })
            var pointLayer = new ol.layer.Vector({
                source: pointSource
            })
            map.addLayer(pointLayer);
        }

    }
  
    return map;
})
