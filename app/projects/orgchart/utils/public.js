class AppConfig {
  constructor() {
    if (AppConfig.instance) {
      return AppConfig.instance
    }
    this.config = {}
    AppConfig.instance = this
  }

  setConfig(key, value) {
    this.config[key] = value
  }

  getConfig(key) {
    return this.config[key]
  }
}

const appConfig = new AppConfig()
Object.freeze(appConfig)

export default appConfig
