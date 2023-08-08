const $authorname = document.getElementById('authorname');
const $email = document.getElementById('email');
const $password = document.getElementById('password');
const $submitBtn = document.getElementById('submitBtn');
const $loginBtn = document.getElementById('loginBtn');

if($loginBtn) {
    $loginBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const authorname = $authorname.value;
        const password = $password.value;
        
        if(!authorname ||!password) {return alert('Please enter authorname and password');}
    
    try{
        const response = await fetch('/api/authors/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({authorname, password})});
        const data = await response.json();
       
        if(response.ok) {
            location.href =`/authors/${data.id}`;
        } 
        else {
            alert ('Pa fe mwen sa. infomasyon ou antre ya pa valid. Tanpri antre non itilizatè kòrèk ak modpas kòrèk.');
        }
 }
 catch(err) {
     alert(err.message);
 }
});
}


if($submitBtn) {
    $submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const authorname = $authorname.value;
        const email = $email.value;
        const password = $password.value;
        
        if(!authorname ||!password || !email) {return alert('Please enter authorname and password');}
    
    try{
        const response = await fetch('/api/authors/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({authorname, password, email}),
        });
        const data = await response.json();
      
        alert(data)
            location.href =`/authors/${data.id}`;
        
 } catch(err) {
    alert(err.message);}
});
}

