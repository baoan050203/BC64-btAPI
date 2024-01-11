

function turnOnLoading(){
    document.getElementById("spinner").style.display="block"
  }
  
  function turnOffLoading(){
    document.getElementById("spinner").style.display="none";
  }
  function resetForm(){
    var listInput = document.querySelectorAll("input");
    console.log("-list-input", listInput)
    for(var i=0;i<listInput.length;i++){
      listInput[i].value="";
    }
  }


function renderProduct (productArray){
    var contentHtml=""
    for(var i = 0;i<productArray.length ; i++){
        var product = productArray[i];
        var trString = ` <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>${product.img}</td>
                            <td>${product.desc}</td>
                            <td>
    
                            <button
                            onclick=deletProduct(${product.id}) 
                            class="btn btn-danger">Delete</button>
    
                            
                            </td>
                            <td>
                            <button onclick=editProduct(${product.id})
                            class="btn btn-primary">Edit</button></td>
                        </tr>`;
    
        contentHtml = contentHtml + trString;
      }
      document.getElementById("tblDanhSachSP").innerHTML = contentHtml;
    }
    function fetchProduct() {
        turnOnLoading();
        axios({
          url: "https://659c0428d565feee2dac441e.mockapi.io/product",
          method: "GET",
        })
          .then(function (res) {
            console.log("", res.data);
            renderProduct(res.data);
            turnOffLoading();
          })
          .catch(function (err) {
            console.log("", err);
            turnOffLoading()
          });
      }
      fetchProduct();
      
      function deletProduct(id) {
        turnOnLoading()
        axios({ url: `https://659c0428d565feee2dac441e.mockapi.io/product/${id}`, method: "DELETE" })
          .then(function (res) {
            fetchProduct();
            console.log("res", res.data);
          })
          .catch(function (err) {
            turnOffLoading()
            console.log("err", err);
          });
      }


      function createProduct() {
        turnOnLoading();
        console.log("yes");
        var tenSp = document.getElementById("TenSP").value;
        var giaSp = document.getElementById("GiaSP").value;
        var hinhSp= document.getElementById("HinhSP").value
        var moTaSp = document.getElementById("MoTaSP").value
        var sp={
          name:tenSp,
          price:giaSp,
          img:hinhSp,
          desc: moTaSp,
        }
        console.log("cre", sp)
        // gọi api 
        axios({
          url: "https://659c0428d565feee2dac441e.mockapi.io/product",
          method: "POST",
          data: sp,
        })
          .then(function(result){
            console.log("-result", result);
            $('#myModal').modal('hide')
            resetForm()
            turnOffLoading()
            
          })
          .catch(function(err){
            turnOffLoading()
            console.log("",err)
          })
      }


      var idEdited = null;
      function editProduct(id){
        // turnOnLoading();
        axios({
          url: `https://659c0428d565feee2dac441e.mockapi.io/product/${id}`,
          method: "GET"
        
        })
          .then(function(res){
            idEdited=id
            console.log("lay thong tin thanh cong", res.data)
            $('#myModal').modal('show')
            var sp= res.data
            // var arrinput = document.querySelectorAll(form in)
            // document.getElementById("GiaSp")
            document.getElementById("GiaSP").value = sp.price;
            document.getElementById("TenSP").value = sp.name;
            document.getElementById("HinhSP").value = sp.img;
            document.getElementById("MoTaSP").value = sp.desc;
          })
          .catch(function(err){
            // turnOffLoading()
            console.log("",err)
          })
      }

      function updateProduct(id){
        turnOnLoading();
        var tenSp = document.getElementById("TenSP").value;
        var giaSp = document.getElementById("GiaSP").value;
        var hinhSp = document.getElementById("HinhSP").value;
        var moTaSp = document.getElementById("MoTaSP").value;
      
        var sp = {
          name: tenSp,
          price: giaSp,
          img: hinhSp,
          desc: moTaSp,
        };
        axios({
          url: `https://659c0428d565feee2dac441e.mockapi.io/product/${idEdited}`,
          method: "PUT",
          data: sp,
        })
          .then(function (res) {
            $("#myModal").modal("hide");
            // render ddsp
            fetchProduct();
          })
          .catch(function (err) {
            turnOffLoading();
          });
      }
      



// axios({
//     url:"https://659c0428d565feee2dac441e.mockapi.io/product",
//     method: "GET",
// })
//     .then(function(res){
//         console.log("-res", res.data)
//         renderProduct(res.data)
// })
//     .catch(function (err){
//         console.log("err", err)
// })
