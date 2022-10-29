

const API ='https://youtube-v31.p.rapidapi.com/search?channelId=UCI6QcXatdaEAaRTRjl3dc0w&part=snippet%2Cid&order=date&maxResults=10';

console.log('funciona!!');

const content = null || document.querySelector('#content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2ccb2343cemshf873a3160f58ce4p16a2d1jsna0b2fd40b03e',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchdata(urlApi){  // con este funcion consumimos la API
    const response = await fetch(urlApi,options);  // hacemos la solicitud a la API
    const data = await response.json();// transformamos los datos devueltos en json
    return data; // returnamos los datos 
}

(async ()=>{
	try {
		const videos = await fetchdata(API);
		let view = `
			${videos.items.map(video => `
				<div class="group relative">
					<div
						class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
						<img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
					</div>
					<div class="mt-4 flex justify-between">
						<h3 class="text-sm text-white">
							<span aria-hidden="true" class="absolute inset-0"></span>
							${video.snippet.title}
						</h3>
					</div>
				</div>			
			`).slice(0,8).join('')}

		`;

		content.innerHTML = view;
	} catch (error) {
		console.log(error);
	}
})(); // una funcion que se invoca a si misma , esta funcion asi misma se llama.





var str = 'Aná ana';

var polindromo= [].map.call(str, function(x) {
  return x.toLowerCase();
}).reverse().join('');

console.log(polindromo === str.toLowerCase());

function palindrome(str) {
	var re = /[\W_]/g;
	var lowRegStr = str.toLowerCase().replace(re, '');
	var reverseStr = lowRegStr.split('').reverse().join(''); 
	return reverseStr === lowRegStr;
  }


console.log(palindrome("A man, a plan, a canal. Panama"));