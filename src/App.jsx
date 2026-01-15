import { useCallback, useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined, DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./App.css";

const { Dragger } = Upload;

const UploadAudio = () => {
  const [fileList, setFileList] = useState([]);

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

  return (
    <div className="upload-audio-container">
      <Dragger
        className="upload-audio-content"
        fileList={fileList}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        accept=".mp3,.wav,.m4a"
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
              <span>选择文件上传，支持音频格式：mp3,wav,m4a</span>
            </p>
          </>
        )}
      </Dragger>
    </div>
  );
};

export default UploadAudio;