(function(){
    const findButton = document.getElementById("findWord");
   const input = document.getElementById("word");
   let apiRequest = new XMLHttpRequest();
   const resultContainer = document.getElementById("resultContainer")
   const resultWord = document.getElementById("resultWord");
   const resultMeaning = document.getElementById("resultMeaning");
   const ourSpin = document.getElementById("our-spin");




   findButton.addEventListener("click", (event) =>{
     ourSpin.style.display = "block";
     resultWord.style.fontSize = "200%";
     event.preventDefault();
     fetchApi();
   });


 
 function fetchApi(){
     resultMeaning.innerHTML = "";
     var answers = [];
     fetch("https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+input.value+"?key=1b068bf5-3d43-4b6c-b2e8-ff7bc9263d33")
     .then((data)=>{
       //note that the data returned is not a JSON data. So we need to use the json method to JSONise it
         data.json().
                   then((response) =>{
                       console.log(response)
                       if(response[0].shortdef){
                             for(let i = 0; i < response[0].shortdef.length; i++ ){
                                  answers.push(response[0].shortdef[i])
                              }
                       }
                       console.log(response[0].shortdef[0])//Short Definition 1
                       console.log(response[0].shortdef[1])//Short Definition 2
                       console.log(response[0].shortdef[2])//Short Definition 3
                       resultContainer.style.display = "block";
                       resultWord.textContent = response[0].hwi.hw;
                       var newOrderedList = document.createElement("ol");
         
                       for(let i = 0; i < answers.length; i++){
                           var newList = document.createElement("li");
                           newList.textContent = answers[i];
                           newOrderedList.appendChild(newList);
                       }
       
                      resultMeaning.appendChild(newOrderedList);
                   })  
                   ourSpin.style.display = 'none'; 
     })
     .catch((error) =>{
       error = "Check your network connection or Please try again!!!";
       console.log(error);
       resultContainer.style.display = "block";
       resultContainer.classList.add("text-danger");
       resultContainer.style.fontSize = "150%";
       resultContainer.innerHTML = error;
       ourSpin.style.display = "none";
     }) 
 }

  /* findButton.addEventListener("click", (event) =>{
       resultWord.innerHTML = "<i class='text-danger fa fa-retweet fa-spin'></i><br>"+"<span class='text-danger'> Please wait...</span>";
     resultWord.style.fontSize = "200%";
     event.preventDefault();
     const chosenWord = input.value;
     apiRequest.open("GET", "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+input.value+"?key=1b068bf5-3d43-4b6c-b2e8-ff7bc9263d33")

     apiRequest.send();
   })
   
   apiRequest.onreadystatechange = () =>{
       resultMeaning.innerHTML = "";
     if(apiRequest.readyState === 4){
          if(apiRequest.status === 404){
             return	resultContainer = "Please check your internet connection"
            }
           resultContainer.style.display = "block";
          const response = JSON.parse(apiRequest.responseText);
          var answers = [];

          if(response[0].shortdef){
              for(let i = 0; i < response[0].shortdef.length; i++ ){
                  answers.push(response[0].shortdef[i])
               }

              console.log(response[0].shortdef[0])//Short Definition 1
              console.log(response[0].shortdef[1])//Short Definition 2
              console.log(response[0].shortdef[2])//Short Definition 3
              resultContainer.style.display = "block";
              resultWord.textContent = response[0].hwi.hw;
              var newOrderedList = document.createElement("ol");
              
              for(let i = 0; i < answers.length; i++){
                  var newList = document.createElement("li");
                      newList.textContent = answers[i];
                      newOrderedList.appendChild(newList);
              }
         
                 resultMeaning.appendChild(newOrderedList);
            }else{
                        warning.style.display = "inline";
                        resultWord.textContent = "";
                        resultMeaning.innerHTML = "";
         }
       }
     }*/


     //USING PROMISES
    /* const promise = return new Promise((resolve, reject)=>{
         resolve
     })*/

})();