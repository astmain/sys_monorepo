import { ajax_module } from '@src/test/ajax/ajax'
import { test_decimal_module } from '@src/test/test_decimal/test_decimal'

export const test_module = {
  title: 'test',
  description: '测试接口',
  imports: [ajax_module,test_decimal_module],
}
