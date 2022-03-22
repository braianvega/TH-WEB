import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";
import {
  getDatabase,
  get,
  ref,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXK797DLTyjXyBH9ko4htn2hqe8hH4e98",
  authDomain: "comunicaion-de-datos.firebaseapp.com",
  databaseURL: "https://comunicaion-de-datos-default-rtdb.firebaseio.com",
  projectId: "comunicaion-de-datos",
  storageBucket: "comunicaion-de-datos.appspot.com",
  messagingSenderId: "737635686987",
  appId: "1:737635686987:web:77107f2093b8e123d8cbce",
  measurementId: "G-1N5FPKSRLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();
// REFERENCIAS
//SELECCIONO LA INFORMACIÓN
let Temp = 0;
let Hum = 0;
const DATA_COUNT = 7;

let Grafico = document.getElementById("GRAFICO").getContext("2d");

const char = new Chart(Grafico, {


    type: "line",
    data: {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      datasets: [
        {
          label: "TEMPERATURA",
          backgroundColor: "green",
          data: Temp
        },

        {
          label: "HUMEDAD",
          backgroundColor: "green",
          data: Hum,
        },
      ],
    },
  });

function SelectData() {

  const dbref = ref(db);

  get(child(dbref, "-DATOS/-MyiC6ztOwp7F07n8fwV/")).then((snapshot) => {

      if (snapshot.exists()) {

        Hum = parseInt(snapshot.val().Humedad);
        Temp = parseInt(snapshot.val().Temperatura);
        Graficadora(Temp, Hum);
        console.log(Temp);
        console.log(Hum);

      } else {

        alert("NO DATA FOUND");

      }

    })
    .catch((error) => {

      alert("UNSUCCESFUL, ERROR" + error);

    });
}
function timedRefresh(timeoutPeriod) {
  setTimeout("location.reload(true);", timeoutPeriod);
}

function Graficadora(Temp, Hum) {

    const data = char.data;
    if(data.datasets.length>0){
        for(let index=0; index<data.datasets.length;index++){
          
            if(index==0){

                data.datasets[index].data.push(Temp);
            }else{
                data.datasets[index].data.push(Hum);
                if(data.datasets[index].data.length>10){
                  data.labels=data.labels.concat(data.labels[data.labels.length-1]+1)
                }
            }
        }
        char.update();
    }
  
}


let i=0;

let identificadorIntervaloDeTiempo;

function repetirCadaSegundo() {
  
  identificadorIntervaloDeTiempo = setInterval(SelectData, 5000);
  i++;
}

function mandarMensaje() {
  console.log("Ha pasado 1 segundo.");
}

repetirCadaSegundo();
//setTimeout(SelectData(),1000);
//window.onload = timedRefresh(5000);
