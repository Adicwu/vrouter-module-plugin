module.exports = {
  initModulesContent: (ipt, routes) => `${ipt}
export default [${routes.join(',')}]
`
}