class NotImplementedException extends Error {
    constructor() {
      super('Not Implemented Exception');
    }
  }
  //interface
  class IBaseService {
    create(item) {
      throw new NotImplementedException();
    }
    listAll() {
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
    isConnected(id) {
      throw new NotImplementedException();
    }
  }
  
  module.exports = IBaseService;
  