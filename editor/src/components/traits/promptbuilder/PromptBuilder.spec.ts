import { PromptBuilder, Prompt} from './PromptBuilder'
import { expect, assert } from "chai";

describe('PromptBuilder trait', function() {
  it('should throw an error if no prompt id given', function () {
    const ag: any = {}
    assert.throws(() => PromptBuilder(ag),
      Error, "No id property found. Please add one"
    );
  })

  it('must support editing the prompt text', function(done) {
    const prompt: Prompt = {
      id: `test-id`,
      text: `a prompt`
    }

    const { update, state, setView, editing } = PromptBuilder(prompt)
    
    const proxy1 = new Proxy(editing, {
      set: (target, key, value) => {
        expect(target.text).to.equal(true)
        return value
      }
    })

    const proxy2 = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.view).to.equal('none')
        expect(target.text).to.equal('an updated prompt')
        return value
      }
    })

    const proxy3 = new Proxy(editing, {
      set: (target, key, value) => {
        expect(target.text).to.equal(false)
        done()
        return value
      }
    })

    setView('text')
    // Force the proxy into a change,
    // Value set here is ignored
    proxy1.text = true

    update('text', 'an updated prompt')
    // Force the proxy into a change,
    // Value set here is ignored
    proxy2.text = 'ignored'
    proxy3.text = true
  })

  it('must support editing the prompt tags', function(done) {
    const prompt: Prompt = {
      id: `test-id`,
      text: `a prompt`
    }

    const { update, state, setView, editing } = PromptBuilder(prompt)

    const proxy1 = new Proxy(editing, {
      set: (target, key, value) => {
        expect(target.tag).to.equal(true)
        return value
      }
    })

    const proxy2 = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.tags?.length).to.equal(1)
        return value
      }
    })

    const proxy3 = new Proxy(editing, {
      set: (target, key, value) => {
        expect(target.tag).to.equal(false)
        done()
        return value
      }
    })

    setView('tag')
    // Force the proxy into a change,
    // Value set here is ignored
    proxy1.text = true

    update('tag', [{label: 'School Life', slug:'school-life'}])
    // Force the proxy into a change,
    // Value set here is ignored
    proxy2.tags = []
    proxy3.tag = true
  })

  it('must support saving the prompt text')
  it('must support saving the prompt tags')
  it('must support removal')
})