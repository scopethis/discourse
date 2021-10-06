import {reactive} from 'vue';

function Tabbed($list:List) {
  if (!$list.tabs.length) {
    throw new Error("tab list is empty");
  }

  $list.tabs.forEach((tab) => {
    if (tab.hasOwnProperty('id') && tab.id === "") {
      throw new Error("tab must have an id");
    }
  })

  const list = JSON.parse(JSON.stringify($list.tabs))

  const state = reactive({
    tabs: list,
    current: 'none'
  });

  state.tabs.forEach((tab: Tab) => {
    if(tab.selected) {
      select(tab.id)
    }
  })

  const none: Tab = {
    id: 'none',
    selected: false
  }

  state.tabs.push(none)

  function deselectAll() {
    list.forEach((tab: Tab) => {
      tab.selected = false
    })
  }

  function select(id:string) {
    deselectAll()
    const tab = list.find((tab:Tab) => {
      return tab.id === id
    })

    tab.selected = true
    state.current = tab.id
  }

  return {
    state,
    select
  }
}

type List = {
  tabs: Array<Tab>
}

type Tab = {
  id: string,
  selected: boolean
}

export {
  Tabbed,
  List,
  Tab
}