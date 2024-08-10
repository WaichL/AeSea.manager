let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
let secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim();
let fontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-family').trim();

window.Apex = {
  chart: {
    foreColor: primaryColor,
    toolbar: {
      show: false
    },
  },
  colors: ['#FCCF31', '#17ead9', '#f02fc2'],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: "#40475D",
  },
  xaxis: {
    axisTicks: {
      color: '#333'
    },
    axisBorder: {
      color: "#333"
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      gradientToColors: ['#F55555', '#6078ea', '#6094ea']
    },
  },
  tooltip: {
    theme: 'dark',
    x: {
      formatter: function (val) {
        return moment(new Date(val)).format("HH:mm:ss")
      }
    }
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      offsetX: -10
    }
  }
};

var iteration = 11;
var lastMin = [0,0,0]
var dataInPre = []
var dataOutPre = []
var dataEff = []
var xaxisPre = [];
var TICKINTERVAL = 300000
let XAXISRANGE = 2700000
var currentTime = new Date().getTime()+(8 * 60 * 60 * 1000);
var currentHour = new Date().setMinutes(0, 0, 0)+(8 * 60 * 60 * 1000)

function getHourWiseTimeSeries(baseval, count, yrange, data, graphNum) {
  var i = 0;
  while (i < count) {
    var x = baseval;
    var y = Math.floor(Math.random() * ((yrange.max - yrange.min) + 1)) + yrange.min;

    data.push({
      x, y
    });
    lastMin[graphNum] = baseval
    baseval += 3600000;
    i++;
  }
}

getHourWiseTimeSeries(currentHour - (1000*60*60*9), 10, {
  min: 80,
  max: 90
}, dataEff, 2)

///////////////////////////->

function getDayWiseTimeSeries(baseval, count, yrange, data, graphNum) {
  var i = 0;
  while (i < count) {
    var x = baseval;
    var y = Math.floor(Math.random() * ((yrange.max - yrange.min) + 1)) + yrange.min;

    data.push({
      x, y
    });
    lastMin[graphNum] = baseval
    baseval += TICKINTERVAL;
    i++;
  }
}



getDayWiseTimeSeries(currentTime - (1000*60*45), 10, {
  min: 247350,
  max: 247370
}, dataOutPre, 0)

getDayWiseTimeSeries(currentTime - (1000*60*45), 10, {
  min: 248375,
  max: 248395
}, dataInPre, 1)


function getNewSeries(baseval, yrange, data, graphNum) {
  var newMin = baseval[graphNum] + TICKINTERVAL;
  lastMin[graphNum] = newMin

  for(var i = 0; i< data.length - 10; i++) {
    // IMPORTANT
    // we reset the x and y of the data which is out of drawing area
    // to prevent memory leaks
    data[i].x = newMin - XAXISRANGE - TICKINTERVAL
    data[i].y = 0
  }

  data.push({
    x: newMin,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  })
}

function resetData(){
  // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
  data = data.slice(data.length - 10, data.length);
}



////////////////////////////////<-
function getNewData(baseval, yrange) {
  var newTime = baseval + 300000;
  return {
    x: newTime,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  }
}

function generateRandomNumbers(floor, ceiling) {
  let randomNumbers = [];
  for (let i = 0; i < 6; i++) {
    randomNumbers.push(Math.floor(Math.random() * (ceiling - floor + 1)) + floor);
  }
  console.log(randomNumbers);
  return randomNumbers;
}

function generateRandomNumber(floor, ceiling) {
  let random = Math.random() * (ceiling - floor) + floor;
  return parseFloat(random.toFixed(2));
}

// Function to update HTML elements with random numbers
function updateHTMLWithRandomNumbers(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    document.getElementById(`random-number-${i + 1}`).innerText = numbers[i];
  }
}

function updateHTMLWithId(number,id) {
  document.getElementById(id).innerText = number;
}


  
  var optionsPressureOut = {
    chart: {
      height: 200,
      type: 'line',
      stacked: true,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    series: [{
      name: 'FluOutPre',
      data: dataOutPre.slice()
      }],
    xaxis: {
      type: 'datetime',
      range: XAXISRANGE,
    },
    yaxis: {
      min: 247300,
      max: 247400
    },
    
    annotations: {
      yaxis: [
        {
          y: 247390,
          borderColor: '#FF0000',
          label: {
            borderColor: '#FF0000',
            style: {
              color: '#fff',
              background: '#FF0000'
            },
            text: 'Receive Alert Above 247390'
          }
        },    {
          y: 247310,
          borderColor: '#0000FF',
          label: {
            borderColor: '#0000FF',
            style: {
              color: '#fff',
              background: '#0000FF'
            },
            text: 'Receive Alert Below 247310'
          }
        }
      ]
    },
    title: {
      text: 'FluOutPre',
      align: 'left',
      style: {
        fontSize: '12px'
      }
    },
    subtitle: {
      text: 'Pa',
      floating: true,
      align: 'right',
      offsetY: 0,
      style: {
        fontSize: '22px'
      }
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false
      },
      position: 'top',
      offsetY: -28,
      offsetX: 60
    },
  }
  
  var chartPressureOut = new ApexCharts(
    document.querySelector("#chart-pressure-out"),
    optionsPressureOut
  );
  chartPressureOut.render()

  var optionsPressureIn = {
    chart: {
      height: 200,
      type: 'line',
      stacked: true,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    series: [{
      name: 'FluInPre',
      data: dataInPre.slice() 
      }],
    xaxis: {
      type: 'datetime',
      range: XAXISRANGE,
    },
    yaxis: {
      min: 248340,
      max: 248440
    },
    annotations: {
      yaxis: [
        {
          y: 248420,
          borderColor: '#FF0000',
          label: {
            borderColor: '#FF0000',
            style: {
              color: '#fff',
              background: '#FF0000'
            },
            text: 'Receive Alert Above 248420'
          }
        },    {
          y: 248350,
          borderColor: '#0000FF',
          label: {
            borderColor: '#0000FF',
            style: {
              color: '#fff',
              background: '#0000FF'
            },
            text: 'Receive Alert Below 248350'
          }
        }
      ]
    },
    title: {
      text: 'FluInPre',
      align: 'left',
      style: {
        fontSize: '12px'
      }
    },
    subtitle: {
      text: 'Pa',
      floating: true,
      align: 'right',
      offsetY: 0,
      style: {
        fontSize: '22px'
      }
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false
      },
      position: 'top',
      offsetY: -28,
      offsetX: 60
    },
  }
  
  var chartPressureIn = new ApexCharts(
    document.querySelector("#chart-pressure-in"),
    optionsPressureIn
  );
  chartPressureIn.render()


  var optionsEfficiency = {
    chart: {
      height: 250,
      type: 'line',
      stacked: true,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      dropShadow: {
        enabled: false,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    series: [{
      name: 'Efficiency',
      data: dataEff.slice()
      }],
    // }, {
    //   name: 'Waiting',
    //   data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
    //     min: 30,
    //     max: 110
    //   })
    yaxis:{
      min: 70,
      max: 100
    },
    xaxis: {
      type: 'datetime',
      range: 32400000
    },
    annotations: {
      yaxis: [
        {
          y: 75,
          borderColor: '#00FF00',
          label: {
            borderColor: '#00FF00',
            style: {
              color: '#000',
              background: '#00FF00'
            },
            text: 'Ideal Efficiency >75%'
          }
        }
      ]
    },
    title: {
      text: 'Efficiency',
      align: 'left',
      style: {
        fontSize: '12px'
      }
    },
    subtitle: {
      text: '%',
      floating: true,
      align: 'right',
      offsetY: 0,
      style: {
        fontSize: '22px'
      }
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false
      },
      position: 'top',
      offsetY: -28,
      offsetX: 60
    },
  }
  
  var chartEfficiency = new ApexCharts(
    document.querySelector("#chart-efficiency"),
    optionsEfficiency
  );
  chartEfficiency.render()


  window.setInterval(function () {

    iteration++;
    getNewSeries(lastMin, {
      min: 247350,
      max: 247370
    }, dataOutPre, 0)
    getNewSeries(lastMin, {
      min: 248375,
      max: 248395
    }, dataInPre, 1)
    chartPressureOut.updateSeries([{
      data: dataOutPre
    }]);
    chartPressureIn.updateSeries([{
      data: dataInPre
    }]);
  //   if (iteration % 5 == 0) {
  //   chartEfficiency.updateSeries([{
  //     data: [...chartEfficiency.w.config.series[0].data,
  //       [
  //         chartEfficiency.w.globals.maxX + 300000,
  //         getRandom()
  //       ]
  //     ]
  //   }, {
  //     data: [...chartEfficiency.w.config.series[1].data,
  //       [
  //         chartEfficiency.w.globals.maxX + 300000,
  //         getRandom()
  //       ]
  //     ]
  //   }])
  // }
  
    let RefInTemp = generateRandomNumber(42.9,43.1);
    updateHTMLWithId(RefInTemp,"RefInTemp");
    let RefOutTemp = generateRandomNumber(6.9,7.1);
    updateHTMLWithId(RefOutTemp,"RefOutTemp");
    let FluOutTemp = generateRandomNumber(28.9,29.1);
    updateHTMLWithId(FluOutTemp,"FluOutTemp");
    let FluInTemp = generateRandomNumber(22.9,23.1);
    updateHTMLWithId(FluInTemp,"FluInTemp");
    let FluOutPre = generateRandomNumber(247350,247370);
    updateHTMLWithId(dataOutPre[dataOutPre.length - 1].y,"FluOutPre");
    let FluInPre = generateRandomNumber(248395,248375);
    updateHTMLWithId(dataInPre[dataInPre.length - 1].y,"FluInPre");    
    // let randomNumbers = generateRandomNumbers(10, 100);
    // updateHTMLWithRandomNumbers(randomNumbers);
    console.log(dataOutPre[dataOutPre.length - 1].y);
    console.log(dataInPre[dataInPre.length - 1].y);
  }, 3000);
  