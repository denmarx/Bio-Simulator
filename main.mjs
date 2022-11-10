//@ts-check
import { Water } from "./src/Water.mjs";



function main() {
  console.log("wasgeht");
  let water = new Water(7, 20);
  water.setPh(10);
  //myGame = new component(30,30, "red", 10, 120)t
  var canv = document.createElement("canvas")
  document.body.appendChild(canv); 
  canv.setAttribute("id", "canvasID")

}

main();