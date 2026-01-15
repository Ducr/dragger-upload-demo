# 日期范围选择器组件 - Calendar Picker With Select

基于 `antd-mobile` 的 `CalendarPicker` 封装的日期范围选择器组件，参考 Ant Design `DatePicker.RangePicker` 的 API 设计。

## 功能特性

- ✅ 支持受控和非受控模式
- ✅ 支持自定义日期格式
- ✅ 支持自定义占位符
- ✅ 支持文本对齐方式（左对齐、居中、右对齐）
- ✅ 支持自定义分隔符
- ✅ 支持日期范围限制（min/max）
- ✅ 支持无限滚动选择日期
- ✅ 支持禁用状态
- ✅ 支持清除功能
- ✅ 支持自定义标题和确认按钮文本
- ✅ 支持样式和类名自定义
- ✅ 完整的 TypeScript 类型支持（通过 JSDoc）

## 安装

```bash
npm install
# 或
yarn install
```

## 开发

```bash
npm start
# 或
yarn start
```

应用将在 [http://localhost:3000](http://localhost:3000) 打开。

## 构建

```bash
npm run build
# 或
yarn build
```

构建产物将输出到 `build` 目录。

## 部署

使用提供的部署脚本：

```bash
bash deploy.sh
```

## 使用示例

```jsx
import CalendarPickerWithSelect from './components/CalendarPickerWithSelect';

function App() {
  const [value, setValue] = useState(null);

  return (
    <CalendarPickerWithSelect
      value={value}
      onChange={(dates, dateStrings) => {
        console.log('选择的日期:', dates);
        console.log('格式化的日期字符串:', dateStrings);
        setValue(dates);
      }}
      placeholder={["开始日期", "结束日期"]}
      format="YYYY-MM-DD"
      separator="→"
    />
  );
}
```

## API 文档

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| placeholder | 占位符文本 | `string \| string[]` | `["开始日期", "结束日期"]` |
| format | 日期格式 | `string` | `"YYYY-MM-DD"` |
| value | 受控值 | `Array<Date \| string>` | - |
| defaultValue | 默认值 | `Array<Date \| string>` | - |
| onChange | 日期变化回调 | `(dates, dateStrings) => void` | - |
| onOpenChange | 打开/关闭回调 | `(open: boolean) => void` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `true` |
| open | 受控的打开状态 | `boolean` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| className | 自定义类名 | `string` | - |
| textAlign | 文本对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| title | 日期选择面板的标题 | `React.ReactNode \| false` | `"日期选择"` |
| confirmText | 确认按钮的文本 | `string` | `"确认"` |
| returnFormat | onChange 第一个参数返回格式 | `boolean` | `true` |
| min | 最小日期 | `Date` | `1900-01-01` |
| max | 最大日期 | `Date` | `2100-12-31` |
| separator | 日期范围分隔符 | `string \| React.ReactNode` | `"→"` |

### onChange 回调

```typescript
onChange?: (dates: Array<Date | string> | null, dateStrings: string[]) => void
```

- `dates`: 根据 `returnFormat` 配置，返回 `Date` 对象数组或格式化字符串数组
- `dateStrings`: 始终返回格式化字符串数组 `[startDateString, endDateString]`

## 技术栈

- React 17
- antd 4.x
- antd-mobile 5.x
- @ant-design/icons

## 许可证

MIT
