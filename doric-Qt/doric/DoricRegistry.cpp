#include "DoricRegistry.h"

#include "plugin/DoricShaderPlugin.h"
#include "shader/DoricHLayoutNode.h"
#include "shader/DoricRootNode.h"
#include "shader/DoricStackNode.h"
#include "shader/DoricTextNode.h"
#include "shader/DoricVLayoutNode.h"

DoricRegistry::DoricRegistry() {
  registerNativePlugin<DoricShaderPlugin>("shader");

  registerViewNode<DoricRootNode>("Root");
  registerViewNode<DoricStackNode>("Stack");
  registerViewNode<DoricVLayoutNode>("VLayout");
  registerViewNode<DoricHLayoutNode>("HLayout");
  registerViewNode<DoricTextNode>("Text");
}

bool DoricRegistry::acquirePluginInfo(QString name) {
  return plugins.acquireClass(name);
}

bool DoricRegistry::acquireNodeInfo(QString name) {
  return nodes.acquireClass(name);
}