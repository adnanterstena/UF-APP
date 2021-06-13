import React, { Component } from 'react';
import axios from "axios";

export class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filesTable: [],
      file:[],
      showUploadMSG: false,
      AuthorizationMSG: false,   
    };
  }
  componentDidMount(){
    this.fetchFilesTbl();
  }

  handleUploadClick = (e) =>{
    e.preventDefault();

    const url = `/api/upload/file`;
    const formData = new FormData();
    formData.append('body', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config).then(resp => {
      if(resp.status === 200){
        this.setState({file: [], showUploadMSG: true})
        this.fetchFilesTbl();
      }
    });
  
  }


  onChange(e){
    let files = e.target.files[0];
    this.setState({file: files})
  }


  fetchFilesTbl(){
    axios.get(`api/upload/GetFiles`)
    .then( (response) => {
    if(response.status === 200){
      console.log(response.data)
      this.setState({filesTable: response.data})
    }
    else
    {
      this.setState({AuthorizationMSG: true});        
    }
    })
    .catch( () => {
        this.setState({AuthorizationMSG: true});
    }); 
  }

  

  render () {
    return (
      <div>
            {this.state.AuthorizationMSG ? <p className="text-danger p-2 text-center">You are not authorized for this page! </p>:""}
        
        <br />
        <div className="form-group row pt-4 pb-5" style={{textAlign: "center"}}>
          <input className="pl-5 ml-5 col-md-4" type="file" name="file" onChange={(e)=>this.onChange(e)} />
          <button className="btn btn-primary" onClick={this.handleUploadClick}>Upload</button>      
          {this.state.showUploadMSG? <p className="text-success pl-4 pt-2">Uploaded successfully!</p>:""}
        </div>
        
        
        
        <hr />


        <table className="table table-striped container-fluid table-bordered text-center mt-5">
        <thead className="thead-dark">
                            <tr>
                                <th></th>
                                <th>File Name</th>
                                <th>Size (bytes)</th>
                                <th>Upload Date</th>
                            </tr>
                        </thead>
          <tbody>
          {this.state.filesTable.map((item) => (
              <tr key={item.id}>
                  <td><p className="text text-primary">{this.state.filesTable.indexOf(item)+1}.</p> </td>
                  <td><p className="text text-primary">{item.fileName}</p> </td>
                  <td><p className="text text-primary">{item.length.toString()}</p> </td>

                  <td><p className="text text-primary">{new Intl.DateTimeFormat('en-GB', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                  }).format(new Date(item.dateTime))}</p> </td>
              </tr>
          ))}
          </tbody>

          </table>
        </div>
        
    );
  }
}


/**
 * 
axios({
  url: 'http://localhost:5000/static/example.pdf',
  method: 'GET',
  responseType: 'blob', // important
}).then((response) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'file.pdf');
  document.body.appendChild(link);
  link.click();
});
 */