function login(btn,form){
    /*点击的按钮动作*/
    $("#"+btn).click(function(){
      /*通过serializeArry把参数分解成数组，直接调用数组的值 */
      var datas=$("#"+form).serializeArray()
      /*判断某一项数据是否为空，为空是不允许注册*/
      for(let i=0;i<datas.length;i++){
        if (datas[i].value==''){
          alert('用户名或密码不能为空!')
          return
        }
      }
      
      /*先判断当前用户名是否可以注册*/
      var userdata=datas[0].name+"="+datas[0].value
      $.post('http://192.168.4.233:3000/users/checkuser',userdata,function(res){
        if(res.status==1){
          if(sessionStorage.getItem('username')==datas[0].value && sessionStorage.getItem('password')==datas[1].value){
            location.href='/Users/zelin/Desktop/项目/index.html'
          }else{
            alert('用户名或密码错误!')
          }        
        }else{
          alert('用户名不存在!')
        }
      })
    })
}
