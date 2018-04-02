const dataset = {
  nk: {
    "12/40": [
      ["Вал", "Марка стали 40Х", "НК 12/40"],
      ["Вал", "Марка стали 20X13", "НК 12/40"],
      ["Вал", "Марка стали 45Х14Н14В2М", "НК 12/40"],
      ["Колесо рабочее", "Марка стали 25Л", "НК 12/40"]
    ],
    "65/35-70": [
      ["Вал", "Марка стали 40Х", "НК65/35-70 НК65/35-125 НК65/125 НК200/120-70 НК200/120-120 НК210/80"],
      ["Вал", "Марка стали 20Х13", "НК65/35-70 НК65/35-125 НК65/125 НК200/120-70 НК200/120-120 НК210/80"]
    ]
  },
  nkv: {
    "210/200": [
      ["Вал", "Марка стали 40Х", "НКВ 210/200"],
      ["Вал", "Марка стали 20Х13", "НКВ 210/200"]
    ],
    "360/80": [
      ["Вал (по 01.09.1993 г.)", "Марка стали 40Х", "НКВ 360/80"],
      ["Вал (по 01.09.1993 г.)", "Марка стали 20Х13", "НКВ 360/80"]
    ]
  }
};
const dict = {
  nk: "НК",
  nkv: "НКВ"
};

let state = {
  currentPump: '',
  currentModel: ''
};

$(document).ready(function() {
  for (let key in dataset) {
    const html = `<button data-target="${key}" class="pump-type">${dict[key]}</button>`;
    debugger;
    $('.repair-table-toggle-wrapper').append(html);
    $('.pump-type').on('click', function(e) {
      e.preventDefault();
      const target = state.currentPump = $(this).data('target');
      _renderList(target);
    })
  }

  function _renderList(target) {
    const wrapper = $('.repair-table-list-wrapper');
    wrapper.html('');
    const list = $('<ul class="pump-model-list"></ul>');
    for (let key in dataset[target]) {
      list.append(`<li data-target="${key}" class="pump-model-item">${key}</li>`)
    }
    wrapper.append(list);
    $('.pump-model-item').on('click', function(e){
      e.preventDefault();
      const model = state.currentModel = $(this).data('target');
      _renderTable(model);
    })
  }

  function _renderTable(target) {
    const wrapper = $('.repair-table-wrapper');
    wrapper.html('');
    wrapper.append('<table id="example" class="stripe display"></table>');
    const data = dataset[state.currentPump][state.currentModel];
    $('#example').DataTable( {
      data: data,
      columns: [
        { title: "Наименование" },
        { title: "Материал" },
        { title: "Насос" },
      ],
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Russian.json"
      },
      "pagingType": "numbers"
    } );
  }
} );
