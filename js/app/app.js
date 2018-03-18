//代码入口，根据你的js所需插件引入config.js工具插件
//主模板内容
/**
 * 给index.js配置所需的插件
 *
 */
require(['config'],function(){
   
    require(['jquery','ol'],function(){
        require(['map'],function(){
        })
    });
    
     require(['jquery','clickSearch','map'],function($,clickSearch,map) {
     	$("#search").click(function(){
     		map.addVector();
     		var clicks = new clickSearch();
            clicks.startClick();
     	})
        
        //$("#click-panel").draggable({containment: "#right-center"}); //地图单击查询面板
    });

//  require(['jquery'],function(){
//      require(['controls/customControls'],function(customControls){
//          var constrol=new customControls();
//          constrol.Zoom();
//      })
//  });

    require(['jquery'],function(){
        require(['controls/zoom'],function(Zoom){
            var zoom=new Zoom();
            zoom.init();
        })
    });
})
