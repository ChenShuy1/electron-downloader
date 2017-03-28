const {dialog} = require('electron').remote
const {ipcRenderer} = require('electron')

var button_choose = document.getElementById("choose-folder");
var button_download = document.getElementById("download-btn");
var downloadFolder = document.getElementById("download-to");
var downloadAddress = document.getElementById("download-address");

ipcRenderer.on('tips', (event, person) => {
  console.log(person, 'born')
});

window.onload = function() {
    button_choose.addEventListener("click", function(){
        dialog.showOpenDialog({
            defaultPath :'../Desktop',
            properties: [
                'openDirectory',
            ],
            filters: [
                { name: 'All', extensions: ['*'] },
            ]
        },function(res){
            downloadFolder.value = res[0];
        })
    });
    button_download.addEventListener("click", function(){
        var tips = document.getElementsByClassName("tips")[0];
        if(downloadFolder.value!=""&&downloadAddress.value!="") {
            ipcRenderer.send('download', downloadAddress.value+"+"+downloadFolder.value);
        } else if(downloadAddress.value=="") {
            tips.innerText = "未填写下载地址";
        } else {
            tips.innerText = "未选择文件夹"
        }
    })
}
