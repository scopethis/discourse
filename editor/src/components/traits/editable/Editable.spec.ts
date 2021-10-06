import { Editable, EditableData } from './Editable';

import { expect, assert } from "chai";

describe('Editable trait', function () {

  it('must have an id for tracking changes', function () {
    const data: EditableData = {
      id: '',
      value: ''
    }

    assert.throws(() => Editable(data),
      Error, "Editable content must have an id"
    );
  })

  it('should not allow edit if not in edit mode', function (done) {
    const data: EditableData = {
      id: 'country',
      value: 'england'
    }
    const { change, state } = Editable(data)
    const proxy = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.current).to.equal('england')
        done()
        return value
      }
    })
    change('france')
    // Force the proxy into a change,
    // so we can check the previous update,
    // via the edit method, worked
    proxy.id = 'ignored'
  })

  it('should allow edit if in edit mode', function (done) {
    const data: EditableData = {
      id: 'country',
      value: 'england'
    }
    const { edit, change, state } = Editable(data)
    const proxy = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.current).to.equal('france')
        done()
        return value
      }
    })
    edit()
    change('france')
    // Force the proxy into a change,
    // so we can check the previous update,
    // via the edit method, worked
    proxy.id = 'ignored'
  })

  it('should accept changes when asked', function (done) {
    const data: EditableData = {
      id: 'country',
      value: 'belgium'
    }
    const { edit, change, state, save } = Editable(data)
    const proxy = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.value).to.equal('france')
        done()
        return value
      }
    })
    edit()
    change('france')
    save()
    // Force the proxy into a change,
    // so we can check the previous update,
    // via the edit method, worked
    proxy.id = 'ignored'
  })

  it('should reject changes when asked', function (done) {
    const data: EditableData = {
      id: 'country',
      value: 'germany'
    }
    const { edit, change, state, cancel } = Editable(data)
    const proxy = new Proxy(state, {
      set: (target, key, value) => {
        expect(target.value).to.equal('germany')
        done()
        return value
      }
    })
    edit()
    change('italy')
    cancel()
    // Force the proxy into a change,
    // so we can check the previous update,
    // via the edit method, worked
    proxy.id = 'ignored'
  })

  it('should track changes')
  it('should implement undo')

})