define(['ol','map'],function(ol,map){
	var Zoom=function(){};
	Zoom.prototype={
		node:document.getElementById(map.getTarget()),
		init:function(){
         var newBtnIn=document.createElement("button");
         newBtnIn.id="zoom-in";
         newBtnIn.className="zoombtn";
         newBtnIn.innerHTML='<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>';
         this.node.appendChild(newBtnIn); 
          
         var newBtnOut=document.createElement("button");
         newBtnOut.id="zoom-out";
         newBtnOut.className="zoombtn";
         newBtnOut.innerHTML='<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>';
         this.node.appendChild(newBtnOut); 
         
        var view = map.getView();
        var zoom = map.getView().getZoom();
        var lastRgetResolution=map.getView().getResolution();      
        document.getElementById('zoom-out').onclick = function() {
            zoom=view.getZoom();
            if(view.getResolution() == view.getMaxResolution()){
                return;
            }
            view.setZoom(zoom - 1);         
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
            view = map.getView();
            zoom=view.getZoom();
            lastRgetResolution=map.getView().getResolution();
        };
        function onMoveEnd(evt){
            var map=evt.map;         
        }
        map.on('moveend',onMoveEnd);
		}
	}
	return Zoom;
})