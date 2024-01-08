class Expect {
  constructor() {
    this.count = 0
    this.ok = 0;
    this.ng = 0;
  }

  async allowed(desc, src) {
    this.count++;
    return src.then(() => {
      this.ok++;
      console.info(`OK: allowed ${desc}`);
    }).catch(() => {
      this.ng++;
      console.error(`NG: denied ${desc}`);
    });
  };

  async denied(desc, src) {
    this.count++;
    return src.then(() => {
      this.ng++;
      console.error(`NG: allowed ${desc}`);
    }).catch(() => {
      this.ok++;
      console.info(`OK: denied ${desc}`);
    });
  };

  getResult() {
    if (this.count === this.ok) {
      console.info(`Count:${this.count} ( OK:${this.ok} / NG:${this.ng} )`)
      return 0;
    } else {
      console.error(`Count:${this.count} ( OK:${this.ok} / NG:${this.ng} )`)
      return 1;
    }
  }
}

module.exports = {
  Expect,
};
