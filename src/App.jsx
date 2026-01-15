import { useCallback, useState } from "react";
import { Upload, Select, Input } from "antd";
import { InboxOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./App.css";
import CalendarPickerWithSelect from "./components/CalendarPickerWithSelect";

const { Dragger } = Upload;
const { Option } = Select;

const DraggerUpload = () => {
  const [fileList, setFileList] = useState([]);
  const [formatType, setFormatType] = useState("audio"); // "audio", "all" 或 "custom"
  const [customFormats, setCustomFormats] = useState(".pdf,.doc,.docx,.txt");
  const [value, setValue] = useState(null);

  const handleBeforeUpload = useCallback((file) => {
    console.log("handleBeforeUpload---file", file);
    console.log("handleBeforeUpload---文件信息", {
      'name': file.name,
      'size': file.size,
      'type': file.type,
      'uid': file.uid,
      'lastModified': file.lastModified,
      'lastModifiedDate': new Date(file.lastModifiedDate).toLocaleString(),
    });
    // 返回 false 阻止默认上传行为，但文件会被添加到 fileList
    return false;
  }, []);

  const handleChange = useCallback((info) => {
    const { fileList: newFileList } = info;
    
    // 当 beforeUpload 返回 false 时，文件状态为 "done"
    // 我们只需要更新 fileList
    setFileList(newFileList);
  }, []);

  const handleRemove = useCallback(() => {
    setFileList([]);
  }, []);

  const getAcceptAttribute = () => {
    if (formatType === "audio") {
      return ".mp3,.wav,.m4a";
    } else if (formatType === "custom") {
      return customFormats;
    }
    return undefined;
  };

  const getFormatDescription = () => {
    if (formatType === "audio") {
      return "音频格式：mp3,wav,m4a";
    } else if (formatType === "custom") {
      return `自定义格式：${customFormats}`;
    }
    return "不限制格式";
  };

  return (
    <div className="file-upload-container">
      <div className="format-selector" style={{ marginBottom: 16 }}>
        <Select
          value={formatType}
          onChange={(value) => setFormatType(value)}
          style={{ width: '100%' }}
        >
          <Option value="audio">音频格式(.mp3,.wav,.m4a)</Option>
          <Option value="all">不限制格式</Option>
          <Option value="custom">自定义格式</Option>
        </Select>
      </div>
      
      {formatType === "custom" && (
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="请输入文件格式，如：.pdf,.doc,.txt"
            value={customFormats}
            onChange={(e) => setCustomFormats(e.target.value)}
            allowClear
          />
          <div style={{ marginTop: 4, fontSize: 12, color: "#666" }}>
            提示：多个格式用英文逗号分隔，如：.jpg,.png,.gif
          </div>
        </div>
      )}
      
      <Dragger
        className="file-upload-area"
        fileList={fileList}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        accept={getAcceptAttribute()}
        maxCount={1}
        showUploadList={false}
      >
        {fileList.length ? (
          <div onClick={(e) => e.stopPropagation()}>
            {fileList.map((file) => (
              <div className="uploaded-file-item" key={file.uid}>
                <div className="file-item-icon">
                  <InboxOutlined style={{ fontSize: 32, color: "#1890ff" }} />
                </div>
                <div className="file-item-info">
                  <div title={file.name} className="file-item-name">
                    {file.name}
                  </div>
                  <div className="file-item-status">
                    <CheckCircleOutlined style={{ color: "#00A650", marginRight: 4 }} />
                    已选择
                  </div>
                </div>
                <div className="file-item-delete" onClick={handleRemove}>
                  <DeleteOutlined />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              <span>选择文件上传，支持{getFormatDescription()}</span>
            </p>
          </>
        )}
      </Dragger>
      <div style={{ marginTop: "16px" }}></div>
      <CalendarPickerWithSelect
        value={value}
        onChange={(value) => {
          console.log("value====", value);
          setValue(value);
        }}
      />
    </div>
  );
};

export default DraggerUpload;