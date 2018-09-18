const eventListener = {
  clients: {},
  listen: function (key, func) {
    if (!this.clients[key]) {
      this.clients[key] = [];
    }
    this.clients[key].push(func);
  },
  trigger: function () {
    const key = Array.prototype.shift.call(arguments);
    const funcs = this.clients[key];
    if (!funcs || funcs.length == 0) {
      return false;
    }
    for (let i = 0; func = funcs[i++];) {
      func.apply(this, arguments);
    }
  },
  remove: function (key, func) {
    const funcs = this.clients[key];
    if (!funcs) {
      return false;
    }
    if (!func) {
      funcs && (funcs.length = 0);
    } else {
      for (let i = funcs.length - 1; i >= 0; i--) {
        const _func = funcs[i];
        if (_func === func) {
          funcs.splice(i, 1);
        }
      }
    }
  }
}

const installEventListener = (obj) => {
  for (const key in eventListener) {
    obj[key] = eventListener[key];
  }
  return obj;
}

module.exports = {installEventListener};