$(function(){
    var toDolist = {
        init:function(){
            this.cacheElement();
            this.addEvent();
        },
        cacheElement:function(){
            // 添加列选择器
            this.$title=$('#title');
            this.$btn=$('#btn');
            // 代办任务操作列选择器
            this.$wait=$('.wait');
            // 代办任务批量操作列选择器
            this.$all=$('.operation input');
            this.$all_ok=$('.operation i');
            this.$all_del=$('.operation em');
            // 已完成事件选择器
            this.$finish=$('.finish');
        },
        addEvent:function(){
            // 保存this指向
            var _this=this
            // 添加内容事件
            this.$btn.on('click','',function(){
                // 判断输入不能为空
                var title_val = _this.$title.val();
                // 去除空格
                var title_val = title_val.replace(/(^\s*)|(\s*$)/g, "");
                if(!title_val){
                    alert('输入不能为空');
                    return;
                }
                // 输入不可过长
                if(title_val.length >= 32){
                    alert('输入过长,请重新输入');
                    _this.$title.val('');
                    return;
                }
                // 不要重复添加
                var arrRepet = [];
                $('.wait span').each(function(index,dom){
                    arrRepet.push( $(dom).html());
                });
                if(arrRepet.indexOf(title_val) !== -1){
                    alert('请勿重复添加');
                    _this.$title.val();
                    return;
                }
                // 向代办添加内容添加事件
                var addDom = `
                    <p>
                        <input type="checkbox" name="sst"><span>${title_val}</span>
                        <b>删除</b>
                        <strong>编辑</strong>
                    </p>`;
                _this.$wait.append(addDom);
                _this.$title.val('');
                // 添加事件是检测是否全选
                if(_this.$all.prop('checked')){
                    $('input[name=sst]').prop('checked',true);
                }
            })

            // 点击复选框判断是否全选
            this.$wait.on('click','input',function(){
                $('.wait input').each(function(index,dom){
                    if(!$(dom).prop('checked')){
                        _this.$all.prop('checked',false);
                        return false;
                    }
                    _this.$all.prop('checked',true);
                })
            })

            // 点击编辑修改内容
            this.$wait.on('click','strong',function(){
                var span_val =  $(this).siblings('span').html();
                $(this).siblings('span').replaceWith('<input  type="text" class="sr">');
                $('.sr').val(span_val).focus();
                $('.sr').blur(function(){
                    $('.sr').replaceWith('<span>'+$('.sr').val()+'</span>');
                });
            })

            // 单个删除
            this.$wait.on('click','b',function(){
                $(this).parent().remove();

                // 删除后判断是否是全选状态
                $('.wait input').each(function(index,dom){
                    if(!$(dom).prop('checked')){
                        _this.$all.prop('checked',false);
                        return false;
                    }
                    _this.$all.prop('checked',true);
                });

                // 当没有值了取消全选
                if($('.wait input').length == 0){
                    _this.$all.prop('checked',false);
                }
            });

            // 全选和取消全选
            this.$all.click(function(){
                if(_this.$all.prop('checked')){
                    $('input[name=sst]').prop('checked',true);
                }else{
                    $('input[name=sst]').prop('checked',false);
                }
            });

            // 处理事件
            this.$all_ok.click(function(){
                $('input[name=sst]:checked').each(function(index,dom){
                    _this.$finish.append('<p>'+$(dom).siblings('span').html()+'</p>');
                    $(dom).parent().remove();
                    _this.$all.prop('checked',false);
                })
            })

            // 批量删除事件
            this.$all_del.click(function(){
                $('input[name=sst]:checked').each(function(index,dom){
                    $(dom).parent().remove();
                    _this.$all.prop('checked',false);
                })
            })

        }
    }

    toDolist.init();

});