$(window).on('load', function() {
  if (window.location.pathname !== '/') {
    // based on prepared DOM, initialize echarts instance
    const myChart = echarts.init(document.getElementById('charts'));

    const commonOpts = {
      data: [
        {feed: 15, pressure: 65, power: [5, 7.5], weight: 350, name:'НК-16/70'},
        {feed: 15, pressure: 125, power: [5, 11], weight: 380, name:'НК-16/125'},
        {feed: [32, 62], pressure: 70, power: [5.5, 22], weight: 350, name:'НК-65/35-70'},
        {feed: [32, 62], pressure: 125, power: [7.5, 55], weight: 380, name:'НК-65/35-125'},
        {feed: [32, 62], pressure: 240, power: [11, 110], weight: 608, name:'НК-65/35-240'},
        {feed: 205, pressure: 80, power: [22, 110], weight: 390, name:'НК-210/80'},
        {feed: 205, pressure: 200, power: [37, 200], weight: 450, name:'НК-210/200'},
        {feed: [120, 200], pressure: 120, power: [7.5, 110], weight: 385, name:'НК-200/120-120'},
        {feed: [120, 200 ], pressure: 370, power: [40, 400], weight: 890, name:'НК-200/120-370'},
        {feed: [335, 560], pressure: 180, power: [90, 400], weight: 680, name:'НК-560/335-180'},
        {feed: 560, pressure: 180, power: [250, 400], weight: 680, name:'НК-560/180 А'},
        {feed: 350, pressure: 320, power: [250, 400], weight: 1495, name:'НКВ-360/320'},
        {feed: 360, pressure: 125, power: [125, 250], weight: 980, name:'НКВ-360/125'},
        {feed: 360, pressure: 80, power: [110, 175], weight: 870, name:'НКВ-360/80'},
        {feed: 600, pressure: 320, power: [250, 800], weight: 1780, name:'НКВ-600/320'},
        {feed: 600, pressure: 200, power: 400, weight: 1480, name:'НКВ-600/200'},
        {feed: 600, pressure: 125, power: 315, weight: 1280, name:'НКВ-600/125'}
      ],
      legend: {
        x : 'center',
        y : 'bottom',
        data: [
          'НК-16/70',
          'НК-16/125',
          'НК-65/35-70',
          'НК-65/35-125',
          'НК-65/35-240',
          'НК-210/80',
          'НК-210/200',
          'НК-200/120-120',
          'НК-200/120-370',
          'НК-560/335-180',
          'НК-560/180 А',
          'НКВ-360/320',
          'НКВ-360/125',
          'НКВ-360/80',
          'НКВ-600/320',
          'НКВ-600/200',
          'НКВ-600/125',
        ]
      }
    }


    let state = {
      range: 'min',
      prop: 'feed',
      type: 'round'
    }

    const dictionary = {
      power: 'мощность',
      pressure: 'напор',
      feed: 'подача',
      weight: 'масса'
    };

// specify chart configuration item and data
    const gistOption = {
      title: {
        text: 'Столбиковое сравнение',
        subtext: 'по мощности',
        x:'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        data: commonOpts.data.map(item => item.name)
      },
      yAxis: {},
      series: [{
        name: 'мощность',
        type: 'bar',
        data: commonOpts.data.map(item => item.power)
      }],
      color: ['#43789f']
    };

    const roundOption = {
      title : {
        text: 'Круговое сравнение',
        subtext: 'по мощности',
        x:'center'
      },
      yAxis: null,
      xAxis: null,
      legend: commonOpts.legend,
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}"
      },
      calculable : true,
      series : [
        {
          name:'power',
          type:'pie',
          radius : [70, 200],
          center : ['50%', '50%'],
          roseType : 'area',
          data: commonOpts.data.map(item => {
            const value = typeof item[state.prop] === 'object' ? item[state.prop][getProp()] : item[state.prop];
            return { value, name: item.name };
            function getProp() {
              return state.range === 'max' ? 1 : 0;
            }
          })
        }
      ]
    };

// use configuration item and data specified to show chart
    myChart.setOption(roundOption);

    $(".chart-controls__type-toggle").on("click", function(e) {
      const target = $(e.target);
      target.siblings().removeClass("active");
      target.addClass('active');
      state.type = target.attr("action");
      render();
    })

    $(".chart-controls__prop-toggle").on("click", function(e) {
      const target = $(e.target);
      target.siblings().removeClass("active");
      target.addClass('active');
      state.prop = target.attr("action");
      render();
    })

    $(".chart-controls__range-toggle").on("click", function(e) {
      const target = $(e.target);
      target.siblings().removeClass("active");
      target.addClass('active');
      state.range = target.attr("action");
      render()
    })

    function render() {
      let opts;
      switch (state.type) {
        case "round":
          myChart.clear();
          opts = roundOption
          opts.title.subtext = opts.series[0].name = dictionary[state.prop];
          opts.series[0].data = commonOpts.data.map(item => {
            const value = typeof item[state.prop] === 'object' ? item[state.prop][getProp()] : item[state.prop];
            console.log( { value, name: item.name })
            return { value, name: item.name };

            function getProp() {
              return state.range === 'max' ? 1 : 0;
            }
          })
          myChart.setOption(opts);
          break;
        case "gist":
          opts = gistOption;
          opts.title.subtext = opts.series[0].name = dictionary[state.prop];
          opts.series[0].data = commonOpts.data.map(item => {
            const value = typeof item[state.prop] === 'object' ? item[state.prop][getProp()] : item[state.prop];
            console.log(value);
            return value;
            function getProp() {
              return state.range === 'max' ? 1 : 0;
            }
          })
          myChart.clear();
          myChart.setOption(opts);
          break;
      }
    }
  }
});
