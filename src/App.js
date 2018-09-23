import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import FileUpload from './FileUpload';

class App extends Component {
    constructor(){
        super();
        this.state = {
            user:null,
            pictures:[],
            uploadValue:0
        }
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
              this.setState({user});
        });
        firebase.database().ref('pictures').on('child_added', snapshot => {
            this.setState({
                pictures:this.state.pictures.concat(snapshot.val())
            })
            console.log(this.state.pictures)
        })
    }
    handleUpload(event){
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref('/fotos/'+file.name);
        const task = storageRef.put(file);
        task.on('state_changed', snapshot => {
            let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentaje)
            this.setState({
                uploadValue:percentaje
            })
        },error => {
            console.log(error.message)
        },() => {
            task.snapshot.ref.getDownloadURL().then( (downloadURL) => {
                const record = {
                    photoUrl: this.state.user.photoURL,
                    displayName: this.state.user.displayName,
                    image: downloadURL
                };
                const dbRef = firebase.database().ref('pictures');
                const newPictures = dbRef.push();
                newPictures.set(record);
            });

        });

    }

    handleAuth(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                console.log(result.user);
                console.log(result.user.email+" ha iniciado sesion");
            })
            .catch(err => {
                alert(err)
            })
    }
    handleLogout(){
        firebase.auth().signOut()
            .then(result => {
                console.log("ha Salido");
            })
            .catch(err => {
                alert(err)
            })
    }
    renderLoginButton(){
        if(this.state.user){
            return (
                <div>
                    <div className="user-zone">
                        <img className="user-image" src={this.state.user.photoURL} width="150px" alt={this.state.user.displayName}/>
                        <div className="user-info">
                            <h3>{this.state.user.displayName}</h3>
                            <button onClick={this.handleLogout.bind(this)}>Salir</button>
                        </div>
                    </div>
                    <FileUpload onUpload={this.handleUpload.bind(this)} percentaje={this.state.uploadValue}/>
                    {
                        this.state.pictures.map(picture => (
                            <div className="App-card">
                                <div className="App-card-image">
                                    <img width="80px" src={picture.image} />
                                    <div className="App-card-footer">
                                        <img className="App-card-avatar" src={picture.photoUrl} alt={picture.displayName} />
                                        <span className="App-card-name">{picture.displayName}</span>
                                    </div>
                                </div>
                            </div> )).reverse()
                    }
                </div>
            );
        }else{
            return( <button className="App-btn" onClick={this.handleAuth.bind(this)}>Login Con Google</button> )
        }
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">PseudoGram</h2>
        </header>
        <div className="App-intro">
            {this.renderLoginButton()}
        </div>
      </div>
    );
  }
}

export default App;
