// components/popover/popover.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value:false,
      observer: function(newVal, oldVal) {
        // 属性值变化时执行
        console.log(`${newVal}=========${oldVal}`);
        this.setData({
          isShow:newVal
        })
        
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    hidePop:function(){
      this.setData({isShow:false});
    }
  }
})
