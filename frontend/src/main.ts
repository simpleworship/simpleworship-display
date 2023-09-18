import './style.css';
import './app.css';


import {GetServers} from '../wailsjs/go/main/App';

// Setup the greet function
window.getServers = function () {
    try {
        GetServers()
            .then((result) => {
                // Update result with data back from App.Greet()

               console.log(result);
               for (var x in result) {
                document.getElementById("servers")!.innerHTML += "<li><a href=\""+result[x]+"\">" + x + "</a></li>";
               }

                //resultElement!.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};

document.getElementById("app")!.innerHTML = `<button onclick="getServers()">reload</button><ul id="servers"></ul>`;

window.getServers();

declare global {
    interface Window {
        getServers: () => void;
    }
}
