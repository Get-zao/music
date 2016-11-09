$(document).ready(function(){
	var music=[
				{
					name:"弱水三千",
					author:"周传雄 ",
					src:"周传雄 - 弱水三千.mp3"
				},
				{
					name:"蹁跹",
					author:"格子兮",
					src:"格子兮 - 蹁跹.mp3"
				},
				{
					name:"爱囚",
					author:"庄心妍",
					src:"庄心妍 - 爱囚.mp3"
				},
				{
					name:"蜀绣 (春晚版)",
					author:"李宇春",
					src:"李宇春 - 蜀绣 (春晚版).mp3"
				}
			]
	//播放暂停
	var play=$('.play');
	var audio=$('audio')[0];
	play.on("click",function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
	})
	$(audio).on("play",function(){
		        play.html("&#xe603;");
			})	
	$(audio).on("pause",function(){
        play.html("&#xe614;");
	})
	//时间取整
	function format(v){
				v=Math.floor(v);
				var s=v % 60;
				s= (s<10)?('0'+s):s;
				var m=Math.floor(v/60);
				m= (m<10)?('0'+m):m;
				return m+':'+s;
			}
	
	//获取时间，进度条动
	var all_time=$('.all-time');
	var now_time=$('.now-time');
	var cri=$('.cri');
	var jindu=$('.jindu');
	$(audio).on('timeupdate',function(){
		all_time.html(format(audio.duration));//获取总时长
		now_time.html(format(audio.currentTime));//获取当前时长
		var L=audio.currentTime/audio.duration;
		var W=jindu.width();
		var juli=W*L-cri.width()/2+'px';
		cri.css('left',juli);
		
	})
	jindu.on('click',function(e){
		audio.currentTime=e.offsetX/this.offsetWidth*audio.duration;
	})
	
	//进度条控制
	cri.on('touchstart',false);
	cri.on('touchstart',function(e){
		var r=cri.width()/2;
		var start=r-e.offsetX;
		$(document).on('touchmove',function(e){
			var left=e.offsetX-jindu.position().left+start;
			var c=left/jindu.width()*audio.duration;
			if(c>=audio.duration||c<=0){
				return;
			}
			audio.currentTime=c;
		})
		return false;
	})
	$(document).on('touchend',function(){
		$(document).off('touchmove');
	})
	//调音量
	var yinliang=$('.yinliang');
	var cri_yin=$('.cri-yin');
	var jingyin=$('.y-min');
	yinliang.on("touchstart",function(e){
		audio.volume=e.offsetX / yinliang.width();			
		$(this).removeAttr("data-v")
	})
	jingyin.on("touchstart",function(){
		if($(this).attr("data-v")){
			audio.volume=$(this).attr("data-v");
			$(this).removeAttr("data-v")
		}else{
			$(this).attr("data-v",audio.volume);
			audio.volume=0;
		}
	})
	$(audio).on("volumechange",function(){
				cri_yin.css("left",yinliang.width() * audio.volume -cri_yin.width()/2)
			})
	
	//调音量	拖动
	cri_yin.on("touchstart",false);
	cri_yin.on('touchstart',function(e){
		var r=cri_yin.width()/2;
		var start=r-e.offsetX;
		$(document).on('touchmove',function(e){
			var m=e.offsetX;
			var left=m-yinliang.position().left+start;
			var v=left/yinliang.width();
			if(v>1||v<0){
				return;
			}
			audio.volume=v;
		})
		return false;
	})

	$(document).on('touchend',function(){
			$(document).off('touchmove');
	})
	
	var currentIndex=3;
	function  render(){
			$(".ul").empty();
			$.each(music, function(i,v) {
				var c=(i===currentIndex)?"active":"";
				$("<li class='"+c+"'><span>"+v.author+'-'+ v.name+"</span></li>").appendTo(".ul");
			});
		}
			$(".ul").on("click",function(){
		    	$(".ul").find(".ul").removeClass("active");
		    	$(this).addClass("active");
		    	currentIndex=$(this).index();
		    	audio.src=music[currentIndex].src;
		    	audio.play();
		    })
			
//			render();
	
	//	点击上下首歌播放
		var last=$('.last')
		var next=$('.next')
		last.on('touchstart',function(){
			if(currentIndex-1<0){
				currentIndex=music.length;
			}
			audio.src=music[currentIndex-1].src;
			audio.play();
			currentIndex=currentIndex-1;
		})
		next.on('touchstart',function(){
			if(currentIndex+1>music.length){
				currentIndex=0;
			}
			audio.src=music[currentIndex+1].src;
			audio.play();
			currentIndex=currentIndex+1;
		})
	
	//列表显现
	var bflb=$('#bflb');
	var lb=$('.bflb');
	var close=$('.close');
	bflb.on('touchstart',function(){
		lb.addClass('xian');
	})
	
	var tou;
		$("html").on("touchstart",function(e){
			tou=e.originalEvent.changedTouches[0].clientY;
		})
		
		$("html").on("touchend",function(e){
			var wei=e.originalEvent.changedTouches[0].clientY;
			if(wei-tou>=60){
					lb.removeClass('xian');
			}
		})

	
	
	
	
})





















