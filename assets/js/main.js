  const getCategories =async ()=>{
    const {data} = await axios.get(`https://dummyjson.com/products/category-list`);
    return data;
    
  }

  const countDown = ()=>{
    const countDownDate = new Date ("2025-03-01T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const Days = Math.floor(distance / 86400000);
    const Hours = Math.floor((distance % 86400000)/3600000);
    const Minutes = Math.floor((distance % 3600000)/60000);
    const Secondes = Math.floor((distance % 60000)/1000);

    document.querySelector("#days").textContent = Days;
    document.querySelector("#hours").textContent = Hours;
    document.querySelector("#minutes").textContent = Minutes;
    document.querySelector("#seconds").textContent = Secondes;
  }
   setInterval( () =>{
    countDown();
  },1000)

  const displayCategories = async ()=>{
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try{
    const categories = await getCategories();
    const result = categories.map((category)=>{
        return `<div class="category">
        <h2>${category}</h2>
        <a href="categoryDetails.html?category=${category}">Details</a>
        </div>`
       }).join(' ');

       document.querySelector('.categories .row').innerHTML = result;
      }catch(error){
        document.querySelector(".category .row").innerHTML = "<p>error loading categories</p>";
      }finally{
        loader.classList.remove("active");
      }
    
  }

  
 const getProducts = async (page)=>{
  const skip = (page - 1)* 20;
    const {data} = await axios.get(`https://dummyjson.com/products?limit20&skip=${skip}`);
    return data;
 }


 const displayProducts = async (page = 1)=>{
  const loader = document.querySelector(".loader-container");
  loader.classList.add("active");
    try{
    const data = await getProducts(page);
    const numberOfPages = Math.ceil(data.total / 20);
    console.log(page);
    const result = data.products.map((product)=>{
        return `<div class="product">
        <img src="${product.thumbnail}" alt="${product.description}"/>
        <h3>${product.title}</h3>
        <span>${product.price}</span>
        </div>`
       }).join(' ');
       document.querySelector('.products .row').innerHTML = result;

       let pagenationLinks = ``
       if(page == 1){
        pagenationLinks += `<li class="page-item"><button class="page-link" >&laquo;</button></li>`;
       }else{
        pagenationLinks += `<li class="page-item"><button onclick = displayProducts('${page-1}') class="page-link">&laquo;</button></li>`;
       }
       
      for(let i=1;i<=numberOfPages;i++){
        pagenationLinks +=`<li class="page-item ${i == page?'active':''}"><button onclick = displayProducts('${i}') class="page-link" >${i}</button></li>`;
      }

      if(page == numberOfPages){
        pagenationLinks += `<li class="page-item"><button class="page-link" >&raquo;</button></li>`;
       }else{
        pagenationLinks += `<li class="page-item"><button onclick="displayProducts(${page + 1})" class="page-link">&raquo;</button></li>`;
       }
      

      document.querySelector(".pagination").innerHTML = pagenationLinks;

      }catch(error){
        document.querySelector(".products .row").innerHTML = "<p>error loading products</p>";
      }finally{
        loader.classList.remove("active");
      }
 }


 displayCategories();
 displayProducts();

 window.onscroll = function(){
  const nav = document.querySelector(".header");
  const categories = document.querySelector(".categories");
  if(window.scrollY > categories.offsetTop){
    nav.classList.add("scrollNavbar");
  }else{
    nav.classList.remove("scrollNavbar")
  }
 }








  