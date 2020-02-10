const IBaseService = require('./IBaseService');
class BaseService extends IBaseService {
  constructor(database) {
    super();
    this._database = database;
  }
  isConnected() {
    return this._database.isConnected();
  }
  connect() {
    return this._database.connect()
  }
  create(item) {
    return this._database.create(item);
  }
  listOne(item) {
    return this._database.listOne(item);
  }
  listAll(item = {}) {
    return this._database.listAll(item);
  }
  update(id, item, upsert) {
    return this._database.update(id, item, upsert);
  }
  delete(id) {
    return this._database.delete(id);
  }
}

module.exports = BaseService;