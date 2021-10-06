// "use strict";
import {Tabbed, List, Tab} from './Tabbed';
import { expect, assert } from "chai";

describe('Tabbed trait', function () {

  it("should throw an error if list is empty", function () {
    const list:List = {
      tabs: []
    }
    assert.throws(() => Tabbed(list),
      Error, "tab list is empty"
    );
  });

  it("should not allow tabs without an id", function () {
    const list: List = {
      tabs: [{id: '', selected:false}]
    }
    assert.throws(() => Tabbed(list),
      Error, "tab must have an id"
    );
  });

  it("must return a list of current tabs", function () {
    const list: List = {
      tabs: [{ id: 'test', selected: false }]
    }
    const { state } = Tabbed(list)
    // Expect two tabs here. We add an invisible
    // "none" tab to allow for deselection
    expect(state.tabs.length).to.equal(2)
  });

  it("should allow an entity to be selected", function (done) {
    const list: List = {
      tabs: [{ id: 'test', selected: false }]
    }
    const { select, state } = Tabbed(list);

    expect(state.current).to.equal('none')
    const proxy = new Proxy(state, {
     set: (target, key, value) => {
        expect(target.current).to.equal('test')
        const tab = target.tabs.find((tab: Tab) => {
          return tab.id === "test"
        })
        expect(tab.selected).to.equal(true)
        done()
        return value
      }
    })

    select('test')
    // Force the proxy into a change,
    // so we can check the previous update
    // via the select method worked
    proxy.current = 'force_update'
  });

  it("should allow only one entity to be selected", function (done) {
    const list: List = {
      tabs: [
        { id: 'test', selected: true },
        { id: 'test-2', selected: false },
        { id: 'test-3', selected: true }
      ]
    }
    const { select, state } = Tabbed(list);

    const proxy = new Proxy(state, {
      set: (target, key, value) => {
        const test: Tab = target.tabs.find((tab: Tab) => {
          return tab.id === "test"
        })
        const test3: Tab = target.tabs.find((tab: Tab) => {
          return tab.id === "test-3"
        })

        expect(test.selected).to.equal(false)
        expect(test3.selected).to.equal(false)
        done()
        return value
      }
    })

    select('test-2')
    // Force the proxy into a change,
    // so we can check the previous update
    // via the select method worked
    proxy.current = 'force_update'
  });

  it("should update current if selected at instantiation", function (done) {
    const list: List = {
      tabs: [
        { id: 'test', selected: true },
        { id: 'test-2', selected: false },
        { id: 'test-3', selected: true }
      ]
    }

    const { state } = Tabbed(list);
    const proxy = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.current).to.equal('test')
        done()
        return value
      }
    })
    proxy.current = 'force_update'
  });
})