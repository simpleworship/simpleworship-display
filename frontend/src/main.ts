import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css';
import './app.css';

import {GetServers} from '../wailsjs/go/main/App';
import * as runtime from '../wailsjs/runtime';
let activeServer = "";

window.toggleFullscreen = () => {
    runtime.WindowIsFullscreen().then((result) => {
        if (result) {
            runtime.WindowUnfullscreen()
        } else {
            runtime.WindowFullscreen()
        }
    })
}

window.openURL = (x: string, url: string, noReload: boolean = false) => {
    document.querySelector("#displayframe")!.setAttribute("src", url);
    document.querySelector("#display")!.classList.add("show");
    activeServer = x;
    if (!noReload) window.getServers();
}


// Setup the greet function
window.getServers = function () {
    try {
        GetServers()
        .then((result) => {
            console.log(result)
            console.log("activeServer",activeServer)
            document.querySelector("#serverlist")!.innerHTML = "";
            for (var x in result) {
                console.log("Result: " + x + " " + result[x])
                if (activeServer == "") {
                    window.openURL(x, result[x], true);
                }
                
                if (activeServer == x) {
                    document.querySelector("#serverlist")!.innerHTML += `
                        <li class="list-group-item active" aria-current="true" onClick="window.openURL('`+x+`','`+result[x]+`')">
                            > `+ x +`
                        </li>`;
                } else {
                    document.querySelector("#serverlist")!.innerHTML += `
                        <li class="list-group-item" onClick="window.openURL('`+x+`','`+result[x]+`')">
                        `+ x +`
                        </li>`;
                }
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


window.getServers();

declare global {
    interface Window {
        getServers: () => void;
        openURL: (x: string, url: string, noReload: boolean) => void;
        toggleFullscreen: () => void;
    }
}
