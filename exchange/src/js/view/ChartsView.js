
const getDay = el=> {
    const months = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    let elDate = new Date(el)
    return months[elDate.getDay()]
}


const parseValue = obj => {
    const parsedValue = {};

    const time = getDay(obj.openTime);
    parsedValue.high = obj.high > 1 ? Math.round(obj.high) : obj.high;
    parsedValue.time = time;

    return parsedValue;
}

const returnColor = val => {
    let cAverage = 0;
    let totalC = 0
    val.forEach(el => {
        if(el.chartObjHigh < 1){
           let tobeparsed = parseFloat(el.chartObjHigh)
           let parsed = tobeparsed.toFixed(3);
            cAverage = cAverage + parseFloat(parsed);
            totalC++
        }else{
           cAverage += el.chartObjHigh;
           totalC++;
        }       
    })
      cAverage = cAverage/totalC;
    if(val[0].chartObjHigh > val[val.length -1].chartObjHigh){
        return 'rgba(255, 99, 132, 0.6)'
    }else{
        return 'rgba(30, 216, 24, 0.8)'
    }

}

export const loadChartsView = obj => {
   setTimeout(() => {
    obj.forEach(el => {
        let chartArr = [];
        let chartObj;
        let label4Chart;
        let data4Chart;
     for(const [key, value] of Object.entries(el)){
         if(key === 'queryCoin' || key === 'location'){
                continue;
            }
            else{         
             const objNew = parseValue(value);
             chartObj = {
                 chartObjHigh: objNew.high,
                 chartObjTime: objNew.time
             };
             chartArr.push(chartObj)
   //          console.log(objNew)
            }  
        }
       // console.log(chartArr);
        //console.log(returnColor(chartArr))
        label4Chart = chartArr.map(el=> el.chartObjTime)
        data4Chart = chartArr.map (el => el.chartObjHigh)
        //console.log(label4Chart)
       // console.log(data4Chart)
          const myChart = new Chart(el.location, {
               type: 'line',
               data: {
                   labels: [...label4Chart],               
                   datasets: [{
                       label: `Price of ${el.queryCoin}`,
                       data: [...data4Chart],
                       fill: true,
                       backgroundColor: returnColor(chartArr),
                       borderColor: [
                           returnColor(chartArr),
                       ],
                       borderWidth: 3
                   }]
               }
             });

    })
}, 5000)
}