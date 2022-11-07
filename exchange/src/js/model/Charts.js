import Binance from 'binance-api-node';


const client = Binance();


 export default class Charts {
     constructor(query, location){
         this.queryCoin = query;
         this.location = location;
     }

     async getCandle(){
         try{
             const getCandle = await client.candles({ symbol: this.queryCoin,
                                                      interval: '1d',
                                                      limit: '5'});
         const [candle1, candle2, candle3, candle4, candle5] = getCandle;
         this.candle1 = candle1;
         this.candle2 = candle2;
         this.candle3 = candle3;
         this.candle4 = candle4;
         this.candle5 = candle5;
         }catch(erorr){
               console.log(`This is the error ${error}`)
         }
     }
 }

