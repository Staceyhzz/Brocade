/**
 * Created on 2017/5/2.
 * 该文件主要用于dom 公共方法
 */

/**
 * @param  {[$]} $form [需要获取数据的dom元素]
 * @return {[object]}  [返回表单数据]
 */
const serializeObject = function($form){
    var obj = {};
    $form.find('[name]').each(function(i, item){
        if($this.hasClass('ignore-serialize') || ($this.closest('.ignore-serialize').length > 0))
            return true;
        var $item = $(item);
        var value = $item.val();
        var name = this.name;        
        if(item.tagName == 'INPUT'){
            var inputType = $item.attr('type');
            if(inputType == 'radio'){//单选框
                 if($item.prop('checked')){
                    obj[name] = $item.data('value') || value;
                 }
            }else if(inputType == 'checkbox'){//复选框
                if($item.prop('checked')){
                    if(obj.hasOwnProperty(name)){
                        value = obj[name].push(value)
                    }else{
                        obj[name] = [value];
                    }
                }  
            }else{
                obj[name] = value;
             }
        }else{
            obj[name] = value;
        }      
    });

    return obj;
}

export default {
    serializeObject: serializeObject
}