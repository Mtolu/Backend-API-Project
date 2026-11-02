import {writeFile } from "node:fs/promises"
//import  {data} from "../data/data.js"

const filePath = new URL("../data/data.js", import.meta.url);

//const data = { users, projects, tasks };
//async function data( users, projects, tasks){
//   const rData = await readFile(filePath, "utf8");
//    return JSON.parse(rData);
//}

//async function readData(){
//return data    
//}



export async function saveAllData(users, projects, tasks) {
    const saveData = `export const users = ${JSON.stringify(users, null, 2)};
    export const projects = ${JSON.stringify(projects, null, 2)};
    export const tasks =  ${JSON.stringify(tasks, null, 2)};
    `;
    await writeFile(filePath, saveData, "utf8");
}



//export async function readAllData() {
//    return await readData();    
//}