const errorTypes = require("../config/errorTypes");

const errorHandler = (error, req, res, next) => {
  switch (error.message) {
    case errorTypes.NOT_AUTHORIZED:
      return res.status(401).send({
        message:
          "Błąd weryfikacji użytkownika, zaloguj się i spróbuj ponownie.",
      });
    case errorTypes.NOT_FOUND_ERROR:
      return res
        .status(404)
        .send({ message: "Nie znaleziono żądanego zasobu" });
    case errorTypes.INVALID_REQUEST:
      return res.status(400).send({
        message:
          "Nieprawidłowe żądanie, sprawdź wprowadzone dane i spróbuj ponownie",
      });

    default:
      return res.status(500).send({
        message: "Coś poszło nie tak po naszej stronie... Spróbuj ponownie.",
      });
  }
};

module.exports = errorHandler;
