let userName= document.getElementById("userName");
let userAge= document.getElementById("userAge");
let userEmail= document.getElementById("userEmail");
let userNationality= document.getElementById("userNationality")
let addBtn= document.getElementById("addBtn");
let resetBtn= document.getElementById("resetBtn");
let userContainer;
let mainIndex=0;
let userNameAlert=document.getElementById("userNameAlert");
let userAgeAlert=document.getElementById("userAgeAlert");
let userEmailAlert=document.getElementById("userEmailAlert");
let userNationalityAlert=document.getElementById("userNationalityAlert");

if(localStorage.getItem("myDatabase")==null)
{
    userContainer=[];
}

else
{
    userContainer=JSON.parse(localStorage.getItem("myDatabase"));
    displayUser();
}

$("#addBtn").click(addUser);
function addUser()
{
 if(addBtn.innerHTML=="Edit User")
 {
    addBtn.innerHTML="Add User";
    addBtn.classList.replace("btn-outline-success","btn-outline-primary");
    if(userNameValidation()==true && userAgeValidation()==true && userEmailValidation()==true && userNationalityValidation()==true)
    {
        let user=
        {
            name:userName.value,
            age:userAge.value,
            email:userEmail.value,
            nationality:userNationality.value
        }
        userContainer.splice(mainIndex,1,user);
    
    }
   
 }

 else
 {  
     if(userNameValidation()==true && userAgeValidation()==true && userEmailValidation()==true && userNationalityValidation()==true)
     {
        let user=
        {
            name:userName.value,
            age:userAge.value,
            email:userEmail.value,
            nationality:userNationality.value
        }
        userContainer.push(user);
     }
  
 }
   
    localStorage.setItem("myDatabase",JSON.stringify(userContainer));
    console.log(userContainer);
    clear();
    displayUser();
}

$("#resetBtn").click(clear);
function clear()
{
    userName.value="";
    userAge.value="";
    userEmail.value="";
    userNationality.value="default";
}

function displayUser()
{
    let storage=``;
    for(let i=0;i<userContainer.length;i++)
    {
        storage+=` <tr>
        <td>${i+1}</td>
        <td>${userContainer[i].name}</td>
        <td>${userContainer[i].age}</td>
        <td>${userContainer[i].email}</td>
        <td>${userContainer[i].nationality}</td>
        <td><button onclick="editUser(${i})" class="btn btn-outline-success">Edit</button></td>
        <td><button onclick="deleteUser(${i})" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    
    }
    $("#tableData").html(storage);

}

function deleteUser(userIndex)
{
    userContainer.splice(userIndex,1);
    localStorage.setItem("myDatabase",JSON.stringify(userContainer));
    displayUser();
}


function editUser(userIndex)
{
    userName.value=userContainer[userIndex].name;
    userAge.value=userContainer[userIndex].age;
    userEmail.value=userContainer[userIndex].email;
    userNationality.value=userContainer[userIndex].nationality;
    addBtn.innerHTML="Edit User";
    addBtn.classList.replace("btn-outline-primary","btn-outline-success");
    mainIndex=userIndex;
}

function searchUsers(searchTerm)
{
    let storage=``;
    for(let i=0;i<userContainer.length;i++)
    {
        if(userContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) || userContainer[i].nationality.toLowerCase().includes(searchTerm.toLowerCase()))
        {
            storage+=` <tr>
            <td>${i+1}</td>
            <td>${userContainer[i].name}</td>
            <td>${userContainer[i].age}</td>
            <td>${userContainer[i].email}</td>
            <td>${userContainer[i].nationality}</td>
            <td><button onclick="editUser(${i})" class="btn btn-outline-success">Edit</button></td>
            <td><button onclick="deleteUser(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
        } 
        
    }
    $("#tableData").html(storage);

}

function userNameValidation()
{
    let regex=/^[A-Z][a-z]/;
    if(regex.test(userName.value)==true)
    {
        userName.classList.add("is-valid");
        userName.classList.remove("is-invalid");
        userNameAlert.classList.replace("d-block","d-none");
        return true;
    }

    else
    {
        userName.classList.add("is-invalid");
        userName.classList.remove("is-valid");
        userNameAlert.classList.replace("d-none","d-block");
        return false;
    }
}

function userAgeValidation()
{
    let regex=/^([1-9][8-9]|[2-9][0-9]|[1][0-1][0-9]|120)$/;
    if(regex.test(userAge.value)==true)
    {
        userAge.classList.add("is-valid");
        userAge.classList.remove("is-invalid");
        userAgeAlert.classList.replace("d-block","d-none");
        return true;
    }

    else
    {
        userAge.classList.add("is-invalid");
        userAge.classList.remove("is-valid");
        userAgeAlert.classList.replace("d-none","d-block");
        return false;
    }
}

function userEmailValidation()
{
    let regex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(regex.test(userEmail.value)==true)
    {
        userEmail.classList.add("is-valid");
        userEmail.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block","d-none");
        return true;
    }

    else
    {
        userEmail.classList.add("is-invalid");
        userEmail.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none","d-block");
        return false;
    }
}

function userNationalityValidation()
{
   
    if(userNationality.value=="default")
    {

        userNationality.classList.add("is-invalid");
        userNationality.classList.remove("is-valid");
        userNationalityAlert.classList.replace("d-none","d-block");
        return false;
        
    }

    else
    {
        userNationality.classList.add("is-valid");
        userNationality.classList.remove("is-invalid");
        userNationalityAlert.classList.replace("d-block","d-none");
        return true;
    }
}



userName.addEventListener("keyup",userNameValidation);
userAge.addEventListener("keyup",userAgeValidation);
userEmail.addEventListener("keyup",userEmailValidation);
userNationality.addEventListener("blur",userNationalityValidation);



