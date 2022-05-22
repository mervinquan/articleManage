$.ajaxPrefilter(function(options){
  options.url = 'http://www.liulongbin.top:3007' + options.url
})


$('#to_register').on('click',function(){
  $('.login_box').hide()
  $('.register_box').show()
})
$('#to_signup').on('click',function(){
  $('.login_box').show()
  $('.register_box').hide()
})

var mform = layui.form

mform.verify({
  // pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
  pdw : function(value){
    var pattr = /^\w{6,12}$/g
    if(!pattr.test(value)){
        return '密码必须6到12位，且不能出现空格'
    }
  }
})

$('#summit_form').on('submit',function(e) {

  e.preventDefault()
  var submit_data = {
    // #summit_form [name=user]中间要有空格
    username: $('#summit_form [name=user]').val(),
    password: $('#summit_form [name=password]').val()
  }
      console.log(submit_data)
  $.post('http://www.liulongbin.top:3007/api/reguser',submit_data,function(res){
    
    // username:a11qq    password123456

    

    console.log(res)
    if(res.status == 0){
      layer.msg('注册成功，请登录！')
      $('#to_signup').click()
    }else{
      layer.msg(res.message)
    }
  })

})

$('#login_form').submit(function(e) {
  e.preventDefault()
  console.log($(this).serialize())
  $.ajax({
    url: '/api/login',
    method: 'POST',
    data: $(this).serialize(),
    success: function(e){
      console.log(e)
      if(e.status == 0){
        localStorage.setItem('token',e.token)
        location.href = '/index.html'
      }else {
        layer.msg('登录失败')
      }

    }
    
  })

})