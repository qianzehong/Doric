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

import { View, Property, Superview, NativeViewModel } from "../ui/view";
import { Stack } from "./layouts";
import { layoutConfig } from "../util/layoutconfig";
import { BridgeContext } from "../runtime/global";


export class ListItem extends Stack {
    /**
     * Set to reuse native view
     */
    @Property
    identifier?: string
}

export class List extends Superview {
    private cachedViews: Map<string, ListItem> = new Map
    private ignoreDirtyCallOnce = false

    allSubviews() {
        if (this.loadMoreView) {
            return [...this.cachedViews.values(), this.loadMoreView]
        } else {
            return this.cachedViews.values()
        }
    }

    @Property
    itemCount = 0

    @Property
    renderItem!: (index: number) => ListItem

    @Property
    batchCount = 15

    @Property
    onLoadMore?: () => void

    @Property
    loadMore?: boolean

    @Property
    loadMoreView?: ListItem

    @Property
    onScroll?: (offset: { x: number, y: number }) => void

    @Property
    onScrollEnd?: (offset: { x: number, y: number }) => void

    @Property
    scrolledPosition?: number

    scrollToItem(context: BridgeContext, pos: number, animated?: boolean) {
        return this.nativeChannel(context, 'scrollToItem')({ pos, animated }) as Promise<any>
    }

    reset() {
        this.cachedViews.clear()
        this.itemCount = 0
    }
    private getItem(itemIdx: number) {
        let view = this.renderItem(itemIdx)
        view.superview = this
        this.cachedViews.set(`${itemIdx}`, view)
        return view
    }

    isDirty() {
        if (this.ignoreDirtyCallOnce) {
            this.ignoreDirtyCallOnce = false
            //Ignore the dirty call once.
            return false
        }
        return super.isDirty()
    }

    private renderBunchedItems(start: number, length: number) {
        this.ignoreDirtyCallOnce = true
        return new Array(Math.max(0, Math.min(length, this.itemCount - start))).fill(0).map((_, idx) => {
            const listItem = this.getItem(start + idx)
            return listItem.toModel()
        })
    }

    toModel(): NativeViewModel {
        if (this.loadMoreView) {
            this.dirtyProps['loadMoreView'] = this.loadMoreView.viewId
        }
        return super.toModel()
    }
}

export function list(config: Partial<List>) {
    const ret = new List
    for (let key in config) {
        Reflect.set(ret, key, Reflect.get(config, key, config), ret)
    }
    return ret
}

export function listItem(item: View | View[], config?: Partial<ListItem>) {
    return (new ListItem).also((it) => {
        it.layoutConfig = layoutConfig().fit()
        if (item instanceof View) {
            it.addChild(item)
        } else {
            item.forEach(e => {
                it.addChild(e)
            })
        }
        if (config) {
            for (let key in config) {
                Reflect.set(it, key, Reflect.get(config, key, config), it)
            }
        }
    })
}

