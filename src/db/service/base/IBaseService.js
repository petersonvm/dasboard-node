class NotImplementedException extends Error {
    constructor() {
      super('Not Implemented Exception');
    }
  }

  class IBaseService {
    create(item) {
      throw new NotImplementedException();
    }
    listAll(item = {}) {
      throw new NotImplementedException();
    }
    listOne(id) {
      throw new NotImplementedException();
    }
    update(id, item) {
      throw new NotImplementedException();
    }
    delete(id) {
      throw new NotImplementedException();
    }
    isConnected() {
      throw new NotImplementedException();
    }
  }
  
  module.exports = IBaseService;
  