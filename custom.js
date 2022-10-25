
// GETİRME İŞLEMLERİ
const table = document.getElementById("userTable");
function getUserList() {
    fetch("https://reqres.in/api/users")
    .then(response=>response.json())
    .then(data=>{
        // console.log(data); 
        for(user of data.data){
            // console.log(user);
            table.innerHTML+= 
            `<tr>
                <td> <input type="text" class="form-control" id=" first_name_${user.id} " value=" ${user.first_name}"> </td>
                <td> <input type="text" class="form-control" id=" last_name_${user.id} " value="  ${user.last_name} "> </td>
                <td> <input type="text" class="form-control" id=" email_${user.id} " value="  ${user.email} "> </td>
                <td>
                <button class="btn btn-warning" onclick="updateUser(${user.id})">Güncelle</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Sil</button>
                </td>
            </tr>`
        }
    })
} 
getUserList();

// Tablonun yenilenmesi
function refreshData() {
    getUserList();
}

/* Kullanıcı oluşturma */
function createUser() {
    let data = {
        first_name:document.getElementById("first_name").value || "değer yok",
        last_name:document.getElementById("last_name").value || "değer yok",
        email:document.getElementById("email").value || "değer yok",
    };
    fetch("https://reqres.in/api/users", {
        method:"POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(data)
    }) 
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        table.innerHTML+=  `<tr>
                <td> <input type="text" class="form-control" id="" value=" ${data.first_name}"> </td>
                <td> <input type="text" class="form-control" id="" value="  ${data.last_name} "> </td>
                <td> <input type="text" class="form-control" id="" value="  ${data.email} "> </td>
                <td>
                <button class="btn btn-warning" onclick="updateUser(${data.id})">Güncelle</button>
                <button class="btn btn-danger" onclick="deleteUser(${data.id})">Sil</button>
                </td>
            </tr>`
    })
    .catch((error) => {
         console.log("Hata:", error);
    })
}


function updateUser(id) {
    console.log(id);
    let data ={
        first_name:document.getElementById("first_name_"+id).value || "Geçersiz Değer",
        last_name:document.getElementById("last_name_"+id).value || "Geçersiz Değer",
        email:document.getElementById("email_"+id).value || "Geçersiz Değer"
    }
    console.log(data);

     fetch("https://reqres.in/api/users", {
        method:"PUT",
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(data)
    })
   .then(response=>response.json())
   .then(veri=>console.log("Kullanıcı güncellendi", veri))
   .catch((error)=>console.log(error))
}


    function deleteUser(id) {
          fetch("https://reqres.in/api/users"+id, {
        method:"DELETE",
        headers:{
            'Content-Type' : 'application/json'
        },
    })
    .then(response=>console.log(response))
    .then(data=>{
        console.log("Kullanıcı Silindi", data);
    })
    .catch((error)=>console.log(error))
    }
   