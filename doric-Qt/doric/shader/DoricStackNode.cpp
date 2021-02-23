#include "DoricStackNode.h"

QQuickItem *DoricStackNode::build() {
  QQmlComponent component(getContext()->getQmlEngine());

  const QUrl url(QStringLiteral("qrc:/doric/qml/stack.qml"));
  component.loadUrl(url);

  qCritical() << component.errorString();

  QQuickItem *item = qobject_cast<QQuickItem *>(component.create());
  return item;
}

void DoricStackNode::blendLayoutConfig() { DoricViewNode::blendLayoutConfig(); }
