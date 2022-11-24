import Template from '@templates/Template.js';   // este es el punto de entrada que va a leer webpack y va a optimizar.
import '@styles/main.css';
import '@styles/vars.styl';


(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
