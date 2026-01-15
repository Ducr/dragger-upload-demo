import { useCallback, useState } from "react";
import { Upload, Radio } from "antd";
import { InboxOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./App.css";

const { Dragger } = Upload;

const UploadAudio = () => {
  const [fileList, setFileList] = useState([]);
  const [formatType, setFormatType] = useState("audio"); // "audio" 或 "all"

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
    return formatType === "audio" ? ".mp3,.wav,.m4a" : undefined;
  };

  const getFormatDescription = () => {
    return formatType === "audio" ? "音频格式：mp3,wav,m4a" : "任意类型文件";
  };

  return (
    <div className="upload-audio-container">
      <div className="format-selector" style={{ marginBottom: 16 }}>
        <Radio.Group
          value={formatType}
          onChange={(e) => setFormatType(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="audio">音频格式（.mp3,.wav,.m4a）</Radio.Button>
          <Radio.Button value="all">任意类型文件</Radio.Button>
        </Radio.Group>
      </div>
      
      <Dragger
        className="upload-audio-content"
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
              <div className="upload-audio-file" key={file.uid}>
                <div className="upload-audio-icon">
                  <InboxOutlined style={{ fontSize: 32, color: "#1890ff" }} />
                </div>
                <div className="upload-audio-info">
                  <div title={file.name} className="upload-audio-name">
                    {file.name}
                  </div>
                  <div className="upload-audio-status">
                    <CheckCircleOutlined style={{ color: "#00A650", marginRight: 4 }} />
                    已选择
                  </div>
                </div>
                <div className="upload-audio-delete" onClick={handleRemove}>
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
    </div>
  );
};

export default UploadAudio;