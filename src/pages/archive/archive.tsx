import React from "react";
import ServerApi from "../../server-api";
import "./archive.scss";
//@ts-ignore
import { useState } from "react";
import addIcon from "src/assets/add.svg";
import { createRef } from "react";
import { useRef } from "react";
import { FormEvent } from "react";


function Archive()
{
  const serverApi = new ServerApi();
  const [isActive, setIsActive] = useState(false);
  const [directoryId, setDirectoryId] = useState<string>();
  function drop(e: React.DragEvent<HTMLDivElement>)
  {
    e.preventDefault();
    const files = e.dataTransfer.files

    serverApi.postFiles(files)
      .then(responseId => setDirectoryId(responseId));

    setIsActive(false);
  }

  function dragOver(e: React.DragEvent<HTMLDivElement>)
  {
    e.preventDefault();
  }

  function dragEnter()
  {
    setIsActive(true);
  }

  function dragLeave()
  {
    setIsActive(false);
  }

  function addClick(){
    // не работает только в дебаггере
    inputRef.current?.click();
  }

  function inputFiles(e: FormEvent<HTMLInputElement>){
    e.preventDefault();
    const formData = new FormData();
    const files = (e.target as HTMLInputElement).files;
    if (!files || files.length === 0){
      return;
    }

    serverApi.postFiles(files)
      .then(responseId => setDirectoryId(responseId));
  }

  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <>
      <div className="wrapper">
        <header><h2>archive page</h2></header>
        <div className="drop-area" onDrop={drop} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave}>
          <div className={`add-controls ${isActive && "active"}`}>
            <input className="hidden" type="file" multiple={true} ref={inputRef} onInput={inputFiles}/>
            <img className="add-icon" src={addIcon} onClick={addClick} />
            <span>Drop files here</span>
          </div>
        </div>
        {directoryId && <a className="download-link" href={serverApi.buildDownloadLink(directoryId)} download="archive.zip">download</a>}
      </div>
    </>
  );
}

export default Archive;