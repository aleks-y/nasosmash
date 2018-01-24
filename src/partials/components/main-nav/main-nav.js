$('.js-nav-call').on('click', () => {
  $.confirm({
    theme: 'supervan',
    title: 'Заказ звонка',
      content:
        `<form class="call-order" enctype="multipart/call-data" action="call.php" method="POST" onsubmit="return false">
      <div class="call-group">
          <h3 class="text-uppercase">Контактные данные</h3>
          <div class="call-order__input-wrapper">
              <label for="call-order__label" class="call-order__label">Ваше имя</label>
              <input type="text" class="call-order__input" id="call-order__name" name="username" required>
          </div>
          <div class="call-order__input-wrapper">
              <label for="call-order__label" class="call-order__label">Ваш телефон</label>
              <input type="text" class="call-order__input" id="call-order__phone" name="userphone" required>
          </div>
          <div class="call-order__input-wrapper">
              <label for="call-order__label" class="call-order__label">Что вас интересует?</label>
              <textarea class="call-order__textarea" id="call-order__textarea" name="comment"></textarea>
          </div>
      </div>
    </form>`,
    backgroundDismiss: true,
    onContentReady() {
      jQuery(function($){
        $("#call-order__phone").mask("+7 (999) 999-9999");
      });
    },
    buttons: {
      confirm: {
        text: 'Отправить',
        action() {
          const form = $('call-order');
          const data = {
            username: $('#call-order__name').val(),
            phone: $('#call-order__phone').val(),
            comment: $('#call-order__textarea').val(),
          }

          if (!data.username || !data.phone) {
            $.confirm({
              title: 'Внимание!',
              type: 'orange',
              content: 'Поля Имя и Телефон обязательны для заполнения',
              buttons: {
                cancel: {
                  text: 'Ok',
                  action() {

                  }
                }
              }
            });
            return;
          }

          $.ajax({
            type: 'post',
            url: 'callback.php',
            data: data,
            success : function(mes){
              $.alert('Спасибо за заказ, наш менеджер свяжется с вами');
              form[0].reset();
            },
            error: function(err) {
              $.confirm({
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
        }
      },
      cancel: {
        text: 'Отмена',
        action() {
          this.close()
        }
      }
    }
  });
})
