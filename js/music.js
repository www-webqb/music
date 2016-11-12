$(function(){
	//歌曲选项按钮
	var cd=$(".cd");
	var gql=$(".gqlbf");
	var dz=$(".dj-xs");
	cd.on("touchend",function(){
        gql.css("display","block")
	})
	dz.on("touchend",function(){
        gql.css("display","none")
	})
	
	
	
	
	
	//音乐控制部分
	var audio=$("#audio").get(0);
	var $audio=$(audio);
	var play=$(".bf-an .bf-zt");
	var previous=$(".sys");
	var next=$(".xys");
	var current=$(".sjk");
	var duration=$(".sjz");
	var progress=$(".yyjdu");
	var cir=$("#cir");
	var red=$("#progress .yyjdu .red");
	
	
	//时间格式的转换
	function time(v){
		v = Math.floor(v)
		var s= v % 60;
		s = s < 10 ? ("0"+s ):s ;
		var z= Math.floor(v / 60)
		return z+":"+s;
	}
	play.on("touchend",function(){
		if (audio.paused) {
			audio.play();
			play.html("&#xe646;")
		} else{
			audio.pause();
			play.html("&#xe62a;")
		}
	})
	
	cir.on("touchstart",function(e){
		var offsetX=originalEvent.changedTouches[0].clientX-cir.offset().left;
		var ir=cir.width()/2;
		var start=ir-offsetX;
		$(document).on("touchstart",function(e){
			var left=e.clientX - progress.position().left +start;
			var c= left/progress.width()*audio.duration;
			if (c>=audio.duration||c<=0) {
				return;
			}
			audio.currentTime=c;
			
		})
		return false;
	})
	$(document).on("touchend",function(){
		$(document).off("touchmove");
	})
	
	progress.on("touchend",function(e){
		var ir=cir.width()/2;
		var offsetX=e.originalEvent.changedTouches[0].clientX-cir.width().left;
		audio.currentTime=offsetX.progress.width()*audio.duration;
	})
	
	//音乐进度
	$("audio").on("timeupdate",function(){
		var ir=cir.width()/2;
		current.html(time(audio.currentTime));
		var left= progress.width()* audio.currentTime /audio.duration-ir;
		var width=progress.width()*audio.currentTime/audio.duration;
		cir.css("left",left);
		red.css("width",width);
	})
	
	
	
	var music=[
	    {
	    	name:"千千阙歌",
	    	src:"张国荣-千千阙歌 (90 Live).mp3",
	    	duration:"4:38",
	    },
	    {
	    	name:"逝水流年",
	    	src:"张国荣-似水流年.mp3",
	    	duration:"4:18",
	    },
	    {
	    	name:"我",
	    	src:"张国荣-我 (国语).mp3",
	    	duration:"3:44",
	    },
	    {
	    	name:"追",
	    	src:"张国荣-追.mp3",
	    	duration:"5:03",
	    },
	    {
	    	name:"倩女幽魂",
	    	src:"张国荣-倩女幽魂.mp3",
	    	duration:"3:35",
	    },
	]
	var index=0;
	
	//添加歌曲列表
	
	function add(){
		$(".gql").empty();//empty()删除匹配的元素集合中所有的子节点。
		$.each(music,function(i,v){
			var c = ( i === index ) ? "active" : "";
			$('<li class="'+c+'">'+music[i].name+'</li>').appendTo(".gql");
		})
	}
	add();
	
	//歌曲切换
	
	$(".gql").on("touchend","li",function(){
		
		index=$(this).closest('li').index();
		audio.src=music[index].src;
		audio.name=music[index].name;
	 	var ins=index+1;
//	  	console.log(ins)
		$(".xz img").html(src="img/"+ins+".jpg");
        $(".gqmc").html(audio.name)
		audio.play();
		add();
	})
	
	
	
	
	//下一首
	
	function Next(){
		var indexs=index+1;
		if(indexs>=music.length){
			indexs=0;
		}
		audio.src=music[indexs].src;
		$(".gqmc").html(audio.name)
//		var ins=indexs+1;
//	  	console.log(ins)
//		$("#zhao").css({backgroundImage: "url('images/1"+ins+".jpg')"})
		index=indexs;
		add();
		audio.play();
	}
	next.on("touchend",Next);
	
	//上一首
	
	function Previous(){
		var indexs=index-1;
		if(indexs<0){
			indexs=2;
		}
		audio.src=music[indexs].src;
		$(".gqmc").html(audio.name)
//		var ins=indexs+1;
//	  	console.log(ins)
//		$("#zhao").css({backgroundImage: "url('images/1"+ins+".jpg')"})
		index=indexs;
		add();
		audio.play()
	}
	
	previous.on("touchend",Previous)
})
