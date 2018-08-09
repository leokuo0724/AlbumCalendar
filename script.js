var zIndex= 1;
var endTop= -60;
var endLeft= 200;
var oEvent = document.getElementsByClassName('event')[0];
var aBook = document.getElementsByClassName('book');
// var galleryNum = aGallery.length;
var oAlbum = document.getElementsByClassName('album')[0];
var aGallery = document.getElementsByClassName('gallery');
var aEventLi = oEvent.getElementsByTagName('li');
var oG1 = document.getElementById('g1');
var oG2 = document.getElementById('g2');
var oSelector = document.getElementsByClassName('selector')[0];
var oViewBG = oSelector.getElementsByTagName('a')[0];
var oGridBG = oSelector.getElementsByTagName('a')[1];
var isView = true;
var isG1 = true;

// 點擊變化view, grid
// 預設
oViewBG.className = 'active1';
oViewBG.onclick = function(){
	oViewBG.className = 'active1';
	$('#viewBG img').attr('src','img/view_active.png');
	oGridBG.className = '';
	$('#gridBG img').attr('src','img/grid.png');
	isView = true;
	// $('.gallery').css({'display':'block'});
	$('.galleryView').css({'display':'none'});
	if(isG1 == true){
		$('#g1').css({'display':'block','opacity':100});
		$('#g2').css({'display':'none'});
	} else {
		$('#g1').css({'display':'none'});
		$('#g2').css({'display':'block','opacity':100});
	}
}
oGridBG.onclick = function(){
	oGridBG.className = 'active2';
	$('#gridBG img').attr('src','img/grid_active.png');
	oViewBG.className = '';
	$('#viewBG img').attr('src','img/view.png');
	isView = false;
	$('.gallery').css({'display':'none'});
	// $('.galleryView').css({'display':'block'});
	if(isG1 == true){
		$('#grid1').css({'display':'block'});
		$('#grid2').css({'display':'none'});
	} else {
		$('#grid1').css({'display':'none'});
		$('#grid2').css({'display':'block'});
	}
}

// 點擊左上相本
var currentBook;
for(var i=0; i<aBook.length; i++){
	aBook[i].index = i;
	aBook[i].onclick = function(){
		// currentBook = this.index;
		startMove(oAlbum,{opacity:100});
		// 清除所有樣式
		for(var i=0; i<aGallery.length; i++){
			startMove(aGallery[i],{opacity:0});
			aEventLi[i].style.listStyleType = 'none';
			aGallery[i].style.display = 'none';
			$('.galleryView').css({'display':'none'});
		}

		if(this.index == 0){
			isG1 = true;
		} else if(this.index ==1){
			isG1 = false;
		}

		// 切換相本標示
		aEventLi[this.index].style.listStyleType = 'disc';

		if (isView) {
			// 相本view顯示
			var str = 'g'+(this.index+1);
			var oG = document.getElementById(str);
			oG.style.display = 'block';
			setInterval(startMove(oG,{opacity:100}),300);
		} else {
			// 相本grid顯示
			var str = 'grid'+(this.index+1);
			var oGrid = document.getElementById(str);
			oGrid.style.display = 'block';
			setInterval(startMove(oGrid,{opacity:100}),300);
		}
	}
}

function randRotation(el){
	var rot = Math.round( Math.random() * 90-45);
	return $(el).css({
		'-webkit-transform':'rotate('+rot+'deg)'
		,'-moz-transform':'rotate('+rot+'deg)'
		,'transform':'rotate('+rot+'deg)'
	});
}

// 初始為 view顯示方式
// changeView();

	// if (isView == true) {
		$('.gallery li').each(function(){
			randRotation(this).css({
				top:Math.round(Math.random()*50-25)
				,left:Math.round(Math.random()*50-25)
				,'zIndex': zIndex++
			})

			.click(function(){
				var myZindex = $(this).css('zIndex');
				$('.gallery li').not(this).each(function(){
					if( $(this).css('zIndex') > myZindex ){
						$(this).css('zIndex',$(this).css('zIndex')-1);
					}
				});
				if(! $(this).is('.active')){
					$(this).toggleClass('active')
					.animate({
						top:endTop
						,left:endLeft
					})
					.css({zIndex:$('.gallery li').length });
					var activated=$('.gallery .active').not(this);
					activated.length && activated.click();
				}else{
					$('.gallery li').each(function(){$(this).css('zIndex',parseInt($(this).css('zIndex'),10)+1)});
					randRotation($(this).toggleClass('active'))
					.animate({
						top:Math.round(Math.random()*50-25)
						,left:Math.round(Math.random()*50-25)
					}).css({zIndex:1});
				}
			});
		});
	// }
