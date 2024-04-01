module.exports = (res, statusCode, message, paginate, result) => {
  const response = {
    status: statusCode === 200 || statusCode === 201 ? 1 : 0,
    message: message,
  };

  if (paginate != null) {
    response.current_page = paginate.currentPage;
    response.total_page = paginate.totalPage;
  }

  if (result !== null) {
    if (response.status === 1) {
      response.data = result;
    } else {
      response.error = result;
    }
  }

  res.status(statusCode).json(response);
};
