// used to make elements for the products
function makeElement(type= "div", newClass, inner = ""){
  let newEl = document.createElement(type)
  if(newClass){
    newEl.classList.add(newClass)
  }
  newEl.innerHTML = inner
  return newEl
}

//get random numbers to use to fetch random items
function getRandom(){
  numArray = []

  while (numArray.length != 4) {
   let randomNum = Math.floor(Math.random() * 21)
    if (numArray.includes(randomNum) == false){
      numArray.push(randomNum)
      console.log(numArray)
      console.log(randomNum + "has been added to the array")
    }
    else{
      console.log(randomNum + " is already in the array")
    }
  }
  return numArray
  
}

// actually getting the producs with the api using the random numbers
function getProducts(){
  let randomNumberArr = getRandom()
// console.log(randomNumberArr)

  for (let i = 0; i < randomNumberArr.length; i++) {
    // console.log(randomNumberArr[i])
    fetch('https://fakestoreapi.com/products/' + randomNumberArr[i])
            .then(function(response){
              return response.json()
            })
            .then(function(data){
              buildProduct(data)
            })
  }  
   
}

let productsContainer = makeElement("div", "productsContainer") 
document.querySelector("#products").append(productsContainer)

function buildProduct(data){
  console.log(data)
  let product = makeElement("div", "product")
  let productImg = makeElement("div", "product-img")
  productImg.style.backgroundImage = "url(" + data.image + ")"
  let productText = makeElement("div", "product-text")
  let productTextLeft = makeElement("div", "product-text-left")
  let productTitle = makeElement("h1", undefined, data.title)
  let productButton = makeElement("button", "add-cart", "Add to Cart")
  
  productButton.addEventListener("click",   ()=>addCart(data.id,data.title,data.price))
  
  // productButton.setAttribute("id", "add-cart")
  let productTextRight = makeElement("div", "product-text-right")
  let productPrice = makeElement("p", undefined, data.price)
  
  let products = document.querySelector("#products")
  productText.append(productTextLeft)
  productText.append(productTextRight)
  productTextLeft.append(productTitle)
  productTextLeft.append(productButton)
  productTextRight.append(productPrice)
  product.append(productImg)
  product.append(productText)
  productsContainer.append(product)
}

const addCart = (id,name,price)=>{
  console.log("dfsdfd")
  if(typeof(Storage) !== "undefined"){
      let item = {
        //es6 syntax shortcut for name: name, id:id, 
        name,
        id,
        price,
        no:1
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
  }


getProducts()