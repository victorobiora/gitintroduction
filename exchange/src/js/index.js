import Charts from '../js/model/Charts'
import Chart from 'chart.js'
import * as Chartview from './view/ChartsView'
import {select} from './view/base'
import SearchFeature from './model/Search'

const toggle = select.toggleButton;
const mobileNav = select.mobileNav;
const backdrop = select.backdrop;


const toggleMobile = () => {
    mobileNav.classList.toggle('open');
    backdrop.classList.toggle('open');
}


[toggle, backdrop].forEach(el => {
    el.addEventListener('click', toggleMobile);
});


const state = {};
state.coinObj = {};


const pageLoadCoins = async (...coins)=> {
  console.log(coins)
   let chartFinal = [];
   let coinChart;

    coinChart = await coins.map(async (el) => {
     const coinChartX = new Charts(el.query, el.location);
      try{
        await coinChartX.getCandle()
  //      console.log(coinChartX);
        return coinChartX
      }catch(err){
         console.log('There is an error here')
      }
    })
    coinChart.forEach(el=> {
     el.then(result => {
           chartFinal.push(result)
       })
    })
    
   // console.log(chartFinal)


  SearchFeature();
    window.state = state;
    window.state.coinChart = chartFinal;
   // console.log(state.coinChart)
    Chartview.loadChartsView(state.coinChart)
}

window.addEventListener('load', pageLoadCoins(select.btcusdt, select.ltcusdt, select.solusdt, select.ethbusd));


