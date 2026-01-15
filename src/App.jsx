import { useState } from "react";
import { Button, Space } from "antd";
import "./App.css";
import CalendarPickerWithSelect from "./components/CalendarPickerWithSelect";

const CalendarPickerTestPage = () => {
  // 测试用例状态
  const [controlledValue, setControlledValue] = useState(null);
  const [controlledOpen, setControlledOpen] = useState(false);
  const [testValue2, setTestValue2] = useState([new Date(2025, 5, 1), new Date(2025, 5, 15)]);
  const [testValue3, setTestValue3] = useState(["2026-06-01", "2026-06-15"]);
  const [testValue4, setTestValue4] = useState([new Date(2026, 0, 1), new Date(2026, 0, 15)]);
  const [testValue5, setTestValue5] = useState(null);
  const [testOpen1, setTestOpen1] = useState(false);
  const [testOpen2, setTestOpen2] = useState(false);

  return (
    <div className="calendar-picker-test-page">
      <div className="test-page-header">
        <h2 className="test-page-title">日期范围选择器测试用例</h2>
      </div>
      
      <div className="test-cases-container">
        {/* 测试用例 1: 非受控模式，默认值 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 1: 非受控模式（defaultValue）</h3>
          <CalendarPickerWithSelect
            defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
            onChange={(dates, dateStrings) => {
              console.log("测试用例1 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 2: 受控模式 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 2: 受控模式（value）</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <CalendarPickerWithSelect
              value={controlledValue}
              onChange={(dates, dateStrings) => {
                console.log("✅ 测试用例2 onChange:", { dates, dateStrings });
                setControlledValue(dates);
              }}
            />
            <Space wrap className="test-case-actions">
              <Button size="small" onClick={() => setControlledValue(null)}>
                清除值
              </Button>
              <Button size="small" onClick={() => setControlledValue([new Date(2026, 2, 1), new Date(2026, 2, 20)])}>
                设置值: 2026-03-01 ~ 2026-03-20
              </Button>
            </Space>
          </Space>
        </div>

        {/* 测试用例 3: 自定义占位符 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 3: 自定义占位符</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">数组格式：</p>
              <CalendarPickerWithSelect
                placeholder={["请选择开始日期", "请选择结束日期"]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例3-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">字符串格式：</p>
              <CalendarPickerWithSelect
                placeholder="选择日期"
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例3-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 4: 自定义日期格式 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 4: 自定义日期格式</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">格式：YYYY年MM月DD日</p>
              <CalendarPickerWithSelect
                format="YYYY年MM月DD日"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例4-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">格式：YYYY/MM/DD</p>
              <CalendarPickerWithSelect
                format="YYYY/MM/DD"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例4-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 5: 文本对齐方式 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 5: 文本对齐方式</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">左对齐（默认）：</p>
              <CalendarPickerWithSelect
                textAlign="left"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例5-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">居中：</p>
              <CalendarPickerWithSelect
                textAlign="center"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例5-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">右对齐：</p>
              <CalendarPickerWithSelect
                textAlign="right"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例5-3 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 6: 禁用状态 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 6: 禁用状态</h3>
          <CalendarPickerWithSelect
            disabled
            defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
            onChange={(dates, dateStrings) => {
              console.log("测试用例6 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 7: 不允许清除 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 7: 不允许清除（allowClear=false）</h3>
          <CalendarPickerWithSelect
            allowClear={false}
            defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
            onChange={(dates, dateStrings) => {
              console.log("测试用例7 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 8: 自定义标题和确认按钮 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 8: 自定义标题和确认按钮</h3>
          <CalendarPickerWithSelect
            title="选择日期范围"
            confirmText="确定"
            onChange={(dates, dateStrings) => {
              console.log("测试用例8 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 9: 隐藏标题 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 9: 隐藏标题（title=false）</h3>
          <CalendarPickerWithSelect
            title={false}
            onChange={(dates, dateStrings) => {
              console.log("测试用例9 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 10: 返回 Date 对象数组 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 10: 返回 Date 对象数组（returnFormat=false）</h3>
          <CalendarPickerWithSelect
            returnFormat={false}
            onChange={(dates, dateStrings) => {
              console.log("测试用例10 onChange:", { dates, dateStrings });
              console.log("dates 类型:", dates?.map(d => d instanceof Date ? "Date" : typeof d));
            }}
          />
        </div>

        {/* 测试用例 11: 受控的打开状态 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 11: 受控的打开状态（open）</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <Space wrap className="test-case-actions">
              <Button onClick={() => setControlledOpen(true)}>打开日历</Button>
              <Button onClick={() => setControlledOpen(false)}>关闭日历</Button>
            </Space>
            <CalendarPickerWithSelect
              open={controlledOpen}
              onOpenChange={(open) => {
                console.log("✅ 测试用例11 onOpenChange:", open);
                setControlledOpen(open);
              }}
              onChange={(dates, dateStrings) => {
                console.log("✅ 测试用例11 onChange:", { dates, dateStrings });
              }}
            />
          </Space>
        </div>

        {/* 测试用例 12: 自定义日期范围限制 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 12: 自定义日期范围限制（2025-2027）</h3>
          <p className="test-case-desc">
            测试点：min 和 max 限制日期选择范围，测试无限滚动是否在边界处停止
          </p>
          <CalendarPickerWithSelect
            min={new Date(2025, 0, 1)}
            max={new Date(2027, 11, 31)}
            defaultValue={[new Date(2026, 5, 1), new Date(2026, 5, 15)]}
            onChange={(dates, dateStrings) => {
              console.log("✅ 测试用例12 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 13: 字符串数组作为 value */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 13: 字符串数组作为 value（受控模式）</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <CalendarPickerWithSelect
              value={testValue3}
              onChange={(dates, dateStrings) => {
                console.log("✅ 测试用例13 onChange:", { dates, dateStrings });
                setTestValue3(dates);
              }}
            />
            <Button size="small" onClick={() => setTestValue3(["2026-07-01", "2026-07-20"])}>
              设置值: ["2026-07-01", "2026-07-20"]
            </Button>
          </Space>
        </div>

        {/* 测试用例 14: 空值测试 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 14: 空值测试</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">value=null：</p>
              <CalendarPickerWithSelect
                value={null}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例14-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">value=undefined（非受控模式）：</p>
              <CalendarPickerWithSelect
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例14-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 15: 组合测试 - 所有自定义配置 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 15: 组合测试（所有自定义配置）</h3>
          <p className="test-case-desc">
            测试点：同时使用多个自定义配置，检查是否有冲突
          </p>
          <CalendarPickerWithSelect
            placeholder={["开始", "结束"]}
            format="YYYY/MM/DD"
            textAlign="right"
            title="选择日期"
            confirmText="完成"
            returnFormat={false}
            min={new Date(2020, 0, 1)}
            max={new Date(2030, 11, 31)}
            defaultValue={[new Date(2026, 5, 1), new Date(2026, 5, 15)]}
            onChange={(dates, dateStrings) => {
              console.log("✅ 测试用例15 onChange:", { dates, dateStrings });
            }}
            onOpenChange={(open) => {
              console.log("✅ 测试用例15 onOpenChange:", open);
            }}
          />
        </div>

        {/* 测试用例 16: 边界值测试 - 只有开始日期 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 16: 边界值测试 - 只有开始日期</h3>
          <p className="test-case-desc">
            测试点：value=[startDate, null] 时，组件能正确处理
          </p>
          <CalendarPickerWithSelect
            value={[new Date(2026, 0, 1), null]}
            onChange={(dates, dateStrings) => {
              console.log("✅ 测试用例16 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 17: 样式和类名自定义 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 17: 样式和类名自定义</h3>
          <p className="test-case-desc">
            测试点：style 和 className props 是否正确应用
          </p>
          <CalendarPickerWithSelect
            style={{ border: "2px solid #1890ff", borderRadius: "8px" }}
            className="custom-calendar-picker"
            onChange={(dates, dateStrings) => {
              console.log("✅ 测试用例17 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 18: 快速切换值测试 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 18: 快速切换值测试</h3>
          <p className="test-case-desc">
            测试点：快速切换 value，检查组件是否能正确响应
          </p>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <Space wrap className="test-case-actions">
              <Button size="small" onClick={() => setTestValue2([new Date(2025, 0, 1), new Date(2025, 0, 15)])}>
                设置: 2025-01-01 ~ 2025-01-15
              </Button>
              <Button size="small" onClick={() => setTestValue2([new Date(2027, 5, 1), new Date(2027, 5, 20)])}>
                设置: 2027-06-01 ~ 2027-06-20
              </Button>
              <Button size="small" onClick={() => setTestValue2(null)}>
                清除
              </Button>
            </Space>
            <CalendarPickerWithSelect
              value={testValue2}
              onChange={(dates, dateStrings) => {
                console.log("✅ 测试用例18 onChange:", { dates, dateStrings });
                setTestValue2(dates);
              }}
            />
          </Space>
        </div>

        {/* 测试用例 19: value 和 defaultValue 同时传入 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 19: value 和 defaultValue 同时传入</h3>
          <p className="test-case-desc">
            测试点：同时传入 value 和 defaultValue，应该优先使用 value（受控模式）
          </p>
          <CalendarPickerWithSelect
            value={testValue4}
            defaultValue={[new Date(2020, 0, 1), new Date(2020, 0, 15)]}
            onChange={(dates, dateStrings) => {
              console.log("✅ 测试用例19 onChange:", { dates, dateStrings });
              setTestValue4(dates);
            }}
          />
          <Space wrap className="test-case-actions" style={{ marginTop: "8px" }}>
            <Button size="small" onClick={() => setTestValue4([new Date(2026, 0, 1), new Date(2026, 0, 15)])}>
              设置 value: 2026-01-01 ~ 2026-01-15
            </Button>
            <Button size="small" onClick={() => setTestValue4([new Date(2028, 5, 1), new Date(2028, 5, 15)])}>
              设置 value: 2028-06-01 ~ 2028-06-15
            </Button>
          </Space>
        </div>

        {/* 测试用例 20: 更多日期格式测试 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 20: 更多日期格式测试</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">格式：YYYY-MM（年月）</p>
              <CalendarPickerWithSelect
                format="YYYY-MM"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例20-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">格式：MM-DD（月日）</p>
              <CalendarPickerWithSelect
                format="MM-DD"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例20-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">格式：YY-M-D（短格式）</p>
              <CalendarPickerWithSelect
                format="YY-M-D"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例20-3 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 21: 极端日期值测试 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 21: 极端日期值测试</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">最小日期：1900-01-01</p>
              <CalendarPickerWithSelect
                value={[new Date(1900, 0, 1), new Date(1900, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例21-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">最大日期：2100-12-31</p>
              <CalendarPickerWithSelect
                value={[new Date(2100, 11, 1), new Date(2100, 11, 31)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例21-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">开始日期等于结束日期</p>
              <CalendarPickerWithSelect
                value={[new Date(2026, 5, 15), new Date(2026, 5, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例21-3 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 22: 日历打开时外部 value 变化 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 22: 日历打开时外部 value 变化</h3>
          <p className="test-case-desc">
            测试点：日历打开状态下，外部 value 变化应该同步更新显示
          </p>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <Space wrap className="test-case-actions">
              <Button size="small" onClick={() => setTestValue5([new Date(2025, 0, 1), new Date(2025, 0, 20)])}>
                设置: 2025-01-01 ~ 2025-01-20
              </Button>
              <Button size="small" onClick={() => setTestValue5([new Date(2027, 11, 1), new Date(2027, 11, 25)])}>
                设置: 2027-12-01 ~ 2027-12-25
              </Button>
              <Button size="small" onClick={() => setTestValue5(null)}>
                清除
              </Button>
            </Space>
            <CalendarPickerWithSelect
              value={testValue5}
              open={testOpen1}
              onOpenChange={(open) => {
                console.log("✅ 测试用例22 onOpenChange:", open);
                setTestOpen1(open);
              }}
              onChange={(dates, dateStrings) => {
                console.log("✅ 测试用例22 onChange:", { dates, dateStrings });
                setTestValue5(dates);
              }}
            />
            <Button size="small" onClick={() => setTestOpen1(true)}>
              打开日历（然后点击上面的设置按钮测试）
            </Button>
          </Space>
        </div>

        {/* 测试用例 23: 日历打开时外部 open 变化 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 23: 日历打开时外部 open 变化</h3>
          <p className="test-case-desc">
            测试点：通过外部控制 open，日历应该正确打开/关闭
          </p>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <Space wrap className="test-case-actions">
              <Button size="small" onClick={() => setTestOpen2(true)}>
                外部打开
              </Button>
              <Button size="small" onClick={() => setTestOpen2(false)}>
                外部关闭
              </Button>
            </Space>
            <CalendarPickerWithSelect
              open={testOpen2}
              onOpenChange={(open) => {
                console.log("✅ 测试用例23 onOpenChange:", open);
                setTestOpen2(open);
              }}
              onChange={(dates, dateStrings) => {
                console.log("✅ 测试用例23 onChange:", { dates, dateStrings });
              }}
            />
          </Space>
        </div>

        {/* 测试用例 24: 无效日期值处理 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 24: 无效日期值处理</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">无效字符串日期：</p>
              <CalendarPickerWithSelect
                value={["invalid-date", "2026-01-15"]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例24-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">空字符串数组：</p>
              <CalendarPickerWithSelect
                value={["", ""]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例24-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">无效 Date 对象（NaN）：</p>
              <CalendarPickerWithSelect
                value={[new Date("invalid"), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例24-3 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 25: placeholder 边界情况 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 25: placeholder 边界情况</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">空字符串 placeholder：</p>
              <CalendarPickerWithSelect
                placeholder=""
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例25-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">空数组 placeholder：</p>
              <CalendarPickerWithSelect
                placeholder={[]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例25-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">部分空字符串数组：</p>
              <CalendarPickerWithSelect
                placeholder={["开始日期", ""]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例25-3 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 26: textAlign 无效值 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 26: textAlign 无效值</h3>
          <p className="test-case-desc">
            测试点：传入无效的 textAlign 值，应该回退到默认值 'left'
          </p>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">textAlign="invalid"：</p>
              <CalendarPickerWithSelect
                textAlign="invalid"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例26-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">textAlign=""（空字符串）：</p>
              <CalendarPickerWithSelect
                textAlign=""
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例26-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 27: disabled 与其他属性组合 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 27: disabled 与其他属性组合</h3>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">disabled + allowClear=false：</p>
              <CalendarPickerWithSelect
                disabled
                allowClear={false}
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例27-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">disabled + open=true（应该无法打开）：</p>
              <CalendarPickerWithSelect
                disabled
                open={false}
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例27-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 28: title 为 ReactNode */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 28: title 为 ReactNode</h3>
          <p className="test-case-desc">
            测试点：title 可以是 ReactNode，不只是字符串
          </p>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">title 为带样式的元素：</p>
              <CalendarPickerWithSelect
                title={<span style={{ color: "#1890ff", fontWeight: "bold" }}>自定义标题样式</span>}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例28-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>

        {/* 测试用例 29: className 合并 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 29: className 合并</h3>
          <p className="test-case-desc">
            测试点：传入多个类名，应该正确合并
          </p>
          <CalendarPickerWithSelect
            className="custom-class-1 custom-class-2 custom-class-3"
            onChange={(dates, dateStrings) => {
              console.log("✅ 测试用例29 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 30: min 大于 max 边界情况 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 30: min 大于 max 边界情况</h3>
          <p className="test-case-desc">
            测试点：当 min 大于 max 时，组件应该如何处理（可能显示错误或使用默认范围）
          </p>
          <CalendarPickerWithSelect
            min={new Date(2027, 0, 1)}
            max={new Date(2025, 11, 31)}
            onChange={(dates, dateStrings) => {
              console.log("✅ 测试用例30 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 31: onChange 回调参数验证 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 31: onChange 回调参数验证</h3>
          <p className="test-case-desc">
            测试点：验证 onChange 回调的两个参数格式是否正确
          </p>
          <CalendarPickerWithSelect
            defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
            onChange={(dates, dateStrings) => {
              console.log("✅ 测试用例31 onChange:");
              console.log("  - dates 类型:", Array.isArray(dates) ? "数组" : typeof dates);
              console.log("  - dates 长度:", dates?.length);
              console.log("  - dateStrings 类型:", Array.isArray(dateStrings) ? "数组" : typeof dateStrings);
              console.log("  - dateStrings 长度:", dateStrings?.length);
              console.log("  - dates:", dates);
              console.log("  - dateStrings:", dateStrings);
            }}
          />
        </div>

        {/* 测试用例 32: onOpenChange 回调验证 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 32: onOpenChange 回调验证</h3>
          <p className="test-case-desc">
            测试点：验证 onOpenChange 回调在不同场景下是否正确触发
          </p>
          <CalendarPickerWithSelect
            onOpenChange={(open) => {
              console.log("✅ 测试用例32 onOpenChange:", open, typeof open === "boolean" ? "✓ 类型正确" : "✗ 类型错误");
            }}
            onChange={(dates, dateStrings) => {
              console.log("✅ 测试用例32 onChange:", { dates, dateStrings });
            }}
          />
        </div>

        {/* 测试用例 33: 快速连续操作 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 33: 快速连续操作</h3>
          <p className="test-case-desc">
            测试点：快速连续打开关闭、快速选择确认，检查是否有状态混乱
          </p>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <Space wrap className="test-case-actions">
              <Button size="small" onClick={() => {
                setTestValue4([new Date(2026, 0, 1), new Date(2026, 0, 15)]);
                setTimeout(() => setTestValue4([new Date(2026, 1, 1), new Date(2026, 1, 15)]), 100);
                setTimeout(() => setTestValue4([new Date(2026, 2, 1), new Date(2026, 2, 15)]), 200);
              }}>
                快速连续设置值
              </Button>
            </Space>
            <CalendarPickerWithSelect
              value={testValue4}
              onChange={(dates, dateStrings) => {
                console.log("✅ 测试用例33 onChange:", { dates, dateStrings });
                setTestValue4(dates);
              }}
            />
          </Space>
        </div>

        {/* 测试用例 34: 自定义分隔符 */}
        <div className="test-case-item">
          <h3 className="test-case-title">测试用例 34: 自定义分隔符</h3>
          <p className="test-case-desc">
            测试点：通过 separator prop 自定义日期范围之间的分隔符
          </p>
          <Space direction="vertical" className="test-case-content" style={{ width: "100%" }}>
            <div className="test-case-sub-item">
              <p className="test-case-desc">默认分隔符（→）：</p>
              <CalendarPickerWithSelect
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例34-1 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">分隔符：-</p>
              <CalendarPickerWithSelect
                separator="-"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例34-2 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">分隔符：~</p>
              <CalendarPickerWithSelect
                separator="~"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例34-3 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">分隔符：至</p>
              <CalendarPickerWithSelect
                separator="至"
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例34-4 onChange:", { dates, dateStrings });
                }}
              />
            </div>
            <div className="test-case-sub-item">
              <p className="test-case-desc">分隔符：ReactNode（带样式）</p>
              <CalendarPickerWithSelect
                separator={<span style={{ color: "#1890ff", fontWeight: "bold" }}>→</span>}
                defaultValue={[new Date(2026, 0, 1), new Date(2026, 0, 15)]}
                onChange={(dates, dateStrings) => {
                  console.log("✅ 测试用例34-5 onChange:", { dates, dateStrings });
                }}
              />
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default CalendarPickerTestPage;
