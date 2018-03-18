/**
 * Created by pwz on 2018/1/24.
 */
define(['ol','map'],function(ol,map){
    /**
     * @type {object}
     * @describ 定义一个地图点击查询对象，并将以下方法和属性封装在对象里面
     */
    var clickSearch=function(){};
    /**
     * @type {object}
     * @describ 下段代码用于动态创建点击查询面板，面板由三个部分组成，面板主体(click-panel),关闭按钮选项(click-panel),切换按钮(toggle-close)
     */
    /**
     * @type {element}
     * @describ 面板主体内容
    */
        var clickPanel=document.createElement("div");
        clickPanel.id="click-panel";
        clickPanel.className="panel click-panel";
        clickPanel.style.cssText="";
    /**
     * @type {element}
     * @describ 面板关闭选项
     */
        var closeImg=document.createElement("span");
        closeImg.id="closeimg";
        closeImg.className="glyphicon glyphicon-remove-sign closeimg";
        closeImg.style.cssText="";
    /**
     * @type {element}
     * @describ 面板切换按钮
     */
        var closeToggle=document.createElement("botton");
        closeToggle.id="toggle-close";
        closeToggle.className="btn btn-primary toggle-close";
        closeToggle.innerText="停止查询";
        clickPanel.appendChild(closeImg);
        clickPanel.appendChild(closeToggle);
    /**
     * @type {element}
     * @describ 下段代码用于动态创建点击查询面板，面板由三个部分组成，关闭按钮选项(click-panel),面板主体(click-panel),切换按钮(toggle-close)
     */

    /**
     * @type {element}
     * @describ popup框主体
     */
        var popupElement=document.createElement("div");
        popupElement.id="click-popup";
        popupElement.className="click-popup";
        //popupElement.style.display="none";
    /**
     * @type {element}
     * @describ popup关闭选项
     */
        var popClose=document.createElement("span");
        popClose.id="click-popup-closer";
        popClose.className="glyphicon glyphicon-remove-sign click-popup-closer";
    /**
     * @type {element}
     * @describ popup内容
     */
        var popupContent=document.createElement("div");
        popupContent.id="popup-content";
        popupElement.appendChild(popClose);
        popupElement.appendChild(popupContent);
       document.getElementById(map.getTarget()).appendChild(clickPanel);
       document.getElementById(map.getTarget()).appendChild(popupElement);

    /**
    * @type {bool}
     *  @describ 通过设置一个Bool类型的变量控制地图点击事件的触发状态和不触发状态
    */
    clickSearch.prototype.clickBool=true;

    /**
     * @type {element}
     * @describle 用于控制点击查询的面板
     */
    clickSearch.prototype.clickPanel = document.getElementById("click-panel");
    clickSearch.prototype.clickPanel.style.display="none";
    clickSearch.prototype.closeImg=document.getElementById("closeimg");
    clickSearch.prototype.closeToggle=document.getElementById("toggle-close");
    clickSearch.prototype.closeImg.onclick = function(){
        document.getElementById("click-panel").style.display="none";
        clickSearch.prototype.end();
    }
    /**
     * @type {ol.interaction.Select}
     * @describ 定义选中要素变量
     */
   clickSearch.prototype.select = new ol.interaction.Select();
    /**
     * @type {ol.interaction.Select}
     * @describ 获取选中的要素
     */
   clickSearch.prototype.selectedFeatures =clickSearch.prototype.select.getFeatures();
    /**
     * @describ 获取用于设置popup弹框的element
     * @type {element}
     */
   clickSearch.prototype.container = document.getElementById('click-popup');
    /**
     * @describ 获取popup弹框的内容element
     * @type {element}
     */
   clickSearch.prototype.content = document.getElementById('popup-content');
    /**
     * @describ 获取popup弹框的关闭选项element
     * @type {element}
     */
   clickSearch.prototype.closer = document.getElementById('click-popup-closer');
    /**
     * @param {object}
     * @description 定义一个ol的popup控件
     */
   clickSearch.prototype.popup = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
        element:clickSearch.prototype.container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    }));



    /*
    * @param null
    * @describle 在面板切换按钮上绑定一个点击事件，控制点击查询状态
    * */
    clickSearch.prototype.closeToggle.onclick = function(){
        if(clickSearch.prototype.clickBool == false){
            clickSearch.prototype.closeToggle.innerText="停止查询";
            clickSearch.prototype.startClick();
        }else{
            clickSearch.prototype.closeToggle.innerText="开始查询";
            clickSearch.prototype.end();
        }
    }


    /*
     * @param null
     * @describle 结束点击查询方法
     * */
    clickSearch.prototype.end=function(){
        clickSearch.prototype.popup.setPosition(undefined);
        clickSearch.prototype.closer.blur();//失去焦点
        clickSearch.prototype.selectedFeatures.clear(); //清空选中图层
        clickSearch.prototype.clickBool = false;
        clickSearch.prototype.oneClickFind(); //调取地图查询函数
        clickSearch.prototype.pointerMove(); //调取鼠标移入鼠标箭头状态函数
    }

    /**
     * @param null
     * @describle 点击开始执行查询的方法
     */
   clickSearch.prototype.startClick=function(){
       clickSearch.prototype.clickPanel.style.display="block";
       clickSearch.prototype.clickBool = true; //设置地图点击状态
       clickSearch.prototype.oneClickFind(); //调取地图查询函数
       clickSearch.prototype.pointerMove(); //调取鼠标移入鼠标箭头状态函数
    }


    /**
     * @param  null
     * @describle 触发地图点击事件方法
     * @return null
     */
   clickSearch.prototype.oneClickFind = function() {
        map.on('click', function (evt) {
          if(clickSearch.prototype.container != null){
             clickSearch.prototype.container.style.display="block";
          }
            if (clickSearch.prototype.clickBool == false) {
               clickSearch.prototype.popup.setPosition(undefined);//设置popup的坐标为undefined
               clickSearch.prototype.closer.blur();  //失去焦点
               clickSearch.prototype.select.setActive(false); //设置feature可选状态为false
               clickSearch.prototype.selectedFeatures.clear(); //清空选中图层
                return;
            }
            map.addInteraction(clickSearch.prototype.select);
            var pixel = map.getEventPixel(evt.originalEvent);
            var feature = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                return feature;
            });
            var coordinate = evt.coordinate;
           clickSearch.prototype.selectedFeatures.clear(); //清空选中图层
            addPopup(feature, coordinate);
        });
    }

    /**
     * @param  null
     * @describle 监测鼠标移动事件方法，改变鼠标指针形状
     * @return null
     */
   clickSearch.prototype.pointerMove = function() {
        if (clickSearch.prototype.clickBool) {
            map.on('pointermove', function (evt) {
                var pixel = map.getEventPixel(evt.originalEvent);
                var hit = map.hasFeatureAtPixel(pixel);
                map.getTargetElement().style.cursor = hit ? 'pointer' : '';

            });
        } else {
            map.on('pointermove', function (evt) {
                map.getTargetElement().style.cursor = '';
            })
        }
    }


    /**
     * @param  {feature} 传入openlays feature要素
     * @param{coordinate} 坐标参数
     * @describle 设置popup弹框的内容
     * @return null
     */
    function addPopup(feature, coordinate) {
        var keys;     
        if(feature){
            keys=feature.getKeys();
        }else{
            return
        }
        var Str=[];
        for(var i=0,len=keys.length;i<len;i++){
            var key;
            //if(feature.get(keys[i]) !== "more"){
            key='<p class="popupclass">'+keys[i]+':'+feature.get(keys[i])+'</p>';
            if(typeof(feature.get(keys[i])) != "object"){
                Str.push(key);
            }
//          }else{         	
//          key='<p class="popupclass">'+keys[i]+':'+'<a href="#">'+feature.get(keys[i])+'</a></p>';
//          Str.push(key);
//          }

        }

        if (feature !== undefined) {
           clickSearch.prototype.selectedFeatures.push(feature); //设为选中图层
           clickSearch.prototype.content.innerHTML = Str.join("");
           clickSearch.prototype.popup.setPosition(coordinate);
            map.addOverlay(clickSearch.prototype.popup);
        } else {
            //未定义popup位置
           clickSearch.prototype.popup.setPosition(undefined);
            //失去焦点
           clickSearch.prototype.closer.blur();

        }
    }

    /**
     * @param  null
     * @describle 添加popup关闭按钮的单击事件（隐藏popup）
     * @return null
     */
   clickSearch.prototype.closer.onclick = function () {
        //未定义popup位置
       clickSearch.prototype.popup.setPosition(undefined);
        //失去焦点
       clickSearch.prototype.closer.blur();
       clickSearch.prototype.selectedFeatures.clear(); //清空选中图层
        return false;
    };
    
    /**
     * @describle 返回地图点击查询对象供其它模块使用
     * @return {object}
     */
   
    return clickSearch;

})