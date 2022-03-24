import React, {ChangeEvent, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Header, Progress, Segment, Table} from "semantic-ui-react";
import {toast, ToastContainer} from "react-toastify";
import {postOnServerWithForm} from "./helpers/AxiosHelper";
import AWSService from "./services/AWSService";
import AWSContent from "./models/AWSContent";

function App() {
    const [uploadData, setUploadData] = useState<File>()
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [uploadActive, setUploadActive] = useState<boolean>(false)
    const [awsData, setAwsData] = useState<AWSContent[]>([])

    useEffect(() => {
        const getAwsData = async () => {
            const data = await AWSService.getAwsData()
            setAwsData(data)
        }
        getAwsData().catch(console.error)
    }, [])

  function onUploadFile(e: ChangeEvent<HTMLInputElement>) {
    const blob = e.target?.files
    if(blob !== null) {
      setUploadData(blob[0])
    }
  }

  async function uploadFileToServer() {
      if(uploadData !== undefined) {
          let fd = new FormData()
          fd.append('new_file', uploadData)

          setUploadActive(true)
          const response = await postOnServerWithForm('uploadFile', (progress => {
              setUploadProgress(progress)
          }), fd)
          setUploadActive(false)

          if(response.status === 401) {
              toast.error(response.data)
          } else {
              toast.info(response.data)
              const data = await AWSService.getAwsData()
              setAwsData(data)
          }
      } else {
          toast.error('Please select a file to upload')
      }
  }

  function renderAWSContentTable() {
    return awsData.map((x, i) => {
        return <Table.Row>
            <Table.Cell>{x.Key}</Table.Cell>
            <Table.Cell>{x.ETag}</Table.Cell>
            <Table.Cell>{x.StorageClass}</Table.Cell>
            <Table.Cell>{x.LastModified}</Table.Cell>
            <Table.Cell>{x.ChecksumAlgorithm}</Table.Cell>
            <Table.Cell>{x.Size}</Table.Cell>
        </Table.Row>
    })
  }

  return (
    <div className={'mx-auto my-auto w-screen h-screen  bg-gradient-to-b from-orange-500 to-amber-400'}>
        <div className={'h-1/4 inline-block'}/>
        <div className={'flex flex-row justify-center items-center py-10'}>
            <Segment>
                <Header textAlign={'center'}>
                    Welcome to the file uploader! .txt files only please.
                </Header>
                <ToastContainer position={'top-center'}/>
                <div className={'flex flex-row items-center justify-center'}>
                    <input type={'file'} name={'profile-picture'} onChange={onUploadFile} accept={'text/plain'}/>
                    <Button primary onClick={uploadFileToServer}>Upload file</Button>
                </div>

                <div className={'pt-10'}>
                    <Progress active={uploadActive} color={'green'} percent={uploadProgress}/>
                </div>

                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Key</Table.HeaderCell>
                            <Table.HeaderCell>ETag</Table.HeaderCell>
                            <Table.HeaderCell>Storage Class</Table.HeaderCell>
                            <Table.HeaderCell>Last Modified</Table.HeaderCell>
                            <Table.HeaderCell>Checksum Algorithm</Table.HeaderCell>
                            <Table.HeaderCell>Size</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { renderAWSContentTable() }
                    </Table.Body>
                </Table>
            </Segment>
        </div>
    </div>
  );
}

export default App;
