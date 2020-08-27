import Vue from 'vue'
import PortalVue from 'portal-vue'

import {
  Button,
  Scrollbar,
  DatePicker,
  Tooltip,
  Select,
  Option,
  OptionGroup,
  Table,
  TableColumn,
  Pagination,
  ColorPicker,
  Loading,
  Progress,
  Message,
  MessageBox,
  Notification,
} from 'element-ui'

const element = {
  install: function(Vue: any) {
    Vue.use(Button)
    Vue.use(Scrollbar)
    Vue.use(DatePicker)
    Vue.use(Tooltip)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Pagination)
    Vue.use(ColorPicker)
    Vue.use(Progress)
    Vue.use(Loading.directive)
    Vue.use(PortalVue)
  },
}
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification

Vue.prototype.$ELEMENT = {
  size: 'small',
}

export default element
