var fileInputs = $('.form-order__input');
var form = $('.form-order');
var submitBtn = $('.form-order__submit');
var fileInput = $('.form-order__file');
var fileLabel = $('.form-order__label-file span');
var textarea = $('.form-order__textarea');

submitBtn.on('click', function(e) {
    e.preventDefault();
    form.trigger('submit');
    form[0].reset();
});

fileInput.on('change', function(e) {

    if (!$(this)[0].files[0]) {
        filename ? fileLabel.text(filename):  fileLabel.text('Прикрепить проект');
    } else {
        filename = $(this)[0].files[0].name;
        console.log('filename ', filename);
        fileLabel.text(filename);
    }
});


//Проверка, если вдруг после возвращения поля оказались заполнены до фокуса в них
if (fileInputs.val()) {
    fileInputs.siblings('label').addClass('form-order__label--focused');
}

fileInputs.on('focus', function (e) {
    $(this).siblings('label').addClass('form-order__label--focused');
});

fileInputs.on('blur', function (e) {
    if (!$(this).val()) {
        $(this).siblings('label').removeClass('form-order__label--focused');
    }
});

if (textarea.val()) {
    fileInputs.siblings('label').addClass('form-order__label--focused');
}

textarea.on('focus', function (e) {
    $(this).siblings('label').addClass('form-order__label--focused');
});

$('#callback_form').click(function (){
    if($('#form-order__name').val() == ""){
        swal('Ошибка!','Укажите ваше имя!','error');
        return;
    }
    if($('#form-order__phone').val() == ""){
        swal('Ошибка!','Укажите Ваш номер телефона!','error');
        return;
    }
    $.ajax({
        type: 'post',
        url:'post_callback.php',
        data:{
            name: $('#form-order__name').val(),
            phone: $('#form-order__phone').val(),
            textarea: $('#form-order__textarea').val(),
        },
        success : function(mes){
            swal('Отлично!','Наш менеджер Вам перезвонит!','success');
            $('#form-order__name').val("");
            $('#form-order__phone').val("");
            $('#form-order__textarea').val("");
        }
    });
});

textarea.on('blur', function (e) {
    if (!$(this).val()) {
        $(this).siblings('label').removeClass('form-order__label--focused');
    }
});


