const downloadButton = document.getElementById("downloadButton"); //获取下载按钮

function load_3(){ //加载界面
    var load_3 = document.createElement("div"); // 创建加载动画元素
    load_3.className = "load_3"; // 让它的style绑定
    load_3.innerHTML = "<div></div><div></div><div></div><div></div>"; // 加载动画的HTML内容
    load_3.style.position = "absolute";
    load_3.style.top = "50%";
    load_3.style.left = "50%";
    load_3.style.transform = "translate(-50%, -50%)";
    var loadText = document.createElement("div"); // 创建加载文字元素
    loadText.innerHTML = "加载中..."; // 加载文字的HTML内容
    loadText.style.position = "absolute";
    loadText.style.top = "50%";
    loadText.style.left = "50%";
    loadText.style.transform = "translate(-50%, 200%)";
    loadText.style.color = "#ffffff";
    loadText.style.fontSize = "16px";
    loadText.style.animation = "fadeIn 0.3s forwards";
    var backGround = createBackGround(1);
    backGround.style.animation = "fadeIn 0.3s forwards";
    document.body.appendChild(backGround); // 将背景元素添加到body中
    backGround.appendChild(load_3); // 将加载动画添加到背景元素中
    backGround.appendChild(loadText); // 将加载文字添加到加载动画元素中
    
    // 实现真加载逻辑：检测所有图片加载完成
    var images = document.getElementsByTagName('img');
    var loadedCount = 0;
    var totalImages = images.length;
    var timeoutId; // 超时定时器ID
    
    // 如果没有图片，直接隐藏加载页面
    if (totalImages === 0) {
        hideLoader();
        return;
    }
    
    // 设置5秒超时，弹出是否跳过提示
    timeoutId = setTimeout(async function(){
        var isSkip = await decideBoxShow("加载超时", "加载时间超过5秒，是否跳过加载？", "跳过", "继续等待");
        // 监听用户选择
        if (isSkip) {
            hideLoader();
        }
        // 继续等待则不做处理，继续等待图片加载
    }, 5000);
    
    // 为每个图片添加加载完成事件监听器
    function imageLoaded() {
        loadedCount++;
        // 当所有图片都加载完成时，隐藏加载页面
        if (loadedCount === totalImages) {
            clearTimeout(timeoutId); // 清除超时定时器
            hideLoader();
        }
    }
    
    // 遍历所有图片
    for (var i = 0; i < totalImages; i++) {
        // 如果图片已经加载完成
        if (images[i].complete) {
            imageLoaded();
        } else {
            // 为未加载完成的图片添加事件监听器
            images[i].addEventListener('load', imageLoaded);
            images[i].addEventListener('error', imageLoaded); // 处理图片加载失败的情况
        }
    }
    
    // 隐藏加载页面的函数
    function hideLoader() {
        clearTimeout(timeoutId); // 确保清除定时器
        backGround.style.opacity = "0";
        setTimeout(() => {
            backGround.remove();
            // 加载完成后播放主界面动画
            setTimeout(() => {
                // 为主视图添加动画
                var mainView = document.getElementById('mainView');
                if (mainView) {
                    mainView.style.animation = 'start 1s ease forwards';
                }
                
                // 为右侧底部元素添加动画
                var rightBottom = document.getElementById('rightBottom');
                if (rightBottom) {
                    rightBottom.style.animation = 'start 1s ease 0.5s forwards';
                }
            }, 100);
        }, 300);
    }
}
load_3();






downloadButton.addEventListener("click", async function(){
    var dlg = await decideBoxShow("确认下载", "选择 Varcon Start Menu 3.0 的下载方式","123云盘","通过GitHub");
    if(dlg == true){
        // 123云盘
        window.open("https://www.123865.com/s/MO1cVv-FoSov");
    }
    else{
        // 通过GitHub
        window.open("https://github.com/Winnako155/varcon");
    }
});
// 检测.lightFont元素是否进入视口
const lightFont = document.querySelector('.lightFont');


//扫光效果
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 每次进入视口都重新触发动画
            entry.target.style.animation = 'none';      // 先清除动画
            void entry.target.offsetWidth;              // 强制重排
            entry.target.style.animation = 'shine 2s forwards';
        } else {
            // 当元素离开视口时清除动画，以便下次重新触发
            entry.target.style.animation = '';
        }
    });
}, {threshold: 0.5}); // 当50%的元素可见时触发
observer.observe(lightFont);
// 移除CSS中.lightFont的初始动画设置
// 需要在style.css中删除.lightFont的animation属性
//扫光效果结束

//创建背景元素
function createBackGround(opacity){
    var backGround = document.createElement("div"); // 创建背景元素
    backGround.id = "backGround"; //让它的style绑定
    backGround.style.backgroundColor = "rgba(0, 0, 0, " + opacity + ")"; // 设置背景元素的透明度
    return backGround;
}
//创建决定框元素结束

// 显示决定框
function decideBoxShow(title, content, applyText = "确认", cancelText = "取消"){
    return new Promise(function(resolve){
        var backGround = createBackGround(0.6); // 创建背景元素
        var decideBox = document.createElement("div"); // 创建决定框元素
        decideBox.id = "decideBox"; // 让它的style绑定
        var decideBox_Title = document.createElement("h1"); // 创建决定框标题元素
        var decideBox_Content = document.createElement("p"); // 创建决定框内容元素
        var decideBox_ButtonsDiv = document.createElement("div"); // 创建决定框按钮元素

        var decideBox_Apply = document.createElement("button"); // 创建决定框确认按钮元素
        decideBox_Apply.id = "decideBox_Apply"; // 让它的style绑定
        var decideBox_Cancel = document.createElement("button"); // 创建决定框取消按钮元素
        decideBox_Cancel.id = "decideBox_Cancel"; // 让它的style绑定
        decideBox_ButtonsDiv.appendChild(decideBox_Apply); // 将决定框确认按钮元素添加到决定框按钮元素中
        decideBox_ButtonsDiv.appendChild(decideBox_Cancel); // 将决定框取消按钮元素添加到决定框按钮元素中
        decideBox.appendChild(decideBox_Title); // 将决定框标题元素添加到决定框元素中
        decideBox.appendChild(decideBox_Content); // 将决定框内容元素添加到决定框元素中
        decideBox.appendChild(decideBox_ButtonsDiv); // 将决定框按钮元素添加到决定框元素中
        backGround.appendChild(decideBox); // 将决定框元素添加到背景元素中
        document.body.appendChild(backGround); // 将背景元素添加到body元素中
    

        decideBox_Title.innerHTML = title; // 给决定框标题元素添加文字
        decideBox_Content.innerHTML = content; // 给决定框内容元素添加文字
        decideBox_Apply.innerHTML = applyText; // 给决定框确认按钮元素添加文字
        decideBox_Cancel.innerHTML = cancelText; // 给决定框取消按钮元素添加文字
        decideBox_Apply.addEventListener("click", function(){ // 点击决定框确认按钮元素时隐藏决定框
            decideBoxHide();
            resolve(true);
        });
        decideBox_Cancel.addEventListener("click", function(){ // 点击决定框取消按钮元素时隐藏决定框
            decideBoxHide();
            resolve(false);
        });
        backGround.addEventListener("click", function(){ // 点击背景元素时隐藏决定框
            if (event.target === backGround) { // 检查点击的是否是背景元素本身
                decideBoxHide();
                resolve(false);
            }
        });
    });
}
//显示决定框结束

// 隐藏决定框
function decideBoxHide(){
    
    backGround.style.animation = "background_Hidden 0.3s forwards";
    decideBox.style.animation = "decideBox_Hidden 0.3s forwards";

    setTimeout(() => {
        document.body.removeChild(backGround); // 从body元素中移除背景元素
    }, 300);
}
//隐藏决定框结束
