/*
 * Copyright [2019] [Doric.Pub]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as doric from './src/runtime/sandbox'
import * as WebSocket from 'ws'

let global = new Function('return this')()
global.doric = doric
const contextId = "DoricDebug"
global.context = doric.jsObtainContext(contextId)
global.Entry = doric.jsObtainEntry(contextId)

const wss = new WebSocket.Server({ port: 2080 })
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message: string) {
    let messageObject = JSON.parse(message)
    switch (messageObject.cmd) {
      case "injectGlobalJSFunction":
        console.log(messageObject.name)
        Reflect.set(global, messageObject.name, function() {
          let args = [].slice.call(arguments)
          ws.send(JSON.stringify({
            cmd: 'injectGlobalJSFunction',
            name: messageObject.name,
            arguments: args
          }))
        })
        break
    }
  })
})
console.log('Start Server')

global.injectGlobal = (objName: string, obj: string) => {
  Reflect.set(global, objName, JSON.parse(obj))
}

global.sendToNative = () => {

}
global.receiveFromNative = () => {

}

export * from './index'