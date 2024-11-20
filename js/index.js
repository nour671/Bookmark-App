
var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("websiteUrl");
var submitBtn = document.getElementById("submitBtn");
var boxRules = document.querySelector(".box-info");



var bookmarkList = [];

if (localStorage.getItem("bookmarkContainer") !== null) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkContainer")); 
    displayBookmark() ;
  }


function addBookmark (){
    if (validationName() && validationUrl() ){

        var bookmark = {
            name : capitalize(siteNameInput.value) ,
            url : siteUrlInput.value 
    
        };


        bookmarkList.push (bookmark);
    
        localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
    
        displayBookmark();
    
        clearForm ();
        

    }
    else {
        boxRules.classList.remove("d-none");
    }
   

}

function capitalize(str) {
    var strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
  }



 

function clearForm (){
        siteNameInput.value = null;
        siteUrlInput.value  = null;
        siteNameInput.classList.remove("is-valid");
        siteUrlInput.classList.remove("is-valid");

    }
    
function displayBookmark() {

    var container = "";
    for ( var i = 0 ;   i< bookmarkList.length      ;  i++   ){
        container += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${bookmarkList[i].name} </td>              
                        <td>
                            <button onclick="visitWebsite(${i})"   class="btn btn-visit  "  >
                                <i class="fa-solid fa-eye pe-2"></i>Visit
                            </button>
                        </td>
                        <td>
                            <button onclick="deleteItem( ${i} )" class="btn btn-delete btn-danger pe-2" >
                                <i class="fa-solid fa-trash-can"></i> Delete 
                            </button>
                        </td>
                    </tr>
        
        `
    };
    document.getElementById("tableContent").innerHTML = container ;
}


function deleteItem(index) {
    bookmarkList.splice(index, 1); 

    localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
  
    displayBookmark(); 
}


function visitWebsite(index) {
    var url = siteUrlInput.value;
    var httpsRegex = /^https?:\/\//;
        if (httpsRegex.test(bookmarkList[index].url)) {
            open(bookmarkList[index].url);
        } else {
            open(`https://${bookmarkList[index].url}`);
        }

        
    
}








function validationName() {
    var regex = /^\w{3,}(\s+\w+)*$/;
    var text = siteNameInput.value;
    

    if (regex.test(text)) {
      
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
    
        return true;
    } else {
      
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
      
        return false;
    }
  }

function validationUrl() {
    var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    var text = siteUrlInput.value;
    

    if (regex.test(text)) {
      
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
    
        return true;
    } else {
      
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.remove("is-valid");
      
        return false;
    }
  }


function Validation(element, isValid) {
    if (isValid) {
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
    } else {
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
    }
  }

  function closeRules() {
    boxRules.classList.add("d-none");
  }