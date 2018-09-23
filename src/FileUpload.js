import React, {Component} from 'react';

class FileUpload extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <progress value={this.props.percentaje} max="100">{this.uploadValue}%</progress>
                <br/>
                <input type="file" onChange={this.props.onUpload}/>
            </div>
        )
    }
}

export default FileUpload;