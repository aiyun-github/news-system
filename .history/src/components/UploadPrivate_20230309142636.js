import React, { useState, useEffect } from "react";
import { Upload, Modal } from "@m-design/mui";
import { CloudUploadOutlined } from '@ant-design/icons'
import { message } from "antd";
function mergeFileList(fileList, callback) {
  let status = fileList.reduce((total, current) => {
    return total && (current.status !== 'uploading')
  }, true)
  if (status) {
    callback()
  }
}

function UploadPrivate(props) {
  const { value, onChange } = props;
  const [fileLists, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const uploadProps = {
    name: "files",
    // action: SINO_RISK.env + "/limitApply/uploadData",
    action: "/limitApply/uploadData",
    accept: '.ppt, .pptx, .ppsx, .doc, .docx, application/msword, application/pdf, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, image/jpeg, image/png, image/bmp, .mp3, video/ogg, .ogg, .wav, .mkv, .mov, .mp4, .webm,.html',
    maxSize: 100,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
    },
    "onChange": ({ file, fileList }) => {
      let resList = []
      setFileList(fileList)
      if (file.status === "done") {
        const response = file.response
        if (response.code !== 0) {
          fileList.forEach(v => {
            // eslint-disable-next-line no-unused-expressions
            v.uid === file.uid ? v.status = "error" : ''
          })
          setFileList(fileList)
        }
        message.success(`${file.name}提交成功`)
        fileList.forEach(v => {
          if (v.url) {
            resList.push(v.url)
          } else if (v.status === 'done') {
            resList.push(...v.response.result)
          }
        })
        mergeFileList(fileList, () => {
          onChange(resList.join(','))
        })
      }
    },
  };
  const onRemove = (e) => {
    let current = fileLists.filter(v => {
      return v.uid !== e.uid
    })
    onChange(current.map(v=>v.url).join(','))
  }
  // 附件图片预览
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.name);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleCancel = () => setPreviewOpen(false);
  useEffect(() => {
    let temp
    if (!value) temp = []
    else temp = value?.split(",").map((v) => {
      return {
        uid: v,
        name: v,
        status: "done",
        url: v,
      };
    });
    setFileList(temp)
  }, [props]);
  return (
    <>
      <Upload
        {...uploadProps}
        multiple
        listType="picture-card"
        fileList={fileLists}
        onPreview={handlePreview}
        onRemove={onRemove}
      >
        <CloudUploadOutlined />
      </Upload>
      <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} size="200px">
        <img
          alt="example"
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}

export default UploadPrivate
