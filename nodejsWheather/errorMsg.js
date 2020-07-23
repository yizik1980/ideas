class Msg {
  constructor(msg, type) {
    this.errorMs = msg;
    this.type = type || 10;
  }
  errorMsg;
  type;
}
module.exports = Msg;
