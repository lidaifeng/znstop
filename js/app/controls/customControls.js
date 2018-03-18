/**
 * Created by pwz on 2018/3/1.
 */
/*****************************************自定义zoom控件*****************************************************/
define(['ol','map'],function(ol,map){

var customControls=function(){};
    customControls.prototype.node=document.getElementById(map.getTarget());
/*
* @describe 自定义zoom控件，可以控制地图缩放大小，显示图级信息
*
* */
    customControls.prototype.Zoom=function(){
        var newDiv=document.createElement("div");
        newDiv.id="zoompanel";
        newDiv.className="zoompanel";
        var zoomHtml='<div class="zoomshow" id="zoomshow"></div> <div class="zoombody"><button id="zoom-in" class="zoombtn">+</button><button id="zoom-out" class="zoombtn">-</button></div>';
        newDiv.innerHTML=zoomHtml;
        customControls.prototype.node.appendChild(newDiv);
        var zoomShow=document.getElementById("zoomshow");
        var view = map.getView();
        var zoom = map.getView().getZoom();
        var lastRgetResolution=map.getView().getResolution();
        zoomShow.innerText = zoom;
        document.getElementById('zoom-out').onclick = function() {
            zoom=view.getZoom();
            if(view.getResolution() == view.getMaxResolution()){
                return;
            }
            view.setZoom(zoom - 1);
            zoomShow.innerText = zoom - 1;
            view = map.getView();
            zoom=view.getZoom();
            lastRgetResolution=map.getView().getResolution();
        };
        document.getElementById('zoom-in').onclick = function() {
            zoom=view.getZoom();
            if(view.getResolution() == view.getMinResolution()){
                return;
            }
            view.setZoom(zoom + 1);
            zoomShow.innerText = zoom + 1;
            view = map.getView();
            zoom=view.getZoom();
            lastRgetResolution=map.getView().getResolution();
        };
        function onMoveEnd(evt){
            var map=evt.map;
            zoomShow.innerText = map.getView().getZoom();
        }
        map.on('moveend',onMoveEnd);
    }



/*****************************************自定义鼠标位置控件*****************************************************/
    /*
     * @describe 自定义鼠标位置控件，可以显示鼠标坐标信息
     *
     * */
customControls.prototype.MousePosition=function(){
    var mouse = document.createElement("div");
    mouse.id="mouse";
    mouse.className="mousepoint";
    var mapHTML=document.getElementById("mapCon");
    customControls.prototype.node.appendChild(mouse);
    var moseposition=new ol.control.MousePosition({
        target: document.getElementById('mouse'),
        coordinateFormat: ol.coordinate.createStringXY(6),
        projection: 'EPSG:4326',
        undefinedHTML: '&nbsp;',
        className:'mousepoint'
    });
    map.addControl(moseposition);
}


/*****************************************自定义鹰眼控件*****************************************************/

/*****************************************显示图层信息*****************************************************/
customControls.prototype.LayerShow=function() {
    var newDiv=document.createElement("div");
    var layerShowHtml='<div class="layerShowPanel">' +
        '<a id="layershow" class="btn-controls" title="图层按钮">' +
        '<span class="glyphicon glyphicon-align-justify span-controls" aria-hidden="true"></span>' +
        '</a>' +
        '<div id="dropdown-menu-layershow" class="dropdown-menu-layershow panel">' +
        '<div class="panel-heading panel-heading-layer">' +
        '<span class="glyphicon glyphicon-align-justify layer-show-loge" aria-hidden="true"></span>' +
        '<span>图例</span><span id="layer-show-close" class="layer-show-close" aria-hidden="true">X</span>' +
        '</div>' +
        '</div>'+
        '</div>';
    newDiv.innerHTML=layerShowHtml;
    customControls.prototype.node.appendChild(newDiv);
    var layerString='<ul class="list-group"><li class="list-group-item-layer">图层1 <input class="list-group-item-checkbox" type="checkbox" data-toggle="checkbox" style="z-index: 1"></li><li class="list-group-item-layer">图层1<input class="list-group-item-checkbox" type="checkbox" data-toggle="checkbox" style="z-index: 1"></li><li class="list-group-item-layer">图层1<input class="list-group-item-checkbox" type="checkbox" data-toggle="checkbox" style="z-index: 1"></li></ul>'

    var panelBody=document.createElement("div");
    panelBody.class="panel panel-layer-body";
    panelBody.innerHTML=layerString;
    var panelShow=document.getElementById("dropdown-menu-layershow");
    panelShow.appendChild(panelBody);

    //绑定控制面板弹出事件
    var layershow=document.getElementById("layershow");
    layershow.onclick=function(){
        panelShow.style.display="block";
    }
    //绑定控制面板关闭事件
    var layerClose=document.getElementById("layer-show-close");
    layerClose.onclick=function(){
        panelShow.style.display="none";
    }
};
    /*****************************************复位控件*****************************************************/
    customControls.prototype.ZoomToExtent=function() {
    var newA=document.createElement("a");
        newA.className="zoom-back";
        newA.setAttribute("title","复位");
        var newSpan=document.createElement("span");
        newSpan.className="glyphicon glyphicon-hand-up span-controls";
        newSpan.setAttribute("aria-hidden","true");

        customControls.prototype.node.appendChild(newA);

        var ZoomToExtent=new ol.control.ZoomToExtent({
            target:newA,
            className:"btn-controls",
            label:newSpan,
            tipLabel:"复位"
        })

        map.addControl(ZoomToExtent);
    }
    /*****************************************切换全屏控件*****************************************************/
    customControls.prototype.FullScreen =function() {
        var newA=document.createElement("a");
        newA.className="full-screen";
        newA.setAttribute("title","切换全屏");

        var newSpan=document.createElement("span");
        newSpan.className="glyphicon glyphicon-fullscreen span-controls";
        newSpan.setAttribute("aria-hidden","true");

        var newSpan2=document.createElement("span");
        newSpan2.className="glyphicon glyphicon-resize-small";
        newSpan2.setAttribute("aria-hidden","true");

        customControls.prototype.node.appendChild(newA);

        var FullScreen=new ol.control.FullScreen({
            target:newA,
            className:"btn-controls",
            label:newSpan,
            labelActive:newSpan2,
            tipLabel:"切换全屏"
        })
        map.addControl(FullScreen);
    }

    /*****************************************量算工具*****************************************************/
    customControls.prototype.Measure =function() {
        var newPanel=document.createElement("div");
        newPanel.className="measure-panel";
        var MeasureShowHtml='<div class="">' +
            '<a id="measureshow" class="btn-controls" title="量测">' +
            '<span class="glyphicon glyphicon-credit-card span-controls" aria-hidden="true"></span>' +
            '</a>' +
            '<div id="dropdown-menu-measure" class="panel" style="display: none">' +
            '<div class="panel-heading panel-heading-layer">' +
            '<span class="glyphicon glyphicon-credit-card layer-show-loge" aria-hidden="true"></span>' +
            '<span>量测</span><span id="measure-show-close" class="layer-show-close" aria-hidden="true">X</span>' +
            '</div>' +
            '</div>'+
            '</div>';
        newPanel.innerHTML=MeasureShowHtml;

        customControls.prototype.node.appendChild(newPanel);
        var MeasureString='<div class="measure-list"><span><button class="btn measure-btn">划线' + '</button></span>' +
            '<span><button class="btn measure-btn">画圆' + '</button></span>' +
            '<span><button class="btn measure-btn">面积' + '</button></span></div>';

        var panelBody=document.createElement("div");
        panelBody.class="panel panel-layer-body";
        panelBody.innerHTML=MeasureString;
        var panelShow=document.getElementById("dropdown-menu-measure");
        panelShow.appendChild(panelBody);

        //绑定控制面板弹出事件
        var layershow=document.getElementById("measureshow");
        layershow.onclick=function(){
            layershow.style.display="none";
            panelShow.style.display="block";

        }
        //绑定控制面板关闭事件
        var layerClose=document.getElementById("measure-show-close");
        layerClose.onclick=function(){
            layershow.style.display="block";
            panelShow.style.display="none";
        }

    }

    return customControls;
})
