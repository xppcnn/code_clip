const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
const presetEnv = require("@babel/preset-env");
const getModuleInfo = (file) => {
  const body = fs.readFileSync(file, "utf-8");
  const ast = parser.parse(body, {
    sourceType: "module",
  });
  const deps = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      console.log("🚀 ~ file: bundle.js:16 ~ ImportDeclaration ~ dirname:", dirname)
      const abspath = path.join(dirname, node.source.value);
      console.log("🚀 ~ file: bundle.js:17 ~ ImportDeclaration ~ dirname:",abspath)
      deps[node.source.value] = abspath;
    },
  });
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: [presetEnv],
  });

  const moduleInfo = { file, deps, code };
  return moduleInfo;
  console.log("🚀 ~ file: bundle.js:4 ~ getModuleInfo ~ body:", code);
};

const parseModules = (file) => {
  const moduleInfo = getModuleInfo(file);
  const temp = [moduleInfo];
  const depsGraph = {}; //新增代码
  for (let i = 0; i < temp.length; i++) {
    const deps = temp[i].deps;
    if (deps) {
      for (let key in deps) {
        if (deps.hasOwnProperty(key)) {
          temp.push(getModuleInfo(deps[key]));
        }
      }
    }
  }
  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  console.log(depsGraph);
  return depsGraph;
};

const bundle = (file) =>{
  const depsGraph = JSON.stringify(parseModules(file))
  console.log("🚀 ~ file: bundle.js:57 ~ bundle ~ depsGraph:", depsGraph)
  return `(function (graph) {
      function require(file) {
          function absRequire(relPath) {
              return require(graph[file].deps[relPath])
          };
          var exports = {};
          (function (require,exports,code) {
              eval(code)
          })(absRequire,exports,graph[file].code);
          return exports;
      }
      require('${file.replace(/\\/g, '\\\\')}')
  })(${depsGraph})`

}
const content = bundle(path.join(__dirname + '/src/index.js'))
console.log("🚀 ~ file: bundle.js:71 ~ content:", content)

fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js',content)