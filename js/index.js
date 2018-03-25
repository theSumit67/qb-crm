/*-----------Tab Setting------------|START-------*/
let tabScrollCount = 5; /*Total Count When Next Previous Button Active*/
let localStorageStatus = 1; /*0 For OFF and 1 For ON*/
let logData = 1; /*0 To Disable Log Data and 1 Enable Log Data, Testing Environment*/
var defaultContent = '<div class="create-form-box"><form method="post"><label>File Name:</label><input type="text" class="file-name"><select class="file-format"><option value="html">html</option><option value="css">css</option><option value="js">js</option><option value="php">php</option><option value="json">json</option><option value="xml">xml</option></select><button class="create">Create</button></form></div>';
var installedExplore = {html:"fab fa-html5",js:"fab fa-js",css:"fab fa-css3-alt",jpg:"fas fa-image",png:"fas fa-image",gif:"fas fa-image",jpeg:"fas fa-image",php:"fab fa-php",mp4:"fas fa-video"};
function defaultTab(){
	createTab({ TabName:"Default Tab 01", TabContent:"<h1>Default Content 01</h1>" });
	createTab({FilePath:"https://www.w3schools.com/html/movie.mp4"});
	createTab({FilePath:"index.html"});
	createTab({FilePath:"style.css"});
	createTab({FilePath:"script.js"});
}
/*-----------Tab Setting------------|END-------*/
function dateAndTime(){
	var currentdate = new Date(); 
	var datetime = "Last Sync: " + currentdate.getDate() + "/"
	+ (currentdate.getMonth()+1)  + "/" 
	+ currentdate.getFullYear() + " @ "  
	+ currentdate.getHours() + ":"  
	+ currentdate.getMinutes() + ":" 
	+ currentdate.getSeconds();
	return datetime;
}
var splitBox;
function splitEqual(){
	var classAll = [];
	var gridCount = 0;
	var split = [];
	var splitEqual;
	var ow = [];
		$('.open-tab').each(function(){
			gridCount = gridCount +1;
			var getID = $(this).attr('data-tab-content');
			var getMainID = "[data-tab-content='"+getID+"']";
			classAll.push(getMainID);
			splitEqual = 100/gridCount;
			split.push(splitEqual);
		});
		for(var i=0;i<split.length;i++){
			ow.push(splitEqual);
		}
		splitBox = Split(classAll, {
			sizes: ow,
			minSize: 0,
			gutterSize:20
		});
}
function codeEditor(){
	$('[data-editor]').not('.ace_editor').each(function(){
		var editor = ace.edit(this);
		var getFormat = $(this).attr('data-editor-format');
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/"+getFormat+"");
	});
}
var getTabIcon;
function GetFilename(url){
   if (url){
      var m = url.substring(url.lastIndexOf('/')+1)
      return m;
   }
   return "Invalid File Name";
}
var TabName,TabContent,TabURL;
let createTab = function createNewTab({ TabName:tabname,TabURL:taburl,TabContent:tabcontent,FilePath:filepath}){
	var random = randomGrnrate();
	if (tabname === undefined || tabname === null){
		TextTab = "New Tab";
		getTabIcon = "fas fa-file";
	}else{
		TextTab = tabname;
		getTabIcon = "fas fa-file";
	}
	if (filepath === undefined || filepath === null){
		TextTab = "New Tab";
		getTabIcon = "fas fa-file";
	}else{
		var filePathtoName = GetFilename(filepath);
		TextTab = filePathtoName;
		var fileExtention = filePathtoName.split('.');
		var getFileExt = fileExtention[fileExtention.length-1];
		getTabIcon = installedExplore[getFileExt];
	}
	if (tabcontent === undefined || tabcontent === null){
		TabContent = "Default Content";
	}else{
		TabContent = tabcontent;
	}
	if(logData ==1){
		console.log('%c Tab Created ID: '+random+'', 'background: #4CAF50; color: #fff');
	}
	$('.cm-tab-buttom-wrapper > ul').append('<li data-tab-id="'+random+'" ><a><i class="'+getTabIcon+'"></i>'+TextTab+'<span class="tab-loading"></span></a><div class="tab-close"><i class="fas fa-times" aria-hidden="true"></i></div></li>');
	if(getFileExt == "css"){
	    TabContent = "<div data-editor='true' data-editor-format='css'>/*Write your CSS Code Here.."+dateAndTime()+"*/</div>";
		$('.cm-tab-content').append('<div data-tab-content="'+random+'">'+TabContent+'</div>');
	 }else if(getFileExt == "js"){
	    TabContent = "<div data-editor='true' data-editor-format='javascript'>/*Write your JS Code Here.."+dateAndTime()+"*/</div>";
		$('.cm-tab-content').append('<div data-tab-content="'+random+'">'+TabContent+'</div>');
	 }else if(getFileExt == "html"){
	    TabContent = "<div data-editor='true' data-editor-format='html'>Write your HTML Code Here.."+dateAndTime()+"</div>";
		$('.cm-tab-content').append('<div data-tab-content="'+random+'">'+TabContent+'</div>');
	 }else if(getFileExt == "mp4"){
	    TabContent = '<div class="tab-inside-video"><video width="320" height="240" controls src="'+filepath+'"></video></div>';
		$('.cm-tab-content').append('<div data-tab-content="'+random+'">'+TabContent+'</div>');
	 }else{
		 $('.cm-tab-content').append('<div data-tab-content="'+random+'">'+defaultContent+'</div>');
	 }
	$('[data-tab-id="'+random+'"]').addClass('active-tab').siblings().removeClass('active-tab');
	$('[data-tab-content="'+random+'"]').addClass('open-tab').siblings().removeClass('open-tab');
	PrevNextBtn();
	codeEditor();
}
let deleteTab = function deleteTabber(TabID){
	var haveID;
	$('[data-tab-id]').each(function(){
		haveID = $(this).attr('data-tab-id');
		if(TabID == haveID){
			$('[data-tab-id="'+TabID+'"]').prev('[data-tab-id]').click();
			$('[data-tab-id="'+TabID+'"]').remove();
			$('[data-tab-content="'+TabID+'"]').remove();
			if(logData ==1){
				console.log('Tab Deleted ID: '+TabID);
			}
		}else{
			if(logData ==1){
				console.log('%c No Tab ID Found. ', 'background: #f00; color: #fff');
			}
		}
	});

}
var count = 0;
var localStorageTotalCount;
if(localStorageStatus == 1){
	function tabInfoStore(){
		var getJson = {};
		var a=[];
		var b=[];
		var c=[];
		var d=[];
		var openInTab=[];
		$('.cm-tab-buttom-wrapper > ul > li').each(function(){
			var getOpenTab = $(this).attr('data-tab-id');
			var getActiveTab = $(this).attr('class');
			var getTabText = $(this).text();
			var tabIconA = $(this).find('svg').attr('data-prefix');
			var tabIconB = $(this).find('svg').attr('data-icon');
			var tabIcon = tabIconA+" "+"fa-"+tabIconB;
			a.push(getOpenTab);
			b.push(getActiveTab);
			c.push(getTabText);
			d.push(tabIcon);
			getJson.OpenTab = a;
			getJson.ActiveTab = b;
			getJson.TabText= c;
			getJson.TabIcon= d;
		});
		var f = JSON.stringify(getJson);
		localStorage.setItem("openTab",f);   
	}
	$(document).on('click',tabInfoStore);
	if (localStorage.getItem("openTab") === null) {
			defaultTab();
	}else{
		var getLocalStorageStatus = JSON.parse(localStorage.getItem("openTab"));
		if(Object.keys(getLocalStorageStatus).length === 0 && getLocalStorageStatus.constructor === Object){
			defaultTab();
		}else{
			var openStoreTab = JSON.parse(localStorage.getItem("openTab"));
			$('.cm-tab-buttom-wrapper> ul > li').remove();
			$('.cm-tab-content > div').remove();
			openStoreTab.OpenTab.forEach(function(value,index){
				localStorageTotalCount = index + 1;
				$('.cm-tab-buttom-wrapper> ul').append('<li data-tab-id="'+openStoreTab.OpenTab[index]+'" ><a><i class="'+openStoreTab.TabIcon[index]+'"></i>'+openStoreTab.TabText[index]+'<span class="tab-loading"></span></a><div class="tab-close"><i class="fa fa-times" aria-hidden="true"></i></div></li>');
				$('.cm-tab-content').append('<div data-tab-content="'+openStoreTab.OpenTab[index]+'">'+openStoreTab.OpenTab[index]+'</div>');
			});
			openStoreTab.ActiveTab.forEach(function(value,index){
				$('.cm-tab-buttom-wrapper> ul > li:eq('+index+')').addClass(openStoreTab.ActiveTab[index]);
				if($('.cm-tab-buttom-wrapper> ul > li:eq('+index+')').hasClass('active-tab')){
					$('.cm-tab-content > div:eq('+index+')').addClass('open-tab');
				}
			});
		}
		

	}
}
function PrevNextBtn(localStorageTotalCounts){
	$('.cm-tab-buttom-wrapper > ul > li').each(function(count){
		count = count + 1;
		if(count >= tabScrollCount || localStorageTotalCount >= tabScrollCount){
			$('.tab-scroll').remove();
			$(this).closest('.cm-tab-buttom-wrapper').before('<div class="next-tab tab-scroll"><i class="fas fa-chevron-left" aria-hidden="true"></i></div>');
			$(this).closest('.cm-tab-buttom-wrapper').after('<div class="prev-tab tab-scroll"><i class="fas fa-chevron-right" aria-hidden="true"></i></div>');
		$('.cm-tab-buttom-wrapper').css('width','calc(100% - 165px)');
		}else{
			$('.cm-tab-buttom-wrapper').css('width','calc(100% - 55px)');
			$('.tab-scroll').remove();
		}
	});
}
PrevNextBtn(localStorageTotalCount);
function randomGrnrate() {
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

$(document).on('click','.cm-tab-buttom-wrapper> ul > li',function(ev){
	if(ev.ctrlKey){
	    $(this).addClass('active-tab');
		var a = $(this).attr('data-tab-id');
		$('[data-tab-content="'+a+'"]').addClass('open-tab');
		splitBox.destroy();
		splitEqual();
	}else{
		$(this).addClass('active-tab').siblings().removeClass('active-tab');
		var a = $(this).attr('data-tab-id');
		$('[data-tab-content="'+a+'"]').css('width','100%').addClass('open-tab').siblings().removeClass('open-tab');
		splitBox.destroy();
		$('.gutter').remove();
	}
	
});
$('.cm-tab-buttom-wrapper').after('<div class="tab-plus" title="Add Tab"><i class="fa fa-plus" aria-hidden="true"></i></div>');
var digit = 0;
$(document).on('click','.tab-plus',function(){
	createTab({ TabName:"New Tab", TabContent:defaultContent});
	/*$('.cm-tab-buttom-wrapper > ul > li > a span.tab-loading').css('visibility','visible').width('100%');
	setTimeout(function(){
		$('.cm-tab-buttom-wrapper > ul > li > a span.tab-loading').css('visibility','hidden').width(0);
	},1000);
	var z=0;
	$('.cm-tab-buttom-wrapper > ul > li').each(function(z){
		var z = z+1;
		digit = z*200;
	});
	$('.cm-tab-buttom-wrapper> ul').css('left',digit);
	console.log(digit);*/
});
$('.cm-tab-buttom-wrapper').bind('mousewheel DOMMouseScroll', function(e) {
    if (e.originalEvent.wheelDelta / 120 > 0) {
       digit = digit + 200;
        $('.cm-tab-buttom-wrapper> ul').animate({"left":digit}, 100);
    } else {
        digit = digit - 200;
        $('.cm-tab-buttom-wrapper> ul').animate({"left":digit}, 100);
    }
});
$(document).on('click','.prev-tab',function(){
	digit = digit + 200;
	$('.cm-tab-buttom-wrapper> ul').animate({"left":digit}, 100);
});
$(document).on('click','.next-tab',function(){
	digit = digit - 200;
	$('.cm-tab-buttom-wrapper> ul').animate({"left":digit}, 100);
});
$(document).on('click','.tab-close',function(){
	var getTabID = $(this).closest('[data-tab-id]').attr('data-tab-id');
	deleteTab(getTabID);
});
$(".cm-tab-buttom-wrapper> ul").sortable({
    axis: "x",
    containment: ".cm-tab-buttom-wrapper",
    scroll: false
});
$(document).on('click', '.cm-tab-buttom-wrapper > ul > li > a', function(e) {
  var $ripple = $('<span class="rippling" />'),
    $button = $(this),
    btnOffset = $button.offset(),
    xPos = e.pageX - btnOffset.left,
    yPos = e.pageY - btnOffset.top,
    size = 0,
    animateSize = parseInt(Math.max($button.width(), $button.height()) * Math.PI);
  $ripple.css({
      top: yPos,
      left: xPos,
      width: size,
      height: size,
      backgroundColor: $button.attr("ripple-color")
    })
    .appendTo($button)
    .animate({
      width: animateSize,
      height: animateSize,
      opacity: 0
    }, 500, function() {
      $(this).remove();
    });
});
splitEqual();	

$(document).on('click','[data-tab-content]',function() {
	$(this).addClass('click-focus').siblings().removeClass('click-focus');
});
$(document).on('click',function() {
	$('[data-tab-content]').each(function(){
        if($(this).hasClass('click-focus')){
            var focusBox = $(this).attr('data-tab-content');
			$('[data-tab-id="'+focusBox+'"]').addClass('focus-active').siblings().removeClass('focus-active');;
        }
	});
});
$(document).on('click',function() {
	$('[data-editor="true"]').each(function(){
        if($(this).hasClass('ace_focus')){
            var focusBox = $(this).closest('[data-tab-content]').attr('data-tab-content');
			$('[data-tab-id="'+focusBox+'"]').addClass('focus-active').siblings().removeClass('focus-active');;
        }
	});
});
/*--------Menu--------*/
$('.menu-option li:has(ul)').addClass('hassub');
$('.menu-option > li.hassub > b').append('<i class="fas fa-angle-right"></i>');
$('.menu-option > li.hassub > b').prepend('<i title="Back" class="cm-menu-back"><i class="fas fa-angle-left"></i>Back</i>');
$(document).on('click', '.menu-option li.hassub', function (e) {
	$(this).siblings('li').hide();
	$(this).addClass('menu-sub-active').children('ul').show();
	var attr = $(this).attr('increase');
	if (typeof attr !== typeof undefined && attr !== false) {
		$('.cm-edit-option-box-wrapper').css('width', '800');
	}
});
$(document).on('click', '.menu-option li.hassub', function (e) {
	$('.hassub').removeClass('show-up').addClass('hide-up');
	$(this).addClass('show-up').removeClass('hide-up');
});
$(document).on('click', '.menu-option li', function (e) {
	e.stopPropagation();
});
$(document).on('click', '.cm-menu-back', function (e) {
	e.stopPropagation();
	$(this).closest('.menu-sub-active').siblings('li').show();
	$(this).closest('.menu-sub-active').removeClass('menu-sub-active');
	$(this).closest('.hassub').find('ul').hide();
	$('.cm-edit-option-box-wrapper').css('width', '400');
	$('.hassub').removeClass('show-up').addClass('hide-up');
	$(this).closest('.menu-sub-active').addClass('show-up').removeClass('hide-up');
}); 
/*----------Menu End-------*/ 
$('.theme-structure:not(.big-file-manager) li:has(ul)').addClass('has-child-data');
$('[data-file-icon]').each(function(){
	var getType = $(this).attr('data-file-icon');
	if(getType == "folder"){
		$(this).children('b').prepend('<i class="fas fa-folder"></i>');
	}else if(getType == "file"){
		$(this).children('b').prepend('<i class="fas fa-file"></i>');
	}else if(getType == "layout"){
		$(this).children('b').prepend('<i class="fas fa-th-large"></i>');
	}else if(getType == "image"){
		$(this).children('b').prepend('<i class="far fa-images"></i>');
	}else if(getType == "video"){
		$(this).children('b').prepend('<i class="fas fa-video"></i>');
	}
});
if($('.theme-structure').hasClass('big-file-manager')){
	$('.big-file-manager ul li[data-file-icon="folder"]:not(:has(ul))').addClass('empty-folder');
	$('.big-file-manager ul li.empty-folder').append('<ul class="no-item-inside-folder"><span>This folder has no items.</span></ul>');
	$('.big-file-manager ul li:has(ul)').addClass('has-files-of-folder');
	//$('.menu-option > li.hassub > b').append('<i class="fas fa-angle-right"></i>');
	$('.big-file-manager ul > li.has-files-of-folder > b').prepend('<i title="Back" class="cm-folder-back"><i class="fas fa-angle-left"></i>Back</i>');
	$(document).on('dblclick', '.big-file-manager ul li.has-files-of-folder', function (e) {
		$(this).siblings('li').hide();
		$(this).addClass('file-sub-active').children('ul').show();
		/*var attr = $(this).attr('increase');
		if (typeof attr !== typeof undefined && attr !== false) {
			$('.cm-edit-option-box-wrapper').css('width', '800');
		}*/
	});
	$(document).on('dblclick', '.big-file-manager ul li.has-files-of-folder', function (e) {
		$('.has-files-of-folder').removeClass('show-up').addClass('hide-up');
		$(this).addClass('show-up').removeClass('hide-up');
	});
	$(document).on('dblclick', '.big-file-manager ul li', function (e) {
		e.stopPropagation();
	});
	$(document).on('click', '.cm-folder-back', function (e) {
		e.stopPropagation();
		$(this).closest('.file-sub-active').siblings('li').show();
		$(this).closest('.file-sub-active').removeClass('file-sub-active');
		$(this).closest('.has-files-of-folder').find('ul').hide();
		$('.has-files-of-folder').removeClass('show-up').addClass('hide-up');
		$(this).closest('.file-sub-active').addClass('show-up').removeClass('hide-up');
		$(this).parent('b').next('ul').children('li').removeClass('select');
	}); 
}else{
	$(document).on('click','.theme-structure ul li',function(e) {
		$(this).children('ul').slideToggle();
		$(this).toggleClass('open');
	});
	$(document).on('click','.theme-structure ul',function(e) {
		e.stopPropagation();
	});
	$('.has-child-data > b').append('<div class="arrow-nav-highlight"><i class="fas fa-caret-right"></i></div>');
}

$(document).on('dblclick','.theme-structure ul li[data-file-path] b',function() {
	var getFilePath = $(this).closest('li').attr('data-file-path');
	createTab({FilePath:getFilePath});
});

$(document).on('contextmenu','[data-file-icon]',function(e){
	var off = $(this).offset();
	var topPos = e.pageY;
	var leftPos = e.pageX;
	$('.append-option-box').remove();
	$(this).addClass('context-visible');
	$(this).append('<div class="append-option-box" style="top:'+topPos+'px;left:'+leftPos+'px;">  <div class="">Open</div><div class="">Copy</div> <div data-function="data-move">Move</div> <div class="">Rename</div> <div class="">Delete</div> <div class="">Share</div> <div data-function="data-properties">Properties</div></div>');
	if($(this).attr('data-file-icon') != "folder"){
		$('.append-option-box').append('<div data-function="data-copy-secure-path">Copy Secure Path</div>');
	}
	return false;
});
$(document).on('click','[data-file-icon]',function(e){
	e.stopPropagation();
	$(this).addClass('select').siblings().removeClass('select');
	return false;
});
$(document).on('click contextmenu',function(e){
	e.stopPropagation();
	$('[data-file-icon]').removeClass('context-visible').removeClass('select');
	$('.append-option-box').remove();
});
$(document).on('click contextmenu','.append-option-box',function(e){
	e.stopPropagation();
	$('[data-file-icon]').removeClass('context-visible').removeClass('select');
	$('.append-option-box').remove();
});
$('.big-file-manager.theme-structure ul li b').each(function(){
	var getText = $(this).text();
	$(this).closest('li').attr('data-search-keyword',getText);
});
$(document).on('focus','.search-project-file-inner input',function(){
	$('.theme-structure').addClass('searching');
}).on('blur','.search-project-file-inner input',function(){
	$('.theme-structure').removeClass('searching');
});
$(document).on('keyup','.search-project-file-inner input',function(){
    var filter = $(this).val();
    $(".big-file-manager.theme-structure ul li").each(function () {
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).hide();
        } else {
            $(this).show()
        }
    });
});

$(document).on('click','[data-function="data-properties"]',function(){
	$('.cm-properties-popup-section').addClass('open');
});
$(document).on('click','.cm-properties-close',function(){
	$('.cm-properties-popup-section').removeClass('open');
});
$(document).on('click','[data-function="data-move"]',function(){
	$('.data-moving').removeClass('data-moving');
	$(this).closest('[data-file-icon]').addClass('data-moving');
});
$(document).on('click','[data-function="data-move"]',function(){
	$('.data-moving').removeClass('data-moving');
	$(this).closest('[data-file-icon]').addClass('data-moving');
});
function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	var txt = '{{ '+$(element).closest('[data-file-id]').attr('data-file-id')+' }}';
	$temp.val(txt).select();
	document.execCommand("copy");
	$temp.remove();
	$('.theme-structure').append('<div class="copied">Copied !</div>');
	setTimeout(function(){
		$('.copied').addClass('copied-visible');
	},500);
	setTimeout(function(){
		$('.copied').remove();
	},3000);
}
$(document).on('click','[data-function="data-copy-secure-path"]',function(){
	copyToClipboard(this);
});