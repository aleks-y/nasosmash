var fileInputs = $('.form-order__input');
var form = $('.form-order');
var submitBtn = $('.form-order__submit');
var fileInput = $('.form-order__file');
var fileLabel = $('.form-order__label-file span');
var textarea = $('.form-order__textarea');
var filename = '';

submitBtn.on('click', function(e) {
    e.preventDefault();
    form.trigger('submit');
    form[0].reset();
    fileLabel.text('Прикрепить проект');
});

fileInput.on('change', function(e) {

    if (!$(this)[0].files[0]) {
        filename ? fileLabel.text(filename):  fileLabel.text('Прикрепить проект');
    } else {
        console.log('filename ', filename);
        filename = $(this)[0].files[0].name;
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
    if($('#form-order__phone').val() === "" || ($('#form-order__name').val() === "")) {
        $.confirm({
          animation: 'scale',
          closeAnimation: 'scale',
          title: 'Внимание!',
          content: 'Поля Имя и Номер телефона обязательны для заполнения',
          type: 'orange',
          buttons: {
            cancel: {
              text: 'Закрыть',
              action() {}
            }
          }
        });
        return;
    }
    let fd = new FormData();
    fd.append('name', $('#form-order__name').val());
    fd.append('phone', $('#form-order__phone').val());
    fd.append('comment', $('#form-order__textarea').val());
    fd.append('file', $('.form-order__file')[0].files[0]);
    $.ajax({
        type: 'post',
        url:'post_callback.php',
        processData: false,
        contentType: false,
        data: fd,
        success : function(mes){
            $.confirm({
              animation: 'scale',
              closeAnimation: 'scale',
              title: 'Успешно!',
              content: 'Ваши данные получены. Наш менеджер вам перезвонит',
              type: 'green',
              buttons: {
                cancel: {
                  text: 'Закрыть',
                  action() {}
                }
              }
            });
            $('#form-order__name').val("");
            $('#form-order__phone').val("");
            $('#form-order__textarea').val("");
        },
        error: function(err) {
          $.confirm({
            animation: 'scale',
            closeAnimation: 'scale',
            title: 'Произошла ошибка',
            type: 'red',
            content: 'Произошла ошибка, попробуйте повторить запрос позднее',
            buttons: {
              cancel: {
                text: 'Ok',
                action() {}
              }
            }
          });
        }
    });
});

textarea.on('blur', function (e) {
    if (!$(this).val()) {
        $(this).siblings('label').removeClass('form-order__label--focused');
    }
});
