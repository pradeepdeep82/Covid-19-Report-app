
const select=document.querySelector('#country');

async function countryName(){
  try{
  
  const data=await fetch(`https://covid-19.dataflowkit.com/v1`);
  const report=await data.json();
  const countryNameArr=[];
  for(i=0;i<report.length-1;i++){
    countryNameArr.push(report[i].Country_text);
    const option=document.createElement('option');
    option.setAttribute('value', `${report[i].Country_text}`);
    option.innerHTML=`
    ${report[i].Country_text}`;
    select.append(option);
  }
  
    
  console.log(countryNameArr);
  
  }catch(err){
    console.log("Error country name");
  }
};
countryName();
// document.onload(countryName);

const div=document.createElement('div');
  div.setAttribute('class', 'card');

async function findStatus(){
  try{
  const country=document.querySelector('#country').value;
  const data=await fetch(`https://covid-19.dataflowkit.com/v1/${country}`);
  const report=await data.json();
  //console.log(report);
  const newCases=report["New Cases_text"];
  const newDeaths= report["New Deaths_text"];
  const activeCases= report["Active Cases_text"];

  function notUpdatedNewCases(){
    if(newCases==""){
      return "not updated";
    }else{
      return newCases;
    }
  }
  function notUpdatedNewDeats(){
    if(newDeaths==""){
      return "not updated";
    }else{
      return newDeaths;
    }
  }
  function notUpdatedActiveCases(){
    if(activeCases==""){
      return "not updated";
    }else{
      return activeCases;
    }
  }
  div.innerHTML="";
  div.innerHTML=`
  <div>
    <div class="header">
      <h1>${report.Country_text}</h1>
    </div>
    <div>
      <div class="covidList">
        <h3>Total Cases</h3>
        <h3>${report["Total Cases_text"]}</h3>
      </div>
      <div class="covidList">
        <h3>New Cases</h3>
        <h3 class="red">${notUpdatedNewCases()}</h3>
      </div>
      <div class="covidList">
        <h3>Total Deaths</h3>
        <h3>${report["Total Deaths_text"]}</h3>
      </div>
      <div class="covidList">
        <h3>New Deaths</h3>
        <h3 class="red">${notUpdatedNewDeats()}</h3>
      </div>
      <div class="covidList">
        <h3>Recovered</h3>
        <h3 class="green">${report["Total Recovered_text"]}</h3>
      </div>
      <div class="covidList lastList">
        <h3>Active Cases</h3>
        <h3>${notUpdatedActiveCases()}</h3>
      </div>
    </div>
    <div class="footer">
      <h3>Last Updated: <u>${report["Last Update"]}</u></h3>
    </div>
  </div>`;

  }
  catch(err){
    console.log("Error");
    div.innerHTML=`
    Sorry... some error have occured`;
  }

  document.body.append(div);
}