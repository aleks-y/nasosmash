var sidePanel = {

    distributors: ['baikal', 'dl', 'pek'],
    current: '',
    next: '',
    shown: false,
    z: 100,

    changeMenu: function(viewName) {
        console.log(viewName);
        $('.side-item').fadeIn();
        $('*[data-toggle="' + viewName + '"]').fadeOut();
    },

    renderNext: function (nextElement) {
        nextElement.show();
        nextElement.css('zIndex', this.z++).toggleClass('slideInLeft');
        this.current = this.next;
        setTimeout(function() {
            nextElement.css('zIndex', sidePanel.z++).toggleClass('slideInLeft');
        }, 1000);
    },

    getNextName: function(el) {
        if (el.data('toggle')) return el.data('toggle');
        if (el.data('target')) return el.data('target');
    },

    hidePrevious: function() {
        var element = $('.slide-panel__item.'+this.current);
        element.removeClass('slideInLeft');
        element.toggleClass('slideOutRight');
        element.hide();
        element.toggleClass('slideOutRight');
    },

    handle: function(element) {
        if (!this.shown) {
            $('.slide-panel').css('display', 'block');
            this.shown = true;
        }
        var name = this.next = this.getNextName(element);
        if (!this.current) this.current = name;
        this.renderNext($('.slide-panel__item.' + this.next));
        this.changeMenu(name);
    }

};

function setSlidePanelHandlers() {
    console.log('setted');
    $('.side-item').on('click', function() {
       sidePanel.handle($(this));
    });
}

setSlidePanelHandlers();
