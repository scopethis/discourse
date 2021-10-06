import {Tag, Tagged} from './Tagged'
import { expect, assert } from "chai";

describe('Tags trait', function() {
  it('should support adding a tag', function(done) {
    const { state, add, edit } = Tagged()
    const proxy1 = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.current.length).to.equal(1)
        expect(target.current[0].slug).to.equal("england")
        done()
        return value
      }
    })

    edit()
    add("England")
    // Force the proxy into a change,
    // Value set here is ignored
    proxy1.tags = []
  })

  it('should support removing a tag', function(done) {
    const tags = [
      {slug: "france", label: "France"}
    ] 

    const { state, remove, edit } = Tagged(tags)
    const proxy1 = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.current.length).to.equal(0)
        done()
        return value
      }
    })

    edit()
    remove(tags[0])
    // Force the proxy into a change,
    // Value set here is ignored
    proxy1.tags = []
  })

  it('should accept changes when asked', function(done) {

    const { state, save, edit, add } = Tagged()
    const proxy1 = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.tags.length).to.equal(1)
        expect(target.tags[0].slug).to.equal("england")
        done()
        return value
      }
    })

    edit()
    add("England")
    save()
    // Force the proxy into a change,
    // Value set here is ignored
    proxy1.tags = []
  })

  it('should reject changes when asked', function(done) {
    const { state, cancel, edit, add } = Tagged()
    const proxy1 = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.tags.length).to.equal(0)
        done()
        return value
      }
    })

    edit()
    add("England")
    cancel()
    // Force the proxy into a change,
    // Value set here is ignored
    proxy1.tags = []
  })
})