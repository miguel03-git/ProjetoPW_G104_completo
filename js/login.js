function onSignIn(response) {
  const jwt = response.credential;

  // Decodificar o token JWT (parte do meio)
  const payloadBase64 = jwt.split('.')[1];
  const payloadDecoded = JSON.parse(atob(payloadBase64));
  const email = payloadDecoded.email;

  console.log("Email Google:", email);

  // Se for o Miguel → vai para registoperito
  if (email === "miguelpinheiro2003@gmail.com") {
    alert("Bem-vindo, Miguel!");
    window.location.href = "../backoffice/dashboard.html";
  } else {
    // Qualquer outro utilizador → vai para index
    alert("Login bem-sucedido! A aceder ao site público.");
    window.location.href = "index.html";
  }
}
