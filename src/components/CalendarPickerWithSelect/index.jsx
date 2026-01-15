import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { CalendarPicker } from "antd-mobile";
import { CalendarOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";

// 常量定义
const DEFAULT_MIN_DATE = new Date(1900, 0, 1);
const DEFAULT_MAX_DATE = new Date(2100, 11, 31);
const DEFAULT_RANGE_MONTHS = 12;
const EXTEND_MONTHS = 12;
const SCROLL_THRESHOLD = 500; // 滚动触发阈值（px）
const SCROLL_DEBOUNCE_TIME = 200; // 滚动防抖时间（ms）
const SCROLL_LISTENER_DELAY = 500; // 滚动监听器延迟（ms）

/**
 * 日期范围选择器组件
 * 参考 Ant Design DatePicker.RangePicker 的 API 设计
 * 
 * @param {string|string[]} placeholder - 占位符文本，可以是字符串或数组 [开始日期占位符, 结束日期占位符]
 * @param {string} format - 日期格式，默认 "YYYY-MM-DD"
 * @param {Array} value - 受控值，日期数组 [startDate, endDate]
 * @param {Array} defaultValue - 默认值，日期数组 [startDate, endDate]
 * @param {Function} onChange - 日期变化回调，参数为 (dates, dateStrings)
 * @param {Function} onOpenChange - 打开/关闭回调，参数为 (open)
 * @param {boolean} disabled - 是否禁用
 * @param {boolean} allowClear - 是否显示清除按钮
 * @param {boolean} open - 受控的打开状态
 * @param {Object} style - 自定义样式
 * @param {string} className - 自定义类名
 * @param {string} textAlign - 文本对齐方式，可选值：'left' | 'center' | 'right'，默认 'left'
 * @param {React.ReactNode|false} title - 日期选择面板的标题，默认 "日期选择"，设置为 false 可隐藏标题
 * @param {string} confirmText - 确认按钮的文本，默认 "确认"
 * @param {boolean} returnFormat - onChange 第一个参数返回格式，true 返回格式化字符串数组，false 返回 Date 对象数组（默认 true，返回字符串格式更常用）
 * @param {Date} min - 可选的最小日期，默认不限制（设置为 1900-01-01）
 * @param {Date} max - 可选的最大日期，默认不限制（设置为 2100-12-31）
 * @param {string|React.ReactNode} separator - 日期范围分隔符，默认 "→"，可以是字符串或 React 节点
 */
const CalendarPickerWithSelect = ({
  placeholder = ["开始日期", "结束日期"],
  format = "YYYY-MM-DD",
  value,
  defaultValue,
  onChange,
  onOpenChange,
  disabled = false,
  allowClear = true,
  open,
  style,
  className = "",
  textAlign = "left", // 'left' | 'center' | 'right'
  title = "日期选择", // 自定义标题，false 可隐藏
  confirmText = "确认", // 确认按钮文本
  returnFormat = true, // true: 第一个参数返回字符串数组，false: 返回 Date 对象数组（默认 true）
  min = DEFAULT_MIN_DATE, // 最小日期，默认 1900-01-01
  max = DEFAULT_MAX_DATE, // 最大日期，默认 2100-12-31
  separator = "→", // 日期范围分隔符，默认 "→"
  ...restProps
}) => {
  const [visible, setVisible] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || null);
  const [tempValue, setTempValue] = useState(null); // 临时存储选择过程中的日期
  const containerRef = useRef(null);
  const isFocusedRef = useRef(false);
  
  // 动态范围扩展状态，用于无限滚动
  const [extendedRange, setExtendedRange] = useState({ minExtension: 0, maxExtension: 0 });
  const scrollCheckRef = useRef(false); // 防止重复触发滚动检查

  // 使用受控或非受控值
  const currentValue = value !== undefined ? value : internalValue;
  
  // 初始范围计算（基于当前选择的日期）
  const initialRange = useMemo(() => {
    const now = new Date();
    
    // 获取基础日期，确保是 Date 对象
    const getBaseDate = () => {
      // 优先使用临时值（选择过程中）
      const tempDate = tempValue?.[0] || tempValue?.[1];
      if (tempDate) {
        const date = tempDate instanceof Date ? tempDate : new Date(tempDate);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      
      // 然后使用当前值
      const currentDate = currentValue?.[0] || currentValue?.[1];
      if (currentDate) {
        const date = currentDate instanceof Date ? currentDate : new Date(currentDate);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      
      // 最后使用当前日期
      return now;
    };
    
    const baseDate = getBaseDate();
    const baseYear = baseDate.getFullYear();
    const baseMonth = baseDate.getMonth();
    
    return {
      baseYear,
      baseMonth,
      rangeMonths: DEFAULT_RANGE_MONTHS
    };
  }, [currentValue, tempValue]);
  
  // 动态计算优化后的日期范围，支持无限滚动扩展
  const optimizedRange = useMemo(() => {
    const { baseYear, baseMonth, rangeMonths } = initialRange;
    
    // 计算扩展后的范围
    const extendedMinMonths = rangeMonths + extendedRange.minExtension;
    const extendedMaxMonths = rangeMonths + extendedRange.maxExtension;
    
    const optimizedMin = new Date(baseYear, baseMonth - extendedMinMonths, 1);
    const optimizedMax = new Date(baseYear, baseMonth + extendedMaxMonths + 1, 0); // 月末
    
    // 确保不超过用户设置的 min/max 边界
    const finalMin = min && min > optimizedMin ? min : optimizedMin;
    const finalMax = max && max < optimizedMax ? max : optimizedMax;
    
    return { min: finalMin, max: finalMax };
  }, [initialRange, extendedRange, min, max]);
  
  // 用于 CalendarPicker 的受控值
  // 优先使用临时值（选择过程中），否则使用当前值
  // 确保始终是受控的（不为 undefined），并且是 Date 对象数组
  const calendarValue = useMemo(() => {
    const valueToUse = tempValue !== null ? tempValue : (currentValue || null);
    
    if (!valueToUse || !Array.isArray(valueToUse)) return null;
    
    // 确保值是 Date 对象数组，保持数组结构 [startDate, endDate]
    // 如果日期无效，保持 null 而不是过滤掉，以保持数组结构
    return valueToUse.map(date => {
      if (!date) return null;
      try {
        const dateObj = date instanceof Date ? date : new Date(date);
        return !isNaN(dateObj.getTime()) ? dateObj : null;
      } catch (e) {
        return null;
      }
    });
  }, [tempValue, currentValue]);

  // 格式化日期 - 使用 useCallback 优化
  const formatDate = useCallback((date) => {
    if (!date) return "";
    
    // 处理 Date 对象、时间戳或字符串
    const d = date instanceof Date ? date : new Date(date);
    
    // 检查日期是否有效
    if (isNaN(d.getTime())) {
      return "";
    }
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    
    return format
      .replace(/YYYY/g, year)
      .replace(/YY/g, String(year).slice(-2))
      .replace(/MM/g, month)
      .replace(/DD/g, day)
      .replace(/M/g, d.getMonth() + 1)
      .replace(/D/g, d.getDate());
  }, [format]);

  // 获取占位符文本 - 使用 useCallback 优化
  const getPlaceholder = useCallback((index) => {
    if (Array.isArray(placeholder)) {
      return placeholder[index] || "";
    }
    return index === 0 ? placeholder : "";
  }, [placeholder]);

  // 解析日期范围值（从 CalendarPicker 返回的值）
  const parseDateRange = useCallback((val) => {
    let start = null;
    let end = null;

    if (Array.isArray(val)) {
      [start, end] = val;
    } else if (val && typeof val === 'object') {
      // 处理对象格式 { start: Date, end: Date }
      start = val.start || val[0] || null;
      end = val.end || val[1] || null;
    }

    return { start, end };
  }, []);

  // 处理日历选择器变化（选择过程中的临时值）
  const handleCalendarChange = useCallback((val) => {
    const { start, end } = parseDateRange(val);

    // 如果没有开始日期，不更新
    if (!start) {
      return;
    }

    // 只更新临时值，不立即更新最终值和触发 onChange
    const newTempValue = [start, end || null];
    setTempValue(newTempValue);
  }, [parseDateRange]);

  // 处理确认按钮点击（只有确认时才保存并关闭）
  const handleConfirm = useCallback((val) => {
    const { start, end } = parseDateRange(val);

    if (!start) {
      return;
    }

    const newValue = [start, end || null];
    
    // 更新内部状态（非受控模式）
    if (value === undefined) {
      setInternalValue(newValue);
    }

    // 触发 onChange 回调（受控和非受控模式都需要）
    if (onChange) {
      const dateStrings = [
        start ? formatDate(start) : "",
        end ? formatDate(end) : "",
      ];
      
      // 根据 returnFormat 决定第一个参数的格式
      if (returnFormat) {
        // 返回格式化字符串数组
        onChange(dateStrings, dateStrings);
      } else {
        // 返回 Date 对象数组（符合 antd RangePicker API）
        onChange(newValue, dateStrings);
      }
    }

    // 清除临时值
    setTempValue(null);
    
    // 关闭日历
    isFocusedRef.current = false;
    setVisible(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  }, [parseDateRange, value, onChange, formatDate, returnFormat, onOpenChange]);

  // 处理日历关闭（点击 X、遮罩或外部）
  const handleClose = useCallback(() => {
    isFocusedRef.current = false;
    const newVisible = false;
    setVisible(newVisible);
    // 关闭时清除临时值，不保存未确认的选择
    setTempValue(null);
    if (onOpenChange) {
      onOpenChange(newVisible);
    }
  }, [onOpenChange]);

  // 处理容器点击/聚焦
  const handleFocus = useCallback((e) => {
    if (disabled) return;
    // 如果点击的是清除按钮，不打开日历
    if (e.target.closest('.clear-icon')) {
      return;
    }
    isFocusedRef.current = true;
    const newVisible = true;
    setVisible(newVisible);
    if (onOpenChange) {
      onOpenChange(newVisible);
    }
  }, [disabled, onOpenChange]);

  // 处理点击清除
  const handleClear = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // 如果日历是打开的，先关闭
    if (visible) {
      handleClose();
    }
    
    const newValue = null;
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue, ["", ""]);
    }
  }, [visible, handleClose, value, onChange]);

  // 处理受控的 open prop
  useEffect(() => {
    if (open !== undefined) {
      setVisible(open);
    }
  }, [open]);

  // 当外部 value 变化时，同步更新并清除临时值
  useEffect(() => {
    if (value !== undefined) {
      setTempValue(null);
    }
  }, [value]);

  // 无限滚动：监听滚动事件，动态扩展日期范围
  useEffect(() => {
    if (!visible) return;

    let calendarContainer = null;
    let cleanup = null;
    let scrollTimer = null;

    const handleScroll = () => {
      if (scrollCheckRef.current) return;
      
      // 防抖处理
      scrollCheckRef.current = true;
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(() => {
        scrollCheckRef.current = false;
      }, SCROLL_DEBOUNCE_TIME);

      if (!calendarContainer) {
        // 尝试多种选择器来找到滚动容器
        calendarContainer = 
          document.querySelector('.adm-calendar-picker-body') || 
          document.querySelector('.adm-calendar-body') ||
          document.querySelector('.adm-calendar-picker .adm-scroll-view') ||
          document.querySelector('[class*="calendar"][class*="body"]') ||
          document.querySelector('[class*="scroll-view"]');
      }
      
      if (!calendarContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = calendarContainer;
      
      // 检查是否接近底部（向下滚动）
      const isNearBottom = scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD;
      if (isNearBottom) {
        setExtendedRange(prev => {
          // 检查是否已经达到用户设置的 max 边界
          const { baseYear, baseMonth, rangeMonths } = initialRange;
          const currentMax = new Date(baseYear, baseMonth + rangeMonths + prev.maxExtension + 1, 0);
          const canExtend = !max || currentMax < max;
          
          if (canExtend) {
            return {
              ...prev,
              maxExtension: prev.maxExtension + EXTEND_MONTHS
            };
          }
          return prev;
        });
      }
      
      // 检查是否接近顶部（向上滚动）
      const isNearTop = scrollTop < SCROLL_THRESHOLD;
      if (isNearTop) {
        setExtendedRange(prev => {
          // 检查是否已经达到用户设置的 min 边界
          const { baseYear, baseMonth, rangeMonths } = initialRange;
          const currentMin = new Date(baseYear, baseMonth - rangeMonths - prev.minExtension, 1);
          const canExtend = !min || currentMin > min;
          
          if (canExtend) {
            return {
              ...prev,
              minExtension: prev.minExtension + EXTEND_MONTHS
            };
          }
          return prev;
        });
      }
    };

    // 延迟添加监听器，确保 DOM 已渲染
    const timer = setTimeout(() => {
      // 尝试多种选择器来找到滚动容器
      calendarContainer = 
        document.querySelector('.adm-calendar-picker-body') || 
        document.querySelector('.adm-calendar-body') ||
        document.querySelector('.adm-calendar-picker .adm-scroll-view') ||
        document.querySelector('[class*="calendar"][class*="body"]') ||
        document.querySelector('[class*="scroll-view"]');
      
      if (calendarContainer) {
        calendarContainer.addEventListener('scroll', handleScroll, { passive: true });
        
        cleanup = () => {
          if (scrollTimer) {
            clearTimeout(scrollTimer);
          }
          calendarContainer.removeEventListener('scroll', handleScroll);
        };
      } else {
        // 如果找不到，尝试监听整个文档的滚动（作为后备方案）
        document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        cleanup = () => {
          if (scrollTimer) {
            clearTimeout(scrollTimer);
          }
          document.removeEventListener('scroll', handleScroll, { capture: true });
        };
      }
    }, SCROLL_LISTENER_DELAY);

    return () => {
      clearTimeout(timer);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      if (cleanup) {
        cleanup();
      }
    };
  }, [visible, initialRange, min, max]);

  // 点击外部关闭（排除日历面板内部的所有点击）
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 检查是否点击在日历面板内部（包括所有 antd-mobile 日历相关的类名）
      const isInsideCalendar = 
        event.target.closest(".adm-calendar") ||
        event.target.closest(".adm-calendar-picker") ||
        event.target.closest("[class*='adm-calendar']") ||
        event.target.closest("[class*='calendar']");
      
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !isInsideCalendar
      ) {
        if (isFocusedRef.current) {
          handleClose();
        }
      }
    };

    if (visible) {
      // 使用 setTimeout 确保在 CalendarPicker 的事件处理之后执行
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [visible, handleClose]);
  
  // 当日历关闭时，重置扩展范围
  useEffect(() => {
    if (!visible) {
      setExtendedRange({ minExtension: 0, maxExtension: 0 });
    }
  }, [visible]);

  // 验证 textAlign 值 - 使用 useMemo 优化
  const validTextAlign = useMemo(() => {
    return ['left', 'center', 'right'].includes(textAlign) ? textAlign : 'left';
  }, [textAlign]);
  
  // 显示值：优先使用当前值（受控或非受控），确保确认后的值能正确显示
  const displayValue = useMemo(() => {
    if (!currentValue) return { startDateStr: "", endDateStr: "", hasValue: false };
    
    const startDateStr = currentValue[0] ? formatDate(currentValue[0]) : "";
    const endDateStr = currentValue[1] ? formatDate(currentValue[1]) : "";
    const hasValue = !!(startDateStr || endDateStr);
    
    return { startDateStr, endDateStr, hasValue };
  }, [currentValue, formatDate]);
  
  const { startDateStr, endDateStr, hasValue } = displayValue;

  return (
    <div
      ref={containerRef}
      className={`calendar-picker-with-select ${className} ${disabled ? "disabled" : ""} ${visible ? "focused" : ""}`}
      style={style}
      onFocus={handleFocus}
      tabIndex={disabled ? -1 : 0}
      {...restProps}
    >
      <div className="date-range-input" onClick={handleFocus}>
        <div 
          className={`date-item start-date text-align-${validTextAlign}`}
          style={{ textAlign: validTextAlign }}
        >
          {startDateStr || (
            <span className="placeholder">{getPlaceholder(0)}</span>
          )}
        </div>
        <div className="date-separator">
          <span className="arrow">{separator}</span>
        </div>
        <div 
          className={`date-item end-date text-align-${validTextAlign}`}
          style={{ textAlign: validTextAlign }}
        >
          {endDateStr || (
            <span className="placeholder">{getPlaceholder(1)}</span>
          )}
        </div>
        {allowClear && hasValue && (
          <div className="clear-icon" onClick={handleClear}>
            <CloseCircleOutlined />
          </div>
        )}
        <div className="calendar-icon">
          <CalendarOutlined />
        </div>
      </div>
      <CalendarPicker
        visible={visible}
        selectionMode="range"
        value={calendarValue}
        title={title}
        confirmText={confirmText}
        min={optimizedRange.min}
        max={optimizedRange.max}
        onClose={handleClose}
        onMaskClick={handleClose}
        onChange={handleCalendarChange}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default CalendarPickerWithSelect;
