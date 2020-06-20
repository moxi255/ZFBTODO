const app = getApp();

Page({
  data: {
    inputValue: '',
    iconUrl: ''
  },

  onBlur(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  add() {
    // 如果任务名称没有填，则进行提示
    if (this.data.inputValue == '') {
      my.alert({
        title: '添加失败',
        content: '请填写任务名称。',
        buttonText: '我知道了',
      });

    // 正常情况，写入数据存储
    } else {
      this.addTodo().then((res) => {
        if(res.success) {
          my.navigateBack();
        } else {
          my.showToast({
            content: '请求失败，请重试'
          });
        }
      });
    }
  },

  // 选择图片并上传
  uploadImg() {
    my.chooseImage({
      chooseImage: 1,
      success: res => {
        const path = res.apFilePaths[0];
        const that = this;
        my.getFileInfo({
          apFilePath: path,
          success:(fileData)=>{
            my.getImageInfo({
              src: path,
              success: function(res) {
                const options = {
                  filePath: path,
                  fileSize: fileData.size,
                  extension: res.type,
                  headers: {
                    contentDisposition: 'inline',
                  },
                };
                app.mpServerless.file.uploadFile(options).then((image) => {
                  that.setData({
                    iconUrl: image.fileUrl,
                  });
                }).catch(console.error);
              },
              fail: function(err) {
                console.log(err);
              },
            });
          },
        });
      },
    });
  },

  // 写入数据库 obj，当前用户增加一条 todo
  addTodo(){
    const that = this;
    return new Promise(function (resolve, reject) {

      app.mpServerless.user.getInfo().then((res) => {
        if (res.success) {
          app.mpServerless.db.collection('todos').insertOne({
            text: that.data.inputValue,
            iconUrl: that.data.iconUrl ? that.data.iconUrl : false,
            userId: res.result.user.userId,
            completed: false,
            createTime: new Date(),
            completeTime: false,
          }).then(() => {
            resolve({ success: true });
          }).catch(err => {
            console.error(err);
            reject({ success: false });
          });
        }
      }).catch(err => {
        console.error(err);
        reject({ success: false });
      });

    });
  }

});
