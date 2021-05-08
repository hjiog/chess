import {
  Button,
  Popover,
  Modal,
  InputNumber,
  Comment,
  Typography,
  Input,
} from 'ant-design-vue'
import { UserModule } from '~/common/types'

export const install: UserModule = ({ app }) => {
  app.use(Button)
  app.use(Popover)
  app.use(Modal)
  app.use(InputNumber)
  app.use(Comment)
  app.use(Typography)
  app.use(Input)
}
