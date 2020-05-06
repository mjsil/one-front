import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import AddIcon from "@material-ui/icons/Add";
import styles from "./Dropzone.module.css";

function Dropzone(props) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileExtension = file.name.slice(
        ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
      );
      for (let key of props.validFilesExtensions) {
        if (fileExtension === key) {
          props.onAddFile(file);
        }
      }
    },
    [props]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dropzoneStyle = [styles.Dropzone];
  const iconHolderStyle = [styles.iconHolder];
  let dropzoneText = "Arraste um arquivo ou clique aqui";

  if (isDragActive) {
    dropzoneStyle.push(styles.ActivatedDropzone);
    iconHolderStyle.push(styles.activatedIcon);
    dropzoneText = "Solte o arquivo";
  }

  return (
    <div {...getRootProps()} className={dropzoneStyle.join(" ")}>
      <input {...getInputProps()} multiple={false} />
      <div className={styles.mainContent}>
        <div className={iconHolderStyle.join(" ")}>
          <AddIcon style={{ fontSize: 60, color: "#c7c6c6" }} />
        </div>
        <h3>{dropzoneText}</h3>
      </div>
    </div>
  );
}

export default Dropzone;
