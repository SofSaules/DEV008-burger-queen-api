const axios = require("axios").default;

(async () => {
  axios
    .get('http://localhost:8080') // petición HTTP a la URL especificada
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
})();
