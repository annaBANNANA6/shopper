let cartIcon = document.querySelector(".cart-icon-section")
let cartModal = document.querySelector(".cart-modal")
let cartClose = document.querySelector("#cart-modal-close")
cartClose.addEventListener("click", closeCart)
cartIcon.addEventListener("click", openCart)

// To load the cart Modal
function openCart(){
  cartModal.classList.add("active")
}

function closeCart(){
  cartModal.classList.remove("active")
}

// local storage
let addCartBtn = document.querySelectorAll(".add-cart")
let items = []
console.log(addCartBtn.length)
for (let i = 0; i < addCartBtn.length; i++){
  console.log(addCartBtn[i])
  addCartBtn[i].addEventListener("click", function(e){
    
    if(typeof(Storage) !== "undefined"){
      let item = {
        id: i+1,
        name: e.target.parentElement.children[0].textContent, //Targets the actual add-cart button, then goes to its parent (product-text-left), and then its first child (h1)
        price: e.target.parentElement.nextElementSibling.querySelector("p").textContent,
        // DOM Traversal- can travel and get next/previous element/div
        no: 1
      }
      if(JSON.parse(localStorage.getItem("items")) === null){ // if nothing is in it
        items.push(item)
        localStorage.setItem("items", JSON.stringify(items))
        window.location.reload()
      }
      else{
        const localItems = JSON.parse(localStorage.getItem("items"))
        localItems.map(data=>{ //Map is like forEach except you use it on an array and when you run a function it takes whatever the function returns and puts it into another array- in this case acting as forEach
          if(item.id == data.id){
            console.log(true)
            item.no = data.no + 1
            console.log(item)// add 1 to differentiate the products
          }

          else{
            items.push(data)
            console.log({data})
          }
          
        })

        console.log({item})
        items.push(item)
        console.log(items) 
        localStorage.setItem("items", JSON.stringify(items))
        window.location.reload()
      }
    }
    else{
      alert("Local storage not working")
    }
  })
  
}

// adding data to shopping cart
let cartIconNum = document.querySelector(".cart-icon-section p")
let no = 0
JSON.parse(localStorage.getItem("items")).map(data =>{
  no = no + data.no 
})
cartIconNum.innerHTML = no

// adding cart local storage stuff into the table on the modal to see
let cardModalTable = cartModal.querySelector("table")
let tableData = ""
tableData += "<tr><th>S no.</th><th>Item Name</th><th>Quantity</th><th>Item Price</th><th></th></tr>"
if (JSON.parse(localStorage.getItem("items")) === null){
  tableData += '<tr><td colspan = "5">No items found</td></tr>'
}
else{
  JSON.parse(localStorage.getItem("items")).map(data=>{
    tableData += `<tr><th> ${data.id} </th><th> ${data.name} </th><th> ${data.no} </th><th> ${data.price} </th><th><a href= "#" onclick = deleteItem(this)>Delete</a></th></tr>`
  })

  

}
cardModalTable.innerHTML = tableData

// make empty array. loop over data with map or could use forEach. if that item's id is not equal to the one we just clicked on, then we add it to the empty array. then we set localStorage to the new array without the deleted element.

function deleteItem(e){
        let items = []
        JSON.parse(localStorage.getItem("items")).map(data=>{
          if(data.id != e.parentElement.parentElement.children[0].textContent){ //tables first el
            items.push(data)
          }
      
        })

        localStorage.setItem("items", JSON.stringify(items))
        window.location.reload()
    
      }



