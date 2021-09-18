class Response {
  static success(res, data) {
    return res.status(200).json({ data });
  }
  static successMessage(res, msg) {
    return res.status(200).json({ message: msg });
  }
  static successData(res, data) {
    return res.status(200).json({ data: data });
  }
  static notFound(res) {
    return res.status(404).json({ error: 'Route not found' });
  }
  static badRequest(res, errors) {
    res.status(400).json({ errors: errors });
  }
  static unauthorized(res, errors) {
    let json = { message: 'Unauthorized' };
    if (errors) {
      json.errors = errors;
    }
    res.status(401).json(json);
  }
  static errorMessage(res, errors) {
    let json = { message: 'Error' };
    if (errors) {
      json.errors = errors;
    }
    res.status(500).json(json);
  }
  static forbidden(res, errors) {
    let json = { message: 'Forbidden' };
    if (errors) {
      json.errors = errors;
    }
    res.status(403).json(json);
  }
}

module.exports = Response;
