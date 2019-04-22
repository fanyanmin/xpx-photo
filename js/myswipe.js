var html = "";
html+="<!-- Root element of PhotoSwipe. Must have class pswp. -->";
html+="<div class=\"pswp\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">";
html+="";
html+="    <!-- Background of PhotoSwipe.";
html+="         It\'s a separate element as animating opacity is faster than rgba(). -->";
html+="    <div class=\"pswp__bg\"><\/div>";
html+="";
html+="    <!-- Slides wrapper with overflow:hidden. -->";
html+="    <div class=\"pswp__scroll-wrap\">";
html+="";
html+="        <!-- Container that holds slides.";
html+="            PhotoSwipe keeps only 3 of them in the DOM to save memory.";
html+="            Don\'t modify these 3 pswp__item elements, data is added later on. -->";
html+="        <div class=\"pswp__container\">";
html+="            <div class=\"pswp__item\"><\/div>";
html+="            <div class=\"pswp__item\"><\/div>";
html+="            <div class=\"pswp__item\"><\/div>";
html+="        <\/div>";
html+="";

html+="        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->";
html+="        <div class=\"pswp__ui pswp__ui--hidden\">";
html+="";

// html+="            <div class=\"pswp__caption2\">";
// html+="                <img src=\"./img/download.png\"/>";
// html+="            <\/div>";
// html+="";

html+="            <div class=\"pswp__top-bar\">";
html+="";
html+="                <!--  Controls are self-explanatory. Order can be changed. -->";
html+="";
html+="                <div class=\"pswp__counter\"><\/div>";
html+="";
html+="                <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"><\/button>";
html+="";

html+="                <button class=\"pswp__button pswp__button--share\" title=\"share \"><\/button>";
html+="";

// html+="            <div class=\"pswp__caption2\" title=\"Close (Esc)\">"; 
// html+="                <img src=\"./img/download.png\"/>";
// html+="            <\/div>";
// html+="";

// html+="";
html+="                <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"><\/button>";
html+="";
html+="                <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in\/out\"><\/button>";
html+="";
html+="                <!-- Preloader demo http:\/\/codepen.io\/dimsemenov\/pen\/yyBWoR -->";
html+="                <!-- element will get class pswp__preloader--active when preloader is running -->";
html+="                <div class=\"pswp__preloader\">";
html+="                    <div class=\"pswp__preloader__icn\">";
html+="                        <div class=\"pswp__preloader__cut\">";
html+="                            <div class=\"pswp__preloader__donut\"><\/div>";
html+="                        <\/div>";
html+="                    <\/div>";
html+="                <\/div>";
html+="            <\/div>";
html+="";
html+="            <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">";
html+="                <div class=\"pswp__share-tooltip\"><\/div>";
html+="            <\/div>";
html+="";
html+="            <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\">";
html+="            <\/button>";
html+="";
html+="            <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\">";
html+="            <\/button>";
html+="";
html+="            <div class=\"pswp__caption\">";
html+="                <div class=\"pswp__caption__center\"><\/div>";
html+="            <\/div>";
html+="";

html+="        <\/div>";
html+="";
html+="    <\/div>";
html+="";
html+="<\/div>";
$("body").append(html);

function more(obj,id) {
    if ($('#txt'+id).is(":hidden")) {
        $('#p'+id).hide();
        $('#txt'+id).show();
        obj.innerHTML='收起';
    } else {
        $('#p'+id).show();
        $('#txt'+id).hide();
        obj.innerHTML='全文';
    }
}
window.onload=function(){
    $(".my-gallery>figure>div").each(function(){
		console.log($(this))
		var s = document.body.clientWidth / 3;
		$(this).parent().width(s-4);
		$(this).parent().height(s-4);
		// var width = $(this).context.offsetWidth;
		// $(this).height(width);
		var img_url = $(this).children("a").children("img");
		var img = new Image();
		img.src = img_url.attr("src");
		if (img.width > img.height) {
			img_url.height(s-4);
		}else{
			img_url.width(s-4);
		}
	});
	auto_data_size();
	initPhotoSwipeFromDOM('.my-gallery');
	};
	function auto_data_size(){
	var imgss= $(".my-gallery img");
	$(".my-gallery img").each(function() {
	var imgs = new Image();
	imgs.src=$(this).attr("src");
	var w = imgs.width,
	h =imgs.height;
	$(this).parent("a").attr("data-size","").attr("data-size",w+"x"+h);
	})
	};

var initPhotoSwipeFromDOM = function(gallerySelector) {

    // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item,
            divEl;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // 仅包括元素节点
            if(figureEl.nodeType !== 1) {
                continue;
            }
            divEl = figureEl.children[0];
            linkEl = divEl.children[0]; // <a> element
            // console.log(linkEl.getAttribute('data-size').split('x'))
            size = linkEl.getAttribute('data-size').split('x');
            // 创建幻灯片对象
            item = {

                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> 缩略图节点, 检索缩略图网址
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // 查找最近的父节点
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // 当用户点击缩略图触发
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
        	
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
    	
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
            // console.log(pswpElement)

        items = parseThumbnailElements(galleryElement);

        // 这里可以定义参数
        options = {
          barsSize: { 
            top: 100,
            bottom: 100
          }, 
           fullscreenEl : false,
        //    shareButtons: [
        //                {id:'qq', label:'QQ', url:'tencent://message/?uin={{url}}'},
        //                {id:'weibo', label:'新浪微博', url:'http://v.t.sina.com.cn/share/share.php?url={{fromURL}}&title={{pswpElement}}'},
        //                 {id:'download', label:'保存图片', url:'{{raw_image_url}}', download:true}
        //                 ], // 分享按钮
            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
    };
    

