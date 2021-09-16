const responseSuccess = (res, data) => {
    res.status(200);
    res.type("application/json");
    res.json(data);
    res.end();
  };
  
  const responseFailed = (res, status, message) => {
    res.status(status);
    res.send({ status, message });
    res.end();
  };
  
  module.exports = { responseSuccess, responseFailed };
  