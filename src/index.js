const fs = require('fs');
const path = require('path');
const { initModulesContent } = require('./static')

/**
 * 模块导入名称格式化
 * @param {*} name 
 * @returns 
 */
function parseMouduleName(name) {
  let index = name.indexOf('-');
  while (index > -1) {
    name = name.split('');
    name.splice(index + 1, 1, name[index + 1].toUpperCase())
    name = name.join('');
    name = name.replace('-', '');
    index = name.indexOf('-');
  }
  return name;
}

/**
 * 路由模块划分插件
 * @param { root项目根目录 }
 */
module.exports = class RouteModulePlugin {
  constructor(opt = {
    root: ''
  }) {
    this.opt = opt
  }
  /**
   * 读取项目模块配置文件
   * @param {*} modulesPath 
   * @returns 
   */
  readModuleConfig(modulesPath) {
    let moduleConfigPath = path.resolve(modulesPath, 'module.json');
    const modules = require(moduleConfigPath);
    return modules
  }
  apply(compiler) {
    const rootPath = this.opt.root
    if (!rootPath) return;
    compiler.hooks.initialize.tap('RouteModulePlugin', () => {
      const modulesPath = path.resolve(rootPath, 'modules');
      const mouduleConfig = this.readModuleConfig(modulesPath)
      for (const entry in mouduleConfig) {
        const modulesInfo = mouduleConfig[entry].reduce((totol, moduleName) => {
          if (fs.existsSync(path.resolve(modulesPath, moduleName, 'router.js'))) {
            const parsedModuleName = parseMouduleName(moduleName);
            totol.importContent += `import ${parsedModuleName} from '@/modules/${moduleName}/router';\n`;
            totol.routes.push(parsedModuleName)
          }
          return totol
        }, {
          importContent: '',
          routes: []
        })
        const content = initModulesContent(modulesInfo.importContent, modulesInfo.routes)
        fs.writeFileSync(
          path.resolve(modulesPath, '../', 'entry', entry, 'router', '__modules__.js'),
          content,
          { encoding: 'utf8' }
        );
      }
    })
  }
}