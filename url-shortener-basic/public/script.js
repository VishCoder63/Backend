
// const BACKEND_BASE_URL = (...args) => import('../constants').then(({default: BACKEND_BASE_URL}) => {BACKEND_BASE_URL});


const inputTag = document.querySelector(".container>form>input[type='text']")
document.querySelector(".container>form").addEventListener("submit",onSubmit)

async function onSubmit(e) {
  e.preventDefault()
  //api call with val
  try {
    let linkText = ""
    const data = await fetch(`http://localhost:1333/api/v1/url`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body:JSON.stringify({longUrl:inputTag.value})
    })
    const data1= await data.json()
    const { shortUrl,status } = data1
    linkText=shortUrl
    
    if (linkText && status=="OK") document.querySelector(".container>form+div").innerHTML = `<a href=${linkText}>${linkText}</a>`
  } catch (e) {
    throw new Error(e.message)
  }
  


}

