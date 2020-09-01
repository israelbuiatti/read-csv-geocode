
import 'reflect-metadata';
import { Location, Geocoder, GoogleMapsProvider, Suggestion } from '@goparrot/geocoder';
import Axios, { AxiosInstance } from 'axios';

 
// const axios: AxiosInstance = Axios.create();
 
// const provider: GoogleMapsProvider = new GoogleMapsProvider(axios, 'AIzaSyBTzlFiEmVQNuddLJ6G_c-phmDZdgj_PUU');
 
// const geocoder: Geocoder = new Geocoder(provider);



// (async () => {

//   const locations: Location[] = await geocoder.reverse({
//     lat: -3.705197,
//     lon: -40.331809
//   });

//   console.info('locations', locations);

// })();



// const fs = require('fs').promises;

// const neatCsv = require('neat-csv');

const openGeocoder = require('node-open-geocoder');


// async function listarArquivosDoDiretorio(diretorio, arquivos) {

//   if(!arquivos)
//       arquivos = [];

//   let listaDeArquivos = await fs.readdir(diretorio);
//   for(let k in listaDeArquivos) {
//       let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
//       if(stat.isDirectory())
//           await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
//       else
//           arquivos.push(diretorio + '/' + listaDeArquivos[k]);
//   }

//   return arquivos;

// }


// const lerArquivo = async (arquivo) => {
// 	console.log('1...', arquivo);
// 	fs.readFile(arquivo, async (err, data) => {
// 		console.log('2...');
// 	if (err) {
// 		console.log('3...');
// 		console.error(err)
// 		return
// 	}
// 	console.log('4...');
// 	console.log(await neatCsv(data))
// 	})
// }

// async function test() {
// 	let arquivos = await listarArquivosDoDiretorio('C:/Users/israe/Desktop/CSV Rastreamento'); // coloque o caminho do seu diretorio
// 	// console.log(arquivos);
// 	// return arquivos;

// 	await lerArquivo(arquivos[0]);
  
// }

// test();






// const neatCsv = require('neat-csv');

// const fs = require('fs')

// fs.readFile('C:\\Users\\israe\\Desktop\\csv\\2017-06-21_595fe21b280490616d61ae4a.csv', async (err, data) => {
//   if (err) {
// 	  console.log('entrou 1');
//     console.error(err)
//     return
//   }
//   console.log('entrou 2');
//   console.log(await neatCsv(data))
// })




const file = 'C:\\Users\\israe\\Desktop\\csv\\2017-07-13_595fe21b280490616d61ae4a.csv';
// const file = 'C:\\Users\\israe\\Desktop\\csv\\2017-06-21_595fe21b280490616d61ae4a.csv';


// const fs = require('fs')
// var parse = require('csv-parse')



// fs.readFile(file, function (err, fileData) {
// parse(fileData, {columns: false, trim: true}, function(err, rows) {
// 		// Your CSV data is in an array of arrys passed to this callback as rows.

// 		  if (err) {
// 			  	console.log('entrou 1');
// 				console.error(err)
// 				return
// 		  }

// 		console.log(rows);

// 	})
// })





let cont = 1;

const fs = require('fs')
const csv = require('csv-stream')
const through2 = require('through2')

const stream = fs.createReadStream(file)
  .pipe(csv.createStream({
      endLine : '\n',
	  //columns : ['Year', 'Make', 'Model'],
	  columns : ['obj'],
      escapeChar : '"',
      enclosedChar : '"'
  }))
  .pipe(through2({ objectMode: true }, (row, enc, cb) => {
    // - `row` holds the first row of the CSV,
    //   as: `{ Year: '1997', Make: 'Ford', Model: 'E350' }`
    // - The stream won't process the *next* item unless you call the callback
    //  `cb` on it.
    // - This allows us to save the row in our database/microservice and when
	//   we're done, we call `cb()` to move on to the *next* row.

	// console.log(row);

	if (cont == 3) return;

    saveIntoDatabase(row).then(() => {
      cb(null, true)
    })
    .catch(err => {
      cb(err, null)
	})

  }))
  .on('data', data => {
    console.log('saved a row')
  })
  .on('end', () => {
    console.log('end')
  })
  .on('error', err => {
    console.error(err)
  })


  
let lat;
let lng;

const saveIntoDatabase = row => {
	return new Promise((resolve, reject) => { 
			// setTimeout(() => resolve())

			if (cont!=1) {

          
        const arr = row.obj.split(';');

        const latlngArr = arr[8].split(',');

        lat = latlngArr[0];
        lng = latlngArr[1];

        console.log('zzzz', latlngArr);
        console.log('aaaa', lng, lat);

        
        console.log(cont, lng, lat);

        openGeocoder()
				.reverse(lng, lat)
				//.reverse(-40.331809, -3.705197)
				.end((err, res) => console.log('result', res))
				
        
      }
      cont++;
        
      resolve()
   
      
		}
	)
}
 
