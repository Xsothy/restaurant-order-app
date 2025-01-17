const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, "../..")

const config = getDefaultConfig(projectRoot)

// 1. Watch all files in the monorepo
config.watchFolders = [workspaceRoot]

// 2. Let Metro know where to resolve packages from
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules")
]

// 3. Force Metro to resolve (sub)dependencies through the workspace root
config.resolver.disableHierarchicalLookup = true

module.exports = config
